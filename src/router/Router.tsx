import {Route, Switch} from "react-router-dom"
import { Home } from "../components/pages/Home"
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { PublicHeaderLayout } from "../components/templates/PublicHeaderLayout"
import { Signup } from "../components/pages/Signup";
import { Login } from "../components/pages/Login"
import { MyPoints } from "../components/pages/MyPoints"
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { UserInfo } from "../components/pages/UserInfo"; 
import { PublicPoint } from "../components/pages/PublicPoint"
import { PostNew } from "../components/pages/PostNew"
import { Tmp } from "../components/pages/tmp";

export const Router = () => {
    return (
        <Switch>
            <LoginUserProvider>
                {/* private */}
                <Route exact path="/home"><HeaderLayout><Home /></HeaderLayout></Route>
                <Route exact path="/places"><HeaderLayout><MyPoints/></HeaderLayout></Route>
                <Route exact path="/user/info"><HeaderLayout><UserInfo /></HeaderLayout></Route>
                <Route exact path="/post/new"><HeaderLayout><PostNew /></HeaderLayout></Route>
                <Route exact path="/tmp"><HeaderLayout><Tmp /></HeaderLayout></Route>

                {/* public */}
                <Route exact path="/"><Login/></Route>
                <Route exact path="/signup"><Signup/></Route>
                <Route exact path="/user/:id/post/index"><PublicHeaderLayout><PublicPoint/></PublicHeaderLayout></Route>
                
            </LoginUserProvider>
            <Route path="*"><Page404 /></Route>
        </Switch>
    );
};