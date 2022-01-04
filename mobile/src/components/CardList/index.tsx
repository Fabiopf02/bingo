import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Card from '../CardItem';
import {api} from '../../services/api';
import {ICardList} from '../../types/types';
import {Container} from './styles';

const CardList: React.FC = () => {
  const [cardList, setCardList] = useState<ICardList[]>([]);

  useEffect(() => {
    async function getCards() {
      try {
        const response = await api.get<ICardList[]>('/cardlist');
        setCardList(response.data);
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    }
    getCards();
  }, []);

  const renderItem = ({item}: {item: ICardList}) => <Card data={item} />;

  return (
    <Container
      data={cardList}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
  );
};

export default CardList;
