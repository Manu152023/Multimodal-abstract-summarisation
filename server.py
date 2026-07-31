import http.server
import socketserver
import sys

PORT = 8080

class SafeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

# Force strict JS MIME mapping
SafeHTTPRequestHandler.extensions_map.update({
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.mp4': 'video/mp4'
})

handler = SafeHTTPRequestHandler

print(f"Starting custom python server on port {PORT}...", flush=True)
try:
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print("Server started successfully!", flush=True)
        httpd.serve_forever()
except Exception as e:
    print(f"Server error: {e}", file=sys.stderr, flush=True)
    sys.exit(1)
