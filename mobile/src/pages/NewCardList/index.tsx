import React, {useState, useRef} from 'react';
import {Container, Center, Row, Text, BigText} from './styles';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import CheckBox from '@react-native-community/checkbox';
import * as Yup from 'yup';
import {api} from '../../services/api';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const numbers = [
  [1, 2, 3, 4, 5],
  [15, 16, 17, 18, 19],
  [30, 31, 32, 33, 34],
  [45, 46, 47, 48, 49],
  [60, 61, 62, 63, 64],
];

interface IForm {
  title: string;
  text: string;
  qrCode: boolean;
  numberOfCards: number;
}

const NewCardList: React.FC = () => {
  const [title, setTitle] = useState('');
  const [qrCode, setQrCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  async function handleSubmit(data: IForm) {
    data = {...data, title};
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        title: Yup.string().required('Este campo é obrigatório'),
        text: Yup.string().optional(),
        numberOfCards: Yup.string().required('Este campo é obrigatório'),
      });
      data = {...data, numberOfCards: Math.floor(data.numberOfCards), qrCode};
      await schema.validate(data, {abortEarly: false});

      await api.post('/cardlist', data);

      setLoading(false);

      Alert.alert('Sucesso!', 'Os dados foram salvos.');

      return navigation.navigate('Home');
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach(error => (errors[error.path!] = error.message));
        formRef.current?.setErrors(errors);
      }
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados');
    }
  }
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          text="Título"
          name="title"
          placeholder="Título que será exibido"
          onChangeText={setTitle}
        />
        <Input text="Descrição" name="text" placeholder="Opcional" />
        <Input
          text="Número de Cartelas"
          keyboardType="number-pad"
          name="numberOfCards"
          placeholder="Ex.: 20"
        />
        <Row>
          <CheckBox
            value={qrCode}
            onValueChange={newValue => setQrCode(newValue)}
          />
          <Text>Usar QRCode</Text>
        </Row>
        <Button
          text={loading ? 'Salvando...' : 'Criar'}
          disabled={loading}
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
      <BigText>Modelo das cartelas</BigText>
      <Center>
        <Card
          numbers={numbers}
          title={title}
          qrcode={qrCode ? 'qrcode_example' : undefined}
        />
      </Center>
    </Container>
  );
};

export default NewCardList;
