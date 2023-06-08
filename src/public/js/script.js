const socket = io();

let $productlist = document.getElementById("product-list")

socket.on(`productAct`, (products) => {
    $productlist.innerHTML = "";
    products.forEach((product)=> {
        const title = product.title
        const pElement = document.createElement("p")
        pElement.textContent = title;
        $productlist.appendChild(pElement) 
    })
})

