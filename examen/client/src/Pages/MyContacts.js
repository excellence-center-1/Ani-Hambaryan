import React, { useEffect, useState } from 'react';
import { ContactInput } from '../Components/ContactInput';
import { ContactList } from '../Components/ContactList';
import axios from 'axios';
import { getJwtTokenFromCookies } from '../utils/authUtils';
import { SearchContact } from '../Components/SearchContact';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const MyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('Family');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getJwtTokenFromCookies();

    if (!jwtToken) {
      navigate('/');
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get(`contacts`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setContacts(response.data);
        console.log('contacts', response.data);
      } catch (error) {
        console.error('Error fetching contacts list:', error);
      }
    };
    fetchContacts();
  }, []);


  const actionAddContact = () => {
    setIsAddingContact(!isAddingContact);
  };

  const addContact = async () => {
    if (contact !== '') {
      try {
        const response = await axios.post('/contacts/create', { contact, email, phone, group }, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });
        setContacts([...contacts, response.data]);
        setContact('');
        setEmail('');
        setPhone('');
        setGroup('Family');
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    }
  };

  const deleteContact = async (phone_number) => {
    try {
      await axios.delete(`/contacts/${phone_number}`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      });

      const newContacts = contacts.filter((contact) => contact.phone_number !== phone_number);
      setContacts(newContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSearch = (search) => {
    if (search === '') {
      setFilteredContacts([]);
      setSearchText('');
    } else {
      const filteredContacts = contacts.filter(
        (contact) =>
          contact.contact.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone_number.includes(search)
      );
      setFilteredContacts(filteredContacts);
      setSearchText(search);
    }
  };

  const handleCancelSearch = () => {
    setSearchText('');
    setFilteredContacts([]);
  };

  return (
    <div>
      <h1 className="contact-header">React Contact App</h1>
      {!isAddingContact && (
        <button onClick={actionAddContact}>Add Contact</button>
      )}
      <SearchContact onSearch={handleSearch} onCancel={handleCancelSearch} />
      {isAddingContact && (
        <ContactInput
          contact={contact}
          setContact={setContact}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          group={group}
          setGroup={setGroup}
          addContact={addContact}
          actionAddContact={actionAddContact}
        />
      )}
      <ContactList list={searchText ? filteredContacts : contacts} remove={deleteContact} />
    </div>
  );
};
