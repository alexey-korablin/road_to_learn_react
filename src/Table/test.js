import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme'; // shallow don't render shildren of the component
// there are methods shallow(), mount() and render(). mount() and render() render component including its children. mount() give access to life-cycle methods
// what method to choice? 
//  just render top level component - use shallow()
//  deep rendering components without life-cycle methods - use render()
//  deep rendering components and get access to life-cycle methods - use mount()
import Adapter from 'enzyme-adapter-react-16';
import { Table } from './Table';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {

    const props = {
        list: [
            {title: '1', author: '1', num_comments: '1', points: '2', objectId: 'y'},
            {title: '2', author: '2', num_comments: '1', points: '2', objectId: 'x'}
        ]
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('there is a correct snapshot', () => {
        const component = renderer.create(<Table {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two times in list', () => {
        const element = shallow(
            <Table {...props} />
        );
        expect(element.find('.table-row').length).toBe(2);
    });
});