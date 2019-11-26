import React from 'react';
import FavCity from './FavCity/FavCity'
import {connect} from 'react-redux';
import {getCityListFromLocalStorage} from '../store/actions/actionCreators';

class FavCityList extends React.Component {

    componentDidMount() {
        this.props.getCityListFromLocalStorage();
    }



    render() {
        if (this.props.cityList !== null){
            return (
                <div>
                    {this.props.cityList !== null && this.props.cityList.map(city => {
                        return (
                            <FavCity
                                key={city.name}
                                city={city.name}
                            />
                        )
                    })}
                </div>
            )
        }
        else {
            return null;
        }

    }
}

const mapStateToProps = state => {
    return {
        cityList: state.cityList
    };
};

const mapDispatchToProps = {
    getCityListFromLocalStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(FavCityList);