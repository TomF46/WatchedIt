import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CategoryList = ({ categories }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {categories.map((category) => {
                return (
                    <div key={category.id} className="col-span-12 my-2">
                        <div onClick={() => {navigate(`/categories/${category.id}`)}} className="p-4 mx-2 bg-backgroundOffset cursor-pointer">
                            <p>{category.name}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default CategoryList;
