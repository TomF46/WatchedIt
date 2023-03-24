import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AddFilmCredit() {
    const { id } = useParams();
    return (
        <div className="add-film-credit-page">
            <p>Add credits for film {id} page</p>
        </div>
    );
}

export default AddFilmCredit;
