import axios from "axios";

export const ADD_CITY_TO_FAVOURITES = 'ADD_CITY_TO_FAVOURITES';
export const DATA_IS_LOADING = 'DATA_IS_LOADING';
export const FETCH_DATA_SUCCESSFUL = 'FETCH_DATA_SUCCESSFUL';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FAV_DATA_SUCCESSFUL = 'FAV_DATA_SUCCESSFUL';
export const UPDATE_STORE_CITYLIST = 'UPDATE_STORE_CITYLIST';
export const DELETE_CITY_FROM_STORE = 'DELETE_CITY_FROM_STORE';

export const addCityToFavourites = (city) => ({
    type: ADD_CITY_TO_FAVOURITES,
    payload: city.toLowerCase()
});

export function getCityListFromLocalStorage(){
    return (dispatch) => {
        //on mount by default
        let list = [];
        axios.get('//localhost:8080/favourites/')
            .then(response => {
                if (response.data.length > 0){
                    list = response.data.map(city => city.city)
                }

                if (list === []) {
                    return list
                }
                let tmp = list.map(city =>
                    ({name: city, isLoading: true})
                );
                return tmp;
            })
            .then(res => dispatch(updateStoreCityList(res)));
    }
}

export const updateStoreCityList = cityList => ({
    type: UPDATE_STORE_CITYLIST,
    payload: cityList
});

export const deleteCityFromStore = city => ({
    type: DELETE_CITY_FROM_STORE,
    payload: city
});

export function deleteCityFromFavourites(city){
    return (dispatch) => {
        axios.delete('//localhost:8080/favourites/', {data: {city: city}})
            .then(res => console.log(res.data))
            .then(() => dispatch(deleteCityFromStore(city)))
            .catch(err => console.log('Error in deleting city from favourites: ' + err));
    }
}

export const dataIsLoading = (bool) => ({
    type: DATA_IS_LOADING,
    payload: bool
});

export const fetchDataISuccessful = (result) => ({
    type: FETCH_DATA_SUCCESSFUL,
    payload: result
});
export const fetchDataError = (cause, id) => ({
    type: FETCH_DATA_ERROR,
    payloadCause: cause,
    payloadId: id
});

export const favDataSuccessful = (result, city) => ({
    type: FAV_DATA_SUCCESSFUL,
    payload: result,
    city: city
});

export function fetchFavData(city) {
    console.log(city + ' will be fetched');
    return (dispatch) => {
        axios('//localhost:8080/weather/', {params: {city: city}})
            .then((result) => dispatch(favDataSuccessful(result, city)))
            .catch(() => {
                dispatch(deleteCityFromFavourites(city));
                dispatch(fetchDataError('Cannot find such city', 'fav'))
            });
    };
}

export function fetchData(lat, lon) {
    return (dispatch) => {
        dispatch(dataIsLoading(true));

        axios('//localhost:8080/weather/coordinates/', {params: {lat: lat, lon: lon}})
            .then((result) => dispatch(fetchDataISuccessful(result)))
            .catch(() => {
                dispatch(fetchDataError('Bad connection with API service (retrieving your location)', 'current'))
            });
    };
}