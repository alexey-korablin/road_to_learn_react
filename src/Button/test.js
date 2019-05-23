import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Dismiss</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('there is a correct snapshot', () => {
        const component = renderer.create(<Button>Dismiss</Button>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});