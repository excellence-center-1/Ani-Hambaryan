import React, {useState, useEffect} from "react";
import UserService from "../services/user.service";

export const BoardUser = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard()
        .then((response) => {
            setContent(response.data);
        })
        .catch((error) =>{
            setContent(
                (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString()
              );
        });
    }, []);

    return (
        <div className="container">
        <header >
          <h3>{content}</h3>
        </header>
      </div>
    );
};