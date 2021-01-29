import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import Config from './config';
import './index.scss';
import App from './App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: Config.cognito.REGION,
    userPoolId: Config.cognito.USER_POOL_ID,
    identityPoolId: Config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: Config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'resource',
        endpoint: Config.apiGateway.URL,
        region: Config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*@ts-ignore*/}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
