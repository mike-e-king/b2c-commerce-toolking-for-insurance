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

    model.id = 'iframe-embed-video-' + context.component.getID();
    model.embedUrl = content.embed_url;
    model.videoWidth = content.video_width;
    model.videoHeight = content.video_height;

    return new Template('experience/components/qb_custom_assets/iframeEmbedVideo').render(model).text;
};
