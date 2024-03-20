import { GuessFilmFromDescriptionGame } from '../../../types/Games';

const RoundsSection = ({ game }: { game: GuessFilmFromDescriptionGame }) => {
  return (
    <div>
      <h3 className='mb-2 text-center text-4xl text-primary'>Rounds</h3>
      <div className='grid grid-cols-12'>
        {game.rounds.map((round, i) => {
          return (
            <div className='col-span-12 my-2' key={round.id}>
              <div className='grid grid-cols-16'>
                <div
                  className={`${
                    round.status != 1
                      ? 'col-span-16 md:col-span-12 lg:col-span-14'
                      : 'col-span-16'
                  } rounded bg-backgroundOffset p-2 shadow`}
                >
                  <p className='text-lg text-primary'>Round {i + 1}</p>
                  <p>{round.clue.description}</p>
                </div>
                {round.status != 1 && (
                  <div className='col-span-16 rounded bg-backgroundOffset p-2 text-center shadow md:col-span-4 md:ml-1 lg:col-span-2'>
                    <p
                      className={`text-xl ${
                        round.status == 3 ? 'text-success' : 'text-red-400'
                      }`}
                    >
                      {round.status == 3 ? 'Correct' : 'Fail'}
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

export default RoundsSection;
