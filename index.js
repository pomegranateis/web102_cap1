const http = require("http");
const url = require("url");
const product = require("./product");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === "/products" && method === "POST") {
    await product.create(req, res);
  } else if (path === "/products" && method === "GET") {
    await product.getAll(res);
  } else if (path.startsWith("/products/") && method === "GET") {
    const id = path.split("/")[2];
    await product.getOne(id, res);
  } else if (path.startsWith("/products/") && method === "PUT") {
    const id = path.split("/")[2];
    await product.update(id, req, res);
  } else if (path.startsWith("/products/") && method === "PATCH") {
    const id = path.split("/")[2];
    await product.partialUpdate(id, req, res);
  } else if (path.startsWith("/products/") && method === "DELETE") {
    const id = path.split("/")[2];
    await product.delete(id, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('Server listening on port 3000...');
});
