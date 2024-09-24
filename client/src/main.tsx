import './index.css';

import { createRoot } from 'react-dom/client';

import App from './App';
import { AppContextProvider } from './contexts';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
