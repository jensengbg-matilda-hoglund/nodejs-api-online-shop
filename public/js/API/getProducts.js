const getProducts = async () => {
  const url = "http://localhost:3000/api/products";
  let response = await fetch(url, {
    method: "GET"
  });
  let productsArray = await response.json();
  return productsArray;
};

export default getProducts;
