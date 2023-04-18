import React, {useState} from "react";
import axios from 'axios';
import { useNavigate, navigate, Link } from "react-router-dom";

const CreateExercise = (props) => {

    const {exerciseList, setExerciseList} = props;
    const [exerciseName, setExerciseName] = useState("");
    const navigate = useNavigate();
    
    console.log('props.user: ', props.user);

    if(props.user === undefined){
        navigate("/");
    }

    function handleLogout () {
        axios
            .post("http://localhost:8000/api/logout_user")
            .then((res) => {
                props.setUser(undefined);
                navigate("/");
            })
    };

    const submitHandler = (e) => {
        e.preventDefault();

    axios
        .post("http://localhost:8000/api/create_exercise", {
            exerciseName,
        })
        .then((res) => {
            console.log(res.data);
            setExerciseName("");
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return (
        <   div className="CreateExercise">
                <Link to={"/dashboard"}>Home</Link>
                <Link to={"/"} onClick={handleLogout}>Logout</Link>
                <h1>Create Exercise</h1>
    
                <form onSubmit={submitHandler}>
    
                    <div className="form-fields">
                        <label>Exercise Name</label>
                        <input
                            onChange={(e) => setExerciseName(e.target.value)}
                            value={exerciseName}
                            name="exerciseName"
                            type="text"
                        />
                    </div>
    
                    <br />
    
                    
                    <input className="submit-input" type="submit" value="Create new Exercise"/> 
    
                </form>
            </div>
        );
    }

export default CreateExercise;
