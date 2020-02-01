async function getProducts() {
  const url = "http://localhost:3000/api/products";
  let response = await fetch(url, {
    method: "GET"
  });
  let data = await response.json();
  let products = await data;
  return products;
}

export default getProducts;
