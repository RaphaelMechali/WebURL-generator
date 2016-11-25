import {allActions} from './actions/actionFactory';

export const initialState = {
    // empty at start, fields for expectations
    definitionModel: null,
    dialog: {},
    loadingError: null
};

function initializeDialog(definitionData) {
    const selectedOEM = definitionData.oems.find(oem => oem.default);
    const selectedRevision = definitionData.revisions.find(rev => rev.default);
    const selectedMarket = definitionData.revisions.find(regions => regions.default);
    return {
        context: {
            oem: selectedOEM,
            rev: selectedRevision,
            market: selectedMarket,
            service: undefined, // TODO
            page: undefined // TODO
        }
    };
    // TODO : seriously, init it all in cascade xD
}

function changeContextOEM(previousDialog, newOEM) {
    let newContext = Object.assign({}, previousDialog.context);
    // TODO : seriously, change it all in cascade xD
    newContext.oem = newOEM;
    return {
        context: newContext
    };
}

export function reducer(state, action) {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case allActions.onLoadFailed:
            return {definitionModel: null, dialog: {}, loadingError: action.data};
        case allActions.onLoadComplete:
            // loaded definitionModel
            return {definitionModel: action.data, dialog: initializeDialog(action.data), loadingError: null};
        case allActions.onOEMSelected:
            return {definitionModel: state.definitionModel, dialog: changeContextOEM(state.dialog, action.data)};
        default:
            console.info("Readucer: unhandled action type:", action);
    }

    return state;
}