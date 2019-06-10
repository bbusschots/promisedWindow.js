import is from 'is_js';

/**
 * A Promise wrapper around `window.confirm()`.
 *
 * @param {String} [messaage='Are you sure?'] The message to include within the confirmation dialogue.
 * @param {object} [options={}]
 * @param {*} [options.confirmValue=true] The value the promise should resolve to when the user confirms.
 * @param {*} [options.declineValue=false] The value the promise should resolve to when the user declines.
 * @param {boolean} [options.rejectOnDecline=true] Reject the promise if the user does not confirm, if set to `false` the promise resolves as `options.declineValue` when the user cancels the confirmation.
 * @param {String} [options.declineErrorMessage='Confirmation Refused'] The error message to reject the Promise with if the user does not confirm. 
 * @returns {Promise} Resturns a Promise that resolves or rejects when the user accepts or declines the confirmation.
 */
function confirm(message='Are you sure?', options={}){
    // force all the types to be as expected
    message = is.string(message) ? message : String(message);
    options = is.object(options) ? options : {};
    options.confirmValue = is.undefined(options.confirmValue) ? true : options.confirmValue;
    options.declineValue = is.undefined(options.declineValue) ? false : options.declineValue;
    if(is.undefined(options.rejectOnDecline)) options.rejectOnDecline = true;
    options.rejectOnDecline = options.rejectOnDecline ? true : false;
    if(is.undefined(options.declineErrorMessage)) options.declineErrorMessage = 'Confirmation Refused';
    options.declineErrorMessage = is.string(options.declineErrorMessage) ? options.declineErrorMessage : String(options.declineErrorMessage);
    
    // build the Promise and return it
    return new Promise(function (resolve) {
        // get confirmation and react appropriately
        if(window.confirm(message)){
            return resolve(options.confirmValue);
        }
        
        // not confirmed
        if(options.rejectOnDecline){
            throw new Error(options.declineErrorMessage);
        }
        resolve(options.declineValue);
    });
}

/**
 * A Promise wrapper around `window.alert()`.
 *
 * @param {String} [messaage='Something happened!'] The message to include within the alert dialogue.
 * @param {object} [options={}]
 * @param {*} [options.resolveValue=true] The value the promise should resolve to when the user OKs the alert.
 * @returns {Promise} Resturns a Promise that resolves when the user OKs the alert.
 */
function alert(message='Something happened!?', options={}){
    // force all the types to be as expected
    message = is.string(message) ? message : String(message);
    options = is.object(options) ? options : {};
    options.resolveValue = is.undefined(options.resolveValue) ? true : options.resolveValue;
    
    // build the Promise and return it
    return new Promise(function (resolve) {
        // show the alert then resolve
        window.alert(message);
        resolve(options.resolveValue);
    });
}

/**
 * A Promise wrapper around `window.setTimeout()`.
 *
 * @param {function} delayedCallback - The function to execute when the timeout finishes.
 * @param {number} [delay=3000] - The delay before executing `delayedCallback` in milliseconds.
 * @param {Array} [callbackArgs=[]] - The argumenmts to pass when executing `delayedCallback`.
 * @param {object} [options={}]
 * @param {*} [options.resolveValue=true] The value the promise should resolve to when the user OKs the alert.
 * @returns {Promise} Resturns a Promise that resolves or rejects when the user accepts or declines the confirmation.
 */
function setTimeout(delayedCallback, delay=3000, callbackArgs=[], options={}){
    // Validate the callback & delay
    if(is.not.function(delayedCallback)) throw new TypeError('First parameter must be a callback');
    if(!String(delay).match(/^\d+$/)) throw new TypeError('Second parameter must be an integer');
    
    // force all the other types to be as expected
    callbackArgs = is.array(callbackArgs) ? callbackArgs : [];
    options = is.object(options) ? options : {};
    options.resolveValue = is.undefined(options.resolveValue) ? true : options.resolveValue;
    
    // build the Promise and return it
    return new Promise(function (resolve) {
        window.setTimeout(function(){
            delayedCallback(...callbackArgs);
            resolve(options.resolveValue);
        }, delay);
    });
}

export default {
    confirm, alert, setTimeout, timeout: setTimeout
};