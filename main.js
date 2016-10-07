$(document).ready(function(){
  $("img").addClass("img-responsive");
  $('.portfolio img').mouseenter(function(){
    var $toggleid = $(this).attr('data-toggle');
    var $showme = $(this).closest('.row').next('.row').children().children('p[data-toggle='+ $toggleid + ']');
    $showme.show();
    $(this).parent().css('backgroundColor','gray');
    $(this).css('opacity','0.5');
  })
  $('.portfolio img').mouseleave(function(){
    var $toggleid = $(this).attr('data-toggle');
    var $hideme = $(this).closest('.row').next('.row').children().children('p[data-toggle='+ $toggleid + ']');
    $hideme.hide();
    $(this).parent().css('backgroundColor','transparent');
    $(this).css('opacity','1');
  })
})
