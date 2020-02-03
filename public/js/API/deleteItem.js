const deleteItem = async id => {
  const url = "http://localhost:3000/api/cart";
  const data = await fetch(url + "?id=" + id, {
    method: "DELETE"
  });
  const response = await data;
  if (response) {
    const displayTotal = document.getElementById("total-price");
    const parent = document.getElementById(id).parentNode;
    const child = parent.childNodes[1].innerText;
    let total = displayTotal.innerText;
    total = parseFloat(total.substr(2, 4));
    total = total - parseFloat(child);
    total = total.toFixed(2);
    total = total.toString();
    total = "$ " + total;
    displayTotal.innerHTML = total;
  }
  document.getElementById(id).parentElement.remove();
};

// find ID to delete
const findID = e => {
  const target = e.target;
  const id = target.id;
  deleteItem(id);
};

export default findID;
