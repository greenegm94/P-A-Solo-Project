import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, navigate, Link } from "react-router-dom";
import '../App.css';

function Dashboard(props) {
    const navigate = useNavigate();
    const [workoutList, setWorkoutList] = useState([]);

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

    const handleDelete = (workout) => {
        axios.delete(`http://localhost:8000/api/delete/${workout._id}`)
        .then((res) => {
            console.log(res.data);
            setWorkoutList(workoutList.filter((wo, index) => wo._id !== workout._id));
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/get_workouts/${props.user?._id}`)
        .then((res) => {
            setWorkoutList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

    console.log('workoutList: ', workoutList);


    return (
    <   div className="Dashboard">
            <h1>Welcome {props.user?.firstName}</h1>
            <Link className="link" to={"/"} onClick={handleLogout}>Logout</Link>
            <Link className="link" to={"/create"}>Create Workout</Link>

            {
                workoutList.map((workout, index) => (
                    <div key = {index}className='workout'>
                        <h3>{workout.workoutName}</h3>
                        {/* <Link to={`/note/edit/${note._id}`}>
                            Edit
                        </Link> */}
                        <button onClick={() => handleDelete(workout)}>Delete</button>
                        <button onClick={() => navigate(`/view/${workout._id}`)}>View</button>
                    </div>
                ))
            
            }

        </div>
    );
}

export default Dashboard;
