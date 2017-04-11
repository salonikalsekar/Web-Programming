(function($) {
    var newForm = $("#new-form"),
      noteSummary = $("#note-summary"),
        noteDue = $("#note-due"),
        noteTitle = $("#note-title"),
        noteBody = $("#note-body");

    newForm.submit(function(event) {

        event.preventDefault();
         var summary = noteSummary.val();
        var due = noteDue.val();
        var body = noteBody.val();
        var title = noteTitle.val();
        var newContent = $("#new-content");

        if (!title || !summary || !due || !body) {
            $('#alert').removeClass('hidden');
            return;
        }
        var requestConfig = {
            method: "POST",
            url: "/new",
            contentType: 'application/json',
            data: JSON.stringify({
                title: title,
                summary: summary,
                due: due,
                body: body
            })
        };
        $.ajax(requestConfig).then(function(responseMessage) {
            window.location.href = "http://localhost:3000/new/" + responseMessage.id;
        });
    });

    let nbut = $('#nbut');
    let title = $('#ntitle');
     let summary = $('#nsumm');
    let body = $('#nbody');
    let dueDate = $('#ndd');
    let id = $('#nid');

    nbut.click(() => {
        var requestConfig = {
            method: "POST",
            url: "/new/nextNote",
            contentType: 'application/json',
            data: JSON.stringify({
                id: parseInt(id.text()[id.text().length - 1])
            })
        };
        $.ajax(requestConfig).then(function(res) {
            title.text("Note Title: " + res.title);
            dueDate.text("Due Date: " + res.due_date);
            summary.html("Note Summary: " + res.summary);
            body.html('Note Body: ' + res.body);
            id.text("Note ID: " + res.id);
        });
    })
})(window.jQuery);

