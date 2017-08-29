import { connect } from 'react-redux';

import indexedCollectionWithLenses from './indexedCollectionWithLenses';

function indexedCollectionPresenter(
  { key, stateKey = key, propKey = key },
  ...lenses
) {
  const mapSelectorsToProps = indexedCollectionWithLenses(stateKey, ...lenses);

  const mapStateToProps = state => ({
    [propKey]: mapSelectorsToProps(state),
  });

  return {
    connect: connect(mapStateToProps),
  };
}

export default indexedCollectionPresenter;
