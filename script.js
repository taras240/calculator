let digits = document.querySelectorAll(".button__number");
let enteredNumber = document.querySelector(".enteredNumber");
let result = document.querySelector(".result");
const RESULT_MAX_FONT_SIZE = parseInt(window.getComputedStyle(result).fontSize);
const ENTEREDNUMBER_MAX_FONT_SIZE = parseInt(
  window.getComputedStyle(enteredNumber).fontSize
);
const WAITING_TIME_MILISECONDS = 1500;
const MAX_LEIGHT = 15;
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
    if (enteredNumber.innerText.length >= MAX_LEIGHT) {
      return;
    }
    enteredNumber.innerText += digit;
  }
  baseString = enteredNumber.innerText;
  baseNumber = parseFloat(baseString);
  updateFontSize(enteredNumber);
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
  result.innerText = "0";
  enteredNumber.classList.remove("inactive");
  quantityElement.innerText = quantity = 1;
  enteredNumber.click();
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
  let res = Math.round(((baseNumber * percentage) / quantity) * 100) / 100 + "";
  result.innerText = res;
  updateFontSize(result);
}
function updateFontSize(element) {
  while (
    element.scrollWidth <= element.clientWidth &&
    parseInt(window.getComputedStyle(element).fontSize) <= RESULT_MAX_FONT_SIZE
  ) {
    element.style.fontSize =
      parseInt(window.getComputedStyle(element).fontSize) + 1 + "px";
  }
  while (element.scrollWidth > element.clientWidth) {
    element.style.fontSize =
      parseInt(window.getComputedStyle(element).fontSize) - 1 + "px";
  }
}
addEventListener("keydown", (key) => {
  const pressedNumber = parseInt(key.key);
  if (!isNaN(pressedNumber)) {
    enterDigit(pressedNumber);
  }
});
