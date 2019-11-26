import React from 'react';
import WeatherTemperature from '../WeatherTemperature';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('WeatherTemperature testing', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            currentWeather: {
                maintemp: 'test',
            },
            isLoading: false
        });
    });

    it('should render with given state from Redux store', () => {
        const tree = renderer
            .create(<Provider store={store}><WeatherTemperature/></Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});