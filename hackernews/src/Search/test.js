import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Search } from './Search';

describe('Search', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Search</Search>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('there is a correct snapshot', () => {
        const component = renderer.create(<Search>Search</Search>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});