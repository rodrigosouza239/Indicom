import React from 'react';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Provider } from 'react-redux';
import { Store } from './app/redux/store';

import App from './app/App';

const ReduxApp = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

registerRootComponent(ReduxApp);
