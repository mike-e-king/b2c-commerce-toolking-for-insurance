'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

// eslint-disable-next-line valid-jsdoc
/**
 * Render logic for the layouts.carousel.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    model.id = 'scroll-carousel-' + PageRenderHelper.safeCSSClass(context.component.getID());
    model.scrollInterval = (context.content.scroll_interval) ? context.content.scroll_interval : '5000';

    return new Template('experience/components/qb_custom_layouts/scrollCarousel').render(model).text;
};
