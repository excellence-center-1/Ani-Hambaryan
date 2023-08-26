import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const withStyledHeader = (column: GridColDef) => ({
  ...column,
  headerName: (
    <Box sx={{ color: '#A5AEE5', fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>
      {column.headerName}
    </Box>
  ),
});

const columns: GridColDef[] = [
  withStyledHeader({ field: 'id', headerName: 'ID', width: 90 }),
  withStyledHeader({ field: 'userName', headerName: 'User Name', width: 200, editable: true }),
  withStyledHeader({ field: 'role', headerName: 'Role', width: 200, editable: true }),
  withStyledHeader({ field: 'phoneNumber', headerName: 'Phone Number', type: 'number', width: 200, editable: true }),
  withStyledHeader({ field: 'email', headerName: 'Email', type: 'email', width: 200, editable: true }),
];
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,


const rows = [
  { id: 1, userName: 'Snow', role: 'Jon', PhoneNumber: 35, email: '' },
  { id: 2, userName: 'Lannister', role: 'Cersei', phoneNumber: 42, email: 'lannister72@gmail.com'},
  { id: 3, userName: 'Jaime', role: 'Jaime', phoneNumber: 45, email: 'Jami'},
  { id: 4, userName: 'Stark', role: 'Arya', phoneNumber: 16, email: ''},
  { id: 5, userName: 'Targaryen', role: 'Daenerys', phoneNumber: null, email: ''},
  { id: 6, userName: 'Melisandre', role: 'farmer', phoneNumber: 150, email: ''},
  { id: 7, userName: 'Clifford', role: 'Ferrara', phoneNumber: 44, email: ''},
  { id: 8, userNmae: 'Frances', role: 'Rossini', phoneNumber: 36, email: ''},
  { id: 9, userName: 'Roxie', role: 'Harvey', phoneNumber: 65, email: ''},
];

export const UserInfo = () => {

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}