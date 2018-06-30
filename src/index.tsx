import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";

import App from './App';
import './index.css';
import {store} from "./Store-Redux/store";


ReactDOM.render(
<Provider store={store as any}>
          <App />
        </Provider>
    ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
