const getCart = async () => {
  const url = "http://localhost:3000/api/cart";
  const response = await fetch(url, {
    method: "GET"
  });
  const data = await response.json();
  const cart = await data;
  return cart;
}

export default getCart;
