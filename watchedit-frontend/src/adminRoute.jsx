import { useEffect, useState } from "react";
import {Navigate} from 'react-router-dom';
import { getCurrentUserIsAdmin } from "./api/usersApi";

const AdminRoute = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        getCurrentUserIsAdmin().then(res => {
            setIsAdmin(res.isAdmin);
            setIsChecked(true);
        }).catch(err => {
            //If call fails then assume they are not admin
            setIsChecked(true);
        })
    }, [])

    return(
        <>
            {isChecked && (
                <>
                    {isAdmin ? (
                        children
                    ) : (
                        <Navigate to="/404" replace />
                    )}
                </>
            )}
        </>
    )
};


export default AdminRoute;
