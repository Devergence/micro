import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'effector-react';
import { fork } from 'effector';
import App from './app/App';

const scope = fork();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={scope}>
      <App />
    </Provider>
  </React.StrictMode>
);
