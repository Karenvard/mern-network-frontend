import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/Store";
import {Navigate} from "react-router-dom";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useWithAuth = (isAuth: boolean, TOKEN: string | null) => {
    if (!isAuth || !TOKEN) {
        return <Navigate to={"/login"}/>
    }
}
