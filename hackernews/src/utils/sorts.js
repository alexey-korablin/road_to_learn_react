import { sortBy } from 'lodash';

export const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'comments'),
    POINTS: list => sortBy(list, 'points')
}