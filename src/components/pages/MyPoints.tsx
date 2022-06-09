import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import {memo, useEffect, useState, VFC} from "react"
import { usePoints } from "../../hooks/usePoints";
import { PointItem } from "../molecules/PointItem";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { useLoginUser } from "../../providers/LoginUserProvider";
import axios from "axios";

export const MyPoints: VFC = memo(() => {

    const { points, onSetPoints } = usePoints()
    const { loginUser } = useLoginUser()
    const [ url, setURL ] = useState<string>("")

    useEffect(() => onSetPoints(),[])

    const onClickUserId = () => {
        const url: string = process.env.REACT_APP_API_URL + "/user/id"
        var params = new URLSearchParams();
        params.append('username', loginUser)
        axios.get(url, {params:{username: loginUser}})
        .then((res) => {
            if(res.status == 200){
                console.log(res.data)
                setURL("https://tsukuba-ramen-suggest.com/user/" + res.data + "/post/index")
            }
        })
    }

    const title = "つくば市周辺のラーメン店の記録・提案を行うアプリケーション \n \n"
    const title2 = "私が知っているラーメン店のリスト"


    return(
        <>
            <Box align='center' py={5}><Heading size='md'>ラーメン店の一覧とポイント登録  </Heading></Box>

            {/* <Box align='center' onClick={onClickUserId}>
                <TwitterShareButton url={url} title={title + title2 + "\n \n"} >
                    <TwitterIcon size={32}  round />
                </TwitterShareButton>
            </Box> */}
     
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

function LoginUser(arg0: string, LoginUser: any) {
    throw new Error("Function not implemented.");
}
