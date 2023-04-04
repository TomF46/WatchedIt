import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryById } from "../../api/categoriesApi";
import LoadingMessage from "../../components/Loading/LoadingMessage";


function Category({isAdmin}){
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        if (!category) {
        getCategory();
        }
    }, [id, category]);

    function getCategory(){
        getCategoryById(id).then(res => {
            setCategory(res);
        }).catch(err => {
            toast.error(`Error getting category ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return(
        <div className="categories-page">
            {!category ? (
                <LoadingMessage message={"Loading category"} />
            ) : (
                <div>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/categories/${id}/edit`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit category
                                </Link>
                            </div>
                        </div>
                    )}
                    <p>{category.name}</p>
                </div>
            )}
        </div>
    )

}

Category.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(Category);

