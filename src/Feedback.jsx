import { useState } from "react";

function Feedback(){

    const [comment, setComment] = useState([{id: null, text: ""}]);
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    function manageAddComment(e){

        e.preventDefault();
        if(feedback.trim() === ""){
            setError("Please enter comment");
            return;
        }
        setComment(c => [...c, {id: Date.now(), text: feedback.trim()}]);
        setFeedback("");
    }

    return(<>
        <form onSubmit={manageAddComment}>
            <input  type="text" value={feedback}
                    onChange={(e) => {setFeedback(e.target.value); setError("")}}
                    placeholder="Enter comment ....." /><br/>
            <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
        {comment.map(comment => <h3 key={comment.id}>{comment.text}</h3>)}
    </>);
}
export default Feedback