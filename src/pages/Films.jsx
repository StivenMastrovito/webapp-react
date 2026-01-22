import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Card from "../components/Card";
import GoBack from "../components/GoBack";

const initialForm = {
    title: "",
    director: "",
    abstract: "",
    image: "",
}

export default function Films() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const [newFilmsForm, setNewFilmsForm] = useState(initialForm)

    useEffect(() => {
        axios.get(`${baseUrl}/api/movies?page=${page}`).then((resp) => {
            setFilms(resp.data.result);
            setTotalPage(resp.data.info.total_page)
            console.log(resp.data);
        })
    }, [page])

    function handleForm(event) {
        event.preventDefault();

        axios.post(`${baseUrl}/api/movies`, newFilmsForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(err);
        })

    }

    function loadForm(event) {
        setNewFilmsForm({
            ...newFilmsForm,
            [event.target.name]: event.target.value
        })
    }

    function resetForm() {
        setNewFilmsForm(initialForm)
    }

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
                    <section>
                        <form action="" className="form" onSubmit={handleForm}>
                            <div className="input">
                                <label htmlFor="title">Inserisci titolo:</label>
                                <input className="input_tag" type="text" name="title" value={newFilmsForm.title} onChange={(event) => loadForm(event)} />
                            </div>
                            <div className="input">
                                <label htmlFor="director">Inserisci autore:</label>
                                <input className="input_tag" type="text" name="director" value={newFilmsForm.director} onChange={(event) => loadForm(event)} />
                            </div>
                            <div className="input">
                                <label htmlFor="abstract">Inserisci descrizione:</label>
                                <input className="input_tag" type="text" name="abstract" id="abstract" value={newFilmsForm.abstract} onChange={(event) => loadForm(event)}></input>
                            </div>
                            <div className="input">
                                <label htmlFor="abstract">Inserisci immagine:</label>
                                <input type="file" name="image" id="image" value={newFilmsForm.image} onChange={(event) => loadForm(event)} />
                            </div>
                            <button className="btn send" type="submit">INVIA</button>
                            <button onClick={resetForm} className="btn annulla">ANNULLA</button>
                        </form>

                    </section>
                </div>
            </main>
        </>
    )
}