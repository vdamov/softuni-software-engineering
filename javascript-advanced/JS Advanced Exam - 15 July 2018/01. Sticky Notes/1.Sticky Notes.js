function addSticker() {
    let title = $('.title');
    let content = $('.content');
    let button = $('<a>').addClass('button').text('x').on('click', function () {
       $(this).parent().remove()
    });

    if (title.val().length > 0 && content.val().length > 0) {
        $('#sticker-list')
            .append($('<li>').addClass('note-content')
                .append(button)
                .append($('<h2>').text(`${title.val()}`))
                .append($('<hr>'))
                .append($('<p>').text(`${content.val()}`)))

        title.val(undefined)
        content.val(undefined)
    }
}