//The BASIC application service
app.service("cgi",[function(){
    
    //Handle background calls to the web server for database integration
    this.ajax = function(data){
        return $.ajax({
                    method: "GET",
                    url: "/php/index.php",
                    data: data       
                });
    };

    this.main = function(path,data,cb){
        console.dir(path)
                $.ajax({
                    method: "POST",
                    url: path,
                    data: data       
                }).then(function(d){
                    console.dir(d);
                    if(cb && typeof(cb)=='function'){
                        cb();
                    }
                })
    }

}])