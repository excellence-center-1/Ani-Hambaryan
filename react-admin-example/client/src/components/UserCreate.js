import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin'


const UserCreate = (props) => {
    return (
        <Create title='Create a User' {...props}>
            <SimpleForm>
            <NumberInput source="id" />
                <TextInput source="name" />
                <TextInput source="username" />
                <TextInput source="email" />
                <TextInput source="phone" />
                <TextInput source="company"/>
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;