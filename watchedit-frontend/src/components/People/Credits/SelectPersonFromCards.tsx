import { Person } from "../../../types/People";

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
            className="col-span-8 md:col-span-4 lg:col-span-2 my-2"
          >
            <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded">
              <div
                onClick={() => {
                  onPersonSelected(person);
                }}
                className="hover:opacity-75 relative"
              >
                <img
                  src={person.imageUrl}
                  className={`w-full headshot rounded-t`}
                  alt={`${person.fullName} headshot.`}
                />
                <div className="p-2">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12">
                      <h3 className="text-center text-primary">
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
