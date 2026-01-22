import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const initialForm = {
    movie_id: null,
    name: "",
    vote: null,
    text: ""
}

export default function FilmDetails() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [film, setFilm] = useState({})
    const { slug } = useParams();
    const [reviews, setReviews] = useState(false);
    const [load, setLoad] = useState(false);
    const [newReviewBool, setNewReviewBool] = useState(false);
    const [newReviewForm, setNewReviewForm] = useState(initialForm);

    useEffect(() => {
        getFilm()
    }, [])

    function loadForm(event) {
        console.log(event);
        setNewReviewForm({
            ...newReviewForm,
            [event.target.name]: event.target.value,
        })
    }
    function openForm() {
        setNewReviewBool(true);
        setNewReviewForm({
            ...newReviewForm,
            movie_id: film.id,
        })
    }

    function handleForm() {
        event.preventDefault();
        setNewReviewBool(false);

        axios.post(`${baseUrl}/api/reviews`, newReviewForm).then((resp) => {
            console.log(resp);
            setNewReviewForm(initialForm)
            getFilm();
        }).catch((err) => {
            console.log(err);
        })
    }

    function resetForm() {
        setNewReviewForm(initialForm);
        setNewReviewBool(false);
    }

    function getFilm() {
        axios.get(`${baseUrl}/api/movies/${slug}`).then((resp) => {
            console.log(resp.data);
            setFilm(resp.data)
            setLoad(true);
        })
    }

    function setVote(event){
        setNewReviewForm({
            ...newReviewForm,
            vote: event.target.__reactProps$uju5xsjem9r.value
        })
    }


    return (
        <>
            <div className="container">
                {load &&
                    <div className="grid_column">
                        <div className="card_column">
                            <img src={`${baseUrl}/movies_cover/${film.image}`} alt="" />
                            <div className="body_card">
                                <div>
                                    <h1>{film.title} - {film.director}</h1>
                                    <h4>{film.abstract}</h4>
                                </div>
                                <div>
                                    {film.reviews.length > 0 ?
                                        <div className="reviews" onClick={() => setReviews((current) => !current)}>
                                            <div className="reviews_header">
                                                <h3>Leggi recensioni</h3>
                                                <i className="bi bi-arrow-down-short"></i>
                                            </div>
                                            <div className="reviews_body">
                                                {reviews &&
                                                    film.reviews.map((review) => (
                                                        <div key={review.id} className="one_review">
                                                            <h5>{review.text}</h5>
                                                            <h5>{review.vote}</h5>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div> :
                                        <h3>Nessuna recensione</h3>
                                    }
                                    <h2 onClick={() => openForm()}>Aggiungi una recensione</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {newReviewBool &&
                    <div className="wrap">
                        <form action="" className="form" onSubmit={handleForm}>
                            <div className="input">
                                <label htmlFor="name">Inserisci nome:</label>
                                <input className="input_tag" type="text" name="name" value={newReviewForm.name} onChange={(event) => loadForm(event)} />
                            </div>
                            <div className="input">
                                <label htmlFor="vote">Inserisci voto:</label>
                                {/* <select className="input_tag" name="vote" id="vote" value={newReviewForm.vote} onChange={(event) => loadForm(event)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select> */}
                                <i className={newReviewForm.vote >= 1 ? "bi bi-star-fill" : "bi bi-star"} value={1} onClick={(event) => setVote(event)}></i>
                                <i className={newReviewForm.vote >= 2 ? "bi bi-star-fill" : "bi bi-star"} value={2} onClick={(event) => setVote(event)}></i>
                                <i className={newReviewForm.vote >= 3 ? "bi bi-star-fill" : "bi bi-star"} value={3} onClick={(event) => setVote(event)}></i>
                                <i className={newReviewForm.vote >= 4 ? "bi bi-star-fill" : "bi bi-star"} value={4} onClick={(event) => setVote(event)}></i>
                                <i className={newReviewForm.vote >= 5 ? "bi bi-star-fill" : "bi bi-star"} value={5} onClick={(event) => setVote(event)}></i>
                            </div>
                            <div className="input">
                                <label htmlFor="text">Inserisci descrezione:</label>
                                <textarea className="input_tag" name="text" id="text" value={newReviewForm.text} onChange={(event) => loadForm(event)}></textarea>
                            </div>
                            <button className="btn send" type="submit">INVIA</button>
                            <button onClick={resetForm} className="btn annulla">ANNULLA</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}