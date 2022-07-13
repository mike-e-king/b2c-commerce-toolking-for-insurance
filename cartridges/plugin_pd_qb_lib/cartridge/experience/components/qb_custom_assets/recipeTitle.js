/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'recipe-title-' + context.component.getID();

    model.recipeTitle = content.recipe_title;

    model.recipeDescr = content.recipe_descr;
    model.recipeFeeds = content.recipe_feeds;
    model.recipeTime = content.recipe_time;
    model.textFont = content.text_font;
    model.textAlign = content.text_align;

    if (content.image) {
        model.image = {
            src: {
                mobile: ImageTransformation.url(content.image, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt: content.image.file.getAlt(),
            focalPointX: (content.image.focalPoint.x * 100) + '%',
            focalPointY: (content.image.focalPoint.y * 100) + '%'
        };
    }

    return new Template('experience/components/qb_custom_assets/recipeTitle').render(model).text;
};
