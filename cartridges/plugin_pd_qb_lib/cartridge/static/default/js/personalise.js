/*function togglePersonaliser(){
    var personaliser = document.getElementById('personaliser');
    if (personaliser.style.display === "none") {
        personaliser.style.display = "block";
    } else {
        personaliser.style.display = "none";
    }
}*/

function typeText(text) {
    document.getElementById('text-overlay').innerHTML = text;
}

function selectColour(threadColour){
    document.getElementById('text-overlay').style.color=threadColour;
}

function addToCartPersonalisedBtn(url,pid) {
    var addToCartUrl = '/on/demandware.store/Sites-RefArchGlobal-Site/en_GB/Cart-AddProduct';

    $('body').trigger('product:beforeAddToCart', this);

    if ($('.set-items').length && $(this).hasClass('add-to-cart-global')) {
        setPids = [];
        $('.product-detail').each(function () {
            if (!$(this).hasClass('product-set-detail')) {
                setPids.push({
                    pid: pid,
                    qty: 1,
                    options: getOptions($(this))
                });
            }
        });
    }

    var $productContainer = $(this).closest('.product-detail');
    if (!$productContainer.length) {
        $productContainer = $(this).closest('.quick-view-dialog').find('.product-detail');
    }

    var form = {
        pid: pid,
        quantity: 1
    };

    if (addToCartUrl) {
        $.ajax({
            url: addToCartUrl,
            method: 'POST',
            data: form,
            beforeSend: function( xhr ) {
                console.log('in cart before ',xhr);
            },
            success: function (data) {
                handlePostCartAdd(data);
                $('body').trigger('product:afterAddToCart', data);
                document.getElementById('personaliser-msg-error').style.display = "none";
                $.spinner().stop();
            },
            error: function () {
                $.spinner().stop();
            }
        });
    }
}

/**
 * Updates the Mini-Cart quantity value after the customer has pressed the "Add to Cart" button
 * @param {string} response - ajax response from clicking the add to cart button
 */
function handlePostCartAdd(response) {
    $('.minicart').trigger('count:update', response);
    var messageType = response.error ? 'alert-danger' : 'alert-success';
    // show add to cart toast
    if (response.newBonusDiscountLineItem
        && Object.keys(response.newBonusDiscountLineItem).length !== 0) {
        chooseBonusProducts(response.newBonusDiscountLineItem);
    } else {
        if ($('.add-to-cart-messages').length === 0) {
            $('body').append(
            '<div class="add-to-cart-messages"></div>'
            );
        }

        $('.add-to-cart-messages').append(
            '<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">'
            + response.message
            + '</div>'
        );

        setTimeout(function () {
            $('.add-to-basket-alert').remove();
        }, 5000);
    }
}