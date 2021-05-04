import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login/Login';
import LoginManual from '../pages/Login/LoginManual';
import Cadastrar from '../pages/Login/Cadastrar';
import RecuperarSenha from '../pages/Login/RecuperarSenha';
import CompleteCadastro from '../pages/Login/CompleteCadastro/CompleteCadastro';
import RamoAtividade from '../pages/Login/RamoAtividade/RamoAtividade';
import CadastroConcluido from '../pages/Login/CadastroConcluido/CadastroConcluido';
import NovaSenha from "../pages/Login/NovaSenha";

const Stack = createStackNavigator();

const PublicRoutes = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LoginManual" options={{ headerShown: false }}>
          {(props) => <LoginManual {...props} />}
        </Stack.Screen>
        <Stack.Screen name="novasenha" options={{ headerShown: false }}>
          {(props) => <NovaSenha {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RecuperarSenha" options={{ headerShown: false }}>
          {(props) => <RecuperarSenha {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Cadastrar" options={{ headerShown: false }}>
          {(props) => <Cadastrar {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CompleteCadastro" options={{ headerShown: false }}>
          {(props) => <CompleteCadastro {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RamoAtividade" options={{ headerShown: false }}>
          {(props) => <RamoAtividade {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CadastroConcluido" options={{ headerShown: false }}>
          {(props) => <CadastroConcluido {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default PublicRoutes;
