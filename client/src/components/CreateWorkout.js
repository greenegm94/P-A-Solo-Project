import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const CreateWorkout = (props) => {

    const [exerciseList, setExerciseList] = useState([]); // All available exercises
    const [addedExercises, setAddedExercises] = useState([]); // Exercises in the Workout
    const [name, setname] = useState(""); // Name of the Workout

    const initalList = [];
    for(let i=0; i<10; i++){
        initalList.push(0);
    }

    const [weight, setweight] = useState(initalList); 
    const [reps, setreps] = useState(initalList);
    const [restTime, setresttime] = useState(initalList);  

    const [selectedExercise, setSelectedExercise] = useState(0); // id of the selected exercise
    const navigate = useNavigate();

    if(props.user === undefined){
        navigate("/");
    }

    const addExercise = (value) => {
        if(value===0){
            return;
        }
        const exercise = exerciseList.find(
            exercise => exercise._id===value
        );
        let newAddedExerciseList = addedExercises;
        newAddedExerciseList.push(exercise);
    };

    const createNewExercise = () => {
        navigate("/create_exercise");
    };

    
    useEffect(() => {
        axios.get("http://localhost:8000/api/exercises")
        .then((res) => {
            setExerciseList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

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

        let exerciseList = [];
        for(let i=0; i<addedExercises.length; i++){
            let exerciseToAddToList = {
                exerciseId: addedExercises[i]._id,
                weight: weight[i],
                reps: reps[i],
                restTime: restTime[i],
            }
            exerciseList.push(exerciseToAddToList);
        }

        console.log('exerciseList: ', exerciseList);

        axios
            .post("http://localhost:8000/api/create", {
                name: name,
                id: props.user._id,
                exercises: exerciseList
            })
            .then((res) => {
                console.log('res.data: ', res.data);
                navigate("/dashboard");

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
    <   div className="CreateWorkout">
            <h1>Create Workout</h1>
            
            <Link to={"/dashboard"}>Home</Link>
            <Link to={"/"} onClick={handleLogout}>Logout</Link>

            <form onSubmit={submitHandler}>

                <div className="form-fields">
                    <label>Workout Name</label>
                    <input
                        onChange={(e) => setname(e.target.value)}
                        value={name}
                        name="name"
                        type="text"
                    />
                </div>

                <br />

                {/*
                    Use addedExercises.map() to list the names of all added exercises
                */}

                {addedExercises.map((exercise) => 
                    <div>
                        {exercise.exerciseName}
                        <label>Weight (pounds)</label>
                        <input
                            onChange={(e) => {
                                let newWeight = weight;
                                newWeight[addedExercises.indexOf(exercise)] = e.target.value;
                                setweight(newWeight);
                            }}
                            name="weight"
                            type="number"
                        />
                        <label>Number of Reps</label>
                        <input
                            onChange={(e) => {
                                let newReps = reps;
                                newReps[addedExercises.indexOf(exercise)] = e.target.value;
                                setreps(newReps);
                            }}
                            name="reps"
                            type="number"
                        />
                        <label>Rest Time (seconds)</label>
                        <input
                            onChange={(e) => {
                                let newRestTime = restTime;
                                newRestTime[addedExercises.indexOf(exercise)] = e.target.value;
                                setresttime(newRestTime);
                            }}
                            name="restTime"
                            type="number"
                        />
                        <button onClick={() => {
                            let newList = addedExercises.filter((ex) => ex !== exercise);
                            setAddedExercises(newList);
                        }}>Delete</button>
                    </div>
                )}


                { addedExercises.length < 10 && <div className="form fields">
                <label>Exercises</label>
                    <select 
                        name ="Exercises"
                        onChange={(e) => {
                            setSelectedExercise(e.target.value);
                            addExercise(e.target.value);
                        }}
                        value={selectedExercise}
                        >
                        <option value={0}>Please Select an Exercise</option>
                        {exerciseList.map((exercise) => 
                            <option value={exercise._id}>{exercise.exerciseName}</option>
                        )}
                    </select>
                </div>}

                <button type="submit">Create this Workout</button>
                <button onClick={() => createNewExercise()}>Create New Exercise</button>


            </form>
        </div>
    );
}

export default CreateWorkout;