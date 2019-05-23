import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

// функциональный компонент без состояние может получить ссылку на DOM 
// элемент, но не может обратиться к методам жизненного цикла поэтому
// в таком компоненте невозможно, например, установить фокус на элементе
// export const Search = ({value, onChange, onSubmit, children}) => {
//     let input = null;
//     return (
//         <form className="someClass" onSubmit={onSubmit}>
//             <button type='submit'>{children}</button>
//             <input 
//                 type="text" 
//                 onChange={onChange} 
//                 value={value}
//                 ref={node => input = node} />
//         </form>
//     )
// };

export class Search extends Component {

    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const {
            value,
            onChange,
            onSubmit,
            children 
        } = this.props;

        return (
            <form className='someClass' onSubmit={onSubmit}>
                <input 
                    type='text' 
                    onChange={onChange} 
                    value={value}
                    ref={node => this.input = node} />
                <button type='submit'>{children}</button>
            </form>
        )
    }
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    value: PropTypes.string
}

Search.defaultPropes = {
    className: ''
}