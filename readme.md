# Install & Run steps

1. Install docker and docker-compose tools from [docker](https://docs.docker.com/install/)
2. Install node js LTS [node.js](https://nodejs.org/dist/v10.15.1/node-v10.15.1.pkg)
3. Run `docker compose build` which will take from 5-20 minutes
4. Run `docker compose up` for verbose mode or `docker compose up -d` for silent mode to start applications
5. Once the api is up and running (default at 8080) open this [register admin](http://0.0.0.0:8080/auth/register/admin) url in browser to register ADMIN user
6. Admin credentials can be modified at /api/config.js default is `admin@domain.com` and `admin`
7. Open the Web application using [this link](http://0.0.0.0:3000)
8. Register an Account and Sign In to see option to harvest if registered as Farmer
9. On Right click over the table rows after logging in with any user credentials user will get a pop up of relevant action that can be done for clicked bean.
10. Clicked the bean ID from table row will redirect to bean tracking page where the trail of bean can be seen.
11. No login is required to view bean data or bean trail


# Admin 

Navigate to [this link](http://0.0.0.0:3000/admin) to use admin features
   1. Reset user password
   2. Approve user registration
   3. View all users