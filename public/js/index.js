import createProduct from "./createProduct.js";
import createCart from "./createCart.js";

//Handle different pages
const startPage = () => {
  if (document.body.className == "product-page") {
    createProduct();
  } else if (document.body.className == "cart-page") {
    createCart();
  }
};

startPage();
