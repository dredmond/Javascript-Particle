var debugConsole = (function () {
    var e = null;

    this.init = function (id) {
        e = document.getElementById(id);
    };

    this.clear = function () {
        if (e && e.constructor == HTMLDivElement) {
            e.innerHTML = '';
        }
    };

    this.write = function (message) {
        if (e && e.constructor == HTMLDivElement) {
            e.innerHTML += message + '<br />';
        }
    };

    return {
        init: init,
        write: write,
        clear: clear
    };
})();