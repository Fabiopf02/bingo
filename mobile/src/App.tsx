import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {AuthProvider} from './contexts/auth';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';
import light from './styles/theme/light';

const App: React.FC = () => {
  const [theme, setTheme] = useState(light);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
