import { Person } from "../../types/People";

const PersonClue = ({ person }: { person: Person }) => {
  return (
    <div className="col-span-8 md:col-span-4 lg:col-span-2 mt-2 h-full">
      <div className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full shadow rounded">
        <img
          src={person.imageUrl}
          className="w-full headshot rounded-t"
          alt={`${person.fullName} headshot.`}
        />
        <div className="p-2">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <h3 className="text-center text-primary">{person.fullName}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonClue;
