/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var model = new HashMap();
    var content = context.content;

    model.id = 'three-product-tile-' + context.component.getID();

    var productTileParams1 = {
        pview: 'tile',
        pid: content.product1.ID
    };
    model.productTileParams1 = productTileParams1;
    var product1 = ProductFactory.get(productTileParams1);

    var productUrl1 = URLUtils.url('Product-Show', 'pid', product1.id).relative().toString();
    model.product1 = product1;
    model.urls = {
        product1: productUrl1
    };

    var productTileParams2 = {
        pview: 'tile',
        pid: content.product2.ID
    };
    model.productTileParams2 = productTileParams2;
    var product2 = ProductFactory.get(productTileParams2);

    var productUrl2 = URLUtils.url('Product-Show', 'pid', product2.id).relative().toString();
    model.product2 = product2;
    model.urls = {
        product2: productUrl2
    };

    var productTileParams3 = {
        pview: 'tile',
        pid: content.product3.ID
    };
    model.productTileParams3 = productTileParams3;
    var product3 = ProductFactory.get(productTileParams3);

    var productUrl3 = URLUtils.url('Product-Show', 'pid', product3.id).relative().toString();
    model.product3 = product3;
    model.urls = {
        product3: productUrl3
    };

    if (content.image) {
        model.imageHead = {
            src: {
                mobile: ImageTransformation.url(content.image, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt: content.image.file.getAlt(),
            focalPointX: (content.image.focalPoint.x * 100) + '%',
            focalPointY: (content.image.focalPoint.y * 100) + '%'
        };
        model.imageLink = (content.image_link) ? content.image_link : URLUtils.url('Home-Show');
    }

    return new Template('experience/components/qb_custom_assets/threeProductTile').render(model).text;
};
