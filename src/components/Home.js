import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios';

class Home extends Component {

    constructor() {
        super()

        this.state = {
            stateData: [],
            allData: []
        }
    }


    getStateData = () => {
        axios.get('http://localhost:5555/state')
            .then((response) => {
                this.setState({
                    stateData: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.error(e)
            });
    }

    getAllData = () => {
        axios.get('http://localhost:5555/city')
            .then((response) => {
                this.setState({
                    allData: response.data
                });
                console.log(response.data)
                // this.allData.push(response.data);
            })
            .catch(e => {
                console.error(e)
            });

        axios.get('http://localhost:5555/hotels')
            .then((res) => {
                console.log(res.data)
                // this.allData.push(res.data);
            }).catch(e => {
                console.error(e)
            });
    }

    componentDidMount() {
        this.getStateData();
        this.getAllData();
    }

    render() {
        return (
            <React.Fragment>
                <div className='home-search'>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='select-sec'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <ReactSearchAutocomplete className="form-select" placeholder="Select State"
                                    items={this.state.stateData}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className='col-8'>
                            <ReactSearchAutocomplete className="form-select" placeholder="Item / Location / Any..."
                                items={this.state.allData}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default Home;