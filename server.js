var http = require('http');
var fs = require('fs');
var url = require('url');
var dns = require('dns');

var urlar = [], k=0, urlobj = {};
var port = process.env.PORT || 8080;
function isString(arg) {
  return typeof arg === 'string';
}
var server = http.createServer(function(req, res){  
    var obj = url.parse(req.url, true), data;
    var urlForData = obj.path.slice(5,obj.path.length);
    var urlForDns = obj.path.split('/')[4];
    //var qqq = isString(urlForDns);
    //console.log('isString qqq: ',qqq);
    console.log(urlForDns);
    var num = Math.floor((Math.random() * 10) + 1);  
    //console.log('obj path length: ',obj.path.toString().length,' obj.path: ',obj.path);
    if(obj.path.length === 1){
        res.writeHead(200,{'content-type':'text/html'});
        var html = fs.readFileSync(__dirname+'/index.htm');
        res.end(html);        
    }else{
        var sss = 'www.kolesa.kz';
        console.log(sss === urlForDns);
        dns.resolve(sss, function(err) {
            if (err){
                res.writeHead(200,{'content-type':'application/json'});
                res.end(JSON.stringify(err));
            }
            else{                     
                data = {
                    original_url: urlForData,
                    short_url: 'localhost:8080/'+num
                }     
                res.writeHead(200,{'content-type':'application/json'});
                res.end(JSON.stringify(data));              
            }
        });
    }
});

                 
               /* if(req.url === data.short_url){
                    res.writeHead(302, {'Location': urlForData});
                    res.end(); 
                }else{
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end("There is no URL assigned to given number");
                } */
server.listen(port, function(){
	console.log('Our app is running on http://localhost:'+port);
});   






        



