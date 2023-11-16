# Project Contact list

## Technologies Used

List the technologies and libraries used in my project:

- ReactJS
- NestJS
- PostgreSQL
- Sequelize

## Getting Started

### Installation

*Clone the repository:*
https://github.com/excellence-center-1/Ani-Hambaryan.git

**Client installation**
*To install and run the client in development mode:*

cd client/
npm i
npm run start


**Server installation**
*To install and run the server in development mode:*

cd server/
npm install
npm run start:dev

*Execute the following command to run the migrations*

npx sequelize db:migrate


**PostgreSQL Database Setup**
*Follow these steps to set up PostgreSQL database:*

Log in to your PostgreSQL server.
Create a new user 
CREATE DATABASE 
Grant all privileges on the db_name database to the user_name user:


**Folder Structure**
*Client*
The client folder contains the frontend code for the application.
./src
├── App.css
├── App.js
├── App.test.js
├── Components
│   ├── ContactInput.js
│   ├── ContactList.js
│   ├── Login.js
│   ├── Logout.js
│   ├── NavBar.js
│   ├── Register.js
│   └── SearchContact.js
├── index.css
├── index.js
├── logo.svg
├── Pages
│   ├── Desktop.js
│   └── MyContacts.js
├── reportWebVitals.js
├── setupTests.js
└── utils
    ├── AuthContext.js
    └── authUtils.js


*Server*
The server/src folder contains the backend code for the application.
./src
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt-auth.guard.ts
├── contacts
│   ├── contacts.controller.ts
│   ├── contacts.module.ts
│   └── contacts.service.ts
├── database
│   ├── migrations
│   │   ├── 20231018190905-users.js
│   │   └── 20231025145414-contacts.js
│   ├── models
│   │   ├── contacts.model.ts
│   │   ├── index.js
│   │   └── users.model.ts
│   └── seeders
├── main.ts
└── users
    ├── dto
    │   └── create_user.dto.ts
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts




# Tag the server image
docker tag server:latest aniec1/server:latest

# Tag the client image
docker tag client:latest aniec1/client:latest

# Push the tagged images to Docker Hub
docker push aniec1/server:latest
docker push aniec1/client:latest

psql -h localhost -p 5433 -U examen1 -d examen_db1

# Tag for server image
docker tag server:latest <username>/server:latest

# Tag for client image
docker tag client:latest <username>/client:latest

# Tag for postgres image
docker tag postgres:latest <username>/postgres:latest

# Tag for node image
docker tag node:18 <username>/node:18


# Push server image
docker push <username>/server:latest

# Push client image
docker push <username>/client:latest

# Push postgres image
docker push <username>/postgres:latest

# Push node image
docker push <username>/node:18

docker pull <your_username>/<image_name>:<tag>
docker run -it --rm <your_username>/<your_image_name>:latest bash


