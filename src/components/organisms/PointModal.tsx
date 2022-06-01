import { Box, Button, FormControl, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import axios from "axios";
import { memo, useState} from "react";
import StarRatings from "react-star-ratings";
import { useMessage } from "../../hooks/useMessage";
import { useLoginUser } from "../../providers/LoginUserProvider";
import { Point } from "../../types/point";
import { Map } from "../molecules/Map"

type Props = {
    point: Point
    onClose: () => void;
    isOpen: boolean;
}

export const PointModal = memo((props: Props) => {
    
    const { onClose, isOpen, point} = props;
    const { showMessage } = useMessage();
    const { loginUser } = useLoginUser();

    const [ rating, setRating ] = useState(point.value)
    const changeRating = (rate: number ) => {
        setRating(rate)
    }

    const onClickSubmit = () => {
        if(rating < 1){
            showMessage({title: "1以上の値を選択してください", status:"error"})
        }else{
            if(point.value > 0){
                //update
                const url: string = process.env.REACT_APP_API_URL + "/point/update"
                var params = new URLSearchParams();
                params.append('username', loginUser)
                params.append('place_id', point.place.id.toString())
                params.append('value', rating.toString())
                axios.post(url,params)
                .then((res) => {
                    if(res.status == 200){
                        showMessage({title: "登録しました", status:"success"})
                    }
                }).catch(() => {
                    console.log("submit error")
                })
            }else{
                //new
                const url: string = process.env.REACT_APP_API_URL + "/point/new"
                var params = new URLSearchParams()
                params.append('username', loginUser)
                params.append('value', rating.toString())
                params.append('place_id', point.place.id.toString())
                axios.post(url , params)
                .then((res) => {
                    if(res.status == 200){
                        showMessage({title: "投稿完了", status:"success"})
                    }
                }).catch(() => {
                    console.log("submit error")
                })
            }
        }
    }


    
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalContent>
            <ModalHeader>{point.place.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
                <FormControl>
                    <Heading size="sm" pb={2}>ポイント</Heading>

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
                        <Map address={point.place.address} name={point.place.name}/>
                    </Box>

                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClickSubmit}>登録</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
})