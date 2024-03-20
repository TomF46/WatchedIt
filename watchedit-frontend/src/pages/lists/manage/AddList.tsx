import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newList } from '../../../tools/obJectShapes';
import ManageList from './ManageList';
import { saveFilmList } from '../../../api/filmListsApi';
import { EditableList } from '../../../types/Lists';

function AddList() {
  const navigate = useNavigate();
  const [list, setList] = useState<EditableList>({ ...newList });
  const [saving, setSaving] = useState(false);

  function handleUpdate(updatedList: EditableList) {
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

  return (
    <div className='Add-list-page'>
      <ManageList
        list={list}
        updateList={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageList>
    </div>
  );
}

export default AddList;
