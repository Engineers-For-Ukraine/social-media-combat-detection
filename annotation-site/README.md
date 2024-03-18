# Annotate4Ukraine

This folder contains the code for Annotate4Ukraine, a webapp for user-friendly data annotation. The app consumes text-samples for annotation from a PostgresQL database and annotations are written to that database. The specific name of the table and database can be updated in /app/config/db.config.js. The schema for the SQL table should be created with:


CREATE TABLE message_data_table_name (
    idx int,
    msg_txt Text,
    annotation int
);

The row at idx -1 is used to track progress; its annotation gives the index of the last row to have been annotated and its msg_txt should be 'loading...' which is used as a default value in the webpage.

This folder contains three sub-solders: app, build, public, and src. Outside of those folders are: this 'README.md', 'package-lock.json', 'package.json', and 'server.js'.

'package-lock.json', 'package.json' should not be updated directly and are handled by npm.

The entire web app can be run on as a Node.js server by calling 'node server.js' from the command line but this must either be run on a machine that is also running a correctly configured local PostgresQL database or '/app/config/db.config.js' must be updated appropriately.

## Contents

### app
The 'app' folder contains the back end for the app. This is composed of an Express.js layer as middleware with the PostgresQL database. This layer consumes data from Postgres in a way that is handleable by the front-end. It uses a standard file hierarchy and was created using [this tutorial](https://www.bezkoder.com/react-node-express-postgresql/)

### build
The 'build' folder is currently empty. This folder is filled by the result of running `npm run build` which creates a minified build of the React app. When a new build is created it the resulting files, (not the 'build' folder itself only its contents) should be used to replace the contents of 'app/views'

### public
The 'public' folder contains only the website icon ('icon.jpg'), 'index.html', and 'manifest.json', none of which should be changed.

### src
The 'src' folder contains the front-end React app. This was created using the tutorial mentioned in the 'app' section of this README.md. Major adjustments to the content as described in that tutorial are as follows: all mentions of 'tutorial' in files and filenames have been adjusted to 'message'; the 'components' subfolder has been changed dramatically for this use-case; the 'App.js' file has been changed to accomadate the distinct components.

#### Components
In 'src/components' are the React components. These are: 'guidelines.component.js' and 'message.component.js'. 4

The file 'guidelines.component.js' contains the data annotation guidelines formatted for html and must be updated anytime the data annotation guidelines are changed. 

The file 'message.component.js' contains the most important and complicated individual piece of this app. This component gets data samples fromt the Postgres database (via the Express.js back-end/middleware found in the 'app' folder), serves those samples to users then takes in annotations from the user and updates the Postgres database with those annotations (via the Express.js back-end/middleware found in the 'app' folder).

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
