//open inAppBrowser
function openBrowser(url) {

    var target = '_blank';
    var options = "location=yes"
    var ref = cordova.InAppBrowser.open(url, target, options);

    ref.addEventListener('loadstart', loadstartCallback);
    ref.addEventListener('loadstop', loadstopCallback);
    ref.addEventListener('loadloaderror', loaderrorCallback);
    ref.addEventListener('exit', exitCallback);

    function loadstartCallback(event) {
        console.log('Loading started: ' + event.url)
    }

    function loadstopCallback(event) {
        console.log('Loading finished: ' + event.url)
    }

    function loaderrorCallback(error) {
        console.log('Loading error: ' + error.message)
    }

    function exitCallback() {
        console.log('Browser is closed...')
    }
}

$(document).on("pagecreate", function () {
    $("body > [data-role='panel']").panel();
    $("body > [data-role='panel'] [data-role='collapsible']").collapsible();
    $("body > [data-role='panel'] [data-role='listview']").listview();
});
/**
$(document).one("pageshow", function() {
    $("body > [data-role='header']").toolbar();
    $("body > [data-role='header'] [data-role='navbar']").navbar();
});
**/

var db;
window.onload = function () {
    document.getElementById('saveK').addEventListener('click', saveGame);
    db = window.openDatabase('storedGames', "1.0", "all stored Games", 200000);
}

function saveGame(e) {
    db.transaction(saveRecord, onSuccess, onError);
}

function saveRecord(transaction) {
    var title = document.getElementById('gameTitle').value;
    var gameKey = document.getElementById('gameKey').value;

    transaction.executeSql('CREATE TABLE IF NOT EXISTS storedGames (id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, GameKey TEXT NOT NULL) ');

    var sql = "INSERT INTO storedGames (title, gameKey) VALUES ('" + title + "', '" + gameKey + "')";
    console.log(sql);
    transaction.executeSql(sql);
}

function onSuccess() {
    console.log("Record Saved");
}

function onError(error) {
    console.log("SQL error: " + error.code);
}

// swipe functionality - should even work with a second menu on the left
$(document).on("pagecreate", "#page", function () {
    $(document).on("swipeleft swiperight", "#page", function (e) {
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#right-panel").panel("open");
            } else if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});
