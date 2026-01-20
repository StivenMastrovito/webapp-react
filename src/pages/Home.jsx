import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <main>
                <div className="container">
                    <div className="hero_section">
                        <h1>BENVENUTO NELLA WEBAPP DEI FILM</h1>
                        <Link to={"/films"} className="btn_film">SCOPRI FILM</Link>
                    </div>
                </div>
            </main>
        </>
    )
}