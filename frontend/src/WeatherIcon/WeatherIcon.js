import React from 'react';
import WeatherIconStyle from './WeatherIconStyle.module.css';

class WeatherIcon extends React.Component {
    render() {
        if (this.props.iconURL !== ''){
            return(
                <div className={WeatherIconStyle.WeatherIconBlock}>
                    <img src={this.props.iconURL} alt={"Loading..."}/>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default WeatherIcon;