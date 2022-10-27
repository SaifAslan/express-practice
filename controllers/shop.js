const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, nex) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .then((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, nex) => {
  Product.findById(req.params.productId)
    .then(([row, fieldData]) => {
      res.render("shop/product-detail", {
        product: row[0],
        pageTitle: row[0]?.title,
        path: "/products",
      });
    }).catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.postCart = (req, res) => {
  // const productId = req.body.productId;
  // Product.findById(productId, (product) => {
  //   Cart.addProduct(productId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.postCartDeleteProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  // Product.findById(prodId, (product) => {
  //   Cart.removeProdFromCartById(prodId, product.price);
  //   res.redirect("/cart");
  // });
};
