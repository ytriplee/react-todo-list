
function TaskItem({ task, toggleStatus, moveTaskDown, removeTask, moveTaskUp }){

    return(
        <li>
            <span 
                style={{textDecoration: task.completed ? "line-through" : "none"}}>
                <input  type="checkbox" checked={task.completed} 
                        onChange={() => toggleStatus(task.id)} /> 
                        {task.name}
            </span>
            <button onClick={() => moveTaskUp(task.id)}>Move👆</button>
            <button onClick={() => removeTask(task.id)}>Delete🚮</button>
            <button onClick={() => moveTaskDown(task.id)}>Move👇</button>
        </li>
    );
}
export default TaskItem