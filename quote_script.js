function inIframe(){try{return window.self !== window.top;}catch (e){return true;}}

var colors = ['#461f41', '#660000', '#800040', '#002080', '#808000', ' #404040'];
var currentQuote = "";
var currentAuthor = "";

function openURL(url) {
    window.open(url, 'Share', 'width=550,height=400,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0');
}

function getQuote(){
    
    $.ajax({
           headers:{
           "X-Mashape-Key":
           "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
           Accept:"application/json",
           "Content-Type":"application/x-www-form-urlencoded"
           },
           url:"https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
           success: function(response){
           var r = JSON.parse(response);
           currentQuote = r.quote;
           currentAuthor = r.author;
           if(inIframe()){
           $('#tweet_quote').attr('href','https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"'+currentQuote+'"'+currentAuthor));
           $('#post_quote').attr('href','https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content='+encodeURIComponent(currentQuote));
           
           }
           
           $('.actual_quote').animate({
                                      opacity:0
                                      },500,function(){
                                      $(this).animate({opacity:1},500);
                                      $('#text').text(r.quote);
                                      });
           
           $('.quote_name').animate({
                                    opacity:0},500,function(){
                                    $(this).animate({opacity:1},500);
                                    $('#author').html(r.author);
                                    });
           
           var color = Math.floor(Math.random() * colors.length);
           $("html body").animate({
                                  backgroundColor:colors[color],
                                  color:colors[color]}, 1000);
           $(".button").animate({
                                backgroundColor:colors[color]
                                },1000);
           }
           });
}

$(document).ready(function(){
                  getQuote();
                  $('#new_quote').on('click',getQuote);
                  
                  $('#tweet_quote').on('click',function(){
                                       if(inIframe()){
                                       openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+ encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
                                       }
                                       });
                  
                  $('#post_quote').on('click',function(){
                                      if(inIframe()){   openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
                                      }
                                      });
                  });
















