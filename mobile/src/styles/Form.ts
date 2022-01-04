import styled from 'styled-components/native';
import {Link} from '@react-navigation/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 26px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  text-align: center;
  margin: 6% 0;
`;

export const OtherButton = styled(Link)`
  width: 96%;
  text-align: center;
  margin: 10px 2%;
  padding: 6px 0;
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  text-align: center;
`;

export const FormContainer = styled.View`
  margin-top: 14%;
`;
