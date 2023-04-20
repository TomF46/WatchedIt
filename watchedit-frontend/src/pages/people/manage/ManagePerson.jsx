import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../../../api/imageApi";
import { getPersonById, savePerson } from "../../../api/peopleApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PersonManageForm from "../../../components/People/Manage/PersonManageForm";
import { newPerson } from "../../../tools/obJectShapes";
import { parseISO } from "date-fns";

function ManagePerson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState({ ...newPerson });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);


    useEffect(() => {
        if (id) {
            getPersonById(id)
                .then(data => {
                    mapForEditing(data);
                    setEditing(true);
                })
                .catch(error => {
                    toast.error(`Error fetching person ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setPerson({ ...newPerson});
        }
    }, [id]);

    function mapForEditing(data){

        setPerson({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            middleNames: data.middleNames,
            stageName: data.stageName,
            dateOfBirth: parseISO(data.dateOfBirth),
            description: data.description,
            imageUrl: data.imageUrl
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setPerson(prevPerson => ({
            ...prevPerson,
            [name]: value
        }));
    }

    function handleDateChange(date){
        person.dateOfBirth = date;
        setPerson({ ...person});
    }

    function handleImageChange(event){
        if(event == null){
            person.imageUrl = null;
            setPerson({ ...person});
            return;
        }

        let file = event.target.files[0];
        setImageUploading(true);
        uploadImage(file, "people").then(res => {
            person.imageUrl = res.url;
            setPerson({ ...person});
            setImageUploading(false);
        }).catch(error => {
            setImageUploading(false);
            toast.error(`Error uploading image ${error.message}`, {
                autoClose: false
            }
            );
        });
    }

    function formIsValid(){
        const { firstName, lastName, middleNames, stageName, description, imageUrl, dateOfBirth } = person;
        const errors = {};
        if(!firstName) errors.firstName = "First name is required";
        if(firstName.length > 50) errors.firstName = "First name cant be longer than 50 characters";
        if(!lastName) errors.lastName = "Last name is required";
        if(lastName.length > 50) errors.lastName = "Last name cant be longer than 50 characters";
        if(middleNames && middleNames.length > 80) errors.middleNames = "Middle names cant be longer than 80 characters";
        if(stageName && stageName.length > 50) errors.stageName = "Stage name cant be longer than 50 characters"
        if(!description) errors.description = "Description is required";
        if(description.length > 800) errors.description = "Description cant be longer than 800 characters";
        if(!imageUrl) errors.imageUrl = "Image url is required";
        if(!dateOfBirth) errors.dateOfBirth = "Date of birth is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        savePerson(person).then(res => {
            toast.success("Person saved");
            navigate(`/people/${res.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }



    return (
        <div className="manage-person-page">
            {person ? (
                <PersonManageForm person={person} onChange={handleChange} onDateChange={handleDateChange} onImageChange={handleImageChange} onSave={handleSave} errors={errors} saving={saving} editing={editing} uploadingImage={imageUploading} />
            ) : (
                <LoadingMessage message={"Loading form."} />
            )}
        </div>
    );
}

export default ManagePerson;
