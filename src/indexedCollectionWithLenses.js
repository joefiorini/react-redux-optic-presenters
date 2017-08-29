import { createSelector, createStructuredSelector } from 'reselect';
import invariant from 'invariant';

import getList from './utils/getList';

function makePropLens(selector, propName) {
  const getStateProp = state => {
    invariant(
      state[selector],
      `Could not find any state at ${selector} in:\n${state}`
    );
    return state[selector];
  };

  return createSelector(getStateProp, collection =>
    id => collection[id][propName]);
}

export default function selectListWithLenses(selector, ...props) {
  const spec = {
    collection: getList(selector),
  };

  for (const propName of props) {
    spec[propName] = makePropLens(selector, propName);
  }

  return createStructuredSelector(spec);
}
