import React from 'react';
import {Container, Text} from './styles';

interface IProps {
  text: string;
  bg?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const Button: React.FC<IProps> = ({text, onPress, bg, ...rest}) => {
  return (
    <Container onPress={onPress} bg={bg} {...rest}>
      <Text>{text}</Text>
    </Container>
  );
};

export default Button;
