[![CircleCI](https://dl.circleci.com/status-badge/img/gh/dushimeemma/z-platform/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/dushimeemma/z-platform/tree/main)

# Z PLATFORM | IREMBO CODING CHALLENGE

## Prerequisites

- nodejs
- yarn [optional]

## Setup Dotenv

- create .env file in project root directory
- copy keys in .env.example file, which is in the project root directory and assign values to those keys.
- you can add more environmenta variables to the .env file
- to use declared variables, require dotenv at the top of your file `import dotenv from 'dotenv'` and call its method config `dotenv.config()`
- access environment variable value by using `process.env.KEY_NAME` where `KEY_NAME` is the variable name.

Note: If you make changes that uses environmental variables make sure to add those variables with example values in the .env.example file.

## Setup and Installation

- clone the repo `https://github.com/dushimeemma/z-platform.git`

- install dependencies `yarn install`

- setup prisma connection `npx prisma db push`

- open prisma database in your browser `npx prisma studio`

- setup firebase storage `firebase init` and choose `firebase storage`

- run the application `yarn start`

## Endpoints

- SIGNUP : `POST request /api/auth/signup`
- LOGIN : `POST request /api/auth/login`
- FORGOT PASSWORD : `POST request /api/auth/forgot_password`
- RESET PASSWORD : `POST request /api/auth/reset_password`
- GET USER'S PROFILE : `GET request /api/user/profile`
- UPDATE PROFILE : `PUT request /api/user/update_profile`
- VERIFRY ACCOUNT : `PUT request /api/account/verify`
- APPROVE ACCOUNT : `PUT request /api/account/approve`
