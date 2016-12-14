import React, {Component} from "react";
import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./RestResourceSelector.css";

export class RestResourceSelector extends Component {


    constructor(props) {
        super(props);
    }

    renderItem(resource) {
        return (
            <div>
                <div className="ItemLabel">{resource.label}</div>
                <div className={`RestResourcePictureBase RestResourcePicture${resource.value.toUpperCase()}`}/>
            </div>
        );
    }

    render() {
        return <PictureSelector list={this.props.restResources} selectedItem={this.props.selectedRestResource}
                                buildItemView={this.renderItem}
                                buildSelectionAction={resource => actionFactory.buildContextSelection("restResource", resource)}/>
    }

}