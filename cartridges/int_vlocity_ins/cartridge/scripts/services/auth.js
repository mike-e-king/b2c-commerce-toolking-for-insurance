/* eslint-disable valid-jsdoc */
'use strict';

/**
 * @module services/auth
 */

/**
 * Vlocity AUTH service definition
 */

/**
 * @type {dw.system.Logger}
 */
var Logger = require('dw/system/Logger');
/**
 * @type {dw.system.Site}
 */
var Site = require('dw/system/Site');

/**
 * @type {module:util/helpers}
 */
var helpers = require('../util/helpers');

/**
 * @type {dw.system.Logger}
 */
var LOGGER = Logger.getLogger('int_vlocity_cmt', 'vlocity.auth');

/**
 * Attempt to set to site-specific credential to the given service. If it fails, fallback to the original ID
 *
 * @param  {dw.svc.HTTPService} svc
 * @param  {String} id
 *
 * @return {String}
 */
function setCredentialID(svc, id) {
    var siteID = Site.getCurrent().getID();
    var possibleIDs = [
        id + '-' + siteID,
        id
    ];

    possibleIDs.some(function (credentialID) {
        try {
            svc.setCredentialID(credentialID);
            return true;
        } catch (e) {
            return false;
        }
    });
}

var serviceDefinition = {
    /**
     * Create request for service authentication
     *
     * @param {dw.svc.HTTPService} svc
     *
     * @throws {Error} Throws error when service credentials are missing
     */
    createRequest: function (svc) {
        setCredentialID(svc, svc.getCredentialID() || svc.getConfiguration().getID());

        LOGGER.debug('Vlocity Connector credential ID: {0}', svc.getCredentialID());

        var svcCredential = svc.getConfiguration().getCredential();
        if (empty(svcCredential.getUser()) || empty(svcCredential.getPassword())) {
            throw new Error('Service configuration requires valid username and password');
        }

        if (empty(svcCredential.custom.vlocity_cmt_ClientId) || empty(svcCredential.custom.vlocity_cmt_ClientSecret)) {
            throw new Error('Service configuration requires valid client ID and secret');
        }

        svc.setAuthentication('NONE');
        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        svc.setRequestMethod('POST');
        svc.addParam('grant_type', 'password');
        svc.addParam('username', svcCredential.getUser());
        svc.addParam('password', svcCredential.getPassword());
        svc.addParam('client_id', svcCredential.custom.vlocity_cmt_ClientId);
        svc.addParam('client_secret', svcCredential.custom.vlocity_cmt_ClientSecret);
    },

    /**
     * @param {dw.svc.HTTPService} svc
     * @param {dw.net.HTTPClient} client
     *
     * @returns {Object}
     */
    parseResponse: function (svc, client) {
        var responseObj;

        try {
            responseObj = helpers.expandJSON(client.text, {});
            if (responseObj && responseObj.access_token) {
                var tempExpire = 3600000; // expire in 1 hr in ms
                var responseDate = new Date(responseObj.issued_at * 1);

                // Set the millisecond timestamp values
                responseObj.issued = responseDate.valueOf();
                responseObj.expires = responseDate.valueOf() + (tempExpire);
            }
        } catch (e) {
            responseObj = client.text;
            LOGGER.error('Unable to Authenticate: {0}', responseObj);
        }

        return responseObj;
    },

    mockCall: function () {
        var obj = {
            id: 'https://login.salesforce.com/id/00Dx0000000BV7z/005x00000012Q9P',
            issued_at: Date.now(), // Unix timestamp is in seconds, not milliseconds
            instance_url: 'https://sampleinstanceurl.salesforce.com/',
            signature: '0CmxinZir53Yex7nE0TD+zMpvIWYGb/bdJh6XfOH6EQ=',
            access_token: '00Dx0000000BV7z!AR8AQAxo9UfVkh8AlV0Gomt9Czx9LjHnSSpwBMmbRcgKFmxOtvxjTrKW19ye6PE3Ds1eQz3z8jr3W7_VbWmEu4Q8TVGSTHxs'
        };
        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: JSON.stringify(obj)
        };
    }
};

module.exports = serviceDefinition;
