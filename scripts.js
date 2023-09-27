const myLibrary = [];
myLibrary.push(new Book("Sherlock Holmes", "Conan Doyle", 400 , true));

refreshTable();

const favDialog = document.getElementById("favDialog");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  console.log(this.title , this.author, this.pages, this.read);
  console.log(myLibrary);
}

function addBookToLibrary() {
  // do stuff here

  let inputTitle = document.getElementById("title").value;
  let inputAuthor = document.getElementById("author").value;
  let inputPages = document.getElementById("pages").value;

  if(inputTitle === ""){
    return;
  }

  myLibrary.push(new Book(inputTitle, inputAuthor, inputPages , false));
  console.log("Add book");
  refreshTable();
}

function newBookFunction() {
    modal.style.display = "block";
}

function refreshTable() {
  const table = createTableFromObjects(myLibrary);
  const tableContainer = document.getElementById('table-container');

  if(tableContainer.hasChildNodes())
    tableContainer.removeChild(tableContainer.firstElementChild);
  
  tableContainer.appendChild(table);
}

function createTableFromObjects(data) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  
  // Create table header row
  const keys = Object.keys(data[0]);
  for (const key of keys) {
    const headerCell = document.createElement('th');
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  // Create table data rows
  for (const obj of data) {
    const dataRow = document.createElement('tr');
    for (const key of keys) {
      const dataCell = document.createElement('td');
      dataCell.textContent = obj[key];
      dataRow.appendChild(dataCell);
    }
    table.appendChild(dataRow);
  }

  return table;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener("change", (e) => {
  confirmBtn.value = selectEl.value;
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(selectEl.value); // Have to send the select box value here.
});

