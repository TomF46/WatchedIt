import { useState } from 'react';
import ManageTagForm from '../../../components/Tags/Manage/ManageTagForm';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { Tag, TagFormErrors } from '../../../types/Tags';

type Props = {
  tag: Tag;
  updateTag: (tag: Tag) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageTag({ tag, updateTag, triggerSave, saving }: Props) {
  const [errors, setErrors] = useState({} as TagFormErrors);

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { name, value } = event.target;
    updateTag((prevTag: Tag) => ({
      ...prevTag,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { name } = tag;
    const errors = {} as TagFormErrors;
    if (!name) errors.name = 'Name is required';
    if (name.length > 30)
      errors.name = "Name can't be longer than 30 characters.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className='manage-tag-page'>
      {tag ? (
        <ManageTagForm
          tag={tag}
          onChange={handleChange}
          onSave={handleSave}
          errors={errors}
          saving={saving}
        />
      ) : (
        <LoadingMessage message={'Loading tag'} />
      )}
    </div>
  );
}

export default ManageTag;
