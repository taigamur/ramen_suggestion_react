import { memo, useState, ChangeEvent } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, Input, Button, Heading, Box, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberInput, Flex, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Checkbox, } from '@chakra-ui/react'
import { useMessage } from "../../hooks/useMessage";
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../providers/LoginUserProvider";


import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";
import { deleteUser, getAuth } from "firebase/auth";

type Props = {
    onClose: () => void;
    isOpen: boolean;
}



export const DeleteAccountModal = (props: Props) => {

    const history = useHistory();
    const { showMessage } = useMessage();

    const { loginUser } = useLoginUser();

    const { onClose, isOpen } = props;
    const [flag, setFlag] = useState(false);

    if (loginUser === null){
        history.push("/login");
    }

    

    const onClickDelete = () => {
        const auth = getAuth()
        const user = auth.currentUser;
        deleteUser(user!).then(() => {
            var params = new URLSearchParams();
            const url: string = process.env.REACT_APP_API_URL + "/user/delete"
            axios.delete(url, {data: {username: loginUser}}).then(res => {
                console.log(res.data)
            })
            history.push("/")
        }).catch((error) => {
            console.log(error)
            showMessage({title: "アカウントの削除に失敗", status: "error"});
        })
    }

    const onCloseModal = () => {
        onClose()
        setFlag(false)
    }

    return(
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>アカウントを削除</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
            <Checkbox size='md' colorScheme='red' id='flag123'
            onChange={()=>{
                setFlag(!flag)
            }} 
            >
                アカウントを削除すると、復元することができません。よろしいですか？
            </Checkbox>
            </ModalBody>
            <ModalFooter>
                <Button mr={3} onClick={onCloseModal}>キャンセル</Button>
                <Button colorScheme='red' onClick={onClickDelete} disabled={!flag} >削除</Button>
            </ModalFooter> 

            </ModalContent>
        </Modal>
    )
}