import { Link } from "react-router-dom";

export default function Card({ film }) {
    return (
        <Link to={`/films/${film.id}`} className="card">
            <img src={`http://localhost:3000/movies_cover/${film.image}`} alt="" />
            <h4>{film.title}</h4>
        </Link>
    )
}