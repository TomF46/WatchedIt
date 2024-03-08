import { useNavigate } from "react-router-dom";
import { Person } from "../../types/People";
import ThumbsUpIcon from "../Icons/ThumbsUpIcon";
import CameraIcon from "../Icons/CameraIcon";

const PersonPreview = ({
  person,
  isLink,
}: {
  person: Person;
  isLink: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-8 md:col-span-4 lg:col-span-2 mt-2">
      <div
        onClick={() => {
          if (isLink) navigate(`/people/${person.id}`);
        }}
        className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full shadow rounded group"
      >
        <div className="relative">
          <img
            src={person.imageUrl}
            className="w-full headshot rounded-t"
            alt={`${person.fullName} headshot.`}
          />
          <div className="absolute bottom-0 invisible p-1 group-hover:visible bg-backgroundOffset2 w-full">
            <p className="text-center text-primary">{person.fullName}</p>
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-12">
            <div className="col-span-6 relative">
              <div className="text-center inline-flex items-center">
                <CameraIcon color="primary" height={5} width={5} />
                <p className="ml-1">{person.creditCount}</p>
              </div>
            </div>
            <div className="col-span-6 relative">
              <div className="text-center inline-flex items-center absolute right-0 top-0">
                <ThumbsUpIcon color="success" height={5} width={5} />
                <p className="ml-1">{person.likedByCount}</p>
              </div>
            </div>
            <div className="col-span-12 lg:hidden">
              <h3 className="text-center text-primary">{person.fullName}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPreview;
