# DOCKER SETUP STEPS

## **Docker Build**
```sh
docker build . -t myaccount/node-user-service
```

## **List your images**
```sh
docker images
```

## **Run image**
```sh
docker run -p 49160:3000 -d myaccount/node-user-service
```

## **Get container ID**
```sh
docker ps
```

## **Print app output**
```sh
docker logs <container id>
```

## **Example**
```sh
Running on http://localhost:8080
```

## **Enter the container**
```sh
docker exec -it <container id> /bin/bash
```

## **Test**
```sh
docker ps
```

curl -i localhost:49160

## **Run in Docker** (*use -d flag to run in background*)
```sh
docker-compose up
```

## **Tear down**
```sh
docker-compose down
```

## **To be able to edit files, add volume to compose file**
```sh
volumes: ['./:/usr/src/app']
```

## **To re-build**
```sh
docker-compose build
```

---

# **SAMPLE REQUESTS**

- ## _Get User (by Mobile)_
`curl --location --request GET 'http://localhost:3000/api/v1/user?mobile=7597706693'`

- ## _Get User by (Unique ID)_
`curl --location --request GET 'http://localhost:3000/api/v1/user/60c72ac50285436a2137629a'`

- ## _Create New User_
`curl --location --request POST 'http://localhost:4002/api/v1/user' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "Kapil",
	"mobile": "9413014600",
	"email": "test@test.com"
}'`

- ## _Update existing user (by ID)_
`curl --location --request PUT 'http://localhost:3000/api/v1/user/60c72ac50285436a2137629a' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "test@gmail.com"
}'`

- ## _Update existing user (by Mobile)_
`curl --location --request PUT 'http://localhost:3000/api/v1/user?mobile=7597706693' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "roopal@gmail.com"
}'`

- ## _Get User Addresses by (Unique User ID)_
`curl --location --request GET 'http://localhost:3000/api/v1/address?userId=60c72ac50285436a2137629a'`

- ## _Add User Address_
`curl --location --request POST 'http://localhost:3000/api/v1/address' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": "60d03a5ca7d49546d6c4df9e",
	"type": "home",
	"isCurrent": 1,
	"addressLine1": "address..",
	"cityId": 269,
	"stateId": 1,
	"pincode": 302004,
}'`

- ## _Update User Address (by address ID)_
`curl --location --request PUT 'http://localhost:3000/api/v1/address/60c72ac50285436a2137629a' \
--header 'Content-Type: application/json' \
--data-raw '{
	"current": 0
}'`

- ## _Delete User Address (by address ID)_
`curl --location --request DELETE 'http://localhost:3000/api/v1/address/60c72ac50285436a2137629a'`


- ## _Add Token of a User_
`curl --location --request POST '127.0.0.1:3000/api/v1/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "test1",
    "otpVerified": "true",
    "userId": "60c72ac50285436a2137629a"
}'`

- ## _Get Token and User data (by Token string)_
`curl --location --request GET '127.0.0.1:4002/api/v1/token/?token=test1'`

- ## _Delete Token (by Token string)_
`curl --location --request DELETE '127.0.0.1:4002/api/v1/token/?token=test1'`


- ## _Add Document of a User_
`curl --location --request POST 'http://localhost:4002/api/v1/document' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "60ee9fc4e17af0c2c6121d64",
    "docNo": "A1",
	"type":"pan",
    "path": "https://img.wallpapersafari.com/desktop/1680/1050/34/81/EJXA96.jpg",
	"nameOnCard":"testUser",
    "isVerified": "false"
}'`


- ## _Get User Document by (Unique User ID)_
`curl --location --request GET 'http://localhost:4002/api/v1/document?userId=60ee9fc4e17af0c2c6121d64'`


- ## _Update User Document (by Document ID)_
`curl --location --request PUT 'http://localhost:4002/api/v1/document/610149bf6d68f9a3560d7a94' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isVerified": "true"
}'`


- ## _Delete User Document (by Document ID)_
`curl --location --request DELETE 'http://localhost:4002/api/v1/document/610149bf6d68f9a3560d7a94'`

## Verify Facebook Token 
`https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken`

## Verify Google Token
`https://developers.google.com/identity/sign-in/web/backend-auth`