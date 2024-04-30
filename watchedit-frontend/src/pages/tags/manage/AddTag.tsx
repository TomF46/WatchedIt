import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newTag } from '../../../tools/obJectShapes';
import ManageTag from './ManageTag';
import { saveTag } from '../../../api/tagsApi';
import { useMutation } from '@tanstack/react-query';
import { Tag } from '../../../types/Tags';

function AddTag() {
  const navigate = useNavigate();
  const [tag, setTag] = useState({ ...newTag } as Tag);
  const [saving, setSaving] = useState(false);

  const addTag = useMutation({
    mutationFn: (newTag: Tag) => {
      setSaving(true);
      return saveTag(newTag);
    },
    onSuccess: (res) => {
      toast.success('Tag saved');
      navigate(`/tags/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedTag: Tag): void {
    console.log(updatedTag);
    setTag(updatedTag);
  }

  return (
    <div className='Add-tag-page'>
      <ManageTag
        tag={tag}
        updateTag={handleUpdate}
        triggerSave={() => addTag.mutate(tag)}
        saving={saving}
      ></ManageTag>
    </div>
  );
}

export default AddTag;
