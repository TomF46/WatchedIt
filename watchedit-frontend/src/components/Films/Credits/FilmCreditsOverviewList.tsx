import FilmCreditPreview from "./FIlmCreditPreview";
import { FilmCredit } from "../../../types/Films";

const FilmCreditsOverviewList = ({ credits }: { credits: FilmCredit[] }) => {
  return (
    <div className="grid grid-cols-12">
      {credits.map((credit) => {
        return (
          <div
            className="col-span-8 md:col-span-4 lg:col-span-2 my-2"
            key={credit.id}
          >
            <FilmCreditPreview
              credit={credit}
              isLink={true}
              showFilmName={false}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FilmCreditsOverviewList;
