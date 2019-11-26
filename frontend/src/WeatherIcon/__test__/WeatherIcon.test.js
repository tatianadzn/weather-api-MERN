import React from 'react';
import WeatherIcon from '../WeatherIcon';
import renderer from 'react-test-renderer';

describe('WeatherIcon testing', () => {

    it('should render correctly', () => {
        const tree = renderer
            .create(<WeatherIcon iconURL={'//openweathermap.org/img/wn/10n@2x.png'}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});