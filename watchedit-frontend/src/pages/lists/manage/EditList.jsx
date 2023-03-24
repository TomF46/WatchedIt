import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditList() {
    const { id } = useParams();
    return (
        <div className="edit-list-page">
            <p>Edit list {id} page</p>
        </div>
    );
}

export default EditList;
