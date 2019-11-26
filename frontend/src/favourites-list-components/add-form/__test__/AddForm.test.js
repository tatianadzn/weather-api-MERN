import React from 'react';
import AddForm from '../AddForm';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('AddForm testing', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            currentWeather: {
                cityName: 'London',
                weather: 'test',
                wind: 'test',
                pressure: 'test',
                humidity: 'test',
                maintemp: 'test',
                iconCode: 'test'
            },
            cityList: ['London', 'Moscow'],
            isLoading: false,
            errorText: ''
        });
    });

    it('should render with given state from Redux store', () => {
        const tree = renderer
            .create(<Provider store={store}><AddForm/></Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});


