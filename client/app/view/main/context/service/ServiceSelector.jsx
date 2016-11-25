import React, {Component} from "react";
import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./ServiceSelector.css";

export class ServiceSelector extends Component {

    renderItem(service) {
        // TODO: service label instead of value
        return <div className={`service-item service-${service.value}`} title={service.value} />;
    }

    render() {
        return <PictureSelector list={this.props.services} selectedItem={this.props.selectedService}
                                containerClass="ServiceSelector"
                                buildItemView={elt => this.renderItem(elt)}
                                buildSelectionAction={elt => actionFactory.buildServiceSelected(elt)}/>
    }


}