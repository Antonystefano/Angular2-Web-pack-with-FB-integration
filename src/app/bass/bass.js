var g_point2 = 1;
var multiplier2 = 1;
var nOfCorrect2 = 0;

var gCorrect2 = 0;
var gWrong2 = 0;

function StartStaff2() {

    g_point2 = 1;
    multiplier2 = 1;
    nOfCorrect2 = 0;
    gCorrect2 = 0;
    gWrong2 = 0;

    var notes = ["C", "D", "E", "F", "G", "A", "B"];
    var accs = ["", "#", "b"];
    var note;
    var accidental;
    var octave;

    function showNote(data) {
        // staff1.showNote(data.n, data.a, data.o);
        staff2.showNote(data.n, data.a, data.o);
    }

    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    function randomNote() {
        note = randInt(6);
        accidental = randInt(2);
        octave = randInt(2);
        showNote({ n: note, a: accidental, o: octave });

        console.log("Shown note: " + notes[note] + " " + accs[accidental])
    }
    // staff1 = (new StaffEngine('holder1', 1.5));
    staff2 = (new StaffEngine('holder2', 1.5));
    staff2.setStaveMode(2); //bass

    //staff2.setS
    randomNote();

    var btnArray = [];
    for (var a = 0; a < accs.length; a++)
        for (var i = 0; i < 7; i++) {
            var btn = $("<button style='width:80px;'>")
                .text(notes[i] + accs[a]).data({ n: i, a: a, o: 1 /* octave: 0, 1, 2 */ })
                .click(btnClick);
            btn.mouseup(function() { $(this).blur() });
            if (a == 0) btn.addClass("btn btn-warning");
            if (a == 1) btn.addClass("btn btn-success");
            if (a == 2) btn.addClass("btn btn-info");
            btnArray.push(btn);
            // $('#buttons').append(btn);
        }

    var temp;
    for (var i = 0; i < 7; i++) {
        temp = btnArray[i];
        btnArray[i] = btnArray[7 + i];
        btnArray[7 + i] = temp;
    }
    for (var i = 0; i < btnArray.length; i++) {
        $('#buttons').append(btnArray[i]);
    }



    function btnClick(obj) {
        var elm = $(this);
        data = elm.data()
        if (data.n == note && data.a == accidental) {
            gCorrect2++;
            multiplier2 = Math.round(nOfCorrect2 / 5 + 1);
            nOfCorrect2++;
            g_point2 += multiplier2 * nOfCorrect2;
            $("#id_right").toggle();
            setTimeout(function() { $("#id_right").toggle(); }, 500);
        } else {
            gWrong2++;
            var curPoint = g_point2 - Math.round((multiplier2 * nOfCorrect2) / 2);
            if (curPoint < 1) g_point2 = 1;
            else g_point2 = curPoint;
            multiplier2 = 1;
            nOfCorrect2 = 0;
            $("#id_wrong").toggle();
            setTimeout(function() { $("#id_wrong").toggle(); }, 500);
        }
        randomNote();

    }
}

function timeOut2() {
    $('#mypoint').text(g_point2);
    // document.location = "./#/home/bass/fbshare";
}

function resumeGame2() {
    $("#id_stop").toggle();
}

function stopGame2() {
    // document.location = "./#/home";
}