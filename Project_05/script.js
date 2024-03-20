const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json";
const dropDownElement = document.querySelectorAll(".drop-down select");
const countryNameKey = Object.keys(countryList);
const massege = document.querySelector(".msg");
const btnElement = document.querySelector("form button")



for (let select of dropDownElement){
    countryNameKey.forEach((country) =>{
        let selectItem = document.createElement("option");
        selectItem.value = countryList[country].toLowerCase();
        selectItem.innerText = country;
        select.append(selectItem);
        if (select.name == "from" && country == "USD"){
            selectItem.selected = "true";
        }
        else  if (select.name == "to" && country == "INR"){
            selectItem.selected = "true";
        }
    })
    select.addEventListener("change", (e) =>{
        updateFlag(e.target);
    });
}


const updateFlag = (element) =>{
    let countryCode =  element.value;
    const newFlagLink = `https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`
    element.parentElement.querySelector("img").src = newFlagLink;
}

btnElement.addEventListener("click", (evt) =>{
    evt.preventDefault();
    const amount = document.getElementById("myCurrency");
    const value = Number(amount.value);
    if (value == "" || value < 1){
        massege.innerText = "Invalid Amount!"
        massege.style.color = "#c62b42";
    }
    
})