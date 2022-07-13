/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'instagramTiles-' + context.component.getID();

    model.image1 = content.image_1;
    model.image2 = content.image_2;
    model.image3 = content.image_3;
    model.image4 = content.image_4;
    model.image5 = content.image_5;
    model.image6 = content.image_6;
    model.image7 = content.image_7;

    model.linkUrl = (content.content_link) ? content.content_link : URLUtils.url('Home-Show');

    model.displayHeader = (content.show_header) ? 'block' : 'none';

    if (content.show_header) {
        model.displayHeader = 'block';
        model.hashtag = content.hashtag;
        model.instaProfile = content.insta_profile;
        model.highlightColour = content.highlight_colour;
    } else {
        model.displayHeader = 'none';
    }

    return new Template('experience/components/qb_custom_assets/instagramTiles').render(model).text;
};
