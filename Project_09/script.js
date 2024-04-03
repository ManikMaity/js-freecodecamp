const currentDate = document.getElementById("currentDate");
const dateOptionsSelectElement = document.getElementById("dateFromat");

const date = new Date();
const day = date.getDate();
const month = date.getMonth() +1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();  

const formattedDate = `${day}-${month}-${year}`;
currentDate.value = formattedDate;
dateOptionsSelectElement.addEventListener("change", ()=>{

});
