import React, {Component} from 'react';
import styles from './LoadingError.css';

export class LoadingError extends Component {

    render() {
        return (
            <div className="LoadingError">
                <h1>Loading error</h1>
                <p>
                    <strong>Application startup failed.<br /></strong>
                </p>
                <p>
                    {this.props.message}
                </p>
            </div>
        );
    }

}

