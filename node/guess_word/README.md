table users
create table users (
    id serial primary key, 
    name VARCHAR(20), 
    password VARCHAR(150)
);

table levels
create table levels (
    id serial primary key, 
    level_name VARCHAR(20), 
    score INTEGER
);


table users_levels
create table users_levels (
    id serial primary key, 
    user_id INTEGER, 
    level_id INTEGER, 
    start_date TIMESTAMP , 
    end_date TIMESTAMP, 
    constraint fk_user 
        foreign key(user_id) 
        references users(id), 
    constraint fk_level 
        foreign key(level_id) 
        references levels(id)
);


GRANT ALL PRIVILEGES ON TABLE levels TO game_guess_word;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE levels_id_seq TO game_guess_word;