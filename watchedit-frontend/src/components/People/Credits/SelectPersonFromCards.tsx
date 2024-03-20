import { Person } from '../../../types/People';

type Props = {
  people: Person[];
  onPersonSelected: (person: Person) => void;
};

const SelectPersonFromCards = ({ people, onPersonSelected }: Props) => {
  return (
    <>
      {people.map((person) => {
        return (
          <div
            key={person.id}
            className='col-span-8 my-2 md:col-span-4 lg:col-span-2'
          >
            <div className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'>
              <div
                onClick={() => {
                  onPersonSelected(person);
                }}
                className='relative hover:opacity-75'
              >
                <img
                  src={person.imageUrl}
                  className={`headshot w-full rounded-t`}
                  alt={`${person.fullName} headshot.`}
                />
                <div className='p-2'>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-12'>
                      <h3 className='text-center text-primary'>
                        {person.fullName}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SelectPersonFromCards;
