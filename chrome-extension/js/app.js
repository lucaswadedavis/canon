$(document).ready(function(){
	app.c.init();
});
/////////////////////////////

var app={m:{},v:{},c:{},t:{}};

/////////////////////////////



app.c.init=function(){
  chrome.storage.sync.get(null,function(obj){
    if (!obj.quotes){
      obj.quotes = [];
      chrome.storage.sync.set({"quotes":[]},function(){
        console.log("initial quotes set");
      });
    }
  app.v.init(obj);
  app.v.listeners();
  });
};

//////////////////////////////

app.v.init=function(state){
	$("body").html(app.t.splash(state) );
};


app.v.listeners=function(){
  $("body").on("click","#add-another",function(){
    $("#quotes").append(app.t.quote() );
  });

  $("body").on("click","#save",function(){

    var s = [];
    
    $("#quotes div").each(function(){
      var original =  $(this).children()[0].value;
      var quote = $(this).children()[1].value;

      if (original && quote){
        s.push({original:original,quote:quote});
      }
    });
    
    chrome.storage.sync.set({quotes:s},function(){console.log("saved!");});
  });
};

//////////////////////////////

app.t.splash=function(state){
  var d="";
  d+="<img src='icon.png' alt='counterspell icon' />";
  d+="<div class='wrapper'>";
    d+=app.t.quotes(state.quotes );
  d+="<input type='button' value='Save' id='save'></input>";
  d+="</div>";    
  return d;
};

app.t.quotes = function(quotes){
  var d = "";
  d += "<div class='thin-wrapper' id='quotes'>";
    for (var i=0;i<quotes.length;i++){
      d += app.t.quote(quotes[i]);
    }
  d += "</div>";
  d += "<input type='button' value='add another' id='add-another'></input>";
  return d;
};

app.t.quote = function(quote){
  if (quote === undefined){quote = {original:"",quote:""};}

  var d = "";
  d += "<div class='quote thin-wrapper'>";
    d += "<input type='text' value='"+quote.original+"' placeholder='curse'></input>";
    d += "<input type='text' value='"+quote.quote+"' placeholder='counterspell'></input>";
  d += "</div>";
  return d;
};
