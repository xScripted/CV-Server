var years, estP, fotos, bars, subProj, cX, cY, menuIt,
    catC = 0, engC = 0, lastS = 0,
    estY = [0, 1, 1, 2, 3],
    tl = new TimelineMax(),
    date = new Date();


window.onload = () => {
    bars = document.querySelectorAll('#graficos > div > div:nth-child(2)');
    fotos = document.querySelectorAll('#tecno *');
    years = document.querySelectorAll('#yearEst span');
    estP  = document.querySelectorAll('#estudios p');
    trP  = document.querySelectorAll('#trabajos p');
    subProj = document.querySelectorAll('#proyectos > *');
    menuIt = document.querySelectorAll('#items li');
    years[3].textContent = date.getFullYear();

    menuAnimation();
    menuLinks();
    easeScroll();
    
    //Bolas 
    var bolas = document.getElementsByClassName('ball');

    setInterval(() => {
        let rand = Math.floor(Math.random() * (bolas.length - 1));
        for(let x of [...bolas])x.setAttribute('class', 'ball gray');
        for(let x = 0; x < 6; x++)bolas[Math.floor(Math.random() * (bolas.length - 1))].setAttribute('class', 'ball'); //Esto provoca epilepsia a las letras
    }, 600)


    window.addEventListener('mousemove', () => {
        cX = window.event.clientX;
        cY = window.event.clientY;
        let he = parseInt(window.getComputedStyle(pres).height);
        let wi = parseInt(window.getComputedStyle(pres).width);

        //Movimiento Background
        if(cX > wi/4 && cX < wi/3)presbg.style.backgroundPositionX = -320 + 'px';
        if(cX > wi/3 && cX < wi/2)presbg.style.backgroundPositionX = -280 + 'px';
        if(cX > wi/2 && cX < wi/1.6)presbg.style.backgroundPositionX = -260 + 'px';
        if(cX > wi/1.6 && cX < wi/1.2)presbg.style.backgroundPositionX = -240 + 'px';

        if(cY > he/4 && cY < he/3)presbg.style.backgroundPositionY = -320 + 'px';
        if(cY > he/3 && cY < he/2)presbg.style.backgroundPositionY = -280 + 'px';
        if(cY > he/2 && cY < he/1.6)presbg.style.backgroundPositionY = -260 + 'px';
        if(cY > he/1.6 && cY < he/1.2)presbg.style.backgroundPositionY = -240 + 'px';
    })

}

function menuAnimation() {
    let barras = document.querySelectorAll(".barra"),
        tl = new TimelineLite(),
        menuclicked = false;

    mcont.addEventListener('mouseover',() => {
        if(!menuclicked)tl.staggerTo(".barra", 0.3, {height: 70, top: 20}, 0.1)
    })

    mcont.addEventListener('mouseleave', () => {
        if(!menuclicked)tl.staggerTo(".barra", 0.3, {height: 50, top: 30}, 0.1)
    })

    mcont.addEventListener('click', () => {
        if(!menuclicked){
            items.style.display = 'block';
            tl.staggerTo(".barra", 0.3, {height: 50, top: 30}, 0.1);
            for(let b in [...barras]) {
                let num = b % 2 == 0 ? 210 : -210;
                TweenLite.to(barras[b], 1, {rotation: num, backgroundColor: 'white', ease: Power4.easeInOut})
            }
            TweenLite.to(menu, .3, {backgroundColor: 'black'})
            TweenLite.to(menu, 2.5, {width: '300px', ease: Bounce.easeOut})
            menu.style.height = '100vh';
            menuclicked = true;
        } else {
            items.style.display = 'none';
            TweenLite.to(menu, 1, {width: '50px', backgroundColor: 'transparent'})
            tl.staggerTo(barras, 1, {rotation: 0, backgroundColor: 'black', ease: Elastic.easeOut.config(1, 0.3)}, 0.1)
            menuclicked = false;
        }
    })
}

