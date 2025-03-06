const http = require('http');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');

var port = process.env.port || process.getActiveResourcesInfo.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
    const body = [];
  
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });
  
    request.on('data', (chunk) => {
      body.push(chunk);
    });
  
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      request.body = query.parse(bodyString);
  
      handler(request, response);
    });
  };

const handlePost = (request, response, parsedUrl) => {
if (parsedUrl.pathname === '/addUser') {
    parseBody(request, response, jsonHandler.addUser);
}
};

const handleGet = (request, response, parsedUrl) => {
    //Why did using a switch case here not let the css show up?
    if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
      }
    else if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getStyle(request, response);
      }
      else if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.getUsers(request, response);
      } 
      else if(parsedUrl.parse === '/notReal'){
        jsonHandler.notReal(request, response);
      }
      else {
        jsonHandler.notReal(request, response);
      }
  };
  

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    if(request.method === 'POST'){
        handlePost(request,response, parsedUrl);
    }
    else{
        handleGet(request,response,parsedUrl);
    }
  };

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})