const taskContainer = document.querySelector(".task__container");

//creating array for storing objects taskData:
const globalStore = [];





const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
       <div class="card ">
         <div class="card-header d-flex justify-content-end gap-2">
           <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
           <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
           <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
       </button>
         </div>
         <img src=${taskData.imageUrl} class="card-img-top">
         <div class="card-body">
           <h5 class="card-title">${taskData.taskTitle}</h5>
           <p class="card-text">${taskData.taskDescription}</p>
           <a href="#" class="btn btn-primary">${taskData.taskType}</a>
         </div>
         <div class="card-footer">
           <button type="button" class="btn btn-outline-primary float-end" >Open Task</button>
         </div>
       </div>
     </div>
     `;


const loadInitialCardData = () =>{
  //local storage to get the card data
  const getCardData = localStorage.getItem("tasky");
  //convert string to normal object
  const {cards} = JSON.parse(getCardData);
  //loop over those array of task object to create html card,inject it to dom
  cards.map((cardObject)=>{
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
    //update our global store
    globalStore.push(cardObject);
  })
};



const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };
       
    
   
          

     taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

     globalStore.push(taskData);
     localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));    //created a new object cards bcoz stringify accepts only objects

};



const deleteCard = (event) => {
  event = window.event;
  //id
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  //match the id of the element with the id inside the globalstore
  //if match found remove
  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
  //contact parent
  if(tagname === "BUTTON"){
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
}


//issues
// 1) refresh will delete all the page data  => local storage harddrive ssd => not more than 5mb
//api = application programming interface => application is local storage and we are accessing it via javascript
// first we need array to store our cards

const editCard = (event) => {
  const elementType = event.target.tagName;

  let taskTitle;
  let taskType;
  let taskDescription;
  let parentElement;
  let submitButton;

  if (elementType === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  taskTitle = parentElement.childNodes[3].childNodes[3];
  taskDescription = parentElement.childNodes[3].childNodes[5];
  taskType = parentElement.childNodes[3].childNodes[7];
  submitButton = parentElement.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.innerHTML = "Save Changes";
};


const saveEdit = (event) => {
  const targetID = event.target.getAttribute("name");
  const elementType = event.target.tagName;

  let parentElement;

  if (elementType === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  const taskTitle = parentElement.childNodes[3].childNodes[3];
  const taskDescription = parentElement.childNodes[3].childNodes[5];
  const taskType = parentElement.childNodes[3].childNodes[7];
  const submitButton = parentElement.childNodes[5].childNodes[1];

  const updatedData = {
    title: taskTitle.innerHTML,
    type: taskType.innerHTML,
    description: taskDescription.innerHTML,
  };

  console.log({ updatedData, targetID });

  const updateGlobalTasks = globalTaskData.map((task) => {
    if (task.id === targetID) {
      console.log({ ...task, ...updatedData });
      return { ...task, ...updatedData };
    }
    return task;
  });

  globalTaskData = updateGlobalTasks;

  saveToLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = "Open Task";
};



//features 
//1) delete the card
//2) edit the card
