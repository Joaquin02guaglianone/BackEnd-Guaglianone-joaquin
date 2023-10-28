const terminarCompra = async (event) => { 

    const cartID = event.target.dataset.id;     

    await fetch(`/api/cart/${cartID}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res => {if (res.status === 200) {
        window.location.replace(`/lastScreen`)
    }})
}

let botonCompra = document.querySelector(".comprar")

botonCompra.addEventListener("click", terminarCompra)