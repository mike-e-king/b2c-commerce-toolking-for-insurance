'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

// eslint-disable-next-line valid-jsdoc
/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'personalise-' + context.component.getID();

    var product = content.product;
    if (product) {
        model.productName = product.name;
        model.productId = product.ID;
        var images = product.getImages('medium');
        var productImage = images.iterator().next();
        if (productImage) {
            model.productImage = {
                src: productImage.getAbsURL(),
                alt: productImage.getAlt()
            };
        }
    }

    model.colour1 = (content.colour_1 == null) ? 'black' : content.colour_1;
    model.colour2 = (content.colour_2 == null) ? 'red' : content.colour_2;
    model.colour3 = (content.colour_3 == null) ? 'blue' : content.colour_3;
    model.colour4 = (content.colour_4 == null) ? 'green' : content.colour_4;
    model.bodyFontStyle = (content.body_font_style == null) ? 'default' : content.body_font_style;
    model.bodyFontSize = content.body_font_size;
    model.fontStyle = content.font_style;
    model.fontSize = content.font_size;
    model.text_rotation = content.textRotation;
    model.textLeft = (content.text_left == null) ? '25' : content.text_left;
    model.textTop = (content.text_top == null) ? '50' : content.text_top;

    return new Template('experience/components/qb_custom_assets/personalise').render(model).text;
};