window.addEventListener('scroll', () => {
    scrol.innerHTML = window.scrollY;
    for(let pF in estP){
        if(window.scrollY > estP[pF].offsetTop + pres.clientHeight && window.scrollY < idiomas.offsetTop) toggleOpacity(estY[pF]);
    }

    for(let x = 5, p = 0; x < 9; x++, p++){        
        if(window.scrollY > trabajos.offsetTop + trP[p].offsetTop && window.scrollY > idiomas.offsetTop) toggleOpacity(x);
    }

    //Fixed
    if(window.scrollY > pres.offsetHeight){
        yearEst.style.position = 'fixed';
    } else {
        yearEst.style.position = 'relative';
    }

    //TimeLine
    if(window.scrollY > estudios.offsetHeight + estudios.offsetTop && window.scrollY < trabajos.offsetTop + idiblue.offsetHeight){
        TweenLite.to(yearEst, 1, {width: '100%', ease: Power4.easeOut});
        toggleOpacity(4);
    } else {
        TweenLite.to(yearEst, 1, {width: '50%', ease: Power4.easeOut});
    }

    if(window.scrollY > estudios.offsetHeight + estudios.offsetTop + pres.offsetHeight){
        TweenLite.to(yearEst, 1, {height: '20vh', ease: Power4.easeOut});
    } else {
        TweenLite.to(yearEst, 1, {height: '100vh', ease: Power4.easeOut});
    }

    //Tecnologias
    if((tecno.offsetTop + yearEst.offsetHeight) < window.scrollY) TweenLite.to(yearEst, .5, {height: '0vh', color: 'transparent', ease: Power4.easeOut});
    if(tecno.offsetTop < window.scrollY && (tecno.offsetTop + 300) > window.scrollY  && window.scrollY < lastS){
        TweenLite.to(yearEst, .5, {height: '20vh', color: 'white', ease: Power4.easeOut});
    } 

    //Idiomas
    if(idiblue.offsetTop - idiblue.offsetHeight < window.scrollY && lastS < window.scrollY){
        TweenLite.to(idiblue, 3, {marginTop: '90vh', opacity: 1, ease: Power4.easeOut});
        TweenLite.to(dWhite, 3, {marginTop: '100vh', ease: Power4.easeOut});
    }

    if(idiblue.offsetTop - idiblue.offsetHeight > window.scrollY && lastS > window.scrollY) {
        years[4].textContent = "Tecnologías y lenguajes que domino";
        yearEst.style.marginLeft = 0;
        TweenLite.to(idiblue, 3, {marginTop: '10vh', opacity: 0, ease: Power4.easeOut});
        TweenLite.to(dWhite, 3, {marginTop: '20vh', ease: Power4.easeOut});
    }

        //Barras
    if(idiomas.offsetTop - idiblue.offsetHeight < window.scrollY){
        TweenLite.to(catBar, 4, {top: 0, onUpdate: update100, ease: Power4.easeOut});
        TweenLite.to(espBar, 4, {top: 0, ease: Power4.easeOut});
        TweenLite.to(engBar, 4, {top: '30%', ease: Power4.easeOut});
    }

    //Trabajos
    if(trabajos.offsetTop <= window.scrollY){
        years[4].textContent = "Experiencia laboral";
        TweenLite.to(yearEst, 1, {marginLeft: 0, height: '20vh', color: 'white', ease: Power4.easeOut});        
    }

    if(trabajos.offsetTop + idiblue.offsetHeight < window.scrollY){
        TweenLite.to(yearEst, 1, {marginLeft: '50%',width: '50%',height: '100vh', color: 'white', ease: Power4.easeOut});        
    }

    if(trabajos.offsetTop + trabajos.offsetHeight - (pres.offsetHeight) < window.scrollY){
        TweenLite.to(yearEst, .2, {height: 0, color: 'transparent'});      
    }

    lastS = window.scrollY; //Direccion
});

