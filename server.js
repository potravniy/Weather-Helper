var fs = require('fs')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var secret = require('./secret.json')
var proxy = require('express-http-proxy')
var includes = require('lodash/includes')
var Express = require('express')
var app = new Express()
var port = 3127

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('/weather', proxy("https://api.darksky.net/forecast/", {
  forwardPath: function(req, res){
    if( isTrusted(req.header('Referer')) ){
      return "https://api.darksky.net/forecast/" + secret.darksky + req.url
    } else {
      sendDeclineMsg(res)
      return null
    }
  }
}))
app.use('/coords', proxy("https://www.googleapis.com/geolocation/v1/geolocate?key=", {
  forwardPath: function(req, res){
    if( isTrusted(req.header('Referer')) ){
      return "https://www.googleapis.com/geolocation/v1/geolocate?key=" + secret.google
    } else {
      sendDeclineMsg(res)
      return null
    }
  }
  // ,intercept: function(rsp, data, req, res, callback) {
  //   data = JSON.parse(data.toString('utf8'));
  //   console.log("intercept: ", JSON.stringify(data))
  //   callback(null, JSON.stringify(data))
  // }
}))
app.use('/google', proxy("https://maps.googleapis.com/maps/api/js?key=", {
  forwardPath: function(req, res){
    if( isTrusted(req.header('Referer')) ){
      return "https://maps.googleapis.com/maps/api/js?key=" + secret.google +"&"+ req._parsedUrl.query
    } else {
      sendDeclineMsg(res)
      return null
    }
  }
}))

app.use(Express.static(__dirname + '/dist'))

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})

function isTrusted(referer){
  return includes(secret.corsWhiteList, referer)
}
function sendDeclineMsg(res){
  res.json({
    "error": true,
    "msg": "Cross origin requests are not allowed."
  })
}