import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter'
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;