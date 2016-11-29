import React, {Component} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import {actionFactory} from "../../../../state/actions/actionFactory";
import {connect} from "react-redux";

import IconButton from 'material-ui/IconButton';
import RadioIconChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioIconUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import styles from "./ServiceSelector.css";

// TODO set up in main theme if possible!
const styling = {
    gridStyles: {
        cols: 8,
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

class ServiceSelectorComponent extends Component {

    renderItem(service) {
        return <div className={`service-item service-${service.value}`} title={service.label}/>;
    }

    onSelected(service) {
        if (service !== this.props.selectedService) {
            this.props.dispatch(actionFactory.buildContextSelection("service", service));
        }
    }

    render() {
        return (
            <GridList className="ServicesGridList" cols={styling.gridStyles.cols} cellHeight={styling.gridStyles.cellHeight}
                      padding={styling.gridStyles.padding}>
                {this.props.services.map((service, index) => (
                    <GridTile key={index} title={service.label} titlePosition={styling.tileStyles.titlePosition}
                              titleBackground={styling.tileStyles.titleBackground}
                              titleStyle={styling.tileStyles.titleStyles}
                              actionIcon={
                                  <IconButton
                                      onTouchTap={evt => (this.onSelected(service))}>
                                      {
                                          // select radio state
                                          service === this.props.selectedService ?
                                              <RadioIconChecked color={styling.tileStyles.radioButtonColor}/> :
                                              <RadioIconUnchecked color={styling.tileStyles.radioButtonColor}/>
                                      }
                                  </IconButton>
                              }>

                        <div className="ServicePictureContainer" onClick={evt => this.onSelected(service)}>
                            <div className={`ServicePictureBase ServicePicture-${service.value}`}/>
                        </div>
                    </GridTile>
                ))}

            </GridList>
        );


    }

}

export const ServiceSelector = connect()(ServiceSelectorComponent);
