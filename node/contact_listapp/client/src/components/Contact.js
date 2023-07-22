import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export const ContactDetails = () => {
    const [contactDetails, setContactDetails] = useState({});
    const location = useLocation();
    const { username } = location.state || {};
    const { contactId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/contacts`);
                const data = await response.json();
                if (response.ok) {
                    setContactDetails(data.contact);
                }
            } catch (err) {
                console.error('Error fetching contact details', err);
            }
        };

        fetchContactDetails();
    }, [contactId]);

    const handleGoToContacts = () => {
        navigate('/home', { state: { username } });
    };

    return (
        <div>
            <h1>Contact Details</h1>
            <p>Name: {contactDetails.firstname} {contactDetails.lastname}</p>
            <p>Cellphone Number: {contactDetails.cellphoneNumber}</p>
            <p>Phone Number: {contactDetails.phoneNumber}</p>
            <p>Email: {contactDetails.email}</p>
            <p>Group: {contactDetails.group}</p>
            <button className="btn btn-secondary" onClick={handleGoToContacts}>
                Go Back to Contacts
            </button>
        </div>
    );
};
