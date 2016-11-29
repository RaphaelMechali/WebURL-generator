import React, {Component} from 'react';
import * as Redux from 'redux';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {initialState, reducer} from './state/reducer';

import {MainView} from './view/MainView';
import injectTapEventPlugin from 'react-tap-event-plugin';

import styles from './App.css';

// FIXME Needed for onTouchTap (temporary, should be gone with react stable versions)
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// build redux store
const store = Redux.createStore(reducer, initialState);

// TODO custom theme!

export class App extends Component {

    render() {
        // instantiate store provider
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="App">
                    <MainView />
                </div>
                </MuiThemeProvider>
            </Provider>);
    }

}

