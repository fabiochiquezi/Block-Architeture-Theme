$(document).ready(function(){
  
  function menuMobFunc (el){
    this.el = el;
    this._init();
  }
  menuMobFunc.prototype._init = function(){
    this.iconMob = this.el.find('.mob-i-func');
    this.menuUl = this.el.find('.menu-ul');
    this.alturaUl = this.menuUl.height();
    this.alturaEl = this.el.height();
    this.li = this.menuUl.find('li');

    this.liSearch = this.el.find('.li-search');
    this.iconSearch = this.liSearch.find('img');
    this.inputSearch = this.liSearch.find('.input-search');
    this.formSearch = this.liSearch.find('.search-hidden-func');

    this.SubMenuLi = this.el.find('.sub-menu .set');

    this._initEvents();

    this.debugClick = true;
    this.debugClickSubMenu = true;
  }
  menuMobFunc.prototype._initEvents = function(){
    var self = this;

    //Quando o ícone for clicado inicia a função slideTogle, a menos que o debugClick for false, este debug foi criado para impedir muitos clicques e pau por conta disso
    this.iconMob.on('click', function ( e ) {
      e.preventDefault();
      if(self.debugClick){
        self._startMenuMobile();
      }
    });

    //Submenu Mobile
    this.SubMenuLi.on('click', function(e){
      e.preventDefault();
      if(self.debugClickSubMenu){
        self._startSubMenu(this);
      }
    });

    //Animação IconSearch
    this.formSearch
    .on('mouseenter', function () { 
        self._startSearch();
    })
    .on('mouseleave', function () {  
        self._startSearch();
    });

    this._debugResize()
  }
  menuMobFunc.prototype._debugResize = function(){
    var self = this;
    var windowWidth = $(window).outerWidth();

    $(window).resize(function(){

      //Apaga body e manda recarregar página
      windowResizeWidth = $(this).outerWidth();

      if(windowWidth < 992 && windowResizeWidth > 992){
        $('body').fadeTo(300, '0');
        window.location.reload();
      }
      if(windowWidth > 992 && windowResizeWidth < 992){
        $('body').fadeTo(300, '0');
        window.location.reload();
      }

      //Se o menu mob estiver ativo, desativa
      if(!(self.menuUl.hasClass('no-active'))){
          //Passa em cada li e faz um efeito de desaparecer
        self.li.each(function(){
          $(this).animate({
            opacity: 0,
            left: '-30px'
          }, 300);
        });

        //Aguarda 300 segundos que é para as Li's sumirem e faz um efeito para diminuir o tamanho da div pai
        setTimeout(function () {  
          self.el.animate({
            height: self.alturaEl + 43
          }, 400, function () {
            //Dá display none  
            self.menuUl.css('display', 'none');
          });
          
          //Remove os submenus que estiverem ativos (para não dar bug)
          self.li.each(function(){
            if( $(this).hasClass('sub-menu') && !($(this).hasClass('no-active')) ){
              $(this).addClass('no-active');
              $(this).find('ul').slideToggle();
              self.debugClickSubMenu = true;
            }
          })
        }, 300);

        //Altera o ícone
        self.iconMob.fadeTo(600, '0', function(){
          //Debug de tamanho
          self.iconMob.find('img').css('transform', 'scale(1)');
          //Animação
          self.iconMob.find('img').attr('src', 'img/svg/menu-hamb.svg');
          self.iconMob.fadeTo(300, '1');
        });

        //Adiciona "no-active" para indicar que o efeito não está aparente
        self.menuUl.addClass('no-active');
      }
    })
  }
  menuMobFunc.prototype._startSearch = function () {  
    if(this.formSearch.hasClass('no-active')){
      this.inputSearch.css('width', '200px');
      this.formSearch.removeClass('no-active');
    }
    else{
      if(!(this.inputSearch.val().length)){
        this.inputSearch.css('width', '0px');
        this.formSearch.addClass('no-active');  
      }
    }
  }
  menuMobFunc.prototype._startSubMenu = function (el) {
    var self = this;
    var ulHeight = $(el).siblings('ul').height();
    //Impede outros clicks (debug)
    this.debugClickSubMenu = false;

    //Se não estiver ativo inicia
    if($(el).parent('li.sub-menu').hasClass('no-active')){
      //Aumenta a div pai
      this.el.animate({
        height: this.el.outerHeight() + ulHeight + 10
      }, 300);
      //Remove a classe que indica ativo
      $(el).parent('li.sub-menu').removeClass('no-active');
      //Faz um slideTogle no item
      $(el).siblings('ul').slideToggle();
    }
    //Caso estiver ativo remove
    else{
      //Diminui o tamanho da div pai
      this.el.animate({
        height: this.el.outerHeight() - ulHeight - 10
      }, 300); 
      //Adiciona uma classe indicando que não está mais ativo
      $(el).parent('li.sub-menu').addClass('no-active');  
      //Faz um slideTogle no item
      $(el).siblings('ul').slideToggle();   
    }
    //Libera outro click (debug)
    setTimeout(function(){
       self.debugClickSubMenu = true;
    }, 500);
  }
  menuMobFunc.prototype._startMenuMobile = function(){
    var self = this;
    this.debugClick = false;

    //Se não tiver a classe "no-active" inicia a função
    if(this.menuUl.hasClass('no-active')){

      //Altera o ícone
      this.iconMob.fadeTo(600, '0', function(){
        //Debug de tamanho
        self.iconMob.find('img').css('transform', 'scale(0.75)');
        //Animação
        self.iconMob.find('img').attr('src', 'img/svg/cancel.svg');
        self.iconMob.fadeTo(300, '1');
      });

      //Anima o aumento da div pai, onde está o background
      this.el.animate({
        height: this.el.height() + this.alturaUl + 40
      }, 400, function () {
        
        //Da display Block
        self.menuUl.css('display', 'block');
        //Cria um timing para cada li, fazendo um efeito cascata de aparecer
        timingLi = 0;
        //Passa em cada li e faz a animação
        self.li.each(function(){
          timingLi = timingLi + 150;
            $(this).animate({
              opacity: 1,
              left: '0px'
            }, timingLi);
        });

      });

      //Remove a classe no active, já que o efeito está aparente
      this.menuUl.removeClass('no-active');
    }
    // Caso o menu estiver aparente
    else{
      //Passa em cada li e faz um efeito de desaparecer
      self.li.each(function(){
          $(this).animate({
            opacity: 0,
            left: '-30px'
          }, 300);
      });

      //Aguarda 300 segundos que é para as Li's sumirem e faz um efeito para diminuir o tamanho da div pai
      setTimeout(function () {  
        self.el.animate({
          height: self.alturaEl + 43
        }, 400, function () {
          //Dá display none  
          self.menuUl.css('display', 'none');
        });
        
        //Remove os submenus que estiverem ativos (para não dar bug)
        self.li.each(function(){
          if( $(this).hasClass('sub-menu') && !($(this).hasClass('no-active')) ){
            $(this).addClass('no-active');
            $(this).find('ul').slideToggle();
            self.debugClickSubMenu = true;
          }
        })
      }, 300);

      //Altera o ícone
      this.iconMob.fadeTo(600, '0', function(){
        //Debug de tamanho
        self.iconMob.find('img').css('transform', 'scale(1)');
        //Animação
        self.iconMob.find('img').attr('src', 'img/svg/menu-hamb.svg');
        self.iconMob.fadeTo(300, '1');
      });

      //Adiciona "no-active" para indicar que o efeito não está aparente
      this.menuUl.addClass('no-active')
    }

    //Libera outro click no botão que havia sido impedido pelo debug
    setTimeout(function(){
      self.debugClick = true;
    }, 600);
  }
  
  new menuMobFunc ( $('.menu-principal') );


  class slideShowFunc{
    constructor(el){
      this.el = el;
      this.bannerContent = this.el.find('.content-banner');
      this.slide = this.el.find('.slide');
      this.slideActive = this.el.find('.slide.active');
      this.numberSlides = this.slide.length;
      this.arrow = this.el.find('.arrow');
      this.contentBalls = this.el.find('.content-balls');
      this.countSlide = 0; //Pra marcar o numero do slide
      this.debugClick = true;
      self = this;

      this._init();
    }
    _init(){
      this._ballsStart();

      this._startSlideLoop();

      this.el
      .on('mouseenter', () => {

        console.log('stopLoop')
        clearInterval(this.loop)
      })
      .on('mouseleave', () =>{
        clearInterval(this.loop)
        this._startSlideLoop(this.countSlide);
      })

      this.arrow.each(function(){
        $(this).on('click', () => {
          if(self.debugClick){
            if($(this).hasClass('ar-left')){
              self._leftArrowFunc();
            }
            else{
              self._rightArrowFunc();
            }
          }
        })
      });
    }
    _ballsStart(){
      this.slide.each((i, el) => {
        this.contentBalls.append(`<li class="ball-slide ball-${i}"></li>`);
      });
      $('.ball-slide:first-child').addClass('active');
      this.balls = this.el.find('.ball-slide');
      this.balls.each(function(){
        $(this).on('click', function (e) {
          e.preventDefault();
          if(self.debugClick){
            self._clickBall(this);
          }
        })
      });
      
    }
    _clickBall(item){
      this.debugClick = false;
      let numeroItem = $(item).attr('class').substr(16, 1);

      let nextLi = $(`.content-banner .slide-${numeroItem}`);
      let activeLi = this.el.find('.slide.active');
    
      this.slide.each(function(){
        if( !( $(this).hasClass('active') )) {
          $(this).css({
            left: '100%'
          })
        }
      });

      nextLi.animate({
        left: '0px'
      }, 1000);

      activeLi.animate({
        left: '-100%'
      }, 1000);

      setTimeout(() => {
        activeLi.css({
          left: '100%'
        }); 
        
        activeLi.removeClass('active');
        nextLi.addClass('active');

        this.countSlide = numeroItem;
        console.log(this.countSlide);
    
        this.debugClick = true;
      }, 1050);
    }
    _leftArrowFunc(){
      this.debugClick = false;
      this.countSlide++;
      let nextLi = this.countSlide == this.numberSlides ? this.el.find('.slide:first-child') : this.el.find('.slide.active').next();
      let activeLi = this.el.find('.slide.active');

      this.slide.each(function(){
        if( !( $(this).hasClass('active') )) {
          $(this).css({
            left: '100%'
          })
        }
      });

      nextLi.animate({
        left: '0px'
      }, 1000);

      activeLi.animate({
        left: '-100%'
      }, 1000);

      setTimeout(() => {
        activeLi.css({
          left: '100%'
        }); 
        
        activeLi.removeClass('active');
        

        if(this.countSlide == this.numberSlides){
          this.el.find('.slide:first-child').addClass('active');
          this.countSlide = 0;
        }
        else{
          nextLi.addClass('active'); 
        }
        this.debugClick = true;
      }, 1050);
    }
    _rightArrowFunc(){
      this.debugClick = false;
      this.countSlide--;
      let nextLi = this.countSlide < 0 ? this.el.find('.slide:last-child') : this.el.find('.slide.active').prev();
      let activeLi = this.el.find('.slide.active');

      this.slide.each(function(){
        if( !( $(this).hasClass('active') )) {
          $(this).css({
            left: '-100%'
          })
        }
      });
      
      nextLi.animate({
        left: '0px'
      }, 1000);

      activeLi.animate({
        left: '100%'
      }, 1000);

      setTimeout(() => {
        activeLi.css({
          left: '-100%'
        }); 
        
        activeLi.removeClass('active');
        if(this.countSlide < 0){
          this.el.find('.slide:last-child').addClass('active');
          this.countSlide = this.numberSlides - 1;
        }
        else{
          nextLi.addClass('active'); 
        }
        this.debugClick = true;
      }, 1050);      
    }
    _startSlideLoop(counter = 0){
      this.countSlide = counter;

      this.loop = setInterval(() => {
        this.countSlide++;
        let nextLi = this.countSlide == this.numberSlides ? this.el.find('.slide:first-child') : this.el.find('.slide.active').next();
        let activeLi = this.el.find('.slide.active');

        //Debug caso tiver sido clicado o arro right
        this.slide.each(function(){
          if( !( $(this).hasClass('active') )) {
            $(this).css({
              left: '100%'
            })
          }
        });

        nextLi.animate({
          left: '0px'
        }, 1000);

        activeLi.animate({
          left: '-100%'
        }, 1000);

        setTimeout(() => {
          activeLi.css({
            left: '100%'
          }); 
          
          activeLi.removeClass('active');
          if(this.countSlide == this.numberSlides){
            this.el.find('.slide:first-child').addClass('active');
            this.countSlide = 0;
          }
          else{
            nextLi.addClass('active'); 
          }
        }, 1050);
      }, 2000);
    }

  }


  new slideShowFunc ( $('.banner-slide') );

});
