import React from 'react';
import FavCityList from '../FavCityList';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('FavCity testing', () => {
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
            cityList: [
                {
                    name: 'London',
                    weather: 'test',
                    wind: 'test',
                    pressure: 'test',
                    humidity: 'test',
                    maintemp: 'test',
                    iconCode: '10n'
                },
                {
                    name: 'Moscow',
                    weather: 'test',
                    wind: 'test',
                    pressure: 'test',
                    humidity: 'test',
                    maintemp: 'test',
                    iconCode: '10n'
                }],
            isLoading: false,
            errorText: ''
        });
    });

    it('should render with given state from Redux store', () => {
        const tree = renderer
            .create(<Provider store={store}><FavCityList/></Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});