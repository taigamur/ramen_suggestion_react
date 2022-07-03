import { memo, useState, ChangeEvent } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, Input, Button, Heading, Box, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberInput, Flex, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, } from '@chakra-ui/react'
import { useMessage } from "../../hooks/useMessage";
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../providers/LoginUserProvider";


import "react-datepicker/dist/react-datepicker.css"

type Props = {
    onClose: () => void;
    isOpen: boolean;
}



export const DeleteAccountModal = memo((props: Props) => {

    const history = useHistory();
    const { showMessage } = useMessage();

    const { loginUser } = useLoginUser();

    if (loginUser === null){
        history.push("/login");
    }

    const [startDate, setStartDate] = useState(new Date());

    const { onClose, isOpen } = props;

    const onClickDelete = () => {
        console.log('Delete')
    }

    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>アカウントを削除</ModalHeader>
            <ModalCloseButton />
            <ModalBody >

            </ModalBody>
            <ModalFooter>
                <Button mr={3} onClick={onClose}>キャンセル</Button>
                <Button colorScheme='red' onClick={onClickDelete}>削除</Button>
            </ModalFooter>

            </ModalContent>
        </Modal>
    )
})