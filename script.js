let digits = document.querySelectorAll(".button__number");
let enteredNumber = document.querySelector(".enteredNumber");
let result = document.querySelector(".result");
let baseNumber = 0;
let baseString = "";
let clearNumber = true;
let timeOut;
function enterDigit(digit) {
  if (enteredNumber.innerText.length >= 6) {
    return;
  }
  if (clearNumber) {
    enteredNumber.innerText = digit;
  } else {
    enteredNumber.innerText += digit;
  }
  baseString = enteredNumber.innerText;
  baseNumber = parseFloat(baseString);
  result.innerText = (baseNumber * 1.2).toFixed(2);
  clearNumber = false;
  clearTimeout(timeOut);
  timeOut = setTimeout(() => clearDisplay(), 1500);
}
function clearDisplay() {
  enteredNumber.innerText = "";
}
