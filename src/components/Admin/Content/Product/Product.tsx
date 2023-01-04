import {useEffect} from 'react'

export default function Product ({setTitle} :any) {

    useEffect(() => {
        setTitle("Quản lý sản phẩm");
      }, []);
    return (
        <></>
    )
}