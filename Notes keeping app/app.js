let Notes_Array = []; //as a source for communication bw locals storage and user

// DOM elements
const Text_Area = document.getElementById("textArea");
const ADD_NOTE_BTN = document.getElementById("btn");
const Notes_Container = document.getElementById("Notes_container");
const SEARCH_BAR = document.getElementById("search_bar");

// show nodes on app startup if any 
showNotesFromLocalStorage();


// Add a note 
function addNotes() {

    let NOTE = Text_Area.value;
    if(NOTE.length==0)
    {
        alert("Cannot add empty note!");
        return false;
    }
  
    if (localStorage.getItem("Notes") == null) {
        Notes_Array.push(NOTE);
        localStorage.setItem("Notes", JSON.stringify(Notes_Array));
    } else {
        Notes_Array = JSON.parse(localStorage.getItem("Notes"));
        Notes_Array.push(NOTE);
        localStorage.setItem("Notes", JSON.stringify(Notes_Array));
        Text_Area.value = "";
    }
    // after adding node lets show all of them 
    showNotesFromLocalStorage();
}
ADD_NOTE_BTN.addEventListener("click", addNotes);


//functino to show notes on screen by fetching inforamtion from local storage
function showNotesFromLocalStorage() {

    let TEMP = JSON.parse(localStorage.getItem("Notes"));
    if (TEMP != null) {
        let Note_TEMPLATE = "";
        TEMP.forEach((element, index) => {
            Note_TEMPLATE += `
            <div class="card" id=card${index} style="width: 22rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="Note_body" class="card-text">${element}</p>
                    <button id=${index} onClick="delete_Note(this.id)" class="btn-danger delete-btn btn" id="btn">Delete</button>
                </div>
            </div>
            `
        });
        Notes_Container.innerHTML = Note_TEMPLATE;
    }
}
// Function to delete the notes
function delete_Note(index) {

    let TEMP = JSON.parse(localStorage.getItem("Notes"));
    if (TEMP != null) {
        TEMP.splice(index, 1);
        Notes_Array = TEMP;
        localStorage.setItem("Notes", JSON.stringify(Notes_Array));
        showNotesFromLocalStorage();
    } else {
        Notes_Array = [];
    }
}
//function to search for specific note
SEARCH_BAR.addEventListener("input", search)

function search() {

    let Note_Cards = document.getElementsByClassName("card");
    let Searched_Text = SEARCH_BAR.value;
    if (Searched_Text != null) {
        Array.from(Note_Cards).forEach(element => {
            let Note_Body = element.children[0].children[1].innerHTML;
            if (Note_Body.includes(Searched_Text)) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        })

    }


}
