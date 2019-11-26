import React from 'react';
import GEO from '../GEO';
import renderer from 'react-test-renderer';

describe('GEO testing', () => {

    it('should render correctly', () => {
        const tree = renderer
            .create(<GEO getLocation={()=>{}}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});