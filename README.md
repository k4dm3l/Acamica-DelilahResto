# REST API DELILAH RESTO

**A REST API for managing orders, products and users.**

With this API you can manage everything about a restaurant, from creating users, products and orders.

## Technologies and packages used for development

- Node.js
- @hapi/boom (to handle errors)
- @hapi/joi (data validation)
- @type/sequelize (type definitions for sequelize)
- bcryptjs (for hash password)
- compression (Node.js compression middleware)
- cors (for enable cross-origin resource sharing)
- dotenv (for managing environment variables)
- Express
- helmet (secure your Express apps by setting various HTTP headers)
- JSON Web Tokens (JWT)
- MySQL
- Sequelize (ORM for MySQL).
- swagger-jsdoc and swagger-ui-express (for document code with OpenAPI / Swagger)

# Getting Started

This README.md will guide you on how to install and use this API with simple steps.

NOTE: You can find the specification of the **OpenAPI** in swagger aplication [Open API Docs](https://app.swaggerhub.com/apis/maurolonmartin/DelilahAcamica/1.0.0).

## Installation and initialization

### 1. Clone the repository or download the zip:
The first step is to clone the repository locally

```bash
$ git clone https://github.com/maurolonmartin/Acamica-DelilahResto.git
```

### 2. To install the dependencies

To run this project locally you must have a node version pre-installed, we recommend using version v12.18.2

Use **npm** to install the dependencies.

```bash
$ npm install
```

#### Dependencies used

```json
"dependencies": {
    "@hapi/boom": "^9.1.0",
    "@hapi/joi": "^17.1.1",
    "@types/sequelize": "^4.28.9",
    "bcrypt": "^5.0.0",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^3.23.3",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.1.0",
    "sequelize": "^6.3.3"
  },
  "devDependencies": {
    "morgan": "^1.10.0",
    "nodemon": "^2.0.4"
  }
```

### 3. Configure the database

#### 3.1 Create database

Open a new query in mysql and execute:

```bash
create database acamica_delilah;
use acamica_delilah;
```
#### 3.1 Create tables

Execute the following codes separately to create the tables.

```bash
create table users(
id serial primary key,
username varchar(30) unique not null,
password varchar(500) not null,
rol varchar(6) not null,
fullname varchar(350) not null,
address varchar(350) not null,
phone varchar(20) not null,
email varchar(100) not null,
createdat timestamp default now(),
updatedat timestamp
);
```
```bash
create table products(
id serial primary key,
description varchar(450) not null,
price decimal(9,2) not null,
image varchar(450) not null,
createdat timestamp default now(),
updatedat timestamp
);
```
```bash
create table orders (
 id serial primary key,
 status varchar(15) not null,
 payment varchar(20) not null,
 address varchar(450) not null,
 total decimal(9,2) not null,
 userid bigint unsigned,
 createdat timestamp default now(),
 updatedat timestamp,
 foreign key (userid) references users (id)
);
```
```bash
create table orders_products(
id serial primary key,
productid bigint unsigned,
orderid bigint unsigned,
createdat timestamp default now(),
updatedat timestamp,
foreign key (productid) references products (id),
foreign key (orderid) references orders (id)
);
```

In the file **.env** file you will find configuration variables. Edit the host (**DB_HOST**), username (**DB_USERNAME**) and password (**DB_PASSWORD**) variables with your information.

### 4. Initialize the server

```bash
npm start
```
or 

```bash
npm run dev
```

This will install the app in port **3005**. You can edit the port in the file **.env**. The variable for editing is **PORT**.

If everything is ok you will get the next messages:

- Server running on http://localhost:3005
- Executing (default): SELECT 1+1 AS result
- DB Connection succesfully established


## Checking if it's running correctly

Open this [url](http://localhost:3005/api/v1/) in the browser. (If you changed the PORT variable in **.env** please change it here too).

You should get a message: **"{"statusCode":404,"error":"Not Found","message":"Not Found"}"**
Don't worry about this, it's about handling routes and errors.

### 5. Testing the API

Use **Postman** or similar apps to try out the different GET, POST, PUT and DELETE requests.

**You can [Run in Postman](https://www.getpostman.com/collections/4796482bdd37ba22bd28). (For adding the collection in your windows postman. This contains all endpoints and data body to test/run each endpoint). This will save you work for testing. So go ahead!**


## METHODS

**Important note:** Middlewares check user and admin with a bearer token. To have access to resources with admin privileges, you need to be logged in as a registered admin first.

**Other important note:** Please remember to use JSON for all "body: raw" requests.

## ENDPOINTS

(If you changed the PORT variable in env.variables.json please change it here too. In all endpoints).

## For managing users

### POST - Register a user

http://localhost:3005/api/v1/user

Request body:

```js
    {
        "username":"username",
        "password":"password",
        "rol":"rol",
        "fullname":"fullname",
        "address":"address",
        "phone":"phone",
        "email":"email"
    }
```

**Other important note:** There are only two roles defined by ENUM and these are ADMIN and USER. These can be checked in the user.schema.js. 

You have to create an user with rol ADMIN to use this API.

### POST - Login of user

http://localhost:3005/api/v1/auth

```js
    {
        "username": "username",
        "password":"password"
    }
```

This endpoint responses a **Bearer token**. This token must be used in the **Headers** with **auth-token** key for others endpoints (products and orders) in **Postman**.

```js
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZHJpYW5hIiwicGFzc3dvcmQiOiIkMmIkMTAkVFpKU0ZUS2svSUFmWHhxSGlNMmlHLlRkNGZ4MXdYLnRMQURlMWwxYVdITGVEZHlidlA1dlciLCJyb2wiOiJBRE1JTiIsImZ1bGxuYW1lIjoiQWRyaWFuYSBWZWxleiIsImFkZHJlc3MiOiJMYSBkZSBzaWVtcnBlIiwicGhvbmUiOiI3ODk2NjU0MSIsImVtYWlsIjoiYWRyaWFuYUBhZHJpYW5hLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjAtMDctMjFUMDA6NTM6NTEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDctMjFUMDA6NTM6NTEuMDAwWiIsImlhdCI6MTU5NTU1NTc1MywiZXhwIjoxNTk1NTkxNzUzfQ._KNmKmAsvbL3F549SXwxnOe0h-iPhwnRMiA4n6QNx54"
    }
```

_**Important note:** Example how to send in the **Headers** the **auth-token** token in **Postman**._

```js
    {
        "KEY": "Authorization"
        "VAlue": " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZHJpYW5hIiwicGFzc3dvcmQiOiIkMmIkMTAkVFpKU0ZUS2svSUFmWHhxSGlNMmlHLlRkNGZ4MXdYLnRMQURlMWwxYVdITGVEZHlidlA1dlciLCJyb2wiOiJBRE1JTiIsImZ1bGxuYW1lIjoiQWRyaWFuYSBWZWxleiIsImFkZHJlc3MiOiJMYSBkZSBzaWVtcnBlIiwicGhvbmUiOiI3ODk2NjU0MSIsImVtYWlsIjoiYWRyaWFuYUBhZHJpYW5hLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjAtMDctMjFUMDA6NTM6NTEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDctMjFUMDA6NTM6NTEuMDAwWiIsImlhdCI6MTU5NTU1NTc1MywiZXhwIjoxNTk1NTkxNzUzfQ._KNmKmAsvbL3F549SXwxnOe0h-iPhwnRMiA4n6QNx54"
    }
```
_**Important note:** the word **Bearer ** is Mandatory, this api use Bearer auth.** Orders and products needs loggin as ADMIN in order to edit, delete_

## For managing products

### POST - Products

- _You have to be logged as **ADMIN** to use this endpoint_.

http://localhost:3005/api/v1/product


```js
    {
        "description":"Pizza Napolitana",
        "price":18000,
        "image":"https://t1.rg.ltmcdn.com/es/images/5/2/6/img_pizza_napolitana_32625_orig.jpg"
    }
```

### GET - Products

http://localhost:3005/api/v1/product

### GET - Products by Id

http://localhost:3005/api/v1/product/:id

```js
    {
    "message": "Success",
    "data": {
        "id": 4,
        "description": "Pizza Napolitana",
        "price": "18000.00",
        "image": "https://t1.rg.ltmcdn.com/es/images/5/2/6/img_pizza_napolitana_32625_orig.jpg",
        "createdAt": "2020-07-22T03:02:45.000Z",
        "updatedAt": "2020-07-22T03:02:45.000Z"
    }
}
```

### PUT - Products

http://localhost:3005/api/v1/product/:id

- _You have to be logged as **ADMIN** to use this endpoint_.

```js
    {
    "description":"Pizza Casera",
    "price":15000,
    "image":"https://d1uz88p17r663j.cloudfront.net/original/8689e8d974203563ddcc9bbff91323c2_MG_CHORIZOBURGER_Main-880x660.png"
}
```

### DELETE - Products

http://localhost:3005/api/v1/product/:id

- _You have to be logged as **ADMIN** to use this endpoint_.

## For managing orders

## POST - All orders

http://localhost:3005/api/v1/orders

- _You have to be logged as **ADMIN** to see all the ordes, if you are logged as **USER** you only can see orders createdfor that specific user_.

```js
    {
        "message": "Success",
        "data": [
            {
                "products": [
                    {
                        "price": 15000,
                        "description": "Hamburgesa Casera"
                    },
                    {
                        "price": 20000,
                        "description": "Pizza Hawaiana"
                    },
                    {
                        "price": 20000,
                        "description": "Pizza Hawaiana"
                    }
                ],
                "status": "PREPARANDO",
                "id": 2,
                "payment": "EFECTIVO",
                "fullname": "Adriana Velez",
                "address": "CALLE SIEMPRE VIVA"
            },
            {
                "products": [
                    {
                        "price": 15000,
                        "description": "Hamburgesa Casera"
                    },
                    {
                        "price": 18000,
                        "description": "Pizza Napolitana"
                    },
                    {
                        "price": 18000,
                        "description": "Pizza Napolitana"
                    }
                ],
                "status": "NUEVO",
                "id": 3,
                "payment": "TARJETA DE CREDITO",
                "fullname": "Adriana Velez",
                "address": "apartamento palmeras"
            }
        ]
    }
```


### GET order

http://localhost:3005/api/v1/orders


### GET - Order by id order

http://localhost:3005/api/v1/orders/:id

- _You need to send the token in the **Headers** with **auth-token** key_.

Admin can see whatever specific order and normal client only can see an order if its own.

### PUT - Orders (change status)

http://localhost:3005/api/v1/order?id=2&&status=PREPARANDO

This endpoint only update the order status.

- _You have to be logged as **ADMIN** to use this endpoint_.
- _You have to send by query params the order Id and new order status_.


### DELETE - Orders

http://localhost:3005/api/v1/orders/:id

- _You have to be logged as **ADMIN** to use this endpoint_.
