// Example usage: `app.all('*', corsMiddleware);`

module.exports = function(req, res, next){
    if (!req.get('Origin')) {
        next();
        return;
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' === req.method) {
        res.send(200);
        return;
    }
    next();
};