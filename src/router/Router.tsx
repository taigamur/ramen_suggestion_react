import {Route, Switch} from "react-router-dom"
import { Home } from "../components/pages/Home"
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Signup } from "../components/pages/Signup";
import { Login } from "../components/pages/Login"
import { MyPoints } from "../components/pages/MyPoints"
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { UserInfo } from "../components/pages/UserInfo"; 
import { Post } from "../components/pages/Post"
import { PostNew } from "../components/pages/PostNew"

export const Router = () => {
    return (
        <Switch>
            <LoginUserProvider>
                <Route exact path="/home"><HeaderLayout><Home /></HeaderLayout></Route>
                <Route exact path="/places"><HeaderLayout><MyPoints/></HeaderLayout></Route>
                <Route exact path="/user/info"><HeaderLayout><UserInfo /></HeaderLayout></Route>
                <Route exact path="/user/:username/post"><HeaderLayout><Post/></HeaderLayout></Route>
                <Route exact path="/post/new"><HeaderLayout><PostNew /></HeaderLayout></Route>

                <Route exact path="/"><Login/></Route>
                <Route exact path="/signup"><Signup/></Route>
            </LoginUserProvider>
            <Route path="*"><Page404 /></Route>
        </Switch>
    );
};