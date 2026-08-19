
function TaskSummary({tasks}){

    const completed = tasks.filter(task => task.completed);
    const pending = tasks.length - completed.length;

    return(
        <>
            <h3>Total Tasks: {tasks.length}</h3>
            <h3>Completed Tasks: {completed.length} </h3>
            <h3>Pending Tasks: {pending}</h3>
        </>
    );
}
export default TaskSummary