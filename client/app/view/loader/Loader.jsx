import React, {Component} from 'react';
import {connect} from 'react-redux';

import {actionFactory} from '../../state/actions/actionFactory';

import styles from './Loader.css';

const dataRestService = 'definitions';

export class LoaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // start loading data definitionModel
        this.startLoading();
    }

    startLoading() {
        // start loading application definitionModel
        fetch(dataRestService).then(loadedData => this.onServiceDataLoaded(loadedData));
    }

    onServiceDataLoaded(loadedData) {
        if (loadedData.status === 200) {
            console.trace('Successfully loaded data, now resolving it');
            loadedData.json().then(jsonData => this.props.dispatch(actionFactory.buildLoadComplete(jsonData)));
        } else {
            let message = `Failed loading data with error status ${loadedData.status ? loadedData.status : 'unknown'}: ${loadedData.statusText}`;
            console.trace(message);
            this.props.dispatch(actionFactory.buildLoadFailed(message));
        }
    }

    render() {
        return (
            <div className="Loader">
                <h1>Loading</h1>
                <p>Please wait while we retrieve and parse services and environment definitions...</p>
                <progress  />
            </div>)
    }
}

export const Loader = connect()(LoaderComponent);