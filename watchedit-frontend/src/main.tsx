import ReactDOM from 'react-dom/client';
import App from './App';
import './css/global.css';
import './css/markdown-editor-styles.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollTopOnPageChange from './tools/TopOnPageChange';

document.body.classList.add('bg-background');
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTopOnPageChange />
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>,
);
