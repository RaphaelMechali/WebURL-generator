import React, {Component} from 'react';
import * as Redux from 'redux';
import {Provider} from 'react-redux';
import {initialState, reducer} from './state/reducer';

import {MainView} from './view/MainView';

import styles from './App.css';

// build redux store
const store = Redux.createStore(reducer, initialState);

export class App extends Component {

    render() {
        // instantiate store provider
        return (
            <Provider store={store}>
                <div className="App">
                    <MainView />
                </div>
            </Provider>);
    }

}

