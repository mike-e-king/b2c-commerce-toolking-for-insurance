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

    model.id = 'textButton-' + context.component.getID();

    model.textDisplay = (!content.show_text) ? 'none' : 'block';
    model.buttonDisplay = (!content.show_button) ? 'none' : 'block';

    if (content.show_text) {
        model.textDisplayHeader = (content.text_header != null) ? 'block' : 'none';
        model.textHeader = (content.text_header != null) ? content.text_header : '';
        model.textHeaderType = (content.text_header_type != null) ? content.text_header_type : 'h1';
        model.textDisplayBody = (content.text_body != null) ? 'block' : 'none';
        model.textBody = (content.text_body != null) ? content.text_body : '';

        model.textFontWeight = content.text_font_weight;
        model.textSize = content.text_size;
        model.textColour = content.text_colour;

        model.textAlign = (content.text_align) ? content.text_align : 'center';
    }
    if (content.show_button) {
        model.buttonURL = (content.button_url) ? content.button_url : URLUtils.url('Home-Show');
        model.buttonText = content.button_text;
        model.buttonColour = content.button_colour;
        model.buttonTextColour = content.button_text_colour;
        model.buttonTextSize = content.button_text_size;
        model.buttonPadding = content.button_padding;
        model.buttonAlign = content.button_align;
        model.buttonBorderRad = content.border_radius;
        model.buttonBorder = content.button_border;
    }

    model.topPicDisplay = (content.show_pic_top) ? 'block' : 'none';
    model.middlePicDisplay = (content.show_pic_middle) ? 'block' : 'none';
    if (content.image1) {
        model.image1 = {
            src: {
                mobile: ImageTransformation.url(content.image1, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image1, { device: 'desktop' })
            },
            alt: content.image1.file.getAlt(),
            focalPointX: (content.image1.focalPoint.x * 100) + '%',
            focalPointY: (content.image1.focalPoint.y * 100) + '%'
        };
    }

    model.imageTopAlign = (content.img_top_align) ? (content.img_top_align) : 'center';
    model.imgBorderRadius = content.img_border_radius;
    model.image2URL = content.image2_url;
    model.pic2Display = (content.image2_url != null) ? 'inline' : 'none';
    model.image3URL = content.image3_url;
    model.pic3Display = (content.image3_url != null) ? 'inline' : 'none';
    model.imageClass = (content.image3_url != null) ? 'threePicWidth' : '';

    model.imageHeight = content.image_height;
    model.imageWidth = content.image_width;

    return new Template('experience/components/qb_custom_assets/textImageButton').render(model).text;
};
