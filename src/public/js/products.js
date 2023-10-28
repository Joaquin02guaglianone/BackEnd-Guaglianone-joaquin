const addProducts = async (event) => { 
    const cartID = event.target.dataset.id;
    const productID = event.target.dataset.productsId;       

    console.log(cartID, productID);

    // await fetch(`/api/sessions/premium/${uid}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type':'application/json'
    //     }
    // }).then(res => {if (res.status === 200) {
    //     window.location.replace(`/users/${uid}`)
    // }})
}


let botonAdd = document.querySelector(".agregarAlCarrito")

botonAdd.addEventListener("click", addProducts)