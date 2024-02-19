import PersonCreditPreview from "./PersonCreditPreview";
import { PersonCredit } from "../../../types/People";

const PersonCreditsOverviewList = ({
  credits,
}: {
  credits: PersonCredit[];
}) => {
  return (
    <div className="grid grid-cols-16">
      {credits.map((credit) => {
        return (
          <div
            className="col-span-8 md:col-span-4 lg:col-span-2 my-2"
            key={credit.id}
          >
            <PersonCreditPreview credit={credit} />
          </div>
        );
      })}
    </div>
  );
};

export default PersonCreditsOverviewList;
