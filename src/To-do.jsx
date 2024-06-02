import { useState} from 'react'
import searchIcon from './assets/search.svg'
import addIcon from './assets/add-plus.svg'
import closeIcon from './assets/close.svg'
import minusIcon from './assets/minus.svg'
function ToDoList() {

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState();
    const [isVisible, setIsVisible] = useState(false); // add the task(toggle)
    const [isEdit, setIsEdit] = useState(false); // edit the task (toggle)
    const [editTask,setEditTask] =useState();



    function handleSubmit(e) {
        e.preventDefault();  // e.preventDefault() is used to prevent the form from submitting and reloading the page when the Enter key is pressed 
        addToList();
        console.log(e.target.value)
    }
    // set task name
    function handleTaskName(e) {
        setNewTask(n => ({ ...n, taskName: e.target.value }))

    }
    //set due date of task
    function handleDate(e) {
        setNewTask(n => ({ ...n, dueDate: e.target.value }))

    }
    //set the task description
    function handleDesc(e) {
        setNewTask(n => ({ ...n, taskDes: e.target.value }))

    }
    // set task category
    function handleCategory(e) {
        setNewTask(n => ({ ...n, category: e.target.value }))
    }
    //add to the list
    function addToList() {
        setTask(t => [...t, newTask])
        setNewTask({ taskName: "", dueDate: "", taskDes: "" , category:""})
        setIsVisible(!isVisible)
    }
    //delete the task
    function handleRemove(index) {
        setTask(task.filter((_, i) => i !== index))
    }
    // open the add task form 
    function openForm() {
        setIsVisible(!isVisible);
    }
    function toEdit(index){
        setIsEdit(!isEdit);
        setEditTask(task[index]);

    }
    
    function searchbar(e) {
        // const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const searchValue = e.target.value;
        const listItems = document.getElementsByTagName('li');
        for (let i = 0; i < listItems.length; i++) {
            const item = listItems[i];
            const itemName = item.textContent.toLowerCase();

            (itemName.includes(searchValue)) ?
                item.style.display = 'block' : item.style.display = 'none';

        }

    }
    return (
        <div className='container'>
            <h1>To-Do List</h1>
            {/* add task button  */}
            <button onClick={openForm} className='Add-removeBtn'>{isVisible ? <img src={closeIcon}></img>: <img src={addIcon} />}</button>

            {/* add task Form */}
            {isVisible && (
                <div className='form-container'>
                    <h2>add new task</h2>
                    <form onSubmit={handleSubmit} className='inputForm d-flex gap-4'>
                        <input type="text" id="newTask" className="taskInput" placeholder="Enter the task to add " onChange={handleTaskName} required />

                        <input type="date" name="dueDate" id="taskDue" onChange={handleDate} />

                        <textarea name="description" id="taskDescription" placeholder='enter the description ' rows={5} onChange={handleDesc}></textarea>
                        <select name="caterogy" id="taskCategory" onChange={handleCategory}>
                            <option value="">select Category</option>
                            <option value="home">home</option>
                            <option value="work">work</option>
                            <option value="personal">personal</option>
                        </select>

                        <button className="addList myBtn" onClick={() => addToList}>Add</button>
                    </form>
                </div>
            )}

            {/* edit the task form  */}
            {isEdit && (
                <div className="editForm">
                    <form action="">
                        <h2>Edit task</h2>
                    <form onSubmit={handleSubmit} className='inputForm d-flex gap-4'>
                        <input type="text" id="newTask" className="taskInput" placeholder="Enter the task to add " onChange={handleTaskName} required value={editTask.taskName} />

                        <input type="date" name="dueDate" id="taskDue" onChange={handleDate} value={editTask.dueDate} />

                        <textarea name="description" id="taskDescription" placeholder='enter the description ' rows={5} onChange={handleDesc} value={editTask.taskDes}></textarea>
                        <select name="caterogy" id="taskCategory" onChange={handleCategory} value={editTask.category}>
                            <option value="">select Category</option>
                            <option value="home">home</option>
                            <option value="work">work</option>
                            <option value="personal">personal</option>
                        </select>

                        <button className="addList myBtn" onClick={() => addToList}>Add</button>
                    </form>
                    </form>
                </div>
            )}
            {/*dispaly the task --- main container */} 
            <div className="display-task">
                <div className='searchbar-container d-flex p-0 m-0'>
                    <input type="search" name="searchTask" id="searchInput" className='taskSearchBar' placeholder='Search the task here' onChange={searchbar} />
                    <img src={searchIcon} onClick={searchbar}/>
                </div>

                <div>
                    <ul className='task-container d-flex flex-column gap-4'>
                        {task.map((task, index) =>
                            <li key={index} className='task-list'>
                                <div className='d-flex justify-content-between'>

                                    <div >
                                        <h3>{task.taskName}</h3>
                                        <p>{task.dueDate}</p>
                                        <p>{task.category}</p>

                                    </div>

                                    <button onClick={() => handleRemove(index)} className='myBtn'>
                                        <img src={minusIcon} alt="remove" />
                                    </button>
                                    <button onClick={()=>toEdit(index)}> edit</button>
                                </div>

                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </div>
    );
}
export default ToDoList