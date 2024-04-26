import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newTag } from '../../../tools/obJectShapes';
import ManageTag from './ManageTag';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { getTagById, saveTag } from '../../../api/tagsApi';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { Tag } from '../../../types/Tags';

function EditTag() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tag, setTag] = useState({ ...newTag } as Tag);
  const [saving, setSaving] = useState(false);

  const editTag = useMutation({
    mutationFn: (updatedTag: Tag) => {
      setSaving(true);
      return saveTag(updatedTag);
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

  const { isLoading, error } = useQuery({
    queryKey: ['tag-update', id],
    queryFn: () =>
      getTagById(Number(id)).then((res) => {
        setTag({
          id: res.id,
          name: res.name,
          type: res.type,
        });
        return res;
      }),
  });

  function handleUpdate(updatedTag: Tag): void {
    setTag(updatedTag);
  }

  if (isLoading) return <LoadingMessage message={'Loading tag.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading tag for editing.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='Edit-tag-page'>
      <ManageTag
        tag={tag}
        updateTag={handleUpdate}
        triggerSave={() => editTag.mutate(tag)}
        saving={saving}
      ></ManageTag>
    </div>
  );
}

export default EditTag;
