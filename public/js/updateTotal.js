const updateTotal = (id) => {
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

export default updateTotal;
