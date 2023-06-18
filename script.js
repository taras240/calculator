const WAITING_TIME_MILISECONDS = 1500;
let digits = document.querySelectorAll(".button__number");
let enteredNumber = document.querySelector(".enteredNumber");
let result = document.querySelector(".result");
let quantityElement = document.querySelector(".quantity-number");
let quantity = 1;
let baseNumber = 0;
let baseString = "";
let percentage = document
  .querySelector(".percentage-element.active")
  .getAttribute("percent");
let clearNumber = true;
let timeOut;
let activeInput = "baseNumber"; //or quantity
function enterDigit(digit) {
  window.navigator.vibrate(40);
  switch (activeInput) {
    case "baseNumber":
      changeBaseNumber(digit);
      break;
    case "quantity":
      changeQuantity(digit);
      break;
    default:
      break;
  }
}

function changeBaseNumber(digit) {
  if (enteredNumber.classList.contains("inactive")) {
    enteredNumber.classList.remove("inactive");
    enteredNumber.innerText = digit;
  } else {
    if (enteredNumber.innerText.length >= 6) {
      return;
    }
    enteredNumber.innerText += digit;
  }
  baseString = enteredNumber.innerText;
  baseNumber = parseFloat(baseString);
  calcPrice();
  clearNumber = false;
  clearTimeout(timeOut);
  timeOut = setTimeout(() => clearDisplay(), WAITING_TIME_MILISECONDS);
}
function changeQuantity(digit) {
  quantityElement.innerText += digit;
  quantity = parseFloat(quantityElement.innerText);
  calcPrice();
}
function clearDisplay() {
  enteredNumber.classList.add("inactive");
}
function refreshDisplay() {
  enteredNumber.innerText = "";
  result.innerText = "";
  enteredNumber.classList.remove("inactive");
  quantityElement.innerText = quantity = 1;
}
function changePercenage(element) {
  document.querySelectorAll(".percentage-element").forEach((element) => {
    element.classList.remove("active");
  });
  element.classList.add("active");
  percentage = element.getAttribute("percent");
  result.innerText = (baseNumber * percentage).toFixed(2);
}
function setQuantity() {
  activeInput = "quantity";
  quantityElement.classList.add("active");
  quantityElement.innerText = "";
}
function setNumber() {
  activeInput = "baseNumber";
  quantityElement.classList.remove("active");
}
function calcPrice() {
  result.innerText = ((baseNumber * percentage) / quantity).toFixed(2);
}
