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

    model.id = 'recipe-body-' + context.component.getID();

    model.ingredients = content.ingredients;
    model.method = content.method;
    model.textFont = content.text_font;
    model.textAlign = content.text_align;

    return new Template('experience/components/qb_custom_assets/recipeBody').render(model).text;
};
