import { signOut } from "firebase/auth";
import {memo, VFC} from "react"
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../providers/LoginUserProvider";
import { useMessage } from "../../hooks/useMessage";
import { firebaseApp } from "../../firebase";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import { DeleteAccountModal } from "../organisms/DeleteAccountModal";
export const UserInfo: VFC = memo(() => {

    const history = useHistory()
    const { setLoginUser } = useLoginUser();
    const { loginUser } = useLoginUser();

    const { showMessage } = useMessage();

    const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Box align='center' pt={6}>
                
                <Button variant='solid' colorScheme='green' onClick={onClickLogout}>ログアウト</Button>

                <Box pt={6}>
                    <p>メールアドレス</p>
                    <p>{loginUser}</p>
                </Box>

                <Box w="100%" align='center' pt={8}>
                <Button colorScheme='red' onClick={onOpen} autoFocus={false} variant='outline'>アカウントの削除</Button>
                <DeleteAccountModal onClose={onClose} isOpen={isOpen} />
            </Box>


            </Box>
        </>
    )
});