import React from 'react';
import {Container, Button, ButtonText} from './styles';
import {useNavigation} from '@react-navigation/native';

import CardList from '../../components/CardList';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const navigateToNewCardList = () => {
    navigation.navigate('NewCardList');
  };

  return (
    <Container>
      <CardList />
      <Button onPress={navigateToNewCardList}>
        <ButtonText>Novo +</ButtonText>
      </Button>
    </Container>
  );
};

export default Home;
