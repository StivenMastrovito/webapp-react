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
    const [film, setFilm] = useState({})
    const { id } = useParams();
    const [reviews, setReviews] = useState(false);
    const [load, setLoad] = useState(false);
    const [newReviewBool, setNewReviewBool] = useState(false);
    const [newReviewForm, setNewReviewForm] = useState(initialForm);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/movies/${id}`).then((resp) => {
            console.log(resp.data);
            setFilm(resp.data)
            setLoad(true);
        })
    }, [])

    function loadForm(event) {
        console.log(event);
        setNewReviewForm({
            ...newReviewForm,
            [event.target.name]: event.target.value,
        })
    }
    function openForm(){
        setNewReviewBool(true);
        setNewReviewForm({
            ...newReviewForm,
            movie_id: id,
        })
    }

    function handleForm(){
        event.preventDefault();
        setNewReviewBool(false);

        axios.post("http://localhost:3000/api/reviews", newReviewForm).then((resp) => {
            console.log(resp);
            setNewReviewForm(initialForm);
        }).catch((err) => {
            console.log(err);
        })
    }

    function resetForm(){
        setNewReviewForm(initialForm);
        setNewReviewBool(false);
    }
    return (
        <>
            <div className="container">
                {load &&
                    <div className="grid_column">
                        <div className="card_column">
                            <img src={`http://localhost:3000/movies_cover/${film.image}`} alt="" />
                            <div className="body_card">
                                <div>
                                    <h1>{film.title}</h1>
                                    <p>{film.abstract}</p>
                                </div>
                                <h2 onClick={() => openForm()}>Aggiungi una recensione</h2>
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
                            </div>
                        </div>
                    </div>
                }
                {newReviewBool &&
                    <div className="wrap">
                        <form action="" className="new_review" onSubmit={handleForm}>
                            <div className="input">
                                <label htmlFor="name">Inserisci nome:</label>
                                <input className="input_tag" type="text" name="name" value={newReviewForm.name} onChange={(event) => loadForm(event)} />
                            </div>
                            <div className="input">
                                <label htmlFor="vote">Inserisci voto:</label>
                                <select className="input_tag" name="vote" id="vote" value={newReviewForm.vote} onChange={(event) => loadForm(event)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
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