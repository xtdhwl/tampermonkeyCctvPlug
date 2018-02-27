// ==UserScript==
// @name         cctv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  cctv 去广告. 只做学习使用请删除
// @author       xtdhwl
// @match        *://tv.cntv.cn/*
// @match        *://tv.cctv.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     console.log("===============");
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records){
        clearAD();
    });
    var option = {
        'childList': true,
        'subtree': true
    };
    document.onreadystatechange = function(){
        if(document.readyState == "interactive"){
            observer.observe(document.body, option);
        }
    };

    function clearFTAPI(element){
        if(element.id.includes("FTAPI_container_")){
            element.style.width  = "0px";
            element.style.height = "0px";
            element.style.display = "none";
        }

        var childrens = element.children;
        for(var i =0; i< childrens.length ; i++){
            var children = childrens[i];
            clearFTAPI(children);
        }
    }

     function clearAD(){
         clearFTAPI(document.body);

         try{
             document.getElementById("page_head").children[2].style.display = "none";
         }catch(e){
           console.log(e);
         }
    }
    setTimeout(()=>{clearAD();},2000);
})();
