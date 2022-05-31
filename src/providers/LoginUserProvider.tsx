import { createContext, ReactNode, SetStateAction, Dispatch, useState, useEffect, useContext } from "react";
import { Login } from "../components/pages/Login";
import { firebaseApp } from "../firebase";

import { User } from "../types/user";

export type LoginUserContextType = {
    loginUser: string | any;
    setLoginUser: Dispatch<SetStateAction<string | null>>
}

export const LoginUserContext = createContext<LoginUserContextType>(
    {} as LoginUserContextType
);

export const LoginUserProvider = (props: {children : ReactNode}) => {
    const { children } = props;
    const [ loginUser, setLoginUser ] = useState<string | any>(null);

    useEffect(() => {
        const unsubscribe = firebaseApp.fireauth.onAuthStateChanged((user) => {
            setLoginUser(user?.email)
        })
        return unsubscribe
    }, [])

    return (
        <LoginUserContext.Provider value={{ loginUser, setLoginUser}}>
            { children }
        </LoginUserContext.Provider>
    ) 
}

export const useLoginUser = () => {
    return useContext(LoginUserContext)
}