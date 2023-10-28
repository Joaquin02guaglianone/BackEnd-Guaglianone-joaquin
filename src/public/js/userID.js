const eliminarUser = async (event) => {
    const uid = event.target.dataset.id
    await fetch(`/api/users/${uid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res => {if (res.status === 200) {
        window.location.replace('/products')
    }})
}

const RoleChange = async (event) => {
    const uid = event.target.dataset.id

    await fetch(`/api/sessions/premium/${uid}`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res => {if (res.status === 200) {
        window.location.replace(`/users/${uid}`)
    }})
}
let deleteB = document.querySelector(".BotonDelete")

let RoleB = document.querySelector(".BotonRol")

deleteB.addEventListener("click", eliminarUser)

RoleB.addEventListener("click", RoleChange)

