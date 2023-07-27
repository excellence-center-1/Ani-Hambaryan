import React, { useEffect, useState} from "react";
import UserService from "../services/user.service";

export const Home = () => {
    const [content, setContent] = useState("")

    // useEffect(
    //     () => {
    //         UserService.getPublicContent()
    //         .then((response) => {
    //             setContent(response.data);
    //         })
    //         .catch((error) => {
    //             setContent(
    //                 (error.message && error.response.data) ||
    //                 error.message ||
    //                 error.toString()
    //             );
    //         });
    //     }, []);

    return (
        <div className="container">
             <header >
        <h3>{content} Hello</h3>
      </header>

        </div>
    )

}