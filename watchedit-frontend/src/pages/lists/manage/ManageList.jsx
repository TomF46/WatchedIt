import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmListById, saveFilmList } from "../../../api/filmListsApi";
import ListManageForm from "../../../components/Lists/Manage/ListManageForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { newList } from "../../../tools/obJectShapes";

function ManageList() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState({ ...newList });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (id) {
            getFilmListById(id)
                .then(data => {
                    mapForEditing(data);
                    if(!data.userCanEdit) navigate(`/lists/${data.id}`);
                    setEditing(true);
                })
                .catch(error => {
                    toast.error(`Error fetching list ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setList({ ...newList});
        }
    }, [id]);

    function mapForEditing(data){
        setList({
            id: data.id,
            name: data.name,
            description: data.description,
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setList(prevList => ({
            ...prevList,
            [name]: value
        }));
    }

    function formIsValid(){
        const { name, description} = list;
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(name.length > 60) errors.name = "Name can't be longer than 60 characters.";
        if(!description) errors.description = "Description is required";
        if(description.length > 400) errors.description = "Description can't be longer than 400 characters.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveFilmList(list).then(res => {
            toast.success("List saved");
            navigate(`/lists/${res.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }



    return (
        <div className="manage-list-page">
            <h1 className="text-center text-primary text-2xl mt-4">{editing ? `Editing ${list.name}` : "Adding list"}</h1>
            {list ? (
                <ListManageForm list={list} onChange={handleChange} onSave={handleSave} errors={errors} saving={saving} />
            ) : (
                <LoadingMessage message={"Loading form."} />
            )}
        </div>
    );
}

export default ManageList;
 