import localStorage from "./localStorage.js";

// ---------------------------all data here ------------------------

const colors = {
  red: "#F38181",
  green: "#297054b0",
  yellow: "#FCE38A",
  purple: "#8b8dff",
  lightBlue: "#d2dfff",
};

let totalExpData, totalBudgetLeftData;

// ---------------------------------refrense of html element here---------------------------
const ctx = document.getElementById("myChart");
const budgetLeftEle = document.getElementById("budgetLeft");
const totalBudgetEle = document.getElementById("totalBudget");
const totalExpEle = document.getElementById("totalExp");
const addExpBtnEle = document.querySelector(".add-exp-btn");
const addBudBtnEle = document.querySelector(".add-bud-btn");
const expForSelectEle = document.querySelector(".exp-for");
const tagContainer = document.querySelector(".tags-conatiner");
let allOptionLabel = document.querySelectorAll(".tags-conatiner label");
const addBtnEle = document.getElementById("addBtn");
const clearBtnEle = document.getElementById("clearBtn");
const transAmountEle = document.getElementById("addAmount");
const expForEle = document.querySelectorAll('[name="expFor"]');
const transHistoryParentEle = document.querySelector(".money-history-container");
const mobileAddScreenShowBtn = document.querySelector(".mobile-add-btn");
const moneyAddCardEle = document.querySelector(".add-money-card");
const addNewTagBtnEle = document.getElementById("addTagBtn");
const confirmTagBtnEle = document.getElementById("confirmNewTag");
const tagInputEle = document.querySelector(".tag-input");
const tagInputField = document.getElementById("tagInputField");

// -----------------------------code logic here --------------------------------


function totalCalculate() {
  const allTrans = localStorage.getAllTrans();
  let total = 0;
  for (let i = 0; i < allTrans.length; i++) {
    total += allTrans[i].amount;
  }
  totalExpEle.textContent = `${total}`;
  const leftBudget = Number(localStorage.getTotalBudget()) - total;
  totalExpData = total;
  totalBudgetLeftData = leftBudget;
  budgetLeftEle.textContent = `${leftBudget}`
  totalBudgetEle.textContent = localStorage.getTotalBudget();
}

totalCalculate();

function addBudgetInput() {
  if (transAmountEle.value == "") {
    console.log("Please enter your budget.");
  } else {
    localStorage.setTotalBudget(Number(transAmountEle.value));
    totalCalculate();
  }
  transAmountEle.value = "";
}


const showBudgetInput = () => {
  addExpBtnEle.classList.remove("selected-add-exp");
  addBudBtnEle.classList.add("selected-add-bud");
  expForSelectEle.style.display = "none";
  transAmountEle.value = localStorage.getTotalBudget();
  addBtnEle.removeEventListener("click", addTransItem);
  addBtnEle.addEventListener("click", addBudgetInput);
};

const showExpInput = () => {
  addBudBtnEle.classList.remove("selected-add-bud");
  addExpBtnEle.classList.add("selected-add-exp");
  expForSelectEle.style.display = "flex";
  transAmountEle.value = "";
  addBtnEle.removeEventListener("click", addBudgetInput);
  addBtnEle.addEventListener("click", addTransItem);
};


function createTranHTML(obj = {}) {
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
} {
  /* <input type="radio" id="subscription" name="expFor" value="Subscription📱">
  <label for="subscription">Subscription📱</label> */
}

localStorage.saveTag("Manik");

function createTagHTML(str) {
  return `
  <input type="radio" id="${str}" name="expFor" value="${str}">
  <label for="${str}">${str}</label>
  `
}

function renderTags() {
  tagContainer.innerHTML = ``;
  const tagArray = localStorage.getAllTags();
  if (tagArray == []) {
    return;
  } else {
    tagArray.forEach(tag => {
      const tagEle = createTagHTML(tag);
      tagContainer.insertAdjacentHTML("afterbegin", tagEle);
    })
  }
  allOptionLabel = document.querySelectorAll(".exp-for label");
  allOptionLabel.forEach((label) => {
    label.addEventListener("click", () => {
      allOptionLabel.forEach((label) => {
        label.style.backgroundColor = colors.lightBlue;
      });
      label.style.backgroundColor = colors.yellow;
    });
  });
}

renderTags();

function addNewTag() {
  const tagValue = tagInputField.value;
  if (tagValue == "") {
    console.log("Plz input tag name");
  } else {
    localStorage.saveTag(tagValue);
    renderTags();
  }
  tagInputField.value = "";
  tagInputEle.classList.remove("show");
}


function renderTransHistory() {
  transHistoryParentEle.innerHTML = "";
  const transArr = localStorage.getAllTrans();
  if (transArr == []) {
    return;
  } else {
    transArr.forEach(transObj => {
      const transEle = createTranHTML(transObj);
      transHistoryParentEle.insertAdjacentHTML('beforeend', transEle);
    })
  }

}

renderTransHistory();


function showChart(arr = []) {
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Expence", "Buget Left"],
      datasets: [{
        data: arr,
        backgroundColor: [colors.red, colors.green],
        borderWidth: 0,
      }, ],
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

  if (amount && checkedTagValue && Number(amount) > 0) {
    let transObj = {
      id: Math.floor(Math.random() * 10000000),
      amount: Number(amount),
      tag: checkedTagValue,
      time: new Date().toISOString(),
    };
    localStorage.saveTrans(transObj);
    renderTransHistory();
    addTranBtnEvent();
    totalCalculate();

  } else {
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

function addTranBtnEvent() {
  document.querySelectorAll(".trans-item").forEach(item => {
    item.lastElementChild.lastElementChild.addEventListener("click", () => {
      console.log(item.id);
      const sure = window.confirm("Are you really wanna delete this?");
      if (sure) {
        localStorage.deleteTrans(item.id);
        renderTransHistory();
        addTranBtnEvent();
        totalCalculate();
      }

    })
  })
}


mobileAddScreenShowBtn.addEventListener("click", (e) => {
  moneyAddCardEle.classList.toggle("show");
  mobileAddScreenShowBtn.children[0].classList.toggle("rotatePlus");

})

addBudBtnEle.addEventListener("click", showBudgetInput);
addExpBtnEle.addEventListener("click", showExpInput);
addBtnEle.addEventListener("click", addTransItem);
addNewTagBtnEle.addEventListener("click", () => {
  tagInputEle.classList.toggle("show");
});
confirmTagBtnEle.addEventListener("click", addNewTag);



addTranBtnEvent();
showChart([totalExpData, totalBudgetLeftData]);