import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import {memo, useEffect, useState, VFC} from "react"
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../../providers/LoginUserProvider";
import { Point } from "../../types/point";
import { PointItem } from "../molecules/PointItem";

export const MyPoints: VFC = memo(() => {

    const history = useHistory()
    const { loginUser } = useLoginUser()

    const [ points, setPoints ] = useState<Array<Point>>([])

    const getPoints = () => {
        const url: string = process.env.REACT_APP_API_URL + "/point/index"
        axios.get<Array<Point>>(url, {params: {username: loginUser}})
        .then((res) => {
            console.log(res.data)
            setPoints(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => getPoints(),[])

    return(
        <>
            <Box align='center' py={3}><Heading size='md'>ラーメン店の一覧とポイント登録</Heading></Box>
            {points ?
            <Wrap>
                {Array.from(points).map((point) => (
                    <WrapItem key={point.place.id} width='100%'>
                        <PointItem point={point}/>
                    </WrapItem>
                ))}
            </Wrap>
            : <p></p>}
        </>
    )
});