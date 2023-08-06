//client/components/Home.js
import React, { useEffect, useState} from "react";
import UserService from "../services/user.service";

export const Home = () => {
    const [content, setContent] = useState("");
  
    useEffect(() => {
      UserService.getPublicContent()
        .then((response) => {
          setContent(response);
        })
        .catch((error) => {
          setContent(
            (error.message && error.response && error.response.data) ||
            error.message ||
            error.toString()
          );
        });
    }, []);
  
    return (
      <div className="container">
        <header>
          <h3>{typeof content === "string" ? content : content.message} Hello</h3>
        </header>
      </div>
    );
  };