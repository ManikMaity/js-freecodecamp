const myNameEle = document.getElementById("myName");
const btnEle = document.getElementById("btn");
const barEle = document.querySelector(".bar");

btnEle.addEventListener("click", ()=>{
    myNameEle.classList.toggle("sideLeftAnimation");
    barEle.classList.toggle("rotate")
})
