// add to CART
const addItem = async id => {
  const url = "http://localhost:3000/api/cart";
  fetch(url + "?id=" + id, {
    method: "POST"
  });
  const button = document.getElementById(id);
  button.innerHTML = "in cart";
  button.style.cursor = "";


};

// find ID to add
const findID = e => {
  const target = e.target;
  const id = target.id;
  addItem(id);
};

export default findID;
