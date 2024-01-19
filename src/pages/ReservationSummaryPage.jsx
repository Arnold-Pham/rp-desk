import React, { useEffect, useState, useMemo } from "react";
import moment from "moment-timezone";

const ReservationSummaryPage = ({ reservationDetails, onGoBack }) => {
    const [op0, setOp0] = useState(false);
    const [op1, setOp1] = useState(false);
    const [op2, setOp2] = useState(false);
    const [op3, setOp3] = useState(false);

    const {
        firstName,
        flightA,
        dateA,
        flightB,
        dateB,
        valet,
        parking,
        place,
        status,
    } = reservationDetails;

    const date1 = useMemo(
        () => moment.tz(dateA.date, dateA.timezone).format("DD/MM/YYYY HH:mm"),
        [dateA]
    );
    const date2 = useMemo(
        () => moment.tz(dateB.date, dateB.timezone).format("DD/MM/YYYY HH:mm"),
        [dateB]
    );

    useEffect(() => {
        if (valet === 1 || valet === 2 || valet === 4) setOp0(true);
        if (valet & 1) setOp1(true);
        if (valet & 2) setOp2(true);
        if (valet & 4) setOp3(true);
    }, [valet]);

    return (
        <div className="container">
            <h1 className="title">Récapitulatif</h1>
            <p className="greeting">Bonjour {firstName}.</p>
            <p className="txt">
                Voici le récapitulatif de votre réservation chez RoissyParks.
                Pour toute correction ou tout changement, merci de bien vouloir
                contacter le service client.
            </p>
            <div className="bulle">
                <div className="section">
                    {valet ? (
                        <>
                            <h2 className="sectionHeader">Option:</h2>
                            {valet === 0 ? (
                                <p className="option">
                                    Vous avez choisi l'option voiturier sans
                                    services supplémentaires.
                                </p>
                            ) : op0 ? (
                                <p className="option">
                                    Vous avez choisi l'option voiturier avec le
                                    service suivant:
                                </p>
                            ) : (
                                <p className="option">
                                    Vous avez choisi l'option voiturier avec les
                                    services suivants:
                                </p>
                            )}
                            {op1 && (
                                <p className="option">• Nettoyage Intérieur</p>
                            )}
                            {op2 && (
                                <p className="option">• Nettoyage Extérieur</p>
                            )}
                            {op3 && <p className="option">• Plein d'Essence</p>}
                        </>
                    ) : (
                        <>
                            <h2 className="sectionHeader">Parking:</h2>
                            <p className="option">Parking: {parking}</p>
                            <p className="option">Place: {place}</p>
                        </>
                    )}
                </div>
                <hr />
                <div className="section">
                    <h2 className="sectionHeader">Statut de la réservation:</h2>
                    {status === "Awaiting" && (
                        <p className="wait">En attente</p>
                    )}
                    {status === "Canceled" && <p className="canc">Annulée</p>}
                    {status === "Done" && <p className="done">Finie</p>}
                </div>
                <hr />
                <div className="section">
                    <h2 className="sectionHeader">Aller:</h2>
                    <p className="option">N° de vol: {flightA}</p>
                    <p className="option">Date: {date1}</p>
                </div>
                <hr />
                <div className="section">
                    <h2 className="sectionHeader">Retour:</h2>
                    <p className="option">N° de vol: {flightB}</p>
                    <p className="option">Date: {date2}</p>
                </div>
            </div>
            <button className="button" onClick={onGoBack}>
                Retour
            </button>
        </div>
    );
};

export default ReservationSummaryPage;
