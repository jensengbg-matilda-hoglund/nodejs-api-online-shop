const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

exports.initiateDatabase = () => {
  const hasProducts = database.has("products").value();
  const hasCart = database.has("cart").value();

  if (!hasProducts) {
    database.defaults({ products: [], cart: [] }).write();
  }

  if (!hasCart) {
    database.defaults({ products: [], cart: [] }).write();
  }
};

//GET PRODUCTS
const getProducts = () => {
  const response = database.get("products").value();
  return response;
};

// GET CART
const getCart = () => {
  const response = database.get("cart").value();
  return response;
};

// ADD NEW PRODUCT
const newProduct = async (name, price, imgurl) => {
  let id = uuidv4();
  const response = await database
    .get("products")
    .push({ id, name, price, imgurl })
    .write();

  return response;
};

// ADD TO CART
const add = async id => {
  // If no product found, send back empty string
  let response = "";
  let data = await database
    .get("cart")
    .find({ id })
    .value();

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
  return response;
};

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

// CLEAR CART
const clearCart = cart => {
  let response = "";
  const data = database
    .get("cart")
    .remove(cart)
    .write();

  if (data.length > 0) {
    return data;
  } else {
    return response;
  }
};

exports.getProducts = getProducts;
exports.getCart = getCart;
exports.newProduct = newProduct;
exports.remove = remove;
exports.add = add;
exports.clearCart = clearCart;
