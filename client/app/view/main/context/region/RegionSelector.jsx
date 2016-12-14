import React, {Component} from "react";
import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./RegionSelector.css";

export class RegionSelector extends Component {


    constructor(props) {
        super(props);
    }

    renderItem(region) {
        return (
            <div>
                <div className="ItemLabel">{region.label}</div>
                <div className={`RegionPictureBase RegionPicture${region.value.toUpperCase()}`}/>
            </div>
        );
    }

    render() {
        return <PictureSelector list={this.props.regions} selectedItem={this.props.selectedRegion}
                                buildItemView={this.renderItem}
                                buildSelectionAction={region => actionFactory.buildContextSelection("region", region)}/>
    }

}