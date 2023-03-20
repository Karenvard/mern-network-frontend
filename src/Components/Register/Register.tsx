import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/hooks";
import {authThunks} from "../../store/Thunks";

const Register = () => {
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [vorname, setVorname] = useState<string>('');
    function Register() {
        if (login && password && name && vorname) {
            dispatch(authThunks.register({login, password, name, vorname}))
        }
    }
    return <div>
        Login - <input onChange={(e) => setLogin(e.target.value)} type="text"/> <br/>
        Name - <input onChange={(e) => setName(e.target.value)} type="text"/> <br/>
        Vorname - <input onChange={(e) => setVorname(e.target.value)} type="text"/> <br/>
        Password -  <input onChange={(e) => setPassword(e.target.value)} type="text"/> <br/>
        <button onClick={Register}>Register</button>
    </div>
};

export default Register;