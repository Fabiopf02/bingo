import React, {useContext} from 'react';
import {NavigationProps} from '../../types/types';
import {ThemeContext} from 'styled-components';
import {formatDate} from '../../utils/format';
import {Container, Title, Text, Rect, Row} from './styles';

import Button from '../../components/Button';

const CardDetails: React.FC<NavigationProps<'CardDetails'>> = ({route}) => {
  const {colors} = useContext(ThemeContext);
  const cardList = route.params;

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

      <Button text="Gerar Cartelas" bg={colors.primary} />
      <Button text="Baixar Cartelas" bg={colors.secondary} disabled={true} />
    </Container>
  );
};

export default CardDetails;
