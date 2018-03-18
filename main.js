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

    var comment_count = 0;
    var comment_loaded = 0;

    var intervalId = setInterval(function() {

        checkURL(window.location.href);
        //console.log('called url check');

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

    }, 1000);


    function checkURL(url) {        // youtube page doesnt refresh on autoplay, reset the comment hiding when video changes.

        var newURL = url.split('?')[1];

        if (newURL !== loaded_video) {
            
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
            split = text.split('\n')[2];

            split = split.toLowerCase();
            
            if (/(19[0123456789]\d|20[0123456789]\d)/.test(split)) {
               
                // highlight these comments for testing

                $(this).parent().css('border', '2px solid blue');
                // 
                // https://www.youtube.com/watch?v=Gu2pVPWGYMQ
                // 

                $(this).parent().hide();            
             
            }
        });
    }
});
