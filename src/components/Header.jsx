import { NavLink } from "react-router-dom"
import style from "../style/header.module.css"

const navLinks = [
    {
        path: "/",
        title: "Home"
    },
    {
        path: "/films",
        title: "Films"
    },
]

export default function Header() {
    return (
        <header className={style.header}>
            <ul>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <NavLink to={link.path}>{link.title}</NavLink>
                    </li>
                ))}
            </ul>
        </header>
    )
}