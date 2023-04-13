import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/GlobalStyles.css';
import { store } from './app/store';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Always wrap the app component in Provider and also specify the name of store and import it*/}
    <Provider store= {store}>
      <App />
    </Provider>  
  </React.StrictMode>
);


