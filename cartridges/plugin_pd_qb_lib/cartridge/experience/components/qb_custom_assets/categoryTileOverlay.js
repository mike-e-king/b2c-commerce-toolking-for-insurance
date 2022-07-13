/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'categoryTileOverlay-' + context.component.getID();

    model.textDisplay = (!content.show_text) ? 'none' : 'block';
    model.buttonDisplay = (!content.show_button) ? 'none' : 'block';

    if (content.text) {
        model.text = content.text;

        model.textSize = content.text_size;
        model.textColour = content.text_colour;

        model.textAlign = content.text_align;
        model.circleWidth = content.circle_width;
        model.textBgColour = content.text_bg_colour;
        model.textPad = content.text_pad;
    }

    model.linkUrl = (content.link_url) ? content.link_url : URLUtils.url('Home-Show');

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
        model.imageHeight = content.image_height;
        model.imageWidth = content.image_width;
    }

    return new Template('experience/components/qb_custom_assets/categoryTileOverlay').render(model).text;
};
