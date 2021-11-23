import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../reducers/index';

jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: key => key }),
}));

const mockedUsedNavigate = jest.fn();
const store = createStore(allReducers);

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('description', () => {
    test('it works', () => {
        
        const {container} = render(
        <BrowserRouter>
            <Provider store={store}>
                <Login />
            </Provider>
        </BrowserRouter>);
        console.log(container.outerHTML);
    });
});