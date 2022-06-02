import {memo, VFC, ReactNode} from "react"
import { PublicHeader } from "../organisms/PublicHeader";

// 受け取るpropsの型を定義
type Props = {
    children: ReactNode;
}

export const PublicHeaderLayout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <PublicHeader/>
            {children}
        </>
    )
});