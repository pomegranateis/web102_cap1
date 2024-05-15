# Node.js CRUD API

This is a simple CRUD (Create, Read, Update, Delete) API built using Node.js. It allows you to perform basic operations on a collection of products stored in a JSON file.

# Getting Started
To get started with this project, follow these steps:

**1. Clone the repository:**

    git clone https://github.com/yourusername/nodejs-crud-api.git

**2. Install dependencies:**

    cd nodejs-crud-api
    npm install

**3.Run the server:**

    npm start

The server will start running on http://localhost:3000.

## API Endpoints
### Create a new product
* URL: /products
* Method: POST
* Request Body: JSON object representing the new product
* Response: JSON object of the newly created product

### Get all products
* URL: /products
* Method: GET
* Response: Array of JSON objects representing all products

### Get a single product
* URL: /products/:id
* Method: GET
* Response: JSON object of the product with the specified ID

### Update a product
* URL: /products/:id
* Method: PUT
* Request Body: JSON object representing the updated fields of the product
* Response: JSON object of the updated product

### Partially update a product
* URL: /products/:id
* Method: PATCH
* Request Body: JSON object representing the fields to be updated
* Response: JSON object of the updated product

### Delete a product
* URL: /products/:id
* Method: DELETE
* Response: JSON object of the deleted product
  
## Dependencies
* http: For creating HTTP server
* fs/promises: For reading and writing files asynchronously
* url: For parsing URL strings
