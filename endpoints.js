const {
  getProducts,
  getCart,
  newProduct,
  add,
  remove,
  clearCart
} = require("./database-op");
const express = require("express");

const app = express();

app.use(express.static("public"));

app.post("/api/products", async (req, res) => {
  let message = {
    success: true,
    message: "New product added"
  };

  const { name, price, imgurl } = req.query;
  const data = await newProduct(name, price, imgurl);
  message.data = data[data.length - 1];
  return res.send(message);
});

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  res.json(getProducts());

  return res;
});

// GET CART
app.get("/api/cart", (req, res) => {
  res.json(getCart());
  return res;
});

app.post("/api/cart", async (req, res) => {
  const { id } = req.query;
  const data = await add(id);

  if (typeof data == "string" || data instanceof String) {
    message = {
      success: false,
      message: "Product not found"
    };
  } else if (data === false) {
    message = {
      success: false,
      message: "Product already in cart"
    };
  } else {
    message = {
      success: true,
      message: "Product added to cart"
    };
  }

  message.data = data[data.length - 1];
  return res.send(message);
});

app.delete("/api/cart", async (req, res) => {
  const { id } = req.query;
  const data = await remove(id);

  if (typeof data == "string" || data instanceof String) {
    message = {
      success: false,
      message: "Product not in cart"
    };
  } else {
    message = {
      success: true,
      message: "Product removed from cart"
    };
  }

  message.data = data[data.length - 1];
  return res.send(message);
});

// CLEAR CART
app.delete("/api/clear-cart", async (req, res) => {
  let { cart } = req.query;
  const data = await clearCart(cart);

  res.send(data);
});

module.exports = app;
