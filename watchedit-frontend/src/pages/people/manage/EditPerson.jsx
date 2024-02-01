import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newPerson } from "../../../tools/obJectShapes";
import { getPersonById, savePerson } from "../../../api/peopleApi";
import { parseISO } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import ManagePerson from "./ManagePerson";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ErrorMessage from "../../../components/Error/ErrorMessage";

function EditPerson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({ ...newPerson });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["person-update", id],
    queryFn: () =>
      getPersonById(id).then((res) => {
        setPerson({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          middleNames: res.middleNames,
          stageName: res.stageName,
          dateOfBirth: parseISO(res.dateOfBirth),
          description: res.description,
          imageUrl: res.imageUrl,
        });
        return res;
      }),
  });

  const editPerson = useMutation({
    mutationFn: (updatedPerson) => {
      setSaving(true);
      return savePerson(updatedPerson);
    },
    onSuccess: (res) => {
      toast.success("Person saved");
      navigate(`/people/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedPerson) {
    setPerson(updatedPerson);
  }

  if (isLoading) return <LoadingMessage message={"Loading person."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading person for editing."}
        error={error}
      />
    );
  }

  return (
    <div className="Edit-person-page">
      <ManagePerson
        person={person}
        updatePerson={handleUpdate}
        triggerSave={() => {
          editPerson.mutate(person);
        }}
        saving={saving}
      ></ManagePerson>
    </div>
  );
}

export default EditPerson;
