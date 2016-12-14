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
            <Paper style={{width: "400px"}}>
                <Subheader>{this.props.groupName}</Subheader>
                {
                    this.props.parameters.map(parameter => {
                        this.buildField(parameter);
                    })
                }
            </Paper>
        );
    }


    buildField(parameter) {
        return ;
    }
}

