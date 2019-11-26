import React from 'react'
import GEOStyles from './GEO.module.css';

class GEO extends React.Component{

    render() {
        return(
            <div className={GEOStyles.GEOBlock}>
                <button
                    className={GEOStyles.button}
                    onClick={this.props.getLocation}
                >Update My Location</button>
            </div>
        )
    }
}

export default GEO;