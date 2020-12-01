import React from 'react';

class CityInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          city:''
        };
    }

    sendCity = (city) => {
        this.props.parentCallBack(city)
        console.log(city)
    }

    handleChange = (event) => {
        this.setState({
          input: event.target.value
        });
      }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.sendCity(this.state.input)
        this.setState({
            city: this.state.input,
            input: ''
        });
    }

    render() {
      return (
        <div>
            <form onSubmit={this.handleSubmit} className="form-group input-form" autoComplete="off" >
                <input autoComplete="off" id="searchTextField"  size="50"  type="text" className="form-control task-input" placeholder="New York, US" value={this.state.input} onChange={this.handleChange}  required/>
                <button className="srch-btn btn btn-primary">Search</button>
            </form>
        </div>

      );
    }
  }

  export default CityInput;