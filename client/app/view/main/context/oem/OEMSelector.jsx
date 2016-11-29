import React, {Component} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import {actionFactory} from "../../../../state/actions/actionFactory";
import {connect} from "react-redux";

import IconButton from 'material-ui/IconButton';
import RadioIconChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioIconUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';


import styles from "./OEMSelector.css";

// TODO set up in main theme if possible!
const styling = {
    gridStyles: {
        cols: 3,
        cellHeight: 140,
        padding: 4
    },
    tileStyles: {
        titlePosition: 'top',
        titleBackground: "rgba(180,180,180,0.2)",
        titleStyles: {
            color: '#333333'
        },
        radioButtonColor: '#333333'
    }
};


class OEMSelectorComponent extends Component {

    constructor(props) {
        super(props);
    }

    onSelected(oem) {
        if (!this.props.selectedOEM !== oem) {
            this.props.dispatch(actionFactory.buildContextSelection("oem", oem));
        }
    }

    render() {
        return (
            <GridList className="OEMGridList" cols={styling.gridStyles.cols} cellHeight={styling.gridStyles.cellHeight}
                      padding={styling.gridStyles.padding}>
                {this.props.oems.map((oem, index) => (
                    <GridTile key={index}
                              title={oem.label} titlePosition={styling.tileStyles.titlePosition}
                              titleBackground={styling.tileStyles.titleBackground}
                              titleStyle={styling.tileStyles.titleStyles}
                              actionIcon={
                                  <IconButton
                                      onTouchTap={evt => (this.onSelected(oem))}>
                                      {
                                          // select radio state
                                          oem === this.props.selectedOEM ?
                                              <RadioIconChecked color={styling.tileStyles.radioButtonColor}/> :
                                              <RadioIconUnchecked color={styling.tileStyles.radioButtonColor}/>
                                      }
                                  </IconButton>
                              }>

                        <div className="OEMPictureContainer" onClick={evt => this.onSelected(oem)}>
                            <div className={`OEMPictureBase OEMPicture-${oem.value}`}/>
                        </div>
                    </GridTile>
                ))}

            </GridList>
        );

    }

}

export const OEMSelector = connect()(OEMSelectorComponent);
