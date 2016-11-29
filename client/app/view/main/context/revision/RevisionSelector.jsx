import React, {Component} from "react";

import {actionFactory} from "../../../../state/actions/actionFactory";
import {List, ListItem} from 'material-ui/List';



import styles from "./RevisionSelector.css";

export class RevisionSelector extends Component {

    renderItem(revision) {
        return (
            <div className="revision-item">
                <strong>{revision.label}</strong>
            </div>
        );
    }

    render() {
        return <PictureSelector list={this.props.revisions} selectedItem={this.props.selectedRevision}
                                containerClass="RevisionSelector" buildItemView={this.renderItem}
                                buildSelectionAction={elt => actionFactory.buildContextSelection("revision", elt)}/>
    }
 /*   return <List>
{
    // leftIcon={<ContentInbox />}
    this.props.services.map((service, index) =>
        <ListItem key={index} primaryText={service.label} />
    )
}
</List>*/

}