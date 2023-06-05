let digits = document.querySelectorAll(".button__number");
let enteredNumber = document.querySelector(".enteredNumber");
let result = document.querySelector(".result");
let baseNumber = 0;
let baseString = "";
let percentage = document
  .querySelector(".percentage-element.active")
  .getAttribute("percent");
let clearNumber = true;
let timeOut;
function enterDigit(digit) {
  window.navigator.vibrate(40);
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
  result.innerText = (baseNumber * percentage).toFixed(2);
  clearNumber = false;
  clearTimeout(timeOut);
  timeOut = setTimeout(() => clearDisplay(), 1000);
}
function clearDisplay() {
  enteredNumber.classList.add("inactive");
}
function changePercenage(element) {
  document.querySelectorAll(".percentage-element").forEach((element) => {
    element.classList.remove("active");
  });
  element.classList.add("active");
  percentage = element.getAttribute("percent");
  result.innerText = (baseNumber * percentage).toFixed(2);
}
