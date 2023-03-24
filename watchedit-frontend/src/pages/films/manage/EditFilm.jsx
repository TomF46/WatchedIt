import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditFilm() {
    const { id } = useParams();
    return (
        <div className="edit-film-page">
            <p>Edit film {id} page</p>
        </div>
    );
}

export default EditFilm;
