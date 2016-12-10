import React, {Component} from "react";

import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

import styles from "./RevisionSelector.css";

export class RevisionSelector extends Component {

    renderItem(revision) {
        return (
            <div className="RevisionItem">{revision.label}</div>
        );
    }

    render() {
        return <PictureSelector list={this.props.revisions} selectedItem={this.props.selectedRevision}
                                containerClass="RevisionSelector" buildItemView={this.renderItem}
                                buildSelectionAction={elt => actionFactory.buildContextSelection("revision", elt)}/>
    }

}