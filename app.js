const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const uuidv4 = require("uuid/v4");
const app = require("./server");
const express = require("express");

const adapter = new FileSync("database.json");
const database = lowdb(adapter);

app.use(express.static("public"));

// ADD NEW PRODUCT
const newProduct = async (name, price, imgurl) => {
  let id = uuidv4();
  const response = await database
    .get("products")
    .push({ id, name, price, imgurl })
    .write();

  return response;
};

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
app.get("/api/products", (req, res) => {
  res.json(database.get("products").value());
  return res;
});

// ADD TO CART
const add = async id => {
  // If no product found, send back empty string
  let response = "";
  let data = await database
    .get("cart")
    .find({ id })
    .value();
  console.log(data);

  if (!data) {
    data = await database
      .get("products")
      .find({ id })
      .value();

    if (data) {
      data = await database
        .get("cart")
        .push(data)
        .write();
      return data;
    } else {
      return response;
    }
  } else {
    response = false;
  }
  console.log(response);
  return response;
};

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

// DELETE FROM CART
const remove = async id => {
  let response = "";
  const data = await database
    .get("cart")
    .remove({ id })
    .write();

  if (data.length > 0) {
    return data;
  } else {
    return response;
  }
};

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

// GET CART
app.get("/api/cart", (req, res) => {
  res.json(database.get("cart").value());
  return res;
});
