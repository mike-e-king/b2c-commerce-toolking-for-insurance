/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'html-editor-' + context.component.getID();
    model.htmlInput = content.html_input;

    return new Template('experience/components/qb_custom_assets/htmlEditor').render(model).text;
};
