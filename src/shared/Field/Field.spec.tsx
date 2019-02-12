import React from 'react';
import ReactDOM from 'react-dom';
import Field from './Field';

describe('Field', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Field label="test" />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
})
