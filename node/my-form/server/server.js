const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'my_form',
  host: 'localhost',
  database: 'signup',
  password: '123',
  port: 5432, // Default PostgreSQL port
});


//Schema-հայտարարում է տվյալների տիպերը, դաշտերը, կապերը
const typeDefs = gql`
  type User {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    birthday: String!
    gender: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(
      
        first_name: String!
        last_name: String!
        password: String!
        email: String!
        birthday: String!
        gender: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      client.release();

      return result.rows;
    },
  },
  Mutation: {
    createUser: async (_, { first_name, last_name, email, password, birthday, gender }) => {
      console.log('Creating user:', first_name, last_name, email, password, birthday, gender);
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO users ( first_name, last_name, email, password, birthday, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [first_name, last_name, email, password, birthday, gender]
      );
      client.release();

      return result.rows[0];
    },
  },
};

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
  });
};

startServer().catch((err) => console.error('Error starting server:', err));