import updateTotal from "../updateTotal.js"

const deleteItem = async id => {
  const url = "http://localhost:3000/api/cart";
  const data = await fetch(url + "?id=" + id, {
    method: "DELETE"
  });
  const response = await data;
  if (response) {
    updateTotal(id);
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
