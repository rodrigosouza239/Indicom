import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { navigationRef } from "../App";
import * as Linking from 'expo-linking'

const Routes = () => {
  const { logado, hasUpdatePassword } = useContext(AuthContext);
  React.useEffect(() => {
    console.log(hasUpdatePassword)
    Linking.getInitialURL().then(!logado && !hasUpdatePassword && urlRedirect)
    const urlRedirect = (url) => {
      console.log(Linking.parse(url))
      if(!url) return;
      let { queryParams } = Linking.parse(url);
      if(!queryParams.queryparams) return;
      const { nameroute } = JSON.parse(queryParams.queryparams);
      if(nameroute)
        navigationRef.current.navigate(nameroute, JSON.parse(queryParams.queryparams))
    }
    
    Linking.addEventListener('url', event => {
      !logado && !hasUpdatePassword && urlRedirect(event.url);
    });
  }, [hasUpdatePassword]);
  return !logado ? <PublicRoutes /> : <PrivateRoutes />;
};

export default Routes;
