import PersonClue from "../PersonClue";
import { GuessFilmFromCastGame } from "../../../types/Games";

const ClueSection = ({ game }: { game: GuessFilmFromCastGame }) => {
  return (
    <div>
      <h3 className="text-4xl text-primary text-center mb-2">Clues</h3>
      <div className="grid grid-cols-12">
        {game.clues.map((person) => {
          return (
            <div
              className="col-span-12 md:col-span-4 lg:col-span-2 my-2"
              key={person.id}
            >
              <PersonClue person={person} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClueSection;
