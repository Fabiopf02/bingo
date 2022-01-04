import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 6,
  },
})`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Center = styled.View`
  width: 100%;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
`;
export const BigText = styled(Text)`
  font-size: 24px;
  margin: 12px 0;
`;

export const Row = styled.View`
  flex-direction: row;
`;
