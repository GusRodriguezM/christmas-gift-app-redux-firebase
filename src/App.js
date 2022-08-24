import { AppRouter } from './router/AppRouter';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './components/styles/theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRouter />
      </div>
    </ThemeProvider>
  );
}

export default App;