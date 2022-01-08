import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import Button from '../Button';
import {ThemeContext} from 'styled-components';
import {api} from '../../services/api';

interface IProps {
  disabled: boolean;
  listId: string;
  setChange: React.Dispatch<React.SetStateAction<string>>;
}

const GenerateCardsButton: React.FC<IProps> = ({
  disabled,
  listId,
  setChange,
}) => {
  const [generating, setGenerating] = useState(false);
  const {colors} = useContext(ThemeContext);

  async function generateCards() {
    try {
      if (disabled || generating) {
        return;
      }
      setGenerating(true);
      await api.post('/cards', null, {
        headers: {
          listId,
        },
      });
      Alert.alert(
        'Sucesso!',
        'Agora você pode visualizar ou baixar as cartelas',
      );
      setChange('generate');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro', 'Ocorreu um erro ao gerar as cartelas!');
    } finally {
      setGenerating(false);
    }
  }
  return (
    <Button
      text={generating ? 'Gerando...' : 'Gerar Cartelas'}
      bg={colors.primary}
      disabled={generating || disabled}
      onPress={generateCards}
    />
  );
};

export default GenerateCardsButton;
