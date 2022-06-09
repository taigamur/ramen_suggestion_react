import {memo, VFC, useState, ChangeEvent} from "react"
import { Box, Divider, Flex, Heading, Input, Stack, Link } from "@chakra-ui/react"
import { PrimaryButton} from "../atoms/button/PrimaryButton"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { firebaseApp } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
 
export const Signup: VFC = memo(() => {
    const history = useHistory();

    
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value);


    

    const SignupRequest = () => {

        if(password !== password2){
            showMessage({title: "パスワードが一致しません", status: "error"})
        }else{
            setLoading(true);
            createUserWithEmailAndPassword(firebaseApp.fireauth, email, password)
            .then(res => {
                setLoading(false);
                showMessage({title: "ユーザー登録完了", status: "success"});
                var params = new URLSearchParams();
                params.append('name', email)
                params.append('password', password)
                const url: string = process.env.REACT_APP_API_URL + "/signup"
                axios.post(url, params)
                .then((res) => {

                }).catch(() => {

                })

                history.push("/home")
            })
            .catch(err => {

                if(err.code === "auth/invalid-email"){
                    showMessage({title: "不正なメールアドレスです", status: "error"})
                }

                if(err.code === "auth/email-already-in-use"){
                    showMessage({title: "既に登録されています", status: "error"})
                }

                if(err.code === "auth/weak-password"){
                    showMessage({title: "パスワードは6文字以上に設定してください", status:"error"})
                }

                setLoading(false)
            })
        }
    }
    return(
        <Flex align="center" justify="center" height="100vh">
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" size="lg" textAlign="center">Ramen Suggestion</Heading>
                <Divider my={4}/>
                <Stack spacing={6} py={4} px={10}>
                    <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
                    <Input placeholder="パスワード" value={password} onChange={onChangePassword}/>
                    <Input placeholder="パスワード(再入力)" value={password2} onChange={onChangePassword2}/>
                    <PrimaryButton disabled={email === ""} loading={loading} onClick={SignupRequest} >登録</PrimaryButton>
                </Stack>
                <Box pt={2} align='right'>
                    <Link href='/' color='teal.500'>
                        ログインはこちら
                    </Link>
                </Box>
            </Box>
        </Flex>
    )
});