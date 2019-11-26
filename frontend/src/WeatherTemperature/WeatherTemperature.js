import React from 'react';
import Loader from '../Loader/Loader';
import {connect} from 'react-redux';
import WeatherTemperatureStyle from './WeatherTemperatureStyle.module.css';

class WeatherTemperature extends React.Component {

    render() {
        if (this.props.isLoading) {
            return <Loader/>;
        }
        else {
            return(
                <div className={WeatherTemperatureStyle.WeatherTemperatureBlock}>
                    {this.props.temp}
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        temp: state.currentWeather.maintemp
    };
};

export default connect(mapStateToProps)(WeatherTemperature);