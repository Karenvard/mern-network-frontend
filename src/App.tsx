import Header from "./Components/Header/Header";
// @ts-ignore
import classes from "./App.module.css"
import {BrowserRouter} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks/hooks";
import {authThunks} from "./store/Thunks";
import axios from "axios";

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authThunks.getAuthProfile())
    }, [])
  return <BrowserRouter>
        <div className={classes.container}>
            <Header/>
        </div>
    </BrowserRouter>
}

export default App;
