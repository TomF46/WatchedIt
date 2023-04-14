import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryById, saveCategory } from "../../../api/categoriesApi";
import CategoryManageForm from "../../../components/Categories/Manage/CategoryManageForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { newCategory } from "../../../tools/obJectShapes";

function ManageCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ ...newCategory });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (id) {
            getCategoryById(id)
                .then(data => {
                    mapForEditing(data);
                    setEditing(true);
                })
                .catch(error => {
                    toast.error(`Error fetching category ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setCategory({ ...newCategory});
        }
    }, [id]);

    function mapForEditing(data){
        setCategory({
            id: data.id,
            name: data.name
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: value
        }));
    }

    function formIsValid(){
        const { name, description} = category;
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(name.length > 30) errors.name = "Name can't be longer than 30 characters.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCategory(category).then(res => {
            toast.success("Category saved");
            navigate(`/categories/${res.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }



    return (
        <div className="manage-category-page">
            <h1 className="text-2xl text-center text-primary mt-4">{editing ? `Editing category` : "Adding category"}</h1>
            {category ? (
                <CategoryManageForm category={category} onChange={handleChange} onSave={handleSave} errors={errors} saving={saving} />
            ) : (
                <LoadingMessage message={"Loading category"} />
            )}
        </div>
    );
}

export default ManageCategory;
 