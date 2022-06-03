import { memo, ReactNode, useState, useEffect } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react'

import { Map } from "../molecules/Map"
import axios from "axios";
import { useLoginUser } from "../../providers/LoginUserProvider";
import { Suggest } from "../../types/suggest";

type Props = {
    onClose: () => void;
    isOpen: boolean;
}

export const SuggestModal = memo((props: Props) => {

    const { onClose, isOpen } = props;
    const [ place, setPlace ] = useState<Suggest | any>(null);
    const { loginUser } = useLoginUser();

    const onClickSuggest = () => {
        const url: string = process.env.REACT_APP_API_URL + "/place/suggest"
        console.log(url)
        axios.get(url, {params: {username: loginUser}})
        .then((res) => {
            if(res.status === 200){
                setPlace(res.data)
            }
        }).catch(() => {
            console.log("error")
        })
    }

    useEffect(() => {
        onClickSuggest()
    },[isOpen])

    return(
        <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>このお店はどうでしょうか？</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                { place ?
                    <>
                    <Heading>{place.place.name}</Heading>
                    <Map address={place.place.address} name={place.place.name} />
                    </>
                : <></>}
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClickSuggest}>
                次へ
                </Button>
                <Button onClick={onClose}>閉じる</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
})