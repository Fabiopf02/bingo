import React, {createRef, useEffect, useCallback} from 'react';
import {TextInput as NativeTextInput, TextInputProps} from 'react-native';
import {Container, Text, TextInput, ErrorText} from './styles';

import {useField} from '@unform/core';

interface IProps extends TextInputProps {
  text: string;
  name: string;
}

interface InputReference extends NativeTextInput {
  value: string;
}

const Input: React.FC<IProps> = ({text, name, ...rest}) => {
  const inputRef = createRef<InputReference>();
  const {fieldName, registerField, defaultValue, error, clearError} =
    useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue(_ref) {
        if (inputRef.current) {
          return inputRef.current.value;
        }
        return '';
      },
      setValue(ref, value: string) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: value});
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
    });
  }, [registerField, fieldName, inputRef]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
    [inputRef],
  );

  return (
    <Container>
      {text && <Text>{text}</Text>}
      <TextInput
        ref={inputRef}
        onFocus={clearError}
        defaultValue={defaultValue}
        onChangeText={handleChangeText}
        {...rest}
      />
      <ErrorText>{error}</ErrorText>
    </Container>
  );
};

export default Input;
