/**
 * Context selector view (oem / revision / service)
 */
import React, {Component} from "react";
import {OEMSelector} from "./oem/OEMSelector";
import {ServiceSelector} from './service/ServiceSelector';
import {RevisionSelector} from './revision/RevisionSelector';
import {RegionSelector} from './region/RegionSelector';
import {RestResourceSelector} from './resource/RestResourceSelector';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

export class ContextSelection extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={{width: "615px"}}>
                <Subheader>OEM</Subheader>
                <OEMSelector oems={this.props.dialog.availableOEMS} selectedOEM={this.props.dialog.selectedOEM}/>
                <Divider />
                <Subheader>Service</Subheader>
                <ServiceSelector services={this.props.dialog.availableServices}
                                 selectedService={this.props.dialog.selectedService}/>
                <Divider />
                <Subheader>Revision</Subheader>
                <RevisionSelector revisions={this.props.dialog.availableRevisions}
                                  selectedRevision={this.props.dialog.selectedRevision}/>
                <Divider />
                <Subheader>Region</Subheader>
                <RegionSelector regions={this.props.dialog.availableRegions}
                                selectedRegion={this.props.dialog.selectedRegion}/>
                <Divider />
                <Subheader>Rest resource</Subheader>
                <RestResourceSelector restResources={this.props.dialog.availableRestResources}
                                      selectedRestResource={this.props.dialog.selectedRestResource}/>
                <Divider />
                <Subheader>Rest resource</Subheader>
                <Divider />
                <Subheader>Rest resource</Subheader>
                <Divider />
                <Subheader>Rest resource</Subheader>
            </Paper>
        );
    }


}

