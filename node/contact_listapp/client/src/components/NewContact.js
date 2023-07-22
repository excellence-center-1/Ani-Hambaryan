import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NewContact = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, contacts, contact } = location.state || {};
    const handleGoToContacts = () => {
        navigate('/home');
    };
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cellphoneNumber, setCellphoneNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");
    const [msg, setMsg] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (contact) {
            setFirstName(contact.firstname || "");
            setLastName(contact.lastname || "");
            setCellphoneNumber(contact.cellphoneNumber || "");
            setPhoneNumber(contact.phoneNumber || "");
            setEmail(contact.email || "");
            setGroup(contact.group || "");
            setIsEditing(true);
        } else {
            setFirstName("");
            setLastName("");
            setCellphoneNumber("");
            setPhoneNumber("");
            setEmail("");
            setGroup("");
            setIsEditing(false);
        }
    }, [contact]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        switch (fieldName) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'cellphoneNumber':
                setCellphoneNumber(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'group':
                setGroup(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestConfig = {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    cellphoneNumber,
                    email,
                    group,
                }),
            };
            if (isEditing) {
                const contactId = contact.id;
                const url = `http://localhost:4000/contacts/${contactId}`;
                requestConfig.url = url;
            } else {
                const url = 'http://localhost:4000/newcontact';
                requestConfig.url = url;
            }
            const response = await fetch(requestConfig.url, requestConfig);
            const data = await response.json();
            if (response.ok) {
                setMsg(isEditing ? 'Contact updated' : 'New contact added');
                setTimeout(() => {
                    navigate("/home", { state: { username, contacts } });
                }, 1000);
            }
        } catch (err) {
            console.error(isEditing ? 'Contact not updated' : 'Contact not added', err);
        }
    };


    return (
        <div className="container mt-5 p-auto w-25 text-center ">
            <h1 className="mb-4">{isEditing ? "Edit contact" : "Create new contact"}</h1>
            <p ref={ref} className={msg ? "msg" : "offscreen"}>{msg}</p>
            <form className="d-flex flex-column  m-1 p-1" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="firstname"
                    value={firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    className="m-1"
                />
                <input
                    type="text"
                    placeholder="lastname"
                    value={lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    className="m-1"
                />
                <input
                    type="text"
                    placeholder="cellPhone"
                    value={cellphoneNumber}
                    name="cellphoneNumber"
                    onChange={handleInputChange}
                    className="m-1"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputChange}
                    className="m-1"
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    name="email"
                    onChange={handleInputChange}
                    className="m-1"
                />
                <input
                    type="text"
                    placeholder="group"
                    value={group}
                    name="group"
                    onChange={handleInputChange}
                    className="m-1"
                />
                <div className="m-2 ">
                    <button type="submit" className="btn btn-primary">Add or Edit</button>
                </div>
            </form>
            <button className="btn btn-secondary " onClick={handleGoToContacts}>
                Go to My Contacts
            </button>
        </div>
    );
};
