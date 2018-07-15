function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    let product = $('input.custom-select');
    let price = $('#price');
    let quantity = $('#quantity');
    let submit = $('#submit');
    let capacity = $('#capacity');
    let totalPrice = $('#sum');
    let capacitySum = 0;
    let priceSum = 0;
    product.on('input', function () {
        submit.removeAttr('disabled');
    });
    submit.on('click', function () {
        capacitySum += +quantity.val();
        priceSum += +price.val();
        $('ul.display')
            .append($('<li>').text(`Product: ${product.val()} Price: ${price.val()} Quantity: ${quantity.val()}`));
        if (capacitySum >= 150) {
            totalPrice.val(priceSum);
            capacity.val('full').addClass('fullCapacity');
            product.attr('disabled', '');
            price.attr('disabled', '');
            quantity.attr('disabled', '');
			submit.off();
        } else {
            capacity.val(capacitySum);
            totalPrice.val(priceSum);
        }
        product.val(undefined);
        price.val(1);
        quantity.val(1);
    })
}