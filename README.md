# NestJs Sales API

## Installation

1. Install packages
    ```bash
    $ npm install
    ```
2. Fill in your db connection info and a JWT secret key in `.env.example` file and rename it to `.env`
3. You can check the docs at [http://localhost:3000/api](http://localhost:3000/api)
4. By default, the created user has a `user` role, change your role to `admin` to have access to all routes.
5. Most routes are protected, you need to register first, login which will return a Bearer token that you have to send to all protected routes through the Authorization header. 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

