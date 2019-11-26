import axios from "axios";

export const ADD_CITY_TO_FAVOURITES = 'ADD_CITY_TO_FAVOURITES';
export const DATA_IS_LOADING = 'DATA_IS_LOADING';
export const FETCH_DATA_SUCCESSFUL = 'FETCH_DATA_SUCCESSFUL';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FAV_DATA_SUCCESSFUL = 'FAV_DATA_SUCCESSFUL';
export const UPDATE_STORE_CITYLIST = 'UPDATE_STORE_CITYLIST';
export const DELETE_CITY_FROM_STORE = 'DELETE_CITY_FROM_STORE';

export const addCityToFavourites = (cityList) => ({
    type: ADD_CITY_TO_FAVOURITES,
    payload: cityList
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
    const url = 'https://api.openweathermap.org/data/2.5/weather?appid=41210752a269dfb2e2a8167a0910c3a1&q=' + city;
    console.log(url + ' will be fetched');
    return (dispatch) => {

        fetch(url)
            .then((response) => {
                console.log('we got a response!');
                if (!response.ok) {
                    dispatch(deleteCityFromFavourites(city));
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((result) => result.json())
            .then((result) => dispatch(favDataSuccessful(result, city)))
            .catch(() => dispatch(fetchDataError('City is not found', 'fav')));
    };
}

export function fetchData(url) {
    return (dispatch) => {
        dispatch(dataIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((result) => result.json())
            .then((result) => dispatch(fetchDataISuccessful(result)))
            .catch(() => dispatch(fetchDataError('Bad connection with API service (retrieving your location)', 'current')));
    };
}