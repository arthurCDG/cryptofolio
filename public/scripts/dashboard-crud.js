const buttonCreate = document.querySelector("#create-portfolio button");
const nameCreate = document.querySelector("#create-name");
const notesCreate = document.querySelector("#create-notes");
const portfoliosContainer = document.querySelector("#portfolios-container");
let buttonUpdate = document.getElementsByClassName("btn-update");
let buttonDelete = document.getElementsByClassName("btn-delete");

console.log(buttonCreate);

function createPortfolioElemt(portfolio) {
  const newDiv = document.createElement("div");
  newDiv.className = "portfolio";
  portfoliosContainer.appendChild(newDiv);

  const newLink = document.createElement("a");
  newLink.href = `/dashboard/portfolio/${portfolio._id}`;
  newDiv.appendChild(newLink);

  const newName = document.createElement("p");
  newName.className = "name";
  newName.innerText = portfolio.name;
  newLink.appendChild(newName);

  const newNotes = document.createElement("p");
  newNotes.className = "notes";
  newNotes.innerText = portfolio.notes;
  newLink.appendChild(newNotes);

  const btnUpdate = document.createElement("button");
  btnUpdate.dataset.userId = portfolio._id;
  btnUpdate.dataset.name = portfolio.name;
  btnUpdate.dataset.notes = portfolio.notes;
  btnUpdate.className = "btn-update";
  btnUpdate.innerText = "Edit";
  newDiv.appendChild(btnUpdate);

  const btnDelete = document.createElement("button");
  // btnDelete.setAttribute('data-userId-2', portfolio._id)
  btnDelete.dataset.userId = portfolio._id;
  btnDelete.className = "btn-delete";
  btnDelete.innerText = "Delete";
  newDiv.appendChild(btnDelete);

  updatePortfolio();
  deletePortfolio();
}

if (buttonCreate) {
  buttonCreate.addEventListener("click", () => {
    axios
      .post("/dashboard/create", {
        name: nameCreate.value,
        notes: notesCreate.value,
      })
      .then((newPortfolio) => {
        // console.log(newPortfolio.data, "NEWPORTFOLIO DATA HERE");
        createPortfolioElemt(newPortfolio.data);
      })
      .catch((err) => console.log(err));
  });
}

const updatePortfolio = () => {
  buttonUpdate = document.getElementsByClassName("btn-update");
  [...buttonUpdate].forEach((button) => {
    button.addEventListener("click", (evt) => {
      const divEdit = document.createElement("div");
      divEdit.className = "edit-portfolio";
      evt.target.parentElement.appendChild(divEdit);

      const nameEdit = document.createElement("input");
      nameEdit.className = "edit-name";
      nameEdit.value = evt.target.dataset.name;
      divEdit.appendChild(nameEdit);

      const noteEdit = document.createElement("input");
      noteEdit.className = "edit-notes";
      noteEdit.value = evt.target.dataset.notes;
      divEdit.appendChild(noteEdit);

      const btnValidate = document.createElement("button");
      btnValidate.className = "btn-validate";
      btnValidate.innerText = "validate";
      divEdit.appendChild(btnValidate);

      const id = evt.target.dataset.userId;

      btnValidate.addEventListener("click", () => {
        axios
          .patch("/dashboard/update/" + id, {
            name: nameEdit.value,
            notes: noteEdit.value,
          })
          .then(({ data }) => {
            console.log(data, "EDITED PORTFOLIO HERE");
            const div = btnValidate.closest(".portfolio");
            const editedName = div.querySelector(".name");
            const editedNotes = div.querySelector(".notes");
            editedName.textContent = data.name;
            editedNotes.textContent = data.notes;
            btnValidate.closest(".edit-portfolio").remove();
            nameEdit.value = "";
            noteEdit.value = "";
          })
          .catch((err) => console.log(err));
      });
    });
  });
};

// $0.addEventListener('click', (e) => {
//     const div = document.createElement('div')
//     // input 1
//     // input 2
//     // button
//     const id = e.target.dataset.userId
// axios.patch('/something/' + id, {})
// }

const deletePortfolio = () => {
  buttonDelete = document.getElementsByClassName("btn-delete");
  [...buttonDelete].forEach((button) => {
    button.addEventListener("click", () => {
      // console.log(button.dataset.userId, "DELETE BTN ID HERE")
      axios
        .delete("/dashboard/delete/" + button.dataset.userId)
        .then(() => {
          button.closest(".portfolio").remove();
        })
        .catch((err) => console.log(err));
    });
  });
};

window.addEventListener("load", () => {
  updatePortfolio();
  deletePortfolio();
});
