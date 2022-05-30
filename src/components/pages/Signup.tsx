import {memo, VFC, useState, ChangeEvent} from "react"
import { Box, Divider, Flex, Heading, Input, Stack, Link } from "@chakra-ui/react"
import { PrimaryButton} from "../atoms/button/PrimaryButton"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { useCookies } from "react-cookie";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Signup: VFC = memo(() => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies();
    
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState(false)

    const { setLoginUser } = useLoginUser();
    const { loginUser } = useLoginUser();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value);


    const SignupRequest = () => {

        if(password !== password2){
            showMessage({title: "パスワードが一致しません", status: "error"})
        }else{
            setLoading(true);
            var params = new URLSearchParams();
            params.append('name', userName)
            params.append('password', password)
            const url: string = process.env.REACT_APP_API_URL + "/signup"
            axios.post(url, params)
            .then((res) => {
                if(res.status == 200){
                    showMessage({title: "ユーザー登録完了", status: "success"});
                    setLoading(false);
                    setLoginUser(res.data.name)
                    setCookie("user",res.data.name)
                    history.push("/home")
                }
            }).catch(() => {
                showMessage({title: "ユーザー名が既に使用されています", description: "他のユーザー名を入力してください",status: "error"});
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
                    <Input placeholder="ユーザーネーム" value={userName} onChange={onChangeUserName} />
                    <Input placeholder="パスワード" value={password} onChange={onChangePassword}/>
                    <Input placeholder="パスワード(再入力)" value={password2} onChange={onChangePassword2}/>
                    <PrimaryButton disabled={userName === ""} loading={loading} onClick={SignupRequest} >登録</PrimaryButton>
                </Stack>
                <Box pt={2}>
                    <Link href='/' color='teal.500'>
                        ログインはこちら
                    </Link>
                </Box>
            </Box>
        </Flex>
    )
});