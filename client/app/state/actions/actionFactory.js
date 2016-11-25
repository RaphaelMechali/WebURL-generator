export const allActions = {

    /* ----- Loading ----- */
    onLoadComplete: 'onLoadComplete',
    onLoadFailed: 'onLoadFailed',
    onOEMSelected: 'onOEMSelected',
    onServiceSelected: 'onOEMSelected'

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

    buildLoadComplete(loadedData) {
        return this.buildAction(allActions.onLoadComplete, loadedData);
    },

    buildOEMSelected(oem){
        return this.buildAction(allActions.onOEMSelected, oem);
    },

    buildServiceSelected(service){
        return this.buildAction(allActions.onServiceSelected, service);
    },

    buildLoadFailed(errorMessage) {
        return this.buildAction(allActions.onLoadFailed, errorMessage);
    }

}
