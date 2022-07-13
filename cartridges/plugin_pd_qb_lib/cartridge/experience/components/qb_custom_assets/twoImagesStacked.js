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

    model.id = 'two-images-stacked-' + context.component.getID();

    if (content.image_top) {
        model.imageTop = {
            src: {
                mobile: ImageTransformation.url(content.image_top, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image_top, { device: 'desktop' })
            },
            alt: content.image_top.file.getAlt(),
            focalPointX: (content.image_top.focalPoint.x * 100) + '%',
            focalPointY: (content.image_top.focalPoint.y * 100) + '%'
        };
    }

    if (content.image_bottom) {
        model.imageBottom = {
            src: {
                mobile: ImageTransformation.url(content.image_bottom, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image_bottom, { device: 'desktop' })
            },
            alt: content.image_bottom.file.getAlt(),
            focalPointX: (content.image_bottom.focalPoint.x * 100) + '%',
            focalPointY: (content.image_bottom.focalPoint.y * 100) + '%'
        };
    }

    return new Template('experience/components/qb_custom_assets/twoImagesStacked').render(model).text;
};
