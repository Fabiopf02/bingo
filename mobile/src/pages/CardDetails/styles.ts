import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 8,
    paddingTop: 14,
  },
})`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text};
`;

export const Text = styled(Title)`
  font-size: 18px;
  margin-bottom: 4px;
  font-weight: normal;
`;

export const Row = styled.View`
  width: 100%;
  margin: 16px 0;
  flex-direction: row;
  justify-content: space-around;
`;

export const Rect = styled.View`
  padding: 10px;
  width: 30%;
  border-radius: 6px;
  background: ${props => props.theme.colors.secondary}20;
  align-items: center;
`;
