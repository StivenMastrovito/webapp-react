import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Card from "../components/Card";
import GoBack from "../components/GoBack";

export default function Films() {
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3000/api/movies?page=${page}`).then((resp) => {
            setFilms(resp.data.result);
            setTotalPage(resp.data.info.total_page)
            console.log(resp.data);
        })
    }, [page])
    return (
        <>
            <main>
                <div className="container">
                    <div className="header_main">
                        <GoBack />
                        <div className="page_choose">
                            <button disabled={page === 1} onClick={() => setPage((cur) => cur - 1)} className="back btn"><i className="bi bi-arrow-left-short"></i></button>
                            <h4>{page} / {totalPage}</h4>
                            <button disabled={page === totalPage} onClick={() => setPage((cur) => cur + 1)} className="next btn"><i className="bi bi-arrow-right-short"></i></button>
                        </div>
                    </div>
                    <ul className="grid">
                        {films.map((film) => (
                            <Card key={film.id}
                                film={film} />
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}