import axios from "axios";
import { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import Card from "../components/Card";

export default function Search() {
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const [searchFilter, setSearchFilter] = useState("");
    const [controlFilter, setControFilter] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (count !== 0) {
            axios.get(`http://localhost:3000/api/movies/search?page=${page}&filter=${searchFilter}`).then((resp) => {
                setFilms(resp.data.result);
            })
        }

    }, [page])

    function handleForm() {
        event.preventDefault();
        if (searchFilter === "") {
            setControFilter(true)
        } else {
            setControFilter(false)
            axios.get(`http://localhost:3000/api/movies/search?page=${page}&filter=${searchFilter}`).then((resp) => {
                setFilms(resp.data.result);
                setTotalPage(resp.data.info.total_page)
                setPage(1)
                console.log(resp.data);
                setCount(1)
            })
        }
    }
    return (
        <>
            <main>
                <div className="container">
                    <div className="header_main">
                        <GoBack />

                        <form action="" className="form_filter" onSubmit={handleForm}>
                            <label htmlFor="search"></label>
                            <input type="text" id="search" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />
                            <button type="submit" className="btn">Cerca</button>
                            {controlFilter && <h5>Inserisci un filtro</h5>}
                        </form>

                        <div className="page_choose">
                            <button disabled={page === 1} onClick={() => { setPage((cur) => cur - 1) }} className="back btn"><i className="bi bi-arrow-left-short"></i></button>
                            <h4>{page} / {totalPage}</h4>
                            <button disabled={page === totalPage} onClick={() => { setPage((cur) => cur + 1) }} className="next btn"><i className="bi bi-arrow-right-short"></i></button>
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