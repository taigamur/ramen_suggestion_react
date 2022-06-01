import { Box, Text, Button, useDisclosure, VStack } from "@chakra-ui/react";
import { VFC, memo } from "react";
import StarRatings from "react-star-ratings";
import { Point } from "../../types/point";
import { PointModal } from "../organisms/PointModal"
 
type Props = {
    point: Point;
}

export const PointItem: VFC<Props> = memo((props) => {
    const { point } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Box as="button" w="80%" mx="auto" py={4} borderWidth='3px' borderRadius='lg' onClick={onOpen}  
            h='auto' autoFocus={false} _hover={{bg: 'gray.200'}}
        >
            <PointModal point={point} isOpen={isOpen} onClose={onClose}/>
            <VStack>
            <Box>{point.place.name}</Box>
            <Box>
            <StarRatings
                    rating={point.value}
                    starRatedColor="RGB(255,153,0)"
                    starHoverColor="RGB(255,153,0)"
                    starEmptyColor="RGB(230,230,230)"
                    starDimension= "20px"
                    starSpacing="2px"
                    numberOfStars={10}
            />
            </Box>
            </VStack>
        </Box>
    )
})