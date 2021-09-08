import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;