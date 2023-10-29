import React, { useContext } from "react";
import "./Avatar.css";
import { username } from "./LoginForm";

export default function Avatar() {
    const playerUsername = useContext(username);

    return (
        <>
        <h1 className="username">{playerUsername}</h1>
        </>
    )
}