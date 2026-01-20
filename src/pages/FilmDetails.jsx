import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function FilmDetails() {
    const [film, setFilm] = useState({})
    const { id } = useParams();
    const [reviews, setReviews] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/movies/${id}`).then((resp) => {
            console.log(resp.data);
            setFilm(resp.data)
            setLoad(true);
        })
    }, [])
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
                            {film.reviews.length > 0 ?
                                <div className="reviews" onClick={() => setReviews((current) => !current)}>
                                    <div className="reviews_header">
                                        <h3>Leggi recensioni</h3>
                                        <i className="bi bi-arrow-down-short"></i>
                                    </div>
                                    <div className="reviews_body">
                                        {reviews &&
                                            film.reviews.map((review) => (
                                                <div className="one_review">
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
            </div>
        </>
    )
}