import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from 'styled-components';
import theme from './components/styles/theme/theme';
import { MainContainer } from './components/styles/App.styled';
import GlobalStyles from './components/styles/Global';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainContainer>
        <AppRouter />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;