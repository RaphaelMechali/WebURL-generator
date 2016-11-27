export const allActions = {

    /* ----- Loading ----- */
    onLoadComplete: 'onLoadComplete',
    onLoadFailed: 'onLoadFailed',
    onContextValueSelected: 'onContextValueSelected'
};

/**
 * Action factory
 */
export const actionFactory = {

    /**
     * Common action builder (classes are forbidden here by Redux)
     * @param type action type
     * @param data action data
     * @return {*} built action containing object
     */
    buildAction(type, data = {}){
        return {type, data};
    },

    buildLoadFailed(errorMessage) {
        return this.buildAction(allActions.onLoadFailed, errorMessage);
    },

    buildLoadComplete(loadedData) {
        return this.buildAction(allActions.onLoadComplete, loadedData);
    },

    buildContextSelection(fieldName, selectedValue){
        return this.buildAction(allActions.onContextValueSelected, {fieldName, selectedValue});
    }

};
