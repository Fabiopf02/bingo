import React, {useRef, useState} from 'react';
import {
  Container,
  Title,
  OtherButton,
  Text,
  FormContainer,
} from '../../styles/Form';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import * as Yup from 'yup';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAuth} from '../../contexts/auth';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {signUp} = useAuth();

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      console.log(data);
      const schema = Yup.object().shape({
        name: Yup.string().required('Este campo é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Este campo é obrigatório'),
        password: Yup.string().required('Este campo é obrigatório'),
      });

      await schema.validate(data, {abortEarly: false});
      await signUp(data);
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
        <Form ref={formRef} onSubmit={handleRegister}>
          <Input name="name" text="Nome" placeholder="Digite seu nome" />
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
            text={loading ? 'Registrando...' : 'Registrar'}
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
        <OtherButton to="/Login">
          <Text>Já possui uma conta? Acesse aqui</Text>
        </OtherButton>
      </FormContainer>
    </Container>
  );
};

export default Login;
