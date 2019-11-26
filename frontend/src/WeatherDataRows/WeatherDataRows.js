import React from 'react';
import WeatherDataRowsStyle from './WeatherDataRowsStyle.module.css';
import RowStyle from './RowStyle.module.css';

class WeatherDataRows extends React.Component {

    render() {
        return(
            <div className={WeatherDataRowsStyle.WeatherDataBody}>
                <div className={RowStyle.row}>{this.props.cityName}</div>
                <div className={RowStyle.row}>{this.props.weather}</div>
                <div className={RowStyle.row}>{this.props.wind}</div>
                <div className={RowStyle.row}>{this.props.pressure}</div>
                <div className={RowStyle.row}>{this.props.humidity}</div>
            </div>
        )
    }
}

export default WeatherDataRows;
