import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ListPreview = ({ list }) => {
  const navigate = useNavigate();
  return (
    <div
      key={list.id}
      className="col-span-12 md:col-span-6 lg:col-span-4 my-2 mr-4"
    >
      <div
        onClick={() => {
          navigate(`/lists/${list.id}`);
        }}
        className="bg-backgroundOffset cursor-pointer hover:opacity-75 shadow rounded h-full"
      >
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-4 p-1 flex items-center justify-center">
            <p className="text-sm mt-1 text-center ">
              {list.name} {`(${list.filmCount})`} <br></br> By{" "}
              {list.createdBy.username}
            </p>
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-12 h-full">
              {list.thumbnails.map((url) => {
                return (
                  <div key={url} className="col-span-3">
                    <img
                      src={url}
                      className="poster h-full w-full"
                      alt="thumbnail"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-2 bg-primary flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

ListPreview.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListPreview;
