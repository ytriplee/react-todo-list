import { useState } from "react";

function Content(){

    const [club, setClub] = useState([]);
    const [clubYear, setClubYear] = useState("2000");
    const [clubStadium, setClubStadium] = useState("");
    const [clubName, setClubName] = useState("");

    function addClub(){

        if(clubName,clubStadium,clubYear.trim() !== ""){
            const newInfo = {name: clubName, stadium: clubStadium, year: clubYear}
            setClub(c => [...c, newInfo]);
            setClubName("");
            setClubStadium("");
            setClubYear("");
        }
    }

    function removeClub(index){

        setClub(c => c.filter((_, i) => i !== index));
    }

    function manageClubYear(event){

        setClubYear(event.target.value);
    }

    function manageClubStadium(event){

        setClubStadium(event.target.value);
    }

    function manageClubName(event){

        setClubName(event.target.value);
    }

    return(
        <div>
            <h1>Club Content For Various Clubs</h1>
            <h3>Club Name: {clubName}</h3>
            <h3>Stadium Name: {clubStadium}</h3>
            <h3>Year Founded: {clubYear}</h3>
            <ul>
                {club.map((club, index) =>  <li onClick={() => removeClub(index)} key={index}><b>Name:</b> {club.name}<br/> 
                                            <b>Stadium:</b> {club.stadium}<br/>
                                            <b>Year:</b> {club.year}</li>)}
            </ul>
            <input type="text" value={clubName} onChange={manageClubName} placeholder="Enter Club Name..." /><br/>
            <input type="text" value={clubStadium} onChange={manageClubStadium} placeholder="Enter Stadium Name" /><br/>
            <input type="number" value={clubYear} onChange={manageClubYear} /><br/>
            <button onClick={addClub}>Add Info</button>
        </div>
    );
}
export default Content