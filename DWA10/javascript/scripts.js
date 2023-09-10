/* eslint-disable no-plusplus */
document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("counter");
  const subtractButton = document.getElementById("subtract");
  const resetButton = document.getElementById("reset");
  const addButton = document.getElementById("add");
  const confirmationMessage = document.getElementById("confirmation");

  let counterValue = 0;

  // Function to update the counter display
  const updateCounterDisplay = () => {
    counterElement.textContent = counterValue;
  };

  // Event listener for the Subtract button
  subtractButton.addEventListener("click", () => {
    if (counterValue > 0) {
      counterValue--;
      updateCounterDisplay();
    }
  });

  // Event listener for the Reset button
  resetButton.addEventListener("click", () => {
    if (counterValue !== 0) {
      counterValue = 0;
      updateCounterDisplay();
      confirmationMessage.style.display = "block";
      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 2000); // Hide the message after 2 seconds
    }
  });

  // Event listener for the Add button
  addButton.addEventListener("click", () => {
    counterValue++;
    updateCounterDisplay();
  });
});
