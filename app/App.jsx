import React from 'react';
import { YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import { ApplicationProvider } from './contexts/application';

import Routes from './routes/Routes';

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified.']);

export const navigationRef = React.createRef()

const App = () => {
  return (
    <NavigationContainer
    ref={navigationRef}>
      <AuthProvider>
        <ApplicationProvider>
          <Routes />
        </ApplicationProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
