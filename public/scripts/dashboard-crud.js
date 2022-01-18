const { default: axios } = require("axios");

const buttonCreate = document.querySelector("#create-portfolio button");
const nameCreate = document.querySelector("#create-name")
const notesCreate = document.querySelector("#create-notes")
const portfolioContainer = document.querySelector("#portfolio-container")
console.log(buttonCreate);

function createPortfolioElemt(portfolio) {
    const newDiv = document.createElement("div")
    newDiv.className = "portfolios"
    portfolioContainer.appenchild(newDiv)


    const newLink = document.createElement("a")
    newLink.href = `/dashboard/portfolio/${portfolio._id}`
    newDiv.appendChild(newLink)

    const newName = document.createElement("p")
    newName.innerText = portfolio.name
    newLink.appendChild(newName)

    const newNote = document.createElement("p")
    newNote.innerText = portfolio.notes
    newLink.appendChild(newNote)

    const btnEdit = document.createElement("button")
    btnEdit.className = "btn-edit"
    btnEdit.innerText = "Edit"
    newDiv.appendChild(btnEdit)

    const btnDelete = document.createElement("button")
    btnDelete.className = "btn-delete"
    btnDelete.innerText = "Delete"
    newDiv.appendChild(btnDelete)

}

buttonCreate.addEventListener("click", () => {
    axios.post("/dashboard/create", { name: nameCreate, notes: notesCreate })
        .then((newPortfolio) => createPortfolioElemt(newPortfolio))
        .catch((err) => console.log(err))
});