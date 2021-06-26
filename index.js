const taskContainer = document.querySelector(".task__container");

//creating array for storing objects taskData:
const globalStore = [];





const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
       <div class="card ">
         <div class="card-header d-flex justify-content-end gap-2">
           <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
           <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
         </div>
         <img src=${taskData.imageUrl} class="card-img-top">
         <div class="card-body">
           <h5 class="card-title">${taskData.taskTitle}</h5>
           <p class="card-text">${taskData.taskDescription}</p>
           <a href="#" class="btn btn-primary">${taskData.taskType}</a>
         </div>
         <div class="card-footer">
           <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
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
    globalStore.push(taskData);
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






//issues
// 1) refresh will delete all the page data  => local storage harddrive ssd => not more than 5mb
//api = application programming interface => application is local storage and we are accessing it via javascript
// first we need array to store our cards




//features 
//1) delete the card
//2) edit the card
//3) open the card