/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var model = new HashMap();
    var content = context.content;

    model.id = 'productRecommendations-' + context.component.getID();

    var productTileParams1 = {
        pview: 'tile',
        pid: content.product1.ID
    };
    model.productTileParams1 = productTileParams1;
    var product1 = ProductFactory.get(productTileParams1);

    model.productUrl1 = URLUtils.url('Product-Show', 'pid', product1.id).relative().toString();
    model.product1 = product1;

    var productTileParams2 = {
        pview: 'tile',
        pid: content.product2.ID
    };
    model.productTileParams2 = productTileParams2;
    var product2 = ProductFactory.get(productTileParams2);

    model.productUrl2 = URLUtils.url('Product-Show', 'pid', product2.id).relative().toString();
    model.product2 = product2;

    var productTileParams3 = {
        pview: 'tile',
        pid: content.product3.ID
    };
    model.productTileParams3 = productTileParams3;
    var product3 = ProductFactory.get(productTileParams3);

    model.productUrl3 = URLUtils.url('Product-Show', 'pid', product3.id).relative().toString();
    model.product3 = product3;

    var productTileParams4 = {
        pview: 'tile',
        pid: content.product4.ID
    };
    model.productTileParams4 = productTileParams4;
    var product4 = ProductFactory.get(productTileParams4);

    model.productUrl4 = URLUtils.url('Product-Show', 'pid', product4.id).relative().toString();
    model.product4 = product4;

    model.highlightColour = content.highlight_colour;
    model.title = (content.title) ? content.title : 'RECOMMENDED FOR YOU';

    return new Template('experience/components/qb_custom_assets/productRecommendations').render(model).text;
};
