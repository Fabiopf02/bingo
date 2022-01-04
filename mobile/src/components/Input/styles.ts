import styled from 'styled-components/native';

export const Container = styled.View`
  width: 96%;
  margin: 6px 2%;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

export const ErrorText = styled(Text)`
  color: ${props => props.theme.colors.danger};
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#888888',
})`
  color: ${props => props.theme.colors.text};
  padding: 6px;
  border-radius: 4px;
  font-size: 16px;
  background: #f5f5f5;
  height: 50px;
`;
