const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let fileName;
  let statusCode = 200;

  switch (req.url) {
    case "/":
      fileName = "index.html";
      break;

    case "/about":
      fileName = "about.html";
      break;

    case "/product":
      fileName = "product.html";
      break;

    case "/contact":
      fileName = "contact.html";
      break;

    default:
      fileName = "notFound.html";
      statusCode = 404;
  }

  fs.readFile(path.join(__dirname, fileName), "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});

//cd "C:\parthiv\NODE JS\PROJECT"
//node server.js
