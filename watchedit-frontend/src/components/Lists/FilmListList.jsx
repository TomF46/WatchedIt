import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ListPreview from "../Home/ListReel/ListPreview";

const FilmListList = ({ lists }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {lists.map((list) => {
                return (
                    <ListPreview key={list.id} list={list} />
                )
            })}
        </div>
    );
};

FilmListList.propTypes = {
    lists: PropTypes.array.isRequired,
};

export default FilmListList;
