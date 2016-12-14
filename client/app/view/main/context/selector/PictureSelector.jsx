import React, {Component} from "react";
import {connect} from "react-redux";

import styles from "./PictureSelector.css";

class PictureSelectorComponent extends Component {

    constructor(props) {
        super(props);
    }

    dispatchSelection(elt) {
        this.props.dispatch(this.props.buildSelectionAction(elt));
    }

    render() {
        return (
            <div className="PictureSelector">
                {
                    this.props.list.map((item, index) =>
                        <div className={`${this.props.selectedItem === item ? 'item-selected' : 'item-not-selected'}`}
                             onClick={evt => this.dispatchSelection(item)} key={item.value + index}>
                            {
                                this.props.buildItemView(item)
                            }
                        </div>)
                }
            </div>
        )
    }

}

export const PictureSelector = connect()(PictureSelectorComponent);
