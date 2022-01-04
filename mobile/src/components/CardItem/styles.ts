import styled from 'styled-components/native';

export const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  padding: 10px;
  background: ${props => props.theme.colors.primary}06;
  border-radius: 4px;
  margin: 4px 0;
`;

export const CardTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 6px;
`;

export const Item = styled.View`
  padding: 8px;
  background: ${props => props.theme.colors.primary}10;
  border-radius: 6px;
  min-width: 60px;
  align-items: center;
`;

export const ItemTitle = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`;

interface IPropsItemText {
  fsize?: number;
}

export const ItemText = styled(ItemTitle)<IPropsItemText>`
  font-weight: normal;
  margin-top: 2px;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.fsize ?? 18}px;
`;
