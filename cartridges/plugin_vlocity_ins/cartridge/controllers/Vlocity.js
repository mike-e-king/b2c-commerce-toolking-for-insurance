'use strict';

var server = require('server');
var omnioutHelper = require('*/cartridge/scripts/omniout/omnioutHelper');

server.get('OmniOutList', function (req, res, next) {
    res.render('vlocity/omniout/list', {
        scripts: omnioutHelper.getAvailableScripts()
    });

    next();
});

server.get('OmniOutPage', function (req, res, next) {
    var scriptId = req.querystring.sid;
    var test1 = req.querystring.sid;
    var test2 = req.querystring.cid;
    var pageData = omnioutHelper.getPageData(scriptId);
    res.render('vlocity/omniout/index', pageData);
    next();
});

server.get('OmniOutScript', function (req, res, next) {
    var scriptId = req.querystring.sid;
    if (scriptId) {
        scriptId = '' + scriptId;
        scriptId = scriptId.replace(/\.json$/i, '');
    }
    var scriptContent = omnioutHelper.getLocalScript(scriptId);

    if (scriptContent) {
        res.setContentType('application/json');
        res.base.writer.print(scriptContent);
        return;
    }
    res.setStatusCode(404);
    res.render('error/notFound');

    next();
});

module.exports = server.exports();
