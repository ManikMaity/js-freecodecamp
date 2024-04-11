import localStorage from "./localStorage.js";

// ---------------------------all data here ------------------------

const colors = {
  red: "#F38181",
  green: "#95E1D3",
  yellow: "#FCE38A",
  purple: "#8b8dff",
  lightBlue: "#d2dfff",
};

const totalBudget = localStorage.getTotalBudget();

// ---------------------------------refrense of html element here---------------------------
const ctx = document.getElementById("myChart");
const budgetLeftEle = document.getElementById("budgetLeft");
const totalBudgetEle = document.getElementById("totalBudget");
const totalExpEle = document.getElementById("totalExp");
const addExpBtnEle = document.querySelector(".add-exp-btn");
const addBudBtnEle = document.querySelector(".add-bud-btn");
const expForSelectEle = document.querySelector(".exp-for");
const allOptionLabel = document.querySelectorAll(".exp-for label");
const addBtnEle = document.getElementById("addBtn");
const clearBtnEle = document.getElementById("clearBtn");
const transAmountEle = document.getElementById("addAmount");
const expForEle = document.querySelectorAll('[name="expFor"]');
const transHistoryParentEle = document.querySelector(".money-history-container");
const mobileAddScreenShowBtn = document.querySelector(".mobile-add-btn");
const moneyAddCardEle = document.querySelector(".add-money-card");

// -----------------------------code logic here --------------------------------

totalBudgetEle.textContent = totalBudget;

const showBudgetInput = () => {
  addExpBtnEle.classList.remove("selected-add-exp");
  addBudBtnEle.classList.add("selected-add-bud");
  expForSelectEle.style.display = "none";
};


function createTranHTML (obj = {}){
  return `<div class="trans-item" id="${obj?.id}">
  <div>
      <h4>-₹${obj?.amount}</h4>
      <div class="tranTagContainer">
        <p>${obj?.tag}</p>
        <p class="trans-date">${new Date(obj?.time).toLocaleString()}</p>
      </div>
  </div>
  <p class="trans-date">${new Date(obj?.time).toLocaleString()}</p>
  <div class="trans-item-btn">
      <button id="transEdit"><i class="fa-regular fa-pen-to-square"></i></button>
      <button id="transDelete"><i class="fa-regular fa-trash-can"></i></button>
  </div>
  </div>`
}


function renderTransHistory (){
  transHistoryParentEle.innerHTML = "";
  const transArr = localStorage.getAllTrans();
  if (transArr == []){
    return;
  }
  else{
    transArr.forEach(transObj => {
      const transEle = createTranHTML(transObj);
      transHistoryParentEle.insertAdjacentHTML('beforeend', transEle);
    })
  }
  
}
renderTransHistory();

const showExpInput = () => {
  addBudBtnEle.classList.remove("selected-add-bud");
  addExpBtnEle.classList.add("selected-add-exp");
  expForSelectEle.style.display = "flex";
};

function showChart(arr = []) {
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Expence", "Buget Left", "Income"],
      datasets: [
        {
          data: arr,
          backgroundColor: [colors.red, colors.purple, colors.green],
          borderWidth: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function findChekedTag(arr) {
  let checkedTag = undefined;
  arr.forEach((tag) => {
    if (tag.checked) {
      checkedTag = tag;
    }
  });

  return checkedTag;
}

function addTransItem() {
  const amountEle = document.getElementById("addAmount");
  const checkedTag = findChekedTag(
    Array.from(document.querySelectorAll('[name="expFor"]'))
  );
  const amount = amountEle.value;
  const checkedTagValue = checkedTag ? checkedTag.value : undefined;

  if (amount && checkedTagValue) {
    let transObj = {
      id: Math.floor(Math.random() * 10000000),
      amount: Number(amount),
      tag: checkedTagValue,
      time: new Date().toISOString(),
    };
    localStorage.saveTrans(transObj);
    renderTransHistory();
  } 
  
  else {
    if (amount == "") {
      console.log("Enter the ammount");
    } else if (checkedTagValue == undefined) {
      console.log("Select a tag");
    }
  }

  amountEle.value = "";
  checkedTag.checked = false;
  const checkedLabel = document.querySelector(`[for="${checkedTag.id}"]`);
  checkedLabel.style.backgroundColor = colors.lightBlue;
}



allOptionLabel.forEach((label) => {
  label.addEventListener("click", () => {
    allOptionLabel.forEach((label) => {
      label.style.backgroundColor = colors.lightBlue;
    });
    label.style.backgroundColor = colors.yellow;
  });
});

mobileAddScreenShowBtn.addEventListener("click", (e)=>{
  moneyAddCardEle.classList.toggle("show");
  mobileAddScreenShowBtn.children[0].classList.toggle("rotatePlus");

})
addBudBtnEle.addEventListener("click", showBudgetInput);
addExpBtnEle.addEventListener("click", showExpInput);
addBtnEle.addEventListener("click", addTransItem);

showChart([50, 30, 20]);
