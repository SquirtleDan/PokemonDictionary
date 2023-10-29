import React, { useContext } from "react";
import "./Avatar.css";

export default function Avatar() {
    const playerUsername = useContext(username);

    return (
        <h1>{playerUsername}</h1>
    )
}