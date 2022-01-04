import styled from 'styled-components/native';

interface IProps {
  bg?: string;
  disabled?: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})<IProps>`
  width: 96%;
  height: 50px;
  margin: 12px 2%;
  padding: 8px;
  border-radius: 4px;
  background: ${props => props.bg ?? props.theme.colors.primary};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
`;
