import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditPerson() {
    const { id } = useParams();
    return (
        <div className="edit-person-page">
            <p>Edit person {id} page</p>
        </div>
    );
}

export default EditPerson;