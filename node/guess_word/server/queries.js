const bcrypt = require('bcrypt');
const { request, response } = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    user: 'game_guess_word',
    host: 'localhost',
    database: 'mydb',
    password: '123',
    port: 5432,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserByName = async (name) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const checkUserExist = async (request, response, next) => {
    const { name } = request.body;
    try {
        const existingUser = await getUserByName(name);
        if (existingUser) {
            return response.status(409).send('Username already exists');
        }
        next();
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
};

const createUser = async (request, response) => {
    const { name, password } = request.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            throw err;
        }

        try {
            const result = await pool.query(
                'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
                [name, hash]
            );
            response.status(201).send(`User added with ID: ${result.rows[0].id}`);
        } catch (error) {
            throw error;
        }
    });
};

const addLevel = (levelName, score) => {
    const result = pool.query(
        'INSERT INTO levels (level_name, score) VALUES ($1, $2) RETURNING *',
        [levelName, score]
    );
};


const loginUser = async (request, response) => {
    const { username, password } = request.body;

    try {
        const user = await getUserByName(username);
        if (!user) {
            return response.status(401).send('Invalid username or password');
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                throw err;
            }

            if (result) {
                // 
                const token = jwt.sign({ id: user.id }, 'secretKey'); 
                response.cookie('token', token, { httpOnly: true });
                return response.status(200).json({ token });
            } else {
                // 
                return response.status(401).send('Invalid username or password');
            }
        });
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
};



const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    checkUserExist,
    createUser,
    deleteUser,
    loginUser,
    addLevel
};






