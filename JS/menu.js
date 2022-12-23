const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside__visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside__visible");
})

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside__visible");
}))
