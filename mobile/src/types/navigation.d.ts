import {StackParamList} from '../routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
