require('dotenv').config();
var expect = require('expect.js');
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM('<html><body><section></section></body></html>');
var $ = global.jQuery =require('jquery')(dom.window);

require('jsdom-global')();
require('../src');

var $section;
var clientId = process.env.CLIENT_ID;
describe('jquery-bg-pexels', function(){
  beforeEach(function(){
    window.BgPexels.setup(clientId);
    $section = $('section');
  });

  it('should have the default values',function(){
    $section.BgPexels();
    expect($section.css('width')).to.be('100%');
    expect($section.css('minHeight')).to.be('800px');
    expect($section.css('backgroundColor')).to.be('black');
    expect($section.css('backgroundPosition')).to.be('center');
    expect($section.css('backgroundSize')).to.be('cover');
  });

  it('should have the defined values',function(){
    $section.BgPexels({
      minHeight: '700px',
      backgroundColor: 'red',
      backgroundPosition:'center',
      backgroundSize: 'contain'
    });
    expect($section.css('width')).to.be('100%');
    expect($section.css('minHeight')).to.be('700px');
    expect($section.css('backgroundColor')).to.be('red');
    expect($section.css('backgroundPosition')).to.be('center');
    expect($section.css('backgroundSize')).to.be('contain');
  });

  it('should set client id attr', function(){
    expect(window.BgPexels.clientId).to.be(clientId);
  });

  it('Should set a random image from Unsplash',function(){
    return $section.BgPexels({
      backgroundImage: 'path/defaultImage.jpg',
      usePromise: true
    }).then(function($this){
      expect($this.css('backgroundImage')).to.contain('url');
    }).catch(function($this){
      expect($this.css('backgroundImage')).to.contain('path/defaultImage.jpg');
    });
  });

  it('Should set default image',function(){
    window.BgPexels.setup(123);
    return $section.BgPexels({
      backgroundImage: 'path/defaultImage.jpg',
    }).catch(function($this){
      expect($this.css('backgroundImage')).to.contain('path/defaultImage.jpg');
    });
  });

});
