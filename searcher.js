const popupDialog = (title, imageSrc) => `<div id="dialog" title="${title}"><img style="height: 250px; width: 100%;" src="${imageSrc}" /></div>`;
document.body.addEventListener('mouseup', () => {
  const { startOffset, endOffset, commonAncestorContainer: { data } } = window.getSelection().getRangeAt(0);
  if (data && endOffset > startOffset) {
    const parentElement = window.getSelection().focusNode.parentElement;
    $.get(`http://localhost:8080/search?query=${data.substring(startOffset, endOffset).replace(/[^a-zA-Z- ]/g, '').trim()}`,
    (data, status) => {
      if (status === 'success' && data.length) {
        const { title, originalUrl } = data.find(res => res.originalUrl !== "");
        $(parentElement).append(popupDialog(title, originalUrl));
        const imageDialog = $('#dialog');
        imageDialog.dialog({
          open: (event, ui) => {
            $('.ui-dialog-titlebar-close', ui.dialog | ui).hide();
            $('.ui-dialog').css('z-index', 9999);
          }
        });
        imageDialog.dialog('open');
      }
    });
  }
});
document.addEventListener('click', () => {
  $('#dialog').remove();
});
