import { React, useState, useEffect } from "react";
import { getAllFilms } from "../../api/filmsApi";

function Films() {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    if (!films) {
      getAllFilms().then(res => {
        setFilms(res);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [films]);

  return (
    <div className="about-page">
      <p className="text-green-200">Its the movie page page</p>
    </div>
  );
}

export default Films;
