import {useState, useEffect} from 'react'

function Work(){

    const [tasks, setTasks] = useState(() => {
        
        const savedData = localStorage.getItem("tasks");

        return savedData ? JSON.parse(savedData) :
                            [{id: 1, name: "Take your bath", completed: false},
                             {id: 2, name: "Eat breakfast", completed: false },
                             {id: 3, name: "Go to work", completed: false}]
    });
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks]);

    const filteredTasks = tasks.filter(task => {

        if(filter === "all"){
            return true;
        }

        if(filter === "completed"){
           return task.completed;
        }

        if(filter === "pending"){
            return !task.completed;
        }
    })

    let message = "";

    if(filteredTasks.length === 0){
        message = "No tasks available";
    }
    else if(filteredTasks.length <= 3){
        message = "You are doing great, keep it up";
    }
    else{
        message = "Your day has been quite busy";
    }

    function handleToggleTask(id){

        setTasks(t => t.map(task => {
            if(task.id === id){
                return {
                    ...task,
                    completed: !task.completed,
                }
            }
            return task;
        }))
    }

    function handleNewTask(event){

        setNewTask(event.target.value);
    }

    function handleAddTask(){

        if(newTask.trim() !== ""){
            setTasks(t => [...t, {id: t.length + 1, name: newTask, completed: false}]);
            setNewTask("");
            console.log(` Yere's Website ${new Date().getFullYear()}`);
        }
    }

    function handleRemoveTask(id){

        setTasks(t => t.filter(task => task.id !== id));
    }

    function handleToggleUp(id){

        const index = tasks.findIndex(task => task.id === id);
        if(index > 0){
            const toggleUp = [...tasks];
            [toggleUp[index], toggleUp[index - 1]] = [toggleUp[index - 1], toggleUp[index]];
            setTasks(toggleUp);
        }
    }

    function handleToggleDown(id){

        const index = tasks.findIndex(task => task.id === id);
        if(index < tasks.length - 1){
            const toggleDown = [...tasks];
            [toggleDown[index], toggleDown[index + 1]] = [toggleDown[index + 1], toggleDown[index]];
            setTasks(toggleDown);
        }
    }

    return(
        <div>
            <b><h1>To Do List App</h1></b>
            
            <input type="text" value={newTask} onChange={handleNewTask}
                   placeholder='Enter new task.....'
            />
            <button onClick={handleAddTask}><b>Add Task</b></button><br/>

            <button onClick={() => setFilter("all")}><b>All</b></button>
            <button onClick={() => setFilter("pending")}><b>PENDING</b></button>
            <button onClick={() => setFilter("completed")}><b>COMPLETED</b></button>
            <ul>
                {filteredTasks.length === 0 ? <h4>{message}</h4> : 
                                      filteredTasks.map((task, index) => 
                                      <li key={task.id}><span 
                                          style={{textDecoration: task.completed ? "line-through" : "none"}}>
                                        <input type='checkbox' checked={task.completed} 
                                               onChange={() => handleToggleTask(task.id)}
                                        />
                                        {task.name}
                                      </span>
                                      <button onClick={() => handleToggleUp(index)}>Move👆</button>
                                      <button onClick={() => handleRemoveTask(task.id)}>Del🚮</button>
                                      <button onClick={() => handleToggleDown(index)}>Move👇</button></li>)
                }
            </ul>
            <h3>Number of tasks: {filteredTasks.length}</h3>
            <p>{message}</p>
            <hr/>
            <p>&copy; Paul {new Date().getFullYear()} App</p>
        </div>
    );
}
export default Work