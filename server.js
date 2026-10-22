const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 4000;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url,
  );

  const extName = String(path.extname(filePath)).toLocaleLowerCase();

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
  };

  const contentType = mimeTypes[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" }); //body
        /* *here */
        res.end("<body style='font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: orangered; color: white;'><h1> Error 404 Page Not Found </h1></body>", "utf-8"); //content
      }
    } 
    else {
      res.writeHead(200, { "Content-Type": contentType }); //body
      res.end(content, "utf-8"); //content
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
