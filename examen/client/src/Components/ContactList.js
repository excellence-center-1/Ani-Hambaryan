//ContactList.js
import React from 'react';

export const ContactList = ({ list, remove }) => {

  return (
    <>
      {list?.length > 0 ? (
        <ul className='contact-list'>
          {list.map((text, index) => (
            <div className='contact' key={index}>
              <li>Name: {text.contact}</li>
              <li>Phone: {text.phone_number}</li>
              
                <li>Group: {text.group}</li>
    
              <button
                className='delete-contact-button'
                onClick={() => {
                  remove(text.phone_number);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>No contacts found</p>
        </div>
      )}
    </>
  );
};
