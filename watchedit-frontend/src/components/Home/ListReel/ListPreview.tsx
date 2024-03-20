import { useNavigate } from 'react-router-dom';
import { List } from '../../../types/Lists';
import ArrowRightAltIcon from '../../Icons/ArrowRightAltIcon';

const ListPreview = ({ list }: { list: List }) => {
  const navigate = useNavigate();
  return (
    <div
      key={list.id}
      className='col-span-12 my-2 mr-4 md:col-span-6 lg:col-span-4'
    >
      <div
        onClick={() => {
          navigate(`/lists/${list.id}`);
        }}
        className='h-full cursor-pointer rounded bg-backgroundOffset shadow hover:opacity-75'
      >
        <div className='grid h-full grid-cols-12'>
          <div className='col-span-4 flex items-center justify-center p-1'>
            <p className='mt-1 text-center text-sm '>
              {list.name} {`(${list.filmCount})`} <br></br> By{' '}
              {list.createdBy.username}
            </p>
          </div>
          <div className='col-span-6'>
            <div className='grid h-full grid-cols-12'>
              {list.thumbnails.map((url) => {
                return (
                  <div key={url} className='col-span-3'>
                    <img
                      src={url}
                      className='poster h-full w-full'
                      alt='thumbnail'
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className='col-span-2 flex items-center justify-center rounded-r bg-primary'>
            <ArrowRightAltIcon color='white' height={6} width={6} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPreview;
