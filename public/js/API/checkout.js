//Clear cart
const checkout = async () => {
  const url = "http://localhost:3000/api/clear-cart";
  fetch(url, {
    method: "DELETE"
  });
  location.reload();
}

export default checkout;
