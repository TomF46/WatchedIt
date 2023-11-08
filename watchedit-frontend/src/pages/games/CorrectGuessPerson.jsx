import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CorrectGuessPerson = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-primary text-2xl text-center">
        Well done! You guessed the correct person
      </h3>
      <div className="grid grid-cols-12 my-4">
        <div className="col-span-12 md:col-span-4 md:col-start-4 lg:col-span-2 lg:col-start-6 my-2">
          <div
            onClick={() => {
              navigate(`/people/${game.person.id}`);
            }}
            className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded"
          >
            <div className="hover:opacity-75 relative">
              <img
                src={game.person.imageUrl}
                className="w-full headshot rounded-t"
                alt={`${game.person.fullName} headshot.`}
              />
              <div className="p-2">
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <h3 className="text-center text-primary">
                      {game.person.fullName}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CorrectGuessPerson.propTypes = {
  game: PropTypes.object.isRequired,
};

export default CorrectGuessPerson;
