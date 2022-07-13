/* eslint-disable require-jsdoc */
'use strict';

function isOmniOutPage(cid) {
    var ContentMgr = require('dw/content/ContentMgr');

    var contentAsset = ContentMgr.getContent(cid);

    if (contentAsset && contentAsset.template === 'vlocity/omniout/page') {
        return true;
    }

    return false;
}

function getLocalScript(scriptId) {
    var scriptContent = null;

    if (scriptId) {
        var ContentMgr = require('dw/content/ContentMgr');
        var contentAsset = ContentMgr.getContent(scriptId);

        if (contentAsset && contentAsset.custom && 'body' in contentAsset.custom && contentAsset.custom.body && contentAsset.custom.body.source) {
            scriptContent = contentAsset.custom.body.source;
        }
    }

    return scriptContent;
}

var HASH_TEMPLATE = '#/OmniScriptType/{OmniScriptType}/OmniScriptSubType/{OmniScriptSubType}/OmniScriptLang/{OmniScriptLang}/ContextId//PrefillDataRaptorBundle//false';

function getHash(scriptId) {
    if (scriptId) {
        var arrTmp = scriptId.split('_');

        if (arrTmp.length === 3) {
            var omniScriptType = arrTmp[0];
            var omniScriptSubType = arrTmp[1];
            var omniScriptLang = arrTmp[2];

            return HASH_TEMPLATE
                .replace('{OmniScriptType}', omniScriptType)
                .replace('{OmniScriptSubType}', omniScriptSubType)
                .replace('{OmniScriptLang}', omniScriptLang);
        }
    }

    return null;
}

function getPageData(scriptId) {
    var isLocal = getLocalScript(scriptId)
        ? 'true'
        : 'false';

    var AuthToken = require('*/cartridge/scripts/models/authToken');
    var authToken = new AuthToken();
    var token = authToken.getValidToken();

    // Read this from vlocity.auth service credential
    var pageHash = getHash(scriptId);

    var Site = require('dw/system/Site');
    // var sfdcNamespace = Site.current.getCustomPreferenceValue('vlocity_cmt_NamespaceForDCAPI');
    var sfdcNamespace = 'vlocity_ins'
    var scriptDefPath = require('dw/web/URLUtils').url('Vlocity-OmniOutScript', 'sid', '');

    return {
        accessToken: token.access_token,
        instanceURL: token.instance_url,
        sfdcNamespace: sfdcNamespace,
        forceLocalDef: isLocal,
        scriptDefPath: scriptDefPath,
        pageHash: pageHash
    };
}

function getAvailableScripts() {
    var ContentMgr = require('dw/content/ContentMgr');
    var scriptsFolder = ContentMgr.getFolder('omniout');

    if (scriptsFolder && scriptsFolder.content && scriptsFolder.content.length) {
        return scriptsFolder.onlineContent;
    }

    return null;
}

module.exports.getLocalScript = getLocalScript;
module.exports.getPageData = getPageData;
module.exports.isOmniOutPage = isOmniOutPage;
module.exports.getAvailableScripts = getAvailableScripts;
