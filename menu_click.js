$(function () {
    $('li').bind('click',{},onClicked);
    function onClicked(e){
        var target = e.currentTarget;
        //Do what you want to do;
       console.log($(e.currentTarget).text())
        e.preventDefault();


     
       

      }

});