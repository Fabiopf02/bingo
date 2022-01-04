import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const {width} = Dimensions.get('window');

const CARD_SIZE = width * 0.96;
const RECT_SIZE = CARD_SIZE / 5;
const QR_SIZE = 90;

export const QRCodeExample = styled(QRCode).attrs({
  size: QR_SIZE,
})``;

export const Container = styled.View`
  width: ${CARD_SIZE}px;
`;

export const Header = styled.View`
  width: ${CARD_SIZE}px;
  flex-direction: row;
  margin-bottom: 30px;
`;

interface IProps {
  qrcode?: string;
}

export const Texts = styled.View<IProps>`
  width: ${props => (props.qrcode ? CARD_SIZE - QR_SIZE : CARD_SIZE)}px;
  padding-left: 4px;
`;

export const Title = styled.Text`
  font-size: 26px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  text-align: center;
`;

export const Body = styled.View`
  width: 100%;
  height: ${CARD_SIZE + RECT_SIZE - 45}px;
  border: 2px solid #000000;
`;
export const Numbers = styled.View`
  flex-direction: row;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
`;
export const Col = styled.View`
  flex-direction: column;
`;

export const Rect = styled.View`
  width: ${RECT_SIZE - 0.6}px;
  left: -0.7px;
  height: ${RECT_SIZE - 8}px;
  background: #eaeaea;
  border: 1.5px solid ${props => props.theme.colors.text};
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const Letter = styled(Rect)`
  border: none;
`;

export const RectText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const Cod = styled.Text`
  font-size: 22px;
  color: #555555;
  margin-top: 15px;
`;
