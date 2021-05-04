import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../services/Api';

import Loading from '../components/Loading';
import Render from '../components/Render';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [render, setRender] = useState(false);
  const [hasUpdatePassword, sethasUpdatePassword] = useState(false);

  const logar = async (data) => {
    setLoading(true);
    const response = await Api.post('v1/login', { ...data });
    setLoading(false);
    if (response.status !== 200) return false;

    await AsyncStorage.setItem('@Indicom:token', response.data.token);
    Api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    setUser(response.data);
    return true;
  };

  const deslogar = () => {
    AsyncStorage.clear().then(() => setUser(false));
  };

  useEffect(() => {
    const checkUser = async () => {
      const storageToken = await AsyncStorage.getItem('@Indicom:token');
      if (storageToken) {
        Api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        const response = await Api.get('v1/auth');

        if (response.status !== 200) {
          AsyncStorage.clear().then(() => setUser(false));
        } else {
          setUser(response.data);
        }
      }
      setTimeout(() => setRender(true), 2500);
    };
    if (!user) checkUser();
  }, []);

  const appState = {
    logado: !!user,
    user,
    setUser,
    logar,
    setRender,
    setLoading,
    deslogar,
    hasUpdatePassword,
    sethasUpdatePassword
  };

  if (!render) return <Render />;

  return (
    <>
      <AuthContext.Provider value={appState}>{children}</AuthContext.Provider>
      {loading && <Loading />}
    </>
  );
};

export default AuthContext;
