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
  this.id = myLibrary.length;
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
  let inputRead = document.getElementById("read").checked;

  if(inputTitle === ""){
    return;
  }

  myLibrary.push(new Book(inputTitle, inputAuthor, inputPages , inputRead));
  console.log("Add book");
  refreshTable();
}

function newBookFunction() {
    modal.style.display = "block";
}

function editBookFunction(button) {
  console.log("Edit Book " + button.parentNode.parentNode.id);

  refreshTable();
}

function deleteBookFunction(button) {
  console.log("Delete Book " + button.parentNode.parentNode.id);

  let deleted = myLibrary[button.parentNode.parentNode.id];

  myLibrary.splice(button.parentNode.parentNode.id, 1);
 
  console.log("Removed: " + deleted);
  console.log("Remaining elements: " + myLibrary);

  refreshTable();
}

function refreshTable() {
  const tableContainer = document.getElementById('table-container');

  if(tableContainer.hasChildNodes())
    tableContainer.removeChild(tableContainer.firstElementChild);

  if(myLibrary.length === 0) return;

  const table = createTableFromObjects(myLibrary);  
  
  tableContainer.appendChild(table);
}

function createTableFromObjects(data) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  let bookId = 0;
  
  // Create table header row
  const keys = Object.keys(data[0]);
  for (const key of keys) {
    const headerCell = document.createElement('th');
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }

  const headerCell = document.createElement('th');
  headerCell.textContent = "Edit";
  headerRow.appendChild(headerCell);

  const deleteCell = document.createElement('th');
  deleteCell.textContent = "Delete";
  headerRow.appendChild(deleteCell);

  table.appendChild(headerRow);

  // Create table data rows
  for (const obj of data) {
    const dataRow = document.createElement('tr');
    let keyLoop = 0;
    for (const key of keys) {
      const dataCell = document.createElement('td');
      
      if(keyLoop === keys.length - 1){
        const checkboxCell = document.createElement('input');
        dataRow.appendChild(dataCell);
        dataCell.appendChild(checkboxCell);
        checkboxCell.setAttribute('type', 'checkbox');
        checkboxCell.setAttribute('class', 'tableCheckbox');
        
        if(obj.read === true){
          checkboxCell.setAttribute('checked', 'yes');
        }

      }else{
        dataCell.textContent = obj[key];
        dataRow.appendChild(dataCell);
      }

      keyLoop++;
      
    }

    const dataCell = document.createElement('td');
    const buttonCell = document.createElement('button');
    dataRow.appendChild(dataCell);
    dataCell.appendChild(buttonCell);
    buttonCell.textContent = 'Edit';
    buttonCell.setAttribute('class', 'editButton');
    buttonCell.setAttribute('onClick', 'editBookFunction(this)');

    const dataDeleteCell = document.createElement('td');
    const deleteCell = document.createElement('button');
    dataRow.appendChild(dataDeleteCell);
    dataDeleteCell.appendChild(deleteCell);
    deleteCell.textContent = 'Delete';
    deleteCell.setAttribute('class', 'deleteButton');
    deleteCell.setAttribute('onClick', 'deleteBookFunction(this)');
    
    table.appendChild(dataRow);
    
    dataRow.setAttribute('id', bookId);
    bookId++;

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

