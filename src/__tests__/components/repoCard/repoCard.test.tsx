import { RepoCard } from '../../../components';
import renderer from 'react-test-renderer';
import { SignUpPage } from '../../../pages';
import React from 'react';

describe('Test component RepoCard', () => {
  it('render component <RepoCard />', () => {
    const tree = renderer
      .create(
        <RepoCard
          onClickFavorite={() => undefined}
          repo={{
            id: '123',
            name: 'Repo Test',
            url: 'url',
            visibility: 'PRIVATE',
            primaryLanguage: { name: 'lang' },
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
