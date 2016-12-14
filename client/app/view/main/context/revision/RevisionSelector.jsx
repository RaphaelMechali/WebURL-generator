import React, {Component} from "react";

import {actionFactory} from "../../../../state/actions/actionFactory";

import {PictureSelector} from "../selector/PictureSelector";

export class RevisionSelector extends Component {

    renderItem(revision) {
        return <div className="TextItem">{revision.label}</div>;
    }

    render() {
        return <PictureSelector list={this.props.revisions} selectedItem={this.props.selectedRevision}
                                buildItemView={this.renderItem}
                                buildSelectionAction={elt => actionFactory.buildContextSelection("revision", elt)}/>
    }

}