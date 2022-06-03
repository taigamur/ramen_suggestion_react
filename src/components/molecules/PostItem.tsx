import { memo, VFC } from "react"
import { Box, Text, Button, IconButton, Spacer, Flex, Circle, useDisclosure, Modal, ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"


import { Post } from "../../types/post"
import StarRatings from "react-star-ratings"
import axios from "axios"
import { useMessage } from "../../hooks/useMessage"
import { Redirect, useHistory } from "react-router-dom"

type Props = {
    post: Post;
}
export const PostItem: VFC<Props> = memo((props) => {
    const { post } = props;
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showMessage } = useMessage();

    const onClickDelete = () => {
        var params = new URLSearchParams()
        params.append('id', post.id.toString())
        params.append('username', post.username)
        const url: string = process.env.REACT_APP_API_URL + "/post/delete"
        axios.post(url,params)
        .then((res) => {
            if(res.status == 200){
                showMessage({title: "削除しました", status:"success"})
                history.push("/tmp")
                history.push("/home")
            }
        }).catch(() => {
            console.log("false")
            showMessage({title: "失敗", status:"error"})
        })
    }


    return(
        <Box w="80%" mx="auto" borderWidth='3px' borderRadius='lg'>
            <Flex>
            <Box w='10%' align="center"  my="auto" >
                <Circle size='60px' bg='green.300'>
                    {post.date.substr(5,5)}
                </Circle>
            </Box>
            <Spacer/>
            <Box w="80%" h='auto' py={3} align="center">
                <Text pb={1}>{post.place.name}</Text>
                <StarRatings
                        rating={post.value}
                        starRatedColor="RGB(255,153,0)"
                        starHoverColor="RGB(255,153,0)"
                        starEmptyColor="RGB(230,230,230)"
                        starDimension= "20px"
                        starSpacing="2px"
                        numberOfStars={10}
                />
            </Box>
            <Box w="10%" align="center" >
                <IconButton size='xs' variant='outline' colorScheme='teal' aria-label='Call Sage' icon={<DeleteIcon />} onClick={onOpen}  />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>この投稿を削除しますか？</ModalHeader>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} autoFocus={false} onClick={onClickDelete}>削除</Button>
                        <Button  onClick={onClose}>キャンセル</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </Flex>
        </Box>
    )
})