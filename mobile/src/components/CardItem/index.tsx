import React from 'react';
import {
  CardContainer,
  CardTitle,
  Row,
  ItemTitle,
  Item,
  ItemText,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {ICardList} from '../../types/types';

interface IProps {
  data: ICardList;
}

const CardItem: React.FC<IProps> = ({data}) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    return navigation.navigate('CardDetails', data);
  };

  return (
    <CardContainer onPress={navigateToDetails}>
      <CardTitle>{data.title}</CardTitle>
      <Row>
        <Item>
          <ItemTitle>QRCode</ItemTitle>
          <ItemText>{data.qrCode ? 'Ativado' : 'Desativado'}</ItemText>
        </Item>
        <Item>
          <ItemTitle>Cartelas</ItemTitle>
          <ItemText fsize={24}>{data.numberOfCards}</ItemText>
        </Item>
      </Row>
    </CardContainer>
  );
};

export default CardItem;
