//client/components/PostList.js
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    ReferenceField
} from 'react-admin';
const PostList = (props) => {
    return <List {...props} >
        <Datagrid>
            <TextField source='id' />
            <TextField source='title' />
            <DateField source='publishedAt' />
            <ReferenceField source="userId" label="Author" reference="users" />
            <EditButton basePath='/posts' />
            <DeleteButton basePath='/posts' />
        </Datagrid>
    </List>;
};

export default PostList;