import React, {useContext, useEffect, useState} from 'react';
import {NavigationProps} from '../../types/types';
import {ThemeContext} from 'styled-components';
import {formatDate} from '../../utils/format';
import {Container, Title, Text, Rect, Row} from './styles';

import Button from '../../components/Button';
import {api} from '../../services/api';

interface IResponse {
  cardsExists: boolean;
}

const CardDetails: React.FC<NavigationProps<'CardDetails'>> = ({route}) => {
  const {colors} = useContext(ThemeContext);
  const [cardsExists, setCardsExists] = useState(true);
  const cardList = route.params;

  useEffect(() => {
    async function checkIfCardsExists() {
      try {
        const response = await api.get<IResponse>('/cards_exists', {
          headers: {
            listId: cardList._id,
          },
        });
        setCardsExists(response.data.cardsExists);
      } catch {}
    }
    checkIfCardsExists();
  }, [cardList]);

  return (
    <Container>
      <Title>{cardList.title}</Title>
      <Text>{cardList.text}</Text>
      <Row>
        <Rect>
          <Text>QRCode</Text>
          <Title>{cardList.qrCode ? 'Ativado' : 'Desativado'}</Title>
        </Rect>
        <Rect>
          <Text>Cartelas</Text>
          <Title>{cardList.numberOfCards}</Title>
        </Rect>
      </Row>
      <Text>Criado em: {formatDate(cardList.createdAt)}</Text>
      <Text>Atualizado em: {formatDate(cardList.createdAt)}</Text>

      <Button
        text="Gerar Cartelas"
        disabled={cardsExists}
        bg={colors.primary}
      />
      <Button
        text="Baixar Cartelas"
        bg={colors.secondary}
        disabled={!cardsExists}
      />
    </Container>
  );
};

export default CardDetails;
