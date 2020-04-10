# Virtual-Disaster-Relief-Nodejs
A virtual disaster relief application developed in Nodejs using Express, MySql, Bootstrap.

# Getting started

Unzip the downloaded file.

### Installing dependencies:
Enter this command it will install all the dependencies at once:

```
npm install express express-session mysql pug-cli bcrypt util.promisify http-auth
```

Sometimes you get errors and access denied add sudo to the command

```
sudo npm install express express-session mysql pug-cli bcrypt util.promisify
```

### Start the application

```
npm start
```
or
```
node app
```
### Database

For this application the database  name is 'virtual_disaster_relief', it contains only one table 'users'

Go to core/connection.js enter your database username and password, you can use you own database name just make sure it's the same in the pool.js file so you can connect to database.


