/**
* @overview This file provides the {@link bartificer.PromisedWindow} namespace which provides the entire API.
* @author Bart Busschots
* @license BSD-2-Clause
* @version 0.0.1
*/

// init the bartificer namespace safely

/**
 * The namespace used by Bartificer Creations when publishing JavaScript APIs.
 * @namespace
 */
var bartificer = bartificer ? bartificer : {};

// add all the API's functionality within a self-executing anonymous function
((bartificer, $, undefined)=>{
    // initialise the bartificer.PromisedWindow namespace
    
    /**
     * The class containing all the functions as static functions.
     */
    bartificer.PromisedWindow = class{
        /**
         * A Promise wrapper around `window.confirm()`.
         *
         * @param {String} [messaage='Are you sure?'] The message to include within the alert dialogue.
         * @param {*} [resolveTo=true] The value the conirmation promise should resolve to.
         * @param {boolean} [rejectOnCancel=true] Reject the promise if the user does not confirm, if set to `false` the promise resolves as `false` when the user cancels the confirmation.
         * @param {String} [rejectErrorMessage='Confirmation Refused'] The error message to reject the Promise with if the user does not confirm. 
         * @returns {Promise} Resturns a Promise that resovlves when the user accepts the confirmation, and rejects when they do not.
         */
         static confirm(message='Are you sure?', resolveTo=true, rejectOnCancel=true, rejectErrorMessage='Confirmation Refused'){
            // force all the types to be as expected
            message = String(message);
            rejectOnCancel = rejectOnCancel ? true : false;
            rejectErrorMessage = String(rejectErrorMessage);
            
            // build the Promise to return
            return new Promise(function (resolve, reject) {
                // get confirmation and react appropriately
                if(window.confirm(message)){
                    return resolve(resolveTo);
                }
                
                // not confirmed
                if(rejectOnCancel){
                    throw new Error(rejectErrorMessage);
                }
                resolve(false);
            });
         }
    };
})(bartificer, jQuery);