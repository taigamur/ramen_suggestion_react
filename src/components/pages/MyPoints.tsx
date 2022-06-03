import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import {memo, useCallback, useEffect, useMemo, useState, VFC} from "react"
import { usePoints } from "../../hooks/usePoints";
import { PointItem } from "../molecules/PointItem";

export const MyPoints: VFC = memo(() => {

    const { points, onSetPoints } = usePoints()

    useEffect(() => onSetPoints(),[])


    return(
        <>
            <Box align='center' py={3}><Heading size='md'>ラーメン店の一覧とポイント登録</Heading></Box>
     
            <Wrap>
                {Array.from(points).map((point) => (
                    <WrapItem key={point.place.id} width='100%'>
                        <PointItem point={point}/>
                    </WrapItem>
                ))}
            </Wrap>
     
        </>
    )
});