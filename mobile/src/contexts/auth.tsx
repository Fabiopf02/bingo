import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '../services/api';
import {ISession, User, ICreateUserResponse} from '../types/types';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (data: Omit<SignUpData, 'name'>) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  const [user, setUser] = useState<User>({} as User);

  function setHeaderToken(token: string, userId: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api.defaults.headers.common.userId = userId;
  }

  useEffect(() => {
    async function check() {
      const session = await AsyncStorage.getItem('@session');
      if (!session) {
        return navigation.navigate('Login');
      }
      const sessionData: ISession = JSON.parse(session!);
      setIsAuthenticated(true);
      setUser(sessionData.user);
      setHeaderToken(sessionData.token, sessionData.user._id);
      navigation.navigate('Home');
    }
    check();
  }, [navigation]);

  const signIn = async (data: Omit<SignUpData, 'name'>) => {
    try {
      const response = await api.post<ISession>('/session', data);
      setUser(response.data.user);
      setHeaderToken(response.data.token, response.data.user._id);
      await AsyncStorage.setItem('@session', JSON.stringify(response.data));
      setIsAuthenticated(true);
    } catch (err) {
      setUser({} as User);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const response = await api.post<ICreateUserResponse>('/users', data);
      const _user = {
        name: data.name,
        email: data.email,
        _id: response.data._id,
      };
      setUser(_user);
      setHeaderToken(response.data.token, _user._id);
      await AsyncStorage.setItem(
        '@session',
        JSON.stringify({user: _user, token: response.data.token}),
      );
      setIsAuthenticated(true);
    } catch (err) {
      setUser({} as User);
      setIsAuthenticated(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{signIn, signUp, user, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
