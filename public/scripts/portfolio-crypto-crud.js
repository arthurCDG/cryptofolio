const updateButton = document.querySelector("#update-coin-btn");
const cancelUpdateButton = document.querySelector("#cancel-update-btn");
const confirmUpdateButton = document.querySelector("#confirm-update-btn");
const quantityInput = document.querySelector("#quantity-input");

const sendQuantityInputToBackEnd = () => {
  const portfolioId = updateButton.getAttribute("data-portfolioid");
  const holdingId = updateButton.getAttribute("data-holdingid");

  axios
    .patch(`/dashboard/portfolio/${portfolioId}/holding/${holdingId}/update`, {
      quantity: Number(quantityInput.value),
    })
    .then((updatedHolding) => {
      console.log(
        "This is updatedHolding.data on line 9 of portfolio-crypto-crud script >>>>>",
        updatedHolding.data
      );
      quantityInput.value = updatedHolding.data.quantity;
    })
    .catch((err) => console.error(err));
};

confirmUpdateButton.addEventListener("click", sendQuantityInputToBackEnd);
