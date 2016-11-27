import React, {Component} from "react";
import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./OEMSelector.css";

export class OEMSelector extends Component {

    constructor(props) {
        super(props);
    }

    renderItem(oem) {
        return <div className={`oem-picture-base oem-picture-${oem.value}`}/>;
    }

    render() {
        return <PictureSelector list={this.props.oems} selectedItem={this.props.selectedOEM}
                                containerClass="OEMSelector" buildItemView={this.renderItem}
                                buildSelectionAction={oem => actionFactory.buildContextSelection("oem", oem)}/>
    }

}