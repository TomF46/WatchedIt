import PropTypes from "prop-types";

const RoundsSection = ({ game }) => {
  return (
    <div>
      <h3 className="text-4xl text-primary text-center mb-2">Rounds</h3>
      <div className="grid grid-cols-12">
        {game.rounds.map((round, i) => {
          return (
            <div className="col-span-12 my-2" key={round.id}>
              <div className="grid grid-cols-16">
                <div
                  className={`${
                    round.status != 1
                      ? "col-span-16 md:col-span-12 lg:col-span-14"
                      : "col-span-16"
                  } bg-backgroundOffset shadow rounded p-2`}
                >
                  <p className="text-primary text-lg">Round {i + 1}</p>
                  <p>{round.clue.description}</p>
                </div>
                {round.status != 1 && (
                  <div className="col-span-16 md:col-span-4 lg:col-span-2 bg-backgroundOffset shadow rounded p-2 md:ml-1 text-center">
                    <p
                      className={`text-xl ${
                        round.status == 3 ? "text-success" : "text-red-400"
                      }`}
                    >
                      {round.status == 3 ? "Correct" : "Fail"}
                    </p>
                    <p>{round.clue.name}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

RoundsSection.propTypes = {
  game: PropTypes.object.isRequired,
};

export default RoundsSection;
