import createCart from "./createCart.js";
import createProduct from "./createProduct.js";

//Handle different page
const startPage = () => {
  if (document.body.className == "product-page") {
    createProduct();
  } else if (document.body.className == "cart-page") {
    createCart();
  }
};

startPage();
