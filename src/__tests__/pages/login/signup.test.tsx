import React from 'react';
import { SignUpPage } from '../../../pages';
import renderer from 'react-test-renderer';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Test SignUp page', () => {
  it('render component <SignUp />', () => {
    const tree = renderer.create(<SignUpPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
