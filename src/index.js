/**
 *  jquery-bg-pexels
 *  @version 0.0.0-development
 *  @author Aaron Lopez
 * @license The MIT License (MIT)
*/

(function(global,$){
  function BgPexels(){

  }

  BgPexels.prototype.setup = function(clientId){
    this.clientId = clientId;
  };

  var getRandomPhoto = function(){
    return (
      $.ajax({
        url: 'https://api.unsplash.com/photos/random',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization','Client-ID '+  global.BgPexels.clientId);
        }
      })
    );
  };

  $.fn.BgPexels = function(options){
    options = options || {};
    var def = $.Deferred();
    var $self = $(this);
    $self.css({
      width:'100%',
      height: options.height || '100vh',
      minHeight: options.minHeight || '800px',
      backgroundColor: options.backgroundColor || 'black',
      backgroundPosition: options.backgroundPosition || 'center',
      backgroundSize: options.backgroundSize || 'cover',
    });
    getRandomPhoto()
      .then(function(photo){
        $self.css({
          backgroundImage: 'url(' + photo.urls.regular +  ')'
        });
        def.resolve($self);
      })
      .catch(function(){
        $self.css({
          backgroundImage: 'url(' + options.backgroundImage +  ')'
        });
        def.reject($self);
      });
    return def.promise();
  };

  global.BgPexels = new BgPexels();

})(window, jQuery);
