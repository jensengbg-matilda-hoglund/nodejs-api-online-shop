import getCart from "./API/getCart.js";
import getProducts from "./API/getProducts.js";
import findID from "./API/addToCart.js";

// Products in cart displayed on product page
const changeProduct = async productsArray => {
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
const createProduct = async () => {
  let productsArray = await getProducts();
  productsArray = await productsArray;

  const productsSection = document.getElementById("product-section");

  for (let i = 0; i < productsArray.length; i++) {
    const article = document.createElement("article");
    const productImage = document.createElement("img");
    const divider = document.createElement("span");
    const productName = document.createElement("h3");
    const newDiv = document.createElement("div");
    const price = document.createElement("p");
    const buyBtn = document.createElement("button");

    article.className = "shop-item";
    productImage.className = "product-image";
    productImage.src = productsArray[i].imgurl;
    divider.className = "divider";
    price.className = "price";
    buyBtn.className = "add";
    buyBtn.id = productsArray[i].id;

    productsSection.appendChild(article);
    article.appendChild(productImage);
    article.appendChild(divider);
    article.appendChild(productName);
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
