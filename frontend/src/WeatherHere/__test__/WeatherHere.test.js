import React from 'react';
import WeatherHere from '../WeatherHere';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('WeatherHere testing', () => {
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
            isLoading: false,
            errorText: ''
        });
    });

    it('should render with given state from Redux store', () => {
        const tree = renderer
            .create(<Provider store={store}><WeatherHere/></Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});