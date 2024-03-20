import ListPreview from '../Home/ListReel/ListPreview';
import { List } from '../../types/Lists';

const FilmListList = ({ lists }: { lists: List[] }) => {
  return (
    <div className='grid grid-cols-12'>
      {lists.map((list) => {
        return <ListPreview key={list.id} list={list} />;
      })}
    </div>
  );
};

export default FilmListList;
