import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AddPersonCredit() {
    const { id } = useParams();
    return (
        <div className="add-person-credit-page">
            <p>Add credits for person {id} page</p>
        </div>
    );
}

export default AddPersonCredit;
