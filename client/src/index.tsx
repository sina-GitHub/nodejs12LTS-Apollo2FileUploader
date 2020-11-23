import React from 'react';
import Apollo from './Apollo';
import {render} from 'react-dom';
import * as registerServiceWorker from './serviceWorker';

render(<Apollo />, document.getElementById('root'));

registerServiceWorker.register(null);
