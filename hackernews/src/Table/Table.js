import React from 'react';
import { Button } from '../Button';
import PropTypes from 'prop-types';
import { Sort } from '../Sort';
import './index.css';

import { SORTS } from '../utils/sorts';

console.log(SORTS);

const largeColumn = {
    width: '40%'
  };
  const midColumn = {
    width: '30%'
  };
  const smalColumn = {
    width: '10%'
  };
  
export const Table = ({list, onDismiss, onSort, sortKey, isSortReverse}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  return (<section className='table'>
    <div className='table-header'>
      <span style={largeColumn}>
        <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={ sortKey }>Title</Sort>
      </span>
      <span style={midColumn}>
        <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={ sortKey }>Author</Sort>
      </span>
      <span style={smalColumn}>
        <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={ sortKey }>Comments</Sort>
      </span>
      <span style={smalColumn}>
        <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={ sortKey }>Points</Sort>
      </span>
      <span style={smalColumn}>
        Archive
      </span>
    </div>
    {reverseSortedList.map(item => <div key={item.objectID} className='table-row'>
        <span style={largeColumn}>
          <a href={item.url} target='_blank' rel="noopener noreferrer">{item.title} </a>
        </span>
        <span style={midColumn}>{item.author} </span>
        <span style={smalColumn}>{item.num_comments} </span>
        <span style={smalColumn}>{item.points} </span>
        <span style={smalColumn}>
          <Button onClick={() => onDismiss(item.objectID)} className='button-inline'>
            Dismiss
          </Button>
        </span>
      </div>)}
  </section>)
};

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ),
    onDismiss: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    sortKey: PropTypes.string.isRequired,
    isSortReverse: PropTypes.bool.isRequired
};