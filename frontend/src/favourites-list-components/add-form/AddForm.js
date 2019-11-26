import React from 'react';
import './AddForm.css';
import {connect} from 'react-redux';
import {addCityToFavourites} from "../../store/actions/actionCreators";


class AddForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            city: '',
            errorText: ''
        }
    }

    handleChange = event => {
        this.setState({city: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        if (JSON.parse(localStorage.getItem(this.state.city)) === null){
            this.props.addCityToFavourites(this.state.city);
        }else{
            this.setState({errorText: this.state.city + ': such city has already been added to favourites'});
            setTimeout(() => {
                this.setState({errorText:''});
            }, 4000)
        }
        this.setState({city: ''});
    };


    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className={'inputForm'} value={this.state.city} type={'text'} onChange={this.handleChange}/>
                    <input className={'btnAdd'} type={'submit'} value={'Add'}/>
                </form>
                <div>{this.state.errorText}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cityList: state.cityList,
        errorText: state.errorText
    };
};

const mapDispatchToProps = {
    addCityToFavourites
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);