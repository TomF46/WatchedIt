import FilmPreview from "./FilmPreview";
import { Film } from "../../types/Films";

type Props = {
  films: Film[];
  editable: boolean;
  onRemove?: (film: Film) => void;
};

const FilmGrid = ({ films, editable, onRemove }: Props) => {
  return (
    <div className="grid grid-cols-16">
      {films.map((film) => {
        return (
          <FilmPreview
            key={film.id}
            film={film}
            editable={editable}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default FilmGrid;
