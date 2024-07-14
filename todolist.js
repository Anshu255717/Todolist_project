let array;
let month=["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let date=new Date();
let finaldate=days[date.getDay()]+"  "+date.getDate()+" - "+month[date.getMonth()-1]+" - "+date.getFullYear();
let inputs;
document.getElementById("date-container").innerHTML=`<i class="fa-solid fa-calendar-days"></i>  ${finaldate}`;
const main=document.getElementById("tasks-container");
//attaching load event listener to window object
window.addEventListener('load',()=>
 {
    if(localStorage.tasks)
     {
        let task=JSON.parse(localStorage.getItem('tasks'));
        task.forEach(tasks=> addtask(tasks));
     }
 })
 //attaching click event listener on add task button
document.getElementById("add").addEventListener('click',()=>
{
   inputs=document.getElementById("task").value;
   if(inputs)
   {
     let task=JSON.parse(localStorage.getItem('tasks'))||[];
     task.push(inputs);
     localStorage.setItem('tasks',JSON.stringify(task));
   }
   addtask(inputs);
}) 
//function to add task in tasklist
function addtask(inputs)
{
   const divs=document.createElement('div');
   const mark=document.createElement('input');
   mark.type='checkbox';
   const mainss=document.createElement('div');
   mark.classList.add('marker');
   mainss.classList.add('main-div');
   divs.classList.add('addtask');
   divs.innerHTML=inputs;
   document.getElementById("task").value=" ";
   mainss.append(mark,divs);
   main.append(mainss);
   divs.addEventListener('click', (event) =>{
    removes(divs);
   })
}
//function to remove task
 function removes(divss)
 {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index=tasks.indexOf(divss.innerHTML);
    if(index!=-1)
    {
        tasks.splice(index,1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
     }
     divss.parentElement.remove();
 }
 //attaching keypress event on entered task
   document.getElementById("task").addEventListener('keypress',(item)=>
    {
      inputs=document.getElementById("task").value;
       if(item.key==="Enter")
       {
        if(inputs)
         {
         let task=JSON.parse(localStorage.getItem('tasks'))||[];
          task.push(inputs);
          document.getElementById("task").value=" ";
          localStorage.setItem('tasks',JSON.stringify(task));
         }
          addtask(inputs);
       }
    })
    //attaching click event listener on clone task button
   document.getElementById("clone").addEventListener('click',()=>
    {
    const newcontainer=document.createElement('div');
    newcontainer.classList.add('newcontainers');
    const par=document.getElementById("tasks-container");
    if(par.lastChild.innerHTML==null)
    {
        alert("no task present in list");
    }
    else
    {
      const clone=par.cloneNode(true);
      newcontainer.append(clone);
      document.getElementById("task-container").append(newcontainer);
    }
   })
   //attaching click event listener to remove clone task button to remove clone list
   document.getElementById("remove-clone").addEventListener('click',()=>
    {
        const mains=document.getElementById("task-container");
        const clones = document.getElementsByClassName('newcontainers');
        if (clones.length > 0) 
        {
          mains.removeChild(clones[0]);
        } 
        else 
        {
           alert("No cloned containers to remove.");
        }
    })