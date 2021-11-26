import React from 'react';
import renderer from 'react-test-renderer';
import {AssetCard} from '../src/common';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <AssetCard
        id={''}
        currency={{
          id: '1',
          name: 'name',
        }}
        total={0}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
