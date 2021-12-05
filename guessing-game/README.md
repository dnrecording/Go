# Full Stack Guessing Game

**Internship Home Assignment @Agoda**.

## Tasks

**Frontend**

- Login if not authenticated ✔️

- Guess the number ✔️

- Do API call to backend to guess the number ✔️

**Backend**

- API endpoints

	- `/login`

	- Very simple yes / no with password combination ✔️

	- Return "token" ✔️

	- `/guess`

	- Access to this endpoint needed to be authenticated via token returned from login ✔️

	- Guess the hidden number - if correct, return HTTP 201 and regenerate the number ✔️

- RESTful ✔️

- Your response should be in form of JSON format ✔️

- Responses should have CRUD functionality ✔️
> **(DELETE not included)**

**Bonus (for challenge)**
**Frontend**

- Use React.js context for authentication ✔️

**Backend**

- Use of middleware for authentication 🔥 
> **(Need more time to understand)**

- If we wanted to hide the guess data by not using GET, can we use other method to do so ✔️

> **(PATCH guess data to update guess data in database and compare guess data with the secret number at backend if correct, return HTTP 201 and regenerate the secret number.)**

> I hope this method is right. 😂

## Prerequisite
- Go 1.17
- MySQL Server 8.0

## Usage
This web application is Guessing number game with Authentication.
To run this web application need to:
- Clone this project.
- Run `go run main.go` in terminal at **/auth-sql** folder.

- Run `npm start` in terminal at **/auth-react** folder.

- Open web at [http://localhost:3000](http://localhost:3000).

- Sign up with username and password.

- Login and Have fun with simple Guessing Game. 😊

## URL
#### Frontend
- React.js
> serve at :  [http://localhost:3000](http://localhost:3000)
> - [http://localhost:3000/login](http://localhost:3000/login)
> - [http://localhost:3000/signup](http://localhost:3000/signup)
> - [http://localhost:3000/guessgame](http://localhost:3000/guessgame)
#### Backend
- Go
> serve at :  [http://localhost:8000](http://localhost:8000)
> - POST - [http://localhost:8000/api/login](http://localhost:8000/api/login)
> - POST - [http://localhost:8000/api/signup](http://localhost:8000/api/signup)
> - POST - [http://localhost:8000/api/logout](http://localhost:8000/api/logout)
> - PATCH - [http://localhost:8000/api/guess](http://localhost:8000/api/guess)
> - GET - [http://localhost:8000/api/user](http://localhost:8000/api/user)
- MySQL Local Database Server
> serve at :  [http://localhost:3306](http://localhost:3306)
