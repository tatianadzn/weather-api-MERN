import React from 'react';
import Loader from '../Loader';
import renderer from 'react-test-renderer';

describe('FavCity testing', () => {

    it('should render correctly', () => {
        const tree = renderer
            .create(<Loader/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});