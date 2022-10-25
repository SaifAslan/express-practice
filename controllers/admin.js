const { deleteById } = require("../models/product");
const Product = require("../models/product");

exports.getAddProduct = (req, res, nex) => {
  res.render("admin/edit-product", {
    pageTitle: "Admin - Add Product",
    path: "/admin/add-product",
    editing:false,
  });
};

exports.getEditProduct = (req, res) => {
  let productId = req.params.productId
  Product.findById(productId,product=>{
    res.render("admin/edit-product", {
      pageTitle: "Admin - Edit Product",
      path: "/products",
      editing:true,
      product
    });
  })

};
exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const product = new Product(productId, title, imageUrl, description, price);
  product.save();
  res.redirect("/");

};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getProductsAdmin = (req, res, nex) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin - Products List",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res)=>{
  const productId = req.body.productId;
  deleteById(productId)
  res.redirect("/admin/products")
}

