import getCart from "./API/getCart.js";
import getProducts from "./API/getProducts.js";
import findID from "./API/addToCart.js";

// Products in cart displayed on button
async function changeProduct(productsArray) {
  let cartArray = await getCart();
  cartArray = await cartArray;

  for (let i = 0; i < productsArray.length; i++) {
    let test = cartArray.find(data => data.id === productsArray[i].id);

    if (test) {
      const ID = test.id;
      const button = document.getElementById(ID);
      button.innerHTML = "in cart";
    }
  }
}

// Display products
async function createProduct() {
  let productsArray = await getProducts();
  productsArray = await productsArray;

  const productsSection = document.getElementById("product-section");

  for (let i = 0; i < productsArray.length; i++) {
    const article = document.createElement("article");
    const productName = document.createElement("h3");
    const divider = document.createElement("span");
    const newDiv = document.createElement("div");
    const price = document.createElement("p");
    const buyBtn = document.createElement("button");

    article.className = "shop-item";
    divider.className = "divider";
    price.className = "price";
    buyBtn.className = "add";
    buyBtn.id = productsArray[i].id;

    productsSection.appendChild(article);
    article.appendChild(productName);
    article.appendChild(divider);
    article.appendChild(newDiv);
    newDiv.appendChild(price);
    newDiv.appendChild(buyBtn);

    productName.innerHTML = productsArray[i].name;
    price.innerHTML = "$ " + productsArray[i].price;
    buyBtn.innerHTML = "buy";
  }
  changeProduct(productsArray);
}

// BUY BUTTON
document.addEventListener("click", function(e) {
  if (e.target.className == "add") {
    findID(e);
  }
});

export default createProduct;
