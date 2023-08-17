import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    NumberInput,
ReferenceInput,
AutocompleteInput
} from 'react-admin'

const PostCreate = (props) => {
    return (
        <Create title='Create a Post' {...props}>
            <SimpleForm>
            <NumberInput source="id" />
        <ReferenceInput source="userId" reference="users">
          <AutocompleteInput label="Author" />
        </ReferenceInput>
                <TextInput source='title' />
                <TextInput multiline source='body' />
                <DateInput label='Published' source='publishedAt' />
            </SimpleForm>
        </Create>
    );
};

export default PostCreate;