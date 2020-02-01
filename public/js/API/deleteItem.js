async function deleteItem(id) {
  const url = "http://localhost:3000/api/cart";
  fetch(url + "?id=" + id, {
    method: "DELETE"
  });
  location.reload();
}

// find ID to delete
const findID = e => {
  const target = e.target;
  const id = target.id;
  deleteItem(id);
};

export default findID;
