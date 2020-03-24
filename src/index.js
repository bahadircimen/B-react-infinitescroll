import React from 'react';
import ReactDOM from 'react-dom';

import MainContainer from './containers/MainContainer';

let CSRF_TOKEN = "";
const meta = document.querySelector("meta[name='csrf-token']");
if(meta) CSRF_TOKEN = meta.getAttribute("content");


ReactDOM.render(
	<MainContainer csrf_token={CSRF_TOKEN}/>,
	document.querySelector('#root')
);
