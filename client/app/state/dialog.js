/**
 * Dialog management module
 */


/**
 * Chain setter: set in cascade a current dialog attribute in next state model
 */
class ChainSetter {

    /**
     * Constructor
     * @param name chain setter name
     * @param attrName name of the attribute set
     * @param valuePoolName name of the possible values pool in context (for updating them a selection)
     * @param filterValidValues method to filter from definition model and current context the new possible values
     */
    constructor(name, attrName, valuePoolName, filterValidValues) {
        this.name = name;
        this.attrName = attrName;
        this.valuePoolName = valuePoolName;
        this.filterValidValues = filterValidValues;
    }


    /**
     * Update the value by picking it up, because parent change (not user chosen but induced by parent chain changes) and
     * update the possible values pool
     * It attempts to not change the selected element
     * @param definitionModel definition model
     * @param previousState previous state
     * @param nextState in/out parameter: new state, holding the parent chain setter values
     * @return set value for next chain element
     */
    updateChainElement(definitionModel, nextState, previousState = {}) {
        // previous state is not necessarily done here (we may be initializing the context)
        let validValues = this.filterValidValues(definitionModel, nextState);
        nextState[this.valuePoolName] = validValues;
        nextState[this.attrName] = this.pickBestMatch(validValues, previousState[this.attrName]);
    }

    /**
     * Unchanged chain element: copy the previous state but don't change it
     * @param nextState in/out parameter: new state, holding the parent chain setter values
     * @param previousState previous state
     * @return set value for next chain element
     */
    copyChainElement(nextState, previousState) {
        // pre : when user selects a sub value, the previous state is necessarily known
        nextState[this.valuePoolName] = previousState[this.valuePoolName];
        nextState[this.attrName] = previousState[this.attrName];
    }

    /**
     * Update the value by setting it to user chosen value and retrieve valid values from previous state
     * @param newValue new value
     * @param nextState in/out parameter: new state, holding the parent chain setter values
     * @param previousState previous state
     * @return set value for next chain element
     */
    setChainElement(newValue, nextState, previousState) {
        // pre : when user selects a new value, the previous state is necessarily known
        nextState[this.valuePoolName] = previousState[this.valuePoolName];
        nextState[this.attrName] = newValue;
    }

    /**
     * Picks up a new value in new valid values list, by preference:
     * - [value].value equality, if specified, to retrieve a corresponding value in new values
     * - [value].default if specified, to pick up a default value
     * - values[0] if list is not empty
     * @param validValues valid values
     * @param previousValue previous value
     * @returns {*}
     */
    pickBestMatch(validValues, previousValue) {
        // 1 - attempt to restore a next value corresponding the the current one (requires 'value' attribute in definition files)
        if (previousValue) {
            // attempt to retrieve an object with the same identifier
            let found = validValues.find(v => v.value && v.value === previousValue.value);
            if (found) {
                return found;
            }
        }

        // 2 - attempt to find a default value in list (requires default attribute in definition files)
        let defaultValue = validValues.find(v => v.default);
        if (defaultValue) {
            return defaultValue;
        }

        // no default nor matching current: return any if any
        if (validValues.length > 0) {
            return validValues[0];
        }
        // no possible value: return undefined
    }


}


/**
 * Collects revisions for oem as parameter
 * @param definitionModel definition model
 * @param oem oem
 * @returns filtered oem
 */
function collectOEMRevisions(definitionModel, oem) {
    return definitionModel.revisions.filter(rev => rev.oems.find(oemName => oemName === oem.value));
}

/**
 * Filter services on previously selected OEM
 * @param definitionModel definition model
 * @param nextState next state
 * @return selectable services
 */
function filterServices(definitionModel, nextState) {
    // 1 - gather revisions for selected OEM
    let oemRevisions = collectOEMRevisions(definitionModel, nextState.selectedOEM);
    // 2 - check service definition for matching revisions (using the dispatcher access definition, supposed to be done for available accesses)
    return definitionModel.services.filter(
        service => service["dispatcher-access"].some(
            access => access.revisions.some(revName => oemRevisions.find(revDef => revDef.value === revName))));
}


/**
 * Filter revisions on previously selected OEM end revision
 * @param definitionModel definition model
 * @param nextState next state
 * @return selectable services
 */
function filterRevisions(definitionModel, nextState) {
    // 1 - gather revisions for selected OEM
    let oemRevisions = collectOEMRevisions(definitionModel, nextState.selectedOEM);
    // 2 - gather revisions for service
    let flatServiceRev = nextState.selectedService["dispatcher-access"]
        .reduce((collected, access) => collected.concat(access.revisions.filter(rev => !collected.includes(rev))), []);
    // return intersection
    return oemRevisions.filter(revDef => flatServiceRev.includes(revDef.value));

}

const contextSettersChain = [
    // 1 - OEM
    new ChainSetter("oem", "selectedOEM", "availableOEMS", (definitionModel, _) => definitionModel.oems),
    // 2 - Service
    new ChainSetter("service", "selectedService", "availableServices", filterServices),
    // 3 - Revision
    new ChainSetter("revision", "selectedRevision", "availableRevisions", filterRevisions)
    // TODO "market", "subapp", "backend", "user"
];


export function createInitialDialogState(definitionModel) {
    // start by picking an oem value and the run the chain
    return updateChain(definitionModel); // index = -1 : update all elements
}


export function selectAttribute(definitionModel, previousDialogState, valueName, newValue) {
    let firstIndex = contextSettersChain.findIndex(setter => setter.name === valueName);
    // start by picking an oem value and the run the chain
    return updateChain(definitionModel, previousDialogState, firstIndex, newValue);
}

/**
 * Updates the context chain
 * @param definitionModel definition model
 * @param previousState previous state. Initialized if not provided
 * @param currentIndex current index in chain: first element if not provided
 * @param firstUpdateIndex
 * @param firstUpdateValue
 * @param nextState next state (input / output parameter). Initialized if not provided
 * @returns {*} next state value
 */
function updateChain(definitionModel, previousState = {}, firstUpdateIndex = -1, firstUpdateValue, currentIndex = 0, nextState = {}) {
    // break case : no more element in chain
    if (currentIndex >= contextSettersChain.length) {
        return nextState;
    }

    let currentChainSetter = contextSettersChain[currentIndex];
    if (currentIndex < firstUpdateIndex) {
        // just copy the value and move to next chain element
        currentChainSetter.copyChainElement(nextState, previousState);
    } else if (currentIndex === firstUpdateIndex) {
        // set the value (user chosen value from front end)
        currentChainSetter.setChainElement(firstUpdateValue, nextState, previousState);
    } else {
        // try to pick up a value, as a parent changed
        currentChainSetter.updateChainElement(definitionModel, nextState, previousState);
    }
    // update lower chain elements
    return updateChain(definitionModel, previousState, firstUpdateIndex, firstUpdateValue, currentIndex + 1, nextState);
}



