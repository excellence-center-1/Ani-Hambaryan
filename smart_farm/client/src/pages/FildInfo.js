import React from 'react';
import Table from '../components/Table'; // Import the Table component
import SearchInput from '../components/Search';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Name', headerName: 'Name', width: 200, editable: true },
  { field: 'phoneNumber', headerName: 'Phone Number', type: 'number', width: 200, editable: true },
  { field: 'Owner', headerName: 'Owner', type: 'Owner', width: 200, editable: true },
];

const rows = [
  { id: 1, Name: 'Snow', PhoneNumber: 35, Owner: 'sssss' },
  { id: 2, Name: 'Lannister', phoneNumber: 42, Owner: 'lannister72@gmail.com'},
  { id: 3, Name: 'Jaime', phoneNumber: 45, Owner: 'Jami'},
  { id: 4, Name: 'Stark',  phoneNumber: 16, Owner: ''},
  { id: 5, Name: 'Targaryen',  phoneNumber: null, Owner: ''},
  { id: 6, Name: 'Melisandre',  phoneNumber: 150, Owner: ''},
  { id: 7, Name: 'Clifford',  phoneNumber: 44, Owner: ''},
  { id: 8, Nmae: 'Frances', phoneNumber: 36, Owner: ''},
  { id: 9, Name: 'Roxie',  phoneNumber: 65, Owner: ''},
];

export const FildInfo = () => {
  
  return <Table columns={columns} rows={rows} />;
  
};
