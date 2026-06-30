
//now going to work upon beutiful removal of the book

const addBookBtn = document.querySelector(".addBook-btn")
const submitBookButton = document.querySelector("#addDialog button")
const deleteBookButton = document.querySelector("#removeDialog button")
const removeBookBtn = document.querySelector(".removeBook-btn")
const cancel = document.querySelector(".submit-button #cancel")
const allInputs = document.querySelectorAll("#addDialog .upper-dialog-cont input")

const NOT_FOUND = 'NOT_FOUND'
const SUCCESS = 'SUCCESS'

const library = [];

// Default books added first
addBook("moms","Eric's tricks", 55 , true)
addBook("karions","Immaginations", 45 , true)
addBook("ons","Nations", 5 , true)
addBook("kk2","Culture", 50 , false)

//-----------EVENT LISTENERS--------------

cancel.addEventListener("click",()=>{
  addDialog.close();
})

addBookBtn.addEventListener("click",()=>{
  addDialog.showModal()
});

removeBookBtn.addEventListener("click", () => {
  const removeDialog = document.getElementById("removeDialog");
  removeDialog.innerHTML = ""; 

  const bookListcancel = document.createElement("button")
  bookListcancel.classList.add("bookListcancel")
  bookListcancel.textContent = "Back"

  bookListcancel.addEventListener("click",()=>{
    removeDialog.close()
  })

  const bookList = document.createElement("div");
  bookList.classList.add("bookList");

  const renderList = () => {
    bookList.innerHTML = ""; 
    
    if (library.length === 0) {
      removeDialog.close();
      return;
    }

    library.forEach((book, index) => {
      const bookRow = document.createElement("div");
      bookRow.classList.add("book-row");
      bookRow.textContent = `${book.name} `;

      const xButton = document.createElement("button");
      xButton.classList.add("xButton");
      xButton.innerText = "X";

      xButton.addEventListener("click", () => {
        library.splice(index, 1); 
        renderList();
        loadDefaultBooks();
      });

      bookRow.appendChild(xButton);
      bookList.appendChild(bookRow);

      bookList.append(bookListcancel);

    });
  };

  renderList(); 
  removeDialog.appendChild(bookList);
  removeDialog.showModal(); 

});


submitBookButton.addEventListener("click", ()=>{
    const userInputauthor = document.querySelector("#book-author")
    const userInputName = document.querySelector("#book-name")
    const userInputpages = document.querySelector("#book-pages")
    const checkbox = document.getElementById("book-read")

    if(userInputauthor.value =='' ||userInputName.value ==='' ||
      userInputpages.value === ''
    ){

      prompt("some fields missing")
      return
    }
    
    const response = addBook(userInputauthor.value, userInputName.value,Number(userInputpages.value),checkbox.checked)
    updateGui(response);
    addDialog.close();
});

//----------------End of event listener--------------

//-------------FUNCTIONS------------

function getUniqueId(){
    return crypto.randomUUID()
}

function loadDefaultBooks(){
    document.querySelector(".bookName-list").innerHTML = '';
    document.querySelector(".reads-list").innerHTML = '';
    document.querySelector(".pages-list").innerHTML = '';
    document.querySelector(".authors-list").innerHTML = '';

    library.forEach(element => {
      updateGui(element)

    });
}

function addBook(author,name , pages, read = false){
  const newBook = {
    bookId:getUniqueId(),
    author,
    name,
    pages,
    read
  }
  
  library.push(newBook)
  return newBook
}

function showLibrary() {
  return library.map(element => {
    return `${element}`;
  });
}

function removeBook(bookName){
    let found = library.findIndex(element => element.name === bookName )
    if(found === -1){
        return NOT_FOUND
    }
    library.splice(found,1)
    return SUCCESS
}

//--------responsive to update the --GUI--
function updateGui(book){
    const bookName = document.querySelector(".bookName-list");
    const author = document.querySelector(".authors-list");
    const pages = document.querySelector(".pages-list");
    const readStatus = document.querySelector(".reads-list");

    const addedBookName = document.createElement("div");
    const addedBookAuthor = document.createElement("div");
    const addedBookPages = document.createElement("div");
    const addedBookReadStatus = document.createElement("div");

    addedBookName.classList.add("addedBookNameDiv")
    addedBookAuthor.classList.add("addedBookAuthorDiv")
    addedBookPages.classList.add("addedBookPagesDiv")
    addedBookReadStatus.classList.add("addedBookReadStatus")

    addedBookName.textContent = book.name
    addedBookAuthor.textContent = book.author
    addedBookPages.textContent = book.pages
    addedBookReadStatus.textContent = book.read ? "Yes" : "No" 

    bookName.append(addedBookName)
    author.append(addedBookAuthor)
    pages.append(addedBookPages)
    readStatus.append(addedBookReadStatus)
}



loadDefaultBooks();

