import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import {memo, useEffect, useState, VFC} from "react"
import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Point } from "../../types/point";
import { PublicPointItem } from "../molecules/PublicPointItem";

export const PublicPoint: VFC = memo((props) => {

    const history = useHistory()

    const {id} = useParams<{id: string}>();
    
    const [ points, setPoints ] = useState<Array<Point>>([])

    const getPoints = () => {
        const url: string = process.env.REACT_APP_API_URL + "/public/point/index"
        axios.get<Array<Point>>(url, {params: {userid: id}})
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
            <Box align='center' py={3}><Heading size='md'>ラーメン店の一覧</Heading></Box>
            {points ?
            <Wrap>
                {Array.from(points).map((point) => (
                    <WrapItem key={point.place.id} width='100%'>
                        <PublicPointItem point={point}/>
                    </WrapItem>
                ))}
            </Wrap>
            : <p></p>}
        </>
    )
});