function easeScroll() {
    ! function() {
        function e() {
            var e = !1;
            e && c("keydown", r), v.keyboardSupport && !e && u("keydown", r)
        }

        function t() {
            if (document.body) {
                var t = document.body,
                    o = document.documentElement,
                    n = window.innerHeight,
                    r = t.scrollHeight;
                if (S = document.compatMode.indexOf("CSS") >= 0 ? o : t, w = t, e(), x = !0, top != self) y = !0;
                else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                    var a = !1,
                        i = function() {
                            a || o.scrollHeight == document.height || (a = !0, setTimeout(function() {
                                o.style.height = document.height + "px", a = !1
                            }, 500))
                        };
                    if (o.style.height = "auto", setTimeout(i, 10), S.offsetHeight <= n) {
                        var l = document.createElement("div");
                        l.style.clear = "both", t.appendChild(l)
                    }
                }
                v.fixedBackground || b || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
            }
        }

        function o(e, t, o, n) {
            if (n || (n = 1e3), d(t, o), 1 != v.accelerationMax) {
                var r = +new Date,
                    a = r - C;
                if (a < v.accelerationDelta) {
                    var i = (1 + 30 / a) / 2;
                    i > 1 && (i = Math.min(i, v.accelerationMax), t *= i, o *= i)
                }
                C = +new Date
            }
            if (M.push({
                x: t,
                y: o,
                lastX: 0 > t ? .99 : -.99,
                lastY: 0 > o ? .99 : -.99,
                start: +new Date
            }), !T) {
                var l = e === document.body,
                    u = function() {
                        for (var r = +new Date, a = 0, i = 0, c = 0; c < M.length; c++) {
                            var s = M[c],
                                d = r - s.start,
                                f = d >= v.animationTime,
                                h = f ? 1 : d / v.animationTime;
                            v.pulseAlgorithm && (h = p(h));
                            var m = s.x * h - s.lastX >> 0,
                                w = s.y * h - s.lastY >> 0;
                            a += m, i += w, s.lastX += m, s.lastY += w, f && (M.splice(c, 1), c--)
                        }
                        l ? window.scrollBy(a, i) : (a && (e.scrollLeft += a), i && (e.scrollTop += i)), t || o || (M = []), M.length ? E(u, e, n / v.frameRate + 1) : T = !1
                    };
                E(u, e, 0), T = !0
            }
        }

        function n(e) {
            x || t();
            var n = e.target,
                r = l(n);
            if (!r || e.defaultPrevented || s(w, "embed") || s(n, "embed") && /\.pdf/i.test(n.src)) return !0;
            var a = e.wheelDeltaX || 0,
                i = e.wheelDeltaY || 0;
            return a || i || (i = e.wheelDelta || 0), !v.touchpadSupport && f(i) ? !0 : (Math.abs(a) > 1.2 && (a *= v.stepSize / 120), Math.abs(i) > 1.2 && (i *= v.stepSize / 120), o(r, -a, -i), void e.preventDefault())
        }

        function r(e) {
            var t = e.target,
                n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== H.spacebar;
            if (/input|textarea|select|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) return !0;
            if (s(t, "button") && e.keyCode === H.spacebar) return !0;
            var r, a = 0,
                i = 0,
                u = l(w),
                c = u.clientHeight;
            switch (u == document.body && (c = window.innerHeight), e.keyCode) {
                case H.up:
                    i = -v.arrowScroll;
                    break;
                case H.down:
                    i = v.arrowScroll;
                    break;
                case H.spacebar:
                    r = e.shiftKey ? 1 : -1, i = -r * c * .9;
                    break;
                case H.pageup:
                    i = .9 * -c;
                    break;
                case H.pagedown:
                    i = .9 * c;
                    break;
                case H.home:
                    i = -u.scrollTop;
                    break;
                case H.end:
                    var d = u.scrollHeight - u.scrollTop - c;
                    i = d > 0 ? d + 10 : 0;
                    break;
                case H.left:
                    a = -v.arrowScroll;
                    break;
                case H.right:
                    a = v.arrowScroll;
                    break;
                default:
                    return !0
            }
            o(u, a, i), e.preventDefault()
        }

        function a(e) {
            w = e.target
        }

        function i(e, t) {
            for (var o = e.length; o--;) z[N(e[o])] = t;
            return t
        }

        function l(e) {
            var t = [],
                o = S.scrollHeight;
            do {
                var n = z[N(e)];
                if (n) return i(t, n);
                if (t.push(e), o === e.scrollHeight) {
                    if (!y || S.clientHeight + 10 < o) return i(t, document.body)
                } else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return i(t, e)
            } while (e = e.parentNode)
        }

        function u(e, t, o) {
            window.addEventListener(e, t, o || !1)
        }

        function c(e, t, o) {
            window.removeEventListener(e, t, o || !1)
        }

        function s(e, t) {
            return (e.nodeName || "").toLowerCase() === t.toLowerCase()
        }

        function d(e, t) {
            e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (k.x !== e || k.y !== t) && (k.x = e, k.y = t, M = [], C = 0)
        }

        function f(e) {
            if (e) {
                e = Math.abs(e), D.push(e), D.shift(), clearTimeout(A);
                var t = D[0] == D[1] && D[1] == D[2],
                    o = h(D[0], 120) && h(D[1], 120) && h(D[2], 120);
                return !(t || o)
            }
        }

        function h(e, t) {
            return Math.floor(e / t) == e / t
        }

        function m(e) {
            var t, o, n;
            return e *= v.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * v.pulseNormalize
        }

        function p(e) {
            return e >= 1 ? 1 : 0 >= e ? 0 : (1 == v.pulseNormalize && (v.pulseNormalize /= m(1)), m(e))
        }
        var w, g = {
                frameRate: 60,
                animationTime: 2000,
                stepSize: 120,
                pulseAlgorithm: !0,
                pulseScale: 8,
                pulseNormalize: 1,
                accelerationDelta: 20,
                accelerationMax: 1,
                keyboardSupport: !0,
                arrowScroll: 50,
                touchpadSupport: !0,
                fixedBackground: !0,
                excluded: ""
            },
            v = g,
            b = !1,
            y = !1,
            k = {
                x: 0,
                y: 0
            },
            x = !1,
            S = document.documentElement,
            D = [120, 120, 120],
            H = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            v = g,
            M = [],
            T = !1,
            C = +new Date,
            z = {};
        setInterval(function() {
            z = {}
        }, 1e4);
        var A, N = function() {
                var e = 0;
                return function(t) {
                    return t.uniqueID || (t.uniqueID = e++)
                }
            }(),
            E = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e, t, o) {
                    window.setTimeout(e, o || 1e3 / 60)
                }
            }(),
            K = /chrome|iPad/i.test(window.navigator.userAgent),
            L = "onmousewheel" in document;
        L && K && (u("mousedown", a), u("mousewheel", n), u("load", t))
    }();
}

function toggleOpacity(num) {
    for(let x of years) x.style.opacity = 0;
    years[num].style.opacity = 1;
}

function update100(){
    if(catC < 100)catC++;
    if(catC <= 70)engC++;
    bars[0].innerHTML = `${catC}%`;
    bars[1].innerHTML = `${catC}%`;
    bars[2].innerHTML = `${engC}%`;
}

function menuLinks() {
    let scrollsTo = ['#pres', '#yearEst', '#tecno', '#idiblue', '#trabajos', '#proyectos', '#contactame'];
    menuIt.forEach((e,i) => e.addEventListener('click', () => TweenLite.to(window, 2, {scrollTo: scrollsTo[i], ease: Power4.easeInOut})));
}