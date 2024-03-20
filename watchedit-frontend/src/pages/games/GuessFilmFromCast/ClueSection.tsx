import PersonClue from '../PersonClue';
import { GuessFilmFromCastGame } from '../../../types/Games';

const ClueSection = ({ game }: { game: GuessFilmFromCastGame }) => {
  return (
    <div>
      <h3 className='mb-2 text-center text-4xl text-primary'>Clues</h3>
      <div className='grid grid-cols-12'>
        {game.clues.map((person) => {
          return (
            <div
              className='col-span-12 my-2 md:col-span-4 lg:col-span-2'
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
