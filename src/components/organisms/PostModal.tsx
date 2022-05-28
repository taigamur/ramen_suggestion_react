import { memo, useState, ChangeEvent } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, Input, Button, Heading, Box, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberInput, Flex, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb, } from '@chakra-ui/react'
import { useMessage } from "../../hooks/useMessage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../hooks/useLoginUser";
import DatePicker from "react-datepicker"
import { Map } from "../molecules/Map"
import StarRatings from 'react-star-ratings';


import "react-datepicker/dist/react-datepicker.css"

type Props = {
    onClose: () => void;
    isOpen: boolean;
    name: string;
    id: number;
    address: string;
}



export const PostModal = memo((props: Props) => {

    const history = useHistory();
    const { showMessage } = useMessage();

    const { loginUser } = useLoginUser();

    if (loginUser === null){
        history.push("/login");
    }

    const [startDate, setStartDate] = useState(new Date());

    const { onClose, isOpen, address, name, id } = props;

    const [ rating, setRating ] = useState(0)
    const changeRating = (rate: number ) => {
        setRating(rate)
    }

    const onClickPost = () => {
        console.log(startDate)

        var date = startDate.getFullYear() + "/" + ("00" + (startDate.getMonth()+1)).slice(-2) + "/" + ("00" + startDate.getDate()).slice(-2);
        console.log(date)

        var params = new URLSearchParams();
        params.append('place_id', id.toString());
        params.append('point', rating.toString());
        params.append('username', loginUser!);
        params.append('date', date);
        console.log( "params: " + params);
        axios.post("http://{process.env.REACT_APP_GOOGLE!}/post/new",params)
        .then((res) => {
            if(res.status == 200){
                console.log("post success")
                showMessage({title: "投稿完了", status:"success"})
                history.push("/home")
            }
        }).catch(() => {
            console.log("post failed")
            showMessage({title:"投稿失敗", status:"error"})
        })
    }



    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>新規投稿</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
                <FormControl>
                    <Heading size="sm">{name}</Heading>


                    <Heading size="sm" pt={5} pb={2}>日付</Heading>
                    <DatePicker selected={startDate} dateFormat="yyyy/MM/dd" onChange={(date:Date) => setStartDate(date)} />

                    <Heading size="sm" pt={5} pb={2}>ポイント</Heading>

                    <StarRatings
                        rating={rating}
                        starRatedColor="RGB(255,153,0)"
                        starHoverColor="RGB(255,153,0)"
                        starEmptyColor="RGB(220,220,220)"
                        starDimension= "25px"
                        starSpacing="5px"
                        changeRating={changeRating}
                        numberOfStars={10}
                    />

                    <Box pt={5}>
                        <Map address={address} name={name}/>
                    </Box>

                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClickPost}>
                Post
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
})