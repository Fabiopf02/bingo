import React from 'react';
import {
  Container,
  Numbers,
  Header,
  Rect,
  Row,
  Col,
  RectText,
  Letter,
  QRCodeExample,
  Texts,
  Title,
  Cod,
  Body,
} from './styles';

const letters = ['B', 'I', 'N', 'G', 'O'];

interface IProps {
  title: string;
  numbers: number[][];
  qrcode?: string;
}

const Card: React.FC<IProps> = ({title, numbers, qrcode}) => {
  return (
    <Container>
      <Header>
        {qrcode ? <QRCodeExample value={qrcode} /> : null}
        <Texts qrcode={qrcode}>
          <Title>{title}</Title>
        </Texts>
      </Header>
      <Body>
        <Row>
          {letters.map(letter => (
            <Letter key={letter}>
              <RectText>{letter}</RectText>
            </Letter>
          ))}
        </Row>
        <Numbers>
          {numbers.map((item, index) => (
            <Col key={String(index)}>
              {item.map(number => (
                <Rect key={String(number)}>
                  <RectText>{number === 0 ? '' : number}</RectText>
                </Rect>
              ))}
            </Col>
          ))}
        </Numbers>
      </Body>
      <Cod>Cód.: 0001</Cod>
    </Container>
  );
};

export default Card;
