import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { Table } from './Table';
import { Search } from './Search';
import { Button } from './Button';
import { Loading } from './Loading';
import { 
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
}  from './constants';

import {firstName, lastName} from './files/file1';
import * as person from './files/file1';
import {firstName as login} from './files/file1';
import developer from './files/file1-1';
import developer0, { firstName0, lastName0 } from './files/file1-2';
import {firstName1, lastName1} from './files/file1-3';

console.log('the first name and last name are ', `${firstName} ${lastName}`);
console.log('person\'s first name is ', person.firstName);
console.log('login is ', login);
console.log('developer is ', developer);
console.log('developer0 is ', developer0, 'first and last name are', firstName0, ' ', lastName0);
console.log('the first name and last name are ', `${firstName1} ${lastName1}`);

// const list = [{
//     title: 'React',
//     url: 'https://reactjs.org',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }];

// const largeColumn = {
//   width: '40%'
// };
// const midColumn = {
//   width: '30%'
// };
// const smalColumn = {
//   width: '10%'
// };

// const DEFAULT_QUERY = 'redux';
// const DEFAULT_HPP = 100;
// const PATH_BASE = 'https://hn.algolia.com/api/v1';
// // const PATH_BASE = 'https://hn.not-existing-address.com/api/v1';
// const PATH_SEARCH = '/search';
// const PARAM_SEARCH = 'query=';
// const PARAM_PAGE = 'page=';
// const PARAM_HPP = 'hitsPerPage=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`

console.log(url);

// const Button = ({onClick, className, children}) => <button
//     onClick={onClick}
//     className={className}
//     type="button">
//     {children}
//   </button>;

// const Search = ({value, onChange, onSubmit, children}) => <form className="someClass" onSubmit={onSubmit}>
//     <button type='submit'>{children}</button>
//     <input type="text" onChange={onChange} value={value} />
//   </form>;

// const Table = ({list, onDismiss}) => <section className='table'>
//     {list.map(item => <div key={item.objectID} className='table-row'>
//         <span style={largeColumn}>
//           <a href={item.url}>{item.title} </a>
//         </span>
//         <span style={midColumn}>{item.author} </span>
//         <span style={smalColumn}>{item.num_comments} </span>
//         <span style={smalColumn}>{item.points} </span>
//         <span style={smalColumn}>
//           <Button onClick={() => onDismiss(item.objectID)} className='button-inline'>
//             Dismiss
//           </Button>
//         </span>
//       </div>)}
//   </section>;

// class Button extends Component {
//   render() {
//     const {
//       onClick,
//       className = '',
//       children
//     } = this.props;

//     return (
//       <button
//         onClick={onClick}
//         className={className}
//         type="button"
//       >
//         {children}
//       </button>
//     );
//   }
// }

// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props;
//     return (
//       <form className="someClass">
//           {children} <input type="text" onChange={onChange} value={value} />
//       </form>
//     );
//   }
// }

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <section>
//         {list.filter(isSearched(pattern)).map(item => <div key={item.objectID}>
//           <span>
//             <a href={item.url}>{item.title} </a>
//           </span>
//           <span>{item.author} </span>
//           <span>{item.num_comments} </span>
//           <span>{item.points} </span>
//           <Button onClick={() => onDismiss(item.objectID)}>
//             Dismiss
//           </Button>
//         </div>)}
//       </section>
//     );
//   }
// }

// Example of HOC
const withLoading = (Component) => ({ isLoading, ...rest }) => {
  console.log('isLoading', isLoading);
  console.log('rest', rest);
  return (isLoading ?
    <Loading /> : <Component { ...rest }/>)
}

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { 
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY ,
      error: null,
      isLoading: false
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.isNeedToSearchTopStories = this.isNeedToSearchTopStories.bind(this);
  }

  isNeedToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page=0) {
    this.setState({ isLoading: true })

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.isNeedToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault()
  }

  setSearchTopStories(result) {
    const {hits, page} = result;
    const {searchKey, results} = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
      isLoading: false
    });
  }

  componentDidMount() {
    this._isMounted = true;
    const {searchTerm} = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss(id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({ results: { 
        ...results,
        [searchKey]: { hits: updatedHits, page } 
      }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm,
            searchKey,
            results,
            error,
            isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    console.log(results);
    console.log(this.state);

    return (
      <div className="page">

        <div className='interactions'>
          <Search 
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={this.onSearchSubmit}> 
            Search  
          </Search>
        </div>

        {error ? 
          <div className='interactions'><p>Something went wrong...</p></div> :
          <Table 
          list={ list }
          onDismiss={ this.onDismiss }/>}
        
        <div className='interactions'>
          <ButtonWithLoading 
            isLoading={isLoading} 
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More stories
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

// Mikheev S. 3
// Filatov A. 6
// Milovanov A. 3
// Morozov A. 10
// Shcheglov A. 1
// Kuzmin A. 3
// Spatar A. 3
// Likhachev A. 3
// Gorbatenko B. 4
// Rodin E. 1
// Glazunov M. 2
// Savin N. 9
// Kodeikin S. 2
// Abramkin S. 4
// Voronin V. 4
// Alexey 4
// Miroshin V. 6
// Zubkov N. 11
// Serazhiev S. 3
// Korablin A. 11