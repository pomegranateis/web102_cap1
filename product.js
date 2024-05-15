const fs = require("fs/promises");

const readData = async () => {
  try {
    const data = await fs.readFile("data.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data:", err);
    await fs.writeFile("data.json", "[]");
    return [];
  }
};

const writeData = async (data) => {
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data:", err);
  }
};

exports.getAll = async (res) => {
  try {
    const products = await readData();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

exports.getOne = async (id, res) => {
  try {
    const products = await readData();
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

exports.create = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const newProduct = JSON.parse(body);
      const products = await readData();
      newProduct.id = products.length + 1;
      products.push(newProduct);
      await writeData(products);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newProduct));
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request" }));
    }
  });
};

exports.update = async (id, req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const updatedProduct = JSON.parse(body);
      const products = await readData();
      const productIndex = products.findIndex((p) => p.id === parseInt(id));

      if (productIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product not found" }));
      } else {
        updatedProduct.id = parseInt(id);
        products[productIndex] = updatedProduct;
        await writeData(products);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedProduct));
      }
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request" }));
    }
  });
};

exports.partialUpdate = async (id, req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const updatedFields = JSON.parse(body);
      const products = await readData();
      const productIndex = products.findIndex((p) => p.id === parseInt(id));

      if (productIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product not found" }));
      } else {
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;
        await writeData(products);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedProduct));
      }
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request" }));
    }
  });
};

exports.deleteProduct = async (id, res) => {
  try {
    const products = await readData();
    const productIndex = products.findIndex((p) => p.id === parseInt(id));

    if (productIndex === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const deletedProduct = products.splice(productIndex, 1)[0];
      await writeData(products);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deletedProduct));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};
