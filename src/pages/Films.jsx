import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Films() {
    const [films, setFilms] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/movies").then((resp) => {
            setFilms(resp.data);
            console.log(resp.data);
            
        })
    }, [])
    return (
        <>
            <main>
                <div className="container">
                    <ul className="grid">
                        {films.map((film) => (
                            <Card key={film.id}
                            film={film}/>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}