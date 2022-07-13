'use strict';

var server = require('server');

server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
    var omnioutHelper = require('*/cartridge/scripts/omniout/omnioutHelper');

    if (omnioutHelper.isOmniOutPage(req.querystring.cid)) {
        res.render('vlocity/omniout/page', { sid: req.querystring.cid });
        this.done(req, res);
        return;
    }

    next();
});

module.exports = server.exports();
