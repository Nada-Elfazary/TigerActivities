const { createProxyMiddleware } = require('http-proxy-middleware');

//function searchResults(req, res)
//{
//   res = 'Bob was here';
//}

module.exports = function(app) {
   
   //app.get('/searchresults', searchResults);
console.log("inside setup proxy")
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://tigeractivities.onrender.com',
      changeOrigin: true
    })
  );
};

