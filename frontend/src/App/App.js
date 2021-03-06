import React from 'react';
import GEO from '../GEO/GEO';
import WeatherHere from '../WeatherHere/WeatherHere';
import Favourites from '../favourites-list-components/add-form/AddForm';
import FavCityList from '../favourites-list-components/FavCityList';
import {connect} from 'react-redux';
import {fetchData, fetchFavData} from "../store/actions/actionCreators";
import AppStyles from './App.module.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            weatherIconURL: '',
            errorText: ''
        }
    }

    render() {
        return(
            <div className={AppStyles.AppBody}>
                <GEO getLocation={this.getLocation.bind(this)}/>
                <div>
                    {this.state.errorText}
                    {this.state.msgForRestrictedGEO}
                </div>
                <WeatherHere/>
                <div className={AppStyles.favCities} >Favourite Cities</div>
                <Favourites onAddingNewCity={this.handleAddingNewCityToFav}/>
                <FavCityList/>
            </div>
        )
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {

        if (!navigator.geolocation){
            this.setState({msgForRestrictedGEO: 'Geolocation is not supported by your browser'});
            return;
        }

        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));

    }

    error(){
        this.setState({latitude: 60, longitude: 30});
        this.setState({errorText: 'Cannot retrive your location'});
        this.props.fetchData(this.state.latitude.toString(), this.state.longitude.toString());
    }
    success(position){
        this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
        this.setState({errorText: ''});
        this.props.fetchData(this.state.latitude.toString(), this.state.longitude.toString());
    }

    handleAddingNewCityToFav = city => {
        this.props.fetchFavData(city);
    }
}

const mapStateToProps = state => {
  return {
      isLoading: state.isLoading
  };
};

const mapDispatchToProps = {
    fetchData, fetchFavData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
