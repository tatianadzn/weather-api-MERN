import axios from 'axios';

import {
    ADD_CITY_TO_FAVOURITES,
    DATA_IS_LOADING,
    FETCH_DATA_ERROR,
    FETCH_DATA_SUCCESSFUL,
    FAV_DATA_SUCCESSFUL, UPDATE_STORE_CITYLIST, DELETE_CITY_FROM_STORE
} from '../actions/actionCreators';

const defaultState = {
    currentWeather: {
        cityName: '',
        weather: '',
        wind: '',
        pressure: '',
        humidity: '',
        maintemp: '',
        iconCode: ''
    },
    cityList: [],
    isLoading: true,
    errorText: ''
};
const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case ADD_CITY_TO_FAVOURITES:
            //add city to db
            axios.post('//localhost:8080/favourites/', {city: action.payload})
                .then(res => console.log(res.data))
                .catch(err => console.log('Error on add favourite city: ' + err));

            //and add city to state
            return {
                ...state,
                cityList: [...state.cityList, {name: action.payload, isLoading: true}]
            };

        case UPDATE_STORE_CITYLIST:
            return {
                ...state,
                cityList: action.payload
            };

        case DELETE_CITY_FROM_STORE:
            let array = state.cityList;
            array = array.filter((city) => city.name !== action.payload);
            return {
                ...state,
                cityList: array
            };
        case DATA_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case FETCH_DATA_ERROR:
            if (action.payloadId === 'fav') {
                //need to be changed

                return {
                    ...state,
                    errorText: action.payloadCause
                };
            } else {
                return {
                    ...state,
                    errorText: action.payloadCause,
                    isLoading: false
                };
            }

        case FETCH_DATA_SUCCESSFUL:
            console.log('successful');
            const cities = action.payload.data;
            const cityObj = {
                cityName: "City name: " + cities.name,
                weather: "Weather: " + cities.weather[0].description,
                wind: "Wind speed: " + cities.wind.speed + "m/sec",
                pressure: "Pressure: " + cities.main.pressure,
                humidity: "Humidity: " + cities.main.humidity + "%",
                maintemp: cities.main.temp + "K",
                iconCode: cities.weather[0].icon
            };
            return {
                ...state,
                currentWeather: cityObj,
                isLoading: false
            };
        case FAV_DATA_SUCCESSFUL:
            const data = action.payload.data;
            const obj = {
                name: data.name,
                weather: "Weather: " + data.weather[0].description,
                wind: "Wind speed: " + data.wind.speed + "m/sec",
                pressure: "Pressure: " + data.main.pressure,
                humidity: "Humidity: " + data.main.humidity + "%",
                maintemp: data.main.temp + "K",
                iconCode: data.weather[0].icon,
                isLoading: false
            };

            let cityListArray = state.cityList;
            cityListArray = cityListArray.filter((city) => city.name !== action.city);
            cityListArray.push(obj);
            return {
                ...state,
                cityList: cityListArray
            };
        default:
            return state;
    }
};

export default reducer;
