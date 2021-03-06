import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Loader} from './loader/Loader';
import {LoadingError} from './error/LoadingError';
import {ContextSelection} from './main/context/ContextSelection';

import styles from './MainView.css';

class MainViewComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // this properties reflects store state (as seen below, see reducer)
        if (this.props.appModel.loadingError) {
            // data loading failed
            return <LoadingError message={this.props.appModel.loadingError}/>;
        } else if (!this.props.appModel || !this.props.appModel.definitionModel) {
            // data loading should be performed
            return <Loader/>;
        } else {
            // nominal case: initialization complete / TODO optimize dialog mapping to avoid mapping the parameters ands such
            return (
                <div className="MainView">
                    <ContextSelection dialog={this.props.appModel.dialog}/>
                </div>
            );
        }
    }

    /**
     * Converts redux state into this properties (and then reloads this component
     * @param reduxState current redux state
     * @return {{appModel: *}} this next properties
     */
    static stateToProperties(reduxState) {
        return {
            appModel: reduxState
        };
    }
}

export const MainView = connect(MainViewComponent.stateToProperties)(MainViewComponent);