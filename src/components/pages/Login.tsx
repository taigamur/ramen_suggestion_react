import {memo, VFC, useState, ChangeEvent, useEffect } from "react"
import { Box, Divider, Flex, Heading, Input, Stack, Link } from "@chakra-ui/react"
import { PrimaryButton} from "../atoms/button/PrimaryButton"
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { useLoginUser } from "../../providers/LoginUserProvider";
import { signInWithEmailAndPassword } from "firebase/auth";

import { firebaseApp } from "../../firebase"


export const Login: VFC = memo(() => {
    const history = useHistory()
    const { showMessage } = useMessage()

    const { setLoginUser } = useLoginUser();
    const { loginUser } = useLoginUser();

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const [password, setPassword] = useState("")
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


    const onClickLoginRequest = () => {
        setLoading(true);
        signInWithEmailAndPassword(firebaseApp.fireauth, email, password)
        .then(() => {
            console.log("ok")
            setLoginUser(email)
            setLoading(false);
            showMessage({title: "ログインしました", status: "success"});
            history.push("/home")
        })
        .catch(err => {
            console.log("err")
            console.log(err)
            showMessage({title: "入力に誤りがあります", status:"error"});
            setLoading(false);
        })
    }

    console.log("loginUser: " + loginUser)

    if(loginUser){
        return <Redirect to="/home"/>
    }else{
        return(
            <>
                <Flex align="center" justify="center" height="100vh">
                    <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                        <Heading as="h1" size="lg" textAlign="center">Ramen Suggestion</Heading>
                        <Divider my={4}/>
                        <Stack spacing={6} py={4} px={10}>
                            <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail}  />
                            <Input placeholder="パスワード" value={password} onChange={onChangePassword}/>
                            <PrimaryButton disabled={email === ""} loading={loading} onClick={onClickLoginRequest}>ログイン</PrimaryButton>
                        </Stack>
                        <Box pt={2} align='right'>
                            <Link href='/signup' color='teal.500' >
                                新規登録はこちら
                            </Link>
                        </Box>
                    </Box>
                </Flex> 
            </>
        )
    }
});