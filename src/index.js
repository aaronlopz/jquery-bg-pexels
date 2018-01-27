/**
 *  jquery-bg-pexels
 *  @version 0.0.0-development
 *  @author Aaron Lopez
 * @license The MIT License (MIT)
*/

(function($){

  $.fn.pexels = function(){
    $(this).css({
      width:'100%',
      height: '100vh',
      minHeight: '800px',
    });
    return $(this);
  };

})(jQuery);


