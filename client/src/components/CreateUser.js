import React, {useState} from "react";
import axios from "axios";
import { useNavigate, navigate, Link } from "react-router-dom";

const CreateUser = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

    axios
        .post("http://localhost:8000/api/create_user", {
            firstName, 
            lastName,
            email,
            password,
            confirmPassword,
        })
        .then((res) => {
            if(res.data.message){
                setErrorMessage(res.data.message);
            } else {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                props.setUser(res.data.user);
                navigate("/dashboard");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    return (
        <div>

            <form onSubmit={submitHandler}>

                <h1>Register User</h1>
            
                <div className="form-fields">
                        <label>First Name</label>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            name="firstName"
                            type="text"
                        />
                    </div>

                <div className="form-fields">
                    <label>Last Name</label>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        name="lastName"
                        type="text"
                    />
                </div>

            <   div className="form-fields">
                    <label>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        type="text"
                    />
                </div>

                <div className="form-fields">
                    <label>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        type="password"
                    />
                </div>

                <div className="form-fields">
                    <label>Confirm Password</label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        name="confirmPassword"
                        type="password"
                    />
                </div>

                <input className="submit-input" type="submit" value="Create User"/>

            </form>

        </div>

    );
};

export default CreateUser;