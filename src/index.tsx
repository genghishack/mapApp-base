import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
// import {debugContextDevtool} from 'react-context-devtool';

import config from './config';
import './index.scss';
import App from './App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'mapapp',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  container
);

/*// This causes console errors, so it's commented until needed for debugging
debugContextDevtool(container, {
  disable: process.env.REACT_APP_STAGE === 'prod'
});
//*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
