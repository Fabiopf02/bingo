import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../routes';

export type User = {
  _id: string;
  email: string;
  name: string;
};

export interface ICreateUserResponse {
  _id: string;
  token: string;
}

export type ICardList = {
  _id: string;
  ownerId: string;
  title: string;
  text: string;
  qrCode: boolean;
  numberOfCards: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface ISession {
  user: User;
  token: string;
}

export type NavigationProps<T extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, T>;
