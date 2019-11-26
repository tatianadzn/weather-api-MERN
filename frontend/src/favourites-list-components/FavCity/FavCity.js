import React from 'react';
import WeatherDataRows from '../../WeatherDataRows/WeatherDataRows';
import Loader from '../../Loader/Loader';
import { connect } from 'react-redux';
import {deleteCityFromFavourites, fetchFavData} from "../../store/actions/actionCreators";
import './FavCity.css';

class FavCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city,
            cityObj: this.props.cityList.find(city => city.name === this.props.city)
        }
    };


    componentDidMount() {
        if (this.state.cityObj.weather === undefined){
            this.props.fetchFavData(this.state.city);
        }
    }


    render() {
        if (!this.props.cityList.find(city => city.name === this.props.city).isLoading) {
            const cityObj = this.props.cityList.find(city => city.name === this.props.city);
            let iconURL = '';
                if (cityObj.iconCode !== '') {
                    iconURL = '//openweathermap.org/img/wn/' + cityObj.iconCode + '@2x.png';
                }
            return (
                <div className={'body'}>

                    <button className={'btnDel'} onClick={() => {this.props.deleteCityFromFavourites(this.state.city)}}> X </button>
                    <img className={'iconIMG'} src={iconURL} alt="Loading..."/>
                    <WeatherDataRows
                        cityName={cityObj.name}
                        weather={cityObj.weather}
                        wind={cityObj.wind}
                        pressure={cityObj.pressure}
                        humidity={cityObj.humidity}
                    />
                </div>
            )
        } else return <Loader/>
    }
}

const mapStateToProps = state => {
    return {
        cityList: state.cityList
    };
};

const mapDispatchToProps = {
  deleteCityFromFavourites, fetchFavData
};

export default connect(mapStateToProps, mapDispatchToProps)(FavCity);