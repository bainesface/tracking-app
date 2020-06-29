# Tracks Backend API

Backend RESTful API for Tracks, serving up endpoints relating to storing user data, logging in with JWT Web Tokens, storing and fetching tracks data.

The hosted version can be found [here](https://tracks-tracking-app.herokuapp.com/).

## Getting Started

### Prerequisites

- Node.js version 13.10.0 ... To install Node, go to: https://nodejs.org/en/download/

- MongoDB ... To install MongoDB, go to https://docs.mongodb.com/manual/installation/

### Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone a copy of the repository on your machine using the below command:

```
git clone https://github.com/bainesface/tracking-app.git
```

2. Nvigate into the repository

```
cd tracking-app
```

3. Install the required dependencies:

```
npm install
```

4. For testing, install the required dev dependencies:

```
npm i -D mocha chai supertest
```

### How to create your dbConfig (required)

To connect to your live mongo database, ensure you set up a config file with your credentials.
An example set-up of the file is below (don't forget to gitignore!):

```javascript
const mongoUsername = 'yourmongousername';
const mongoPassword = 'yourmongopassword';
const secretKey = 'yoursecretkey';
module.exports = { mongoUsername, mongoPassword, secretKey };
```

## Running the Tests

To run the tests written for the API during the TDD process (including tests for error handling), run the following command:

```
npm run test
```

### Available Endpoints

/signup

- POST adds a user to the database

/login

- POST checks login details match those to a user within the database, hashed, JWT

/user

- GET returns the logged in user

/tracks

- GET returns a list of tracks available to the logged in user
- POST adds a track to the database

### Running the server locally

You should now be ready to run your own server

```
npm start
```

## Built With

- [Node](https://nodejs.org/en/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
