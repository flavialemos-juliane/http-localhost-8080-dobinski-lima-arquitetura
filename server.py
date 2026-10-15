import http.server
import socketserver
import os
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path).path

        # Se acessar a raiz ou index.html, redireciona para a URL oficial da empresa
        if parsed_path in ['/', '/index.html']:
            self.send_response(302)
            self.send_header('Location', '/ikis-arquitetura')
            self.end_headers()
            return

        # Rotas com o nome da empresa
        company_routes = [
            '/ikis-arquitetura', '/ikis-arquitetura/',
            '/ikis', '/ikis/',
            '/dobinski-lima-arquitetura', '/dobinski-lima-arquitetura/',
            '/dobinski-lima', '/dobinski-lima/'
        ]
        if parsed_path in company_routes:
            self.path = '/index.html'
            return super().do_GET()

        # Servir arquivos estáticos sob qualquer um dos prefixos
        prefixes = [
            '/ikis-arquitetura/', '/ikis/',
            '/dobinski-lima-arquitetura/', '/dobinski-lima/'
        ]
        for prefix in prefixes:
            if self.path.startswith(prefix):
                self.path = '/' + self.path[len(prefix):]
                return super().do_GET()

        return super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Servidor IKI'S ARQUITETURA ativo em http://localhost:{PORT}/ikis-arquitetura")
        httpd.serve_forever()
