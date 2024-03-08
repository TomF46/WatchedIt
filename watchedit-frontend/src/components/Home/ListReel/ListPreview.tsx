import { useNavigate } from "react-router-dom";
import { List } from "../../../types/Lists";
import ArrowRightAltIcon from "../../Icons/ArrowRightAltIcon";

const ListPreview = ({ list }: { list: List }) => {
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
          <div className="col-span-2 bg-primary flex items-center justify-center rounded-r">
            <ArrowRightAltIcon color="white" height={6} width={6} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPreview;
