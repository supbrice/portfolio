import json
import os
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, unquote
from pathlib import Path
from typing import List, Dict, Any

ROOT_DIR = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8000"))
SUBMISSIONS_FILE = ROOT_DIR / "submissions.json"

MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".txt": "text/plain; charset=utf-8",
}


def load_submissions() -> List[Dict[str, Any]]:
    if not SUBMISSIONS_FILE.exists():
        return []
    try:
        with SUBMISSIONS_FILE.open("r", encoding="utf-8") as handle:
            parsed = json.load(handle)
            return parsed if isinstance(parsed, list) else []
    except Exception:
        return []


def save_submission(payload: Dict[str, Any]) -> Dict[str, Any]:
    submissions = load_submissions()
    record = {
        "id": f"app-{int(__import__('time').time() * 1000)}",
        "submittedAt": __import__('datetime').datetime.utcnow().isoformat() + "Z",
        **payload,
    }
    submissions.append(record)
    with SUBMISSIONS_FILE.open("w", encoding="utf-8") as handle:
        json.dump(submissions, handle, indent=2)
    return record


def send_json(handler, status_code: int, payload: Dict[str, Any]) -> None:
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.end_headers()
    handler.wfile.write(body)


class AppHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/applications":
            send_json(self, 200, {"success": True, "applications": load_submissions()})
            return

        path = unquote(parsed.path)
        if path == "/":
            path = "/index.html"

        safe_path = Path(path.lstrip("/")).resolve()
        if safe_path.is_absolute() or ".." in Path(path.lstrip("/")).parts:
            self.send_error(403)
            return

        file_path = ROOT_DIR / safe_path
        if not file_path.exists() or not file_path.is_file():
            self.send_error(404)
            return

        content_type = MIME_TYPES.get(file_path.suffix.lower(), "application/octet-stream")
        body = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/api/apply":
            self.send_error(404)
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length).decode("utf-8")
        try:
            payload = json.loads(raw_body or "{}")
        except Exception:
            send_json(self, 400, {"success": False, "error": "Invalid JSON payload."})
            return

        job_title = (payload.get("jobTitle") or "").strip()
        company_name = (payload.get("companyName") or "").strip()
        if not job_title or not company_name:
            send_json(self, 400, {"success": False, "error": "Job title and company name are required."})
            return

        record = save_submission(payload)
        send_json(self, 200, {"success": True, "message": "Application ready and stored successfully.", "submissionId": record["id"]})

    def log_message(self, format, *args) -> None:  # noqa: A003
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), AppHandler)
    print(f"Auto-apply server running at http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
        server.server_close()
