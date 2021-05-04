import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ApplicationContext from '../contexts/application';

import Home from '../pages/Home/Home';

import MeusInteresses from '../pages/MeusInteresses/MeusInteresses';
import MeuPerfil from '../pages/MeuPerfil/MeuPerfil';
import InformacoesGerais from '../pages/MeuPerfil/InformacoesGerais';
import MinhasAtividades from '../pages/MeuPerfil/MinhasAtividades';

import Amigos from '../pages/Amigos/Amigos';
import AmigosPerfil from '../pages/Amigos/Perfil';
import AmigosComentario from '../pages/Amigos/Comentario';

import OfertasRecebidas from '../pages/Ofertas/OfertasRecebidas';
import OfertasEnviadas from '../pages/Ofertas/OfertasEnviadas';
import AdicionarOferta from '../pages/Ofertas/AdicionarOferta';
import MeusCreditos from '../pages/Ofertas/MeusCreditos';
import OfertaDetalhes from '../pages/Ofertas/OfertaDetalhes';

const Stack = createStackNavigator();

const Routes = () => {
  const { createdUser } = useContext(ApplicationContext);
  return (
    <>
      <Stack.Navigator
        initialRouteName={createdUser ? 'MeusInteresses' : 'Home'}
      >
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MeusInteresses" options={{ headerShown: false }}>
          {(props) => <MeusInteresses {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MeuPerfil" options={{ headerShown: false }}>
          {(props) => <MeuPerfil {...props} />}
        </Stack.Screen>
        <Stack.Screen name="InformacoesGerais" options={{ headerShown: false }}>
          {(props) => <InformacoesGerais {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MinhasAtividades" options={{ headerShown: false }}>
          {(props) => <MinhasAtividades {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Amigos" options={{ headerShown: false }}>
          {(props) => <Amigos {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AmigosPerfil" options={{ headerShown: false }}>
          {(props) => <AmigosPerfil {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AmigosComentario" options={{ headerShown: false }}>
          {(props) => <AmigosComentario {...props} />}
        </Stack.Screen>
        <Stack.Screen name="OfertasRecebidas" options={{ headerShown: false }}>
          {(props) => <OfertasRecebidas {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AdicionarOferta" options={{ headerShown: false }}>
          {(props) => <AdicionarOferta {...props} />}
        </Stack.Screen>
        <Stack.Screen name="OfertasEnviadas" options={{ headerShown: false }}>
          {(props) => <OfertasEnviadas {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MeusCreditos" options={{ headerShown: false }}>
          {(props) => <MeusCreditos {...props} />}
        </Stack.Screen>
        <Stack.Screen name="OfertaDetalhes" options={{ headerShown: false }}>
          {(props) => <OfertaDetalhes {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default Routes;
