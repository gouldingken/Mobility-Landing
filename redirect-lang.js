var _getSimplifiedLanguagePrefs = function (callback) {
    $.getJSON('http://api.sasaki.com/meta/headers/', function (json) {
        var langs = json.headers['accept-language'];
        var prefs = langs.split(',');
        var orderedSimplifiedLangs = [];
        $.each(prefs, function (i, lang) {
            var bits = lang.split(';');//optional right side is q=
            var simplified = bits[0].split('-')[0];
            if (orderedSimplifiedLangs.indexOf(simplified) < 0) {
                orderedSimplifiedLangs.push(simplified);
            }
        });
        callback(orderedSimplifiedLangs);
    });
};

if (location.search !== '?manual=true') {
    _getSimplifiedLanguagePrefs(function (languagePrefs) {
        var enPos = languagePrefs.indexOf('en');
        var esPos = languagePrefs.indexOf('es');
        if (esPos >= 0 && esPos < enPos) {
            window.location = 'es.html';
        }
    });
}
