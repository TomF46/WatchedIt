import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newPerson } from "../../../tools/obJectShapes";
import ManagePerson from "./ManagePerson";
import { savePerson } from "../../../api/peopleApi";
import { useMutation } from "@tanstack/react-query";

function AddPerson() {
  const navigate = useNavigate();
  const [person, setPerson] = useState({ ...newPerson });
  const [saving, setSaving] = useState(false);

  const addPerson = useMutation({
    mutationFn: (newPerson) => {
      setSaving(true);
      return savePerson(newPerson);
    },
    onSuccess: (res) => {
      toast.success("Person saved");
      navigate(`/people/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving person ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedPerson) {
    setPerson(updatedPerson);
  }

  return (
    <div className="Add-person-page">
      <ManagePerson
        person={person}
        updatePerson={handleUpdate}
        triggerSave={() => {
          addPerson.mutate(person);
        }}
        saving={saving}
      ></ManagePerson>
    </div>
  );
}

export default AddPerson;
