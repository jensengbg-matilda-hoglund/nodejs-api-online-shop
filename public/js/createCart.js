import getCart from "./API/getCart.js";
import findID from "./API/deleteItem.js";
import checkout from "./API/checkout.js";

// Display cart
const createCart = async () => {
  let response = await getCart();
  let cartArray = await response;

  const cartSection = document.getElementById("cartID");
  const displayTotal = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartArray.length; i++) {
    const article = document.createElement("article");
    const productName = document.createElement("h4");
    const price = document.createElement("p");
    const deleteBtn = document.createElement("button");

    article.className = "cart-item";
    productName.className = "product-name";
    price.className = "cart-price";
    deleteBtn.className = "delete";
    deleteBtn.id = cartArray[i].id;

    cartSection.appendChild(article);
    article.appendChild(productName);
    article.appendChild(price);
    article.appendChild(deleteBtn);

    productName.innerHTML = cartArray[i].name;
    price.innerHTML = cartArray[i].price;
    deleteBtn.innerHTML = "X";
    total += parseFloat(cartArray[i].price);
  }
  total = total.toFixed(2);
  total = "$ " + total.toString();
  displayTotal.innerHTML = total;

  //add checkout btn
  document.getElementById("checkout-btn").addEventListener("click", checkout);
};

// DELETE BUTTON
document.addEventListener("click", function(e) {
  if (e.target.className == "delete") {
    findID(e);
  }
});

export default createCart;
