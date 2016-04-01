#!/usr/bin/env python
#import SimpleHTTPServer
#import SocketServer

# PORT = 8000
# Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
# httpd = SocketServer.TCPServer(("", PORT), Handler)

# print "Serving at port", PORT
# httpd.serve_forever()


import SimpleHTTPServer, SocketServer
import urlparse, os

PORT = 8000

class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
   def do_GET(self):

       # Parse query data to find out what was requested
       parsedParams = urlparse.urlparse(self.path)

       print parsedParams

       # See if the file requested exists
       if os.access('.' + os.sep + parsedParams.path, os.R_OK):
          # File exists, serve it up
          SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self);
       else:
          # redirect to index.html
          print "Redirecting to index.html"
          self.send_response(302)
          self.send_header('Content-Type', 'text/html')
          self.send_header('location', '/index.html')
          self.end_headers()

Handler = MyHandler
print "Serving at port:", PORT
httpd = SocketServer.TCPServer(("", PORT), Handler)
httpd.serve_forever()
