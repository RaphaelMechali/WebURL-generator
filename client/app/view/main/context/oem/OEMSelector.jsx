import React, {Component} from "react";
import {connect} from "react-redux";
import {actionFactory} from "../../../../state/actions/actionFactory";

import styles from "./OEMSelector.css";

class OEMSelectorComponent extends Component{

    constructor(props) {
        super(props);
    }

    dispatchOEMSelected(oem) {
        console.trace("Dispatch selected oem ", oem);
        this.props.dispatch(actionFactory.buildOEMSelected(oem));
    }

    render() {
        return (
            <div className="OEMSelector">
                {
                    this.props.oems.map(oem => (
                        <div className={`oem-option ${this.props.selectedOEM === oem ? 'oem-option-selected' : ''}`}
                             onClick={evt => this.dispatchOEMSelected(oem)} key={oem.value}>
                            <div className={`oem-picture-base oem-picture-${oem.value}`}/>
                            <div className={ 'top-layer'}/>
                        </div>
                    ))
                }
            </div>
        );
    }

}


export const OEMSelector = connect()(OEMSelectorComponent);