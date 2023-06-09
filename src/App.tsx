import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
// @ts-ignore
import Panel from "./components/common/Panel/Panel";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import UsersPage from "./components/pages/UsersPage/UsersPage";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import SignupPage from "./components/pages/SignupPage/SignupPage";
import SigninPage from "./components//pages/SigninPage/SigninPage";
import { useEffect } from "react";
import { authThunks } from "./store/Thunks";

const App = () => {
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector(state => state.authReducer)
    useEffect(() => {
        dispatch(authThunks.getAuthProfile());
    }, [])
  return <BrowserRouter>        
        <div  style={{width: "100vw", height: "100vh"}}>
            <Panel/>
            {isAuth 
            ? <Routes>
                <Route path="*" element={<Navigate to="/profile"/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/users" element={<UsersPage/>}/>
            </Routes> 
            
            : <Routes>
                <Route path="*" element={<SigninPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/signin" element={<SigninPage/>}/>
             </Routes>}
        </div>
    </BrowserRouter>
}

export default App;
