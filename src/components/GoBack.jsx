import { useNavigate } from "react-router-dom"

export default function GoBack(){
    const navigation = useNavigate();
    return (
        <>
            <button onClick={() => navigation(-1)} className="btn"><i className="bi bi-arrow-left-short"></i></button>
        </>
    )
}