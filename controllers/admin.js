const Product = require("../models/product");
const { deleteById } = require("../models/product");

exports.getAddProduct = (req, res, nex) => {
  res.render("admin/edit-product", {
    pageTitle: "Admin - Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res) => {
  // let productId = req.params.productId;
  // Product.findById(productId, (product) => {
  //   res.render("admin/edit-product", {
  //     pageTitle: "Admin - Edit Product",
  //     path: "/products",
  //     editing: true,
  //     product,
  //   });
  // });
};
exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const product = new Product(productId, title, imageUrl, description, price);
  product
    .save()
    .then(([]) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  Product.create({
    title,
    imageUrl,
    description,
    price,
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  // res.redirect("/");
};

exports.getProductsAdmin = (req, res, nex) => {
  Product.fetchAll()
    .then(([rows, fieldsData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin - Products List",
        path: "/admin/products",
      });
    })
    .then((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  deleteById(productId);
  res.redirect("/admin/products");
};
