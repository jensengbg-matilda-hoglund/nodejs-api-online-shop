import updateTotal from "../updateTotal.js";

const deleteItem = async id => {
  const url = "http://localhost:3000/api/cart";
  const data = await fetch(url + "?id=" + id, {
    method: "DELETE"
  });

  if (data) {
    updateTotal(id);
  }
  document.getElementById(id).parentElement.remove();
};

// find ID to delete
const findID = e => {
  const id = e.target.id;
  deleteItem(id);
};

export default findID;
