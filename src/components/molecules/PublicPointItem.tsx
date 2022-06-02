import { Box, Text, Button, useDisclosure, VStack } from "@chakra-ui/react";
import { VFC, memo } from "react";
import StarRatings from "react-star-ratings";
import { Point } from "../../types/point";
 
type Props = {
    point: Point;
}

export const PublicPointItem: VFC<Props> = memo((props) => {
    const { point } = props;

    return(
        <Box as="button" w="80%" mx="auto" py={4} borderWidth='3px' borderRadius='lg'
            h='auto' autoFocus={false} _hover={{bg: 'gray.200'}}
        >
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