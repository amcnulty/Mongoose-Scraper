window.onload = function() {
  const removeFromSaves = function(articleId) {
    $.ajax({
      method: "PUT",
      url: "./remove-from-saves",
      data: {
        id: articleId
      }
    }).done(function(data, response, xhr) {
      // reload the page if response status is 200
      if (xhr.status === 200) {
        window.location.reload();
      }
    });
  }

  const handleArticleNotes = function(articleId) {
    const modalText = [
      "<div class='container-fluid text-center'>",
      "<h4>Notes For Article: ",
      articleId,
      "</h4>",
      "<hr />",
      "<ul class='list-group note-container'>",
      "</ul>",
      "<input type='text' class='form-control name-input' placeholder='Name'>",
      "<input type='email' class='form-control email-input' placeholder='Email'>",
      "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
      "<button class='btn btn-success save' data-id='" + articleId + "'>Save Note</button>",
      "</div>"
    ].join("");
    bootbox.dialog({
      message: modalText,
      closeButton: true
    });
    populateComments(articleId);
  }

  const populateComments = function(articleId) {
    $.ajax({
      method: 'GET',
      url: './all-comments/' + articleId
    }).done(function(data, response, xhr) {
      renderNotesList(data, articleId);
    });
  }

  const renderNotesList = function(data, articleId) {
    var notesToRender = [];
    var currentNote;
    if (!data.length) {
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    }
    else {
      for (var i = 0; i < data.length; i++) {
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            "Name: " + data[i].name,
            "<br>Comment: " + data[i].comment,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
        );
        currentNote.children("button").attr("data-id", data[i]._id);
        currentNote.children("button").attr("data-articleId", articleId);
        notesToRender.push(currentNote);
      }
    }
    $(".note-container").empty();
    $(".note-container").append(notesToRender);
  }

  const handleNoteSave = function(articleId) {
    var note = {
      id : articleId,
      name: $(".bootbox-body .name-input").val().trim(),
      email: $(".bootbox-body .email-input").val().trim(),
      comment: $(".bootbox-body textarea").val().trim()
    }
    if (note.comment) {
      $.ajax({
        method: 'POST',
        url: './add-comment',
        data: note
      }).done(function(data, response, xhr) {
        populateComments(articleId);
      });
    }
  }

  const handleNoteDelete = function(noteId, articleId) {
    $.ajax({
      method: 'DELETE',
      url: './delete-comment/' + articleId + '/' + noteId
    }).done(function(data, response, xhr) {
      populateComments(articleId);
    });
  }

  $(document).on("click", ".btn.notes", function(e) {
    handleArticleNotes($(e.target).attr('data-id'));
  });
  $(document).on("click", ".btn.save", function(e) {
    handleNoteSave($(e.target).attr('data-id'));
  });
  $(document).on("click", ".btn.note-delete", function(e) {
    handleNoteDelete($(e.target).attr('data-id'), $(e.target).attr('data-articleId'));
  });
  $(document).on('click', '.delete', function(e) {
    removeFromSaves($(e.target).attr('data-id'));
  });
}