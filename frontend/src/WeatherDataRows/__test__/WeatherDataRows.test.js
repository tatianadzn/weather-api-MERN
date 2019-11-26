import React from 'react';
import WeatherDataRows from '../WeatherDataRows';
import renderer from 'react-test-renderer';

describe('WeatherDataRows testing', () => {

    it('should render correctly', () => {
        const cityObj = {
            cityName: 'London',
            weather: 'test',
            wind: 'test',
            pressure: 'test',
            humidity: 'test'
        };

        const tree = renderer
            .create(<WeatherDataRows
                cityName={cityObj.cityName}
                weather={cityObj.weather}
                wind={cityObj.wind}
                pressure={cityObj.pressure}
                humidity={cityObj.humidity}
            />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});