const buttonCreate = document.querySelector("#create-portfolio button");
const buttonEdit = document.querySelectorAll(".btn-edit")
const buttonDelete = document.querySelectorAll(".btn-delete")
const nameCreate = document.querySelector("#create-name")
const notesCreate = document.querySelector("#create-notes")
const portfolioContainer = document.querySelector("#portfolio-container")
console.log(buttonCreate);

function createPortfolioElemt(portfolio) {
    const newDiv = document.createElement("div")
    newDiv.className = "portfolios"
    portfolioContainer.appendChild(newDiv)


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
    editPortfolio()

    const btnDelete = document.createElement("button")
    btnDelete.className = "btn-delete"
    btnDelete.innerText = "Delete"
    newDiv.appendChild(btnDelete)
    deletePortfolio()
}

buttonCreate.addEventListener("click", () => {
    axios.post("/dashboard/create", { name: nameCreate.value, notes: notesCreate.value })
        .then((newPortfolio) => {
            console.log(newPortfolio.data);
            createPortfolioElemt(newPortfolio.data)
        })
        .catch((err) => console.log(err))
});

const editPortfolio = () => {
    buttonEdit.addEventListener("click", () => {

    })
}

const deletePortfolio = () => {
    buttonEdit.addEventListener("click", () => {

    })
}