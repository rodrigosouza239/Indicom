import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

const ApplicationContext = createContext();

const defaultNewUser = {
  name: '',
  email: '',
  password: '',
  passwordCheck: '',
};

export const ApplicationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(defaultNewUser);
  const [redirectRoute, setRedirectRoute] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);
  const [countBadgesOfertas, setcountBadgesOfertas] = useState(0);
  const [ultimasofertasvisualizadas, setultimasofertasvisualizadas] = useState(null);
  AsyncStorage.getItem('@ultimasofertasvisualizadas_storage_Key')
  .then(payload => {
    setultimasofertasvisualizadas(parseInt(payload));
  })
  .catch(e => console.log(e))

  const appState = {
    redirectRoute,
    setRedirectRoute,
    newUser,
    setNewUser,
    loading,
    setLoading,
    createdUser,
    setCreatedUser,
    countBadgesOfertas, 
    setcountBadgesOfertas,
    ultimasofertasvisualizadas, 
    setultimasofertasvisualizadas
  };

  return (
    <>
      <ApplicationContext.Provider value={appState}>
        {children}
      </ApplicationContext.Provider>
      {loading && <Loading />}
    </>
  );
};

export default ApplicationContext;
