// ==UserScript==
// @name         ComicPagerMonkey
// @namespace    keystroke
// @version      0.1
// @description  Arrow-Key Support to Navigate WebComics
// @author       Daniel Wilking

// @match        http://www.myextralife.com/comic/*
// @match        http://www.penny-arcade.com/comic/*
// @match        http://oglaf.com/*
// @match        http://www.questionablecontent.net/*
// @match        http://trenchescomic.com/*

// @require      https://code.jquery.com/jquery-1.11.3.min.js
// ==/UserScript==

(function($){
    var debugMode = false;
    
    var key_next=39;
	var nextSelectors = [];
	/* ##################### Selectors fo Next Links ########################## */
    nextSelectors.push('.comic_nav_link.next_comic_link'); //myextralife
    nextSelectors.push('a.btnNext'); // Penny Arcade
    nextSelectors.push('#nav a:not(.mn)'); //Oglaf
    nextSelectors.push('#comicnav li:nth-child(3) a'); //Questionable Content
        
	
	
    var key_prev=37;
	var prevSelectors = [];
    /* ##################### Selectors fo Prev Links ########################## */
    prevSelectors.push('.comic_nav_link.prev_comic_link'); //myextralife
    prevSelectors.push('a.btnPrev'); // Penny Arcade
    prevSelectors.push('#comicnav li:nth-child(2) a'); //Questionable Content
        
		
		
	
	
	
    var debug = function(obj){
        if(console !== undefined && console.log !== undefined && debugMode){
            console.log(obj);
        }
    };
    
    var performNext = function(){
        debug('performing next');
        var $nextElement;
        
        for(var i=0;i<nextSelectors.length;i++){
            var tempNode = $(nextSelectors[i]);
            if(tempNode.length>0){
                $nextElement = tempNode.first();
                break;
            }
        }
        
        if($nextElement===undefined){
            debug("None of my selectors matched, I'm out!");
            return;
        }
        
        debug('next Element: ');
        debug($nextElement);
        $nextElement.trigger('click');
        var nextHref = $nextElement.attr('href');
        if(nextHref !== undefined){
            window.location = nextHref;
        }
    };
    
    var performPrev = function(){
        debug('performing previous');
        var $prevElement;
        
        for(var i=0;i<prevSelectors.length;i++){
            var tempNode = $(prevSelectors[i]);
            if(tempNode.length>0){
                $prevElement = tempNode.first();
                break;
            }
        }
        
        if($prevElement===undefined){
            debug("None of my selectors matched, I'm out!");
            return;
        }
        
        debug('previous Element: ');
        debug($prevElement);
        $prevElement.trigger('click');
        var prevHref = $prevElement.attr('href');
        if(prevHref !== undefined){
            window.location = prevHref;
        }
    };
    
    $('body').on('keydown', function(evt){
        if(parseInt(evt.which) === parseInt(key_next)){
            performNext();
        }else if (parseInt(evt.which) === parseInt(key_prev)){
            performPrev();
        }
    });
})(jQuery);