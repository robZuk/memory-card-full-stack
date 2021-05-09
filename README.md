# memory-card
Application for creating memory cards with the user login panel. Technologies used: React, Mongo DB, Express, styled components.

### [https://memory-cards-app.herokuapp.com](https://memory-cards-app.herokuapp.com/)

![SCREEN](https://user-images.githubusercontent.com/40764780/117391950-56b53680-aef1-11eb-9b0e-92affe5f7938.png)

### Technologies
- React
- MongoDB
- Express
- Bootstrap 4
- styled components

### Features

- Full featured shopping cart
- Car search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- PayPal / credit card integration

### Env Variables
#Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

###Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```
### Run
```
Run frontend (:3000) & backend (:5000)
npm run dev

Run backend only
npm run server
```

Seed Database
You can use the following commands to seed the database with some sample users and products as well as destroy all data

### Import data
```
npm run data:import
```

### Destroy data
```
npm run data:destroy
```
