import React, {Component} from "react";
import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./ApplicationSelector.css";

export class ApplicationSelector extends Component {


    constructor(props) {
        super(props);
    }

    renderItem(application) {
        return (
            <div className="ApplicationItem">
                <div className="ApplicationItemLabel">{application.label}</div>
                <div className={`ApplicationPictureBase ApplicationPicture${application.value.toUpperCase()}`}/>
            </div>
        );
    }

    render() {
        return <PictureSelector list={this.props.applications} selectedItem={this.props.selectedApplication}
                                containerClass="ApplicationSelector" buildItemView={this.renderItem}
                                buildSelectionAction={application => actionFactory.buildContextSelection("application", application)}/>
    }

}