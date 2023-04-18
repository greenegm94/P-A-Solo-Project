import React, {useEffect, useState} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import axios from "axios";
import '../App.css';
const ViewWorkout = (props) => {

    const id = useParams();
    const navigate = useNavigate();
    const [workout, setWorkout] = useState({exercises: []});
    const [editWorkout, setEditWorkout] = useState(false);
    const [exerciseList, setExerciseList] = useState([]); // All available exercises
    const [name, setName] = useState(workout?._doc?.workoutName);

    if(props.user === undefined){
        navigate("/");
    }

    if(!editWorkout && name !== workout?._doc?.workoutName){
        setName(workout?._doc?.workoutName);
    }

    const saveWorkout = () => {
        axios.put(`http://localhost:8000/api/edit_workout/${id.id}`, {
            workoutName: name
        })
        .then((res) => {
            axios.get(`http://localhost:8000/api/get_workout/${id.id}`)
            .then((res) => {
                console.log('res.data: ', res.data);
                setWorkout(res.data);
                setEditWorkout(false);
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/exercises")
        .then((res) => {
            setExerciseList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/get_workout/${id.id}`)
            .then((res) => {
                console.log('res.data: ', res.data);
                setWorkout(res.data);
            })
            .catch((err) => console.log(err))
    }, [id.id])

    return (
        <div>
            {editWorkout === false && <div>
                <h1>
                    {name}
                    <button onClick={() => setEditWorkout(true)}>Edit</button>
                </h1>
            </div>}

            {editWorkout === true && <div>
                <h1>
                    <div className="form-fields">
                        <label>Workout Name: </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name="name"
                            type="text"
                        />
                    </div>
                    <button onClick={() => saveWorkout()}>Save</button>
                </h1>
            </div>}
            <hr/>
            <Link to={"/dashboard"}>Home</Link>

            {workout.exercises.map((exercise) => 
                <div>
                    {exerciseList?.find(ex => ex._id === exercise.exerciseId).exerciseName}
                    <div>Weight (lbs): {exercise.weight}</div>
                    <div>Reps: {exercise.reps}</div>
                    <div>Rest Time (secods): {exercise.restTime}</div>
                </div>
            )}

        </div>

    );
};
    
export default ViewWorkout;