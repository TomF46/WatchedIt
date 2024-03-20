import { Person } from '../../../types/People';

type Props = {
  people: Person[];
  onPersonSelected: (person: Person) => void;
};

const SelectPersonFromList = ({ people, onPersonSelected }: Props) => {
  return (
    <>
      {people.map((person) => {
        return (
          <div key={person.id} className='col-span-12 my-1'>
            <div
              className='grid cursor-pointer grid-cols-24 rounded bg-backgroundOffset shadow hover:opacity-75'
              onClick={() => {
                onPersonSelected(person);
              }}
            >
              <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                <img
                  src={person.imageUrl}
                  className='headshot h-full rounded-l'
                  alt={`${person.fullName} headshot.`}
                />
              </div>
              <div className={`col-span-21 p-4 md:col-span-22 lg:col-span-23`}>
                <p>{person.fullName}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SelectPersonFromList;
