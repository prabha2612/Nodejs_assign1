const fs = require('fs');

const requesthandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('head><title>This is MY NodeJs Assignment1</title><head>');
        res.write('</html>');
        return res.end();
    }

    if( url === '/create/')
}

exports.requesthandler = requesthandler;