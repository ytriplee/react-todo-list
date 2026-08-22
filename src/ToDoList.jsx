import { useState, useEffect, Fragment } from "react";
import TaskItem from "./TaskItem";
import TaskSummary from "./TasksSummary";

function ToDoList(){

    const [tasks, setTasks] = useState(() => {

                const savedTasks = localStorage.getItem("tasks");

                    if(savedTasks){
                        return JSON.parse(savedTasks);
                    };

                    return  [{id: 1, name: "Eat breakfast", completed: false}, 
                             {id: 2, name: "Take your bath", completed: false}, 
                             {id: 3, name: "Go to work", completed: false}]
                });
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingNameId, setEditingNameId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editError, setEditError] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        localStorage.setItem("tasks", JSON.stringify(tasks))
    },[tasks])

    const filteredTasks = tasks.filter(task =>  {

        if(filter === "all"){
            return true
        }

        if(filter === "completed"){
            return task.completed;
        }

        if(filter === "pending"){
            return !task.completed;
        }
    });

    let message = "";

    if(filteredTasks.length === 0){
        message = "No tasks available";
    }
    else if(filteredTasks.length <= 3){
        message = "You're doing great, keep it up";
    }
    else{
        message = "Your day has been very busy";
    }

    function toggleStatus(id){
        setTasks(t => t.map((task) => {
            if(task.id === id){
                return {
                    ...task,
                    completed: !task.completed,
                }
            }
            return task;
        }))
    }

    function startEdit(task){

        setEditingNameId(task.id);
        setEditName(task.name);
    }

    function saveEdit(e){

        e.preventDefault();

        if(editName.trim() === ""){
            setEditError("Input cannot be empty");
            return;
        }
        if(editName.trim().length < 3){
            setEditError("Input must be at least 3 characters");
            return;
        }

        setTasks(t =>
            t.map(task => {
                if(task.id === editingNameId){
                    return {
                        ...task, name: editName.trim(),
                    }
                }
                return task;
            })
        );
        setEditingNameId(null);
        setEditError("");
        setEditName("");
    }

    function addTask(e){

        e.preventDefault();
        if(newTask.trim() === ""){
            setError("Please enter task");
            return;
        }
        const newTaskObject = {
                id: Date.now(),
                name: newTask.trim(), 
                completed: false,
        }
        setTasks(t => [...t, newTaskObject]);
        setNewTask("");
    }

    function removeTask(id){

        setTasks(t => t.filter(task => task.id !== id));
    }

    function moveTaskUp(id){

        const index = tasks.findIndex(task => task.id === id);
        if(index > 0){
            const reorderedTasks = [...tasks];
            [reorderedTasks[index], reorderedTasks[index - 1]] = 
            [reorderedTasks[index - 1], reorderedTasks[index]];
            setTasks(reorderedTasks);
        }
    }

    function moveTaskDown(id){

        const index = tasks.findIndex(task => task.id === id);
        if(index < tasks.length - 1){
            const reorderedTasks = [...tasks];
            [reorderedTasks[index], reorderedTasks[index + 1]] = 
            [reorderedTasks[index + 1], reorderedTasks[index]];
            setTasks(reorderedTasks);
        }
    }

    return(
        <div>
            <h2>My To-Do-List App</h2>

            <form onSubmit={addTask}>
                <input  type="text" value={newTask} 
                        onChange={(e) => {setNewTask(e.target.value); setError("")}} 
                        placeholder="Enter new task..." />
                <button type="submit">➕ task</button>
            </form>
            {error && <p>{error}</p>}

            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            <ul>
                {filteredTasks.length === 0 ? (<li>{message}</li>) : 
                                            (filteredTasks.map(task => 
                                                task.id === editingNameId ? (
                                                <Fragment key={task.id}>
                                                    <form onSubmit={saveEdit}>
                                                        <input  type="text" 
                                                                value={editName}
                                                                onChange={(e) => {setEditName(e.target.value); setEditError("");}}
                                                        />
                                                        <button type="submit">Save</button>
                                                        <button type="button" onClick={() => setEditingNameId(null)}>Cancel</button>
                                                    </form>
                                                    {editError && <p>{editError}</p>}
                                                </Fragment>
                                                ):
                                                (<TaskItem  key={task.id}
                                                            task={task} 
                                                            toggleStatus={toggleStatus}
                                                            moveTaskDown={moveTaskDown} 
                                                            removeTask={removeTask}
                                                            moveTaskUp={moveTaskUp}
                                                            startEdit={startEdit} />)))}
                                                                                                       
            </ul>
            {message}
            <TaskSummary tasks={tasks} />
        </div>
    );

}
export default ToDoList