1.  In the terminal run the command: npm install
    to install all the required dependencies.

2.  Now run the command: npm start
    to start the application.

3.  For backend testing, install the Postman application
    (postman collection of requests has been provided in the file miholearn.postman_collection.json)

4.  For new user signup,
    route: 127.0.0.1:80/signup Request type: POST
    And provide the following data in body>raw>json format in the postman
    {
    "email" : "testemail@gmail.com",
    "username" : "testemail",
    "password" : "123",
    "passwordConfirm" : "123"
    }

    A response similar as follows is received, thus confirming the correctness of the API
    {
    "status": "success",
    "data": {
    "user": {
    "\_id": "61018b88d8c2b112ec1f57ad",
    "email": "test@gmail.com",
    "username": "test",
    "password": "$2a$12$77B8kD0XNIrtN16XeLPSY.yloDejZM1fcut/X24a3nU4fypAyPR12",
    "\_\_v": 0
    }
    }
    }

5.  For user login,
    route: 127.0.0.1:80/login Request type: POST
    And provide the following data in body>raw>json format in the postman
    {
    "username": "testemail",
    "password": "123"
    }
    A response similar as follows is received, thus confirming the correctness of the API. The token is the json web token(JWT)
    {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE4Yjg4ZDhjMmIxMTJlYzFmNTdhZCIsImlhdCI6MTYyNzQ5MTQzOSwiZXhwIjoxNjI3NTA1ODM5fQ.6cny24lJEbI09l8GbLdCFHFAeA-oVTgC1sigIzC6YME"
    }

6.  For third API, i.e. receiving hello
    route: 127.0.0.1:80/hello Request type: GET
    A response similar as follows is received, thus confirming the correctness of the API.
    {
    "status": "success",
    "message": "Hello"
    }
