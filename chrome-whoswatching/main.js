/*        Whos Watching
**        --------------------------------------------------------
**        Author: John M Cook
**        Email: Johncoook@gmail.com
**        --------------------------------------------------------  
**        Simple but very necessary. 
*/   


$(document).ready(function() {
 
    var url = window.location.href;
    var loaded_video = url.split('?')[1];
    //console.log(loaded_video);
    var comment_count = 0;
    var comment_loaded = 0;

    var blocked = 0;

    var intervalId = setInterval(function() {

        var currenturl = window.location.href;

        //console.log(currenturl);

        checkURL(currenturl, loaded_video);
        //console.log('called url check');
        //console.log('run');

        if ($('ytd-comment-thread-renderer').length) {

            comment_loaded = $('ytd-comment-thread-renderer').length;
            //console.log('found (' + comment_loaded + ')');

            if (comment_count !== comment_loaded) {
                comment_count = comment_loaded;
                checkLoaded();
                //console.log('called loading');
            }

        } else {
            //console.log('not found');
        }

    }, 4000);


    function checkURL(passed, loaded) {        // youtube page doesnt refresh on autoplay, reset the comment hiding when video changes.

        var newURL = passed.split('?')[1];

        //console.log('newURL: ' + newURL);
        //console.log('loaded: ' + loaded);
        if (newURL !== loaded) {
            
            $('.style-scope ytd-comment-renderer').parent().css('border', 'none');
            $('.style-scope ytd-comment-renderer').parent().show();
            
            //console.log('reset');

            loaded_video = newURL;

            checkLoaded();
            
        }

    }

    function checkLoaded() {
        
        $('.style-scope ytd-comment-renderer').each(function() {
        
            text = $(this).prop('innerText');    

            split = text.split('ago')[1];
                        
            //console.log(split);

            split = split.toLowerCase();

            blacklist = ["who's watching", "who is watching", "whos watching", "listening in", "/18" ];

            included = false;

            blacklist.forEach(function(phrase) {
                if (included === false) {
                    if (split.includes(phrase) == true) {
                        included = true;
                    }    
                }
            });
            

            if ((/(19[0123456789]\d|20[0123456789]\d|30[0123456789]\d)/.test(split)) || included === true ) {
               
                // highlight these comments for testing
                $(this).parent().css('border', '2px solid blue');
                $(this).parent().hide();            
                
                blocked++;
                // 
                // https://www.youtube.com/watch?v=hT_nvWreIhg
                // 

                
                //console.log('total number of comment: ' + comment_loaded);
                //console.log('total number blacklisted: ' + blocked);
            }
        });
    }
});
