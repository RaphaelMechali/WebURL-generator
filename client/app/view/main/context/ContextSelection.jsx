/**
 * Context selector view (oem / revision / service)
 */
import React, {Component} from "react";
import {OEMSelector} from "./oem/OEMSelector";
import {ServiceSelector} from './service/ServiceSelector';

import styles from "./ContextSelection.css";

export class ContextSelection extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <OEMSelector oems={this.props.definitions.oems} selectedOEM={this.props.context.oem }/>
                <br />
                <ServiceSelector services={this.props.definitions.services}
                                 selectedService={this.props.definitions.services[0]}/>
            </div>
        );
    }

}

