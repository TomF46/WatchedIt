import PersonPreview from "./PersonPreview";
import { Person } from "../../types/People";

const PersonGrid = ({ people }: { people: Person[] }) => {
  return (
    <div className="grid grid-cols-16">
      {people.map((person) => {
        return <PersonPreview key={person.id} person={person} isLink={true} />;
      })}
    </div>
  );
};

export default PersonGrid;
