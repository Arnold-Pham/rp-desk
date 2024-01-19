import React, { useState } from "react";
import ReservationSummaryPage from "./ReservationSummaryPage.jsx";

const ReservationCodePage = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [reservationDetails, setReservationDetails] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    const handlePress = () => {
        setLoading(true);
        setError("");
        if (code.length === 16) {
            fetch(`https://creativitez.fr/api/reservation/${code}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (
                        response.status === 403 ||
                        response.status === 404
                    ) {
                        throw new Error("Code Invalide");
                    } else {
                        throw new Error(
                            "Une erreur innatendu s'est produite, veuillez réessayer plus tard"
                        );
                    }
                })
                .then((data) => {
                    setReservationDetails(data.reservation);
                    setError("");
                    setShowSummary(true);
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.message);
                    setReservationDetails(null);
                });
        } else {
            setError("Code Invalide");
        }
        setLoading(false);
    };

    return (
        <div className="container">
            {showSummary ? (
                <ReservationSummaryPage
                    reservationDetails={reservationDetails}
                    onGoBack={() => setShowSummary(false)}
                />
            ) : (
                <>
                    <h1 className="title">Réservation</h1>
                    <div className="inputContainer">
                        <input
                            className="input"
                            placeholder="Code de Réservation"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {error ? (
                            <div className="errorText">{error}</div>
                        ) : null}
                        {loading && <div className="loader"></div>}
                        <button className="button" onClick={handlePress}>
                            Chercher
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReservationCodePage;
