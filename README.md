## Connect to MySQL Database

  Using the node_test_employees.sql file to import database in your MySQL server. 
 
  ```
  Create .env file in root folder directory
  ```
  HOST=yourhosturl  
  DB_USER=yourusername  
  DB_PASS=yourpassword  
  DB_DATABASE=node_test_employees  
  PORT=4000

  ```

## To run the project execute following commands in sequence

    1. yarn install
    2. cd client
    3. yarn install
    4. cd ..
    5. yarn run dev

    OR
    
    1. npm install
    2. cd client
    3. npm install
    4. cd ..
    ## Run react app
    5. cd client && npm start
    ## Run express app
    5. cd .. && npm run server
    


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
