const updateButton = document.querySelector("#update-coin-btn");
const deleteLink = document.querySelector("#remove-coin-a");
const confirmUpdateButton = document.querySelector("#confirm-update-btn");
const holdingQuantityH2Element = document.querySelector("#holding-quantity");

const setHoldingQuantityH2ElementAsEditable = () => {
  holdingQuantityH2Element.contentEditable = true;
  holdingQuantityH2Element.focus();
  updateButton.hidden = true;
  deleteLink.hidden = true;
  confirmUpdateButton.hidden = false;
};

const setHoldingQuantityH2ElementAsNonEditable = () => {
  holdingQuantityH2Element.contentEditable = false;
  updateButton.hidden = false;
  deleteLink.hidden = false;
  confirmUpdateButton.hidden = true;
};

if (updateButton) {
  updateButton.addEventListener("click", setHoldingQuantityH2ElementAsEditable);
}

const sendHoldingQuantityH2ElementToBackEnd = () => {
  const portfolioId = updateButton.getAttribute("data-portfolioid");
  const holdingId = updateButton.getAttribute("data-holdingid");

  axios
    .patch(`/dashboard/portfolio/${portfolioId}/holding/${holdingId}/update`, {
      quantity: Number(holdingQuantityH2Element.innerText),
    })
    .then((updatedHolding) => {
      holdingQuantityH2Element.innerText = updatedHolding.data.quantity;
      setHoldingQuantityH2ElementAsNonEditable();
    })
    .catch((err) => console.error(err));
};

if (confirmUpdateButton) {
  confirmUpdateButton.addEventListener(
    "click",
    sendHoldingQuantityH2ElementToBackEnd
  );
}
