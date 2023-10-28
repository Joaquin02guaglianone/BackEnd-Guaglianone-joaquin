const addProdCart = async (event) => { 
    const cartID = event.target.dataset.cartId; 
    const productID = event.target.dataset.productId; 

    console.log(cartID, productID);

    await fetch(`/api/cart/${cartID}/product/${productID}`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res => {if (res.status === 200) {
        window.location.replace(`/products/${productID}`)
    }})
}


let botonAdd = document.querySelector(".AddProd")

botonAdd.addEventListener("click", addProdCart)