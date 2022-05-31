import { signOut } from "firebase/auth";
import {memo, VFC} from "react"
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../providers/LoginUserProvider";
import { useMessage } from "../../hooks/useMessage";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { firebaseApp } from "../../firebase";
export const UserInfo: VFC = memo(() => {

    const history = useHistory()
    const { setLoginUser } = useLoginUser();

    const { showMessage } = useMessage();

    const onClickLogout = () => {
        signOut(firebaseApp.fireauth)
        .then(() => {
            console.log("logout success")
            showMessage({title: "ログアウトしました", status:"success"})
            setLoginUser(null)
            history.push("/")
        })
        .catch(err => {
            console.log(err.message)
            console.log("logout err")
        })
    }

    return(
        <>
            <p>ユーザー情報</p>
            <PrimaryButton onClick={onClickLogout}>ログアウト</PrimaryButton>
        </>
    )
});