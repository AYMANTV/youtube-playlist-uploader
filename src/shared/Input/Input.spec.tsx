import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';

describe('Input', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Input onChange={() => {}} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
})
