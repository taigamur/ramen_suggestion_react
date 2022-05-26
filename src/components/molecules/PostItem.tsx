import { memo, VFC } from "react"
import { Box, Stack, Text, Button, IconButton, Spacer, Flex, Center, Circle } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"


import { Post } from "../../types/post"
import StarRatings from "react-star-ratings"

type Props = {
    post: Post;
}
export const PostItem: VFC<Props> = memo((props) => {
    const { post } = props;


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
                <IconButton size='xs' variant='outline' colorScheme='teal' aria-label='Call Sage' icon={<DeleteIcon />} />
            </Box>
            </Flex>
        </Box>
    )
})