// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);
   
    if (dividend === "" || divider === "") {
      result.innerText =
        "Division not performed. Both values are required in inputs. Try again.";
      throw new Error("Input missing");
    } 
    
    if (dividend && divider && parseFloat(divider) < 0) {
      result.innerText =
        "Division not performed. Invalid number provided. Try again.";
      throw new Error("Invalid division:", dividend, divider);
    } 
    
    if (isNaN(dividend) || isNaN(divider)) {
      document.body.innerHTML =
        "Something critical went wrong. Please reload the page.";
      throw new Error("Invalid inputs");
    } else {
      result.innerText = Math.floor(dividend / divider);
    }
  } catch (e) {
    console.error(e);
  }
});
