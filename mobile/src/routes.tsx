import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeContext} from 'styled-components';
import {ICardList, IViewCardsParams} from './types/types';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CardDetails from './pages/CardDetails';
import NewCardList from './pages/NewCardList';
import ViewCards from './pages/ViewCards';

export type StackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  CardDetails: ICardList;
  NewCardList: undefined;
  ViewCards: IViewCardsParams;
};

const Stack = createNativeStackNavigator<StackParamList>();

const Routes: React.FC = () => {
  const {colors} = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        animation: 'slide_from_left',
        headerStyle: {backgroundColor: colors.primary},
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 28, color: '#ffffff'},
        headerTintColor: '#ffffff',
      }}>
      <Stack.Screen
        name="Login"
        options={{title: 'Acesso'}}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{title: 'Cadastro'}}
        component={Register}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CardDetails"
        options={{title: 'Detalhes da lista'}}
        component={CardDetails}
      />
      <Stack.Screen
        name="NewCardList"
        options={{title: 'Novo'}}
        component={NewCardList}
      />
      <Stack.Screen
        name="ViewCards"
        options={{title: 'Cartelas'}}
        component={ViewCards}
      />
    </Stack.Navigator>
  );
};

export default Routes;
