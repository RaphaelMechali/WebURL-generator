/**
 * Context selector view (oem / revision / service)
 */
import React, {Component} from "react";
import {OEMSelector} from "./oem/OEMSelector";
import {ServiceSelector} from './service/ServiceSelector';
import {RevisionSelector} from './revision/RevisionSelector';
import {RegionSelector} from './region/RegionSelector';
import {ApplicationSelector} from './application/ApplicationSelector'
import {VerticalRule} from '../common/VerticalRule';

import styles from "./ContextSelection.css";

export class ContextSelection extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ContextSelection">
                <OEMSelector oems={this.props.dialog.availableOEMS} selectedOEM={this.props.dialog.selectedOEM}/>
                <VerticalRule />
                <ServiceSelector services={this.props.dialog.availableServices}
                                 selectedService={this.props.dialog.selectedService}/>
                <VerticalRule />
                <RevisionSelector revisions={this.props.dialog.availableRevisions}
                                  selectedRevision={this.props.dialog.selectedRevision}/>
                <VerticalRule />
                <RegionSelector regions={this.props.dialog.availableRegions}
                                selectedRegion={this.props.dialog.selectedRegion}/>
                <VerticalRule/>
                <ApplicationSelector applications={this.props.dialog.availableApplications}
                                     selectedApplication={this.props.dialog.selectedApplication}/>
            </div>
        );
    }


}

