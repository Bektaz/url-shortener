var http = require('http');
var fs = require('fs');
var url = require('url');
var dns = require('dns');

var port = process.env.PORT || 8080;

var server = http.createServer(function(req, res){  
    var obj = url.parse(req.url, true), data = {};
    var urlForData = obj.path.slice(5,obj.path.length);
    var urlForValidating = obj.path.split('/')[4]; 
    var num;
    
    if(obj.path.length === 1){
        res.writeHead(200,{'content-type':'text/html'});
        var html = fs.readFileSync(__dirname+'/index.htm');
        res.end(html);        
    }else if(typeof urlForValidating === 'string'){        
        num = Math.floor((Math.random() * 10) + 1);  
        dns.resolve(urlForValidating, function(err){
            if(err){
                res.writeHead(200,{'content-type':'application/json'});
                res.end(JSON.stringify(err)); 
            }else{                             
                data = {
                    original_url: urlForData,
                    short_url: 'https://urlsh.herokuapp.com/'+num
                }
                fs.writeFileSync(__dirname + '/datafile.txt', JSON.stringify(data));     
                res.writeHead(200,{'content-type':'application/json'});
                res.end(JSON.stringify(data));
                             
            }
        });
    }
    if(Number(obj.path.slice(1,obj.path.length))>0){
        var buf = fs.readFileSync(__dirname + '/datafile.txt', 'utf8');
        var shortUrl = JSON.parse(buf).short_url;
        //console.log('shortUrl: ',shortUrl.split('/')[3] ,' typeof shortUrl: ',typeof shortUrl.split('/')[3]); 
        //console.log('obj.path: ',obj.path.split('/')[1],' typeof urlForData: ',typeof obj.path.split('/')[1]); 
        if(obj.path.split('/')[1] === shortUrl.split('/')[3]){       
            res.writeHead(302,{'Location':JSON.parse(buf).original_url});
            res.end(); 
            console.log(shortUrl);
        }else{
            errMes();
        }
    }
    function errMes(){
        res.writeHead(200,{'content-type':'text/html'});
        res.end('It seems the format of your URL is not correct. Please check it using "Usage tips" on main page.'); 
    }
});

server.listen(port, function(){
	console.log('Our app is running on http://localhost:'+port);
});   


 /*
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
    }*/






        



