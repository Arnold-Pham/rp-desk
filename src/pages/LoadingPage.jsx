import React from "react";
import logo from "../assets/logo_512.png";

export default function LoadingPage() {
    return (
        <div className="container">
            <img src={logo} className="logo" alt="logo" />
            <div className="loader"></div>
        </div>
    );
}
