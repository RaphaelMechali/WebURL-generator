import React, {Component} from "react";
import {connect} from "react-redux";
import {actionFactory} from "../../state/actions/actionFactory";

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
            console.trace(`Failed loading data with server error ${loadedData.statusText}`);
            this.props.dispatch(actionFactory.buildLoadFailed(loadedData.statusText));
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