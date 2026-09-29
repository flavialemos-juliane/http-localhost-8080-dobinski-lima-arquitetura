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

        # Se acessar a raiz ou index.html, redireciona para a URL com o nome da empresa
        if parsed_path in ['/', '/index.html']:
            self.send_response(302)
            self.send_header('Location', '/dobinski-lima-arquitetura')
            self.end_headers()
            return

        # Se acessar com o nome da empresa
        if parsed_path in ['/dobinski-lima', '/dobinski-lima/', '/dobinski-lima-arquitetura', '/dobinski-lima-arquitetura/']:
            self.path = '/index.html'
            return super().do_GET()

        # Se solicitar arquivos estáticos dentro do prefixo da empresa
        for prefix in ['/dobinski-lima-arquitetura/', '/dobinski-lima/']:
            if self.path.startswith(prefix):
                self.path = '/' + self.path[len(prefix):]
                return super().do_GET()

        return super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Servidor ativo em http://localhost:{PORT}/dobinski-lima-arquitetura")
        httpd.serve_forever()
