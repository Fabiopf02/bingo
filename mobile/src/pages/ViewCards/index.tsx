import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {NavigationProps, ICard} from '../../types/types';
import Card from '../../components/Card';
import {api} from '../../services/api';
import {Container} from './styles';

const ViewCards: React.FC<NavigationProps<'ViewCards'>> = ({route}) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const {listId, title, qrcode} = route.params;

  useEffect(() => {
    async function loadCards() {
      try {
        const response = await api.get<ICard[]>('/cards', {
          headers: {
            listId,
          },
        });

        setCards(response.data);
      } catch (err) {
        console.log(err);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar as cartelas');
      }
    }
    loadCards();
  }, [listId]);

  const renderItem = ({item}: {item: ICard}) => (
    <Card
      numbers={item.numbers}
      title={title}
      qrcode={qrcode ? item._id : undefined}
      code={item.code}
    />
  );

  return (
    <Container
      data={cards}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
  );
};

export default ViewCards;
