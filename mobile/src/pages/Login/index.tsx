import React, {useRef, useState} from 'react';
import {
  Container,
  Title,
  OtherButton,
  Text,
  FormContainer,
} from '../../styles/Form';
import {useAuth} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Alert} from 'react-native';

const Login: React.FC = () => {
  const {signIn} = useAuth();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleLogin = async (data: {email: string; password: string}) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Este campo é obrigatório'),
        password: Yup.string().required('Este campo é obrigatório'),
      });

      await schema.validate(data, {abortEarly: false});
      await signIn(data);
      setLoading(false);
      navigation.navigate('Home');
    } catch (err: any) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach(error => (errors[error.path!] = error.message));
        formRef.current?.setErrors(errors);
      }

      const error = err.response.data.error;
      Alert.alert('Error', error);
    }
  };

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleLogin}>
          <Input
            name="email"
            text="E-mail"
            placeholder="Digite seu E-mail"
            keyboardType="email-address"
          />
          <Input
            name="password"
            text="Senha"
            placeholder="******"
            secureTextEntry
          />
          <Button
            text={loading ? 'Validando...' : 'Acessar'}
            onPress={() => formRef.current?.submitForm()}
            disabled={loading}
          />
          <OtherButton to="/Register">
            <Text>Ainda não possui uma conta?</Text>
          </OtherButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;
