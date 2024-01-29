import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newList } from "../../../tools/obJectShapes";
import ManageList from "./ManageList";
import { getFilmListById, saveFilmList } from "../../../api/filmListsApi";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function EditList() {
  const { id } = useParams();
  const userId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const navigate = useNavigate();
  const [list, setList] = useState({ ...newList });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["list-update", id],
    queryFn: () =>
      getFilmListById(id).then((res) => {
        if (res.createdBy.id != userId) navigate(`/lists/${id}`);
        setList({
          id: res.id,
          name: res.name,
          description: res.description,
        });
        return res;
      }),
  });

  function handleUpdate(updatedList) {
    setList(updatedList);
  }

  function handleSave() {
    setSaving(true);
    saveFilmList(list)
      .then((res) => {
        toast.success("List saved");
        navigate(`/lists/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={"Loading list."} />;

  if (error) {
    toast.error(`Error getting list ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="Edit-list-page">
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