
function menuMobFunc (el){
  this.el = el;
  this._init();
}
menuMobFunc.prototype._init = function(){
  this.iconMob = this.el.find('.mob-i-func');
  this.menuUl = this.el.find('.menu-ul');
  alturaUl = this.menuUl.height();
  console.log(alturaUl);
  this._initEvents();
}
menuMobFunc.prototype._initEvents = function(){
  var self = this;
  this.iconMob.on('click', function ( e ) {
    e.preventDefault();
    self._startMenuMobile();
  });
}
menuMobFunc.prototype._startMenuMobile = function(){
  var self = this;

  if(this.menuUl.hasClass('no-active')){
    // this.menuUl.slideDown();
    this.menuUl.removeClass('no-active');
  }
  else{
    // this.menuUl.slideUp();
    this.menuUl.addClass('no-active')
  }
}


new menuMobFunc ( $('.menu-principal') );