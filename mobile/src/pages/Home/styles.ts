import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 6px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 6px 12px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 20px;
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`;
