var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var urlObj = url.parse(request.url);
        var pathname = urlObj.pathname;
        var query = urlObj.query;
        console.log("Request for " + pathname + " received." + " query: " + query);

        route(pathname, query, handle, response);
    }

    //http.createServer(onRequest).listen(8888);
    var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8888,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    http.createServer(onRequest).listen(port, ip);
    console.log("Server has started.");
}

exports.start = start;
