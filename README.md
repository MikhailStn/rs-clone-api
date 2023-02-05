# rs-clone-api

### Registration for owner

``` URL: http://localhost:5000/auth/register/owner;
method: POST;
headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
},
body request: {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, require: true },
  pets: { type: Array }
} 
```
Возвращает ответ об успешной регистрации, id пользователя и его роль

### Registration for petsitter
``` URL: http://localhost:5000/auth/register/petsitter;
method: POST;
headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
},
body request: {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, require: true },
}
```
Возвращает ответ об успешной регистрации, id пользователя и его роль

### Login
```
URL: http://localhost:5000/auth/login;
METHOD: POST;
headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
},
body request: {
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}
```
Возвращает id пользователя и его роль, если авторизация успешна

### Get users
```
URL: http://localhost:5000/auth/users;
METHOD: GET;
headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}
```
Возвращает массив пользователей

### Get user by ID
```
URL: http://localhost:5000/auth/user;
METHOD: GET;
headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
},
body request: {
  _id: { type: String, required: true }
}
```
Вовращает объект с информацией о пользователе, если пользователь с таким id существует

### Get Role by ID
```
URL: http://localhost:5000/auth/user/role;
METHOD: GET;
headers: {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
},
body request: {
  _id: { type: String, required: true }
}
```
Возвращает роль пользователя по id, если пользователь с таким id существует
