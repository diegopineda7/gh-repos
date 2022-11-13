import React from 'react';
import { LogInPage } from '../../../pages';
import renderer from 'react-test-renderer';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Test LogIn page', () => {
  it('render component <LogIn />', () => {
    const tree = renderer.create(<LogInPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
