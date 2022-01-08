import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Card from '../CardItem';
import {api} from '../../services/api';
import {ICardList} from '../../types/types';
import {Container} from './styles';

const CardList: React.FC = () => {
  const [cardList, setCardList] = useState<ICardList[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadCardList() {
    try {
      setLoading(true);
      const response = await api.get<ICardList[]>('/cardlist');
      setCardList(response.data);
    } catch (err: any) {
      Alert.alert('Erro', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCardList();
  }, []);

  const renderItem = ({item}: {item: ICardList}) => <Card data={item} />;

  return (
    <Container
      data={cardList}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      refreshing={loading}
      onRefresh={loadCardList}
    />
  );
};

export default CardList;
