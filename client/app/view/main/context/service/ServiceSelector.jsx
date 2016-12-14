import React, {Component} from "react";
import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./ServiceSelector.css";

export class ServiceSelector extends Component {

    renderItem(service) {
        return (
            <div>
                <div className="ItemLabel">{service.label}</div>
                <div className={`ServicePictureBase Service${service.value.toUpperCase()}`}/>
            </div>
        );
    }

    render() {
        return <PictureSelector list={this.props.services} selectedItem={this.props.selectedService}
                                buildItemView={this.renderItem}
                                buildSelectionAction={elt => actionFactory.buildContextSelection("service", elt)}/>
    }

}