
**Post API**
*curl -X POST http://localhost:3000/add*

**Delete API**
*curl -X DELETE http://localhost:3000/users/:id*

**Put API**
*curl -X PUT -d '{"name":"???",  "actualName": "???"}' -H "Content-Type: application/json" http://localhost:3000/users/:id*

**login.js**
*curl -X POST -H "Content-Type: application/json" -d '{"username":"your_username","password":"your_password"}' http://localhost:3000/login

*

