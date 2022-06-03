import axios from "axios"
import { useCallback, useState } from "react"
import { useLoginUser } from "../providers/LoginUserProvider"
import { Point } from "../types/point"


export const usePoints  = () => {
    
    const [ points, setPoints ] = useState<Array<Point>>([])
    const { loginUser } = useLoginUser()
    
    const onSetPoints = useCallback(() => {
        const url: string = process.env.REACT_APP_API_URL + "/point/index"
        axios.get<Array<Point>>(url, {params: {username: loginUser}})
        .then((res) => {
            setPoints(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return { points, setPoints, onSetPoints }

}