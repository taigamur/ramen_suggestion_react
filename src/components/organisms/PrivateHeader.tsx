import { memo, VFC, useCallback, useContext } from "react"
import {Flex, Heading, Box, Button, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerOverlay} from "@chakra-ui/react"
import { Redirect, useHistory } from "react-router-dom";
import { HeaderListButton } from "../atoms/button/HeaderListButton";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { useMessage } from "../../hooks/useMessage";

export const PrivateHeader: VFC = memo(() => {
    const { showMessage } = useMessage()
    const { isOpen, onOpen, onClose} = useDisclosure();

    const history = useHistory();
    const { loginUser } = useContext(LoginUserContext);

    const onClickHome = useCallback(() => history.push("/home"), []);
    const onClickA = useCallback(() => history.push("/user/info"), []);
    const onClickPlaces = useCallback(() => history.push("/places"), []);
    // const onClickC = useCallback(() => {
    //     const url = "/user/" + loginUser + "/post"
    //     history.push(url)
    // }, []);

    console.log(loginUser)
    
    if(loginUser){
        return (
            <>
                <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="center" padding={{base: 3, md: 5}}>
                    <Box align='center' display={{base: "none", md:"flex"}}>
                        <Box pr={4}>
                            <Button onClick={onClickHome} variant='link' color="white" size="sm">ホーム</Button>
                        </Box>
                        <Box pr={4}>
                            <Button onClick={onClickPlaces} variant='link' color="white" size="sm">ラーメン店の一覧</Button>
                        </Box>
                        <Box>
                            <Button onClick={onClickA} variant='link' color="white" size="sm">ユーザー情報</Button>
                        </Box>
                    </Box>
                    <Box display={{base:"block", md: "none"}}>
                        <HeaderListButton onOpen={onOpen}/>
                        <Drawer placement="right" size="xs" onClose={onClose} isOpen={isOpen} >
                            <DrawerOverlay>
                                <DrawerContent>
                                    <DrawerBody p={0} bg="gray.100">
                                        <Button w="100%" onClick={onClickHome}>ホーム</Button>
                                        <Button w="100%" onClick={onClickPlaces}>ポイント一覧</Button>
                                        <Button w="100%" onClick={onClickA}>ユーザー情報</Button>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerOverlay>
                        </Drawer>
                    </Box>
                </Flex>
            </>
        );
    }else{
        // showMessage({title: "ログインしてください", status:"error"})
        return <Redirect to="/"/>;
    }
})