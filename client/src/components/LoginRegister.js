import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

function LoginRegister({setUser}) {
    return (
    <div className="LoginRegister">
        <CreateUser setUser={setUser}/>
        <LoginUser setUser={setUser}/>
    </div>
    );
}

export default LoginRegister;
