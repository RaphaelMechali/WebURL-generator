/**
 * Context selector view (oem / revision / service)
 */
import React, {Component} from "react";
import {OEMSelector} from "./oem/OEMSelector";
import {ServiceSelector} from './service/ServiceSelector';
import {RevisionSelector} from './revision/RevisionSelector';

import styles from "./ContextSelection.css";

export class ContextSelection extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <OEMSelector oems={this.props.dialog.availableOEMS} selectedOEM={this.props.dialog.selectedOEM}/>
                <br />
                <ServiceSelector services={this.props.dialog.availableServices}
                                 selectedService={this.props.dialog.selectedService}/>
                <RevisionSelector revisions={this.props.dialog.availableRevisions}
                                  selectedRevision={this.props.dialog.selectedRevision}/>
            </div>
        );
    }

}

