import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContact } from "./SearchContact";

export const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const location = useLocation();
    const { username } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:4000/contacts');
                const data = await response.json();
                if (response.ok) {
                    setContacts(data.contacts);
                }
            } catch (err) {
                console.error('Error fetching contacts', err);
            }
        };
        fetchContacts();
    }, []);
    const handleDeleteContact = async (contactId) => {
        try {
            const response = await fetch(`http://localhost:4000/contacts/${contactId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {

                const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
                setContacts(updatedContacts);
            } else {
                console.error("Error deleting contact");
            }
        } catch (err) {
            console.error("Error deleting contact", err);
        }
    };


    const handleSearch = (search) => {
        if (search === "") {
            setFilteredContacts([]);
        } else {
            const filteredContacts = contacts.filter(
                (contact) =>
                    contact.firstname.toLowerCase().includes(search.toLowerCase()) ||
                    contact.cellphoneNumber.includes(search)
            );
            setFilteredContacts(filteredContacts);
        }
    };

    const handleEditContact = (contact) => {
        navigate("/newcontact", { state: { username, contacts, contact } });
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/newcontact", { state: { username } });

    };

    return (
        <div div className="container w-25 mt-5 bg-danger-subtle p-4 text-center">
            <h4 className="mb-4">{username}</h4>
            <h1>contacts list</h1>
            <div>
                <SearchContact onSearch={handleSearch} />
                <div className="mb-3">
                    <button className="btn btn-primary m-2" onClick={handleSubmit}>Add new contact</button>
                </div>
                <div>
                    {(filteredContacts.length > 0 ? filteredContacts : contacts).map((contact) => (
                        <div key={contact.id} className="mb-2 p-2 border border-light d-flex justify-content-betwen">
                            <p>
                                <span className="me-3;"><b>Name:  </b>{contact.firstname} </span>
                                <span className="me-3 w-25"><b>Phone: </b>{contact.cellphoneNumber}</span>
                                <button className="btn badge bg-danger ms-2" onClick={() => handleDeleteContact(contact.id)}>X</button>
                                <button className="btn badge bg-secondary ms-2" onClick={() => handleEditContact(contact)}>Edit</button>
                            </p>
                        </div>
                    ))}
                </div>
                <button className="btn btn-secondary mt-3" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};