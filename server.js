var http = require('http');
var fs = require('fs');
var url = require('url');

var port = process.env.PORT || 8080;

var server = http.createServer(function(req, res){  
    var obj = url.parse(req.url, true), data;
    var urlForData = obj.path.slice(5,obj.path.length);
    var urlForValidating = obj.path.split('/')[4];
    var num = Math.floor((Math.random() * 10) + 1);  
    
    if(obj.path.length === 1){
        res.writeHead(200,{'content-type':'text/html'});
        var html = fs.readFileSync(__dirname+'/index.htm');
        res.end(html);        
    }else if(validateURL(urlForValidating)){                              
            data = {
                original_url: urlForData,
                short_url: 'localhost:8080/'+num
            }     
            res.writeHead(200,{'content-type':'application/json'});
            res.end(JSON.stringify(data)); 
    }else{
        errMes();
    }
    if(req.url === data.short_url){
        res.writeHead(302, {'Location': urlForData});
        res.end(); 
    }else{
        errMes();
    } 
    function validateURL(someurl){
        var arr = someurl.split('.');
        if(arr[0] === 'www'){
            if(typeof arr[1] === 'string' && typeof arr[2] === 'string'){
                return true;
            }else {return false;}
        }else if(typeof arr[0] === 'string'){
            if(typeof arr[1] === 'string'){
                return true;
            }else { return false;}
        }else {return false;}
    }
    function errMes(){
        res.writeHead(200,{'content-type':'text/html'});
        res.end('It seems the format of your URL is not correct. Please check it using "Usage tips" on main page'); 
    }
});

server.listen(port, function(){
	console.log('Our app is running on http://localhost:'+port);
});   






        



