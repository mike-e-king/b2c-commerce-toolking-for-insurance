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

    if (content.text) {
        model.text = content.text;

        model.textSize = content.text_size;
        model.textColour = content.text_colour.value;

        model.textAlign = content.text_align;
        model.textBgColour = content.text_bg_colour.value;
        model.textBgHovColour = content.text_bg_hov_colour.value;
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
        model.imageWidth = content.image_width;
        model.imageBg = content.image_bg.value;
        model.imgPad = content.img_pad;
    }

    return new Template('experience/components/qb_custom_assets/topicTile').render(model).text;
};
