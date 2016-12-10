import {allActions} from './actions/actionFactory';
import * as dialog from './dialog';

export const initialState = {
    // empty at start, fields for expectations
    definitionModel: null,
    dialog: {},
    loadingError: null
};


export function reducer(previousState, action) {
    if (!previousState) {
        return initialState;
    }

    switch (action.type) {
        case allActions.onLoadFailed:
            return {definitionModel: null, dialog: {}, loadingError: action.data};
        case allActions.onLoadComplete:
            // loaded definitionModel
            return {
                definitionModel: action.data,
                dialog: dialog.createInitialDialogState(action.data),
                loadingError: null
            };
        case allActions.onContextValueSelected:
            return {
                definitionModel: previousState.definitionModel, // reported
                dialog: dialog.selectAttribute(previousState.definitionModel, previousState.dialog, action.data.fieldName, action.data.selectedValue),
                loadingError: null
            };
        default:
            console.info("Reducer: unhandled action type:", action);
    }

    return previousState;
}