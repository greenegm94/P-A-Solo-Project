import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from "react";
import LoginRegister from './components/LoginRegister';
import CreateWorkout from './components/CreateWorkout';
import CreateExercise from './components/CreateExercise';
import Dashboard from './components/Dashboard';
import ViewWorkout from './components/ViewWorkout';

function App() {

  const [user, setUser] = useState();
  return (
    <div className="App">
      <BrowserRouter className="App">
        <Routes>
          <Route exact path ="/" element = {<LoginRegister setUser={setUser}/>}/>
          <Route exact path ="/dashboard" element = {<Dashboard user={user} setUser={setUser}/>}/>
          <Route path ="/create" element = {<CreateWorkout user={user} setUser={setUser}/>}/>
          <Route path ="/create_exercise" element = {<CreateExercise user={user} setUser={setUser}/>}/>
          <Route path ="/view/:id" element = {<ViewWorkout user={user} setUser={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
