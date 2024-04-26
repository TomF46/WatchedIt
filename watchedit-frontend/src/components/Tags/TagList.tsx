import { useNavigate } from 'react-router-dom';
import { Tag } from '../../types/Tags';

const TagList = ({ tags }: { tags: Tag[] }) => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-12'>
      {tags.map((tag) => {
        return (
          <div key={tag.id} className='col-span-12 my-2'>
            <div
              onClick={() => {
                navigate(`/tags/${tag.id}`);
              }}
              className='mx-2 bg-backgroundOffset p-4'
            >
              <p>{tag.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
