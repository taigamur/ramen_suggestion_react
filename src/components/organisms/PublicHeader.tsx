import { memo, VFC, useCallback, useContext } from "react"
import {Flex, Heading, Box, Button, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerOverlay} from "@chakra-ui/react"
import { Redirect, useHistory } from "react-router-dom";


export const PublicHeader: VFC = memo(() => {

    const history = useHistory();

    const onClickLogin = useCallback(() => history.push("/"), []);


    return (
        <>
            <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="center" padding={{base: 3, md: 5}}>
                <Box align='center' display={{base:"flex"}}>
                    <Box>
                        <Button onClick={onClickLogin} variant='link' color="white" size="sm">ログイン</Button>
                    </Box>
                </Box>
            </Flex>
        </>
    );

})