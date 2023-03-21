import React from "react";
import { useParams } from "react-router-dom";


function Person() {
    const { id } = useParams();

    return (
      <div className="about-page">
        <p className="text-green-800">Its the person with id {id}</p>
      </div>
    )
  }
  
  export default Person;
  