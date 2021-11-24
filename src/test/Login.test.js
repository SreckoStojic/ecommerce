import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../reducers/index';
import "regenerator-runtime/runtime.js";

const store = createStore(allReducers);
const mockedUsedNavigate = jest.fn();

jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: key => key }),
}));

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('description', () => {
    const mockLogin = jest.fn(() => Promise.resolve());
    const {container} = render(
        <BrowserRouter>
            <Provider store={store}>
                <Login handleLogin={mockLogin} />
            </Provider>
        </BrowserRouter>);
    test('Test if component is loaded.', () => {
        console.log(container.innerHTML);
        //render(container);    
    });
    test('Test if username and password are valid.', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login handleLogin={mockLogin} />
                </Provider>
            </BrowserRouter>);
        fireEvent.click(screen.getByTestId('login-btn-id'));
        expect(mockLogin).toBeCalledWith('Test', 'test');
        expect(mockLogin).toHaveBeenCalledTimes(1);
        
        
        
    });    
});