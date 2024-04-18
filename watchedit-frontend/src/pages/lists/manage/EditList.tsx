import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newList } from '../../../tools/obJectShapes';
import ManageList from './ManageList';
import {
  getFilmListForEditById,
  saveFilmList,
} from '../../../api/filmListsApi';
import { useQuery } from '@tanstack/react-query';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { EditableList } from '../../../types/Lists';
import useCurrentUserId from '../../../hooks/useCurrentUserId';

function EditList() {
  const { id } = useParams();
  const userId = useCurrentUserId();
  const navigate = useNavigate();
  const [list, setList] = useState<EditableList>({ ...newList });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ['list-update', id],
    queryFn: () =>
      getFilmListForEditById(Number(id)).then((res) => {
        if (res.createdBy.id != userId) navigate(`/lists/${id}`);
        setList({
          id: res.id,
          name: res.name,
          description: res.description,
        });
        return res;
      }),
  });

  function handleUpdate(updatedList: EditableList): void {
    setList(updatedList);
  }

  function handleSave(): void {
    setSaving(true);
    saveFilmList(list)
      .then((res) => {
        toast.success('List saved');
        navigate(`/lists/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={'Loading list.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading list for editing.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='Edit-list-page'>
      <ManageList
        list={list}
        updateList={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageList>
    </div>
  );
}

export default EditList;
