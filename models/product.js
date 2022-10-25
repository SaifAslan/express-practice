const fs = require("fs");
const path = require("path");
const { removeProdFromCartById } = require("./cart");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callBack) => {
  let products = [];
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      products = JSON.parse(fileContent);
    }
    callBack(products);
  });
};
module.exports = class product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findById(id, callBack) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      console.log("product",products);
      callBack(product);
    });
  }

  static deleteById(id, callBack) {
    getProductsFromFile((products) => {
      let product = products.find((prod) => prod.id === id)
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          console.log(err);
        } else {
            removeProdFromCartById(id, product.price);
        }
      });
    });
  }
};
