/* jshint esversion: 6 */

import lazysizes from 'lazysizes';
import optimumx from 'lazysizes';
require('../../node_modules/lazysizes/plugins/object-fit/ls.object-fit.js');
import Flickity from 'flickity';
import 'flickity-hash';
require('viewport-units-buggyfill').init();

const App = {
  header: null,
  siteTitle: null,
  initialize: () => {
    App.header = document.querySelector("header");
    App.sizeSet();
    App.interact.init();
    document.getElementById("loader").style.display = 'none';
  },
  sizeSet: () => {
    App.width = (window.innerWidth || document.documentElement.clientWidth);
    App.height = (window.innerHeight || document.documentElement.clientHeight);
    if (App.width <= 1024)
      App.isMobile = true;
    if (App.isMobile) {
      if (App.width >= 1024) {
        // location.reload();
        App.isMobile = false;
      }
    }
  },
  interact: {
    init: () => {
      App.interact.linkTargets()
      App.interact.eventTargets()
      App.interact.embedKirby()
      App.interact.loadSliders()
    },
    eventTargets: () => {
      const models = document.getElementsByClassName('model-item');
      if (models.length > 0) {
        const title = document.querySelector('h1[data-title]');
        for (var i = 0; i < models.length; i++) {
          const model = models[i];
          model.addEventListener('mouseenter', event => {
            title.innerText = model.getAttribute('data-title');
            title.style.zIndex = 15;
            title.style.pointerEvents = 'none';
          });
          model.addEventListener('touchstart', event => {
            title.innerText = model.getAttribute('data-title');
            title.style.zIndex = 15;
            title.style.pointerEvents = 'none';
          });
          model.addEventListener('mouseleave', event => {
            title.innerText = title.getAttribute('data-title');
            title.removeAttribute('style');
          });
          model.addEventListener('touchend', event => {
            title.innerText = title.getAttribute('data-title');
            title.removeAttribute('style');
          });
        }
        const right = document.getElementById('right');
        const left = document.getElementById('left');
        const rightContent = right.querySelector('.content');
        window.addEventListener('mousewheel', event => {
          const pos = (90 - (window.scrollY / left.offsetHeight) * 100) * (-1);
          rightContent.style.transform = 'translateY(' + pos + '%) translateZ(0)';
        });
      }
      const casting = document.getElementsByClassName('casting-item');
      if (casting.length > 0) {
        for (let i = 0; i < casting.length; i++) {
          const img = casting[i].querySelector('.image');
          if (img) {
            casting[i].addEventListener('mousemove', event => {
              img.style.top = event.clientY + 'px';
              img.style.left = event.clientX + 'px';
            });
          }
        }
      }
    },
    linkTargets: () => {
      const links = document.querySelectorAll("a");
      for (var i = 0; i < links.length; i++) {
        const element = links[i];
        if (element.host !== window.location.host) {
          element.setAttribute('target', '_blank');
        } else {
          element.setAttribute('target', '_self');
        }
      }
    },
    embedKirby: () => {
      var pluginEmbedLoadLazyVideo = function() {
        var e = this.parentNode,
          d = e.children[0];
        d.src = d.dataset.src, e.removeChild(this)
      };
      for (var d = document.getElementsByClassName("embed__thumb"), t = 0; t < d.length; t++) d[t].addEventListener("click", pluginEmbedLoadLazyVideo, !1)
    },
    loadSliders: () => {
      const initFlickity = (element, options) => {
        var slider = new Flickity(element, options);
        slider.slidesCount = slider.slides.length;
        if (slider.slidesCount < 1) return; // Stop if no slides
        slider.on('change', function() {
          // $('#slide-number').html((slider.selectedIndex + 1) + '/' + slider.slidesCount);
          if (this.selectedElement) {
            const caption = this.element.parentNode.querySelector(".caption");
            if (caption)
              caption.innerHTML = this.selectedElement.getAttribute("data-caption");
          }
          var adjCellElems = this.getAdjacentCellElements(1);
          for (var i = 0; i < adjCellElems.length; i++) {
            var adjCellImgs = adjCellElems[i].querySelectorAll('.lazy:not(.lazyloaded):not(.lazyload)')
            for (var j = 0; j < adjCellImgs.length; j++) {
              adjCellImgs[j].classList.add('lazyload')
            }
          }
        });
        // slider.on('staticClick', function(event, pointer, cellElement, cellIndex) {
        //   if (!cellElement || !Modernizr.touchevents || cellElement.getAttribute('data-media') == "video") {
        //     return;
        //   } else {
        //     this.next();
        //   }
        // });
        if ((window.innerWidth || document.documentElement.clientWidth) < 1024) {
          slider.on('staticClick', function(event, pointer, cellElement, cellIndex) {
            slider.next();
          });
        } else {
          slider.on('staticClick', function(event, pointer, cellElement, cellIndex) {
            if (typeof cellIndex == 'number') {
              slider.selectCell(cellIndex);
            }
          });
        }
        // let prevNextButtons = slider.element.querySelectorAll(".flickity-prev-next-button");
        // prevNextButtons.forEach((el) => {
        //   let cursor = document.createElement('div');
        //   cursor.className = "cursor";
        //   el.appendChild(cursor);
        //   el.addEventListener('mousemove', () => {
        //     if (!Modernizr.touchevents) {
        //       let rect = el.getBoundingClientRect();
        //       cursor.style.top = event.pageY - rect.top - window.scrollY + "px";
        //       cursor.style.left = event.pageX - rect.left - window.scrollX + "px";
        //     }
        //   });

        // })
        if (slider.selectedElement) {
          const caption = slider.element.parentNode.querySelector(".caption");
          if (caption)
            caption.innerHTML = slider.selectedElement.getAttribute("data-caption");
        }
      };
      var flickitys = [];
      var elements = document.getElementsByClassName('slider');
      if (elements.length > 0) {
        for (var i = 0; i < elements.length; i++) {
          initFlickity(elements[i], {
            cellSelector: '.slide',
            imagesLoaded: true,
            lazyLoad: 3,
            hash: true,
            setGallerySize: false,
            adaptiveHeight: false,
            percentPosition: true,
            accessibility: true,
            wrapAround: false,
            prevNextButtons: false,
            pageDots: false,
            draggable: '>1',
            freeScroll: false,
            dragThreshold: 30,
            arrowShape: 'M74.3 99.3L25 50 74.3.7l.7.8L26.5 50 75 98.5z'
          });
        }
      }
    }
  },
  pjax: () => {
    let transitionDuration = 300;
    let linkClicked;
    let nextPageType;
    const HideShowTransition = Barba.BaseTransition.extend({
      start: function() {
        let _this = this;
        App.scrollSave.set();
        _this.newContainerLoading.then(_this.startTransition.bind(_this));
      },
      startTransition: function() {
        let _this = this;
        const newContent = _this.newContainer.querySelector('#page-content');
        _this.newContainer.visibility = "visible";
        // newContent.style.opacity = 0;
        nextPageType = newContent.getAttribute('page-type');

        document.body.classList.add('is-loading');
        document.body.classList.remove('menu-on');
        const currentLink = document.querySelector('a.active');
        if (currentLink) currentLink.classList.remove('active');
        if (linkClicked) linkClicked.classList.add('active');
        App.interact.init();



        setTimeout(function() {
          new TimelineMax({
            onComplete: () => {
              App.videoPlayers.destroy();
              _this.finish(_this, newContent);
            }
          }).set(_this.newContainer, {
            visibility: 'visible',
            position: 'absolute',
            'box-shadow': '0 0 30px rgba(0,0,0,0.3)',
            top: 0,
            left: 0,
            zIndex: 15
          }).set(_this.oldContainer, {
            zIndex: 10
          }).fromTo(newContent, 1, {
            zIndex: 15,
            yPercent: App.transitionDirection === 'up' ? -100 : 100
          }, {
            yPercent: 0,
            force3D: true,
            ease: Expo.easeOut
          }).to(_this.oldContainer, 1, {
            opacity: 0.4
          }, '-=1').set(_this.newContainer, {
            clearProps: 'all'
          });
        }, 500);


      },
      finish: function(_this, newContent) {

        _this.done();
        App.pageType = nextPageType;
        App.logoColor = newContent.getAttribute('logo-color');
        document.body.setAttribute("page-type", App.pageType);
        document.body.setAttribute("logo-color", App.logoColor);
        // App.scrollSave.get();


        App.interact.menuBurger();
        setTimeout(function() {
          App.setPageId();
        }, transitionDuration);

        setTimeout(function() {
          if (App.introPlayers && App.introPlayers.length > 0) {
            // App.introPlayers[0].on('canplay', event => {
            //   console.log('ok')
            // });
            App.introPlayers[0].play();
            document.body.setAttribute('logo-color', App.introPlayers[0].media.getAttribute('logo-color'));
          }
          document.body.classList.remove('is-loading');
          App.isScrolling = false;
        }, 200);
      }


    });
    Barba.Pjax.getTransition = function() {
      return HideShowTransition;
    };
    Barba.Dispatcher.on('linkClicked', function(el) {
      linkClicked = el;
      App.transitionDirection = 'down';
    });
    Barba.Pjax.Dom.wrapperId = "main";
    Barba.Pjax.Dom.containerClass = "pjax";
    Barba.Pjax.cacheEnabled = false;
    Barba.Pjax.start();
  }
}

document.addEventListener("DOMContentLoaded", App.initialize);