'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'imageTextButtonOverlay-' + context.component.getID();

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
        model.textTopPad = content.text_top_pad;

        model.textAlign = content.text_align;
        model.textMaxWidth = content.text_max_width;
        model.textFloat = content.text_float;
        model.textBg = content.text_bg;
        model.textMargin = content.text_margin;
    }
    if (content.show_button) {
        model.buttonURL = (content.button_url) ? content.button_url : URLUtils.url('Home-Show');
        model.buttonText = content.button_text;
        model.buttonColour = content.button_colour;
        model.buttonTextColour = content.button_text_colour;
        model.buttonTextSize = content.button_text_size;
        model.buttonPadding = content.button_padding;
        model.buttonAlign = content.button_align;
        model.buttonTextAlign = content.button_text_align;
        model.buttonBorderRad = content.border_radius;
        model.buttonMarginLeft = content.button_margin_left;
        model.buttonMarginTop = content.button_margin_top;
    }

    model.bg_height = content.bg_height;
    if (content.bg_type === 'Image') {
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
        model.imageBorderRadius = content.img_border_radius;
    }

    if (content.bg_type === 'Video') {
        model.showVideo = 'block';
        model.videoUrl = content.video_url;
    } else {
        model.showVideo = 'none';
    }

    return new Template('experience/components/telco_assets/imageWithButtonTextOverlay').render(model).text;
};
