import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from './Bootstrap';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
serviceWorker.unregister();
