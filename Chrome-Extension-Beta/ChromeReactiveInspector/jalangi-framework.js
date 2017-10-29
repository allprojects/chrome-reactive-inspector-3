// console.log("myinst.js this contains everything regarding jalangi except analysis");
// demo.js START

(function (e, f) {
    function x(a) {
        var k = a.length, n = c.type(a);
        return c.isWindow(a) ? !1 : 1 === a.nodeType && k ? !0 : "array" === n || "function" !== n && (0 === k || "number" == typeof k && 0 < k && k - 1 in a)
    }

    function b(a) {
        var k = Lc[a] = {};
        return c.each(a.match(q) || [], function (a, c) {
            k[c] = !0
        }), k
    }

    function l(a, k, n, N) {
        if (c.acceptData(a)) {
            var d, g, b = c.expando, h = a.nodeType, q = h ? c.cache : a, e = h ? a[b] : a[b] && b;
            if (e && q[e] && (N || q[e].data) || n !== f || "string" != typeof k) return e || (e = h ? a[b] = S.pop() || c.guid++ : b), q[e] || (q[e] = h ? {} : {toJSON: c.noop}), ("object" == typeof k || "function" == typeof k) && (N ? q[e] = c.extend(q[e], k) : q[e].data = c.extend(q[e].data, k)), g = q[e], N || (g.data || (g.data = {}), g = g.data), n !== f && (g[c.camelCase(k)] = n), "string" == typeof k ? (d = g[k], null == d && (d = g[c.camelCase(k)])) : d = g, d
        }
    }

    function p(a, k, n) {
        if (c.acceptData(a)) {
            var N, d, g = a.nodeType, b = g ? c.cache : a, h = g ? a[c.expando] : c.expando;
            if (b[h]) {
                if (k && (N = n ? b[h] : b[h].data)) {
                    c.isArray(k) ? k = k.concat(c.map(k, c.camelCase)) : k in N ? k = [k] : (k = c.camelCase(k), k = k in N ? [k] : k.split(" "));
                    for (d = k.length; d--;) delete N[k[d]];
                    if (n ? !v(N) : !c.isEmptyObject(N)) return
                }
                (n || (delete b[h].data, v(b[h]))) && (g ? c.cleanData([a], !0) : c.support.deleteExpando || b != b.window ? delete b[h] : b[h] = null)
            }
        }
    }

    function m(a, k, n) {
        if (n === f && 1 === a.nodeType) {
            var d = "data-" + k.replace(Xc, "-$1").toLowerCase();
            if (n = a.getAttribute(d), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Qa.test(n) ? c.parseJSON(n) : n
                } catch (g) {
                }
                c.data(a, k, n)
            } else n = f
        }
        return n
    }

    function v(a) {
        for (var k in a) if (("data" !== k || !c.isEmptyObject(a[k])) && "toJSON" !==
            k) return !1;
        return !0
    }

    function r() {
        return !0
    }

    function u() {
        return !1
    }

    function F() {
        try {
            return J.activeElement
        } catch (a) {
        }
    }

    function ma(a, c) {
        do a = a[c]; while (a && 1 !== a.nodeType);
        return a
    }

    function da(a, k, n) {
        if (c.isFunction(k)) return c.grep(a, function (a, c) {
            return !!k.call(a, c, a) !== n
        });
        if (k.nodeType) return c.grep(a, function (a) {
            return a === k !== n
        });
        if ("string" == typeof k) {
            if (Cc.test(k)) return c.filter(k, a, n);
            k = c.filter(k, a)
        }
        return c.grep(a, function (a) {
            return 0 <= c.inArray(a, k) !== n
        })
    }

    function M(a) {
        var c = Va.split("|");
        a = a.createDocumentFragment();
        if (a.createElement) for (; c.length;) a.createElement(c.pop());
        return a
    }

    function Y(a, k) {
        return c.nodeName(a, "table") && c.nodeName(1 === k.nodeType ? k : k.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function fa(a) {
        return a.type = (null !== c.find.attr(a, "type")) + "/" + a.type, a
    }

    function H(a) {
        var c = nc.exec(a.type);
        return c ? a.type = c[1] : a.removeAttribute("type"), a
    }

    function B(a, k) {
        for (var n, d = 0; null != (n = a[d]); d++) c._data(n, "globalEval",
            !k || c._data(k[d], "globalEval"))
    }

    function Q(a, k) {
        if (1 === k.nodeType && c.hasData(a)) {
            var n, d, g;
            d = c._data(a);
            var b = c._data(k, d), h = d.events;
            if (h) for (n in delete b.handle, b.events = {}, h) for (d = 0, g = h[n].length; g > d; d++) c.event.add(k, n, h[n][d]);
            b.data && (b.data = c.extend({}, b.data))
        }
    }

    function s(a, k) {
        var n, d, g = 0,
            b = typeof a.getElementsByTagName !== ga ? a.getElementsByTagName(k || "*") : typeof a.querySelectorAll !== ga ? a.querySelectorAll(k || "*") : f;
        if (!b) for (b = [], n = a.childNodes || a; null != (d = n[g]); g++) !k || c.nodeName(d, k) ? b.push(d) :
            c.merge(b, s(d, k));
        return k === f || k && c.nodeName(a, k) ? c.merge([a], b) : b
    }

    function Ba(a) {
        qb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function P(a, c) {
        if (c in a) return c;
        for (var n = c.charAt(0).toUpperCase() + c.slice(1), d = c, g = oc.length; g--;) if (c = oc[g] + n, c in a) return c;
        return d
    }

    function D(a, k) {
        return a = k || a, "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
    }

    function L(a, k) {
        for (var n, d, g, b = [], h = 0, q = a.length; q > h; h++) d = a[h], d.style && (b[h] = c._data(d, "olddisplay"), n = d.style.display, k ? (b[h] || "none" !== n ||
        (d.style.display = ""), "" === d.style.display && D(d) && (b[h] = c._data(d, "olddisplay", V(d.nodeName)))) : b[h] || (g = D(d), (n && "none" !== n || !g) && c._data(d, "olddisplay", g ? n : c.css(d, "display"))));
        for (h = 0; q > h; h++) d = a[h], d.style && (k && "none" !== d.style.display && "" !== d.style.display || (d.style.display = k ? b[h] || "" : "none"));
        return a
    }

    function E(a, c, n) {
        return (a = ac.exec(c)) ? Math.max(0, a[1] - (n || 0)) + (a[2] || "px") : c
    }

    function na(a, k, n, d, g) {
        k = n === (d ? "border" : "content") ? 4 : "width" === k ? 1 : 0;
        for (var b = 0; 4 > k; k += 2) "margin" === n && (b += c.css(a,
            n + Ra[k], !0, g)), d ? ("content" === n && (b -= c.css(a, "padding" + Ra[k], !0, g)), "margin" !== n && (b -= c.css(a, "border" + Ra[k] + "Width", !0, g))) : (b += c.css(a, "padding" + Ra[k], !0, g), "padding" !== n && (b += c.css(a, "border" + Ra[k] + "Width", !0, g)));
        return b
    }

    function R(a, k, n) {
        var d = !0, g = "width" === k ? a.offsetWidth : a.offsetHeight, b = eb(a),
            h = c.support.boxSizing && "border-box" === c.css(a, "boxSizing", !1, b);
        if (0 >= g || null == g) {
            if (g = Wa(a, k, b), (0 > g || null == g) && (g = a.style[k]), Xa.test(g)) return g;
            d = h && (c.support.boxSizingReliable || g === a.style[k]);
            g = parseFloat(g) || 0
        }
        return g + na(a, k, n || (h ? "border" : "content"), d, b) + "px"
    }

    function V(a) {
        var k = J, n = Cb[a];
        return n || (n = ca(a, k), "none" !== n && n || (lb = (lb || c("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(k.documentElement), k = (lb[0].contentWindow || lb[0].contentDocument).document, k.write("<!doctype html><html><body>"), k.close(), n = ca(a, k), lb.detach()), Cb[a] = n), n
    }

    function ca(a, k) {
        var n = c(k.createElement(a)).appendTo(k.body), d = c.css(n[0], "display");
        return n.remove(),
            d
    }

    function X(a, k, n, d) {
        var g;
        if (c.isArray(k)) c.each(k, function (c, k) {
            n || bc.test(a) ? d(a, k) : X(a + "[" + ("object" == typeof k ? c : "") + "]", k, n, d)
        }); else if (n || "object" !== c.type(k)) d(a, k); else for (g in k) X(a + "[" + g + "]", k[g], n, d)
    }

    function ya(a) {
        return function (k, n) {
            "string" != typeof k && (n = k, k = "*");
            var d, g = 0, b = k.toLowerCase().match(q) || [];
            if (c.isFunction(n)) for (; d = b[g++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(n)) : (a[d] = a[d] || []).push(n)
        }
    }

    function qa(a, k, n, d) {
        function g(q) {
            var e;
            return b[q] = !0, c.each(a[q] ||
                [], function (a, c) {
                var q = c(k, n, d);
                return "string" != typeof q || h || b[q] ? h ? !(e = q) : f : (k.dataTypes.unshift(q), g(q), !1)
            }), e
        }

        var b = {}, h = a === W;
        return g(k.dataTypes[0]) || !b["*"] && g("*")
    }

    function K(a, k) {
        var n, d, g = c.ajaxSettings.flatOptions || {};
        for (d in k) k[d] !== f && ((g[d] ? a : n || (n = {}))[d] = k[d]);
        return n && c.extend(!0, a, n), a
    }

    function Z() {
        try {
            return new e.XMLHttpRequest
        } catch (a) {
        }
    }

    function Ha() {
        return setTimeout(function () {
            oa = f
        }), oa = c.now()
    }

    function Ya(a, c, n) {
        for (var d, g = (gb[c] || []).concat(gb["*"]), b = 0, h = g.length; h >
        b; b++) if (d = g[b].call(n, c, a)) return d
    }

    function w(a, k, n) {
        var d, g = 0, b = Fa.length, h = c.Deferred().always(function () {
            delete q.elem
        }), q = function () {
            if (d) return !1;
            for (var c = oa || Ha(), c = Math.max(0, e.startTime + e.duration - c), k = 1 - (c / e.duration || 0), n = 0, g = e.tweens.length; g > n; n++) e.tweens[n].run(k);
            return h.notifyWith(a, [e, k, c]), 1 > k && g ? c : (h.resolveWith(a, [e]), !1)
        }, e = h.promise({
            elem: a,
            props: c.extend({}, k),
            opts: c.extend(!0, {specialEasing: {}}, n),
            originalProperties: k,
            originalOptions: n,
            startTime: oa || Ha(),
            duration: n.duration,
            tweens: [],
            createTween: function (k, n) {
                var d = c.Tween(a, e.opts, k, n, e.opts.specialEasing[k] || e.opts.easing);
                return e.tweens.push(d), d
            },
            stop: function (c) {
                var k = 0, n = c ? e.tweens.length : 0;
                if (d) return this;
                for (d = !0; n > k; k++) e.tweens[k].run(1);
                return c ? h.resolveWith(a, [e, c]) : h.rejectWith(a, [e, c]), this
            }
        });
        n = e.props;
        for (z(n, e.opts.specialEasing); b > g; g++) if (k = Fa[g].call(e, a, n, e.opts)) return k;
        return c.map(n, Ya, e), c.isFunction(e.opts.start) && e.opts.start.call(a, e), c.fx.timer(c.extend(q, {
            elem: a,
            anim: e,
            queue: e.opts.queue
        })),
            e.progress(e.opts.progress).done(e.opts.done, e.opts.complete).fail(e.opts.fail).always(e.opts.always)
    }

    function z(a, k) {
        var n, d, g, b, h;
        for (n in a) if (d = c.camelCase(n), g = k[d], b = a[n], c.isArray(b) && (g = b[1], b = a[n] = b[0]), n !== d && (a[d] = b, delete a[n]), h = c.cssHooks[d], h && "expand" in h) for (n in b = h.expand(b), delete a[d], b) n in a || (a[n] = b[n], k[n] = g); else k[d] = g
    }

    function ja(a, c, n, d, g) {
        return new ja.prototype.init(a, c, n, d, g)
    }

    function Ia(a, c) {
        var n, d = {height: a}, g = 0;
        for (c = c ? 1 : 0; 4 > g; g += 2 - c) n = Ra[g], d["margin" + n] = d["padding" +
        n] = a;
        return c && (d.opacity = d.width = a), d
    }

    function aa(a) {
        return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var wa, U, ga = typeof f, ha = e.location, J = e.document, Db = J.documentElement, Za = e.jQuery, Eb = e.$, ea = {},
        S = [], rb = S.concat, $a = S.push, la = S.slice, ab = S.indexOf, Ca = ea.toString, za = ea.hasOwnProperty,
        g = "1.10.2".trim, c = function (a, k) {
            return new c.fn.init(a, k, U)
        }, d = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, q = /\S+/g, h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        C = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        t = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Na = /^[\],:{}\s]*$/, ia = /(?:^|:|,)(?:\s*\[)+/g,
        Rb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        ec = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, Dc = /^-ms-/, La = /-([\da-z])/gi,
        Yc = function (a, c) {
            return c.toUpperCase()
        }, sb = function (a) {
            (J.addEventListener || "load" === a.type || "complete" === J.readyState) && (Mc(), c.ready())
        }, Mc = function () {
            J.addEventListener ? (J.removeEventListener("DOMContentLoaded", sb, !1), e.removeEventListener("load", sb, !1)) : (J.detachEvent("onreadystatechange",
                sb), e.detachEvent("onload", sb))
        };
    c.fn = c.prototype = {
        jquery: "1.10.2", constructor: c, init: function (a, k, n) {
            var d, g;
            if (!a) return this;
            if ("string" == typeof a) {
                if (d = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : C.exec(a), !d || !d[1] && k) return !k || k.jquery ? (k || n).find(a) : this.constructor(k).find(a);
                if (d[1]) {
                    if (k = k instanceof c ? k[0] : k, c.merge(this, c.parseHTML(d[1], k && k.nodeType ? k.ownerDocument || k : J, !0)), t.test(d[1]) && c.isPlainObject(k)) for (d in k) c.isFunction(this[d]) ? this[d](k[d]) : this.attr(d,
                        k[d]);
                    return this
                }
                if (g = J.getElementById(d[2]), g && g.parentNode) {
                    if (g.id !== d[2]) return n.find(a);
                    this.length = 1;
                    this[0] = g
                }
                return this.context = J, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : c.isFunction(a) ? n.ready(a) : (a.selector !== f && (this.selector = a.selector, this.context = a.context), c.makeArray(a, this))
        }, selector: "", length: 0, toArray: function () {
            return la.call(this)
        }, get: function (a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        }, pushStack: function (a) {
            a =
                c.merge(this.constructor(), a);
            return a.prevObject = this, a.context = this.context, a
        }, each: function (a, k) {
            return c.each(this, a, k)
        }, ready: function (a) {
            return c.ready.promise().done(a), this
        }, slice: function () {
            return this.pushStack(la.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var c = this.length;
            a = +a + (0 > a ? c : 0);
            return this.pushStack(0 <= a && c > a ? [this[a]] : [])
        }, map: function (a) {
            return this.pushStack(c.map(this, function (c, n) {
                return a.call(c, n, c)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        }, push: $a, sort: [].sort, splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function () {
        var a, k, n, d, g, b, h = arguments[0] || {}, e = 1, q = arguments.length, l = !1;
        "boolean" == typeof h && (l = h, h = arguments[1] || {}, e = 2);
        "object" == typeof h || c.isFunction(h) || (h = {});
        for (q === e && (h = this, --e); q > e; e++) if (null != (g = arguments[e])) for (d in g) a = h[d], n = g[d], h !== n && (l && n && (c.isPlainObject(n) || (k = c.isArray(n))) ? (k ? (k = !1, b = a && c.isArray(a) ? a : []) : b = a && c.isPlainObject(a) ?
            a : {}, h[d] = c.extend(l, b, n)) : n !== f && (h[d] = n));
        return h
    };
    c.extend({
        expando: "jQuery" + ("1.10.2" + Math.random()).replace(/\D/g, ""), noConflict: function (a) {
            return e.$ === c && (e.$ = Eb), a && e.jQuery === c && (e.jQuery = Za), c
        }, isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? c.readyWait++ : c.ready(!0)
        }, ready: function (a) {
            if (!0 === a ? !--c.readyWait : !c.isReady) {
                if (!J.body) return setTimeout(c.ready);
                c.isReady = !0;
                !0 !== a && 0 < --c.readyWait || (wa.resolveWith(J, [c]), c.fn.trigger && c(J).trigger("ready").off("ready"))
            }
        }, isFunction: function (a) {
            return "function" ===
                c.type(a)
        }, isArray: Array.isArray || function (a) {
            return "array" === c.type(a)
        }, isWindow: function (a) {
            return null != a && a == a.window
        }, isNumeric: function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ea[Ca.call(a)] || "object" : typeof a
        }, isPlainObject: function (a) {
            var k;
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
            try {
                if (a.constructor && !za.call(a, "constructor") && !za.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (c.support.ownLast) for (k in a) return za.call(a,
                k);
            for (k in a) ;
            return k === f || za.call(a, k)
        }, isEmptyObject: function (a) {
            for (var c in a) return !1;
            return !0
        }, error: function (a) {
            throw Error(a);
        }, parseHTML: function (a, k, n) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof k && (n = k, k = !1);
            k = k || J;
            var d = t.exec(a);
            n = !n && [];
            return d ? [k.createElement(d[1])] : (d = c.buildFragment([a], k, n), n && c(n).remove(), c.merge([], d.childNodes))
        }, parseJSON: function (a) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(a) : null === a ? a : "string" == typeof a && (a = c.trim(a), a && Na.test(a.replace(Rb,
                "@").replace(ec, "]").replace(ia, ""))) ? Function("return " + a)() : (c.error("Invalid JSON: " + a), f)
        }, parseXML: function (a) {
            var k, n;
            if (!a || "string" != typeof a) return null;
            try {
                e.DOMParser ? (n = new DOMParser, k = n.parseFromString(a, "text/xml")) : (k = new ActiveXObject("Microsoft.XMLDOM"), k.async = "false", k.loadXML(a))
            } catch (d) {
                k = f
            }
            return k && k.documentElement && !k.getElementsByTagName("parsererror").length || c.error("Invalid XML: " + a), k
        }, noop: function () {
        }, globalEval: function (a) {
            a && c.trim(a) && (e.execScript || function (a) {
                e.eval.call(e,
                    a)
            })(a)
        }, camelCase: function (a) {
            return a.replace(Dc, "ms-").replace(La, Yc)
        }, nodeName: function (a, c) {
            return a.nodeName && a.nodeName.toLowerCase() === c.toLowerCase()
        }, each: function (a, c, n) {
            var d, g = 0, b = a.length, h = x(a);
            if (n) if (h) for (; b > g && (d = c.apply(a[g], n), !1 !== d); g++) ; else for (g in a) {
                if (d = c.apply(a[g], n), !1 === d) break
            } else if (h) for (; b > g && (d = c.call(a[g], g, a[g]), !1 !== d); g++) ; else for (g in a) if (d = c.call(a[g], g, a[g]), !1 === d) break;
            return a
        }, trim: g && !g.call("\ufeff\u00a0") ? function (a) {
                return null == a ? "" : g.call(a)
            } :
            function (a) {
                return null == a ? "" : (a + "").replace(h, "")
            }, makeArray: function (a, k) {
            var n = k || [];
            return null != a && (x(Object(a)) ? c.merge(n, "string" == typeof a ? [a] : a) : $a.call(n, a)), n
        }, inArray: function (a, c, n) {
            var d;
            if (c) {
                if (ab) return ab.call(c, a, n);
                d = c.length;
                for (n = n ? 0 > n ? Math.max(0, d + n) : n : 0; d > n; n++) if (n in c && c[n] === a) return n
            }
            return -1
        }, merge: function (a, c) {
            var n = c.length, d = a.length, g = 0;
            if ("number" == typeof n) for (; n > g; g++) a[d++] = c[g]; else for (; c[g] !== f;) a[d++] = c[g++];
            return a.length = d, a
        }, grep: function (a, c, n) {
            var d,
                g = [], b = 0, h = a.length;
            for (n = !!n; h > b; b++) d = !!c(a[b], b), n !== d && g.push(a[b]);
            return g
        }, map: function (a, c, n) {
            var d, g = 0, b = a.length, h = [];
            if (x(a)) for (; b > g; g++) d = c(a[g], g, n), null != d && (h[h.length] = d); else for (g in a) d = c(a[g], g, n), null != d && (h[h.length] = d);
            return rb.apply([], h)
        }, guid: 1, proxy: function (a, k) {
            var n, d, g;
            return "string" == typeof k && (g = a[k], k = a, a = g), c.isFunction(a) ? (n = la.call(arguments, 2), d = function () {
                return a.apply(k || this, n.concat(la.call(arguments)))
            }, d.guid = a.guid = a.guid || c.guid++, d) : f
        }, access: function (a,
                             k, n, d, g, b, h) {
            var e = 0, q = a.length, l = null == n;
            if ("object" === c.type(n)) for (e in g = !0, n) c.access(a, k, e, n[e], !0, b, h); else if (d !== f && (g = !0, c.isFunction(d) || (h = !0), l && (h ? (k.call(a, d), k = null) : (l = k, k = function (a, k, n) {
                    return l.call(c(a), n)
                })), k)) for (; q > e; e++) k(a[e], n, h ? d : d.call(a[e], e, k(a[e], n)));
            return g ? a : l ? k.call(a) : q ? k(a[0], n) : b
        }, now: function () {
            return (new Date).getTime()
        }, swap: function (a, c, n, d) {
            var g, b = {};
            for (g in c) b[g] = a.style[g], a.style[g] = c[g];
            n = n.apply(a, d || []);
            for (g in c) a.style[g] = b[g];
            return n
        }
    });
    c.ready.promise = function (a) {
        if (!wa) if (wa = c.Deferred(), "complete" === J.readyState) setTimeout(c.ready); else if (J.addEventListener) J.addEventListener("DOMContentLoaded", sb, !1), e.addEventListener("load", sb, !1); else {
            J.attachEvent("onreadystatechange", sb);
            e.attachEvent("onload", sb);
            var k = !1;
            try {
                k = null == e.frameElement && J.documentElement
            } catch (n) {
            }
            k && k.doScroll && function sa() {
                if (!c.isReady) {
                    try {
                        k.doScroll("left")
                    } catch (a) {
                        return setTimeout(sa, 50)
                    }
                    Mc();
                    c.ready()
                }
            }()
        }
        return wa.promise(a)
    };
    c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function (a, c) {
            ea["[object " + c + "]"] = c.toLowerCase()
        });
    U = c(J);
    (function (a, k) {
        function n(a, c, k, n) {
            var d, g, G, b, h;
            if ((c ? c.ownerDocument || c : ha) !== ia && A(c), c = c || ia, k = k || [], !a || "string" != typeof a) return k;
            if (1 !== (b = c.nodeType) && 9 !== b) return [];
            if (D && !n) {
                if (d = X.exec(a)) if (G = d[1]) if (9 === b) {
                    if (g = c.getElementById(G), !g || !g.parentNode) return k;
                    if (g.id === G) return k.push(g), k
                } else {
                    if (c.ownerDocument && (g = c.ownerDocument.getElementById(G)) && La(c, g) && g.id === G) return k.push(g), k
                } else {
                    if (d[2]) return M.apply(k, c.getElementsByTagName(a)),
                        k;
                    if ((G = d[3]) && B.getElementsByClassName && c.getElementsByClassName) return M.apply(k, c.getElementsByClassName(G)), k
                }
                if (B.qsa && (!x || !x.test(a))) {
                    if (g = d = E, G = c, h = 9 === b && a, 1 === b && "object" !== c.nodeName.toLowerCase()) {
                        b = C(a);
                        (d = c.getAttribute("id")) ? g = d.replace(Z, "\\$&") : c.setAttribute("id", g);
                        g = "[id='" + g + "'] ";
                        for (G = b.length; G--;) b[G] = g + p(b[G]);
                        G = va.test(a) && c.parentNode || c;
                        h = b.join(",")
                    }
                    if (h) try {
                        return M.apply(k, G.querySelectorAll(h)), k
                    } catch (e) {
                    } finally {
                        d || c.removeAttribute("id")
                    }
                }
            }
            var q;
            a:{
                a = a.replace(Rb,
                    "$1");
                var N, f;
                g = C(a);
                if (!n && 1 === g.length) {
                    if (q = g[0] = g[0].slice(0), 2 < q.length && "ID" === (N = q[0]).type && B.getById && 9 === c.nodeType && D && s.relative[q[1].type]) {
                        if (c = (s.find.ID(N.matches[0].replace(W, aa), c) || [])[0], !c) {
                            q = k;
                            break a
                        }
                        a = a.slice(q.shift().value.length)
                    }
                    for (b = R.needsContext.test(a) ? 0 : q.length; b-- && (N = q[b], !s.relative[d = N.type]);) if ((f = s.find[d]) && (n = f(N.matches[0].replace(W, aa), va.test(q[0].type) && c.parentNode || c))) {
                        if (q.splice(b, 1), a = n.length && p(q), !a) {
                            q = (M.apply(k, n), k);
                            break a
                        }
                        break
                    }
                }
                q = (y(a,
                    g)(n, c, !D, k, va.test(a)), k)
            }
            return q
        }

        function d() {
            function a(k, n) {
                return c.push(k += " ") > s.cacheLength && delete a[c.shift()], a[k] = n
            }

            var c = [];
            return a
        }

        function g(a) {
            return a[E] = !0, a
        }

        function b(a) {
            var c = ia.createElement("div");
            try {
                return !!a(c)
            } catch (k) {
                return !1
            } finally {
                c.parentNode && c.parentNode.removeChild(c)
            }
        }

        function h(a, c) {
            for (var k = a.split("|"), n = a.length; n--;) s.attrHandle[k[n]] = c
        }

        function e(a, c) {
            var k = c && a,
                n = k && 1 === a.nodeType && 1 === c.nodeType && (~c.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
            if (n) return n;
            if (k) for (; k = k.nextSibling;) if (k === c) return -1;
            return a ? 1 : -1
        }

        function q(a) {
            return function (c) {
                return "input" === c.nodeName.toLowerCase() && c.type === a
            }
        }

        function f(a) {
            return function (c) {
                var k = c.nodeName.toLowerCase();
                return ("input" === k || "button" === k) && c.type === a
            }
        }

        function l(a) {
            return g(function (c) {
                return c = +c, g(function (k, n) {
                    for (var d, g = a([], k.length, c), G = g.length; G--;) k[d = g[G]] && (k[d] = !(n[d] = k[d]))
                })
            })
        }

        function t() {
        }

        function C(a, c) {
            var k, d, g, G, b, h, e;
            if (b = ba[a + " "]) return c ? 0 : b.slice(0);
            b =
                a;
            h = [];
            for (e = s.preFilter; b;) {
                k && !(d = O.exec(b)) || (d && (b = b.slice(d[0].length) || b), h.push(g = []));
                k = !1;
                (d = S.exec(b)) && (k = d.shift(), g.push({
                    value: k,
                    type: d[0].replace(Rb, " ")
                }), b = b.slice(k.length));
                for (G in s.filter) !(d = R[G].exec(b)) || e[G] && !(d = e[G](d)) || (k = d.shift(), g.push({
                    value: k,
                    type: G,
                    matches: d
                }), b = b.slice(k.length));
                if (!k) break
            }
            return c ? b.length : b ? n.error(a) : ba(a, h).slice(0)
        }

        function p(a) {
            for (var c = 0, k = a.length, d = ""; k > c; c++) d += a[c].value;
            return d
        }

        function m(a, c, k) {
            var d = c.dir, n = k && "parentNode" ===
                d, g = G++;
            return c.first ? function (c, k, g) {
                for (; c = c[d];) if (1 === c.nodeType || n) return a(c, k, g)
            } : function (c, k, G) {
                var b, h, e, q = P + " " + g;
                if (G) for (; c = c[d];) {
                    if ((1 === c.nodeType || n) && a(c, k, G)) return !0
                } else for (; c = c[d];) if (1 === c.nodeType || n) if (e = c[E] || (c[E] = {}), (h = e[d]) && h[0] === q) {
                    if (!0 === (b = h[1]) || b === F) return !0 === b
                } else if (h = e[d] = [q], h[1] = a(c, k, G) || F, !0 === h[1]) return !0
            }
        }

        function u(a) {
            return 1 < a.length ? function (c, k, d) {
                for (var n = a.length; n--;) if (!a[n](c, k, d)) return !1;
                return !0
            } : a[0]
        }

        function r(a, c, k, d, n) {
            for (var g,
                     G = [], b = 0, h = a.length, e = null != c; h > b; b++) (g = a[b]) && (!k || k(g, d, n)) && (G.push(g), e && c.push(b));
            return G
        }

        function H(a, c, k, d, G, b) {
            return d && !d[E] && (d = H(d)), G && !G[E] && (G = H(G, b)), g(function (g, b, h, e) {
                var q, N, f = [], sa = [], pa = b.length, l;
                if (!(l = g)) {
                    l = c || "*";
                    for (var ba = h.nodeType ? [h] : h, Ea = [], t = 0, C = ba.length; C > t; t++) n(l, ba[t], Ea);
                    l = Ea
                }
                l = !a || !g && c ? l : r(l, f, a, h, e);
                ba = k ? G || (g ? a : pa || d) ? [] : b : l;
                if (k && k(l, ba, h, e), d) for (q = r(ba, sa), d(q, [], h, e), h = q.length; h--;) (N = q[h]) && (ba[sa[h]] = !(l[sa[h]] = N));
                if (g) {
                    if (G || a) {
                        if (G) {
                            q = [];
                            for (h =
                                     ba.length; h--;) (N = ba[h]) && q.push(l[h] = N);
                            G(null, ba = [], q, e)
                        }
                        for (h = ba.length; h--;) (N = ba[h]) && -1 < (q = G ? I.call(g, N) : f[h]) && (g[q] = !(b[q] = N))
                    }
                } else ba = r(ba === b ? ba.splice(pa, ba.length) : ba), G ? G(null, b, ba, e) : M.apply(b, ba)
            })
        }

        function U(a) {
            var c, k, d, n = a.length, g = s.relative[a[0].type];
            k = g || s.relative[" "];
            for (var G = g ? 1 : 0, b = m(function (a) {
                return a === c
            }, k, !0), h = m(function (a) {
                return -1 < I.call(c, a)
            }, k, !0), e = [function (a, k, d) {
                return !g && (d || k !== ma) || ((c = k).nodeType ? b(a, k, d) : h(a, k, d))
            }]; n > G; G++) if (k = s.relative[a[G].type]) e =
                [m(u(e), k)]; else {
                if (k = s.filter[a[G].type].apply(null, a[G].matches), k[E]) {
                    for (d = ++G; n > d && !s.relative[a[d].type]; d++) ;
                    return H(1 < G && u(e), 1 < G && p(a.slice(0, G - 1).concat({value: " " === a[G - 2].type ? "*" : ""})).replace(Rb, "$1"), k, d > G && U(a.slice(G, d)), n > d && U(a = a.slice(d)), n > d && p(a))
                }
                e.push(k)
            }
            return u(e)
        }

        function Na(a, c) {
            var k = 0, d = 0 < c.length, G = 0 < a.length, b = function (g, b, h, e, q) {
                var N, f, sa = [], pa = 0, ba = "0", l = g && [], Ea = null != q, t = ma,
                    C = g || G && s.find.TAG("*", q && b.parentNode || b),
                    Bb = P += null == t ? 1 : Math.random() || .1;
                for (Ea &&
                     (ma = b !== ia && b, F = k); null != (q = C[ba]); ba++) {
                    if (G && q) {
                        for (N = 0; f = a[N++];) if (f(q, b, h)) {
                            e.push(q);
                            break
                        }
                        Ea && (P = Bb, F = ++k)
                    }
                    d && ((q = !f && q) && pa--, g && l.push(q))
                }
                if (pa += ba, d && ba !== pa) {
                    for (N = 0; f = c[N++];) f(l, sa, b, h);
                    if (g) {
                        if (0 < pa) for (; ba--;) l[ba] || sa[ba] || (sa[ba] = Zc.call(e));
                        sa = r(sa)
                    }
                    M.apply(e, sa);
                    Ea && !g && 0 < sa.length && 1 < pa + c.length && n.uniqueSort(e)
                }
                return Ea && (P = Bb, ma = t), l
            };
            return d ? g(b) : b
        }

        var v, B, F, s, Q, w, y, ma, J, A, ia, z, D, x, da, ga, La, E = "sizzle" + -new Date, ha = a.document, P = 0,
            G = 0, pa = d(), ba = d(), qc = d(), Tb = !1, Hc = function (a,
                                                                         c) {
                return a === c ? (Tb = !0, 0) : 0
            }, gc = typeof k, $c = {}.hasOwnProperty, xb = [], Zc = xb.pop, Y = xb.push, M = xb.push, L = xb.slice,
            I = xb.indexOf || function (a) {
                for (var c = 0, k = this.length; k > c; c++) if (this[c] === a) return c;
                return -1
            }, Ba = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
            K = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + Ba + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
            ec = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
                K.replace(3, 8) + ")*)|.*)\\)|)",
            Rb = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
            O = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, S = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
            va = /[\x20\t\r\n\f]*[+~]/, T = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]", "g"),
            Dc = RegExp(ec), fa = RegExp("^" + Ba + "$"), R = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: RegExp("^" +
                    K),
                PSEUDO: RegExp("^" + ec),
                CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
            }, V = /^[^{]+\{\s*\[native \w/, X = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            na = /^(?:input|select|textarea|button)$/i, ca = /^h\d$/i, Z = /'|\\/g,
            W = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"),
            aa = function (a, c, k) {
                a = "0x" + c - 65536;
                return a !== a || k ? c : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a)
            };
        try {
            M.apply(xb = L.call(ha.childNodes), ha.childNodes), xb[ha.childNodes.length].nodeType
        } catch (Za) {
            M = {
                apply: xb.length ? function (a, c) {
                    Y.apply(a, L.call(c))
                } : function (a, c) {
                    for (var k = a.length, d = 0; a[k++] = c[d++];) ;
                    a.length = k - 1
                }
            }
        }
        w = n.isXML =
            function (a) {
                return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
            };
        B = n.support = {};
        A = n.setDocument = function (a) {
            var c = a ? a.ownerDocument || a : ha;
            a = c.defaultView;
            return c !== ia && 9 === c.nodeType && c.documentElement ? (ia = c, z = c.documentElement, D = !w(c), a && a.attachEvent && a !== a.top && a.attachEvent("onbeforeunload", function () {
                A()
            }), B.attributes = b(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), B.getElementsByTagName = b(function (a) {
                return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
            }),
                B.getElementsByClassName = b(function (a) {
                    return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                }), B.getById = b(function (a) {
                return z.appendChild(a).id = E, !c.getElementsByName || !c.getElementsByName(E).length
            }), B.getById ? (s.find.ID = function (a, c) {
                if (typeof c.getElementById !== gc && D) {
                    var k = c.getElementById(a);
                    return k && k.parentNode ? [k] : []
                }
            }, s.filter.ID = function (a) {
                var c = a.replace(W, aa);
                return function (a) {
                    return a.getAttribute("id") ===
                        c
                }
            }) : (delete s.find.ID, s.filter.ID = function (a) {
                var c = a.replace(W, aa);
                return function (a) {
                    return (a = typeof a.getAttributeNode !== gc && a.getAttributeNode("id")) && a.value === c
                }
            }), s.find.TAG = B.getElementsByTagName ? function (a, c) {
                return typeof c.getElementsByTagName !== gc ? c.getElementsByTagName(a) : k
            } : function (a, c) {
                var k, d = [], n = 0, g = c.getElementsByTagName(a);
                if ("*" === a) {
                    for (; k = g[n++];) 1 === k.nodeType && d.push(k);
                    return d
                }
                return g
            }, s.find.CLASS = B.getElementsByClassName && function (a, c) {
                return typeof c.getElementsByClassName !==
                gc && D ? c.getElementsByClassName(a) : k
            }, da = [], x = [], (B.qsa = V.test(c.querySelectorAll)) && (b(function (a) {
                a.innerHTML = "<select><option selected=''></option></select>";
                a.querySelectorAll("[selected]").length || x.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                a.querySelectorAll(":checked").length || x.push(":checked")
            }), b(function (a) {
                var k = c.createElement("input");
                k.setAttribute("type", "hidden");
                a.appendChild(k).setAttribute("t", "");
                a.querySelectorAll("[t^='']").length && x.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                a.querySelectorAll(":enabled").length || x.push(":enabled", ":disabled");
                a.querySelectorAll("*,:x");
                x.push(",.*:")
            })), (B.matchesSelector = V.test(ga = z.webkitMatchesSelector || z.mozMatchesSelector || z.oMatchesSelector || z.msMatchesSelector)) && b(function (a) {
                B.disconnectedMatch = ga.call(a, "div");
                ga.call(a, "[s!='']:x");
                da.push("!=", ec)
            }), x = x.length && RegExp(x.join("|")), da = da.length && RegExp(da.join("|")),
                La = V.test(z.contains) || z.compareDocumentPosition ? function (a, c) {
                    var k = 9 === a.nodeType ? a.documentElement : a, d = c && c.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(k.contains ? k.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function (a, c) {
                    if (c) for (; c = c.parentNode;) if (c === a) return !0;
                    return !1
                }, Hc = z.compareDocumentPosition ? function (a, k) {
                if (a === k) return Tb = !0, 0;
                var d = k.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(k);
                return d ? 1 & d || !B.sortDetached &&
                k.compareDocumentPosition(a) === d ? a === c || La(ha, a) ? -1 : k === c || La(ha, k) ? 1 : J ? I.call(J, a) - I.call(J, k) : 0 : 4 & d ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            } : function (a, k) {
                var d, n = 0;
                d = a.parentNode;
                var g = k.parentNode, G = [a], b = [k];
                if (a === k) return Tb = !0, 0;
                if (!d || !g) return a === c ? -1 : k === c ? 1 : d ? -1 : g ? 1 : J ? I.call(J, a) - I.call(J, k) : 0;
                if (d === g) return e(a, k);
                for (d = a; d = d.parentNode;) G.unshift(d);
                for (d = k; d = d.parentNode;) b.unshift(d);
                for (; G[n] === b[n];) n++;
                return n ? e(G[n], b[n]) : G[n] === ha ? -1 : b[n] === ha ? 1 : 0
            }, c) : ia
        };
        n.matches = function (a,
                              c) {
            return n(a, null, null, c)
        };
        n.matchesSelector = function (a, c) {
            if ((a.ownerDocument || a) !== ia && A(a), c = c.replace(T, "='$1']"), !(!B.matchesSelector || !D || da && da.test(c) || x && x.test(c))) try {
                var k = ga.call(a, c);
                if (k || B.disconnectedMatch || a.document && 11 !== a.document.nodeType) return k
            } catch (d) {
            }
            return 0 < n(c, ia, null, [a]).length
        };
        n.contains = function (a, c) {
            return (a.ownerDocument || a) !== ia && A(a), La(a, c)
        };
        n.attr = function (a, c) {
            (a.ownerDocument || a) !== ia && A(a);
            var d = s.attrHandle[c.toLowerCase()], d = d && $c.call(s.attrHandle,
                c.toLowerCase()) ? d(a, c, !D) : k;
            return d === k ? B.attributes || !D ? a.getAttribute(c) : (d = a.getAttributeNode(c)) && d.specified ? d.value : null : d
        };
        n.error = function (a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        };
        n.uniqueSort = function (a) {
            var c, k = [], d = 0, n = 0;
            if (Tb = !B.detectDuplicates, J = !B.sortStable && a.slice(0), a.sort(Hc), Tb) {
                for (; c = a[n++];) c === a[n] && (d = k.push(n));
                for (; d--;) a.splice(k[d], 1)
            }
            return a
        };
        Q = n.getText = function (a) {
            var c, k = "", d = 0;
            if (c = a.nodeType) if (1 === c || 9 === c || 11 === c) {
                if ("string" == typeof a.textContent) return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling) k += Q(a)
            } else {
                if (3 === c || 4 === c) return a.nodeValue
            } else for (; c = a[d]; d++) k += Q(c);
            return k
        };
        s = n.selectors = {
            cacheLength: 50,
            createPseudo: g,
            match: R,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(W, aa), a[3] = (a[4] || a[5] || "").replace(W, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] =
                        a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || n.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && n.error(a[0]), a
                }, PSEUDO: function (a) {
                    var c, d = !a[5] && a[2];
                    return R.CHILD.test(a[0]) ? null : (a[3] && a[4] !== k ? a[2] = a[4] : d && Dc.test(d) && (c = C(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (a[0] = a[0].slice(0, c), a[2] = d.slice(0, c)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var c = a.replace(W, aa).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName &&
                            a.nodeName.toLowerCase() === c
                    }
                }, CLASS: function (a) {
                    var c = pa[a + " "];
                    return c || (c = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && pa(a, function (a) {
                        return c.test("string" == typeof a.className && a.className || typeof a.getAttribute !== gc && a.getAttribute("class") || "")
                    })
                }, ATTR: function (a, c, k) {
                    return function (d) {
                        d = n.attr(d, a);
                        return null == d ? "!=" === c : c ? (d += "", "=" === c ? d === k : "!=" === c ? d !== k : "^=" === c ? k && 0 === d.indexOf(k) : "*=" === c ? k && -1 < d.indexOf(k) : "$=" === c ? k && d.slice(-k.length) === k : "~=" === c ? -1 < (" " +
                            d + " ").indexOf(k) : "|=" === c ? d === k || d.slice(0, k.length + 1) === k + "-" : !1) : !0
                    }
                }, CHILD: function (a, c, k, d, n) {
                    var g = "nth" !== a.slice(0, 3), G = "last" !== a.slice(-4), b = "of-type" === c;
                    return 1 === d && 0 === n ? function (a) {
                        return !!a.parentNode
                    } : function (c, k, h) {
                        var e, q, N, f, sa;
                        k = g !== G ? "nextSibling" : "previousSibling";
                        var pa = c.parentNode, ba = b && c.nodeName.toLowerCase();
                        h = !h && !b;
                        if (pa) {
                            if (g) {
                                for (; k;) {
                                    for (q = c; q = q[k];) if (b ? q.nodeName.toLowerCase() === ba : 1 === q.nodeType) return !1;
                                    sa = k = "only" === a && !sa && "nextSibling"
                                }
                                return !0
                            }
                            if (sa = [G ?
                                    pa.firstChild : pa.lastChild], G && h) for (h = pa[E] || (pa[E] = {}), e = h[a] || [], f = e[0] === P && e[1], N = e[0] === P && e[2], q = f && pa.childNodes[f]; q = ++f && q && q[k] || (N = f = 0) || sa.pop();) {
                                if (1 === q.nodeType && ++N && q === c) {
                                    h[a] = [P, f, N];
                                    break
                                }
                            } else if (h && (e = (c[E] || (c[E] = {}))[a]) && e[0] === P) N = e[1]; else for (; (q = ++f && q && q[k] || (N = f = 0) || sa.pop()) && ((b ? q.nodeName.toLowerCase() !== ba : 1 !== q.nodeType) || !++N || (h && ((q[E] || (q[E] = {}))[a] = [P, N]), q !== c));) ;
                            return N -= n, N === d || 0 === N % d && 0 <= N / d
                        }
                    }
                }, PSEUDO: function (a, c) {
                    var k, d = s.pseudos[a] || s.setFilters[a.toLowerCase()] ||
                        n.error("unsupported pseudo: " + a);
                    return d[E] ? d(c) : 1 < d.length ? (k = [a, a, "", c], s.setFilters.hasOwnProperty(a.toLowerCase()) ? g(function (a, k) {
                        for (var n, g = d(a, c), G = g.length; G--;) n = I.call(a, g[G]), a[n] = !(k[n] = g[G])
                    }) : function (a) {
                        return d(a, 0, k)
                    }) : d
                }
            },
            pseudos: {
                not: g(function (a) {
                    var c = [], k = [], d = y(a.replace(Rb, "$1"));
                    return d[E] ? g(function (a, c, k, n) {
                        var g;
                        k = d(a, null, n, []);
                        for (n = a.length; n--;) (g = k[n]) && (a[n] = !(c[n] = g))
                    }) : function (a, n, g) {
                        return c[0] = a, d(c, null, g, k), !k.pop()
                    }
                }), has: g(function (a) {
                    return function (c) {
                        return 0 <
                            n(a, c).length
                    }
                }), contains: g(function (a) {
                    return function (c) {
                        return -1 < (c.textContent || c.innerText || Q(c)).indexOf(a)
                    }
                }), lang: g(function (a) {
                    return fa.test(a || "") || n.error("unsupported lang: " + a), a = a.replace(W, aa).toLowerCase(), function (c) {
                        var k;
                        do if (k = D ? c.lang : c.getAttribute("xml:lang") || c.getAttribute("lang")) return k = k.toLowerCase(), k === a || 0 === k.indexOf(a + "-"); while ((c = c.parentNode) && 1 === c.nodeType);
                        return !1
                    }
                }), target: function (c) {
                    var k = a.location && a.location.hash;
                    return k && k.slice(1) === c.id
                }, root: function (a) {
                    return a ===
                        z
                }, focus: function (a) {
                    return a === ia.activeElement && (!ia.hasFocus || ia.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                }, enabled: function (a) {
                    return !1 === a.disabled
                }, disabled: function (a) {
                    return !0 === a.disabled
                }, checked: function (a) {
                    var c = a.nodeName.toLowerCase();
                    return "input" === c && !!a.checked || "option" === c && !!a.selected
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if ("@" < a.nodeName || 3 === a.nodeType || 4 === a.nodeType) return !1;
                    return !0
                }, parent: function (a) {
                    return !s.pseudos.empty(a)
                }, header: function (a) {
                    return ca.test(a.nodeName)
                }, input: function (a) {
                    return na.test(a.nodeName)
                }, button: function (a) {
                    var c = a.nodeName.toLowerCase();
                    return "input" === c && "button" === a.type || "button" === c
                }, text: function (a) {
                    var c;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (c = a.getAttribute("type")) || c.toLowerCase() === a.type)
                }, first: l(function () {
                    return [0]
                }), last: l(function (a, c) {
                    return [c - 1]
                }), eq: l(function (a, c, k) {
                    return [0 > k ? k + c : k]
                }),
                even: l(function (a, c) {
                    for (var k = 0; c > k; k += 2) a.push(k);
                    return a
                }), odd: l(function (a, c) {
                    for (var k = 1; c > k; k += 2) a.push(k);
                    return a
                }), lt: l(function (a, c, k) {
                    for (c = 0 > k ? k + c : k; 0 <= --c;) a.push(c);
                    return a
                }), gt: l(function (a, c, k) {
                    for (k = 0 > k ? k + c : k; c > ++k;) a.push(k);
                    return a
                })
            }
        };
        s.pseudos.nth = s.pseudos.eq;
        for (v in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) s.pseudos[v] = q(v);
        for (v in{submit: !0, reset: !0}) s.pseudos[v] = f(v);
        t.prototype = s.filters = s.pseudos;
        s.setFilters = new t;
        y = n.compile = function (a, c) {
            var k, d = [], n = [],
                g = qc[a + " "];
            if (!g) {
                c || (c = C(a));
                for (k = c.length; k--;) g = U(c[k]), g[E] ? d.push(g) : n.push(g);
                g = qc(a, Na(n, d))
            }
            return g
        };
        B.sortStable = E.split("").sort(Hc).join("") === E;
        B.detectDuplicates = Tb;
        A();
        B.sortDetached = b(function (a) {
            return 1 & a.compareDocumentPosition(ia.createElement("div"))
        });
        b(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || h("type|href|height|width", function (a, c, d) {
            return d ? k : a.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2)
        });
        B.attributes && b(function (a) {
            return a.innerHTML =
                "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || h("value", function (a, c, d) {
            return d || "input" !== a.nodeName.toLowerCase() ? k : a.defaultValue
        });
        b(function (a) {
            return null == a.getAttribute("disabled")
        }) || h("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function (a, c, d) {
            var n;
            return d ? k : (n = a.getAttributeNode(c)) && n.specified ? n.value : !0 === a[c] ? c.toLowerCase() : null
        });
        c.find = n;
        c.expr = n.selectors;
        c.expr[":"] = c.expr.pseudos;
        c.unique = n.uniqueSort;
        c.text = n.getText;
        c.isXMLDoc = n.isXML;
        c.contains = n.contains
    })(e);
    var Lc = {};
    c.Callbacks = function (a) {
        a = "string" == typeof a ? Lc[a] || b(a) : c.extend({}, a);
        var k, d, g, h, e, q, l = [], t = !a.once && [], C = function (c) {
            d = a.memory && c;
            g = !0;
            e = q || 0;
            q = 0;
            h = l.length;
            for (k = !0; l && h > e; e++) if (!1 === l[e].apply(c[0], c[1]) && a.stopOnFalse) {
                d = !1;
                break
            }
            k = !1;
            l && (t ? t.length && C(t.shift()) : d ? l = [] : p.disable())
        }, p = {
            add: function () {
                if (l) {
                    var g = l.length;
                    (function Fb(k) {
                        c.each(k, function (k, d) {
                            var n = c.type(d);
                            "function" === n ? a.unique && p.has(d) || l.push(d) : d && d.length && "string" !== n && Fb(d)
                        })
                    })(arguments);
                    k ? h = l.length : d && (q = g, C(d))
                }
                return this
            }, remove: function () {
                return l && c.each(arguments, function (a, d) {
                    for (var n; -1 < (n = c.inArray(d, l, n));) l.splice(n, 1), k && (h >= n && h--, e >= n && e--)
                }), this
            }, has: function (a) {
                return a ? -1 < c.inArray(a, l) : !(!l || !l.length)
            }, empty: function () {
                return l = [], h = 0, this
            }, disable: function () {
                return l = t = d = f, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return t = f, d || p.disable(), this
            }, locked: function () {
                return !t
            },
            fireWith: function (a, c) {
                return !l || g && !t || (c = c || [], c = [a, c.slice ? c.slice() : c], k ? t.push(c) : C(c)), this
            }, fire: function () {
                return p.fireWith(this, arguments), this
            }, fired: function () {
                return !!g
            }
        };
        return p
    };
    c.extend({
        Deferred: function (a) {
            var k = [["resolve", "done", c.Callbacks("once memory"), "resolved"], ["reject", "fail", c.Callbacks("once memory"), "rejected"], ["notify", "progress", c.Callbacks("memory")]],
                d = "pending", g = {
                    state: function () {
                        return d
                    }, always: function () {
                        return b.done(arguments).fail(arguments), this
                    }, then: function () {
                        var a =
                            arguments;
                        return c.Deferred(function (d) {
                            c.each(k, function (k, n) {
                                var h = n[0], e = c.isFunction(a[k]) && a[k];
                                b[n[1]](function () {
                                    var a = e && e.apply(this, arguments);
                                    a && c.isFunction(a.promise) ? a.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[h + "With"](this === g ? d.promise() : this, e ? [a] : arguments)
                                })
                            });
                            a = null
                        }).promise()
                    }, promise: function (a) {
                        return null != a ? c.extend(a, g) : g
                    }
                }, b = {};
            return g.pipe = g.then, c.each(k, function (a, c) {
                var h = c[2], e = c[3];
                g[c[1]] = h.add;
                e && h.add(function () {
                    d = e
                }, k[1 ^ a][2].disable, k[2][2].lock);
                b[c[0]] = function () {
                    return b[c[0] + "With"](this === b ? g : this, arguments), this
                };
                b[c[0] + "With"] = h.fireWith
            }), g.promise(b), a && a.call(b, b), b
        }, when: function (a) {
            var k = 0, d = la.call(arguments), g = d.length, b = 1 !== g || a && c.isFunction(a.promise) ? g : 0,
                h = 1 === b ? a : c.Deferred(), e = function (a, c, k) {
                    return function (d) {
                        c[a] = this;
                        k[a] = 1 < arguments.length ? la.call(arguments) : d;
                        k === q ? h.notifyWith(c, k) : --b || h.resolveWith(c, k)
                    }
                }, q, f, l;
            if (1 < g) for (q = Array(g), f = Array(g), l = Array(g); g > k; k++) d[k] && c.isFunction(d[k].promise) ? d[k].promise().done(e(k,
                l, d)).fail(h.reject).progress(e(k, f, q)) : --b;
            return b || h.resolveWith(l, d), h.promise()
        }
    });
    c.support = function (a) {
        var k, d, g, b, h, q, f = J.createElement("div");
        if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k = f.getElementsByTagName("*") || [], d = f.getElementsByTagName("a")[0], !d || !d.style || !k.length) return a;
        g = J.createElement("select");
        b = g.appendChild(J.createElement("option"));
        k = f.getElementsByTagName("input")[0];
        d.style.cssText = "top:1px;float:left;opacity:.5";
        a.getSetAttribute = "t" !== f.className;
        a.leadingWhitespace = 3 === f.firstChild.nodeType;
        a.tbody = !f.getElementsByTagName("tbody").length;
        a.htmlSerialize = !!f.getElementsByTagName("link").length;
        a.style = /top/.test(d.getAttribute("style"));
        a.hrefNormalized = "/a" === d.getAttribute("href");
        a.opacity = /^0.5/.test(d.style.opacity);
        a.cssFloat = !!d.style.cssFloat;
        a.checkOn = !!k.value;
        a.optSelected = b.selected;
        a.enctype = !!J.createElement("form").enctype;
        a.html5Clone = "<:nav></:nav>" !== J.createElement("nav").cloneNode(!0).outerHTML;
        a.inlineBlockNeedsLayout = !1;
        a.shrinkWrapBlocks = !1;
        a.pixelPosition = !1;
        a.deleteExpando = !0;
        a.noCloneEvent = !0;
        a.reliableMarginRight = !0;
        a.boxSizingReliable = !0;
        k.checked = !0;
        a.noCloneChecked = k.cloneNode(!0).checked;
        g.disabled = !0;
        a.optDisabled = !b.disabled;
        try {
            delete f.test
        } catch (l) {
            a.deleteExpando = !1
        }
        k = J.createElement("input");
        k.setAttribute("value", "");
        a.input = "" === k.getAttribute("value");
        k.value = "t";
        k.setAttribute("type", "radio");
        a.radioValue = "t" === k.value;
        k.setAttribute("checked", "t");
        k.setAttribute("name",
            "t");
        d = J.createDocumentFragment();
        d.appendChild(k);
        a.appendChecked = k.checked;
        a.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked;
        f.attachEvent && (f.attachEvent("onclick", function () {
            a.noCloneEvent = !1
        }), f.cloneNode(!0).click());
        for (q in{
            submit: !0,
            change: !0,
            focusin: !0
        }) f.setAttribute(d = "on" + q, "t"), a[q + "Bubbles"] = d in e || !1 === f.attributes[d].expando;
        f.style.backgroundClip = "content-box";
        f.cloneNode(!0).style.backgroundClip = "";
        a.clearCloneStyle = "content-box" === f.style.backgroundClip;
        for (q in c(a)) break;
        return a.ownLast = "0" !== q, c(function () {
            var k, d, n, g = J.getElementsByTagName("body")[0];
            g && (k = J.createElement("div"), k.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(k).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", n = f.getElementsByTagName("td"), n[0].style.cssText = "padding:0;margin:0;border:0;display:none", h = 0 === n[0].offsetHeight, n[0].style.display = "", n[1].style.display = "none", a.reliableHiddenOffsets = h && 0 === n[0].offsetHeight,
                f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", c.swap(g, null != g.style.zoom ? {zoom: 1} : {}, function () {
                a.boxSizing = 4 === f.offsetWidth
            }), e.getComputedStyle && (a.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, a.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {width: "4px"}).width, d = f.appendChild(J.createElement("div")), d.style.cssText = f.style.cssText =
                "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", d.style.marginRight = d.style.width = "0", f.style.width = "1px", a.reliableMarginRight = !parseFloat((e.getComputedStyle(d, null) || {}).marginRight)), typeof f.style.zoom !== ga && (f.innerHTML = "", f.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1", a.inlineBlockNeedsLayout =
                3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", a.shrinkWrapBlocks = 3 !== f.offsetWidth, a.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(k), k = f = n = d = null)
        }), k = g = d = b = d = k = null, a
    }({});
    var Qa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Xc = /([A-Z])/g;
    c.extend({
        cache: {},
        noData: {applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (a) {
            return a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando], !!a && !v(a)
        },
        data: function (a, c, d) {
            return l(a,
                c, d)
        },
        removeData: function (a, c) {
            return p(a, c)
        },
        _data: function (a, c, d) {
            return l(a, c, d, !0)
        },
        _removeData: function (a, c) {
            return p(a, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var k = a.nodeName && c.noData[a.nodeName.toLowerCase()];
            return !k || !0 !== k && a.getAttribute("classid") === k
        }
    });
    c.fn.extend({
        data: function (a, k) {
            var d, g, b = null, h = 0, e = this[0];
            if (a === f) {
                if (this.length && (b = c.data(e), 1 === e.nodeType && !c._data(e, "parsedAttrs"))) {
                    for (d = e.attributes; d.length > h; h++) g = d[h].name,
                    0 === g.indexOf("data-") && (g = c.camelCase(g.slice(5)), m(e, g, b[g]));
                    c._data(e, "parsedAttrs", !0)
                }
                return b
            }
            return "object" == typeof a ? this.each(function () {
                c.data(this, a)
            }) : 1 < arguments.length ? this.each(function () {
                c.data(this, a, k)
            }) : e ? m(e, a, c.data(e, a)) : null
        }, removeData: function (a) {
            return this.each(function () {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function (a, k, d) {
            var g;
            return a ? (k = (k || "fx") + "queue", g = c._data(a, k), d && (!g || c.isArray(d) ? g = c._data(a, k, c.makeArray(d)) : g.push(d)), g || []) : f
        }, dequeue: function (a,
                              k) {
            k = k || "fx";
            var d = c.queue(a, k), g = d.length, b = d.shift(), h = c._queueHooks(a, k), e = function () {
                c.dequeue(a, k)
            };
            "inprogress" === b && (b = d.shift(), g--);
            b && ("fx" === k && d.unshift("inprogress"), delete h.stop, b.call(a, e, h));
            !g && h && h.empty.fire()
        }, _queueHooks: function (a, k) {
            var d = k + "queueHooks";
            return c._data(a, d) || c._data(a, d, {
                empty: c.Callbacks("once memory").add(function () {
                    c._removeData(a, k + "queue");
                    c._removeData(a, d)
                })
            })
        }
    });
    c.fn.extend({
        queue: function (a, k) {
            var d = 2;
            return "string" != typeof a && (k = a, a = "fx", d--), d > arguments.length ?
                c.queue(this[0], a) : k === f ? this : this.each(function () {
                    var d = c.queue(this, a, k);
                    c._queueHooks(this, a);
                    "fx" === a && "inprogress" !== d[0] && c.dequeue(this, a)
                })
        }, dequeue: function (a) {
            return this.each(function () {
                c.dequeue(this, a)
            })
        }, delay: function (a, k) {
            return a = c.fx ? c.fx.speeds[a] || a : a, k = k || "fx", this.queue(k, function (c, k) {
                var d = setTimeout(c, a);
                k.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, k) {
            var d, g = 1, b = c.Deferred(), h = this, e = this.length, q = function () {
                --g ||
                b.resolveWith(h, [h])
            };
            "string" != typeof a && (k = a, a = f);
            for (a = a || "fx"; e--;) (d = c._data(h[e], a + "queueHooks")) && d.empty && (g++, d.empty.add(q));
            return q(), b.promise(k)
        }
    });
    var mb, hc, yb = /[\t\r\n\f]/g, Ub = /\r/g, Hb = /^(?:input|select|textarea|button|object)$/i, Vb = /^(?:a|area)$/i,
        zb = /^(?:checked|selected)$/i, va = c.support.getSetAttribute, Wb = c.support.input;
    c.fn.extend({
        attr: function (a, k) {
            return c.access(this, c.attr, a, k, 1 < arguments.length)
        }, removeAttr: function (a) {
            return this.each(function () {
                c.removeAttr(this, a)
            })
        },
        prop: function (a, k) {
            return c.access(this, c.prop, a, k, 1 < arguments.length)
        }, removeProp: function (a) {
            return a = c.propFix[a] || a, this.each(function () {
                try {
                    this[a] = f, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var k, d, g, b, h, e = 0, f = this.length;
            k = "string" == typeof a && a;
            if (c.isFunction(a)) return this.each(function (k) {
                c(this).addClass(a.call(this, k, this.className))
            });
            if (k) for (k = (a || "").match(q) || []; f > e; e++) if (d = this[e], g = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(yb, " ") : " ")) {
                for (h = 0; b = k[h++];) 0 >
                g.indexOf(" " + b + " ") && (g += b + " ");
                d.className = c.trim(g)
            }
            return this
        }, removeClass: function (a) {
            var k, d, g, b, h, e = 0, f = this.length;
            k = 0 === arguments.length || "string" == typeof a && a;
            if (c.isFunction(a)) return this.each(function (k) {
                c(this).removeClass(a.call(this, k, this.className))
            });
            if (k) for (k = (a || "").match(q) || []; f > e; e++) if (d = this[e], g = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(yb, " ") : "")) {
                for (h = 0; b = k[h++];) for (; 0 <= g.indexOf(" " + b + " ");) g = g.replace(" " + b + " ", " ");
                d.className = a ? c.trim(g) : ""
            }
            return this
        },
        toggleClass: function (a, k) {
            var d = typeof a;
            return "boolean" == typeof k && "string" === d ? k ? this.addClass(a) : this.removeClass(a) : c.isFunction(a) ? this.each(function (d) {
                c(this).toggleClass(a.call(this, d, this.className, k), k)
            }) : this.each(function () {
                if ("string" === d) for (var k, g = 0, b = c(this), h = a.match(q) || []; k = h[g++];) b.hasClass(k) ? b.removeClass(k) : b.addClass(k); else (d === ga || "boolean" === d) && (this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this, "__className__") ||
                    "")
            })
        }, hasClass: function (a) {
            a = " " + a + " ";
            for (var c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(yb, " ").indexOf(a)) return !0;
            return !1
        }, val: function (a) {
            var k, d, g, b = this[0];
            if (arguments.length) return g = c.isFunction(a), this.each(function (k) {
                var b;
                1 === this.nodeType && (b = g ? a.call(this, k, c(this).val()) : a, null == b ? b = "" : "number" == typeof b ? b += "" : c.isArray(b) && (b = c.map(b, function (a) {
                    return null == a ? "" : a + ""
                })), d = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()],
                d && "set" in d && d.set(this, b, "value") !== f || (this.value = b))
            });
            if (b) return d = c.valHooks[b.type] || c.valHooks[b.nodeName.toLowerCase()], d && "get" in d && (k = d.get(b, "value")) !== f ? k : (k = b.value, "string" == typeof k ? k.replace(Ub, "") : null == k ? "" : k)
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var k = c.find.attr(a, "value");
                    return null != k ? k : a.text
                }
            }, select: {
                get: function (a) {
                    for (var k, d = a.options, g = a.selectedIndex, b = "select-one" === a.type || 0 > g, h = b ? null : [], e = b ? g + 1 : d.length, q = 0 > g ? e : b ? g : 0; e > q; q++) if (k = d[q], !(!k.selected &&
                            q !== g || (c.support.optDisabled ? k.disabled : null !== k.getAttribute("disabled")) || k.parentNode.disabled && c.nodeName(k.parentNode, "optgroup"))) {
                        if (a = c(k).val(), b) return a;
                        h.push(a)
                    }
                    return h
                }, set: function (a, k) {
                    for (var d, g, b = a.options, h = c.makeArray(k), e = b.length; e--;) g = b[e], (g.selected = 0 <= c.inArray(c(g).val(), h)) && (d = !0);
                    return d || (a.selectedIndex = -1), h
                }
            }
        }, attr: function (a, k, d) {
            var g, b, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) return typeof a.getAttribute === ga ? c.prop(a, k, d) : (1 === h && c.isXMLDoc(a) || (k = k.toLowerCase(),
                g = c.attrHooks[k] || (c.expr.match.bool.test(k) ? hc : mb)), d === f ? g && "get" in g && null !== (b = g.get(a, k)) ? b : (b = c.find.attr(a, k), null == b ? f : b) : null !== d ? g && "set" in g && (b = g.set(a, d, k)) !== f ? b : (a.setAttribute(k, d + ""), d) : (c.removeAttr(a, k), f))
        }, removeAttr: function (a, k) {
            var d, g, b = 0, h = k && k.match(q);
            if (h && 1 === a.nodeType) for (; d = h[b++];) g = c.propFix[d] || d, c.expr.match.bool.test(d) ? Wb && va || !zb.test(d) ? a[g] = !1 : a[c.camelCase("default-" + d)] = a[g] = !1 : c.attr(a, d, ""), a.removeAttribute(va ? d : g)
        }, attrHooks: {
            type: {
                set: function (a, k) {
                    if (!c.support.radioValue &&
                        "radio" === k && c.nodeName(a, "input")) {
                        var d = a.value;
                        return a.setAttribute("type", k), d && (a.value = d), k
                    }
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, k, d) {
            var g, b, h, e = a.nodeType;
            if (a && 3 !== e && 8 !== e && 2 !== e) return h = 1 !== e || !c.isXMLDoc(a), h && (k = c.propFix[k] || k, b = c.propHooks[k]), d !== f ? b && "set" in b && (g = b.set(a, d, k)) !== f ? g : a[k] = d : b && "get" in b && null !== (g = b.get(a, k)) ? g : a[k]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var k = c.find.attr(a, "tabindex");
                    return k ? parseInt(k, 10) : Hb.test(a.nodeName) || Vb.test(a.nodeName) &&
                    a.href ? 0 : -1
                }
            }
        }
    });
    hc = {
        set: function (a, k, d) {
            return !1 === k ? c.removeAttr(a, d) : Wb && va || !zb.test(d) ? a.setAttribute(!va && c.propFix[d] || d, d) : a[c.camelCase("default-" + d)] = a[d] = !0, d
        }
    };
    c.each(c.expr.match.bool.source.match(/\w+/g), function (a, k) {
        var d = c.expr.attrHandle[k] || c.find.attr;
        c.expr.attrHandle[k] = Wb && va || !zb.test(k) ? function (a, k, g) {
            var b = c.expr.attrHandle[k];
            a = g ? f : (c.expr.attrHandle[k] = f) != d(a, k, g) ? k.toLowerCase() : null;
            return c.expr.attrHandle[k] = b, a
        } : function (a, k, d) {
            return d ? f : a[c.camelCase("default-" +
                k)] ? k.toLowerCase() : null
        }
    });
    Wb && va || (c.attrHooks.value = {
        set: function (a, k, d) {
            return c.nodeName(a, "input") ? (a.defaultValue = k, f) : mb && mb.set(a, k, d)
        }
    });
    va || (mb = {
        set: function (a, c, d) {
            var g = a.getAttributeNode(d);
            return g || a.setAttributeNode(g = a.ownerDocument.createAttribute(d)), g.value = c += "", "value" === d || c === a.getAttribute(d) ? c : f
        }
    }, c.expr.attrHandle.id = c.expr.attrHandle.name = c.expr.attrHandle.coords = function (a, c, d) {
        var g;
        return d ? f : (g = a.getAttributeNode(c)) && "" !== g.value ? g.value : null
    }, c.valHooks.button = {
        get: function (a,
                       c) {
            var d = a.getAttributeNode(c);
            return d && d.specified ? d.value : f
        }, set: mb.set
    }, c.attrHooks.contenteditable = {
        set: function (a, c, d) {
            mb.set(a, "" === c ? !1 : c, d)
        }
    }, c.each(["width", "height"], function (a, d) {
        c.attrHooks[d] = {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(d, "auto"), c) : f
            }
        }
    }));
    c.support.hrefNormalized || c.each(["href", "src"], function (a, d) {
        c.propHooks[d] = {
            get: function (a) {
                return a.getAttribute(d, 4)
            }
        }
    });
    c.support.style || (c.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || f
        }, set: function (a, c) {
            return a.style.cssText =
                c + ""
        }
    });
    c.support.optSelected || (c.propHooks.selected = {
        get: function (a) {
            a = a.parentNode;
            return a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex), null
        }
    });
    c.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function () {
        c.propFix[this.toLowerCase()] = this
    });
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.each(["radio", "checkbox"], function () {
        c.valHooks[this] = {
            set: function (a, d) {
                return c.isArray(d) ? a.checked = 0 <= c.inArray(c(a).val(),
                    d) : f
            }
        };
        c.support.checkOn || (c.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var Xb = /^(?:input|select|textarea)$/i, rc = /^key/, sc = /^(?:mouse|contextmenu)|click/,
        hb = /^(?:focusinfocus|focusoutblur)$/, tc = /^([^.]*)(?:\.(.+)|)$/;
    c.event = {
        global: {},
        add: function (a, d, g, b, h) {
            var e, l, t, C, p, m, u, r, H, U;
            if (t = c._data(a)) {
                g.handler && (C = g, g = C.handler, h = C.selector);
                g.guid || (g.guid = c.guid++);
                (l = t.events) || (l = t.events = {});
                (m = t.handle) || (m = t.handle = function (a) {
                    return typeof c === ga ||
                    a && c.event.triggered === a.type ? f : c.event.dispatch.apply(m.elem, arguments)
                }, m.elem = a);
                d = (d || "").match(q) || [""];
                for (t = d.length; t--;) e = tc.exec(d[t]) || [], H = U = e[1], e = (e[2] || "").split(".").sort(), H && (p = c.event.special[H] || {}, H = (h ? p.delegateType : p.bindType) || H, p = c.event.special[H] || {}, u = c.extend({
                    type: H,
                    origType: U,
                    data: b,
                    handler: g,
                    guid: g.guid,
                    selector: h,
                    needsContext: h && c.expr.match.needsContext.test(h),
                    namespace: e.join(".")
                }, C), (r = l[H]) || (r = l[H] = [], r.delegateCount = 0, p.setup && !1 !== p.setup.call(a, b, e, m) || (a.addEventListener ?
                    a.addEventListener(H, m, !1) : a.attachEvent && a.attachEvent("on" + H, m))), p.add && (p.add.call(a, u), u.handler.guid || (u.handler.guid = g.guid)), h ? r.splice(r.delegateCount++, 0, u) : r.push(u), c.event.global[H] = !0);
                a = null
            }
        },
        remove: function (a, d, g, b, h) {
            var e, f, l, t, C, p, m, u, r, H, U, B = c.hasData(a) && c._data(a);
            if (B && (p = B.events)) {
                d = (d || "").match(q) || [""];
                for (C = d.length; C--;) if (l = tc.exec(d[C]) || [], r = U = l[1], H = (l[2] || "").split(".").sort(), r) {
                    m = c.event.special[r] || {};
                    r = (b ? m.delegateType : m.bindType) || r;
                    u = p[r] || [];
                    l = l[2] && RegExp("(^|\\.)" +
                        H.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    for (t = e = u.length; e--;) f = u[e], !h && U !== f.origType || g && g.guid !== f.guid || l && !l.test(f.namespace) || b && b !== f.selector && ("**" !== b || !f.selector) || (u.splice(e, 1), f.selector && u.delegateCount--, m.remove && m.remove.call(a, f));
                    t && !u.length && (m.teardown && !1 !== m.teardown.call(a, H, B.handle) || c.removeEvent(a, r, B.handle), delete p[r])
                } else for (r in p) c.event.remove(a, r + d[C], g, b, !0);
                c.isEmptyObject(p) && (delete B.handle, c._removeData(a, "events"))
            }
        },
        trigger: function (a, d, g, b) {
            var h, q, l,
                t, C, p, m = [g || J], r = za.call(a, "type") ? a.type : a;
            p = za.call(a, "namespace") ? a.namespace.split(".") : [];
            if (l = h = g = g || J, 3 !== g.nodeType && 8 !== g.nodeType && !hb.test(r + c.event.triggered) && (0 <= r.indexOf(".") && (p = r.split("."), r = p.shift(), p.sort()), q = 0 > r.indexOf(":") && "on" + r, a = a[c.expando] ? a : new c.Event(r, "object" == typeof a && a), a.isTrigger = b ? 2 : 3, a.namespace = p.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = f, a.target || (a.target = g), d = null == d ? [a] : c.makeArray(d, [a]),
                    C = c.event.special[r] || {}, b || !C.trigger || !1 !== C.trigger.apply(g, d))) {
                if (!b && !C.noBubble && !c.isWindow(g)) {
                    t = C.delegateType || r;
                    for (hb.test(t + r) || (l = l.parentNode); l; l = l.parentNode) m.push(l), h = l;
                    h === (g.ownerDocument || J) && m.push(h.defaultView || h.parentWindow || e)
                }
                for (p = 0; (l = m[p++]) && !a.isPropagationStopped();) a.type = 1 < p ? t : C.bindType || r, (h = (c._data(l, "events") || {})[a.type] && c._data(l, "handle")) && h.apply(l, d), (h = q && l[q]) && c.acceptData(l) && h.apply && !1 === h.apply(l, d) && a.preventDefault();
                if (a.type = r, !(b || a.isDefaultPrevented() ||
                        C._default && !1 !== C._default.apply(m.pop(), d)) && c.acceptData(g) && q && g[r] && !c.isWindow(g)) {
                    (h = g[q]) && (g[q] = null);
                    c.event.triggered = r;
                    try {
                        g[r]()
                    } catch (u) {
                    }
                    c.event.triggered = f;
                    h && (g[q] = h)
                }
                return a.result
            }
        },
        dispatch: function (a) {
            a = c.event.fix(a);
            var d, g, b, h, e, q = [], l = la.call(arguments);
            d = (c._data(this, "events") || {})[a.type] || [];
            var t = c.event.special[a.type] || {};
            if (l[0] = a, a.delegateTarget = this, !t.preDispatch || !1 !== t.preDispatch.call(this, a)) {
                q = c.event.handlers.call(this, a, d);
                for (d = 0; (h = q[d++]) && !a.isPropagationStopped();) for (a.currentTarget =
                                                                                 h.elem, e = 0; (b = h.handlers[e++]) && !a.isImmediatePropagationStopped();) a.namespace_re && !a.namespace_re.test(b.namespace) || (a.handleObj = b, a.data = b.data, g = ((c.event.special[b.origType] || {}).handle || b.handler).apply(h.elem, l), g === f || !1 !== (a.result = g) || (a.preventDefault(), a.stopPropagation()));
                return t.postDispatch && t.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, d) {
            var g, b, h, e, q = [], l = d.delegateCount, t = a.target;
            if (l && t.nodeType && (!a.button || "click" !== a.type)) for (; t != this; t = t.parentNode || this) if (1 ===
                t.nodeType && (!0 !== t.disabled || "click" !== a.type)) {
                h = [];
                for (e = 0; l > e; e++) b = d[e], g = b.selector + " ", h[g] === f && (h[g] = b.needsContext ? 0 <= c(g, this).index(t) : c.find(g, this, null, [t]).length), h[g] && h.push(b);
                h.length && q.push({elem: t, handlers: h})
            }
            return d.length > l && q.push({elem: this, handlers: d.slice(l)}), q
        },
        fix: function (a) {
            if (a[c.expando]) return a;
            var d, g, b;
            d = a.type;
            var h = a, e = this.fixHooks[d];
            e || (this.fixHooks[d] = e = sc.test(d) ? this.mouseHooks : rc.test(d) ? this.keyHooks : {});
            b = e.props ? this.props.concat(e.props) : this.props;
            a = new c.Event(h);
            for (d = b.length; d--;) g = b[d], a[g] = h[g];
            return a.target || (a.target = h.srcElement || J), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, h) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"], filter: function (a, c) {
                return null == a.which && (a.which = null != c.charCode ? c.charCode : c.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, c) {
                var d, g, b, h = c.button, e = c.fromElement;
                return null == a.pageX && null != c.clientX && (g = a.target.ownerDocument || J, b = g.documentElement, d = g.body, a.pageX = c.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)), !a.relatedTarget && e && (a.relatedTarget = e === a.target ? c.toElement : e), a.which || h === f || (a.which = 1 & h ? 1 : 2 & h ? 3 : 4 & h ? 2 : 0), a
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !==
                        F() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === F() && this.blur ? (this.blur(), !1) : f
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return c.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : f
                }, _default: function (a) {
                    return c.nodeName(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    a.result !== f && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, d, g, b) {
            a = c.extend(new c.Event, g, {
                type: a,
                isSimulated: !0, originalEvent: {}
            });
            b ? c.event.trigger(a, null, d) : c.event.dispatch.call(d, a);
            a.isDefaultPrevented() && g.preventDefault()
        }
    };
    c.removeEvent = J.removeEventListener ? function (a, c, d) {
        a.removeEventListener && a.removeEventListener(c, d, !1)
    } : function (a, c, d) {
        c = "on" + c;
        a.detachEvent && (typeof a[c] === ga && (a[c] = null), a.detachEvent(c, d))
    };
    c.Event = function (a, d) {
        return this instanceof c.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault &&
        a.getPreventDefault() ? r : u) : this.type = a, d && c.extend(this, d), this.timeStamp = a && a.timeStamp || c.now(), this[c.expando] = !0, f) : new c.Event(a, d)
    };
    c.Event.prototype = {
        isDefaultPrevented: u, isPropagationStopped: u, isImmediatePropagationStopped: u, preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = r;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = r;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = r;
            this.stopPropagation()
        }
    };
    c.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, d) {
        c.event.special[a] = {
            delegateType: d, bindType: d, handle: function (a) {
                var g, b = a.relatedTarget, h = a.handleObj;
                return (!b || b !== this && !c.contains(this, b)) && (a.type = h.origType, g = h.handler.apply(this, arguments), a.type = d), g
            }
        }
    });
    c.support.submitBubbles || (c.event.special.submit = {
        setup: function () {
            return c.nodeName(this, "form") ? !1 : (c.event.add(this,
                "click._submit keypress._submit", function (a) {
                    a = a.target;
                    (a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : f) && !c._data(a, "submitBubbles") && (c.event.add(a, "submit._submit", function (a) {
                        a._submit_bubble = !0
                    }), c._data(a, "submitBubbles", !0))
                }), f)
        }, postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0))
        }, teardown: function () {
            return c.nodeName(this, "form") ? !1 : (c.event.remove(this, "._submit"), f)
        }
    });
    c.support.changeBubbles ||
    (c.event.special.change = {
        setup: function () {
            return Xb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (c.event.add(this, "propertychange._change", function (a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), c.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1);
                c.event.simulate("change", this, a, !0)
            })), !1) : (c.event.add(this, "beforeactivate._change", function (a) {
                a = a.target;
                Xb.test(a.nodeName) && !c._data(a, "changeBubbles") &&
                (c.event.add(a, "change._change", function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || c.event.simulate("change", this.parentNode, a, !0)
                }), c._data(a, "changeBubbles", !0))
            }), f)
        }, handle: function (a) {
            var c = a.target;
            return this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type ? a.handleObj.handler.apply(this, arguments) : f
        }, teardown: function () {
            return c.event.remove(this, "._change"), !Xb.test(this.nodeName)
        }
    });
    c.support.focusinBubbles || c.each({focus: "focusin", blur: "focusout"}, function (a,
                                                                                       d) {
        var g = 0, b = function (a) {
            c.event.simulate(d, a.target, c.event.fix(a), !0)
        };
        c.event.special[d] = {
            setup: function () {
                0 === g++ && J.addEventListener(a, b, !0)
            }, teardown: function () {
                0 === --g && J.removeEventListener(a, b, !0)
            }
        }
    });
    c.fn.extend({
        on: function (a, d, g, b, h) {
            var e, q;
            if ("object" == typeof a) {
                "string" != typeof d && (g = g || d, d = f);
                for (e in a) this.on(e, d, g, a[e], h);
                return this
            }
            if (null == g && null == b ? (b = d, g = d = f) : null == b && ("string" == typeof d ? (b = g, g = f) : (b = g, g = d, d = f)), !1 === b) b = u; else if (!b) return this;
            return 1 === h && (q = b, b = function (a) {
                return c().off(a),
                    q.apply(this, arguments)
            }, b.guid = q.guid || (q.guid = c.guid++)), this.each(function () {
                c.event.add(this, a, b, g, d)
            })
        }, one: function (a, c, d, g) {
            return this.on(a, c, d, g, 1)
        }, off: function (a, d, g) {
            var b, h;
            if (a && a.preventDefault && a.handleObj) return b = a.handleObj, c(a.delegateTarget).off(b.namespace ? b.origType + "." + b.namespace : b.origType, b.selector, b.handler), this;
            if ("object" == typeof a) {
                for (h in a) this.off(h, d, a[h]);
                return this
            }
            return (!1 === d || "function" == typeof d) && (g = d, d = f), !1 === g && (g = u), this.each(function () {
                c.event.remove(this,
                    a, g, d)
            })
        }, trigger: function (a, d) {
            return this.each(function () {
                c.event.trigger(a, d, this)
            })
        }, triggerHandler: function (a, d) {
            var g = this[0];
            return g ? c.event.trigger(a, d, g, !0) : f
        }
    });
    var Cc = /^.[^:#\[\.,]*$/, ic = /^(?:parents|prev(?:Until|All))/, jc = c.expr.match.needsContext, uc = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    c.fn.extend({
        find: function (a) {
            var d, g = [], b = this, h = b.length;
            if ("string" != typeof a) return this.pushStack(c(a).filter(function () {
                for (d = 0; h > d; d++) if (c.contains(b[d], this)) return !0
            }));
            for (d = 0; h > d; d++) c.find(a,
                b[d], g);
            return g = this.pushStack(1 < h ? c.unique(g) : g), g.selector = this.selector ? this.selector + " " + a : a, g
        }, has: function (a) {
            var d, g = c(a, this), b = g.length;
            return this.filter(function () {
                for (d = 0; b > d; d++) if (c.contains(this, g[d])) return !0
            })
        }, not: function (a) {
            return this.pushStack(da(this, a || [], !0))
        }, filter: function (a) {
            return this.pushStack(da(this, a || [], !1))
        }, is: function (a) {
            return !!da(this, "string" == typeof a && jc.test(a) ? c(a) : a || [], !1).length
        }, closest: function (a, d) {
            for (var g, b = 0, h = this.length, e = [], q = jc.test(a) ||
            "string" != typeof a ? c(a, d || this.context) : 0; h > b; b++) for (g = this[b]; g && g !== d; g = g.parentNode) if (11 > g.nodeType && (q ? -1 < q.index(g) : 1 === g.nodeType && c.find.matchesSelector(g, a))) {
                e.push(g);
                break
            }
            return this.pushStack(1 < e.length ? c.unique(e) : e)
        }, index: function (a) {
            return a ? "string" == typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, d) {
            var g = "string" == typeof a ? c(a, d) : c.makeArray(a && a.nodeType ? [a] : a), g = c.merge(this.get(),
                g);
            return this.pushStack(c.unique(g))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    c.each({
        parent: function (a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        }, parents: function (a) {
            return c.dir(a, "parentNode")
        }, parentsUntil: function (a, d, g) {
            return c.dir(a, "parentNode", g)
        }, next: function (a) {
            return ma(a, "nextSibling")
        }, prev: function (a) {
            return ma(a, "previousSibling")
        }, nextAll: function (a) {
            return c.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function (a, d, g) {
            return c.dir(a, "nextSibling", g)
        }, prevUntil: function (a, d, g) {
            return c.dir(a, "previousSibling", g)
        }, siblings: function (a) {
            return c.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return c.sibling(a.firstChild)
        }, contents: function (a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
        }
    }, function (a, d) {
        c.fn[a] = function (g, b) {
            var h = c.map(this, d, g);
            return "Until" !== a.slice(-5) && (b = g), b && "string" == typeof b && (h = c.filter(b, h)),
            1 < this.length && (uc[a] || (h = c.unique(h)), ic.test(a) && (h = h.reverse())), this.pushStack(h)
        }
    });
    c.extend({
        filter: function (a, d, g) {
            var b = d[0];
            return g && (a = ":not(" + a + ")"), 1 === d.length && 1 === b.nodeType ? c.find.matchesSelector(b, a) ? [b] : [] : c.find.matches(a, c.grep(d, function (a) {
                return 1 === a.nodeType
            }))
        }, dir: function (a, d, g) {
            var b = [];
            for (a = a[d]; a && 9 !== a.nodeType && (g === f || 1 !== a.nodeType || !c(a).is(g));) 1 === a.nodeType && b.push(a), a = a[d];
            return b
        }, sibling: function (a, c) {
            for (var d = []; a; a = a.nextSibling) 1 === a.nodeType && a !==
            c && d.push(a);
            return d
        }
    });
    var Va = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ib = / jQuery\d+="(?:null|\d+)"/g, Jb = RegExp("<(?:" + Va + ")[\\s/>]", "i"), Sa = /^\s+/,
        Kb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ta = /<([\w:]+)/,
        Yb = /<tbody/i, vc = /<|&#?\w+;/, Ic = /<(?:script|style|link)/i, qb = /^(?:checkbox|radio)$/i,
        wc = /checked\s*(?:[^=]|=\s*.checked.)/i, xc = /^$|\/(?:java|ecma)script/i,
        nc = /^true\/(.*)/, yc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ja = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: c.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, Lb = M(J).appendChild(J.createElement("div"));
    Ja.optgroup = Ja.option;
    Ja.tbody = Ja.tfoot = Ja.colgroup = Ja.caption = Ja.thead;
    Ja.th = Ja.td;
    c.fn.extend({
        text: function (a) {
            return c.access(this, function (a) {
                return a === f ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || J).createTextNode(a))
            }, null, a, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (a) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Y(this, a).appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType ||
                    11 === this.nodeType || 9 === this.nodeType) {
                    var c = Y(this, a);
                    c.insertBefore(a, c.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, remove: function (a, d) {
            for (var g, b = a ? c.filter(a, this) : this, h = 0; null != (g = b[h]); h++) d || 1 !== g.nodeType || c.cleanData(s(g)), g.parentNode && (d && c.contains(g.ownerDocument, g) &&
            B(s(g, "script")), g.parentNode.removeChild(g));
            return this
        }, empty: function () {
            for (var a, d = 0; null != (a = this[d]); d++) {
                for (1 === a.nodeType && c.cleanData(s(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                a.options && c.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        }, clone: function (a, d) {
            return a = null == a ? !1 : a, d = null == d ? a : d, this.map(function () {
                return c.clone(this, a, d)
            })
        }, html: function (a) {
            return c.access(this, function (a) {
                var d = this[0] || {}, g = 0, b = this.length;
                if (a === f) return 1 === d.nodeType ? d.innerHTML.replace(Ib,
                    "") : f;
                if (!("string" != typeof a || Ic.test(a) || !c.support.htmlSerialize && Jb.test(a) || !c.support.leadingWhitespace && Sa.test(a) || Ja[(ta.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Kb, "<$1></$2>");
                    try {
                        for (; b > g; g++) d = this[g] || {}, 1 === d.nodeType && (c.cleanData(s(d, !1)), d.innerHTML = a);
                        d = 0
                    } catch (h) {
                    }
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = c.map(this, function (a) {
                return [a.nextSibling, a.parentNode]
            }), d = 0;
            return this.domManip(arguments, function (g) {
                var b = a[d++], h = a[d++];
                h && (b && b.parentNode !== h && (b = this.nextSibling), c(this).remove(), h.insertBefore(g, b))
            }, !0), d ? this : this.remove()
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, d, g) {
            a = rb.apply([], a);
            var b, h, e, q, f = 0, l = this.length, t = this, C = l - 1, p = a[0], r = c.isFunction(p);
            if (r || !(1 >= l || "string" != typeof p || c.support.checkClone) && wc.test(p)) return this.each(function (c) {
                var b = t.eq(c);
                r && (a[0] = p.call(this, c, b.html()));
                b.domManip(a, d, g)
            });
            if (l && (q = c.buildFragment(a, this[0].ownerDocument, !1, !g && this), b = q.firstChild,
                1 === q.childNodes.length && (q = b), b)) {
                e = c.map(s(q, "script"), fa);
                for (h = e.length; l > f; f++) b = q, f !== C && (b = c.clone(b, !0, !0), h && c.merge(e, s(b, "script"))), d.call(this[f], b, f);
                if (h) for (q = e[e.length - 1].ownerDocument, c.map(e, H), f = 0; h > f; f++) b = e[f], xc.test(b.type || "") && !c._data(b, "globalEval") && c.contains(q, b) && (b.src ? c._evalUrl(b.src) : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(yc, "")));
                q = b = null
            }
            return this
        }
    });
    c.each({
        appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, d) {
        c.fn[a] = function (a) {
            for (var g = 0, b = [], h = c(a), e = h.length - 1; e >= g; g++) a = g === e ? this : this.clone(!0), c(h[g])[d](a), $a.apply(b, a.get());
            return this.pushStack(b)
        }
    });
    c.extend({
        clone: function (a, d, g) {
            var b, h, e, q, f, l = c.contains(a.ownerDocument, a);
            if (c.support.html5Clone || c.isXMLDoc(a) || !Jb.test("<" + a.nodeName + ">") ? e = a.cloneNode(!0) : (Lb.innerHTML = a.outerHTML, Lb.removeChild(e = Lb.firstChild)), !(c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType ||
                    c.isXMLDoc(a))) for (b = s(e), f = s(a), q = 0; null != (h = f[q]); ++q) if (b[q]) {
                var t = b[q], C = void 0, p = void 0, r = void 0;
                if (1 === t.nodeType) {
                    if (C = t.nodeName.toLowerCase(), !c.support.noCloneEvent && t[c.expando]) {
                        r = c._data(t);
                        for (p in r.events) c.removeEvent(t, p, r.handle);
                        t.removeAttribute(c.expando)
                    }
                    "script" === C && t.text !== h.text ? (fa(t).text = h.text, H(t)) : "object" === C ? (t.parentNode && (t.outerHTML = h.outerHTML), c.support.html5Clone && h.innerHTML && !c.trim(t.innerHTML) && (t.innerHTML = h.innerHTML)) : "input" === C && qb.test(h.type) ?
                        (t.defaultChecked = t.checked = h.checked, t.value !== h.value && (t.value = h.value)) : "option" === C ? t.defaultSelected = t.selected = h.defaultSelected : ("input" === C || "textarea" === C) && (t.defaultValue = h.defaultValue)
                }
            }
            if (d) if (g) for (f = f || s(a), b = b || s(e), q = 0; null != (h = f[q]); q++) Q(h, b[q]); else Q(a, e);
            return b = s(e, "script"), 0 < b.length && B(b, !l && s(a, "script")), e
        }, buildFragment: function (a, d, g, b) {
            for (var h, e, q, f, l, t, C, p = a.length, r = M(d), m = [], u = 0; p > u; u++) if (e = a[u], e || 0 === e) if ("object" === c.type(e)) c.merge(m, e.nodeType ? [e] : e); else if (vc.test(e)) {
                f =
                    f || r.appendChild(d.createElement("div"));
                l = (ta.exec(e) || ["", ""])[1].toLowerCase();
                C = Ja[l] || Ja._default;
                f.innerHTML = C[1] + e.replace(Kb, "<$1></$2>") + C[2];
                for (h = C[0]; h--;) f = f.lastChild;
                if (!c.support.leadingWhitespace && Sa.test(e) && m.push(d.createTextNode(Sa.exec(e)[0])), !c.support.tbody) for (h = (e = "table" !== l || Yb.test(e) ? "<table>" !== C[1] || Yb.test(e) ? 0 : f : f.firstChild) && e.childNodes.length; h--;) c.nodeName(t = e.childNodes[h], "tbody") && !t.childNodes.length && e.removeChild(t);
                c.merge(m, f.childNodes);
                for (f.textContent =
                         ""; f.firstChild;) f.removeChild(f.firstChild);
                f = r.lastChild
            } else m.push(d.createTextNode(e));
            f && r.removeChild(f);
            c.support.appendChecked || c.grep(s(m, "input"), Ba);
            for (u = 0; e = m[u++];) if ((!b || -1 === c.inArray(e, b)) && (q = c.contains(e.ownerDocument, e), f = s(r.appendChild(e), "script"), q && B(f), g)) for (h = 0; e = f[h++];) xc.test(e.type || "") && g.push(e);
            return r
        }, cleanData: function (a, d) {
            for (var g, b, h, e, q = 0, f = c.expando, l = c.cache, t = c.support.deleteExpando, C = c.event.special; null != (g = a[q]); q++) if ((d || c.acceptData(g)) && (h = g[f],
                    e = h && l[h])) {
                if (e.events) for (b in e.events) C[b] ? c.event.remove(g, b) : c.removeEvent(g, b, e.handle);
                l[h] && (delete l[h], t ? delete g[f] : typeof g.removeAttribute !== ga ? g.removeAttribute(f) : g[f] = null, S.push(h))
            }
        }, _evalUrl: function (a) {
            return c.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
        }
    });
    c.fn.extend({
        wrapAll: function (a) {
            if (c.isFunction(a)) return this.each(function (d) {
                c(this).wrapAll(a.call(this, d))
            });
            if (this[0]) {
                var d = c(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode &&
                d.insertBefore(this[0]);
                d.map(function () {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return c.isFunction(a) ? this.each(function (d) {
                c(this).wrapInner(a.call(this, d))
            }) : this.each(function () {
                var d = c(this), g = d.contents();
                g.length ? g.wrapAll(a) : d.append(a)
            })
        }, wrap: function (a) {
            var d = c.isFunction(a);
            return this.each(function (g) {
                c(this).wrapAll(d ? a.call(this, g) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                c.nodeName(this,
                    "body") || c(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var lb, eb, Wa, Mb = /alpha\([^)]*\)/i, zc = /opacity\s*=\s*([^)]*)/, bb = /^(top|right|bottom|left)$/,
        kc = /^(none|table(?!-c[ea]).+)/, cb = /^margin/, ac = RegExp("^(" + d + ")(.*)$", "i"),
        Xa = RegExp("^(" + d + ")(?!px)[a-z%]+$", "i"), Ac = RegExp("^([+-])=(" + d + ")", "i"), Cb = {BODY: "block"},
        Bc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, lc = {
            letterSpacing: 0,
            fontWeight: 400
        }, Ra = ["Top", "Right", "Bottom", "Left"], oc = ["Webkit", "O", "Moz", "ms"];
    c.fn.extend({
        css: function (a,
                       d) {
            return c.access(this, function (a, d, g) {
                var k, b = {}, h = 0;
                if (c.isArray(d)) {
                    k = eb(a);
                    for (g = d.length; g > h; h++) b[d[h]] = c.css(a, d[h], !1, k);
                    return b
                }
                return g !== f ? c.style(a, d, g) : c.css(a, d)
            }, a, d, 1 < arguments.length)
        }, show: function () {
            return L(this, !0)
        }, hide: function () {
            return L(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                D(this) ? c(this).show() : c(this).hide()
            })
        }
    });
    c.extend({
        cssHooks: {
            opacity: {
                get: function (a, c) {
                    if (c) {
                        var d = Wa(a, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        }, cssProps: {"float": c.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, d, g, b) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var h, e, q, l = c.camelCase(d), t = a.style;
                if (d = c.cssProps[l] || (c.cssProps[l] = P(t, l)), q = c.cssHooks[d] || c.cssHooks[l], g === f) return q && "get" in q && (h = q.get(a, !1, b)) !== f ? h : t[d];
                if (e = typeof g, "string" === e && (h = Ac.exec(g)) && (g = (h[1] + 1) * h[2] + parseFloat(c.css(a,
                        d)), e = "number"), !(null == g || "number" === e && isNaN(g) || ("number" !== e || c.cssNumber[l] || (g += "px"), c.support.clearCloneStyle || "" !== g || 0 !== d.indexOf("background") || (t[d] = "inherit"), q && "set" in q && (g = q.set(a, g, b)) === f))) try {
                    t[d] = g
                } catch (C) {
                }
            }
        }, css: function (a, d, g, b) {
            var h, e, q, l = c.camelCase(d);
            return d = c.cssProps[l] || (c.cssProps[l] = P(a.style, l)), q = c.cssHooks[d] || c.cssHooks[l], q && "get" in q && (e = q.get(a, !0, g)), e === f && (e = Wa(a, d, b)), "normal" === e && d in lc && (e = lc[d]), "" === g || g ? (h = parseFloat(e), !0 === g || c.isNumeric(h) ?
                h || 0 : e) : e
        }
    });
    e.getComputedStyle ? (eb = function (a) {
        return e.getComputedStyle(a, null)
    }, Wa = function (a, d, g) {
        var b, h, e, q = (g = g || eb(a)) ? g.getPropertyValue(d) || g[d] : f, l = a.style;
        return g && ("" !== q || c.contains(a.ownerDocument, a) || (q = c.style(a, d)), Xa.test(q) && cb.test(d) && (b = l.width, h = l.minWidth, e = l.maxWidth, l.minWidth = l.maxWidth = l.width = q, q = g.width, l.width = b, l.minWidth = h, l.maxWidth = e)), q
    }) : J.documentElement.currentStyle && (eb = function (a) {
        return a.currentStyle
    }, Wa = function (a, c, d) {
        var g, b, h;
        d = (d = d || eb(a)) ? d[c] : f;
        var e = a.style;
        return null == d && e && e[c] && (d = e[c]), Xa.test(d) && !bb.test(c) && (g = e.left, b = a.runtimeStyle, h = b && b.left, h && (b.left = a.currentStyle.left), e.left = "fontSize" === c ? "1em" : d, d = e.pixelLeft + "px", e.left = g, h && (b.left = h)), "" === d ? "auto" : d
    });
    c.each(["height", "width"], function (a, d) {
        c.cssHooks[d] = {
            get: function (a, g, b) {
                return g ? 0 === a.offsetWidth && kc.test(c.css(a, "display")) ? c.swap(a, Bc, function () {
                    return R(a, d, b)
                }) : R(a, d, b) : f
            }, set: function (a, g, b) {
                var h = b && eb(a);
                return E(a, g, b ? na(a, d, b, c.support.boxSizing && "border-box" ===
                    c.css(a, "boxSizing", !1, h), h) : 0)
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function (a, c) {
            return zc.test((c && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
        }, set: function (a, d) {
            var g = a.style, b = a.currentStyle, h = c.isNumeric(d) ? "alpha(opacity=" + 100 * d + ")" : "",
                e = b && b.filter || g.filter || "";
            g.zoom = 1;
            (1 <= d || "" === d) && "" === c.trim(e.replace(Mb, "")) && g.removeAttribute && (g.removeAttribute("filter"), "" === d || b && !b.filter) || (g.filter = Mb.test(e) ? e.replace(Mb, h) : e + " " +
                h)
        }
    });
    c(function () {
        c.support.reliableMarginRight || (c.cssHooks.marginRight = {
            get: function (a, d) {
                return d ? c.swap(a, {display: "inline-block"}, Wa, [a, "marginRight"]) : f
            }
        });
        !c.support.pixelPosition && c.fn.position && c.each(["top", "left"], function (a, d) {
            c.cssHooks[d] = {
                get: function (a, g) {
                    return g ? (g = Wa(a, d), Xa.test(g) ? c(a).position()[d] + "px" : g) : f
                }
            }
        })
    });
    c.expr && c.expr.filters && (c.expr.filters.hidden = function (a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display ||
            c.css(a, "display"))
    }, c.expr.filters.visible = function (a) {
        return !c.expr.filters.hidden(a)
    });
    c.each({margin: "", padding: "", border: "Width"}, function (a, d) {
        c.cssHooks[a + d] = {
            expand: function (c) {
                var g = 0, b = {};
                for (c = "string" == typeof c ? c.split(" ") : [c]; 4 > g; g++) b[a + Ra[g] + d] = c[g] || c[g - 2] || c[0];
                return b
            }
        };
        cb.test(a) || (c.cssHooks[a + d].set = E)
    });
    var Jc = /%20/g, bc = /\[\]$/, Zb = /\r?\n/g, mc = /^(?:submit|button|image|reset|file)$/i,
        T = /^(?:input|select|textarea|keygen)/i;
    c.fn.extend({
        serialize: function () {
            return c.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var a = c.prop(this, "elements");
                return a ? c.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !c(this).is(":disabled") && T.test(this.nodeName) && !mc.test(a) && (this.checked || !qb.test(a))
            }).map(function (a, d) {
                var g = c(this).val();
                return null == g ? null : c.isArray(g) ? c.map(g, function (a) {
                    return {name: d.name, value: a.replace(Zb, "\r\n")}
                }) : {name: d.name, value: g.replace(Zb, "\r\n")}
            }).get()
        }
    });
    c.param = function (a, d) {
        var g, b = [], h = function (a, d) {
            d =
                c.isFunction(d) ? d() : null == d ? "" : d;
            b[b.length] = encodeURIComponent(a) + "=" + encodeURIComponent(d)
        };
        if (d === f && (d = c.ajaxSettings && c.ajaxSettings.traditional), c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function () {
            h(this.name, this.value)
        }); else for (g in a) X(g, a[g], d, h);
        return b.join("&").replace(Jc, "+")
    };
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function (a, d) {
            c.fn[d] = function (a, c) {
                return 0 < arguments.length ? this.on(d, null, a, c) : this.trigger(d)
            }
        });
    c.fn.extend({
        hover: function (a, c) {
            return this.mouseenter(a).mouseleave(c || a)
        }, bind: function (a, c, d) {
            return this.on(a, null, c, d)
        }, unbind: function (a, c) {
            return this.off(a, null, c)
        }, delegate: function (a, c, d, g) {
            return this.on(c, a, d, g)
        }, undelegate: function (a, c, d) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(c, a || "**", d)
        }
    });
    var ib, y, Nb = c.now(), nb = /\?/, ra = /#.*$/, jb = /([?&])_=[^&]*/, ka = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        O = /^(?:GET|HEAD)$/, Da = /^\/\//, Ob = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Aa = c.fn.load, Ab = {},
        W = {}, db = "*/".concat("*");
    try {
        y = ha.href
    } catch (Ka) {
        y = J.createElement("a"), y.href = "", y = y.href
    }
    ib = Ob.exec(y.toLowerCase()) || [];
    c.fn.load = function (a, d, g) {
        if ("string" != typeof a && Aa) return Aa.apply(this, arguments);
        var b, h, e, q = this, l = a.indexOf(" ");
        return 0 <= l && (b = a.slice(l, a.length), a = a.slice(0, l)), c.isFunction(d) ? (g = d, d = f) : d && "object" == typeof d && (e = "POST"), 0 < q.length && c.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: d
        }).done(function (a) {
            h =
                arguments;
            q.html(b ? c("<div>").append(c.parseHTML(a)).find(b) : a)
        }).complete(g && function (a, c) {
            q.each(g, h || [a.responseText, c, a])
        }), this
    };
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, d) {
        c.fn[d] = function (a) {
            return this.on(d, a)
        }
    });
    c.extend({
        active: 0, lastModified: {}, etag: {}, ajaxSettings: {
            url: y,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ib[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": db,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": c.parseJSON, "text xml": c.parseXML},
            flatOptions: {url: !0, context: !0}
        }, ajaxSetup: function (a, d) {
            return d ? K(K(a, c.ajaxSettings), d) : K(c.ajaxSettings, a)
        }, ajaxPrefilter: ya(Ab), ajaxTransport: ya(W), ajax: function (a,
                                                                        d) {
            function g(a, d, b, h) {
                var k, q, n, r, s = d;
                if (2 !== F) {
                    F = 2;
                    t && clearTimeout(t);
                    p = f;
                    l = h || "";
                    w.readyState = 0 < a ? 4 : 0;
                    h = 200 <= a && 300 > a || 304 === a;
                    if (b) {
                        n = m;
                        for (var Na = w, N, Q, ia, y, J = n.contents, ma = n.dataTypes; "*" === ma[0];) ma.shift(), Q === f && (Q = n.mimeType || Na.getResponseHeader("Content-Type"));
                        if (Q) for (y in J) if (J[y] && J[y].test(Q)) {
                            ma.unshift(y);
                            break
                        }
                        if (ma[0] in b) ia = ma[0]; else {
                            for (y in b) {
                                if (!ma[0] || n.converters[y + " " + ma[0]]) {
                                    ia = y;
                                    break
                                }
                                N || (N = y)
                            }
                            ia = ia || N
                        }
                        n = ia ? (ia !== ma[0] && ma.unshift(ia), b[ia]) : f
                    }
                    var A;
                    a:{
                        b = m;
                        N = n;
                        Q = w;
                        ia = h;
                        var G, pa, ba;
                        n = {};
                        Na = b.dataTypes.slice();
                        if (Na[1]) for (G in b.converters) n[G.toLowerCase()] = b.converters[G];
                        for (y = Na.shift(); y;) if (b.responseFields[y] && (Q[b.responseFields[y]] = N), !ba && ia && b.dataFilter && (N = b.dataFilter(N, b.dataType)), ba = y, y = Na.shift()) if ("*" === y) y = ba; else if ("*" !== ba && ba !== y) {
                            if (G = n[ba + " " + y] || n["* " + y], !G) for (A in n) if (pa = A.split(" "), pa[1] === y && (G = n[ba + " " + pa[0]] || n["* " + pa[0]])) {
                                !0 === G ? G = n[A] : !0 !== n[A] && (y = pa[0], Na.unshift(pa[1]));
                                break
                            }
                            if (!0 !== G) if (G && b["throws"]) N = G(N); else try {
                                N =
                                    G(N)
                            } catch (qc) {
                                A = {state: "parsererror", error: G ? qc : "No conversion from " + ba + " to " + y};
                                break a
                            }
                        }
                        A = {state: "success", data: N}
                    }
                    n = A;
                    h ? (m.ifModified && (r = w.getResponseHeader("Last-Modified"), r && (c.lastModified[e] = r), r = w.getResponseHeader("etag"), r && (c.etag[e] = r)), 204 === a || "HEAD" === m.type ? s = "nocontent" : 304 === a ? s = "notmodified" : (s = n.state, k = n.data, q = n.error, h = !q)) : (q = s, (a || !s) && (s = "error", 0 > a && (a = 0)));
                    w.status = a;
                    w.statusText = (d || s) + "";
                    h ? U.resolveWith(u, [k, s, w]) : U.rejectWith(u, [w, s, q]);
                    w.statusCode(v);
                    v = f;
                    C && H.trigger(h ?
                        "ajaxSuccess" : "ajaxError", [w, m, h ? k : q]);
                    B.fireWith(u, [w, s]);
                    C && (H.trigger("ajaxComplete", [w, m]), --c.active || c.event.trigger("ajaxStop"))
                }
            }

            "object" == typeof a && (d = a, a = f);
            d = d || {};
            var b, h, e, l, t, C, p, r, m = c.ajaxSetup({}, d), u = m.context || m,
                H = m.context && (u.nodeType || u.jquery) ? c(u) : c.event, U = c.Deferred(),
                B = c.Callbacks("once memory"), v = m.statusCode || {}, s = {}, Na = {}, F = 0, Q = "canceled", w = {
                    readyState: 0, getResponseHeader: function (a) {
                        var c;
                        if (2 === F) {
                            if (!r) for (r = {}; c = ka.exec(l);) r[c[1].toLowerCase()] = c[2];
                            c = r[a.toLowerCase()]
                        }
                        return null ==
                        c ? null : c
                    }, getAllResponseHeaders: function () {
                        return 2 === F ? l : null
                    }, setRequestHeader: function (a, c) {
                        var d = a.toLowerCase();
                        return F || (a = Na[d] = Na[d] || a, s[a] = c), this
                    }, overrideMimeType: function (a) {
                        return F || (m.mimeType = a), this
                    }, statusCode: function (a) {
                        var c;
                        if (a) if (2 > F) for (c in a) v[c] = [v[c], a[c]]; else w.always(a[w.status]);
                        return this
                    }, abort: function (a) {
                        a = a || Q;
                        return p && p.abort(a), g(0, a), this
                    }
                };
            if (U.promise(w).complete = B.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || y) + "").replace(ra, "").replace(Da,
                    ib[1] + "//"), m.type = d.method || d.type || m.method || m.type, m.dataTypes = c.trim(m.dataType || "*").toLowerCase().match(q) || [""], null == m.crossDomain && (b = Ob.exec(m.url.toLowerCase()), m.crossDomain = !(!b || b[1] === ib[1] && b[2] === ib[2] && (b[3] || ("http:" === b[1] ? "80" : "443")) === (ib[3] || ("http:" === ib[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = c.param(m.data, m.traditional)), qa(Ab, m, d, w), 2 === F) return w;
            (C = m.global) && 0 === c.active++ && c.event.trigger("ajaxStart");
            m.type = m.type.toUpperCase();
            m.hasContent = !O.test(m.type);
            e = m.url;
            m.hasContent || (m.data && (e = m.url += (nb.test(e) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (m.url = jb.test(e) ? e.replace(jb, "$1_=" + Nb++) : e + (nb.test(e) ? "&" : "?") + "_=" + Nb++));
            m.ifModified && (c.lastModified[e] && w.setRequestHeader("If-Modified-Since", c.lastModified[e]), c.etag[e] && w.setRequestHeader("If-None-Match", c.etag[e]));
            (m.data && m.hasContent && !1 !== m.contentType || d.contentType) && w.setRequestHeader("Content-Type", m.contentType);
            w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ?
                m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + db + "; q=0.01" : "") : m.accepts["*"]);
            for (h in m.headers) w.setRequestHeader(h, m.headers[h]);
            if (m.beforeSend && (!1 === m.beforeSend.call(u, w, m) || 2 === F)) return w.abort();
            Q = "abort";
            for (h in{success: 1, error: 1, complete: 1}) w[h](m[h]);
            if (p = qa(W, m, d, w)) {
                w.readyState = 1;
                C && H.trigger("ajaxSend", [w, m]);
                m.async && 0 < m.timeout && (t = setTimeout(function () {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    F = 1, p.send(s, g)
                } catch (ia) {
                    if (!(2 > F)) throw ia;
                    g(-1, ia)
                }
            } else g(-1, "No Transport");
            return w
        }, getJSON: function (a, d, g) {
            return c.get(a, d, g, "json")
        }, getScript: function (a, d) {
            return c.get(a, f, d, "script")
        }
    });
    c.each(["get", "post"], function (a, d) {
        c[d] = function (a, g, b, h) {
            return c.isFunction(g) && (h = h || b, b = g, g = f), c.ajax({
                url: a,
                type: d,
                dataType: h,
                data: g,
                success: b
            })
        }
    });
    c.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (a) {
                return c.globalEval(a), a
            }
        }
    });
    c.ajaxPrefilter("script", function (a) {
        a.cache === f && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    c.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, g = J.head || c("head")[0] || J.documentElement;
            return {
                send: function (c, b) {
                    d = J.createElement("script");
                    d.async = !0;
                    a.scriptCharset && (d.charset = a.scriptCharset);
                    d.src = a.url;
                    d.onload = d.onreadystatechange = function (a, c) {
                        (c || !d.readyState || /loaded|complete/.test(d.readyState)) && (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d),
                            d = null, c || b(200, "success"))
                    };
                    g.insertBefore(d, g.firstChild)
                }, abort: function () {
                    d && d.onload(f, !0)
                }
            }
        }
    });
    var Pb = [], Ga = /(=)\?(?=&|$)|\?\?/;
    c.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = Pb.pop() || c.expando + "_" + Nb++;
            return this[a] = !0, a
        }
    });
    c.ajaxPrefilter("json jsonp", function (a, d, g) {
        var b, h, q,
            l = !1 !== a.jsonp && (Ga.test(a.url) ? "url" : "string" == typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Ga.test(a.data) && "data");
        return l || "jsonp" === a.dataTypes[0] ? (b = a.jsonpCallback =
            c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, l ? a[l] = a[l].replace(Ga, "$1" + b) : !1 !== a.jsonp && (a.url += (nb.test(a.url) ? "&" : "?") + a.jsonp + "=" + b), a.converters["script json"] = function () {
            return q || c.error(b + " was not called"), q[0]
        }, a.dataTypes[0] = "json", h = e[b], e[b] = function () {
            q = arguments
        }, g.always(function () {
            e[b] = h;
            a[b] && (a.jsonpCallback = d.jsonpCallback, Pb.push(b));
            q && c.isFunction(h) && h(q[0]);
            q = h = f
        }), "script") : f
    });
    var kb, ob, Kc = 0, Qb = e.ActiveXObject && function () {
        for (var a in kb) kb[a](f, !0)
    };
    c.ajaxSettings.xhr = e.ActiveXObject ? function () {
        var a;
        if (!(a = !this.isLocal && Z())) a:{
            try {
                a = new e.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (c) {
            }
            a = void 0
        }
        return a
    } : Z;
    ob = c.ajaxSettings.xhr();
    c.support.cors = !!ob && "withCredentials" in ob;
    (ob = c.support.ajax = !!ob) && c.ajaxTransport(function (a) {
        if (!a.crossDomain || c.support.cors) {
            var d;
            return {
                send: function (g, b) {
                    var h, q, l = a.xhr();
                    if (a.username ? l.open(a.type, a.url, a.async, a.username, a.password) : l.open(a.type, a.url, a.async), a.xhrFields) for (q in a.xhrFields) l[q] =
                        a.xhrFields[q];
                    a.mimeType && l.overrideMimeType && l.overrideMimeType(a.mimeType);
                    a.crossDomain || g["X-Requested-With"] || (g["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (q in g) l.setRequestHeader(q, g[q])
                    } catch (t) {
                    }
                    l.send(a.hasContent && a.data || null);
                    d = function (g, e) {
                        var q, n, t, C;
                        try {
                            if (d && (e || 4 === l.readyState)) if (d = f, h && (l.onreadystatechange = c.noop, Qb && delete kb[h]), e) 4 !== l.readyState && l.abort(); else {
                                C = {};
                                q = l.status;
                                n = l.getAllResponseHeaders();
                                "string" == typeof l.responseText && (C.text = l.responseText);
                                try {
                                    t =
                                        l.statusText
                                } catch (m) {
                                    t = ""
                                }
                                q || !a.isLocal || a.crossDomain ? 1223 === q && (q = 204) : q = C.text ? 200 : 404
                            }
                        } catch (p) {
                            e || b(-1, p)
                        }
                        C && b(q, t, C, n)
                    };
                    a.async ? 4 === l.readyState ? setTimeout(d) : (h = ++Kc, Qb && (kb || (kb = {}, c(e).unload(Qb)), kb[h] = d), l.onreadystatechange = d) : d()
                }, abort: function () {
                    d && d(f, !0)
                }
            }
        }
    });
    var oa, I, Ta = /^(?:toggle|show|hide)$/, Ma = RegExp("^(?:([+-])=|)(" + d + ")([a-z%]*)$", "i"), A = /queueHooks$/,
        Fa = [function (a, d, g) {
            var b, h, e, q, f, l = this, t = {}, C = a.style, m = a.nodeType && D(a), p = c._data(a, "fxshow");
            g.queue || (q = c._queueHooks(a,
                "fx"), null == q.unqueued && (q.unqueued = 0, f = q.empty.fire, q.empty.fire = function () {
                q.unqueued || f()
            }), q.unqueued++, l.always(function () {
                l.always(function () {
                    q.unqueued--;
                    c.queue(a, "fx").length || q.empty.fire()
                })
            }));
            1 === a.nodeType && ("height" in d || "width" in d) && (g.overflow = [C.overflow, C.overflowX, C.overflowY], "inline" === c.css(a, "display") && "none" === c.css(a, "float") && (c.support.inlineBlockNeedsLayout && "inline" !== V(a.nodeName) ? C.zoom = 1 : C.display = "inline-block"));
            g.overflow && (C.overflow = "hidden", c.support.shrinkWrapBlocks ||
            l.always(function () {
                C.overflow = g.overflow[0];
                C.overflowX = g.overflow[1];
                C.overflowY = g.overflow[2]
            }));
            for (b in d) (h = d[b], Ta.exec(h)) && (delete d[b], e = e || "toggle" === h, h !== (m ? "hide" : "show")) && (t[b] = p && p[b] || c.style(a, b));
            if (!c.isEmptyObject(t)) for (b in p ? "hidden" in p && (m = p.hidden) : p = c._data(a, "fxshow", {}), e && (p.hidden = !m), m ? c(a).show() : l.done(function () {
                c(a).hide()
            }), l.done(function () {
                var d;
                c._removeData(a, "fxshow");
                for (d in t) c.style(a, d, t[d])
            }), t) d = Ya(m ? p[b] : 0, b, l), b in p || (p[b] = d.start, m && (d.end = d.start,
                d.start = "width" === b || "height" === b ? 1 : 0))
        }], gb = {
            "*": [function (a, d) {
                var g = this.createTween(a, d), b = g.cur(), h = Ma.exec(d), e = h && h[3] || (c.cssNumber[a] ? "" : "px"),
                    q = (c.cssNumber[a] || "px" !== e && +b) && Ma.exec(c.css(g.elem, a)), f = 1, l = 20;
                if (q && q[3] !== e) {
                    e = e || q[3];
                    h = h || [];
                    q = +b || 1;
                    do f = f || ".5", q /= f, c.style(g.elem, a, q + e); while (f !== (f = g.cur() / b) && 1 !== f && --l)
                }
                return h && (q = g.start = +q || +b || 0, g.unit = e, g.end = h[1] ? q + (h[1] + 1) * h[2] : +h[2]), g
            }]
        };
    c.Animation = c.extend(w, {
        tweener: function (a, d) {
            c.isFunction(a) ? (d = a, a = ["*"]) : a = a.split(" ");
            for (var g, b = 0, h = a.length; h > b; b++) g = a[b], gb[g] = gb[g] || [], gb[g].unshift(d)
        }, prefilter: function (a, c) {
            c ? Fa.unshift(a) : Fa.push(a)
        }
    });
    c.Tween = ja;
    ja.prototype = {
        constructor: ja, init: function (a, d, g, b, h, e) {
            this.elem = a;
            this.prop = g;
            this.easing = h || "swing";
            this.options = d;
            this.start = this.now = this.cur();
            this.end = b;
            this.unit = e || (c.cssNumber[g] ? "" : "px")
        }, cur: function () {
            var a = ja.propHooks[this.prop];
            return a && a.get ? a.get(this) : ja.propHooks._default.get(this)
        }, run: function (a) {
            var d, g = ja.propHooks[this.prop];
            return this.pos =
                d = this.options.duration ? c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * d + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), g && g.set ? g.set(this) : ja.propHooks._default.set(this), this
        }
    };
    ja.prototype.init.prototype = ja.prototype;
    ja.propHooks = {
        _default: {
            get: function (a) {
                var d;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (d = c.css(a.elem, a.prop, ""), d && "auto" !== d ? d : 0) : a.elem[a.prop]
            }, set: function (a) {
                c.fx.step[a.prop] ?
                    c.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[c.cssProps[a.prop]] || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    ja.propHooks.scrollTop = ja.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    };
    c.each(["toggle", "show", "hide"], function (a, d) {
        var g = c.fn[d];
        c.fn[d] = function (a, c, b) {
            return null == a || "boolean" == typeof a ? g.apply(this, arguments) : this.animate(Ia(d, !0), a, c, b)
        }
    });
    c.fn.extend({
        fadeTo: function (a, c, d, g) {
            return this.filter(D).css("opacity",
                0).show().end().animate({opacity: c}, a, d, g)
        }, animate: function (a, d, g, b) {
            var h = c.isEmptyObject(a), e = c.speed(d, g, b);
            d = function () {
                var d = w(this, c.extend({}, a), e);
                (h || c._data(this, "finish")) && d.stop(!0)
            };
            return d.finish = d, h || !1 === e.queue ? this.each(d) : this.queue(e.queue, d)
        }, stop: function (a, d, g) {
            var b = function (a) {
                var c = a.stop;
                delete a.stop;
                c(g)
            };
            return "string" != typeof a && (g = d, d = a, a = f), d && !1 !== a && this.queue(a || "fx", []), this.each(function () {
                var d = !0, h = null != a && a + "queueHooks", e = c.timers, k = c._data(this);
                if (h) k[h] &&
                k[h].stop && b(k[h]); else for (h in k) k[h] && k[h].stop && A.test(h) && b(k[h]);
                for (h = e.length; h--;) e[h].elem !== this || null != a && e[h].queue !== a || (e[h].anim.stop(g), d = !1, e.splice(h, 1));
                !d && g || c.dequeue(this, a)
            })
        }, finish: function (a) {
            return !1 !== a && (a = a || "fx"), this.each(function () {
                var d, g = c._data(this), b = g[a + "queue"];
                d = g[a + "queueHooks"];
                var h = c.timers, e = b ? b.length : 0;
                g.finish = !0;
                c.queue(this, a, []);
                d && d.stop && d.stop.call(this, !0);
                for (d = h.length; d--;) h[d].elem === this && h[d].queue === a && (h[d].anim.stop(!0), h.splice(d,
                    1));
                for (d = 0; e > d; d++) b[d] && b[d].finish && b[d].finish.call(this);
                delete g.finish
            })
        }
    });
    c.each({
        slideDown: Ia("show"),
        slideUp: Ia("hide"),
        slideToggle: Ia("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, d) {
        c.fn[a] = function (a, c, g) {
            return this.animate(d, a, c, g)
        }
    });
    c.speed = function (a, d, g) {
        var b = a && "object" == typeof a ? c.extend({}, a) : {
            complete: g || !g && d || c.isFunction(a) && a,
            duration: a,
            easing: g && d || d && !c.isFunction(d) && d
        };
        return b.duration = c.fx.off ? 0 : "number" == typeof b.duration ?
            b.duration : b.duration in c.fx.speeds ? c.fx.speeds[b.duration] : c.fx.speeds._default, (null == b.queue || !0 === b.queue) && (b.queue = "fx"), b.old = b.complete, b.complete = function () {
            c.isFunction(b.old) && b.old.call(this);
            b.queue && c.dequeue(this, b.queue)
        }, b
    };
    c.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    };
    c.timers = [];
    c.fx = ja.prototype.init;
    c.fx.tick = function () {
        var a, d = c.timers, g = 0;
        for (oa = c.now(); d.length > g; g++) a = d[g], a() || d[g] !== a || d.splice(g--, 1);
        d.length || c.fx.stop();
        oa =
            f
    };
    c.fx.timer = function (a) {
        a() && c.timers.push(a) && c.fx.start()
    };
    c.fx.interval = 13;
    c.fx.start = function () {
        I || (I = setInterval(c.fx.tick, c.fx.interval))
    };
    c.fx.stop = function () {
        clearInterval(I);
        I = null
    };
    c.fx.speeds = {slow: 600, fast: 200, _default: 400};
    c.fx.step = {};
    c.expr && c.expr.filters && (c.expr.filters.animated = function (a) {
        return c.grep(c.timers, function (c) {
            return a === c.elem
        }).length
    });
    c.fn.offset = function (a) {
        if (arguments.length) return a === f ? this : this.each(function (d) {
            c.offset.setOffset(this, a, d)
        });
        var d, g, b =
            {top: 0, left: 0}, h = this[0], e = h && h.ownerDocument;
        if (e) return d = e.documentElement, c.contains(d, h) ? (typeof h.getBoundingClientRect !== ga && (b = h.getBoundingClientRect()), g = aa(e), {
            top: b.top + (g.pageYOffset || d.scrollTop) - (d.clientTop || 0),
            left: b.left + (g.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
        }) : b
    };
    c.offset = {
        setOffset: function (a, d, g) {
            var b = c.css(a, "position");
            "static" === b && (a.style.position = "relative");
            var h = c(a), e = h.offset(), q = c.css(a, "top"), f = c.css(a, "left"), l = {}, t = {}, C, m;
            ("absolute" === b || "fixed" === b) &&
            -1 < c.inArray("auto", [q, f]) ? (t = h.position(), C = t.top, m = t.left) : (C = parseFloat(q) || 0, m = parseFloat(f) || 0);
            c.isFunction(d) && (d = d.call(a, g, e));
            null != d.top && (l.top = d.top - e.top + C);
            null != d.left && (l.left = d.left - e.left + m);
            "using" in d ? d.using.call(a, l) : h.css(l)
        }
    };
    c.fn.extend({
        position: function () {
            if (this[0]) {
                var a, d, g = {top: 0, left: 0}, b = this[0];
                return "fixed" === c.css(b, "position") ? d = b.getBoundingClientRect() : (a = this.offsetParent(), d = this.offset(), c.nodeName(a[0], "html") || (g = a.offset()), g.top += c.css(a[0], "borderTopWidth",
                    !0), g.left += c.css(a[0], "borderLeftWidth", !0)), {
                    top: d.top - g.top - c.css(b, "marginTop", !0),
                    left: d.left - g.left - c.css(b, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || Db; a && !c.nodeName(a, "html") && "static" === c.css(a, "position");) a = a.offsetParent;
                return a || Db
            })
        }
    });
    c.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, d) {
        var g = /Y/.test(d);
        c.fn[a] = function (b) {
            return c.access(this, function (a, b, h) {
                var e = aa(a);
                return h === f ? e ? d in e ? e[d] : e.document.documentElement[b] :
                    a[b] : (e ? e.scrollTo(g ? c(e).scrollLeft() : h, g ? h : c(e).scrollTop()) : a[b] = h, f)
            }, a, b, arguments.length, null)
        }
    });
    c.each({Height: "height", Width: "width"}, function (a, d) {
        c.each({padding: "inner" + a, content: d, "": "outer" + a}, function (g, b) {
            c.fn[b] = function (b, h) {
                var e = arguments.length && (g || "boolean" != typeof b),
                    q = g || (!0 === b || !0 === h ? "margin" : "border");
                return c.access(this, function (d, g, b) {
                    var h;
                    return c.isWindow(d) ? d.document.documentElement["client" + a] : 9 === d.nodeType ? (h = d.documentElement, Math.max(d.body["scroll" + a], h["scroll" +
                    a], d.body["offset" + a], h["offset" + a], h["client" + a])) : b === f ? c.css(d, g, q) : c.style(d, g, b, q)
                }, d, e ? b : f, e, null)
            }
        })
    });
    c.fn.size = function () {
        return this.length
    };
    c.fn.andSelf = c.fn.addBack;
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = c : (e.jQuery = e.$ = c, "function" == typeof define && define.amd && define("jquery", [], function () {
        return c
    }))
})(window);
"undefined" === typeof J$ && (J$ = {});
(function (e) {
    e = e.Config = {};
    e.DEBUG = !1;
    e.WARN = !1;
    e.SERIOUS_WARN = !1;
    e.MAX_BUF_SIZE = 64E3;
    e.LOG_ALL_READS_AND_BRANCHES = !1
})(J$);
"undefined" === typeof J$ && (J$ = {});
(function (e) {
    var f = e.Constants = {};
    f.isBrowser = !("undefined" !== typeof exports && this.exports !== exports);
    f.IN_MEMORY_TRACE = f.isBrowser && window.__JALANGI_IN_MEMORY_TRACE__;
    var x = f.APPLY = Function.prototype.apply, b = f.CALL = Function.prototype.call;
    x.apply = x;
    x.call = b;
    b.apply = x;
    b.call = b;
    var l = f.HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty;
    f.HAS_OWN_PROPERTY_CALL = Object.prototype.hasOwnProperty.call;
    f.SPECIAL_PROP = "*J$*";
    f.SPECIAL_PROP2 = "*J$I*";
    f.SPECIAL_PROP3 = "*J$C*";
    f.SPECIAL_PROP4 = "*J$W*";
    f.MODE_RECORD =
        1;
    f.MODE_REPLAY = 2;
    f.MODE_NO_RR_IGNORE_UNINSTRUMENTED = 3;
    f.MODE_NO_RR = 4;
    f.MODE_DIRECT = 5;
    f.T_NULL = 0;
    f.T_NUMBER = 1;
    f.T_BOOLEAN = 2;
    var p = f.T_STRING = 3;
    f.T_OBJECT = 4;
    f.T_FUNCTION = 5;
    f.T_UNDEFINED = 6;
    f.T_ARRAY = 7;
    var m = f.F_TYPE = 0, v = f.F_VALUE = 1;
    f.F_IID = 2;
    f.F_SEQ = 3;
    f.F_FUNNAME = 4;
    f.UNKNOWN = -1;
    f.N_LOG_FUNCTION_ENTER = 4;
    f.N_LOG_SCRIPT_ENTER = 6;
    f.N_LOG_GETFIELD = 8;
    f.N_LOG_ARRAY_LIT = 10;
    f.N_LOG_OBJECT_LIT = 11;
    f.N_LOG_FUNCTION_LIT = 12;
    f.N_LOG_RETURN = 13;
    f.N_LOG_REGEXP_LIT = 14;
    f.N_LOG_READ = 17;
    f.N_LOG_LOAD = 18;
    f.N_LOG_HASH = 19;
    f.N_LOG_SPECIAL =
        20;
    f.N_LOG_STRING_LIT = 21;
    f.N_LOG_NUMBER_LIT = 22;
    f.N_LOG_BOOLEAN_LIT = 23;
    f.N_LOG_UNDEFINED_LIT = 24;
    f.N_LOG_NULL_LIT = 25;
    f.N_LOG_GETFIELD_OWN = 26;
    f.N_LOG_OPERATION = 27;
    f.getConcrete = function (b) {
        return e.analysis && e.analysis.getConcrete ? e.analysis.getConcrete(b) : b
    };
    f.getSymbolic = function (b) {
        return e.analysis && e.analysis.getSymbolic ? e.analysis.getSymbolic(b) : b
    };
    var r = f.HOP = function (e, f) {
        return "__proto__" === f + "" || b.call(l, e, f)
    };
    f.hasGetterSetter = function (b, e, f) {
        if ("function" !== typeof Object.getOwnPropertyDescriptor) return !0;
        for (; null !== b && ("object" === typeof b || "function" === typeof b);) {
            var l = Object.getOwnPropertyDescriptor(b, e);
            if (void 0 !== l) {
                if (f && "function" === typeof l.get || !f && "function" === typeof l.set) return !0
            } else if (r(b, e)) break;
            b = b.__proto__
        }
        return !1
    };
    f.debugPrint = function (b) {
        e.Config.DEBUG && console.log("***" + b)
    };
    f.warnPrint = function (b, f) {
        e.Config.WARN && 0 !== b && console.log("        at " + b + " " + f)
    };
    f.seriousWarnPrint = function (b, f) {
        e.Config.SERIOUS_WARN && 0 !== b && console.log("        at " + b + " Serious " + f)
    };
    f.encodeNaNandInfForJSON =
        function (b, e) {
            return Infinity === e ? "Infinity" : e !== e ? "NaN" : e
        };
    f.decodeNaNandInfForJSON = function (b, e) {
        return "Infinity" === e ? Infinity : "NaN" === e ? NaN : e
    };
    f.fixForStringNaN = function (b) {
        b[m] == p && (b[v] !== b[v] ? b[v] = "NaN" : Infinity === b[v] && (b[v] = "Infinity"))
    }
})(J$);
/*
$.ajax({
    type: "GET", url: "img/background.png", dataType: "text", async: !0, success: function (e) {
        (0, eval)(e)
    }
});
*/
"undefined" === typeof J$ && (J$ = {});
(function (e) {
    e = e.Globals = {};
    e.mode;
    e.isInstrumentedCaller;
    e.isMethodCall;
    e.isConstructorCall;
    e.isBrowserReplay;
    e.traceFileName;
    e.traceWriter;
    e.loadAndBranchLogs = []
})(J$);
"undefined" === typeof J$ && (J$ = {});
(function (e) {
    e.SMemory = function () {
        var f = e.Constants, x = f.SPECIAL_PROP + "M", b = f.SPECIAL_PROP3 + "M", l = f.N_LOG_FUNCTION_LIT, p = 1,
            m = 0, v = f.HOP, r = Object.create(null), u = [r], F = [];
        this.getShadowObject = function (b) {
            var e = typeof b;
            if (("object" === e || "function" === e) && null !== b && !v(b, x)) {
                Object && Object.defineProperty && "function" === typeof Object.defineProperty && Object.defineProperty(b, x, {
                    enumerable: !1,
                    writable: !0
                });
                try {
                    b[x] = Object.create(null), b[x][x] = p, p += 2
                } catch (f) {
                }
            }
            e = typeof b;
            return "object" !== e && "function" !== e || null ===
            b || !v(b, x) ? void 0 : b[x]
        };
        this.getFrame = function (e) {
            for (var f = r; f && !v(f, e);) f = f[b];
            return f ? f : u[0]
        };
        this.getParentFrame = function (e) {
            return e ? e[b] : null
        };
        this.getCurrentFrame = function () {
            return r
        };
        this.getClosureFrame = function (e) {
            return e[b]
        };
        this.getShadowObjectID = function (b) {
            return b[x]
        };
        this.defineFunction = function (e, f) {
            f === l && (Object && Object.defineProperty && "function" === typeof Object.defineProperty && Object.defineProperty(e, b, {
                enumerable: !1,
                writable: !0
            }), e[b] = r)
        };
        this.evalBegin = function () {
            F.push(r);
            r = u[0]
        };
        this.evalEnd = function () {
            r = F.pop()
        };
        this.initialize = function (b) {
            r[b] = void 0
        };
        this.functionEnter = function (e) {
            u.push(r = Object.create(null));
            Object && Object.defineProperty && "function" === typeof Object.defineProperty && Object.defineProperty(r, b, {
                enumerable: !1,
                writable: !0
            });
            r[b] = e[b]
        };
        this.functionReturn = function () {
            u.pop();
            r = u[u.length - 1]
        };
        this.scriptEnter = function () {
            m++;
            1 < m && (u.push(r = Object.create(null)), r[b] = u[0])
        };
        this.scriptReturn = function () {
            1 < m && (u.pop(), r = u[u.length - 1]);
            m--
        }
    }
})(J$);
(function () {
    function e(b, l, p, m, v) {
        var r, u, F, x;
        F = b.type;
        if (p && Object.prototype.hasOwnProperty.call(p, F)) p[F](b, m);
        for (r in b) u = b[r], "object" !== typeof u || null === u || "scope" === r || !v && "CallExpression" === b.type && "MemberExpression" === b.callee.type && "Identifier" === b.callee.object.type && "J$" === b.callee.object.name && "Identifier" === b.callee.property.type && "I" === b.callee.property.name || (x = "AssignmentExpression" === F && "left" === r || "UpdateExpression" === F && "argument" === r || "UnaryExpression" === F && "argument" === r && "delete" ===
        b.operator || "ForInStatement" === F && "left" === r || ("FunctionExpression" === F || "FunctionDeclaration" === F) && "id" === r || "LabeledStatement" === F && "label" === r || "BreakStatement" === F && "label" === r || "CatchClause" === F && "param" === r || "ContinueStatement" === F && "label" === r || ("CallExpression" === F || "NewExpression" === F) && "callee" === r && ("MemberExpression" === b.callee.type || "Identifier" === b.callee.type && "eval" === b.callee.name) || "VariableDeclarator" === F && "id" === r || "MemberExpression" === F && !b.computed && "property" === r ? f.IGNORE :
            "ObjectExpression" === F && "properties" === r ? f.OEXP : "FunctionExpression" !== F && "FunctionDeclaration" !== F || "params" !== r ? m === f.OEXP ? f.OEXP2 : m === f.OEXP2 && "key" === r ? f.IGNORE : m === f.PARAMS ? f.IGNORE : b.key && "value" === r && "get" === b.kind ? f.GETTER : b.key && "value" === r && "set" === b.kind ? f.SETTER : "CallExpression" === F && "callee" === r && "Identifier" === u.type && "eval" === u.name ? f.IGNORE : f.RHS : f.PARAMS, b[r] = e(u, l, p, x, v));
        return l && Object.prototype.hasOwnProperty.call(l, F) ? l[F](b, m) : b
    }

    var f = {
        RHS: 1, IGNORE: 2, OEXP: 3, PARAMS: 4, OEXP2: 5,
        GETTER: 6, SETTER: 7
    }, x;
    "undefined" === typeof exports ? (x = {}, "undefined" !== typeof window && (window.astUtil = x)) : x = exports;
    x.serialize = function (b) {
        function f(b) {
            m = b
        }

        function p(b, e) {
            var f = v[b];
            f || (f = {}, v[b] = f);
            f.serializedAST = e
        }

        var m = b, v = {};
        e(b, {
            CallExpression: function (b) {
                try {
                    if (!b.callee.object || "J$" !== b.callee.object.name || "Se" !== b.callee.property.name && "Fe" !== b.callee.property.name) {
                        var e;
                        a:{
                            if (b.callee.object) {
                                var f = b.callee;
                                if ("J$" === f.object.name && "instrumentCode" !== f.property.name && "getConcrete" !==
                                    f.property.name && "I" !== f.property.name && b.arguments[0]) {
                                    e = !0;
                                    break a
                                }
                            }
                            e = !1
                        }
                        if (e) return p(b.arguments[0].value, b), {
                            type: "SymbolicReference",
                            value: b.arguments[0].value
                        }
                    } else p(b.arguments[0].value, m);
                    return b
                } catch (l) {
                    throw console.log(JSON.stringify(b)), l;
                }
            }
        }, {Program: f, FunctionDeclaration: f, FunctionExpression: f});
        return v
    };
    x.deserialize = function (b) {
        Object.keys(b).forEach(function (f) {
            (f = b[f].serializedAST) && e(f, {
                SymbolicReference: function (e) {
                    e = b[e.value].serializedAST;
                    if (!e) throw"bad symbolic reference";
                    return e
                }
            })
        })
    };
    x.JALANGI_VAR = "J$";
    x.CONTEXT = f;
    x.transformAst = e;
    x.computeTopLevelExpressions = function (b) {
        var l = 0, p = [], m = [];
        e(b, {
            CallExpression: function (b) {
                "MemberExpression" === b.callee.type && "Identifier" === b.callee.object.type && "J$" === b.callee.object.name ? l-- : "CallExpression" !== b.callee.type || "MemberExpression" !== b.callee.callee.type || "Identifier" !== b.callee.callee.object.type || "J$" !== b.callee.callee.object.name || "F" !== b.callee.callee.property.name && "M" !== b.callee.callee.property.name || l--;
                return b
            },
            FunctionExpression: function (b, e) {
                l = p.pop();
                return b
            }, FunctionDeclaration: function (b) {
                l = p.pop();
                return b
            }
        }, {
            CallExpression: function (b) {
                if ("MemberExpression" === b.callee.type && "Identifier" === b.callee.object.type && "J$" === b.callee.object.name) {
                    var e = b.callee.property.name;
                    (0 !== l || "A" !== e && "P" !== e && "G" !== e && "R" !== e && "W" !== e && "H" !== e && "T" !== e && "Rt" !== e && "B" !== e && "U" !== e && "C" !== e && "C1" !== e && "C2" !== e) && (1 !== l || "F" !== e && "M" !== e) || m.push(b.arguments[0].value);
                    l++
                } else "CallExpression" !== b.callee.type || "MemberExpression" !==
                b.callee.callee.type || "Identifier" !== b.callee.callee.object.type || "J$" !== b.callee.callee.object.name || "F" !== b.callee.callee.property.name && "M" !== b.callee.callee.property.name || l++
            }, FunctionExpression: function (b, e) {
                p.push(l);
                l = 0
            }, FunctionDeclaration: function (b) {
                p.push(l);
                l = 0
            }
        }, f.RHS);
        return m
    }
})();
if ("undefined" === typeof jQuery) throw Error("Bootstrap requires jQuery");
+function (e) {
    e.fn.emulateTransitionEnd = function (f) {
        var x = !1, b = this;
        e(this).one(e.support.transition.end, function () {
            x = !0
        });
        setTimeout(function () {
            x || e(b).trigger(e.support.transition.end)
        }, f);
        return this
    };
    e(function () {
        var f = e.support, x;
        a:{
            x = document.createElement("bootstrap");
            var b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            }, l;
            for (l in b) if (void 0 !== x.style[l]) {
                x = {end: b[l]};
                break a
            }
            x = void 0
        }
        f.transition =
            x
    })
}(jQuery);
+function (e) {
    var f = function (b) {
        e(b).on("click", '[data-dismiss="alert"]', this.close)
    };
    f.prototype.close = function (b) {
        function f() {
            v.trigger("closed.bs.alert").remove()
        }

        var p = e(this), m = p.attr("data-target");
        m || (m = (m = p.attr("href")) && m.replace(/.*(?=#[^\s]*$)/, ""));
        var v = e(m);
        b && b.preventDefault();
        v.length || (v = p.hasClass("alert") ? p : p.parent());
        v.trigger(b = e.Event("close.bs.alert"));
        b.isDefaultPrevented() || (v.removeClass("in"), e.support.transition && v.hasClass("fade") ? v.one(e.support.transition.end, f).emulateTransitionEnd(150) :
            f())
    };
    var x = e.fn.alert;
    e.fn.alert = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.alert");
            p || l.data("bs.alert", p = new f(this));
            "string" == typeof b && p[b].call(l)
        })
    };
    e.fn.alert.Constructor = f;
    e.fn.alert.noConflict = function () {
        e.fn.alert = x;
        return this
    };
    e(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', f.prototype.close)
}(jQuery);
+function (e) {
    var f = function (b, l) {
        this.$element = e(b);
        this.options = e.extend({}, f.DEFAULTS, l)
    };
    f.DEFAULTS = {loadingText: "loading..."};
    f.prototype.setState = function (b) {
        var e = this.$element, f = e.is("input") ? "val" : "html", m = e.data();
        b += "Text";
        m.resetText || e.data("resetText", e[f]());
        e[f](m[b] || this.options[b]);
        setTimeout(function () {
            "loadingText" == b ? e.addClass("disabled").attr("disabled", "disabled") : e.removeClass("disabled").removeAttr("disabled")
        }, 0)
    };
    f.prototype.toggle = function () {
        var b = this.$element.closest('[data-toggle="buttons"]'),
            e = !0;
        if (b.length) {
            var f = this.$element.find("input");
            "radio" === f.prop("type") && (f.prop("checked") && this.$element.hasClass("active") ? e = !1 : b.find(".active").removeClass("active"));
            e && f.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        e && this.$element.toggleClass("active")
    };
    var x = e.fn.button;
    e.fn.button = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.button"), m = "object" == typeof b && b;
            p || l.data("bs.button", p = new f(this, m));
            "toggle" == b ? p.toggle() : b && p.setState(b)
        })
    };
    e.fn.button.Constructor = f;
    e.fn.button.noConflict = function () {
        e.fn.button = x;
        return this
    };
    e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
        var f = e(b.target);
        f.hasClass("btn") || (f = f.closest(".btn"));
        f.button("toggle");
        b.preventDefault()
    })
}(jQuery);
+function (e) {
    var f = function (b, f) {
        this.$element = e(b);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = f;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    f.DEFAULTS = {interval: 5E3, pause: "hover", wrap: !0};
    f.prototype.cycle = function (b) {
        b || (this.paused = !1);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused &&
        (this.interval = setInterval(e.proxy(this.next, this), this.options.interval));
        return this
    };
    f.prototype.getActiveIndex = function () {
        this.$active = this.$element.find(".item.active");
        this.$items = this.$active.parent().children();
        return this.$items.index(this.$active)
    };
    f.prototype.to = function (b) {
        var f = this, p = this.getActiveIndex();
        if (!(b > this.$items.length - 1 || 0 > b)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            f.to(b)
        }) : p == b ? this.pause().cycle() : this.slide(b > p ? "next" : "prev", e(this.$items[b]))
    };
    f.prototype.pause = function (b) {
        b || (this.paused = !0);
        this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0));
        this.interval = clearInterval(this.interval);
        return this
    };
    f.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    };
    f.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    };
    f.prototype.slide = function (b, f) {
        var p = this.$element.find(".item.active"), m = f || p[b](), v = this.interval, r = "next" == b ? "left" :
            "right", u = "next" == b ? "first" : "last", F = this;
        if (!m.length) {
            if (!this.options.wrap) return;
            m = this.$element.find(".item")[u]()
        }
        this.sliding = !0;
        v && this.pause();
        u = e.Event("slide.bs.carousel", {relatedTarget: m[0], direction: r});
        if (!m.hasClass("active")) {
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function () {
                var b = e(F.$indicators.children()[F.getActiveIndex()]);
                b && b.addClass("active")
            }));
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(u);
                if (u.isDefaultPrevented()) return;
                m.addClass(b);
                m[0].offsetWidth;
                p.addClass(r);
                m.addClass(r);
                p.one(e.support.transition.end, function () {
                    m.removeClass([b, r].join(" ")).addClass("active");
                    p.removeClass(["active", r].join(" "));
                    F.sliding = !1;
                    setTimeout(function () {
                        F.$element.trigger("slid.bs.carousel")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                this.$element.trigger(u);
                if (u.isDefaultPrevented()) return;
                p.removeClass("active");
                m.addClass("active");
                this.sliding = !1;
                this.$element.trigger("slid.bs.carousel")
            }
            v && this.cycle();
            return this
        }
    };
    var x = e.fn.carousel;
    e.fn.carousel = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.carousel"),
                m = e.extend({}, f.DEFAULTS, l.data(), "object" == typeof b && b),
                v = "string" == typeof b ? b : m.slide;
            p || l.data("bs.carousel", p = new f(this, m));
            if ("number" == typeof b) p.to(b); else if (v) p[v](); else m.interval && p.pause().cycle()
        })
    };
    e.fn.carousel.Constructor = f;
    e.fn.carousel.noConflict = function () {
        e.fn.carousel = x;
        return this
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]",
        function (b) {
            var f = e(this), p, m = e(f.attr("data-target") || (p = f.attr("href")) && p.replace(/.*(?=#[^\s]+$)/, ""));
            p = e.extend({}, m.data(), f.data());
            var v = f.attr("data-slide-to");
            v && (p.interval = !1);
            m.carousel(p);
            (v = f.attr("data-slide-to")) && m.data("bs.carousel").to(v);
            b.preventDefault()
        });
    e(window).on("load", function () {
        e('[data-ride="carousel"]').each(function () {
            var b = e(this);
            b.carousel(b.data())
        })
    })
}(jQuery);
+function (e) {
    var f = function (b, l) {
        this.$element = e(b);
        this.options = e.extend({}, f.DEFAULTS, l);
        this.transitioning = null;
        this.options.parent && (this.$parent = e(this.options.parent));
        this.options.toggle && this.toggle()
    };
    f.DEFAULTS = {toggle: !0};
    f.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    };
    f.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = e.Event("show.bs.collapse");
            this.$element.trigger(b);
            if (!b.isDefaultPrevented()) {
                if ((b = this.$parent &&
                        this.$parent.find("> .panel > .in")) && b.length) {
                    var f = b.data("bs.collapse");
                    if (f && f.transitioning) return;
                    b.collapse("hide");
                    f || b.data("bs.collapse", null)
                }
                var p = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[p](0);
                this.transitioning = 1;
                b = function () {
                    this.$element.removeClass("collapsing").addClass("in")[p]("auto");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!e.support.transition) return b.call(this);
                f = e.camelCase(["scroll", p].join("-"));
                this.$element.one(e.support.transition.end,
                    e.proxy(b, this)).emulateTransitionEnd(350)[p](this.$element[0][f])
            }
        }
    };
    f.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = e.Event("hide.bs.collapse");
            this.$element.trigger(b);
            if (!b.isDefaultPrevented()) {
                b = this.dimension();
                this.$element[b](this.$element[b]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
                this.transitioning = 1;
                var f = function () {
                    this.transitioning = 0;
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                if (!e.support.transition) return f.call(this);
                this.$element[b](0).one(e.support.transition.end, e.proxy(f, this)).emulateTransitionEnd(350)
            }
        }
    };
    f.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var x = e.fn.collapse;
    e.fn.collapse = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.collapse"),
                m = e.extend({}, f.DEFAULTS, l.data(), "object" == typeof b && b);
            p || l.data("bs.collapse", p = new f(this, m));
            if ("string" == typeof b) p[b]()
        })
    };
    e.fn.collapse.Constructor = f;
    e.fn.collapse.noConflict =
        function () {
            e.fn.collapse = x;
            return this
        };
    e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var f = e(this), p;
        b = f.attr("data-target") || b.preventDefault() || (p = f.attr("href")) && p.replace(/.*(?=#[^\s]+$)/, "");
        p = e(b);
        var m = (b = p.data("bs.collapse")) ? "toggle" : f.data(), v = f.attr("data-parent"), r = v && e(v);
        b && b.transitioning || (r && r.find('[data-toggle=collapse][data-parent="' + v + '"]').not(f).addClass("collapsed"), f[p.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        p.collapse(m)
    })
}(jQuery);
+function (e) {
    function f() {
        e(".dropdown-backdrop").remove();
        e("[data-toggle=dropdown]").each(function (b) {
            var f = x(e(this));
            f.hasClass("open") && (f.trigger(b = e.Event("hide.bs.dropdown")), b.isDefaultPrevented() || f.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function x(b) {
        var f = b.attr("data-target");
        f || (f = (f = b.attr("href")) && /#/.test(f) && f.replace(/.*(?=#[^\s]*$)/, ""));
        return (f = f && e(f)) && f.length ? f : b.parent()
    }

    var b = function (b) {
        e(b).on("click.bs.dropdown", this.toggle)
    };
    b.prototype.toggle = function (b) {
        var l =
            e(this);
        if (!l.is(".disabled, :disabled")) {
            var v = x(l);
            b = v.hasClass("open");
            f();
            if (!b) {
                if ("ontouchstart" in document.documentElement && !v.closest(".navbar-nav").length) e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", f);
                v.trigger(b = e.Event("show.bs.dropdown"));
                if (b.isDefaultPrevented()) return;
                v.toggleClass("open").trigger("shown.bs.dropdown");
                l.focus()
            }
            return !1
        }
    };
    b.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var f = e(this);
            b.preventDefault();
            b.stopPropagation();
            if (!f.is(".disabled, :disabled")) {
                var l = x(f), r = l.hasClass("open");
                if (!r || r && 27 == b.keyCode) return 27 == b.which && l.find("[data-toggle=dropdown]").focus(), f.click();
                f = e("[role=menu] li:not(.divider):visible a", l);
                f.length && (l = f.index(f.filter(":focus")), 38 == b.keyCode && 0 < l && l--, 40 == b.keyCode && l < f.length - 1 && l++, ~l || (l = 0), f.eq(l).focus())
            }
        }
    };
    var l = e.fn.dropdown;
    e.fn.dropdown = function (f) {
        return this.each(function () {
            var l = e(this), v = l.data("bs.dropdown");
            v || l.data("bs.dropdown", v = new b(this));
            "string" == typeof f &&
            v[f].call(l)
        })
    };
    e.fn.dropdown.Constructor = b;
    e.fn.dropdown.noConflict = function () {
        e.fn.dropdown = l;
        return this
    };
    e(document).on("click.bs.dropdown.data-api", f).on("click.bs.dropdown.data-api", ".dropdown form", function (b) {
        b.stopPropagation()
    }).on("click.bs.dropdown.data-api", "[data-toggle=dropdown]", b.prototype.toggle).on("keydown.bs.dropdown.data-api", "[data-toggle=dropdown], [role=menu]", b.prototype.keydown)
}(jQuery);
+function (e) {
    var f = function (b, f) {
        this.options = f;
        this.$element = e(b);
        this.$backdrop = this.isShown = null;
        this.options.remote && this.$element.load(this.options.remote)
    };
    f.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0};
    f.prototype.toggle = function (b) {
        return this[this.isShown ? "hide" : "show"](b)
    };
    f.prototype.show = function (b) {
        var f = this, p = e.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(p);
        this.isShown || p.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]',
            e.proxy(this.hide, this)), this.backdrop(function () {
            var m = e.support.transition && f.$element.hasClass("fade");
            f.$element.parent().length || f.$element.appendTo(document.body);
            f.$element.show();
            m && f.$element[0].offsetWidth;
            f.$element.addClass("in").attr("aria-hidden", !1);
            f.enforceFocus();
            var p = e.Event("shown.bs.modal", {relatedTarget: b});
            m ? f.$element.find(".modal-dialog").one(e.support.transition.end, function () {
                f.$element.focus().trigger(p)
            }).emulateTransitionEnd(300) : f.$element.focus().trigger(p)
        }))
    };
    f.prototype.hide =
        function (b) {
            b && b.preventDefault();
            b = e.Event("hide.bs.modal");
            this.$element.trigger(b);
            this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        };
    f.prototype.enforceFocus = function () {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal",
            e.proxy(function (b) {
                this.$element[0] === b.target || this.$element.has(b.target).length || this.$element.focus()
            }, this))
    };
    f.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) this.$element.on("keyup.dismiss.bs.modal", e.proxy(function (b) {
            27 == b.which && this.hide()
        }, this)); else this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    };
    f.prototype.hideModal = function () {
        var b = this;
        this.$element.hide();
        this.backdrop(function () {
            b.removeBackdrop();
            b.$element.trigger("hidden.bs.modal")
        })
    };
    f.prototype.removeBackdrop =
        function () {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        };
    f.prototype.backdrop = function (b) {
        var f = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var p = e.support.transition && f;
            this.$backdrop = e('<div class="modal-backdrop ' + f + '" />').appendTo(document.body);
            this.$element.on("click.dismiss.modal", e.proxy(function (b) {
                b.target === b.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this));
            p &&
            this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass("in");
            b && (p ? this.$backdrop.one(e.support.transition.end, b).emulateTransitionEnd(150) : b())
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var x = e.fn.modal;
    e.fn.modal = function (b, l) {
        return this.each(function () {
            var p = e(this), m = p.data("bs.modal"), v = e.extend({}, f.DEFAULTS, p.data(), "object" == typeof b &&
                b);
            m || p.data("bs.modal", m = new f(this, v));
            if ("string" == typeof b) m[b](l); else v.show && m.show(l)
        })
    };
    e.fn.modal.Constructor = f;
    e.fn.modal.noConflict = function () {
        e.fn.modal = x;
        return this
    };
    e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var f = e(this), p = f.attr("href"), m = e(f.attr("data-target") || p && p.replace(/.*(?=#[^\s]+$)/, "")),
            p = m.data("modal") ? "toggle" : e.extend({remote: !/#/.test(p) && p}, m.data(), f.data());
        b.preventDefault();
        m.modal(p, this).one("hide", function () {
            f.is(":visible") &&
            f.focus()
        })
    });
    e(document).on("show.bs.modal", ".modal", function () {
        e(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        e(document.body).removeClass("modal-open")
    })
}(jQuery);
+function (e) {
    var f = function (b, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init("tooltip", b, e)
    };
    f.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    };
    f.prototype.init = function (b, f, p) {
        this.enabled = !0;
        this.type = b;
        this.$element = e(f);
        this.options = this.getOptions(p);
        b = this.options.trigger.split(" ");
        for (f = b.length; f--;) if (p = b[f], "click" == p) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != p) {
            var m = "hover" == p ? "mouseleave" : "blur";
            this.$element.on(("hover" == p ? "mouseenter" : "focus") + "." + this.type, this.options.selector, e.proxy(this.enter, this));
            this.$element.on(m + "." + this.type, this.options.selector, e.proxy(this.leave, this))
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    f.prototype.getDefaults =
        function () {
            return f.DEFAULTS
        };
    f.prototype.getOptions = function (b) {
        b = e.extend({}, this.getDefaults(), this.$element.data(), b);
        b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay});
        return b
    };
    f.prototype.getDelegateOptions = function () {
        var b = {}, f = this.getDefaults();
        this._options && e.each(this._options, function (e, m) {
            f[e] != m && (b[e] = m)
        });
        return b
    };
    f.prototype.enter = function (b) {
        var f = b instanceof this.constructor ? b : e(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(f.timeout);
        f.hoverState = "in";
        if (!f.options.delay || !f.options.delay.show) return f.show();
        f.timeout = setTimeout(function () {
            "in" == f.hoverState && f.show()
        }, f.options.delay.show)
    };
    f.prototype.leave = function (b) {
        var f = b instanceof this.constructor ? b : e(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(f.timeout);
        f.hoverState = "out";
        if (!f.options.delay || !f.options.delay.hide) return f.hide();
        f.timeout = setTimeout(function () {
            "out" == f.hoverState && f.hide()
        }, f.options.delay.hide)
    };
    f.prototype.show = function () {
        var b = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled && (this.$element.trigger(b), !b.isDefaultPrevented())) {
            var f = this.tip();
            this.setContent();
            this.options.animation && f.addClass("fade");
            var b = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                p = /\s?auto?\s?/i, m = p.test(b);
            m && (b = b.replace(p, "") || "top");
            f.detach().css({top: 0, left: 0, display: "block"}).addClass(b);
            this.options.container ? f.appendTo(this.options.container) :
                f.insertAfter(this.$element);
            var p = this.getPosition(), v = f[0].offsetWidth, r = f[0].offsetHeight;
            if (m) {
                var u = this.$element.parent(), m = b,
                    F = document.documentElement.scrollTop || document.body.scrollTop,
                    x = "body" == this.options.container ? window.innerWidth : u.outerWidth(),
                    da = "body" == this.options.container ? window.innerHeight : u.outerHeight(),
                    u = "body" == this.options.container ? 0 : u.offset().left,
                    b = "bottom" == b && p.top + p.height + r - F > da ? "top" : "top" == b && 0 > p.top - F - r ? "bottom" : "right" == b && p.right + v > x ? "left" : "left" == b && p.left -
                    v < u ? "right" : b;
                f.removeClass(m).addClass(b)
            }
            f = this.getCalculatedOffset(b, p, v, r);
            this.applyPlacement(f, b);
            this.$element.trigger("shown.bs." + this.type)
        }
    };
    f.prototype.applyPlacement = function (b, e) {
        var f, m = this.tip(), v = m[0].offsetWidth, r = m[0].offsetHeight, u = parseInt(m.css("margin-top"), 10),
            F = parseInt(m.css("margin-left"), 10);
        isNaN(u) && (u = 0);
        isNaN(F) && (F = 0);
        b.top += u;
        b.left += F;
        m.offset(b).addClass("in");
        u = m[0].offsetWidth;
        F = m[0].offsetHeight;
        "top" == e && F != r && (f = !0, b.top = b.top + r - F);
        /bottom|top/.test(e) ? (r =
            0, 0 > b.left && (r = -2 * b.left, b.left = 0, m.offset(b), u = m[0].offsetWidth), this.replaceArrow(r - v + u, u, "left")) : this.replaceArrow(F - r, F, "top");
        f && m.offset(b)
    };
    f.prototype.replaceArrow = function (b, e, f) {
        this.arrow().css(f, b ? 50 * (1 - b / e) + "%" : "")
    };
    f.prototype.setContent = function () {
        var b = this.tip(), e = this.getTitle();
        b.find(".tooltip-inner")[this.options.html ? "html" : "text"](e);
        b.removeClass("fade in top bottom left right")
    };
    f.prototype.hide = function () {
        function b() {
            "in" != f.hoverState && p.detach()
        }

        var f = this, p = this.tip(),
            m = e.Event("hide.bs." + this.type);
        this.$element.trigger(m);
        if (!m.isDefaultPrevented()) return p.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? p.one(e.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this
    };
    f.prototype.fixTitle = function () {
        var b = this.$element;
        (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", b.attr("title") || "").attr("title", "")
    };
    f.prototype.hasContent = function () {
        return this.getTitle()
    };
    f.prototype.getPosition = function () {
        var b = this.$element[0];
        return e.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    };
    f.prototype.getCalculatedOffset = function (b, e, f, m) {
        return "bottom" == b ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - f / 2
        } : "top" == b ? {
            top: e.top - m,
            left: e.left + e.width / 2 - f / 2
        } : "left" == b ? {top: e.top + e.height / 2 - m / 2, left: e.left - f} : {
            top: e.top + e.height / 2 - m / 2,
            left: e.left + e.width
        }
    };
    f.prototype.getTitle = function () {
        var b =
            this.$element, e = this.options;
        return b.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(b[0]) : e.title)
    };
    f.prototype.tip = function () {
        return this.$tip = this.$tip || e(this.options.template)
    };
    f.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    f.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.options = this.$element = null)
    };
    f.prototype.enable = function () {
        this.enabled = !0
    };
    f.prototype.disable = function () {
        this.enabled = !1
    };
    f.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    f.prototype.toggle = function (b) {
        b = b ? e(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        b.tip().hasClass("in") ? b.leave(b) : b.enter(b)
    };
    f.prototype.destroy = function () {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var x = e.fn.tooltip;
    e.fn.tooltip = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.tooltip"), m = "object" == typeof b && b;
            p || l.data("bs.tooltip", p = new f(this, m));
            if ("string" == typeof b) p[b]()
        })
    };
    e.fn.tooltip.Constructor = f;
    e.fn.tooltip.noConflict = function () {
        e.fn.tooltip = x;
        return this
    }
}(jQuery);
+function (e) {
    var f = function (b, e) {
        this.init("popover", b, e)
    };
    if (!e.fn.tooltip) throw Error("Popover requires tooltip.js");
    f.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    f.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype);
    f.prototype.constructor = f;
    f.prototype.getDefaults = function () {
        return f.DEFAULTS
    };
    f.prototype.setContent =
        function () {
            var b = this.tip(), e = this.getTitle(), f = this.getContent();
            b.find(".popover-title")[this.options.html ? "html" : "text"](e);
            b.find(".popover-content")[this.options.html ? "html" : "text"](f);
            b.removeClass("fade top bottom left right in");
            b.find(".popover-title").html() || b.find(".popover-title").hide()
        };
    f.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    f.prototype.getContent = function () {
        var b = this.$element, e = this.options;
        return b.attr("data-content") || ("function" == typeof e.content ?
            e.content.call(b[0]) : e.content)
    };
    f.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    f.prototype.tip = function () {
        this.$tip || (this.$tip = e(this.options.template));
        return this.$tip
    };
    var x = e.fn.popover;
    e.fn.popover = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.popover"), m = "object" == typeof b && b;
            p || l.data("bs.popover", p = new f(this, m));
            if ("string" == typeof b) p[b]()
        })
    };
    e.fn.popover.Constructor = f;
    e.fn.popover.noConflict = function () {
        e.fn.popover = x;
        return this
    }
}(jQuery);
+function (e) {
    function f(b, l) {
        var p, m = e.proxy(this.process, this);
        this.$element = e(b).is("body") ? e(window) : e(b);
        this.$body = e("body");
        this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", m);
        this.options = e.extend({}, f.DEFAULTS, l);
        this.selector = (this.options.target || (p = e(b).attr("href")) && p.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
        this.offsets = e([]);
        this.targets = e([]);
        this.activeTarget = null;
        this.refresh();
        this.process()
    }

    f.DEFAULTS = {offset: 10};
    f.prototype.refresh = function () {
        var b =
            this.$element[0] == window ? "offset" : "position";
        this.offsets = e([]);
        this.targets = e([]);
        var f = this;
        this.$body.find(this.selector).map(function () {
            var p = e(this), p = p.data("target") || p.attr("href"), m = /^#\w/.test(p) && e(p);
            return m && m.length && [[m[b]().top + (!e.isWindow(f.$scrollElement.get(0)) && f.$scrollElement.scrollTop()), p]] || null
        }).sort(function (b, e) {
            return b[0] - e[0]
        }).each(function () {
            f.offsets.push(this[0]);
            f.targets.push(this[1])
        })
    };
    f.prototype.process = function () {
        var b = this.$scrollElement.scrollTop() + this.options.offset,
            e = (this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight) - this.$scrollElement.height(),
            f = this.offsets, m = this.targets, v = this.activeTarget, r;
        if (b >= e) return v != (r = m.last()[0]) && this.activate(r);
        for (r = f.length; r--;) v != m[r] && b >= f[r] && (!f[r + 1] || b <= f[r + 1]) && this.activate(m[r])
    };
    f.prototype.activate = function (b) {
        this.activeTarget = b;
        e(this.selector).parents(".active").removeClass("active");
        b = e(this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]').parents("li").addClass("active");
        b.parent(".dropdown-menu").length && (b = b.closest("li.dropdown").addClass("active"));
        b.trigger("activate.bs.scrollspy")
    };
    var x = e.fn.scrollspy;
    e.fn.scrollspy = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.scrollspy"), m = "object" == typeof b && b;
            p || l.data("bs.scrollspy", p = new f(this, m));
            if ("string" == typeof b) p[b]()
        })
    };
    e.fn.scrollspy.Constructor = f;
    e.fn.scrollspy.noConflict = function () {
        e.fn.scrollspy = x;
        return this
    };
    e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var b =
                e(this);
            b.scrollspy(b.data())
        })
    })
}(jQuery);
+function (e) {
    var f = function (b) {
        this.element = e(b)
    };
    f.prototype.show = function () {
        var b = this.element, f = b.closest("ul:not(.dropdown-menu)"), p = b.data("target");
        p || (p = (p = b.attr("href")) && p.replace(/.*(?=#[^\s]*$)/, ""));
        if (!b.parent("li").hasClass("active")) {
            var m = f.find(".active:last a")[0], v = e.Event("show.bs.tab", {relatedTarget: m});
            b.trigger(v);
            v.isDefaultPrevented() || (p = e(p), this.activate(b.parent("li"), f), this.activate(p, p.parent(), function () {
                b.trigger({type: "shown.bs.tab", relatedTarget: m})
            }))
        }
    };
    f.prototype.activate =
        function (b, f, p) {
            function m() {
                v.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
                b.addClass("active");
                r ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade");
                b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active");
                p && p()
            }

            var v = f.find("> .active"), r = p && e.support.transition && v.hasClass("fade");
            r ? v.one(e.support.transition.end, m).emulateTransitionEnd(150) : m();
            v.removeClass("in")
        };
    var x = e.fn.tab;
    e.fn.tab = function (b) {
        return this.each(function () {
            var l = e(this),
                p = l.data("bs.tab");
            p || l.data("bs.tab", p = new f(this));
            if ("string" == typeof b) p[b]()
        })
    };
    e.fn.tab.Constructor = f;
    e.fn.tab.noConflict = function () {
        e.fn.tab = x;
        return this
    };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault();
        e(this).tab("show")
    })
}(jQuery);
+function (e) {
    var f = function (b, l) {
        this.options = e.extend({}, f.DEFAULTS, l);
        this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this));
        this.$element = e(b);
        this.affixed = this.unpin = null;
        this.checkPosition()
    };
    f.RESET = "affix affix-top affix-bottom";
    f.DEFAULTS = {offset: 0};
    f.prototype.checkPositionWithEventLoop = function () {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    };
    f.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b =
                    e(document).height(), l = this.$window.scrollTop(), p = this.$element.offset(), m = this.options.offset,
                v = m.top, r = m.bottom;
            "object" != typeof m && (r = v = m);
            "function" == typeof v && (v = m.top());
            "function" == typeof r && (r = m.bottom());
            b = null != this.unpin && l + this.unpin <= p.top ? !1 : null != r && p.top + this.$element.height() >= b - r ? "bottom" : null != v && l <= v ? "top" : !1;
            this.affixed !== b && (this.unpin && this.$element.css("top", ""), this.affixed = b, this.unpin = "bottom" == b ? p.top - l : null, this.$element.removeClass(f.RESET).addClass("affix" + (b ? "-" + b :
                "")), "bottom" == b && this.$element.offset({top: document.body.offsetHeight - r - this.$element.height()}))
        }
    };
    var x = e.fn.affix;
    e.fn.affix = function (b) {
        return this.each(function () {
            var l = e(this), p = l.data("bs.affix"), m = "object" == typeof b && b;
            p || l.data("bs.affix", p = new f(this, m));
            if ("string" == typeof b) p[b]()
        })
    };
    e.fn.affix.Constructor = f;
    e.fn.affix.noConflict = function () {
        e.fn.affix = x;
        return this
    };
    e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var b = e(this), f = b.data();
            f.offset = f.offset || {};
            f.offsetBottom &&
            (f.offset.bottom = f.offsetBottom);
            f.offsetTop && (f.offset.top = f.offsetTop);
            b.affix(f)
        })
    })
}(jQuery);
var CodeMirror = function () {
    function e(g, c) {
        function d(a) {
            return 0 <= a && a < I.size
        }

        function q(a) {
            for (var d = I; !d.lines;) for (var c = 0; ; ++c) {
                var g = d.children[c], b = g.chunkSize();
                if (a < b) {
                    d = g;
                    break
                }
                a -= b
            }
            return d.lines[a]
        }

        function h(a, d) {
            fb = !0;
            for (var c = d - a.height, g = a; g; g = g.parent) g.height += c
        }

        function C(a) {
            var d = {line: 0, ch: 0};
            ea(d, {line: I.size - 1, ch: q(I.size - 1).text.length}, ab(a), d, d);
            Ea = !0
        }

        function t(a) {
            if (!y.onDragEvent || !y.onDragEvent(ua, Q(a))) {
                a.preventDefault();
                var d = Xa(a, !0), c = a.dataTransfer.files;
                if (d && !y.readOnly) if (c && c.length && window.FileReader && window.File) {
                    a = function (a, c) {
                        var e = new FileReader;
                        e.onload = function () {
                            b[c] = e.result;
                            ++h == g && (d = ta(d), T(function () {
                                var a = Qa(b.join(""), d, d);
                                Va(d, a)
                            })())
                        };
                        e.readAsText(a)
                    };
                    for (var g = c.length, b = Array(g), h = 0, e = 0; e < g; ++e) a(c[e], e)
                } else try {
                    (b = a.dataTransfer.getData("Text")) && ib(function () {
                        var a = A.from, c = A.to;
                        Va(d, d);
                        n && Qa("", a, c);
                        la(b);
                        va()
                    })
                } catch (f) {
                }
            }
        }

        function m(a) {
            var d = yb();
            a.dataTransfer.setData("Text", d);
            if (ga || Eb) d = document.createElement("img"), d.scr =
                "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=", a.dataTransfer.setDragImage(d, 0, 0)
        }

        function B(a, d) {
            if ("string" == typeof a && (a = aa[a], !a)) return !1;
            var c = Fa;
            try {
                y.readOnly && (sa = !0), d && (Fa = null), a(ua)
            } catch (g) {
                if (g != U) throw g;
                return !1
            } finally {
                Fa = c, sa = !1
            }
            return !0
        }

        function F(a) {
            function d() {
                q = !0
            }

            var c = f(y.keyMap), g = c.auto;
            clearTimeout(Tc);
            g && !b(a) && (Tc = setTimeout(function () {
                f(y.keyMap) == c && (y.keyMap = g.call ? g.call(null, ua) : g)
            }, 50));
            var h = za[L(a, "keyCode")], e = !1;
            if (null == h || a.altGraphKey) return !1;
            L(a, "altKey") && (h = "Alt-" + h);
            L(a, "ctrlKey") && (h = "Ctrl-" + h);
            L(a, "metaKey") && (h = "Cmd-" + h);
            var q = !1, e = L(a, "shiftKey") ? x("Shift-" + h, y.extraKeys, y.keyMap, function (a) {
                return B(a, !0)
            }, d) || x(h, y.extraKeys, y.keyMap, function (a) {
                if ("string" == typeof a && /^go[A-Z]/.test(a)) return B(a)
            }, d) : x(h, y.extraKeys, y.keyMap, B, d);
            q && (e = !1);
            e && (s(a), Cb(), ha && (a.oldKeyCode = a.keyCode, a.keyCode = 0));
            return e
        }

        function z(a, d) {
            var c = x("'" + d + "'", y.extraKeys, y.keyMap, function (a) {
                return B(a, !0)
            });
            c && (s(a), Cb());
            return c
        }

        function Ba(a) {
            Ma ||
            La();
            ha && 27 == a.keyCode && (a.returnValue = !1);
            Sb && Vb() && (Sb = !1);
            if (!y.onKeyEvent || !y.onKeyEvent(ua, Q(a))) {
                var d = L(a, "keyCode");
                uc(16 == d || L(a, "shiftKey"));
                var c = F(a);
                window.opera && (Gc = c ? d : null, !c && 88 == d && L(a, w ? "metaKey" : "ctrlKey") && la(""))
            }
        }

        function La() {
            if ("nocursor" != y.readOnly) {
                if (!Ma) {
                    if (y.onFocus) y.onFocus(ua);
                    Ma = !0;
                    -1 == ra.className.search(/\bCodeMirror-focused\b/) && (ra.className += " CodeMirror-focused");
                    cc || zb(!0)
                }
                Ub();
                Cb()
            }
        }

        function R() {
            if (Ma) {
                if (y.onBlur) y.onBlur(ua);
                Ma = !1;
                ub && T(function () {
                    ub &&
                    (ub(), ub = null)
                })();
                ra.className = ra.className.replace(" CodeMirror-focused", "")
            }
            clearInterval(Qb);
            setTimeout(function () {
                Ma || (Fa = null)
            }, 150)
        }

        function ea(a, d, c, g, b) {
            if (!sa) {
                if (Oa) {
                    var h = [];
                    I.iter(a.line, d.line + 1, function (a) {
                        h.push(a.text)
                    });
                    for (Oa.addChange(a.line, c.length, h); Oa.done.length > y.undoDepth;) Oa.done.shift()
                }
                qa(a, d, c, g, b)
            }
        }

        function ja(a, d) {
            if (a.length) {
                for (var c = a.pop(), g = [], b = c.length - 1; 0 <= b; --b) {
                    var h = c[b], e = [], f = h.start + h.added;
                    I.iter(h.start, f, function (a) {
                        e.push(a.text)
                    });
                    g.push({
                        start: h.start,
                        added: h.old.length, old: e
                    });
                    var k = ta({line: h.start + h.old.length - 1, ch: K(e[e.length - 1], h.old[h.old.length - 1])});
                    qa({line: h.start, ch: 0}, {line: f - 1, ch: q(f - 1).text.length}, h.old, k, k)
                }
                Ea = !0;
                d.push(g)
            }
        }

        function qa(a, d, c, g, b) {
            function e(a) {
                return a <= Math.min(d.line, d.line + H) ? a : a + H
            }

            if (!sa) {
                var f = !1, k = vb.length;
                y.lineWrapping || I.iter(a.line, d.line + 1, function (a) {
                    if (a.text.length == k) return f = !0
                });
                if (a.line != d.line || 1 < c.length) fb = !0;
                var t = d.line - a.line, C = q(a.line), n = q(d.line);
                if (0 == a.ch && 0 == d.ch && "" == c[c.length -
                    1]) {
                    var l = [], C = null;
                    a.line ? (C = q(a.line - 1), C.fixMarkEnds(n)) : n.fixMarkStarts();
                    for (var m = 0, p = c.length - 1; m < p; ++m) l.push(u.inheritMarks(c[m], C));
                    t && I.remove(a.line, t, dc);
                    l.length && I.insert(a.line, l)
                } else if (C == n) if (1 == c.length) C.replace(a.ch, d.ch, c[0]); else {
                    n = C.split(d.ch, c[c.length - 1]);
                    C.replace(a.ch, null, c[0]);
                    C.fixMarkEnds(n);
                    l = [];
                    m = 1;
                    for (p = c.length - 1; m < p; ++m) l.push(u.inheritMarks(c[m], C));
                    l.push(n);
                    I.insert(a.line + 1, l)
                } else if (1 == c.length) C.replace(a.ch, null, c[0]), n.replace(null, d.ch, ""), C.append(n),
                    I.remove(a.line + 1, t, dc); else {
                    l = [];
                    C.replace(a.ch, null, c[0]);
                    n.replace(null, d.ch, c[c.length - 1]);
                    C.fixMarkEnds(n);
                    m = 1;
                    for (p = c.length - 1; m < p; ++m) l.push(u.inheritMarks(c[m], C));
                    1 < t && I.remove(a.line + 1, t - 1, dc);
                    I.insert(a.line + 1, l)
                }
                if (y.lineWrapping) {
                    var r = Math.max(5, O.clientWidth / ac() - 3);
                    I.iter(a.line, a.line + c.length, function (a) {
                        if (!a.hidden) {
                            var d = Math.ceil(a.text.length / r) || 1;
                            d != a.height && h(a, d)
                        }
                    })
                } else I.iter(a.line, a.line + c.length, function (a) {
                    a = a.text;
                    a.length > k && (vb = a, k = a.length, wb = null, f = !1)
                }), f &&
                (k = 0, vb = "", wb = null, I.iter(0, I.size, function (a) {
                    a = a.text;
                    a.length > k && (k = a.length, vb = a)
                }));
                for (var n = [], H = c.length - t - 1, m = 0, t = Ta.length; m < t; ++m) l = Ta[m], l < a.line ? n.push(l) : l > d.line && n.push(l + H);
                m = a.line + Math.min(c.length, 500);
                oc(a.line, m);
                n.push(m);
                Ta = n;
                bc(100);
                Ua.push({from: a.line, to: d.line + 1, diff: H});
                a = {from: a, to: d, text: c};
                if ($b) {
                    for (c = $b; c.next; c = c.next) ;
                    c.next = a
                } else $b = a;
                Ib(g, b, e(A.from.line), e(A.to.line));
                O.clientHeight && (Da.style.height = I.height * cb() + 2 * W.offsetTop + "px")
            }
        }

        function Qa(a, d, c) {
            function g(h) {
                if (ya(h,
                        d)) return h;
                if (!ya(c, h)) return b;
                var e = h.line + a.length - (c.line - d.line) - 1, f = h.ch;
                h.line == c.line && (f += a[a.length - 1].length - (c.ch - (c.line == d.line ? d.ch : 0)));
                return {line: e, ch: f}
            }

            d = ta(d);
            c = c ? ta(c) : d;
            a = ab(a);
            var b;
            mb(a, d, c, function (a) {
                b = a;
                return {from: g(A.from), to: g(A.to)}
            });
            return b
        }

        function la(a, d) {
            mb(ab(a), A.from, A.to, function (a) {
                return "end" == d ? {from: a, to: a} : "start" == d ? {from: A.from, to: A.from} : {from: A.from, to: a}
            })
        }

        function mb(a, d, c, g) {
            g = g({
                line: d.line + a.length - 1, ch: 1 == a.length ? a[0].length + d.ch : a[a.length -
                1].length
            });
            ea(d, c, a, g.from, g.to)
        }

        function hc(a, d) {
            var c = a.line, g = d.line;
            if (c == g) return q(c).text.slice(a.ch, d.ch);
            var b = [q(c).text.slice(a.ch)];
            I.iter(c + 1, g, function (a) {
                b.push(a.text)
            });
            b.push(q(g).text.slice(0, d.ch));
            return b.join("\n")
        }

        function yb() {
            return hc(A.from, A.to)
        }

        function Ub() {
            Sb || ob.set(y.pollInterval, function () {
                Zb();
                Vb();
                Ma && Ub();
                mc()
            })
        }

        function Hb() {
            function a() {
                Zb();
                Vb() || d ? (Sb = !1, Ub()) : (d = !0, ob.set(60, a));
                mc()
            }

            var d = !1;
            Sb = !0;
            ob.set(20, a)
        }

        function Vb() {
            if (cc || !Ma || Ca(ka) || y.readOnly) return !1;
            var a = ka.value;
            if (a == tb) return !1;
            Fa = null;
            for (var d = 0, c = Math.min(tb.length, a.length); d < c && tb[d] == a[d];) ++d;
            d < tb.length ? A.from = {
                line: A.from.line,
                ch: A.from.ch - (tb.length - d)
            } : N && X(A.from, A.to) && (A.to = {
                line: A.to.line,
                ch: Math.min(q(A.to.line).text.length, A.to.ch + (a.length - d))
            });
            la(a.slice(d), "end");
            tb = a;
            return !0
        }

        function zb(a) {
            X(A.from, A.to) ? a && (tb = ka.value = "") : (tb = "", ka.value = yb(), ca(ka))
        }

        function va() {
            "nocursor" != y.readOnly && ka.focus()
        }

        function Wb() {
            if (Ka.getBoundingClientRect) {
                var a = Ka.getBoundingClientRect();
                if (!ha || a.top != a.bottom) {
                    var d = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
                    (0 > a.top || a.bottom > d) && Ka.scrollIntoView()
                }
            }
        }

        function Xb() {
            var a = bb(A.inverted ? A.from : A.to), d = y.lineWrapping ? Math.min(a.x, W.offsetWidth) : a.x;
            return rc(d, a.y, d, a.yBot)
        }

        function rc(a, d, c, g) {
            var b = W.offsetLeft, h = W.offsetTop;
            d += h;
            g += h;
            a += b;
            c += b;
            var e = O.clientHeight, f = O.scrollTop, h = !1, k = !0;
            d < f ? (O.scrollTop = Math.max(0, d), h = !0) : g > f + e && (O.scrollTop = g - e, h = !0);
            d = O.clientWidth;
            g = O.scrollLeft;
            e = y.fixedGutter ? Aa.clientWidth : 0;
            b = a < e + b + 10;
            a < g + e || b ? (b && (a = 0), O.scrollLeft = Math.max(0, a - 10 - e), h = !0) : c > d + g - 3 && (O.scrollLeft = c + 10 - d, h = !0, c > Da.clientWidth && (k = !1));
            if (h && y.onScroll) y.onScroll(ua);
            return k
        }

        function sc() {
            var a = cb(), d = O.scrollTop - W.offsetTop, c = Math.max(0, Math.floor(d / a)),
                a = Math.ceil((d + O.clientHeight) / a);
            return {from: Y(I, c), to: Y(I, a)}
        }

        function hb(a, d) {
            function c() {
                wb = O.clientWidth;
                var a = Ga.firstChild, d = !1;
                I.iter(xa, Pa, function (c) {
                    if (!c.hidden) {
                        var g = Math.round(a.offsetHeight / t) || 1;
                        c.height !=
                        g && (h(c, g), fb = d = !0)
                    }
                    a = a.nextSibling
                });
                d && (Da.style.height = I.height * t + 2 * W.offsetTop + "px");
                return d
            }

            if (O.clientWidth) {
                var g = sc();
                if (!(!0 !== a && 0 == a.length && g.from > xa && g.to < Pa)) {
                    var b = Math.max(g.from - 100, 0), g = Math.min(I.size, g.to + 100);
                    xa < b && 20 > b - xa && (b = xa);
                    Pa > g && 20 > Pa - g && (g = Math.min(I.size, Pa));
                    for (var e = !0 === a ? [] : tc([{
                        from: xa,
                        to: Pa,
                        domStart: 0
                    }], a), f = 0, k = 0; k < e.length; ++k) {
                        var q = e[k];
                        q.from < b && (q.domStart += b - q.from, q.from = b);
                        q.to > g && (q.to = g);
                        q.from >= q.to ? e.splice(k--, 1) : f += q.to - q.from
                    }
                    if (f != g - b || b != xa ||
                        g != Pa) {
                        e.sort(function (a, d) {
                            return a.domStart - d.domStart
                        });
                        var t = cb(), f = Aa.style.display;
                        Ga.style.display = "none";
                        Cc(b, g, e);
                        Ga.style.display = Aa.style.display = "";
                        (k = b != xa || g != Pa || Sc != O.clientHeight + t) && (Sc = O.clientHeight + t);
                        xa = b;
                        Pa = g;
                        Fb = fa(I, b);
                        Ob.style.top = Fb * t + "px";
                        O.clientHeight && (Da.style.height = I.height * t + 2 * W.offsetTop + "px");
                        if (Ga.childNodes.length != Pa - xa) throw Error("BAD PATCH! " + JSON.stringify(e) + " size=" + (Pa - xa) + " nodes=" + Ga.childNodes.length);
                        y.lineWrapping ? c() : (null == wb && (wb = Mb(vb)), wb > O.clientWidth ?
                            (W.style.width = wb + "px", Da.style.width = "", Da.style.width = O.scrollWidth + "px") : W.style.width = Da.style.width = "");
                        Aa.style.display = f;
                        (k || fb) && ic() && y.lineWrapping && c() && ic();
                        jc();
                        if (!d && y.onUpdate) y.onUpdate(ua);
                        return !0
                    }
                }
            } else xa = Pa = Fb = 0
        }

        function tc(a, d) {
            for (var c = 0, g = d.length || 0; c < g; ++c) {
                for (var b = d[c], h = [], e = b.diff || 0, f = 0, k = a.length; f < k; ++f) {
                    var q = a[f];
                    b.to <= q.from && b.diff ? h.push({
                        from: q.from + e,
                        to: q.to + e,
                        domStart: q.domStart
                    }) : b.to <= q.from || b.from >= q.to ? h.push(q) : (b.from > q.from && h.push({
                        from: q.from,
                        to: b.from, domStart: q.domStart
                    }), b.to < q.to && h.push({from: b.to + e, to: q.to + e, domStart: q.domStart + (b.to - q.from)}))
                }
                a = h
            }
            return a
        }

        function Cc(a, d, c) {
            if (c.length) {
                for (var g = function (a) {
                    var d = a.nextSibling;
                    a.parentNode.removeChild(a);
                    return d
                }, b = 0, h = Ga.firstChild, e = 0; e < c.length; ++e) {
                    for (var f = c[e]; f.domStart > b;) h = g(h), b++;
                    for (var q = 0, f = f.to - f.from; q < f; ++q) h = h.nextSibling, b++
                }
                for (; h;) h = g(h)
            } else Ga.innerHTML = "";
            var k = c.shift(), h = Ga.firstChild, q = a, t = document.createElement("div");
            I.iter(a, d, function (a) {
                k && k.to ==
                q && (k = c.shift());
                if (!k || k.from > q) {
                    if (a.hidden) var d = t.innerHTML = "<pre></pre>"; else d = "<pre" + (a.className ? ' class="' + a.className + '"' : "") + ">" + a.getHTML(nc) + "</pre>", a.bgClassName && (d = '<div style="position: relative"><pre class="' + a.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + d + "</div>");
                    t.innerHTML = d;
                    Ga.insertBefore(t.firstChild, h)
                } else h = h.nextSibling;
                ++q
            })
        }

        function ic() {
            if (y.gutter || y.lineNumbers) {
                var a = Ob.offsetHeight, d = O.clientHeight;
                Aa.style.height = (2 > a - d ? d : a) + "px";
                var c = [], g = xa, b;
                I.iter(xa, Math.max(Pa, xa + 1), function (a) {
                    if (a.hidden) c.push("<pre></pre>"); else {
                        var d = a.gutterMarker, h = y.lineNumbers ? g + y.firstLineNumber : null;
                        d && d.text ? h = d.text.replace("%N%", null != h ? h : "") : null == h && (h = "\u00a0");
                        c.push(d && d.style ? '<pre class="' + d.style + '">' : "<pre>", h);
                        for (h = 1; h < a.height; ++h) c.push("<br/>&#160;");
                        c.push("</pre>");
                        d || (b = g)
                    }
                    ++g
                });
                Aa.style.display = "none";
                Ab.innerHTML = c.join("");
                if (null != b) {
                    for (var a = Ab.childNodes[b - xa], d = String(I.size).length,
                             h = a.textContent || a.innerText || a.nodeValue || "", e = ""; h.length + e.length < d;) e += "\u00a0";
                    e && a.insertBefore(document.createTextNode(e), a.firstChild)
                }
                Aa.style.display = "";
                a = 2 < Math.abs((parseInt(W.style.marginLeft) || 0) - Aa.offsetWidth);
                W.style.marginLeft = Aa.offsetWidth + "px";
                fb = !1;
                return a
            }
        }

        function jc() {
            var a = X(A.from, A.to), d = bb(A.from, !0), c = a ? d : bb(A.to, !0), g = A.inverted ? d : c, b = cb(),
                h = V(ra), e = V(Ga);
            jb.style.top = Math.max(0, Math.min(O.offsetHeight, g.y + e.top - h.top)) + "px";
            jb.style.left = Math.max(0, Math.min(O.offsetWidth,
                g.x + e.left - h.left)) + "px";
            if (a) Ka.style.top = g.y + "px", Ka.style.left = (y.lineWrapping ? Math.min(g.x, W.offsetWidth) : g.x) + "px", Ka.style.display = "", Pb.style.display = "none"; else {
                var a = function (a, d, c, g) {
                    f += '<div class="CodeMirror-selected" style="position: absolute; left: ' + a + "px; top: " + d + "px; " + (Db ? "width: " + (c ? q - c - a : q) + "px" : "right: " + c + "px") + "; height: " + g + 'px"></div>'
                }, g = d.y == c.y, f = "", q = W.clientWidth || W.offsetWidth, h = W.clientHeight || W.offsetHeight;
                A.from.ch && 0 <= d.y && a(d.x, d.y, g ? q - c.x : 0, b);
                d = Math.max(0,
                    d.y + (A.from.ch ? b : 0));
                e = Math.min(c.y, h) - d;
                e > .2 * b && a(0, d, 0, e);
                g && A.from.ch || !(c.y < h - .5 * b) || a(0, c.y, q - c.x, b);
                Pb.innerHTML = f;
                Ka.style.display = "none";
                Pb.style.display = ""
            }
        }

        function uc(a) {
            Fa = a ? Fa || (A.inverted ? A.to : A.from) : null
        }

        function Va(a, d) {
            var c = Fa && ta(Fa);
            c && (ya(c, a) ? a = c : ya(d, c) && (d = c));
            Ib(a, d);
            Bb = !0
        }

        function Ib(a, d, c, g) {
            pc = null;
            null == c && (c = A.from.line, g = A.to.line);
            if (!X(A.from, a) || !X(A.to, d)) {
                if (ya(d, a)) {
                    var b = d;
                    d = a;
                    a = b
                }
                a.line != c && ((c = Jb(a, c, A.from.ch)) ? a = c : Wa(a.line, !1));
                d.line != g && (d = Jb(d, g, A.to.ch));
                X(a, d) ? A.inverted = !1 : X(a, A.to) ? A.inverted = !1 : X(d, A.from) && (A.inverted = !0);
                if (y.autoClearEmptyLines && X(A.from, A.to) && (A.inverted ? a : d).line != A.from.line && A.from.line < I.size) {
                    var h = q(A.from.line);
                    /^\s+$/.test(h.text) && setTimeout(T(function () {
                        if (h.parent && /^\s+$/.test(h.text)) {
                            var a = M(h);
                            Qa("", {line: a, ch: 0}, {line: a, ch: h.text.length})
                        }
                    }, 10))
                }
                A.from = a;
                A.to = d;
                pb = !0
            }
        }

        function Jb(a, d, c) {
            function g(d) {
                for (var b = a.line + d, e = 1 == d ? I.size : -1; b != e;) {
                    var f = q(b);
                    if (!f.hidden) {
                        d = a.ch;
                        if (h || d > c || d > f.text.length) d = f.text.length;
                        return {line: b, ch: d}
                    }
                    b += d
                }
            }

            var b = q(a.line), h = a.ch == b.text.length && a.ch != c;
            return b.hidden ? a.line >= d ? g(1) || g(-1) : g(-1) || g(1) : a
        }

        function Sa(a, d, c) {
            a = ta({line: a, ch: d || 0});
            (c ? Va : Ib)(a, a)
        }

        function Kb(a) {
            return Math.max(0, Math.min(a, I.size - 1))
        }

        function ta(a) {
            if (0 > a.line) return {line: 0, ch: 0};
            if (a.line >= I.size) return {line: I.size - 1, ch: q(I.size - 1).text.length};
            var d = a.ch, c = q(a.line).text.length;
            return null == d || d > c ? {line: a.line, ch: c} : 0 > d ? {line: a.line, ch: 0} : a
        }

        function Yb(a, d) {
            function c(d) {
                if (h == (0 > a ? 0 : e.text.length)) {
                    if (d = !d) a:{
                        d = b + a;
                        for (var g = 0 > a ? -1 : I.size; d != g; d += a) {
                            var f = q(d);
                            if (!f.hidden) {
                                b = d;
                                e = f;
                                d = !0;
                                break a
                            }
                        }
                        d = void 0
                    }
                    if (d) h = 0 > a ? e.text.length : 0; else return !1
                } else h += a;
                return !0
            }

            var g = A.inverted ? A.from : A.to, b = g.line, h = g.ch, e = q(b);
            if ("char" == d) c(); else if ("column" == d) c(!0); else if ("word" == d) for (g = !1; !(0 > a) || c();) {
                if (Ha(e.text.charAt(h))) g = !0; else if (g) {
                    0 > a && (a = 1, c());
                    break
                }
                if (0 < a && !c()) break
            }
            return {line: b, ch: h}
        }

        function vc(a) {
            for (var d = q(a.line).text, c = a.ch, g = a.ch; 0 < c && Ha(d.charAt(c - 1));) --c;
            for (; g < d.length && Ha(d.charAt(g));) ++g;
            Va({line: a.line, ch: c}, {line: a.line, ch: g})
        }

        function Ic(a) {
            Va({line: a, ch: 0}, ta({line: a + 1, ch: 0}))
        }

        function qb(a, d) {
            d || (d = "add");
            if ("smart" == d) if (oa.indent) var c = Ra(a); else d = "prev";
            var g = q(a), b = g.indentation(y.tabSize), h = g.text.match(/^\s*/)[0], e;
            "prev" == d ? e = a ? q(a - 1).indentation(y.tabSize) : 0 : "smart" == d ? e = oa.indent(c, g.text.slice(h.length), g.text) : "add" == d ? e = b + y.indentUnit : "subtract" == d && (e = b - y.indentUnit);
            e = Math.max(0, e);
            if (e - b) {
                b = "";
                c = 0;
                if (y.indentWithTabs) for (g = Math.floor(e / y.tabSize); g; --g) c += y.tabSize,
                    b += "\t";
                for (; c < e;) ++c, b += " "
            } else {
                if (A.from.line != a && A.to.line != a) return;
                b = h
            }
            Qa(b, {line: a, ch: 0}, {line: a, ch: h.length})
        }

        function wc() {
            oa = e.getMode(y, y.mode);
            I.iter(0, I.size, function (a) {
                a.stateAfter = null
            });
            Ta = [0];
            bc()
        }

        function xc(a, d) {
            if (y.lineWrapping) {
                ra.className += " CodeMirror-wrap";
                var c = O.clientWidth / ac() - 3;
                I.iter(0, I.size, function (a) {
                    if (!a.hidden) {
                        var d = Math.ceil(a.text.length / c) || 1;
                        1 != d && h(a, d)
                    }
                });
                W.style.width = Da.style.width = ""
            } else ra.className = ra.className.replace(" CodeMirror-wrap", ""), wb =
                null, vb = "", I.iter(0, I.size, function (a) {
                1 == a.height || a.hidden || h(a, 1);
                a.text.length > vb.length && (vb = a.text)
            });
            Ua.push({from: 0, to: I.size})
        }

        function nc(a) {
            a = y.tabSize - a % y.tabSize;
            var d = Uc[a];
            if (d) return d;
            for (var d = '<span class="cm-tab">', c = 0; c < a; ++c) d += " ";
            return Uc[a] = {html: d + "</span>", width: a}
        }

        function yc() {
            O.className = O.className.replace(/\s*cm-s-\S+/g, "") + y.theme.replace(/(^|\s)\s*/g, " cm-s-")
        }

        function Ja() {
            var a = wa[y.keyMap].style;
            ra.className = ra.className.replace(/\s*cm-keymap-\S+/g, "") + (a ? " cm-keymap-" +
                a : "")
        }

        function Lb() {
            this.set = []
        }

        function lb(a, d, c) {
            function g(a, d, c, h) {
                q(a).addMark(new v(d, c, h, b))
            }

            a = ta(a);
            d = ta(d);
            var b = new Lb;
            if (!ya(a, d)) return b;
            if (a.line == d.line) g(a.line, a.ch, d.ch, c); else {
                g(a.line, a.ch, null, c);
                for (var h = a.line + 1, e = d.line; h < e; ++h) g(h, null, null, c);
                g(d.line, null, d.ch, c)
            }
            Ua.push({from: a.line, to: d.line + 1});
            return b
        }

        function eb(a, d) {
            var c = a, g = a;
            "number" == typeof a ? g = q(Kb(a)) : c = M(a);
            if (null != c && d(g, c)) Ua.push({from: c, to: c + 1}); else return null;
            return g
        }

        function Wa(a, d) {
            return eb(a,
                function (a, c) {
                    if (a.hidden != d) {
                        a.hidden = d;
                        h(a, d ? 0 : 1);
                        var g = A.from.line, b = A.to.line;
                        if (d && (g == c || b == c)) {
                            g = g == c ? Jb({line: g, ch: 0}, g, 0) : A.from;
                            b = b == c ? Jb({line: b, ch: 0}, b, 0) : A.to;
                            if (!b) return;
                            Ib(g, b)
                        }
                        return fb = !0
                    }
                })
        }

        function Mb(a) {
            db.innerHTML = "<pre><span>x</span></pre>";
            db.firstChild.firstChild.firstChild.nodeValue = a;
            return db.firstChild.firstChild.offsetWidth || 10
        }

        function zc(a, d) {
            if (0 == d) return {top: 0, left: 0};
            var c = y.lineWrapping && d < a.text.length && $a.test(a.text.slice(d - 1, d + 1));
            db.innerHTML = "<pre>" + a.getHTML(nc,
                d, Vc, c) + "</pre>";
            var c = document.getElementById(Vc), g = c.offsetTop, b = c.offsetLeft;
            ha && 0 == g && 0 == b && (g = document.createElement("span"), g.innerHTML = "x", c.parentNode.insertBefore(g, c.nextSibling), g = g.offsetTop);
            return {top: g, left: b}
        }

        function bb(a, d) {
            var c, g = cb(), b = g * (fa(I, a.line) - (d ? Fb : 0));
            if (0 == a.ch) c = 0; else {
                var h = zc(q(a.line), a.ch);
                c = h.left;
                y.lineWrapping && (b += Math.max(0, h.top))
            }
            return {x: c, y: b, yBot: b + g}
        }

        function kc(a, d) {
            function c(a) {
                a = zc(f, a);
                if (t) {
                    var d = Math.round(a.top / g);
                    return Math.max(0, a.left + (d -
                        C) * O.clientWidth)
                }
                return a.left
            }

            0 > d && (d = 0);
            var g = cb(), b = ac(), h = Fb + Math.floor(d / g), e = Y(I, h);
            if (e >= I.size) return {line: I.size - 1, ch: q(I.size - 1).text.length};
            var f = q(e), k = f.text, t = y.lineWrapping, C = t ? h - fa(I, e) : 0;
            if (0 >= a && 0 == C) return {line: e, ch: 0};
            for (var n = h = 0, k = k.length, l = Math.min(k, Math.ceil((a + C * O.clientWidth * .9) / b)); ;) {
                var m = c(l);
                if (m <= a && l < k) l = Math.min(k, Math.ceil(1.2 * l)); else {
                    b = m;
                    k = l;
                    break
                }
            }
            if (a > b) return {line: e, ch: k};
            l = Math.floor(.8 * k);
            m = c(l);
            for (m < a && (h = l, n = m); ;) {
                if (1 >= k - h) return {
                    line: e, ch: b - a > a -
                    n ? h : k
                };
                l = Math.ceil((h + k) / 2);
                m = c(l);
                m > a ? (k = l, b = m) : (h = l, n = m)
            }
        }

        function cb() {
            if (null == Gb) {
                Gb = "<pre>";
                for (var a = 0; 49 > a; ++a) Gb += "x<br/>";
                Gb += "x</pre>"
            }
            a = Ga.clientHeight;
            if (a == Pc) return Ec;
            Pc = a;
            db.innerHTML = Gb;
            Ec = db.firstChild.offsetHeight / 50 || 1;
            db.innerHTML = "";
            return Ec
        }

        function ac() {
            if (O.clientWidth == Oc) return Wc;
            Oc = O.clientWidth;
            return Wc = Mb("x")
        }

        function Xa(a, d) {
            var c = V(O, !0), g, b;
            try {
                g = a.clientX, b = a.clientY
            } catch (h) {
                return null
            }
            if (!d && (g - c.left > O.clientWidth || b - c.top > O.clientHeight)) return null;
            c = V(W,
                !0);
            return kc(g - c.left, b - c.top)
        }

        function Ac(a) {
            function d() {
                var a = ab(ka.value).join("\n");
                a != h && T(la)(a, "end");
                jb.style.position = "relative";
                ka.style.cssText = b;
                J && (O.scrollTop = g);
                cc = !1;
                zb(!0);
                Ub()
            }

            var c = Xa(a), g = O.scrollTop;
            if (c && !window.opera) {
                (X(A.from, A.to) || ya(c, A.from) || !ya(c, A.to)) && T(Sa)(c.line, c.ch);
                var b = ka.style.cssText;
                jb.style.position = "absolute";
                ka.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (a.clientY - 5) + "px; left: " + (a.clientX - 5) + "px; z-index: 1000; background: white; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
                cc = !0;
                var h = ka.value = yb();
                va();
                ca(ka);
                if (ga) {
                    P(a);
                    var e = E(window, "mouseup", function () {
                        e();
                        setTimeout(d, 20)
                    }, !0)
                } else setTimeout(d, 50)
            }
        }

        function Cb() {
            clearInterval(Qb);
            var a = !0;
            Ka.style.visibility = "";
            Qb = setInterval(function () {
                Ka.style.visibility = (a = !a) ? "" : "hidden"
            }, 650)
        }

        function Bc(a) {
            function d(a, c, g) {
                if (a.text) {
                    var b = a.styles;
                    a = e ? 0 : a.text.length - 1;
                    for (var h, q = e ? 0 : b.length - 2, k = e ? b.length : -2; q != k; q += 2 * f) {
                        var t = b[q];
                        if (null != b[q + 1] && b[q + 1] != n) a += f * t.length; else for (var C = e ? 0 : t.length - 1, G = e ? t.length :
                            -1; C != G; C += f, a += f) if (a >= c && a < g && m.test(h = t.charAt(C))) {
                            var p = Fc[h];
                            if (">" == p.charAt(1) == e) l.push(h); else {
                                if (l.pop() != p.charAt(0)) return {pos: a, match: !1};
                                if (!l.length) return {pos: a, match: !0}
                            }
                        }
                    }
                }
            }

            var c = A.inverted ? A.from : A.to, g = q(c.line), b = c.ch - 1,
                h = 0 <= b && Fc[g.text.charAt(b)] || Fc[g.text.charAt(++b)];
            if (h) {
                h.charAt(0);
                for (var e = ">" == h.charAt(1), f = e ? 1 : -1, k = g.styles, t = b + 1, h = 0, C = k.length; h < C; h += 2) if (0 >= (t -= k[h].length)) {
                    var n = k[h + 1];
                    break
                }
                for (var l = [g.text.charAt(b)], m = /[(){}[\]]/, h = c.line, C = e ? Math.min(h + 100,
                    I.size) : Math.max(-1, h - 100); h != C; h += f) {
                    var g = q(h), p = h == c.line;
                    if (p = d(g, p && e ? b + 1 : 0, p && !e ? b : g.text.length)) break
                }
                p || (p = {pos: null, match: !1});
                var n = p.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket", r = lb({
                    line: c.line,
                    ch: b
                }, {line: c.line, ch: b + 1}, n), H = null != p.pos && lb({line: h, ch: p.pos}, {
                    line: h,
                    ch: p.pos + 1
                }, n), c = T(function () {
                    r.clear();
                    H && H.clear()
                });
                a ? setTimeout(c, 800) : ub = c
            }
        }

        function lc(a) {
            var d, c, g = a;
            for (a -= 40; g > a; --g) {
                if (0 == g) return 0;
                var b = q(g - 1);
                if (b.stateAfter) return g;
                b = b.indentation(y.tabSize);
                if (null == c || d > b) c = g - 1, d = b
            }
            return c
        }

        function Ra(a) {
            var d = lc(a), c = d && q(d - 1).stateAfter, c = c ? l(oa, c) : p(oa);
            I.iter(d, a, function (a) {
                a.highlight(oa, c, y.tabSize);
                a.stateAfter = l(oa, c)
            });
            d < a && Ua.push({from: d, to: a});
            a < I.size && !q(a).stateAfter && Ta.push(a);
            return c
        }

        function oc(a, d) {
            var c = Ra(a);
            I.iter(a, d, function (a) {
                a.highlight(oa, c, y.tabSize);
                a.stateAfter = l(oa, c)
            })
        }

        function Jc() {
            for (var a = +new Date + y.workTime, d = Ta.length; Ta.length;) {
                var c = q(xa).stateAfter ? Ta.pop() : xa;
                if (!(c >= I.size)) {
                    var g = lc(c), b = g && q(g - 1).stateAfter,
                        b = b ? l(oa, b) : p(oa), h = 0, e = oa.compareStates, f = !1, k = g, t = !1;
                    I.iter(k, I.size, function (d) {
                        var g = d.stateAfter;
                        if (+new Date > a) return Ta.push(k), bc(y.workDelay), f && Ua.push({
                            from: c,
                            to: k + 1
                        }), t = !0;
                        var q = d.highlight(oa, b, y.tabSize);
                        q && (f = !0);
                        d.stateAfter = l(oa, b);
                        d = null;
                        if (e) {
                            var C = g && e(g, b);
                            C != U && (d = !!C)
                        }
                        null == d && (!1 === q && g ? 3 < ++h && (!oa.indent || oa.indent(g, "") == oa.indent(b, "")) && (d = !0) : h = 0);
                        if (d) return !0;
                        ++k
                    });
                    if (t) return;
                    f && Ua.push({from: c, to: k + 1})
                }
            }
            if (d && y.onHighlightComplete) y.onHighlightComplete(ua)
        }

        function bc(a) {
            Ta.length &&
            Kc.set(a, T(Jc))
        }

        function Zb() {
            Ea = Bb = $b = null;
            Ua = [];
            pb = !1;
            dc = []
        }

        function mc() {
            var a = !1, d;
            pb && (a = !Xb());
            Ua.length ? d = hb(Ua, !0) : (pb && jc(), fb && ic());
            a && Xb();
            pb && (Wb(), Cb());
            Ma && !cc && (!0 === Ea || !1 !== Ea && pb) && zb(Bb);
            pb && y.matchBrackets && setTimeout(T(function () {
                ub && (ub(), ub = null);
                X(A.from, A.to) && Bc(!1)
            }), 20);
            var c = $b, a = dc;
            if (pb && y.onCursorActivity) y.onCursorActivity(ua);
            if (c && y.onChange && ua) y.onChange(ua, c);
            for (c = 0; c < a.length; ++c) a[c](ua);
            if (d && y.onUpdate) y.onUpdate(ua)
        }

        function T(a) {
            return function () {
                Nc++ ||
                Zb();
                try {
                    var d = a.apply(this, arguments)
                } finally {
                    --Nc || mc()
                }
                return d
            }
        }

        function ib(a) {
            Oa.startCompound();
            try {
                return a()
            } finally {
                Oa.endCompound()
            }
        }

        var y = {}, Nb = e.defaults, nb;
        for (nb in Nb) Nb.hasOwnProperty(nb) && (y[nb] = (c && c.hasOwnProperty(nb) ? c : Nb)[nb]);
        var ra = document.createElement("div");
        ra.className = "CodeMirror" + (y.lineWrapping ? " CodeMirror-wrap" : "");
        ra.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
        g.appendChild ? g.appendChild(ra) : g(ra);
        var jb = ra.firstChild, ka = jb.firstChild, O = ra.lastChild, Da = O.firstChild, Ob = Da.firstChild,
            Aa = Ob.firstChild, Ab = Aa.firstChild, W = Aa.nextSibling.firstChild, db = W.firstChild,
            Ka = db.nextSibling, Pb = Ka.nextSibling, Ga = Pb.nextSibling;
        yc();
        Ja();
        Ya && (ka.style.width = "0px");
        Za || (W.draggable = !0);
        W.style.outline = "none";
        null != y.tabindex && (ka.tabIndex = y.tabindex);
        y.autofocus && va();
        y.gutter || y.lineNumbers || (Aa.style.display = "none");
        S && (jb.style.height = "1px", jb.style.position = "absolute");
        try {
            Mb("x")
        } catch (kb) {
            throw kb.message.match(/runtime/i) && (kb = Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")), kb;
        }
        var ob = new na, Kc = new na, Qb, oa, I = new da([new ma([new u("")])]), Ta, Ma;
        wc();
        var A = {
                from: {line: 0, ch: 0},
                to: {line: 0, ch: 0},
                inverted: !1
            }, Fa, gb, a, k = 0, n, N = !1, sa = !1, Ea, Bb, Ua, $b, pb, cc, fb, dc, Fb = 0, xa = 0, Pa = 0, Sc = 0, ub,
            vb = "", wb, Uc = {};
        T(function () {
            C(y.value || "");
            Ea = !1
        })();
        var Oa = new H;
        E(O, "mousedown", T(function (d) {
            function c(a) {
                var d = Xa(a, !0);
                if (d && !X(d,
                        e)) {
                    Ma || La();
                    e = d;
                    Va(h, d);
                    Ea = !1;
                    var g = sc();
                    if (d.line >= g.to || d.line < g.from) f = setTimeout(T(function () {
                        c(a)
                    }), 150)
                }
            }

            function g(a) {
                clearTimeout(f);
                var d = Xa(a);
                d && Va(h, d);
                s(a);
                va();
                Ea = !0;
                q();
                k()
            }

            uc(L(d, "shiftKey"));
            for (var b = d.target || d.srcElement; b != ra; b = b.parentNode) if (b.parentNode == Da && b != Ob) return;
            for (b = d.target || d.srcElement; b != ra; b = b.parentNode) if (b.parentNode == Ab) {
                if (y.onGutterClick) y.onGutterClick(ua, Z(Ab.childNodes, b) + xa, d);
                return s(d)
            }
            var h = Xa(d);
            switch (D(d)) {
                case 3:
                    ga && !w && Ac(d);
                    return;
                case 2:
                    h &&
                    Sa(h.line, h.ch, !0);
                    setTimeout(va, 20);
                    return
            }
            if (h) {
                Ma || La();
                b = +new Date;
                if (a && a.time > b - 400 && X(a.pos, h)) return s(d), setTimeout(va, 20), Ic(h.line);
                if (gb && gb.time > b - 400 && X(gb.pos, h)) return a = {time: b, pos: h}, s(d), vc(h);
                gb = {time: b, pos: h};
                var e = h, f;
                if (!y.dragDrop || !rb || y.readOnly || X(A.from, A.to) || ya(h, A.from) || ya(A.to, h)) {
                    s(d);
                    Sa(h.line, h.ch, !0);
                    var q = E(document, "mousemove", T(function (a) {
                        clearTimeout(f);
                        s(a);
                        ha || D(a) ? c(a) : g(a)
                    }), !0), k = E(document, "mouseup", T(g), !0)
                } else {
                    b = function (a) {
                        Za && (W.draggable = !1);
                        n = !1;
                        k();
                        t();
                        10 > Math.abs(d.clientX - a.clientX) + Math.abs(d.clientY - a.clientY) && (s(a), Sa(h.line, h.ch, !0), va())
                    };
                    Za && (W.draggable = !0);
                    var k = E(document, "mouseup", T(b), !0), t = E(O, "drop", T(b), !0);
                    n = !0;
                    W.dragDrop && W.dragDrop()
                }
            } else (d.target || d.srcElement) == O && s(d)
        }));
        E(O, "dblclick", T(function (d) {
            for (var c = d.target || d.srcElement; c != ra; c = c.parentNode) if (c.parentNode == Ab) return s(d);
            if (c = Xa(d)) a = {time: +new Date, pos: c}, s(d), vc(c)
        }));
        E(W, "selectstart", s);
        ga || E(O, "contextmenu", Ac);
        E(O, "scroll", function () {
            k = O.scrollTop;
            hb([]);
            y.fixedGutter && (Aa.style.left = O.scrollLeft + "px");
            if (y.onScroll) y.onScroll(ua)
        });
        E(window, "resize", function () {
            hb(!0)
        });
        E(ka, "keyup", T(function (a) {
            y.onKeyEvent && y.onKeyEvent(ua, Q(a)) || 16 == L(a, "keyCode") && (Fa = null)
        }));
        E(ka, "input", Hb);
        E(ka, "keydown", T(Ba));
        E(ka, "keypress", T(function (a) {
            Sb && Vb();
            if (!y.onKeyEvent || !y.onKeyEvent(ua, Q(a))) {
                var d = L(a, "keyCode"), c = L(a, "charCode");
                window.opera && d == Gc ? (Gc = null, s(a)) : (window.opera && !a.which || S) && F(a) || (d = String.fromCharCode(null == c ? d : c), y.electricChars &&
                oa.electricChars && y.smartIndent && !y.readOnly && -1 < oa.electricChars.indexOf(d) && setTimeout(T(function () {
                    qb(A.to.line, "smart")
                }), 75), z(a, d) || Hb())
            }
        }));
        E(ka, "focus", La);
        E(ka, "blur", R);
        if (y.dragDrop) {
            var Rc = function (a) {
                y.onDragEvent && y.onDragEvent(ua, Q(a)) || P(a)
            };
            E(W, "dragstart", m);
            E(O, "dragenter", Rc);
            E(O, "dragover", Rc);
            E(O, "drop", T(t))
        }
        E(O, "paste", function () {
            va();
            Hb()
        });
        E(ka, "paste", Hb);
        E(ka, "cut", T(function () {
            y.readOnly || la("")
        }));
        S && E(Da, "mouseup", function () {
            document.activeElement == ka && ka.blur();
            va()
        });
        var Qc;
        try {
            Qc = document.activeElement == ka
        } catch (ad) {
        }
        Qc || y.autofocus ? setTimeout(La, 20) : R();
        var ua = ra.CodeMirror = {
            getValue: function () {
                var a = [];
                I.iter(0, I.size, function (d) {
                    a.push(d.text)
                });
                return a.join("\n")
            }, setValue: T(C), getSelection: yb, replaceSelection: T(la), focus: function () {
                window.focus();
                va();
                La();
                Hb()
            }, setOption: function (a, d) {
                var c = y[a];
                y[a] = d;
                "mode" == a || "indentUnit" == a ? wc() : "readOnly" == a && "nocursor" == d ? (R(), ka.blur()) : "readOnly" != a || d ? "theme" == a ? yc() : "lineWrapping" == a && c != d ? T(xc)() : "tabSize" ==
                a ? hb(!0) : "keyMap" == a && Ja() : zb(!0);
                if ("lineNumbers" == a || "gutter" == a || "firstLineNumber" == a || "theme" == a) c = y.gutter || y.lineNumbers, Aa.style.display = c ? "" : "none", c ? fb = !0 : Ga.parentNode.style.marginLeft = 0, hb(!0)
            }, getOption: function (a) {
                return y[a]
            }, undo: T(function () {
                ja(Oa.done, Oa.undone)
            }), redo: T(function () {
                ja(Oa.undone, Oa.done)
            }), indentLine: T(function (a, c) {
                "string" != typeof c && (c = null == c ? y.smartIndent ? "smart" : "prev" : c ? "add" : "subtract");
                d(a) && qb(a, c)
            }), indentSelection: T(function (a) {
                if (X(A.from, A.to)) return qb(A.from.line,
                    a);
                for (var d = A.to.line - (A.to.ch ? 0 : 1), c = A.from.line; c <= d; ++c) qb(c, a)
            }), historySize: function () {
                return {undo: Oa.done.length, redo: Oa.undone.length}
            }, clearHistory: function () {
                Oa = new H
            }, matchBrackets: T(function () {
                Bc(!0)
            }), getTokenAt: T(function (a) {
                a = ta(a);
                return q(a.line).getTokenAt(oa, Ra(a.line), a.ch)
            }), getStateAfter: function (a) {
                a = Kb(null == a ? I.size - 1 : a);
                return Ra(a + 1)
            }, cursorCoords: function (a, d) {
                null == a && (a = A.inverted);
                return this.charCoords(a ? A.from : A.to, d)
            }, charCoords: function (a, d) {
                a = ta(a);
                if ("local" ==
                    d) return bb(a, !1);
                if ("div" == d) return bb(a, !0);
                var c = bb(a, !0), g = V(W);
                return {x: g.left + c.x, y: g.top + c.y, yBot: g.top + c.yBot}
            }, coordsChar: function (a) {
                var d = V(W);
                return kc(a.x - d.left, a.y - d.top)
            }, markText: T(lb), setBookmark: function (a) {
                a = ta(a);
                var d = new r(a.ch);
                q(a.line).addMark(d);
                return d
            }, findMarksAt: function (a) {
                a = ta(a);
                var d = [], c = q(a.line).marked;
                if (!c) return d;
                for (var g = 0, b = c.length; g < b; ++g) {
                    var h = c[g];
                    (null == h.from || h.from <= a.ch) && (null == h.to || h.to >= a.ch) && d.push(h.marker || h)
                }
                return d
            }, setMarker: T(function (a,
                                      d, c) {
                "number" == typeof a && (a = q(Kb(a)));
                a.gutterMarker = {text: d, style: c};
                fb = !0;
                return a
            }), clearMarker: T(function (a) {
                "number" == typeof a && (a = q(Kb(a)));
                a.gutterMarker = null;
                fb = !0
            }), setLineClass: T(function (a, d, c) {
                return eb(a, function (a) {
                    if (a.className != d || a.bgClassName != c) return a.className = d, a.bgClassName = c, !0
                })
            }), hideLine: T(function (a) {
                return Wa(a, !0)
            }), showLine: T(function (a) {
                return Wa(a, !1)
            }), onDeleteLine: function (a, c) {
                if ("number" == typeof a) {
                    if (!d(a)) return null;
                    a = q(a)
                }
                (a.handlers || (a.handlers = [])).push(c);
                return a
            }, lineInfo: function (a) {
                if ("number" == typeof a) {
                    if (!d(a)) return null;
                    var c = a;
                    a = q(a);
                    if (!a) return null
                } else if (c = M(a), null == c) return null;
                var g = a.gutterMarker;
                return {
                    line: c,
                    handle: a,
                    text: a.text,
                    markerText: g && g.text,
                    markerClass: g && g.style,
                    lineClass: a.className,
                    bgClass: a.bgClassName
                }
            }, addWidget: function (a, d, c, g, b) {
                a = bb(ta(a));
                var h = a.yBot, e = a.x;
                d.style.position = "absolute";
                Da.appendChild(d);
                if ("over" == g) h = a.y; else if ("near" == g) {
                    g = Math.max(O.offsetHeight, I.height * cb());
                    var f = Math.max(Da.clientWidth,
                        W.clientWidth) - W.offsetLeft;
                    a.yBot + d.offsetHeight > g && a.y > d.offsetHeight && (h = a.y - d.offsetHeight);
                    e + d.offsetWidth > f && (e = f - d.offsetWidth)
                }
                d.style.top = h + W.offsetTop + "px";
                d.style.left = d.style.right = "";
                "right" == b ? (e = Da.clientWidth - d.offsetWidth, d.style.right = "0px") : ("left" == b ? e = 0 : "middle" == b && (e = (Da.clientWidth - d.offsetWidth) / 2), d.style.left = e + W.offsetLeft + "px");
                c && rc(e, h, e + d.offsetWidth, h + d.offsetHeight)
            }, lineCount: function () {
                return I.size
            }, clipPos: ta, getCursor: function (a) {
                null == a && (a = A.inverted);
                a = a ?
                    A.from : A.to;
                return {line: a.line, ch: a.ch}
            }, somethingSelected: function () {
                return !X(A.from, A.to)
            }, setCursor: T(function (a, d, c) {
                null == d && "number" == typeof a.line ? Sa(a.line, a.ch, c) : Sa(a, d, c)
            }), setSelection: T(function (a, d, c) {
                (c ? Va : Ib)(ta(a), ta(d || a))
            }), getLine: function (a) {
                if (d(a)) return q(a).text
            }, getLineHandle: function (a) {
                if (d(a)) return q(a)
            }, setLine: T(function (a, c) {
                d(a) && Qa(c, {line: a, ch: 0}, {line: a, ch: q(a).text.length})
            }), removeLine: T(function (a) {
                d(a) && Qa("", {line: a, ch: 0}, ta({line: a + 1, ch: 0}))
            }), replaceRange: T(Qa),
            getRange: function (a, d) {
                return hc(ta(a), ta(d))
            }, triggerOnKeyDown: T(Ba), execCommand: function (a) {
                return aa[a](ua)
            }, moveH: T(function (a, d) {
                var c = 0 > a ? A.from : A.to;
                if (Fa || X(A.from, A.to)) c = Yb(a, d);
                Sa(c.line, c.ch, !0)
            }), deleteH: T(function (a, d) {
                X(A.from, A.to) ? 0 > a ? Qa("", Yb(a, d), A.to) : Qa("", A.from, Yb(a, d)) : Qa("", A.from, A.to);
                Bb = !0
            }), moveV: T(function (a, d) {
                var c = 0, g = bb(A.inverted ? A.from : A.to, !0);
                null != pc && (g.x = pc);
                "page" == d ? c = Math.min(O.clientHeight, window.innerHeight || document.documentElement.clientHeight) : "line" ==
                    d && (c = cb());
                c = kc(g.x, g.y + c * a + 2);
                "page" == d && (O.scrollTop += bb(c, !0).y - g.y);
                Sa(c.line, c.ch, !0);
                pc = g.x
            }), toggleOverwrite: function () {
                N ? (N = !1, Ka.className = Ka.className.replace(" CodeMirror-overwrite", "")) : (N = !0, Ka.className += " CodeMirror-overwrite")
            }, posFromIndex: function (a) {
                var d = 0, c;
                I.iter(0, I.size, function (g) {
                    g = g.text.length + 1;
                    if (g > a) return c = a, !0;
                    a -= g;
                    ++d
                });
                return ta({line: d, ch: c})
            }, indexFromPos: function (a) {
                if (0 > a.line || 0 > a.ch) return 0;
                var d = a.ch;
                I.iter(0, a.line, function (a) {
                    d += a.text.length + 1
                });
                return d
            },
            scrollTo: function (a, d) {
                null != a && (O.scrollLeft = a);
                null != d && (O.scrollTop = d);
                hb([])
            }, operation: function (a) {
                return T(a)()
            }, compoundChange: function (a) {
                return ib(a)
            }, refresh: function () {
                hb(!0);
                O.scrollHeight > k && (O.scrollTop = k)
            }, getInputField: function () {
                return ka
            }, getWrapperElement: function () {
                return ra
            }, getScrollerElement: function () {
                return O
            }, getGutterElement: function () {
                return Aa
            }
        }, Gc = null, Tc, Sb = !1, tb = "", pc = null;
        Lb.prototype.clear = T(function () {
            for (var a = Infinity, d = -Infinity, c = 0, g = this.set.length; c < g; ++c) {
                var b =
                    this.set[c], h = b.marked;
                if (h && b.parent) for (b = M(b), a = Math.min(a, b), d = Math.max(d, b), b = 0; b < h.length; ++b) h[b].marker == this && h.splice(b--, 1)
            }
            Infinity != a && Ua.push({from: a, to: d + 1})
        });
        Lb.prototype.find = function () {
            for (var a, d, c = 0, g = this.set.length; c < g; ++c) for (var b = this.set[c], h = b.marked, e = 0; e < h.length; ++e) {
                var f = h[e];
                if (f.marker == this && (null != f.from || null != f.to)) {
                    var q = M(b);
                    null != q && (null != f.from && (a = {line: q, ch: f.from}), null != f.to && (d = {
                        line: q,
                        ch: f.to
                    }))
                }
            }
            return {from: a, to: d}
        };
        var Vc = "CodeMirror-temp-" + Math.floor(16777215 *
            Math.random()).toString(16), Ec, Pc, Gb, Wc, Oc = 0, Fc = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<"
        }, Nc = 0, fc;
        for (fc in Ia) Ia.propertyIsEnumerable(fc) && !ua.propertyIsEnumerable(fc) && (ua[fc] = Ia[fc]);
        return ua
    }

    function f(g) {
        return "string" == typeof g ? wa[g] : g
    }

    function x(g, c, d, b, h) {
        function e(d) {
            d = f(d);
            var c = d[g];
            if (null != c && b(c)) return !0;
            if (d.nofallthrough) return h && h(), !0;
            d = d.fallthrough;
            if (null == d) return !1;
            if ("[object Array]" != Object.prototype.toString.call(d)) return e(d);
            for (var c = 0, l = d.length; c <
            l; ++c) if (e(d[c])) return !0;
            return !1
        }

        return c && e(c) ? !0 : e(d)
    }

    function b(g) {
        g = za[L(g, "keyCode")];
        return "Ctrl" == g || "Alt" == g || "Shift" == g || "Mod" == g
    }

    function l(g, c) {
        if (!0 === c) return c;
        if (g.copyState) return g.copyState(c);
        var d = {}, b;
        for (b in c) {
            var h = c[b];
            h instanceof Array && (h = h.concat([]));
            d[b] = h
        }
        return d
    }

    function p(g, c, d) {
        return g.startState ? g.startState(c, d) : !0
    }

    function m(g, c) {
        this.pos = this.start = 0;
        this.string = g;
        this.tabSize = c || 8
    }

    function v(g, c, d, b) {
        this.from = g;
        this.to = c;
        this.style = d;
        this.marker = b
    }

    function r(g) {
        this.to =
            this.from = g;
        this.line = null
    }

    function u(g, c) {
        this.styles = c || [g, null];
        this.text = g;
        this.height = 1;
        this.stateAfter = this.parent = this.hidden = this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null
    }

    function F(g, c, d, b) {
        for (var h = 0, e = 0, f = 0; e < c; h += 2) {
            var l = d[h], m = e + l.length;
            0 == f ? (m > g && b.push(l.slice(g - e, Math.min(l.length, c - e)), d[h + 1]), m >= g && (f = 1)) : 1 == f && (m > c ? b.push(l.slice(0, c - e), d[h + 1]) : b.push(l, d[h + 1]));
            e = m
        }
    }

    function ma(g) {
        this.lines = g;
        this.parent = null;
        for (var c = 0, d = g.length, b = 0; c <
        d; ++c) g[c].parent = this, b += g[c].height;
        this.height = b
    }

    function da(g) {
        this.children = g;
        for (var c = 0, d = 0, b = 0, h = g.length; b < h; ++b) {
            var e = g[b], c = c + e.chunkSize(), d = d + e.height;
            e.parent = this
        }
        this.size = c;
        this.height = d;
        this.parent = null
    }

    function M(g) {
        if (null == g.parent) return null;
        var c = g.parent;
        g = Z(c.lines, g);
        for (var d = c.parent; d; c = d, d = d.parent) for (var b = 0; d.children[b] != c; ++b) g += d.children[b].chunkSize();
        return g
    }

    function Y(g, c) {
        var d = 0;
        a:do {
            for (var b = 0, h = g.children.length; b < h; ++b) {
                var e = g.children[b], f = e.height;
                if (c < f) {
                    g = e;
                    continue a
                }
                c -= f;
                d += e.chunkSize()
            }
            return d
        } while (!g.lines);
        b = 0;
        for (h = g.lines.length; b < h; ++b) {
            e = g.lines[b].height;
            if (c < e) break;
            c -= e
        }
        return d + b
    }

    function fa(g, c) {
        var d = 0;
        a:do {
            for (var b = 0, h = g.children.length; b < h; ++b) {
                var e = g.children[b], f = e.chunkSize();
                if (c < f) {
                    g = e;
                    continue a
                }
                c -= f;
                d += e.height
            }
            return d
        } while (!g.lines);
        for (b = 0; b < c; ++b) d += g.lines[b].height;
        return d
    }

    function H() {
        this.time = 0;
        this.done = [];
        this.undone = [];
        this.compound = 0;
        this.closed = !1
    }

    function B() {
        P(this)
    }

    function Q(g) {
        g.stop || (g.stop =
            B);
        return g
    }

    function s(g) {
        g.preventDefault ? g.preventDefault() : g.returnValue = !1
    }

    function Ba(g) {
        g.stopPropagation ? g.stopPropagation() : g.cancelBubble = !0
    }

    function P(g) {
        s(g);
        Ba(g)
    }

    function D(g) {
        if (g.which) return g.which;
        if (g.button & 1) return 1;
        if (g.button & 2) return 3;
        if (g.button & 4) return 2
    }

    function L(g, c) {
        return g.override && g.override.hasOwnProperty(c) ? g.override[c] : g[c]
    }

    function E(g, c, d, b) {
        if ("function" == typeof g.addEventListener) {
            if (g.addEventListener(c, d, !1), b) return function () {
                g.removeEventListener(c,
                    d, !1)
            }
        } else {
            var h = function (c) {
                d(c || window.event)
            };
            g.attachEvent("on" + c, h);
            if (b) return function () {
                g.detachEvent("on" + c, h)
            }
        }
    }

    function na() {
        this.id = null
    }

    function R(g, c, d) {
        null == c && (c = g.search(/[^\s\u00a0]/), -1 == c && (c = g.length));
        for (var b = 0, h = 0; b < c; ++b) "\t" == g.charAt(b) ? h += d - h % d : ++h;
        return h
    }

    function V(g, c) {
        for (var d = g.ownerDocument.body, b = 0, h = 0, e = !1, f = g; f; f = f.offsetParent) {
            var l = f.offsetLeft, m = f.offsetTop;
            f == d ? (b += Math.abs(l), h += Math.abs(m)) : (b += l, h += m);
            if (l = c) l = f.currentStyle ? f.currentStyle : window.getComputedStyle(f,
                null), l = "fixed" == l.position;
            l && (e = !0)
        }
        d = c && !e ? null : d;
        for (f = g.parentNode; f != d; f = f.parentNode) null != f.scrollLeft && (b -= f.scrollLeft, h -= f.scrollTop);
        return {left: b, top: h}
    }

    function ca(g) {
        Ya ? (g.selectionStart = 0, g.selectionEnd = g.value.length) : g.select()
    }

    function X(g, c) {
        return g.line == c.line && g.ch == c.ch
    }

    function ya(g, c) {
        return g.line < c.line || g.line == c.line && g.ch < c.ch
    }

    function qa(g) {
        la.textContent = g;
        return la.innerHTML
    }

    function K(g, c) {
        if (!c) return 0;
        if (!g) return c.length;
        for (var d = g.length, b = c.length; 0 <= d &&
        0 <= b && g.charAt(d) == c.charAt(b); --d, --b) ;
        return b + 1
    }

    function Z(b, c) {
        if (b.indexOf) return b.indexOf(c);
        for (var d = 0, e = b.length; d < e; ++d) if (b[d] == c) return d;
        return -1
    }

    function Ha(b) {
        return /\w/.test(b) || b.toUpperCase() != b.toLowerCase()
    }

    e.defaults = {
        value: "",
        mode: null,
        theme: "default",
        indentUnit: 2,
        indentWithTabs: !1,
        smartIndent: !0,
        tabSize: 4,
        keyMap: "default",
        extraKeys: null,
        electricChars: !0,
        autoClearEmptyLines: !1,
        onKeyEvent: null,
        onDragEvent: null,
        lineWrapping: !1,
        lineNumbers: !1,
        gutter: !1,
        fixedGutter: !1,
        firstLineNumber: 1,
        readOnly: !1,
        dragDrop: !0,
        onChange: null,
        onCursorActivity: null,
        onGutterClick: null,
        onHighlightComplete: null,
        onUpdate: null,
        onFocus: null,
        onBlur: null,
        onScroll: null,
        matchBrackets: !1,
        workTime: 100,
        workDelay: 200,
        pollInterval: 100,
        undoDepth: 40,
        tabindex: null,
        autofocus: null
    };
    var Ya = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        w = Ya || /Mac/.test(navigator.platform);
    /Win/.test(navigator.platform);
    var z = e.modes = {}, ja = e.mimeModes = {};
    e.defineMode = function (b, c) {
        e.defaults.mode || "null" ==
        b || (e.defaults.mode = b);
        if (2 < arguments.length) {
            c.dependencies = [];
            for (var d = 2; d < arguments.length; ++d) c.dependencies.push(arguments[d])
        }
        z[b] = c
    };
    e.defineMIME = function (b, c) {
        ja[b] = c
    };
    e.resolveMode = function (b) {
        if ("string" == typeof b && ja.hasOwnProperty(b)) b = ja[b]; else if ("string" == typeof b && /^[\w\-]+\/[\w\-]+\+xml$/.test(b)) return e.resolveMode("application/xml");
        return "string" == typeof b ? {name: b} : b || {name: "null"}
    };
    e.getMode = function (b, c) {
        c = e.resolveMode(c);
        var d = z[c.name];
        return d ? d(b, c) : e.getMode(b, "text/plain")
    };
    e.listModes = function () {
        var b = [], c;
        for (c in z) z.propertyIsEnumerable(c) && b.push(c);
        return b
    };
    e.listMIMEs = function () {
        var b = [], c;
        for (c in ja) ja.propertyIsEnumerable(c) && b.push({mime: c, mode: ja[c]});
        return b
    };
    var Ia = e.extensions = {};
    e.defineExtension = function (b, c) {
        Ia[b] = c
    };
    var aa = e.commands = {
        selectAll: function (b) {
            b.setSelection({line: 0, ch: 0}, {line: b.lineCount() - 1})
        }, killLine: function (b) {
            var c = b.getCursor(!0), d = b.getCursor(!1), e = !X(c, d);
            e || b.getLine(c.line).length != c.ch ? b.replaceRange("", c, e ? d : {line: c.line}) :
                b.replaceRange("", c, {line: c.line + 1, ch: 0})
        }, deleteLine: function (b) {
            var c = b.getCursor().line;
            b.replaceRange("", {line: c, ch: 0}, {line: c})
        }, undo: function (b) {
            b.undo()
        }, redo: function (b) {
            b.redo()
        }, goDocStart: function (b) {
            b.setCursor(0, 0, !0)
        }, goDocEnd: function (b) {
            b.setSelection({line: b.lineCount() - 1}, null, !0)
        }, goLineStart: function (b) {
            b.setCursor(b.getCursor().line, 0, !0)
        }, goLineStartSmart: function (b) {
            var c = b.getCursor(), d = b.getLine(c.line), d = Math.max(0, d.search(/\S/));
            b.setCursor(c.line, c.ch <= d && c.ch ? 0 : d, !0)
        },
        goLineEnd: function (b) {
            b.setSelection({line: b.getCursor().line}, null, !0)
        }, goLineUp: function (b) {
            b.moveV(-1, "line")
        }, goLineDown: function (b) {
            b.moveV(1, "line")
        }, goPageUp: function (b) {
            b.moveV(-1, "page")
        }, goPageDown: function (b) {
            b.moveV(1, "page")
        }, goCharLeft: function (b) {
            b.moveH(-1, "char")
        }, goCharRight: function (b) {
            b.moveH(1, "char")
        }, goColumnLeft: function (b) {
            b.moveH(-1, "column")
        }, goColumnRight: function (b) {
            b.moveH(1, "column")
        }, goWordLeft: function (b) {
            b.moveH(-1, "word")
        }, goWordRight: function (b) {
            b.moveH(1, "word")
        },
        delCharLeft: function (b) {
            b.deleteH(-1, "char")
        }, delCharRight: function (b) {
            b.deleteH(1, "char")
        }, delWordLeft: function (b) {
            b.deleteH(-1, "word")
        }, delWordRight: function (b) {
            b.deleteH(1, "word")
        }, indentAuto: function (b) {
            b.indentSelection("smart")
        }, indentMore: function (b) {
            b.indentSelection("add")
        }, indentLess: function (b) {
            b.indentSelection("subtract")
        }, insertTab: function (b) {
            b.replaceSelection("\t", "end")
        }, defaultTab: function (b) {
            b.somethingSelected() ? b.indentSelection("add") : b.replaceSelection("\t", "end")
        }, transposeChars: function (b) {
            var c =
                b.getCursor(), d = b.getLine(c.line);
            0 < c.ch && c.ch < d.length - 1 && b.replaceRange(d.charAt(c.ch) + d.charAt(c.ch - 1), {
                line: c.line,
                ch: c.ch - 1
            }, {line: c.line, ch: c.ch + 1})
        }, newlineAndIndent: function (b) {
            b.replaceSelection("\n", "end");
            b.indentLine(b.getCursor().line)
        }, toggleOverwrite: function (b) {
            b.toggleOverwrite()
        }
    }, wa = e.keyMap = {};
    wa.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharRight",
        Backspace: "delCharLeft",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    };
    wa.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordLeft",
        "Ctrl-Delete": "delWordRight",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    };
    wa.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-Alt-Backspace": "delWordRight",
        "Alt-Delete": "delWordRight",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: ["basic", "emacsy"]
    };
    wa["default"] = w ? wa.macDefault : wa.pcDefault;
    wa.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageUp",
        "Shift-Ctrl-V": "goPageDown",
        "Ctrl-D": "delCharRight",
        "Ctrl-H": "delCharLeft",
        "Alt-D": "delWordRight",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };
    e.fromTextArea = function (b, c) {
        function d() {
            b.value = t.getValue()
        }

        c || (c = {});
        c.value = b.value;
        !c.tabindex && b.tabindex && (c.tabindex = b.tabindex);
        null == c.autofocus && null != b.getAttribute("autofocus") && (c.autofocus = !0);
        if (b.form) {
            var f = E(b.form, "submit", d, !0);
            if ("function" == typeof b.form.submit) {
                var h = function () {
                    d();
                    b.form.submit = l;
                    b.form.submit();
                    b.form.submit = h
                }, l = b.form.submit;
                b.form.submit =
                    h
            }
        }
        b.style.display = "none";
        var t = e(function (d) {
            b.parentNode.insertBefore(d, b.nextSibling)
        }, c);
        t.save = d;
        t.getTextArea = function () {
            return b
        };
        t.toTextArea = function () {
            d();
            b.parentNode.removeChild(t.getWrapperElement());
            b.style.display = "";
            b.form && (f(), "function" == typeof b.form.submit && (b.form.submit = l))
        };
        return t
    };
    e.copyState = l;
    e.startState = p;
    m.prototype = {
        eol: function () {
            return this.pos >= this.string.length
        }, sol: function () {
            return 0 == this.pos
        }, peek: function () {
            return this.string.charAt(this.pos)
        }, next: function () {
            if (this.pos <
                this.string.length) return this.string.charAt(this.pos++)
        }, eat: function (b) {
            var c = this.string.charAt(this.pos);
            if ("string" == typeof b ? c == b : c && (b.test ? b.test(c) : b(c))) return ++this.pos, c
        }, eatWhile: function (b) {
            for (var c = this.pos; this.eat(b);) ;
            return this.pos > c
        }, eatSpace: function () {
            for (var b = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
            return this.pos > b
        }, skipToEnd: function () {
            this.pos = this.string.length
        }, skipTo: function (b) {
            b = this.string.indexOf(b, this.pos);
            if (-1 < b) return this.pos =
                b, !0
        }, backUp: function (b) {
            this.pos -= b
        }, column: function () {
            return R(this.string, this.start, this.tabSize)
        }, indentation: function () {
            return R(this.string, null, this.tabSize)
        }, match: function (b, c, d) {
            if ("string" == typeof b) {
                var e = function (c) {
                    return d ? c.toLowerCase() : c
                };
                if (e(this.string).indexOf(e(b), this.pos) == this.pos) return !1 !== c && (this.pos += b.length), !0
            } else return (b = this.string.slice(this.pos).match(b)) && !1 !== c && (this.pos += b[0].length), b
        }, current: function () {
            return this.string.slice(this.start, this.pos)
        }
    };
    e.StringStream = m;
    v.prototype = {
        attach: function (b) {
            this.marker.set.push(b)
        }, detach: function (b) {
            b = Z(this.marker.set, b);
            -1 < b && this.marker.set.splice(b, 1)
        }, split: function (b, c) {
            return this.to <= b && null != this.to ? null : new v(this.from < b || null == this.from ? null : this.from - b + c, null == this.to ? null : this.to - b + c, this.style, this.marker)
        }, dup: function () {
            return new v(null, null, this.style, this.marker)
        }, clipTo: function (b, c, d, e, h) {
            b && e > this.from && (e < this.to || null == this.to) ? this.from = null : null != this.from && this.from >= c && (this.from =
                Math.max(e, this.from) + h);
            d && (c < this.to || null == this.to) && (c > this.from || null == this.from) ? this.to = null : null != this.to && this.to > c && (this.to = e < this.to ? this.to + h : c)
        }, isDead: function () {
            return null != this.from && null != this.to && this.from >= this.to
        }, sameSet: function (b) {
            return this.marker == b.marker
        }
    };
    r.prototype = {
        attach: function (b) {
            this.line = b
        }, detach: function (b) {
            this.line == b && (this.line = null)
        }, split: function (b, c) {
            if (b < this.from) return this.from = this.to = this.from - b + c, this
        }, isDead: function () {
            return this.from > this.to
        },
        clipTo: function (b, c, d, e, h) {
            (b || c < this.from) && (d || e > this.to) ? (this.from = 0, this.to = -1) : this.from > c && (this.from = this.to = Math.max(e, this.from) + h)
        }, sameSet: function (b) {
            return !1
        }, find: function () {
            return this.line && this.line.parent ? {line: M(this.line), ch: this.from} : null
        }, clear: function () {
            if (this.line) {
                var b = Z(this.line.marked, this);
                -1 != b && this.line.marked.splice(b, 1);
                this.line = null
            }
        }
    };
    u.inheritMarks = function (b, c) {
        var d = new u(b), e = c && c.marked;
        if (e) for (var h = 0; h < e.length; ++h) if (null == e[h].to && e[h].style) {
            var f =
                d.marked || (d.marked = []), t = e[h].dup();
            f.push(t);
            t.attach(d)
        }
        return d
    };
    u.prototype = {
        replace: function (b, c, d) {
            var e = [], h = this.marked, f = null == c ? this.text.length : c;
            F(0, b, this.styles, e);
            d && e.push(d, null);
            F(f, this.text.length, this.styles, e);
            this.styles = e;
            this.text = this.text.slice(0, b) + d + this.text.slice(f);
            this.stateAfter = null;
            if (h) for (d = d.length - (f - b), e = 0; e < h.length; ++e) {
                var t = h[e];
                t.clipTo(null == b, b || 0, null == c, f, d);
                t.isDead() && (t.detach(this), h.splice(e--, 1))
            }
        }, split: function (b, c) {
            var d = [c, null], e = this.marked;
            F(b, this.text.length, this.styles, d);
            d = new u(c + this.text.slice(b), d);
            if (e) for (var h = 0; h < e.length; ++h) {
                var f = e[h], t = f.split(b, c.length);
                t && (d.marked || (d.marked = []), d.marked.push(t), t.attach(d), t == f && e.splice(h--, 1))
            }
            return d
        }, append: function (b) {
            var c = this.text.length, d = b.marked, e = this.marked;
            this.text += b.text;
            F(0, b.text.length, b.styles, this.styles);
            if (e) for (b = 0; b < e.length; ++b) null == e[b].to && (e[b].to = c);
            if (d && d.length) a:for (e || (this.marked = e = []), b = 0; b < d.length; ++b) {
                var h = d[b];
                if (!h.from) for (var f = 0; f <
                e.length; ++f) {
                    var t = e[f];
                    if (t.to == c && t.sameSet(h)) {
                        t.to = null == h.to ? null : h.to + c;
                        t.isDead() && (t.detach(this), d.splice(b--, 1));
                        continue a
                    }
                }
                e.push(h);
                h.attach(this);
                h.from += c;
                null != h.to && (h.to += c)
            }
        }, fixMarkEnds: function (b) {
            var c = this.marked;
            b = b.marked;
            if (c) for (var d = 0; d < c.length; ++d) {
                var e = c[d], h = null == e.to;
                if (h && b) for (var f = 0; f < b.length; ++f) if (b[f].sameSet(e)) {
                    h = !1;
                    break
                }
                h && (e.to = this.text.length)
            }
        }, fixMarkStarts: function () {
            var b = this.marked;
            if (b) for (var c = 0; c < b.length; ++c) null == b[c].from && (b[c].from =
                0)
        }, addMark: function (b) {
            b.attach(this);
            null == this.marked && (this.marked = []);
            this.marked.push(b);
            this.marked.sort(function (c, d) {
                return (c.from || 0) - (d.from || 0)
            })
        }, highlight: function (b, c, d) {
            d = new m(this.text, d);
            var e = this.styles, h = 0, f = !1, t = e[0], l;
            for ("" == this.text && b.blankLine && b.blankLine(c); !d.eol();) {
                var p = b.token(d, c), r = this.text.slice(d.start, d.pos);
                d.start = d.pos;
                h && e[h - 1] == p ? e[h - 2] += r : r && (!f && (e[h + 1] != p || h && e[h - 2] != l) && (f = !0), e[h++] = r, e[h++] = p, l = t, t = e[h]);
                if (5E3 < d.pos) {
                    e[h++] = this.text.slice(d.pos);
                    e[h++] = null;
                    break
                }
            }
            e.length != h && (e.length = h, f = !0);
            h && e[h - 2] != l && (f = !0);
            return f || (5 > e.length && 10 > this.text.length ? null : !1)
        }, getTokenAt: function (b, c, d) {
            for (var e = new m(this.text); e.pos < d && !e.eol();) {
                e.start = e.pos;
                var h = b.token(e, c)
            }
            return {start: e.start, end: e.pos, string: e.current(), className: h || null, state: c}
        }, indentation: function (b) {
            return R(this.text, null, b)
        }, getHTML: function (b, c, d, e) {
            function h(d, c) {
                if (d) {
                    l && ha && " " == d.charAt(0) && (d = "\u00a0" + d.slice(1));
                    l = !1;
                    if (-1 == d.indexOf("\t")) {
                        m += d.length;
                        var e =
                            qa(d)
                    } else for (var e = "", h = 0; ;) {
                        var f = d.indexOf("\t", h);
                        if (-1 == f) {
                            e += qa(d.slice(h));
                            m += d.length - h;
                            break
                        } else {
                            m += f - h;
                            var q = b(m), e = e + (qa(d.slice(h, f)) + q.html);
                            m += q.width;
                            h = f + 1
                        }
                    }
                    c ? t.push('<span class="', c, '">', e, "</span>") : t.push(e)
                }
            }

            function f(d) {
                return d ? "cm-" + d.replace(/ +/g, " cm-") : null
            }

            var t = [], l = !0, m = 0, p = h;
            if (null != c) var r = 0, H = '<span id="' + d + '">', p = function (d, b) {
                var g = d.length;
                if (c >= r && c < r + g) {
                    c > r && (h(d.slice(0, c - r), b), e && t.push("<wbr>"));
                    t.push(H);
                    var f = c - r;
                    h(window.opera ? d.slice(f, f + 1) : d.slice(f),
                        b);
                    t.push("</span>");
                    window.opera && h(d.slice(f + 1), b);
                    c--;
                    r += g
                } else r += g, h(d, b), r == c && r == U ? t.push(H + " </span>") : r > c + 10 && /\s/.test(d) && (p = function () {
                })
            };
            d = this.styles;
            var u = this.text, B = this.marked, U = u.length;
            if (u || null != c) if (B && B.length) for (var s = function () {
                for (var d; F < B.length && ((d = B[F]).from == w || null == d.from);) null != d.style && J.push(d), ++F;
                v = F < B.length ? B[F].from : Infinity;
                for (d = 0; d < J.length; ++d) {
                    var c = J[d].to || Infinity;
                    c == w ? J.splice(d--, 1) : v = Math.min(c, v)
                }
            }, w = 0, u = 0, Q = "", v = B[0].from || 0, J = [], F = 0; w < U;) {
                v ==
                w && s();
                for (var z = Math.min(U, v); ;) {
                    if (Q) {
                        for (var x = w + Q.length, E = ga, D = 0; D < J.length; ++D) E = (E ? E + " " : "") + J[D].style;
                        p(x > z ? Q.slice(0, z - w) : Q, E);
                        if (x >= z) {
                            Q = Q.slice(z - w);
                            w = z;
                            break
                        }
                        w = x
                    }
                    Q = d[u++];
                    ga = f(d[u++])
                }
            } else for (s = u = 0; s < U; u += 2) {
                var Q = d[u], ga = d[u + 1], z = Q.length;
                s + z > U && (Q = Q.slice(0, U - s));
                s += z;
                p(Q, f(ga))
            } else p(" ");
            return t.join("")
        }, cleanUp: function () {
            this.parent = null;
            if (this.marked) for (var b = 0, c = this.marked.length; b < c; ++b) this.marked[b].detach(this)
        }
    };
    ma.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        remove: function (b, c, d) {
            for (var e = b, h = b + c; e < h; ++e) {
                var f = this.lines[e];
                this.height -= f.height;
                f.cleanUp();
                if (f.handlers) for (var t = 0; t < f.handlers.length; ++t) d.push(f.handlers[t])
            }
            this.lines.splice(b, c)
        }, collapse: function (b) {
            b.splice.apply(b, [b.length, 0].concat(this.lines))
        }, insertHeight: function (b, c, d) {
            this.height += d;
            ha ? this.lines = this.lines.slice(0, b).concat(c).concat(this.lines.slice(b)) : this.lines.splice.apply(this.lines, [b, 0].concat(c));
            b = 0;
            for (d = c.length; b < d; ++b) c[b].parent = this
        }, iterN: function (b,
                            c, d) {
            for (c = b + c; b < c; ++b) if (d(this.lines[b])) return !0
        }
    };
    da.prototype = {
        chunkSize: function () {
            return this.size
        }, remove: function (b, c, d) {
            this.size -= c;
            for (var e = 0; e < this.children.length; ++e) {
                var h = this.children[e], f = h.chunkSize();
                if (b < f) {
                    var t = Math.min(c, f - b), l = h.height;
                    h.remove(b, t, d);
                    this.height -= l - h.height;
                    f == t && (this.children.splice(e--, 1), h.parent = null);
                    if (0 == (c -= t)) break;
                    b = 0
                } else b -= f
            }
            25 > this.size - c && (b = [], this.collapse(b), this.children = [new ma(b)], this.children[0].parent = this)
        }, collapse: function (b) {
            for (var c =
                0, d = this.children.length; c < d; ++c) this.children[c].collapse(b)
        }, insert: function (b, c) {
            for (var d = 0, e = 0, h = c.length; e < h; ++e) d += c[e].height;
            this.insertHeight(b, c, d)
        }, insertHeight: function (b, c, d) {
            this.size += c.length;
            this.height += d;
            for (var e = 0, h = this.children.length; e < h; ++e) {
                var f = this.children[e], t = f.chunkSize();
                if (b <= t) {
                    f.insertHeight(b, c, d);
                    if (f.lines && 50 < f.lines.length) {
                        for (; 50 < f.lines.length;) b = f.lines.splice(f.lines.length - 25, 25), b = new ma(b), f.height -= b.height, this.children.splice(e + 1, 0, b), b.parent =
                            this;
                        this.maybeSpill()
                    }
                    break
                }
                b -= t
            }
        }, maybeSpill: function () {
            if (!(10 >= this.children.length)) {
                var b = this;
                do {
                    var c = b.children.splice(b.children.length - 5, 5), c = new da(c);
                    if (b.parent) {
                        b.size -= c.size;
                        b.height -= c.height;
                        var d = Z(b.parent.children, b);
                        b.parent.children.splice(d + 1, 0, c)
                    } else d = new da(b.children), d.parent = b, b.children = [d, c], b = d;
                    c.parent = b.parent
                } while (10 < b.children.length);
                b.parent.maybeSpill()
            }
        }, iter: function (b, c, d) {
            this.iterN(b, c - b, d)
        }, iterN: function (b, c, d) {
            for (var e = 0, h = this.children.length; e <
            h; ++e) {
                var f = this.children[e], t = f.chunkSize();
                if (b < t) {
                    t = Math.min(c, t - b);
                    if (f.iterN(b, t, d)) return !0;
                    if (0 == (c -= t)) break;
                    b = 0
                } else b -= t
            }
        }
    };
    H.prototype = {
        addChange: function (b, c, d) {
            this.undone.length = 0;
            var e = +new Date, h = this.done[this.done.length - 1], f = h && h[h.length - 1], t = e - this.time;
            if (this.compound && h && !this.closed) h.push({
                start: b,
                added: c,
                old: d
            }); else if (400 < t || !f || this.closed || f.start > b + d.length || f.start + f.added < b) this.done.push([{
                start: b,
                added: c,
                old: d
            }]), this.closed = !1; else {
                for (var h = Math.max(0, f.start -
                    b), t = Math.max(0, b + d.length - (f.start + f.added)), l = h; 0 < l; --l) f.old.unshift(d[l - 1]);
                for (l = t; 0 < l; --l) f.old.push(d[d.length - l]);
                h && (f.start = b);
                f.added += c - (d.length - h - t)
            }
            this.time = e
        }, startCompound: function () {
            this.compound++ || (this.closed = !0)
        }, endCompound: function () {
            --this.compound || (this.closed = !0)
        }
    };
    e.e_stop = P;
    e.e_preventDefault = s;
    e.e_stopPropagation = Ba;
    e.connect = E;
    na.prototype = {
        set: function (b, c) {
            clearTimeout(this.id);
            this.id = setTimeout(c, b)
        }
    };
    var U = e.Pass = {
            toString: function () {
                return "CodeMirror.Pass"
            }
        },
        ga = /gecko\/\d{7}/i.test(navigator.userAgent), ha = /MSIE \d/.test(navigator.userAgent),
        J = /MSIE [1-8]\b/.test(navigator.userAgent), Db = ha && 5 == document.documentMode,
        Za = /WebKit\//.test(navigator.userAgent), Eb = /Chrome\//.test(navigator.userAgent),
        ea = /Apple Computer/.test(navigator.vendor), S = /KHTML\//.test(navigator.userAgent), rb = function () {
            if (J) return !1;
            var b = document.createElement("div");
            return "draggable" in b || "dragDrop" in b
        }();
    (function () {
        var b = document.createElement("textarea");
        b.value = "foo\nbar";
        return -1 <
        b.value.indexOf("\r") ? "\r\n" : "\n"
    })();
    var $a = /^$/;
    ga ? $a = /$'/ : ea ? $a = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/ : Eb && ($a = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
    null != document.documentElement.getBoundingClientRect && (V = function (b, c) {
        try {
            var d = b.getBoundingClientRect(), d = {top: d.top, left: d.left}
        } catch (e) {
            d = {top: 0, left: 0}
        }
        if (!c) if (null == window.pageYOffset) {
            var h = document.documentElement || document.body.parentNode;
            null == h.scrollTop && (h = document.body);
            d.top += h.scrollTop;
            d.left += h.scrollLeft
        } else d.top += window.pageYOffset, d.left += window.pageXOffset;
        return d
    });
    var la = document.createElement("pre");
    "\na" == qa("a") ? qa = function (b) {
        la.textContent = b;
        return la.innerHTML.slice(1)
    } : "\t" != qa("\t") && (qa = function (b) {
        la.innerHTML = "";
        la.appendChild(document.createTextNode(b));
        return la.innerHTML
    });
    e.htmlEscape = qa;
    var ab = 3 != "\n\nb".split(/\n/).length ? function (b) {
            for (var c = 0, d, e = []; -1 < (d = b.indexOf("\n", c));) e.push(b.slice(c, "\r" == b.charAt(d - 1) ? d - 1 : d)), c = d + 1;
            e.push(b.slice(c));
            return e
        } :
        function (b) {
            return b.split(/\r?\n/)
        };
    e.splitLines = ab;
    var Ca = window.getSelection ? function (b) {
        try {
            return b.selectionStart != b.selectionEnd
        } catch (c) {
            return !1
        }
    } : function (b) {
        try {
            var c = b.ownerDocument.selection.createRange()
        } catch (d) {
        }
        return c && c.parentElement() == b ? 0 != c.compareEndPoints("StartToEnd", c) : !1
    };
    e.defineMode("null", function () {
        return {
            token: function (b) {
                b.skipToEnd()
            }
        }
    });
    e.defineMIME("text/plain", "null");
    var za = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        127: "Delete",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63276: "PageUp",
        63277: "PageDown",
        63275: "End",
        63273: "Home",
        63234: "Left",
        63232: "Up",
        63235: "Right",
        63233: "Down",
        63302: "Insert",
        63272: "Delete"
    };
    e.keyNames = za;
    (function () {
        for (var b = 0; 10 > b; b++) za[b + 48] = String(b);
        for (b =
                 65; 90 >= b; b++) za[b] = String.fromCharCode(b);
        for (b = 1; 12 >= b; b++) za[b + 111] = za[b + 63235] = "F" + b
    })();
    return e
}();
CodeMirror.defineMode("javascript", function (e, f) {
    function x(b, e) {
        for (var f = !1, l; null != (l = b.next());) {
            if (l == e && !f) return !1;
            f = !f && "\\" == l
        }
        return f
    }

    function b(b, e, f) {
        z = b;
        ja = f;
        return e
    }

    function l(e, f) {
        var l = e.next();
        if ('"' == l || "'" == l) return l = p(l), f.tokenize = l, l(e, f);
        if (/[\[\]{}\(\),;\:\.]/.test(l)) return b(l);
        if ("0" == l && e.eat(/x/i)) return e.eatWhile(/[\da-f]/i), b("number", "number");
        if (/\d/.test(l) || "-" == l && e.eat(/\d/)) return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), b("number", "number");
        if ("/" == l) {
            if (e.eat("*")) return l =
                m, f.tokenize = l, l(e, f);
            if (e.eat("/")) return e.skipToEnd(), b("comment", "comment");
            if (f.reAllowed) return x(e, "/"), e.eatWhile(/[gimy]/), b("regexp", "string-2");
            e.eatWhile(w);
            return b("operator", null, e.current())
        }
        if ("#" == l) return e.skipToEnd(), b("error", "error");
        if (w.test(l)) return e.eatWhile(w), b("operator", null, e.current());
        e.eatWhile(/[\w\$_]/);
        var l = e.current(), r = Ya.propertyIsEnumerable(l) && Ya[l];
        return r && f.kwAllowed ? b(r.type, r.style, l) : b("variable", "variable", l)
    }

    function p(e) {
        return function (f, m) {
            x(f,
                e) || (m.tokenize = l);
            return b("string", "string")
        }
    }

    function m(e, f) {
        for (var m = !1, p; p = e.next();) {
            if ("/" == p && m) {
                f.tokenize = l;
                break
            }
            m = "*" == p
        }
        return b("comment", "comment")
    }

    function v(b, e, f, l, m, p) {
        this.indented = b;
        this.column = e;
        this.type = f;
        this.prev = m;
        this.info = p;
        null != l && (this.align = l)
    }

    function r() {
        for (var b = arguments.length - 1; 0 <= b; b--) aa.cc.push(arguments[b])
    }

    function u() {
        r.apply(null, arguments);
        return !0
    }

    function F(b) {
        var e = aa.state;
        if (e.context) {
            aa.marked = "def";
            for (var f = e.localVars; f; f = f.next) if (f.name ==
                b) return;
            e.localVars = {name: b, next: e.localVars}
        }
    }

    function ma() {
        aa.state.context || (aa.state.localVars = wa);
        aa.state.context = {prev: aa.state.context, vars: aa.state.localVars}
    }

    function da() {
        aa.state.localVars = aa.state.context.vars;
        aa.state.context = aa.state.context.prev
    }

    function M(b, e) {
        var f = function () {
            var f = aa.state;
            f.lexical = new v(f.indented, aa.stream.column(), b, null, f.lexical, e)
        };
        f.lex = !0;
        return f
    }

    function Y() {
        var b = aa.state;
        b.lexical.prev && (")" == b.lexical.type && (b.indented = b.lexical.indented), b.lexical =
            b.lexical.prev)
    }

    function fa(b) {
        return function (e) {
            return e == b ? u() : ";" == b ? r() : u(arguments.callee)
        }
    }

    function H(b) {
        return "var" == b ? u(M("vardef"), na, fa(";"), Y) : "keyword a" == b ? u(M("form"), B, H, Y) : "keyword b" == b ? u(M("form"), H, Y) : "{" == b ? u(M("}"), E, Y) : ";" == b ? u() : "function" == b ? u(qa) : "for" == b ? u(M("form"), fa("("), M(")"), V, fa(")"), Y, H, Y) : "variable" == b ? u(M("stat"), Ba) : "switch" == b ? u(M("form"), B, M("}", "switch"), fa("{"), E, Y, Y) : "case" == b ? u(B, fa(":")) : "default" == b ? u(fa(":")) : "catch" == b ? u(M("form"), ma, fa("("), K, fa(")"),
            H, Y, da) : r(M("stat"), B, fa(";"), Y)
    }

    function B(b) {
        return Ia.hasOwnProperty(b) ? u(s) : "function" == b ? u(qa) : "keyword c" == b ? u(Q) : "(" == b ? u(M(")"), Q, fa(")"), Y, s) : "operator" == b ? u(B) : "[" == b ? u(M("]"), L(B, "]"), Y, s) : "{" == b ? u(M("}"), L(D, "}"), Y, s) : u()
    }

    function Q(b) {
        return b.match(/[;\}\)\],]/) ? r() : r(B)
    }

    function s(b, e) {
        if ("operator" == b && /\+\+|--/.test(e)) return u(s);
        if ("operator" == b || ":" == b) return u(B);
        if (";" != b) {
            if ("(" == b) return u(M(")"), L(B, ")"), Y, s);
            if ("." == b) return u(P, s);
            if ("[" == b) return u(M("]"), B, fa("]"), Y, s)
        }
    }

    function Ba(b) {
        return ":" == b ? u(Y, H) : r(s, fa(";"), Y)
    }

    function P(b) {
        if ("variable" == b) return aa.marked = "property", u()
    }

    function D(b) {
        "variable" == b && (aa.marked = "property");
        if (Ia.hasOwnProperty(b)) return u(fa(":"), B)
    }

    function L(b, e) {
        function f(l) {
            return "," == l ? u(b, f) : l == e ? u() : u(fa(e))
        }

        return function (l) {
            return l == e ? u() : r(b, f)
        }
    }

    function E(b) {
        return "}" == b ? u() : r(H, E)
    }

    function na(b, e) {
        return "variable" == b ? (F(e), u(R)) : u()
    }

    function R(b, e) {
        if ("=" == e) return u(B, R);
        if ("," == b) return u(na)
    }

    function V(b) {
        return "var" ==
        b ? u(na, X) : ";" == b ? r(X) : "variable" == b ? u(ca) : r(X)
    }

    function ca(b, e) {
        return "in" == e ? u(B) : u(s, X)
    }

    function X(b, e) {
        return ";" == b ? u(ya) : "in" == e ? u(B) : u(B, fa(";"), ya)
    }

    function ya(b) {
        ")" != b && u(B)
    }

    function qa(b, e) {
        if ("variable" == b) return F(e), u(qa);
        if ("(" == b) return u(M(")"), ma, L(K, ")"), Y, H, da)
    }

    function K(b, e) {
        if ("variable" == b) return F(e), u()
    }

    var Z = e.indentUnit, Ha = f.json, Ya = function () {
        function b(e) {
            return {type: e, style: "keyword"}
        }

        var e = b("keyword a"), f = b("keyword b"), l = b("keyword c"), m = b("operator"), p = {
            type: "atom",
            style: "atom"
        };
        return {
            "if": e,
            "while": e,
            "with": e,
            "else": f,
            "do": f,
            "try": f,
            "finally": f,
            "return": l,
            "break": l,
            "continue": l,
            "new": l,
            "delete": l,
            "throw": l,
            "var": b("var"),
            "const": b("var"),
            let: b("var"),
            extern: b("var"),
            "function": b("function"),
            "catch": b("catch"),
            "for": b("for"),
            "switch": b("switch"),
            "case": b("case"),
            "default": b("default"),
            "in": m,
            "typeof": m,
            "instanceof": m,
            "true": p,
            "false": p,
            "null": p,
            undefined: p,
            NaN: p,
            Infinity: p
        }
    }(), w = /[+\-*&%=<>!?|]/, z, ja, Ia = {atom: !0, number: !0, variable: !0, string: !0, regexp: !0}, aa =
        {state: null, column: null, marked: null, cc: null}, wa = {name: "this", next: {name: "arguments"}};
    Y.lex = !0;
    return {
        startState: function (b) {
            return {
                tokenize: l,
                reAllowed: !0,
                kwAllowed: !0,
                cc: [],
                lexical: new v((b || 0) - Z, 0, "block", !1),
                localVars: f.localVars,
                context: f.localVars && {vars: f.localVars},
                indented: 0
            }
        }, token: function (b, e) {
            b.sol() && (e.lexical.hasOwnProperty("align") || (e.lexical.align = !1), e.indented = b.indentation());
            if (b.eatSpace()) return null;
            var f = e.tokenize(b, e);
            if ("comment" == z) return f;
            e.reAllowed = !("operator" !=
                z && "keyword c" != z && !z.match(/^[\[{}\(,;:]$/));
            e.kwAllowed = "." != z;
            a:{
                var l = z, m = ja, p = e.cc;
                aa.state = e;
                aa.stream = b;
                aa.marked = null;
                aa.cc = p;
                for (e.lexical.hasOwnProperty("align") || (e.lexical.align = !0); ;) if ((p.length ? p.pop() : Ha ? B : H)(l, m)) {
                    for (; p.length && p[p.length - 1].lex;) p.pop()();
                    if (aa.marked) {
                        f = aa.marked;
                        break a
                    }
                    if (l = "variable" == l) b:{
                        for (l = e.localVars; l; l = l.next) if (l.name == m) {
                            l = !0;
                            break b
                        }
                        l = void 0
                    }
                    if (l) {
                        f = "variable-2";
                        break a
                    }
                    break a
                }
            }
            return f
        }, indent: function (b, e) {
            if (b.tokenize != l) return 0;
            var f = e && e.charAt(0),
                m = b.lexical;
            "stat" == m.type && "}" == f && (m = m.prev);
            var p = m.type, r = f == p;
            return "vardef" == p ? m.indented + 4 : "form" == p && "{" == f ? m.indented : "stat" == p || "form" == p ? m.indented + Z : "switch" != m.info || r ? m.align ? m.column + (r ? 0 : 1) : m.indented + (r ? 0 : Z) : m.indented + (/^(?:case|default)\b/.test(e) ? Z : 2 * Z)
        }, electricChars: ":{}"
    }
});
CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("application/json", {name: "javascript", json: !0});
(function () {
    var e = function (f, x) {
        var b = e.resolve(f, x || "/"), l = e.modules[b];
        if (!l) throw Error("Failed to resolve module " + f + ", tried " + b);
        return (b = e.cache[b]) ? b.exports : l()
    };
    e.paths = [];
    e.modules = {};
    e.cache = {};
    e.extensions = [".js", ".coffee", ".json"];
    e._core = {assert: !0, events: !0, fs: !0, path: !0, vm: !0};
    e.resolve = function () {
        return function (f, x) {
            function b(b) {
                b = p.normalize(b);
                if (e.modules[b]) return b;
                for (var f = 0; f < e.extensions.length; f++) {
                    var l = e.extensions[f];
                    if (e.modules[b + l]) return b + l
                }
            }

            function l(f) {
                f = f.replace(/\/+$/,
                    "");
                var l = p.normalize(f + "/package.json");
                if (e.modules[l]) {
                    var l = e.modules[l](), m = l.browserify;
                    if ("object" === typeof m && m.main) {
                        if (l = b(p.resolve(f, m.main))) return l
                    } else if ("string" === typeof m) {
                        if (l = b(p.resolve(f, m))) return l
                    } else if (l.main && (l = b(p.resolve(f, l.main)))) return l
                }
                return b(f + "/index")
            }

            x || (x = "/");
            if (e._core[f]) return f;
            var p = e.modules.path(), m = (x = p.resolve("/", x)) || "/";
            if (f.match(/^(?:\.\.?\/|\/)/)) {
                var v = b(p.resolve(m, f)) || l(p.resolve(m, f));
                if (v) return v
            }
            if (m = function (e, f) {
                    var m;
                    m = "/" ===
                    f ? [""] : p.normalize(f).split("/");
                    for (var v = [], x = m.length - 1; 0 <= x; x--) if ("node_modules" !== m[x]) {
                        var M = m.slice(0, x + 1).join("/") + "/node_modules";
                        v.push(M)
                    }
                    for (m = 0; m < v.length; m++) {
                        x = v[m];
                        if (M = b(x + "/" + e)) return M;
                        if (x = l(x + "/" + e)) return x
                    }
                    if (M = b(e)) return M
                }(f, m)) return m;
            throw Error("Cannot find module '" + f + "'");
        }
    }();
    e.alias = function (f, x) {
        var b = e.modules.path(), l = null;
        try {
            l = e.resolve(f + "/package.json", "/")
        } catch (p) {
            l = e.resolve(f, "/")
        }
        for (var b = b.dirname(l), l = (Object.keys || function (b) {
            var e = [], f;
            for (f in b) e.push(f);
            return e
        })(e.modules), m = 0; m < l.length; m++) {
            var v = l[m];
            v.slice(0, b.length + 1) === b + "/" ? (v = v.slice(b.length), e.modules[x + v] = e.modules[b + v]) : v === b && (e.modules[x] = e.modules[b])
        }
    };
    (function () {
        var f = {}, x = "undefined" !== typeof window ? window : {}, b = !1;
        e.define = function (l, p) {
            !b && e.modules.__browserify_process && (f = e.modules.__browserify_process(), b = !0);
            var m = e._core[l] ? "" : e.modules.path().dirname(l), v = function (b) {
                var f = e(b, m);
                (b = e.cache[e.resolve(b, m)]) && null === b.parent && (b.parent = r);
                return f
            };
            v.resolve = function (b) {
                return e.resolve(b,
                    m)
            };
            v.modules = e.modules;
            v.define = e.define;
            v.cache = e.cache;
            var r = {id: l, filename: l, exports: {}, loaded: !1, parent: null};
            e.modules[l] = function () {
                e.cache[l] = r;
                p.call(r.exports, v, r, r.exports, m, l, f, x);
                r.loaded = !0;
                return r.exports
            }
        }
    })();
    e.define("path", function (e, x, b, l, p, m, v) {
        function r(b, e) {
            for (var f = [], l = 0; l < b.length; l++) e(b[l], l, b) && f.push(b[l]);
            return f
        }

        function u(b, e) {
            for (var f = 0, l = b.length; 0 <= l; l--) {
                var m = b[l];
                "." == m ? b.splice(l, 1) : ".." === m ? (b.splice(l, 1), f++) : f && (b.splice(l, 1), f--)
            }
            if (e) for (; f--; f) b.unshift("..");
            return b
        }

        var F = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;
        b.resolve = function () {
            for (var b = "", e = !1, f = arguments.length; -1 <= f && !e; f--) {
                var l = 0 <= f ? arguments[f] : m.cwd();
                "string" === typeof l && l && (b = l + "/" + b, e = "/" === l.charAt(0))
            }
            b = u(r(b.split("/"), function (b) {
                return !!b
            }), !e).join("/");
            return (e ? "/" : "") + b || "."
        };
        b.normalize = function (b) {
            var e = "/" === b.charAt(0), f = "/" === b.slice(-1);
            (b = u(r(b.split("/"), function (b) {
                return !!b
            }), !e).join("/")) || e || (b = ".");
            b && f && (b += "/");
            return (e ? "/" : "") + b
        };
        b.join = function () {
            var e = Array.prototype.slice.call(arguments,
                0);
            return b.normalize(r(e, function (b, e) {
                return b && "string" === typeof b
            }).join("/"))
        };
        b.dirname = function (b) {
            return (b = F.exec(b)[1] || "") ? 1 === b.length ? b : b.substring(0, b.length - 1) : "."
        };
        b.basename = function (b, e) {
            var f = F.exec(b)[2] || "";
            e && f.substr(-1 * e.length) === e && (f = f.substr(0, f.length - e.length));
            return f
        };
        b.extname = function (b) {
            return F.exec(b)[3] || ""
        };
        b.relative = function (e, f) {
            function l(b) {
                for (var e = 0; e < b.length && "" === b[e]; e++) ;
                for (var f = b.length - 1; 0 <= f && "" === b[f]; f--) ;
                return e > f ? [] : b.slice(e, f - e + 1)
            }

            e =
                b.resolve(e).substr(1);
            f = b.resolve(f).substr(1);
            for (var m = l(e.split("/")), p = l(f.split("/")), r = Math.min(m.length, p.length), B = r, u = 0; u < r; u++) if (m[u] !== p[u]) {
                B = u;
                break
            }
            r = [];
            for (u = B; u < m.length; u++) r.push("..");
            r = r.concat(p.slice(B));
            return r.join("/")
        }
    });
    e.define("__browserify_process", function (e, x, b, l, p, m, v) {
        m = x.exports = {};
        m.nextTick = function () {
            if ("undefined" !== typeof window && window.setImmediate) return function (b) {
                return window.setImmediate(b)
            };
            if ("undefined" !== typeof window && window.postMessage && window.addEventListener) {
                var b =
                    [];
                window.addEventListener("message", function (e) {
                    e.source === window && "browserify-tick" === e.data && (e.stopPropagation(), 0 < b.length && b.shift()())
                }, !0);
                return function (e) {
                    b.push(e);
                    window.postMessage("browserify-tick", "*")
                }
            }
            return function (b) {
                setTimeout(b, 0)
            }
        }();
        m.title = "browser";
        m.browser = !0;
        m.env = {};
        m.argv = [];
        m.binding = function (b) {
            if ("evals" === b) return e("vm");
            throw Error("No such module. (Possibly not yet loaded)");
        };
        (function () {
            var b = "/", l;
            m.cwd = function () {
                return b
            };
            m.chdir = function (m) {
                l || (l = e("path"));
                b = l.resolve(m, b)
            }
        })()
    });
    e.define("/package.json", function (e, x, b, l, p, m, v) {
        x.exports = {main: "escodegen.js"}
    });
    e.define("/escodegen.js", function (e, x, b, l, p, m, v) {
        (function () {
            function l(d) {
                var b = d.length, c = [], e;
                for (e = 0; e < b; e += 1) c[e] = d.charAt(e);
                return c
            }

            function m(d, b) {
                var c = "";
                for (b |= 0; 0 < b; b >>>= 1, d += d) b & 1 && (c += d);
                return c
            }

            function p(d, b, c, e) {
                function g(d) {
                    var b, c;
                    if (wa(d)) for (b = 0, c = d.length; b < c; ++b) g(d[b]); else d instanceof p ? f.push(d) : "string" === typeof d && d && f.push(d)
                }

                var f = [];
                g(e);
                this.children = f
            }

            function x(d) {
                return /[\r\n]/g.test(d)
            }

            function da(d) {
                d = d.charAt(d.length - 1);
                return "\r" === d || "\n" === d
            }

            function M(d) {
                var b = {}, c, e;
                for (c in d) d.hasOwnProperty(c) && (e = d[c], b[c] = "object" === typeof e && null !== e ? M(e) : e);
                return b
            }

            function Y(d, b) {
                function c(d) {
                    return "object" === typeof d && d instanceof Object && !(d instanceof RegExp)
                }

                var e, g;
                for (e in b) b.hasOwnProperty(e) && (g = b[e], c(g) ? c(d[e]) ? Y(d[e], g) : d[e] = Y({}, g) : d[e] = g);
                return d
            }

            function fa(d) {
                var b, c, e, g, f;
                if (d !== d) throw Error("Numeric literal whose value is NaN");
                if (0 > d || 0 === d && 0 > 1 / d) throw Error("Numeric literal whose value is negative");
                if (d === 1 / 0) return ha ? "null" : J ? "1e400" : "1e+400";
                b = "" + d;
                if (!J || 3 > b.length) return b;
                c = b.indexOf(".");
                ha || "0" !== b.charAt(0) || 1 !== c || (c = 0, b = b.slice(1));
                e = b;
                b = b.replace("e+", "e");
                g = 0;
                0 < (f = e.indexOf("e")) && (g = +e.slice(f + 1), e = e.slice(0, f));
                0 <= c && (g -= e.length - c - 1, e = +(e.slice(0, c) + e.slice(c + 1)) + "");
                for (f = 0; "0" === e.charAt(e.length + f - 1);) --f;
                0 !== f && (g -= f, e = e.slice(0, f));
                0 !== g && (e += "e" + g);
                (e.length < b.length || Db && 1E12 < d && Math.floor(d) === d && (e = "0x" + d.toString(16)).length < b.length) && +e === d && (b = e);
                return b
            }

            function H(d) {
                var b,
                    c, e, g, f;
                g = d;
                "undefined" === typeof g[0] && (g = l(g));
                f = "double" === Za ? '"' : "'";
                b = 0;
                for (c = g.length; b < c; b += 1) if (e = g[b], "'" === e) {
                    f = '"';
                    break
                } else if ('"' === e) {
                    f = "'";
                    break
                } else "\\" === e && (b += 1);
                return f + d + f
            }

            function B(d) {
                var b = "", c, e, g, f = 0, m = 0;
                "undefined" === typeof d[0] && (d = l(d));
                c = 0;
                for (e = d.length; c < e; c += 1) {
                    g = d[c];
                    if ("'" === g) f += 1; else if ('"' === g) m += 1; else if ("/" === g && ha) b += "\\"; else if (0 <= "\\\n\r\u2028\u2029".indexOf(g)) {
                        var p = "\\";
                        switch (g) {
                            case "\\":
                                p += "\\";
                                break;
                            case "\n":
                                p += "n";
                                break;
                            case "\r":
                                p += "r";
                                break;
                            case "\u2028":
                                p += "u2028";
                                break;
                            case "\u2029":
                                p += "u2029";
                                break;
                            default:
                                throw Error("Incorrectly classified character");
                        }
                        b += p;
                        continue
                    } else if (ha && " " > g || !(ha || Eb || " " <= g && "~" >= g)) {
                        var p = d[c + 1], H = g.charCodeAt(0), B = H.toString(16), s = "\\";
                        switch (g) {
                            case "\b":
                                s += "b";
                                break;
                            case "\f":
                                s += "f";
                                break;
                            case "\t":
                                s += "t";
                                break;
                            default:
                                s = ha || 255 < H ? s + ("u" + "0000".slice(B.length) + B) : "\x00" === g && 0 > "0123456789".indexOf(p) ? s + "0" : "\v" === g ? s + "v" : s + ("x" + "00".slice(B.length) + B)
                        }
                        b += s;
                        continue
                    }
                    b += g
                }
                f = !("double" === Za || "auto" ===
                    Za && m < f);
                d = b;
                b = f ? "'" : '"';
                "undefined" === typeof d[0] && (d = l(d));
                c = 0;
                for (e = d.length; c < e; c += 1) {
                    g = d[c];
                    if ("'" === g && f || '"' === g && !f) b += "\\";
                    b += g
                }
                return b + (f ? "'" : '"')
            }

            function Q(b) {
                return 0 <= "\t\v\f \u00a0".indexOf(b) || 5760 <= b.charCodeAt(0) && 0 <= "\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(b)
            }

            function s(b) {
                return 0 <= "\n\r\u2028\u2029".indexOf(b)
            }

            function Ba(b) {
                return "$" === b || "_" === b || "\\" === b || "a" <= b && "z" >= b || "A" <= b && "Z" >= b || "0" <= b && "9" >= b ||
                    128 <= b.charCodeAt(0) && Ia.NonAsciiIdentifierPart.test(b)
            }

            function P(b, c) {
                if (null == c) {
                    if (b instanceof aa) return b;
                    c = {}
                }
                return null == c.loc ? new aa(null, null, g, b) : new aa(c.loc.start.line, c.loc.start.column, !0 === g ? c.loc.source || null : g, b)
            }

            function D(b, c) {
                var e = P(b).toString(), g = P(c).toString(), e = e.charAt(e.length - 1), g = g.charAt(0);
                return ("+" === e || "-" === e) && e === g || Ba(e) && Ba(g) ? [b, " ", c] : Q(e) || s(e) || Q(g) || s(g) ? [b, c] : [b, S, c]
            }

            function L(b) {
                return [U, b]
            }

            function E(b) {
                var c;
                c = U;
                U += ga;
                b = b.call(this, U);
                U = c;
                return b
            }

            function na(b, c) {
                if ("Line" === b.type) return da(b.value) ? "//" + b.value : "//" + b.value + "\n";
                if (Ca.format.indent.adjustMultilineComment && /[\n\r]/.test(b.value)) {
                    var e = c, g, f, l, m, p, r;
                    g = ("/*" + b.value + "*/").split(/\r\n|[\r\n]/);
                    r = Number.MAX_VALUE;
                    f = 1;
                    for (l = g.length; f < l; f += 1) {
                        m = g[f];
                        for (p = 0; p < m.length && Q(m[p]);) p += 1;
                        r > p && (r = p)
                    }
                    "undefined" !== typeof e ? (m = U, "*" === g[1][r] && (e += " "), U = e) : (r & 1 && --r, m = U);
                    f = 1;
                    for (l = g.length; f < l; f += 1) g[f] = P(L(g[f].slice(r))).join("");
                    U = m;
                    return g.join("\n")
                }
                return "/*" + b.value + "*/"
            }

            function R(b,
                       c) {
                var e, g, f, l, p;
                if (b.leadingComments && 0 < b.leadingComments.length) {
                    l = c;
                    f = b.leadingComments[0];
                    c = [];
                    la && b.type === w.Program && 0 === b.body.length && c.push("\n");
                    c.push(na(f));
                    da(P(c).toString()) || c.push("\n");
                    e = 1;
                    for (g = b.leadingComments.length; e < g; e += 1) f = b.leadingComments[e], f = [na(f)], da(P(f).toString()) || f.push("\n"), c.push([U, f]);
                    c.push([U, l])
                }
                if (b.trailingComments) {
                    l = !da(P(c).toString());
                    e = P([U, c, ga]).toString();
                    for (g = e.length - 1; 0 <= g && !s(e.charAt(g)); --g) ;
                    p = m(" ", e.length - 1 - g);
                    e = 0;
                    for (g = b.trailingComments.length; e <
                    g; e += 1) f = b.trailingComments[e], l ? (c = 0 === e ? [c, ga] : [c, p], c.push(na(f, p))) : c = [c, L(na(f))], e === g - 1 || da(P(c).toString()) || (c = [c, "\n"])
                }
                return c
            }

            function V(b, c, e) {
                return c < e ? ["(", b, ")"] : b
            }

            function ca(b, c, e) {
                var g, f;
                f = !Ca.comment || !b.leadingComments;
                if (b.type === w.BlockStatement && f) return [S, Z(b, {functionBody: e})];
                if (b.type === w.EmptyStatement && f) return ";";
                E(function () {
                    g = [ea, L(Z(b, {semicolonOptional: c, functionBody: e}))]
                });
                return g
            }

            function X(b, c) {
                var e = da(P(c).toString());
                return b.type !== w.BlockStatement ||
                Ca.comment && b.leadingComments || e ? e ? [c, U] : [c, ea, U] : [c, S]
            }

            function ya(b, c) {
                var e, g;
                g = b[Ca.verbatim].split(/\r\n|\n/);
                for (e = 1; e < g.length; e++) g[e] = ea + U + g[e];
                g = V(g, z.Sequence, c.precedence);
                return P(g, b)
            }

            function qa(b) {
                var c, e, g;
                c = ["("];
                e = 0;
                for (g = b.params.length; e < g; e += 1) c.push(b.params[e].name), e + 1 < g && c.push("," + S);
                c.push(")");
                b.expression ? (c.push(S), b = K(b.body, {
                    precedence: z.Assignment,
                    allowIn: !0,
                    allowCall: !0
                }), "{" === b.toString().charAt(0) && (b = ["(", b, ")"]), c.push(b)) : c.push(ca(b.body, !1, !0));
                return c
            }

            function K(b, c) {
                var e, g, f, l, m, p, r, H, s, u;
                g = c.precedence;
                s = c.allowIn;
                u = c.allowCall;
                f = b.type || c.type;
                if (Ca.verbatim && b.hasOwnProperty(Ca.verbatim)) return ya(b, c);
                switch (f) {
                    case w.SequenceExpression:
                        e = [];
                        s |= z.Sequence < g;
                        l = 0;
                        for (m = b.expressions.length; l < m; l += 1) e.push(K(b.expressions[l], {
                            precedence: z.Assignment,
                            allowIn: s,
                            allowCall: !0
                        })), l + 1 < m && e.push("," + S);
                        e = V(e, z.Sequence, g);
                        break;
                    case w.AssignmentExpression:
                        s |= z.Assignment < g;
                        e = V([K(b.left, {
                            precedence: z.Call,
                            allowIn: s,
                            allowCall: !0
                        }), S + b.operator + S, K(b.right,
                            {precedence: z.Assignment, allowIn: s, allowCall: !0})], z.Assignment, g);
                        break;
                    case w.ConditionalExpression:
                        s |= z.Conditional < g;
                        e = V([K(b.test, {
                            precedence: z.LogicalOR,
                            allowIn: s,
                            allowCall: !0
                        }), S + "?" + S, K(b.consequent, {
                            precedence: z.Assignment,
                            allowIn: s,
                            allowCall: !0
                        }), S + ":" + S, K(b.alternate, {
                            precedence: z.Assignment,
                            allowIn: s,
                            allowCall: !0
                        })], z.Conditional, g);
                        break;
                    case w.LogicalExpression:
                    case w.BinaryExpression:
                        f = ja[b.operator];
                        s |= f < g;
                        e = D(K(b.left, {precedence: f, allowIn: s, allowCall: !0}), b.operator);
                        r = K(b.right,
                            {precedence: f + 1, allowIn: s, allowCall: !0});
                        "/" === b.operator && "/" === r.toString().charAt(0) ? e.push(" ", r) : e = D(e, r);
                        e = "in" !== b.operator || s ? V(e, f, g) : ["(", e, ")"];
                        break;
                    case w.CallExpression:
                        e = [K(b.callee, {
                            precedence: z.Call,
                            allowIn: !0,
                            allowCall: !0,
                            allowUnparenthesizedNew: !1
                        })];
                        e.push("(");
                        l = 0;
                        for (m = b.arguments.length; l < m; l += 1) e.push(K(b.arguments[l], {
                            precedence: z.Assignment,
                            allowIn: !0,
                            allowCall: !0
                        })), l + 1 < m && e.push("," + S);
                        e.push(")");
                        e = u ? V(e, z.Call, g) : ["(", e, ")"];
                        break;
                    case w.NewExpression:
                        m = b.arguments.length;
                        s = void 0 === c.allowUnparenthesizedNew || c.allowUnparenthesizedNew;
                        e = D("new", K(b.callee, {
                            precedence: z.New,
                            allowIn: !0,
                            allowCall: !1,
                            allowUnparenthesizedNew: s && !rb && 0 === m
                        }));
                        if (!s || rb || 0 < m) {
                            e.push("(");
                            for (l = 0; l < m; l += 1) e.push(K(b.arguments[l], {
                                precedence: z.Assignment,
                                allowIn: !0,
                                allowCall: !0
                            })), l + 1 < m && e.push("," + S);
                            e.push(")")
                        }
                        e = V(e, z.New, g);
                        break;
                    case w.MemberExpression:
                        e = [K(b.object, {precedence: z.Call, allowIn: !0, allowCall: u, allowUnparenthesizedNew: !1})];
                        b.computed ? e.push("[", K(b.property, {
                            precedence: z.Sequence,
                            allowIn: !0, allowCall: u
                        }), "]") : (b.object.type === w.Literal && "number" === typeof b.object.value && 0 > e.indexOf(".") && (/[eExX]/.test(e) || 2 <= e.length && "0" === e[0] || e.push(".")), e.push("." + b.property.name));
                        e = V(e, z.Member, g);
                        break;
                    case w.UnaryExpression:
                        r = K(b.argument, {precedence: z.Unary, allowIn: !0, allowCall: !0});
                        "" === S ? e = D(b.operator, r) : (e = [b.operator], 2 < b.operator.length ? e = D(e, r) : (s = P(e).toString(), s = s.charAt(s.length - 1), f = r.toString().charAt(0), ("+" === s || "-" === s) && s === f || Ba(s) && Ba(f) ? e.push(" ", r) : e.push(r)));
                        e = V(e, z.Unary, g);
                        break;
                    case w.YieldExpression:
                        e = b.delegate ? "yield*" : "yield";
                        b.argument && (e = D(e, K(b.argument, {precedence: z.Assignment, allowIn: !0, allowCall: !0})));
                        break;
                    case w.UpdateExpression:
                        e = b.prefix ? V([b.operator, K(b.argument, {
                            precedence: z.Unary,
                            allowIn: !0,
                            allowCall: !0
                        })], z.Unary, g) : V([K(b.argument, {
                            precedence: z.Postfix,
                            allowIn: !0,
                            allowCall: !0
                        }), b.operator], z.Postfix, g);
                        break;
                    case w.FunctionExpression:
                        e = "function";
                        e = b.id ? e + (" " + b.id.name) : e + S;
                        e = [e, qa(b)];
                        break;
                    case w.ArrayPattern:
                    case w.ArrayExpression:
                        if (!b.elements.length) {
                            e =
                                "[]";
                            break
                        }
                        H = 1 < b.elements.length;
                        e = ["[", H ? ea : ""];
                        E(function (c) {
                            l = 0;
                            for (m = b.elements.length; l < m; l += 1) b.elements[l] ? e.push(H ? c : "", K(b.elements[l], {
                                precedence: z.Assignment,
                                allowIn: !0,
                                allowCall: !0
                            })) : (H && e.push(c), l + 1 === m && e.push(",")), l + 1 < m && e.push("," + (H ? ea : S))
                        });
                        H && !da(P(e).toString()) && e.push(ea);
                        e.push(H ? U : "", "]");
                        break;
                    case w.Property:
                        "get" === b.kind || "set" === b.kind ? e = [b.kind + " ", K(b.key, {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        }), qa(b.value)] : b.shorthand ? e = K(b.key, {
                            precedence: z.Sequence, allowIn: !0,
                            allowCall: !0
                        }) : b.method ? (e = [], b.value.generator && e.push("*"), e.push(K(b.key, {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        }), qa(b.value))) : e = [K(b.key, {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        }), ":" + S, K(b.value, {precedence: z.Assignment, allowIn: !0, allowCall: !0})];
                        break;
                    case w.ObjectExpression:
                        if (!b.properties.length) {
                            e = "{}";
                            break
                        }
                        H = 1 < b.properties.length;
                        E(function (c) {
                            r = K(b.properties[0], {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0,
                                type: w.Property
                            })
                        });
                        if (!H && !x(P(r).toString())) {
                            e = ["{", S, r, S,
                                "}"];
                            break
                        }
                        E(function (c) {
                            e = ["{", ea, c, r];
                            if (H) for (e.push("," + ea), l = 1, m = b.properties.length; l < m; l += 1) e.push(c, K(b.properties[l], {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0,
                                type: w.Property
                            })), l + 1 < m && e.push("," + ea)
                        });
                        da(P(e).toString()) || e.push(ea);
                        e.push(U, "}");
                        break;
                    case w.ObjectPattern:
                        if (!b.properties.length) {
                            e = "{}";
                            break
                        }
                        H = !1;
                        if (1 === b.properties.length) g = b.properties[0], g.value.type !== w.Identifier && (H = !0); else for (l = 0, m = b.properties.length; l < m; l += 1) if (g = b.properties[l], !g.shorthand) {
                            H = !0;
                            break
                        }
                        e =
                            ["{", H ? ea : ""];
                        E(function (c) {
                            l = 0;
                            for (m = b.properties.length; l < m; l += 1) e.push(H ? c : "", K(b.properties[l], {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            })), l + 1 < m && e.push("," + (H ? ea : S))
                        });
                        H && !da(P(e).toString()) && e.push(ea);
                        e.push(H ? U : "", "}");
                        break;
                    case w.ThisExpression:
                        e = "this";
                        break;
                    case w.Identifier:
                        e = b.name;
                        break;
                    case w.Literal:
                        if (b.hasOwnProperty("raw") && za) try {
                            if (p = za(b.raw).body[0].expression, p.type === w.Literal && p.value === b.value) {
                                e = b.raw;
                                break
                            }
                        } catch (Q) {
                        }
                        if (null === b.value) {
                            e = "null";
                            break
                        }
                        if ("string" === typeof b.value) {
                            e = B(b.value);
                            break
                        }
                        if ("number" === typeof b.value) {
                            e = fa(b.value);
                            break
                        }
                        e = b.value.toString();
                        break;
                    case w.ComprehensionExpression:
                        e = ["[", K(b.body, {precedence: z.Assignment, allowIn: !0, allowCall: !0})];
                        if (b.blocks) for (l = 0, m = b.blocks.length; l < m; l += 1) r = K(b.blocks[l], {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        }), e = D(e, r);
                        b.filter && (e = D(e, "if" + S), r = K(b.filter, {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        }), e = Ca.moz.parenthesizedComprehensionBlock ? D(e, ["(", r, ")"]) : D(e, r));
                        e.push("]");
                        break;
                    case w.ComprehensionBlock:
                        r = b.left.type === w.VariableDeclaration ? [b.left.kind + " ", Z(b.left.declarations[0], {allowIn: !1})] : K(b.left, {
                            precedence: z.Call,
                            allowIn: !0,
                            allowCall: !0
                        });
                        r = D(r, b.of ? "of" : "in");
                        r = D(r, K(b.right, {precedence: z.Sequence, allowIn: !0, allowCall: !0}));
                        e = Ca.moz.parenthesizedComprehensionBlock ? ["for" + S + "(", r, ")"] : D("for" + S, r);
                        break;
                    default:
                        throw Error("Unknown expression type: " + b.type);
                }
                return P(e, b)
            }

            function Z(b, c) {
                var e, g, f, l, m, p, r, s, B;
                m = !0;
                B = ";";
                r = p = !1;
                c && (m = void 0 === c.allowIn || c.allowIn,
                $a || !0 !== c.semicolonOptional || (B = ""), p = c.functionBody, r = c.directiveContext);
                switch (b.type) {
                    case w.BlockStatement:
                        f = ["{", ea];
                        E(function () {
                            e = 0;
                            for (g = b.body.length; e < g; e += 1) s = L(Z(b.body[e], {
                                semicolonOptional: e === g - 1,
                                directiveContext: p
                            })), f.push(s), da(P(s).toString()) || f.push(ea)
                        });
                        f.push([U, "}"]);
                        break;
                    case w.BreakStatement:
                        f = b.label ? "break " + b.label.name + B : "break" + B;
                        break;
                    case w.ContinueStatement:
                        f = b.label ? "continue " + b.label.name + B : "continue" + B;
                        break;
                    case w.DirectiveStatement:
                        f = b.raw ? b.raw + B : H(b.directive) +
                            B;
                        break;
                    case w.DoWhileStatement:
                        f = D("do", ca(b.body));
                        f = X(b.body, f);
                        f = D(f, ["while" + S + "(", K(b.test, {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        }), ")" + B]);
                        break;
                    case w.CatchClause:
                        E(function () {
                            f = ["catch" + S + "(", K(b.param, {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            }), ")"]
                        });
                        f.push(ca(b.body));
                        break;
                    case w.DebuggerStatement:
                        f = "debugger" + B;
                        break;
                    case w.EmptyStatement:
                        f = ";";
                        break;
                    case w.ExpressionStatement:
                        f = [K(b.expression, {precedence: z.Sequence, allowIn: !0, allowCall: !0})];
                        "{" === f.toString().charAt(0) ||
                        "function" === f.toString().slice(0, 8) && 0 <= " (".indexOf(f.toString().charAt(8)) || ab && r && b.expression.type === w.Literal && "string" === typeof b.expression.value ? f = ["(", f, ")" + B] : f.push(B);
                        break;
                    case w.VariableDeclarator:
                        f = b.init ? [K(b.id, {
                            precedence: z.Assignment,
                            allowIn: m,
                            allowCall: !0
                        }) + S + "=" + S, K(b.init, {precedence: z.Assignment, allowIn: m, allowCall: !0})] : b.id.name;
                        break;
                    case w.VariableDeclaration:
                        f = [b.kind];
                        1 === b.declarations.length && b.declarations[0].init && b.declarations[0].init.type === w.FunctionExpression ?
                            f.push(" ", Z(b.declarations[0], {allowIn: m})) : E(function () {
                                l = b.declarations[0];
                                Ca.comment && l.leadingComments ? f.push("\n", L(Z(l, {allowIn: m}))) : f.push(" ", Z(l, {allowIn: m}));
                                e = 1;
                                for (g = b.declarations.length; e < g; e += 1) l = b.declarations[e], Ca.comment && l.leadingComments ? f.push("," + ea, L(Z(l, {allowIn: m}))) : f.push("," + S, Z(l, {allowIn: m}))
                            });
                        f.push(B);
                        break;
                    case w.ThrowStatement:
                        f = [D("throw", K(b.argument, {precedence: z.Sequence, allowIn: !0, allowCall: !0})), B];
                        break;
                    case w.TryStatement:
                        f = ["try", ca(b.block)];
                        f = X(b.block,
                            f);
                        if (b.handlers) for (e = 0, g = b.handlers.length; e < g; e += 1) {
                            if (f = D(f, Z(b.handlers[e])), b.finalizer || e + 1 !== g) f = X(b.handlers[e].body, f)
                        } else for (b.handler && (f = D(f, Z(b.handler)), b.finalizer || 0 < b.guardedHandlers.length) && (f = X(b.handler.body, f)), e = 0, g = b.guardedHandlers.length; e < g; e += 1) if (f = D(f, Z(b.guardedHandlers[e])), b.finalizer || e + 1 !== g) f = X(b.guardedHandlers[e].body, f);
                        b.finalizer && (f = D(f, ["finally", ca(b.finalizer)]));
                        break;
                    case w.SwitchStatement:
                        E(function () {
                            f = ["switch" + S + "(", K(b.discriminant, {
                                precedence: z.Sequence,
                                allowIn: !0, allowCall: !0
                            }), ")" + S + "{" + ea]
                        });
                        if (b.cases) for (e = 0, g = b.cases.length; e < g; e += 1) s = L(Z(b.cases[e], {semicolonOptional: e === g - 1})), f.push(s), da(P(s).toString()) || f.push(ea);
                        f.push([U, "}"]);
                        break;
                    case w.SwitchCase:
                        E(function () {
                            f = b.test ? [D("case", K(b.test, {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            })), ":"] : ["default:"];
                            e = 0;
                            (g = b.consequent.length) && b.consequent[0].type === w.BlockStatement && (s = ca(b.consequent[0]), f.push(s), e = 1);
                            for (e === g || da(P(f).toString()) || f.push(ea); e < g; e += 1) s = L(Z(b.consequent[e],
                                {semicolonOptional: e === g - 1 && "" === B})), f.push(s), e + 1 === g || da(P(s).toString()) || f.push(ea)
                        });
                        break;
                    case w.IfStatement:
                        E(function () {
                            f = ["if" + S + "(", K(b.test, {precedence: z.Sequence, allowIn: !0, allowCall: !0}), ")"]
                        });
                        b.alternate ? (f.push(ca(b.consequent)), f = X(b.consequent, f), f = b.alternate.type === w.IfStatement ? D(f, ["else ", Z(b.alternate, {semicolonOptional: "" === B})]) : D(f, D("else", ca(b.alternate, "" === B)))) : f.push(ca(b.consequent, "" === B));
                        break;
                    case w.ForStatement:
                        E(function () {
                            f = ["for" + S + "("];
                            b.init ? b.init.type ===
                            w.VariableDeclaration ? f.push(Z(b.init, {allowIn: !1})) : f.push(K(b.init, {
                                precedence: z.Sequence,
                                allowIn: !1,
                                allowCall: !0
                            }), ";") : f.push(";");
                            b.test ? f.push(S, K(b.test, {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            }), ";") : f.push(";");
                            b.update ? f.push(S, K(b.update, {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            }), ")") : f.push(")")
                        });
                        f.push(ca(b.body, "" === B));
                        break;
                    case w.ForInStatement:
                        f = ["for" + S + "("];
                        E(function () {
                            b.left.type === w.VariableDeclaration ? E(function () {
                                f.push(b.left.kind + " ", Z(b.left.declarations[0],
                                    {allowIn: !1}))
                            }) : f.push(K(b.left, {precedence: z.Call, allowIn: !0, allowCall: !0}));
                            f = D(f, "in");
                            f = [D(f, K(b.right, {precedence: z.Sequence, allowIn: !0, allowCall: !0})), ")"]
                        });
                        f.push(ca(b.body, "" === B));
                        break;
                    case w.LabeledStatement:
                        f = [b.label.name + ":", ca(b.body, "" === B)];
                        break;
                    case w.Program:
                        g = b.body.length;
                        f = [la && 0 < g ? "\n" : ""];
                        for (e = 0; e < g; e += 1) s = L(Z(b.body[e], {
                            semicolonOptional: !la && e === g - 1,
                            directiveContext: !0
                        })), f.push(s), e + 1 < g && !da(P(s).toString()) && f.push(ea);
                        break;
                    case w.FunctionDeclaration:
                        f = [(b.generator && !Ca.moz.starlessGenerator ? "function* " : "function ") + b.id.name, qa(b)];
                        break;
                    case w.ReturnStatement:
                        f = b.argument ? [D("return", K(b.argument, {
                            precedence: z.Sequence,
                            allowIn: !0,
                            allowCall: !0
                        })), B] : ["return" + B];
                        break;
                    case w.WhileStatement:
                        E(function () {
                            f = ["while" + S + "(", K(b.test, {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            }), ")"]
                        });
                        f.push(ca(b.body, "" === B));
                        break;
                    case w.WithStatement:
                        E(function () {
                            f = ["with" + S + "(", K(b.object, {
                                precedence: z.Sequence,
                                allowIn: !0,
                                allowCall: !0
                            }), ")"]
                        });
                        f.push(ca(b.body, "" === B));
                        break;
                    default:
                        throw Error("Unknown statement type: " + b.type);
                }
                Ca.comment && (f = R(b, f));
                s = P(f).toString();
                b.type !== w.Program || la || "" !== ea || "\n" !== s.charAt(s.length - 1) || (f = P(f).replaceRight(/\s+$/, ""));
                return P(f, b)
            }

            function Ha(b, c) {
                var e, g, f, l;
                g = b.length;
                for (f = 0; g;) e = g >>> 1, l = f + e, c(b[l]) ? g = e : (f = l + 1, g -= e + 1);
                return f
            }

            function Ya(b, c) {
                var e;
                e = Ha(c, function (c) {
                    return c.range[0] > b.range[0]
                });
                b.extendedRange = [b.range[0], b.range[1]];
                e !== c.length && (b.extendedRange[1] = c[e].range[0]);
                --e;
                0 <= e && (e < c.length ? b.extendedRange[0] =
                    c[e].range[1] : (void 0).length && (b.extendedRange[1] = c[c.length - 1].range[0]));
                return b
            }

            var w, z, ja, Ia, aa, wa, U, ga, ha, J, Db, Za, Eb, ea, S, rb, $a, la, ab, Ca, za, g, c;
            c = e("estraverse").traverse;
            w = {
                AssignmentExpression: "AssignmentExpression",
                ArrayExpression: "ArrayExpression",
                ArrayPattern: "ArrayPattern",
                BlockStatement: "BlockStatement",
                BinaryExpression: "BinaryExpression",
                BreakStatement: "BreakStatement",
                CallExpression: "CallExpression",
                CatchClause: "CatchClause",
                ComprehensionBlock: "ComprehensionBlock",
                ComprehensionExpression: "ComprehensionExpression",
                ConditionalExpression: "ConditionalExpression",
                ContinueStatement: "ContinueStatement",
                DirectiveStatement: "DirectiveStatement",
                DoWhileStatement: "DoWhileStatement",
                DebuggerStatement: "DebuggerStatement",
                EmptyStatement: "EmptyStatement",
                ExpressionStatement: "ExpressionStatement",
                ForStatement: "ForStatement",
                ForInStatement: "ForInStatement",
                FunctionDeclaration: "FunctionDeclaration",
                FunctionExpression: "FunctionExpression",
                Identifier: "Identifier",
                IfStatement: "IfStatement",
                Literal: "Literal",
                LabeledStatement: "LabeledStatement",
                LogicalExpression: "LogicalExpression",
                MemberExpression: "MemberExpression",
                NewExpression: "NewExpression",
                ObjectExpression: "ObjectExpression",
                ObjectPattern: "ObjectPattern",
                Program: "Program",
                Property: "Property",
                ReturnStatement: "ReturnStatement",
                SequenceExpression: "SequenceExpression",
                SwitchStatement: "SwitchStatement",
                SwitchCase: "SwitchCase",
                ThisExpression: "ThisExpression",
                ThrowStatement: "ThrowStatement",
                TryStatement: "TryStatement",
                UnaryExpression: "UnaryExpression",
                UpdateExpression: "UpdateExpression",
                VariableDeclaration: "VariableDeclaration",
                VariableDeclarator: "VariableDeclarator",
                WhileStatement: "WhileStatement",
                WithStatement: "WithStatement",
                YieldExpression: "YieldExpression"
            };
            z = {
                Sequence: 0,
                Assignment: 1,
                Conditional: 2,
                LogicalOR: 3,
                LogicalAND: 4,
                BitwiseOR: 5,
                BitwiseXOR: 6,
                BitwiseAND: 7,
                Equality: 8,
                Relational: 9,
                BitwiseSHIFT: 10,
                Additive: 11,
                Multiplicative: 12,
                Unary: 13,
                Postfix: 14,
                Call: 15,
                New: 16,
                Member: 17,
                Primary: 18
            };
            ja = {
                "||": z.LogicalOR,
                "&&": z.LogicalAND,
                "|": z.BitwiseOR,
                "^": z.BitwiseXOR,
                "&": z.BitwiseAND,
                "==": z.Equality,
                "!=": z.Equality,
                "===": z.Equality,
                "!==": z.Equality,
                is: z.Equality,
                isnt: z.Equality,
                "<": z.Relational,
                ">": z.Relational,
                "<=": z.Relational,
                ">=": z.Relational,
                "in": z.Relational,
                "instanceof": z.Relational,
                "<<": z.BitwiseSHIFT,
                ">>": z.BitwiseSHIFT,
                ">>>": z.BitwiseSHIFT,
                "+": z.Additive,
                "-": z.Additive,
                "*": z.Multiplicative,
                "%": z.Multiplicative,
                "/": z.Multiplicative
            };
            Ia = {NonAsciiIdentifierPart: RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]")};
            (wa = Array.isArray) || (wa = function (b) {
                return "[object Array]" === Object.prototype.toString.call(b)
            });
            p.prototype.toString = function () {
                var b = "", c, e, g;
                c = 0;
                for (e = this.children.length; c < e; ++c) g = this.children[c], b = g instanceof p ? b + g.toString() : b + g;
                return b
            };
            p.prototype.replaceRight = function (b, c) {
                var e = this.children[this.children.length - 1];
                e instanceof p ? e.replaceRight(b, c) : "string" === typeof e ? this.children[this.children.length - 1] = e.replace(b, c) : this.children.push("".replace(b, c));
                return this
            };
            p.prototype.join =
                function (b) {
                    var c, e, g;
                    g = [];
                    e = this.children.length;
                    if (0 < e) {
                        c = 0;
                        for (--e; c < e; ++c) g.push(this.children[c], b);
                        g.push(this.children[e]);
                        this.children = g
                    }
                    return this
                };
            b.version = "0.0.16-dev";
            b.generate = function (c, l) {
                var h = {
                    indent: null,
                    base: null,
                    parse: null,
                    comment: !1,
                    format: {
                        indent: {style: "    ", base: 0, adjustMultilineComment: !1},
                        json: !1,
                        renumber: !1,
                        hexadecimal: !1,
                        quotes: "single",
                        escapeless: !1,
                        compact: !1,
                        parentheses: !0,
                        semicolons: !0,
                        safeConcatenation: !1
                    },
                    moz: {starlessGenerator: !1, parenthesizedComprehensionBlock: !1},
                    sourceMap: null,
                    sourceMapRoot: null,
                    sourceMapWithCode: !1,
                    directive: !1,
                    verbatim: null
                };
                null != l ? ("string" === typeof l.indent && (h.format.indent.style = l.indent), "number" === typeof l.base && (h.format.indent.base = l.base), l = Y(h, l), ga = l.format.indent.style, U = "string" === typeof l.base ? l.base : m(ga, l.format.indent.base)) : (l = h, ga = l.format.indent.style, U = m(ga, l.format.indent.base));
                ha = l.format.json;
                J = l.format.renumber;
                Db = ha ? !1 : l.format.hexadecimal;
                Za = ha ? "double" : l.format.quotes;
                Eb = l.format.escapeless;
                l.format.compact ?
                    ea = S = ga = U = "" : (ea = "\n", S = " ");
                rb = l.format.parentheses;
                $a = l.format.semicolons;
                la = l.format.safeConcatenation;
                ab = l.directive;
                za = ha ? null : l.parse;
                g = l.sourceMap;
                Ca = l;
                aa = g ? b.browser ? v.sourceMap.SourceNode : e("source-map").SourceNode : p;
                switch (c.type) {
                    case w.BlockStatement:
                    case w.BreakStatement:
                    case w.CatchClause:
                    case w.ContinueStatement:
                    case w.DirectiveStatement:
                    case w.DoWhileStatement:
                    case w.DebuggerStatement:
                    case w.EmptyStatement:
                    case w.ExpressionStatement:
                    case w.ForStatement:
                    case w.ForInStatement:
                    case w.FunctionDeclaration:
                    case w.IfStatement:
                    case w.LabeledStatement:
                    case w.Program:
                    case w.ReturnStatement:
                    case w.SwitchStatement:
                    case w.SwitchCase:
                    case w.ThrowStatement:
                    case w.TryStatement:
                    case w.VariableDeclaration:
                    case w.VariableDeclarator:
                    case w.WhileStatement:
                    case w.WithStatement:
                        h =
                            Z(c);
                        break;
                    case w.AssignmentExpression:
                    case w.ArrayExpression:
                    case w.ArrayPattern:
                    case w.BinaryExpression:
                    case w.CallExpression:
                    case w.ConditionalExpression:
                    case w.FunctionExpression:
                    case w.Identifier:
                    case w.Literal:
                    case w.LogicalExpression:
                    case w.MemberExpression:
                    case w.NewExpression:
                    case w.ObjectExpression:
                    case w.ObjectPattern:
                    case w.Property:
                    case w.SequenceExpression:
                    case w.ThisExpression:
                    case w.UnaryExpression:
                    case w.UpdateExpression:
                    case w.YieldExpression:
                        h = K(c, {
                            precedence: z.Sequence, allowIn: !0,
                            allowCall: !0
                        });
                        break;
                    default:
                        throw Error("Unknown node type: " + c.type);
                }
                if (!g) return h.toString();
                h = h.toStringWithSourceMap({file: l.sourceMap, sourceRoot: l.sourceMapRoot});
                return l.sourceMapWithCode ? h : h.map.toString()
            };
            b.attachComments = function (b, e, g) {
                var f = [], l, m;
                if (!b.range) throw Error("attachComments needs range information");
                if (!g.length) {
                    if (e.length) {
                        m = 0;
                        for (l = e.length; m < l; m += 1) g = M(e[m]), g.extendedRange = [0, b.range[0]], f.push(g);
                        b.leadingComments = f
                    }
                    return b
                }
                m = 0;
                for (l = e.length; m < l; m += 1) f.push(Ya(M(e[m]),
                    g));
                c(b, {
                    cursor: 0, enter: function (b) {
                        for (var c; this.cursor < f.length;) {
                            c = f[this.cursor];
                            if (c.extendedRange[1] > b.range[0]) break;
                            c.extendedRange[1] === b.range[0] ? (b.leadingComments || (b.leadingComments = []), b.leadingComments.push(c), f.splice(this.cursor, 1)) : this.cursor += 1
                        }
                        if (this.cursor === f.length) return 1;
                        if (f[this.cursor].extendedRange[0] > b.range[1]) return 2
                    }
                });
                c(b, {
                    cursor: 0, leave: function (b) {
                        for (var c; this.cursor < f.length;) {
                            c = f[this.cursor];
                            if (b.range[1] < c.extendedRange[0]) break;
                            b.range[1] === c.extendedRange[0] ?
                                (b.trailingComments || (b.trailingComments = []), b.trailingComments.push(c), f.splice(this.cursor, 1)) : this.cursor += 1
                        }
                        if (this.cursor === f.length) return 1;
                        if (f[this.cursor].extendedRange[0] > b.range[1]) return 2
                    }
                });
                return b
            };
            b.browser = !1
        })()
    });
    e.define("/node_modules/estraverse/package.json", function (e, x, b, l, p, m, v) {
        x.exports = {main: "estraverse.js"}
    });
    e.define("/node_modules/estraverse/estraverse.js", function (e, x, b, l, p, m, v) {
        (function (e) {
            "function" === typeof define && define.amd ? define(["exports"], e) : "undefined" !== typeof b ? e(b) : e(window.estraverse = {})
        })(function (b) {
            var e, f, l, m, p;
            e = {
                AssignmentExpression: "AssignmentExpression",
                ArrayExpression: "ArrayExpression",
                BlockStatement: "BlockStatement",
                BinaryExpression: "BinaryExpression",
                BreakStatement: "BreakStatement",
                CallExpression: "CallExpression",
                CatchClause: "CatchClause",
                ConditionalExpression: "ConditionalExpression",
                ContinueStatement: "ContinueStatement",
                DebuggerStatement: "DebuggerStatement",
                DirectiveStatement: "DirectiveStatement",
                DoWhileStatement: "DoWhileStatement",
                EmptyStatement: "EmptyStatement",
                ExpressionStatement: "ExpressionStatement",
                ForStatement: "ForStatement",
                ForInStatement: "ForInStatement",
                FunctionDeclaration: "FunctionDeclaration",
                FunctionExpression: "FunctionExpression",
                Identifier: "Identifier",
                IfStatement: "IfStatement",
                Literal: "Literal",
                LabeledStatement: "LabeledStatement",
                LogicalExpression: "LogicalExpression",
                MemberExpression: "MemberExpression",
                NewExpression: "NewExpression",
                ObjectExpression: "ObjectExpression",
                Program: "Program",
                Property: "Property",
                ReturnStatement: "ReturnStatement",
                SequenceExpression: "SequenceExpression",
                SwitchStatement: "SwitchStatement",
                SwitchCase: "SwitchCase",
                ThisExpression: "ThisExpression",
                ThrowStatement: "ThrowStatement",
                TryStatement: "TryStatement",
                UnaryExpression: "UnaryExpression",
                UpdateExpression: "UpdateExpression",
                VariableDeclaration: "VariableDeclaration",
                VariableDeclarator: "VariableDeclarator",
                WhileStatement: "WhileStatement",
                WithStatement: "WithStatement"
            };
            (f = Array.isArray) || (f = function (b) {
                return "[object Array]" === Object.prototype.toString.call(b)
            });
            m =
                {
                    AssignmentExpression: ["left", "right"],
                    ArrayExpression: ["elements"],
                    BlockStatement: ["body"],
                    BinaryExpression: ["left", "right"],
                    BreakStatement: ["label"],
                    CallExpression: ["callee", "arguments"],
                    CatchClause: ["param", "body"],
                    ConditionalExpression: ["test", "consequent", "alternate"],
                    ContinueStatement: ["label"],
                    DebuggerStatement: [],
                    DirectiveStatement: [],
                    DoWhileStatement: ["body", "test"],
                    EmptyStatement: [],
                    ExpressionStatement: ["expression"],
                    ForStatement: ["init", "test", "update", "body"],
                    ForInStatement: ["left", "right",
                        "body"],
                    FunctionDeclaration: ["id", "params", "body"],
                    FunctionExpression: ["id", "params", "body"],
                    Identifier: [],
                    IfStatement: ["test", "consequent", "alternate"],
                    Literal: [],
                    LabeledStatement: ["label", "body"],
                    LogicalExpression: ["left", "right"],
                    MemberExpression: ["object", "property"],
                    NewExpression: ["callee", "arguments"],
                    ObjectExpression: ["properties"],
                    Program: ["body"],
                    Property: ["key", "value"],
                    ReturnStatement: ["argument"],
                    SequenceExpression: ["expressions"],
                    SwitchStatement: ["discriminant", "cases"],
                    SwitchCase: ["test",
                        "consequent"],
                    ThisExpression: [],
                    ThrowStatement: ["argument"],
                    TryStatement: ["block", "handlers", "finalizer"],
                    UnaryExpression: ["argument"],
                    UpdateExpression: ["argument"],
                    VariableDeclaration: ["declarations"],
                    VariableDeclarator: ["id", "init"],
                    WhileStatement: ["test", "body"],
                    WithStatement: ["object", "body"]
                };
            l = {Break: 1, Skip: 2};
            p = {PropertyWrapper: "Property"};
            b.version = "0.0.4";
            b.Syntax = e;
            b.traverse = function (b, r) {
                var H, B, Q, s, v, x, D, L, E = {};
                H = [b];
                for (B = [null]; H.length;) if (Q = H.pop(), s = Q.type, Q === E) {
                    if (Q = B.pop(), v =
                            r.leave ? r.leave(Q, B[B.length - 1]) : void 0, v === l.Break) break
                } else if (Q) {
                    p.hasOwnProperty(s) && (Q = Q.node, s = p[s]);
                    v = r.enter ? r.enter(Q, B[B.length - 1]) : void 0;
                    if (v === l.Break) break;
                    H.push(E);
                    B.push(Q);
                    if (v !== l.Skip) for (D = m[s], v = D.length; 0 <= --v;) if (L = Q[D[v]]) if (f(L)) for (x = L.length; 0 <= --x;) L[x] && (s === e.ObjectExpression && "properties" === D[v] && null == D[v].type ? H.push({
                        type: "PropertyWrapper",
                        node: L[x]
                    }) : H.push(L[x])); else H.push(L)
                }
            };
            b.replace = function (b, r) {
                function H(b) {
                    L = b
                }

                var B, v, s, x, P, D, L, E, na, R = {}, V;
                V = {top: b};
                D = [b, V, "top"];
                B = [D];
                for (v = [D]; B.length;) if (D = B.pop(), D === R) {
                    if (D = v.pop(), L = void 0, r.leave && (s = D[0], P = r.leave(D[0], v[v.length - 1][0], H), void 0 !== P && (s = P), D[1][D[2]] = s), L === l.Break) break
                } else if (D[0]) {
                    L = void 0;
                    s = D[0];
                    x = s.type;
                    p.hasOwnProperty(x) && (D[0] = s = s.node, x = p[x]);
                    r.enter && (P = r.enter(D[0], v[v.length - 1][0], H), void 0 !== P && (s = P), D[1][D[2]] = s, D[0] = s);
                    if (L === l.Break) break;
                    if (D[0] && (B.push(R), v.push(D), L !== l.Skip)) for (E = m[x], P = E.length; 0 <= --P;) if (na = s[E[P]]) if (f(na)) for (D = na.length; 0 <= --D;) na[D] && (x ===
                    e.ObjectExpression && "properties" === E[P] && null == E[P].type ? B.push([{
                        type: "PropertyWrapper",
                        node: na[D]
                    }, na, D]) : B.push([na[D], na, D])); else B.push([na, s, E[P]])
                }
                return V.top
            };
            b.VisitorKeys = m;
            b.VisitorOption = l
        })
    });
    e.define("/tools/entry-point.js", function (e, x, b, l, p, m, v) {
        (v.escodegen = e("../escodegen")).browser = !0
    });
    e("/tools/entry-point.js")
})();
(function (e, f) {
    "object" === typeof exports ? f(exports) : "function" === typeof define && define.amd ? define(["exports"], f) : f(e)
})(this, function (e) {
    function f(b) {
        this._targetElement = b;
        this._options = {
            nextLabel: "Next &rarr;",
            prevLabel: "&larr; Back",
            skipLabel: "Skip",
            doneLabel: "Done",
            tooltipPosition: "bottom",
            tooltipClass: "",
            exitOnEsc: !0,
            exitOnOverlayClick: !0,
            showStepNumbers: !0,
            keyboardNavigation: !0,
            showButtons: !0,
            showBullets: !0,
            scrollToElement: !0,
            overlayOpacity: .8
        }
    }

    function x(e) {
        var f = [], u = this;
        if (this._options.steps) for (var s =
            [], v = 0, s = this._options.steps.length; v < s; v++) {
            var x = b(this._options.steps[v]);
            x.step = f.length + 1;
            "string" === typeof x.element && (x.element = document.querySelector(x.element));
            if ("undefined" === typeof x.element || null == x.element) {
                var D = document.querySelector(".introjsFloatingElement");
                null == D && (D = document.createElement("div"), D.className = "introjsFloatingElement", document.body.appendChild(D));
                x.element = D;
                x.position = "floating"
            }
            null != x.element && f.push(x)
        } else {
            s = e.querySelectorAll("*[data-intro]");
            if (1 > s.length) return !1;
            v = 0;
            for (x = s.length; v < x; v++) {
                var D = s[v], F = parseInt(D.getAttribute("data-step"), 10);
                0 < F && (f[F - 1] = {
                    element: D,
                    intro: D.getAttribute("data-intro"),
                    step: parseInt(D.getAttribute("data-step"), 10),
                    tooltipClass: D.getAttribute("data-tooltipClass"),
                    position: D.getAttribute("data-position") || this._options.tooltipPosition
                })
            }
            v = F = 0;
            for (x = s.length; v < x; v++) if (D = s[v], null == D.getAttribute("data-step")) {
                for (; "undefined" != typeof f[F];) F++;
                f[F] = {
                    element: D,
                    intro: D.getAttribute("data-intro"),
                    step: F + 1,
                    tooltipClass: D.getAttribute("data-tooltipClass"),
                    position: D.getAttribute("data-position") || this._options.tooltipPosition
                }
            }
        }
        v = [];
        for (s = 0; s < f.length; s++) f[s] && v.push(f[s]);
        f = v;
        f.sort(function (b, e) {
            return b.step - e.step
        });
        u._introItems = f;
        M.call(u, e) && (l.call(u), e.querySelector(".introjs-skipbutton"), e.querySelector(".introjs-nextbutton"), u._onKeyDown = function (b) {
            if (27 === b.keyCode && 1 == u._options.exitOnEsc) m.call(u, e), void 0 != u._introExitCallback && u._introExitCallback.call(u); else if (37 === b.keyCode) p.call(u); else if (39 === b.keyCode || 13 === b.keyCode) l.call(u),
                b.preventDefault ? b.preventDefault() : b.returnValue = !1
        }, u._onResize = function (b) {
            r.call(u, document.querySelector(".introjs-helperLayer"))
        }, window.addEventListener ? (this._options.keyboardNavigation && window.addEventListener("keydown", u._onKeyDown, !0), window.addEventListener("resize", u._onResize, !0)) : document.attachEvent && (this._options.keyboardNavigation && document.attachEvent("onkeydown", u._onKeyDown), document.attachEvent("onresize", u._onResize)));
        return !1
    }

    function b(e) {
        if (null == e || "object" != typeof e ||
            "undefined" != typeof e.nodeType) return e;
        var f = {}, l;
        for (l in e) f[l] = b(e[l]);
        return f
    }

    function l() {
        this._direction = "forward";
        "undefined" === typeof this._currentStep ? this._currentStep = 0 : ++this._currentStep;
        if (this._introItems.length <= this._currentStep) "function" === typeof this._introCompleteCallback && this._introCompleteCallback.call(this), m.call(this, this._targetElement); else {
            var b = this._introItems[this._currentStep];
            "undefined" !== typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this,
                b.element);
            u.call(this, b)
        }
    }

    function p() {
        this._direction = "backward";
        if (0 === this._currentStep) return !1;
        var b = this._introItems[--this._currentStep];
        "undefined" !== typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this, b.element);
        u.call(this, b)
    }

    function m(b) {
        var e = b.querySelector(".introjs-overlay");
        if (null != e) {
            e.style.opacity = 0;
            setTimeout(function () {
                e.parentNode && e.parentNode.removeChild(e)
            }, 500);
            (b = b.querySelector(".introjs-helperLayer")) && b.parentNode.removeChild(b);
            (b = document.querySelector(".introjsFloatingElement")) &&
            b.parentNode.removeChild(b);
            if (b = document.querySelector(".introjs-showElement")) b.className = b.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "");
            if ((b = document.querySelectorAll(".introjs-fixParent")) && 0 < b.length) for (var f = b.length - 1; 0 <= f; f--) b[f].className = b[f].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            window.removeEventListener ? window.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown);
            this._currentStep = void 0
        }
    }

    function v(b, e, f, l) {
        var m = "";
        e.style.top = null;
        e.style.right = null;
        e.style.bottom = null;
        e.style.left = null;
        e.style.marginLeft = null;
        e.style.marginTop = null;
        f.style.display = "inherit";
        "undefined" != typeof l && null != l && (l.style.top = null, l.style.left = null);
        if (this._introItems[this._currentStep]) switch (m = this._introItems[this._currentStep], m = "string" === typeof m.tooltipClass ? m.tooltipClass : this._options.tooltipClass, e.className = ("introjs-tooltip " + m).replace(/^\s+|\s+$/g, ""), currentTooltipPosition =
            this._introItems[this._currentStep].position, currentTooltipPosition) {
            case "top":
                e.style.left = "15px";
                e.style.top = "-" + (Y(e).height + 10) + "px";
                f.className = "introjs-arrow bottom";
                break;
            case "right":
                e.style.left = Y(b).width + 20 + "px";
                f.className = "introjs-arrow left";
                break;
            case "left":
                1 == this._options.showStepNumbers && (e.style.top = "15px");
                e.style.right = Y(b).width + 20 + "px";
                f.className = "introjs-arrow right";
                break;
            case "floating":
                f.style.display = "none";
                b = Y(e);
                e.style.left = "50%";
                e.style.top = "50%";
                e.style.marginLeft =
                    "-" + b.width / 2 + "px";
                e.style.marginTop = "-" + b.height / 2 + "px";
                "undefined" != typeof l && null != l && (l.style.left = "-" + (b.width / 2 + 18) + "px", l.style.top = "-" + (b.height / 2 + 18) + "px");
                break;
            case "bottom-right-aligned":
                f.className = "introjs-arrow top-right";
                e.style.right = "0px";
                e.style.bottom = "-" + (Y(e).height + 10) + "px";
                break;
            case "bottom-middle-aligned":
                l = Y(b);
                b = Y(e);
                f.className = "introjs-arrow top-middle";
                e.style.left = l.width / 2 - b.width / 2 + "px";
                e.style.bottom = "-" + (b.height + 10) + "px";
                break;
            default:
                e.style.bottom = "-" + (Y(e).height +
                    10) + "px", f.className = "introjs-arrow top"
        }
    }

    function r(b) {
        if (b && this._introItems[this._currentStep]) {
            var e = this._introItems[this._currentStep], f = Y(e.element), l = 10;
            "floating" == e.position && (l = 0);
            b.setAttribute("style", "width: " + (f.width + l) + "px; height:" + (f.height + l) + "px; top:" + (f.top - 5) + "px;left: " + (f.left - 5) + "px;")
        }
    }

    function u(b) {
        "undefined" !== typeof this._introChangeCallback && this._introChangeCallback.call(this, b.element);
        var e = this, f = document.querySelector(".introjs-helperLayer");
        Y(b.element);
        if (null !=
            f) {
            var s = f.querySelector(".introjs-helperNumberLayer"), u = f.querySelector(".introjs-tooltiptext"),
                x = f.querySelector(".introjs-arrow"), D = f.querySelector(".introjs-tooltip"),
                L = f.querySelector(".introjs-skipbutton"), E = f.querySelector(".introjs-prevbutton"),
                M = f.querySelector(".introjs-nextbutton");
            D.style.opacity = 0;
            if (null != s) {
                var R = this._introItems[0 <= b.step - 2 ? b.step - 2 : 0];
                if (null != R && "forward" == this._direction && "floating" == R.position || "backward" == this._direction && "floating" == b.position) s.style.opacity =
                    0
            }
            r.call(e, f);
            var V = document.querySelectorAll(".introjs-fixParent");
            if (V && 0 < V.length) for (R = V.length - 1; 0 <= R; R--) V[R].className = V[R].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            R = document.querySelector(".introjs-showElement");
            R.className = R.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, "");
            e._lastShowElementTimer && clearTimeout(e._lastShowElementTimer);
            e._lastShowElementTimer = setTimeout(function () {
                null != s && (s.innerHTML = b.step);
                u.innerHTML = b.intro;
                v.call(e, b.element,
                    D, x, s);
                f.querySelector(".introjs-bullets li > a.active").className = "";
                f.querySelector('.introjs-bullets li > a[data-stepnumber="' + b.step + '"]').className = "active";
                D.style.opacity = 1;
                s && (s.style.opacity = 1)
            }, 350)
        } else {
            var L = document.createElement("div"), V = document.createElement("div"),
                ca = document.createElement("div"), E = document.createElement("div"),
                M = document.createElement("div"), X = document.createElement("div");
            L.className = "introjs-helperLayer";
            r.call(e, L);
            this._targetElement.appendChild(L);
            V.className =
                "introjs-arrow";
            E.className = "introjs-tooltiptext";
            E.innerHTML = b.intro;
            M.className = "introjs-bullets";
            !1 === this._options.showBullets && (M.style.display = "none");
            for (var fa = document.createElement("ul"), R = 0, qa = this._introItems.length; R < qa; R++) {
                var K = document.createElement("li"), Z = document.createElement("a");
                Z.onclick = function () {
                    e.goToStep(this.getAttribute("data-stepnumber"))
                };
                0 === R && (Z.className = "active");
                Z.href = "javascript:void(0);";
                Z.innerHTML = "&nbsp;";
                Z.setAttribute("data-stepnumber", this._introItems[R].step);
                K.appendChild(Z);
                fa.appendChild(K)
            }
            M.appendChild(fa);
            X.className = "introjs-tooltipbuttons";
            !1 === this._options.showButtons && (X.style.display = "none");
            ca.className = "introjs-tooltip";
            ca.appendChild(E);
            ca.appendChild(M);
            if (1 == this._options.showStepNumbers) {
                var Ha = document.createElement("span");
                Ha.className = "introjs-helperNumberLayer";
                Ha.innerHTML = b.step;
                L.appendChild(Ha)
            }
            ca.appendChild(V);
            L.appendChild(ca);
            M = document.createElement("a");
            M.onclick = function () {
                e._introItems.length - 1 != e._currentStep && l.call(e)
            };
            M.href = "javascript:void(0);";
            M.innerHTML = this._options.nextLabel;
            E = document.createElement("a");
            E.onclick = function () {
                0 != e._currentStep && p.call(e)
            };
            E.href = "javascript:void(0);";
            E.innerHTML = this._options.prevLabel;
            L = document.createElement("a");
            L.className = "introjs-button introjs-skipbutton";
            L.href = "javascript:void(0);";
            L.innerHTML = this._options.skipLabel;
            L.onclick = function () {
                e._introItems.length - 1 == e._currentStep && "function" === typeof e._introCompleteCallback && e._introCompleteCallback.call(e);
                e._introItems.length -
                1 != e._currentStep && "function" === typeof e._introExitCallback && e._introExitCallback.call(e);
                m.call(e, e._targetElement)
            };
            X.appendChild(L);
            1 < this._introItems.length && (X.appendChild(E), X.appendChild(M));
            ca.appendChild(X);
            v.call(e, b.element, ca, V, Ha)
        }
        0 == this._currentStep && 1 < this._introItems.length ? (E.className = "introjs-button introjs-prevbutton introjs-disabled", M.className = "introjs-button introjs-nextbutton", L.innerHTML = this._options.skipLabel) : this._introItems.length - 1 == this._currentStep || 1 == this._introItems.length ?
            (L.innerHTML = this._options.doneLabel, E.className = "introjs-button introjs-prevbutton", M.className = "introjs-button introjs-nextbutton introjs-disabled") : (E.className = "introjs-button introjs-prevbutton", M.className = "introjs-button introjs-nextbutton", L.innerHTML = this._options.skipLabel);
        M.focus();
        b.element.className += " introjs-showElement";
        R = F(b.element, "position");
        "absolute" !== R && "relative" !== R && (b.element.className += " introjs-relativePosition");
        for (R = b.element.parentNode; null != R && "body" !== R.tagName.toLowerCase();) {
            V =
                F(R, "z-index");
            ca = parseFloat(F(R, "opacity"));
            if (/[0-9]+/.test(V) || 1 > ca) R.className += " introjs-fixParent";
            R = R.parentNode
        }
        da(b.element) || !0 !== this._options.scrollToElement || (ca = b.element.getBoundingClientRect(), R = ma().height, V = ca.bottom - (ca.bottom - ca.top), ca = ca.bottom - R, 0 > V || b.element.clientHeight > R ? window.scrollBy(0, V - 30) : window.scrollBy(0, ca + 100));
        "undefined" !== typeof this._introAfterChangeCallback && this._introAfterChangeCallback.call(this, b.element)
    }

    function F(b, e) {
        var f = "";
        b.currentStyle ? f = b.currentStyle[e] :
            document.defaultView && document.defaultView.getComputedStyle && (f = document.defaultView.getComputedStyle(b, null).getPropertyValue(e));
        return f && f.toLowerCase ? f.toLowerCase() : f
    }

    function ma() {
        if (void 0 != window.innerWidth) return {width: window.innerWidth, height: window.innerHeight};
        var b = document.documentElement;
        return {width: b.clientWidth, height: b.clientHeight}
    }

    function da(b) {
        b = b.getBoundingClientRect();
        return 0 <= b.top && 0 <= b.left && b.bottom + 80 <= window.innerHeight && b.right <= window.innerWidth
    }

    function M(b) {
        var e =
            document.createElement("div"), f = "", l = this;
        e.className = "introjs-overlay";
        if ("body" === b.tagName.toLowerCase()) f += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;", e.setAttribute("style", f); else {
            var p = Y(b);
            p && (f += "width: " + p.width + "px; height:" + p.height + "px; top:" + p.top + "px;left: " + p.left + "px;", e.setAttribute("style", f))
        }
        b.appendChild(e);
        e.onclick = function () {
            1 == l._options.exitOnOverlayClick && (m.call(l, b), void 0 != l._introExitCallback && l._introExitCallback.call(l))
        };
        setTimeout(function () {
            f += "opacity: " +
                l._options.overlayOpacity.toString() + ";";
            e.setAttribute("style", f)
        }, 10);
        return !0
    }

    function Y(b) {
        var e = {};
        e.width = b.offsetWidth;
        e.height = b.offsetHeight;
        for (var f = 0, l = 0; b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop);) f += b.offsetLeft, l += b.offsetTop, b = b.offsetParent;
        e.top = l;
        e.left = f;
        return e
    }

    var fa = function (b) {
        if ("object" === typeof b) return new f(b);
        if ("string" === typeof b) {
            if (b = document.querySelector(b)) return new f(b);
            throw Error("There is no element with given selector.");
        }
        return new f(document.body)
    };
    fa.version = "0.9.0";
    fa.fn = f.prototype = {
        clone: function () {
            return new f(this)
        }, setOption: function (b, e) {
            this._options[b] = e;
            return this
        }, setOptions: function (b) {
            var e = this._options, f = {}, l;
            for (l in e) f[l] = e[l];
            for (l in b) f[l] = b[l];
            this._options = f;
            return this
        }, start: function () {
            x.call(this, this._targetElement);
            return this
        }, goToStep: function (b) {
            this._currentStep = b - 2;
            "undefined" !== typeof this._introItems && l.call(this);
            return this
        }, nextStep: function () {
            l.call(this);
            return this
        }, previousStep: function () {
            p.call(this);
            return this
        }, exit: function () {
            m.call(this, this._targetElement)
        }, refresh: function () {
            r.call(this, document.querySelector(".introjs-helperLayer"));
            return this
        }, onbeforechange: function (b) {
            if ("function" === typeof b) this._introBeforeChangeCallback = b; else throw Error("Provided callback for onbeforechange was not a function");
            return this
        }, onchange: function (b) {
            if ("function" === typeof b) this._introChangeCallback = b; else throw Error("Provided callback for onchange was not a function.");
            return this
        }, onafterchange: function (b) {
            if ("function" === typeof b) this._introAfterChangeCallback = b; else throw Error("Provided callback for onafterchange was not a function");
            return this
        }, oncomplete: function (b) {
            if ("function" === typeof b) this._introCompleteCallback = b; else throw Error("Provided callback for oncomplete was not a function.");
            return this
        }, onexit: function (b) {
            if ("function" === typeof b) this._introExitCallback = b; else throw Error("Provided callback for onexit was not a function.");
            return this
        }
    };
    return e.introJs = fa
});

// demo.js END
// esnstrument.js START
window.esnstrument = {};
(function (r, X) {
    if ("object" == typeof exports && "object" == typeof module)
        return X(exports);
    if ("function" == typeof define && define.amd)
        return define(["exports"], X);
    X(r.acorn || (r.acorn = {}))
})(window, function (r) {
    function X(a) {
        h = a || {};
        for (var b in Ha)
            Object.prototype.hasOwnProperty.call(h, b) || (h[b] = Ha[b]);
        Ia = h.sourceFile || null;
        sb = 6 <= h.ecmaVersion ? Hb : tb
    }

    function n(a, b) {
        var d = Ja(f, a);
        b += " (" + d.line + ":" + d.column + ")";
        var K = new SyntaxError(b);
        K.pos = a;
        K.loc = d;
        K.raisedAt = c;
        throw K;
    }

    function v(a) {
        function b(a) {
            if (1 == a.length)
                return d += "return str === " + JSON.stringify(a[0]) + ";";
            d += "switch(str){";
            for (var t = 0; t < a.length; ++t)
                d += "case " + JSON.stringify(a[t]) + ":";
            d += "return true}return false;"
        }

        a = a.split(" ");
        var d = ""
            , c = []
            , g = 0;
        a: for (; g < a.length; ++g) {
            for (var e = 0; e < c.length; ++e)
                if (c[e][0].length == a[g].length) {
                    c[e].push(a[g]);
                    continue a
                }
            c.push([a[g]])
        }
        if (3 < c.length) {
            c.sort(function (a, t) {
                return t.length - a.length
            });
            d += "switch(str.length){";
            for (g = 0; g < c.length; ++g)
                a = c[g],
                    d += "case " + a[0].length + ":",
                    b(a);
            d += "}"
        } else
            b(a);
        return new Function("str", d)
    }

    function U() {
        this.line = O;
        this.column = c - P
    }

    function E(a, b) {
        Y = c;
        h.locations && (xa = new U);
        k = a;
        Q();
        M = b;
        ia = a.beforeExpr
    }

    function Ka() {
        for (var a = c, b = h.onComment && h.locations && new U, d = f.charCodeAt(c += 2); c < ja && 10 !== d && 13 !== d && 8232 !== d && 8233 !== d;)
            ++c,
                d = f.charCodeAt(c);
        if (h.onComment)
            h.onComment(!1, f.slice(a + 2, c), a, c, b, h.locations && new U)
    }

    function Q() {
        for (; c < ja;) {
            var a = f.charCodeAt(c);
            if (32 === a)
                ++c;
            else if (13 === a)
                ++c,
                    a = f.charCodeAt(c),
                10 === a && ++c,
                h.locations && (++O,
                    P = c);
            else if (10 === a || 8232 === a || 8233 === a)
                ++c,
                h.locations && (++O,
                    P = c);
            else if (8 < a && 14 > a)
                ++c;
            else if (47 === a)
                if (a = f.charCodeAt(c + 1),
                    42 === a) {
                    var a = h.onComment && h.locations && new U
                        , b = c
                        , d = f.indexOf("*/", c += 2);
                    -1 === d && n(c - 2, "Unterminated comment");
                    c = d + 2;
                    if (h.locations) {
                        ya.lastIndex = b;
                        for (var g = void 0; (g = ya.exec(f)) && g.index < c;)
                            ++O,
                                P = g.index + g[0].length
                    }
                    if (h.onComment)
                        h.onComment(!0, f.slice(b + 2, d), b, c, a, h.locations && new U)
                } else if (47 === a)
                    Ka();
                else
                    break;
            else if (160 === a)
                ++c;
            else if (5760 <= a && Ib.test(String.fromCharCode(a)))
                ++c;
            else
                break
        }
    }

    function gb() {
        var a = f.charCodeAt(c + 1);
        if (48 <= a && 57 >= a)
            return R(!0);
        var b = f.charCodeAt(c + 2);
        if (6 <= h.ecmaVersion && 46 === a && 46 === b)
            return c += 3,
                E(hb);
        ++c;
        return E(ib)
    }

    function aa(a) {
        switch (a) {
            case 46:
                return gb();
            case 40:
                return ++c,
                    E(ea);
            case 41:
                return ++c,
                    E(V);
            case 59:
                return ++c,
                    E(fa);
            case 44:
                return ++c,
                    E(ka);
            case 91:
                return ++c,
                    E(Wa);
            case 93:
                return ++c,
                    E(Xa);
            case 123:
                return ++c,
                    E(za);
            case 125:
                return ++c,
                    E(ra);
            case 58:
                return ++c,
                    E(Aa);
            case 63:
                return ++c,
                    E(jb);
            case 48:
                if (a = f.charCodeAt(c + 1),
                    120 === a || 88 === a)
                    return c += 2,
                        a = q(16),
                    null == a && n(F + 2, "Expected hexadecimal number"),
                    Ya(f.charCodeAt(c)) && n(c, "Identifier directly after number"),
                        E(J, a);
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return R(!1);
            case 34:
            case 39:
                a: {
                    c++;
                    for (var b = ""; ;) {
                        c >= ja && n(F, "Unterminated string constant");
                        var d = f.charCodeAt(c);
                        if (d === a) {
                            ++c;
                            a = E(ba, b);
                            break a
                        }
                        if (92 === d) {
                            var d = f.charCodeAt(++c)
                                , g = /^[0-7]+/.exec(f.slice(c, c + 3));
                            for (g && (g = g[0]); g && 255 < parseInt(g, 8);)
                                g = g.slice(0, -1);
                            "0" === g && (g = null );
                            ++c;
                            if (g)
                                y && n(c - 2, "Octal literal in strict mode"),
                                    b += String.fromCharCode(parseInt(g, 8)),
                                    c += g.length - 1;
                            else
                                switch (d) {
                                    case 110:
                                        b += "\n";
                                        break;
                                    case 114:
                                        b += "\r";
                                        break;
                                    case 120:
                                        b += String.fromCharCode(l(2));
                                        break;
                                    case 117:
                                        b += String.fromCharCode(l(4));
                                        break;
                                    case 85:
                                        b += String.fromCharCode(l(8));
                                        break;
                                    case 116:
                                        b += "\t";
                                        break;
                                    case 98:
                                        b += "\b";
                                        break;
                                    case 118:
                                        b += "\x0B";
                                        break;
                                    case 102:
                                        b += "\f";
                                        break;
                                    case 48:
                                        b += "\x00";
                                        break;
                                    case 13:
                                        10 === f.charCodeAt(c) && ++c;
                                    case 10:
                                        h.locations && (P = c,
                                            ++O);
                                        break;
                                    default:
                                        b += String.fromCharCode(d)
                                }
                        } else
                            13 !== d && 10 !== d && 8232 !== d && 8233 !== d || n(F, "Unterminated string constant"),
                                b += String.fromCharCode(d),
                                ++c
                    }
                }
                return a;
            case 47:
                return a = f.charCodeAt(c + 1),
                    ia ? (++c,
                        a = z()) : a = 61 === a ? A(sa, 2) : A(kb, 1),
                    a;
            case 37:
            case 42:
                return a = 61 === f.charCodeAt(c + 1) ? A(sa, 2) : A(Jb, 1),
                    a;
            case 124:
            case 38:
                return b = f.charCodeAt(c + 1),
                    a = b === a ? A(124 === a ? ub : vb, 2) : 61 === b ? A(sa, 2) : A(124 === a ? Kb : Lb, 1),
                    a;
            case 94:
                return a = 61 === f.charCodeAt(c + 1) ? A(sa, 2) : A(Mb, 1),
                    a;
            case 43:
            case 45:
                return b = f.charCodeAt(c + 1),
                    b === a ? 45 == b && 62 == f.charCodeAt(c + 2) && Za.test(f.slice(Z, c)) ? (c += 3,
                        Ka(),
                        Q(),
                        a = w()) : a = A(Nb, 2) : a = 61 === b ? A(sa, 2) : A(Ob, 1),
                    a;
            case 60:
            case 62:
                return b = f.charCodeAt(c + 1),
                    d = 1,
                    b === a ? (d = 62 === a && 62 === f.charCodeAt(c + 2) ? 3 : 2,
                        a = 61 === f.charCodeAt(c + d) ? A(sa, d + 1) : A(Pb, d)) : 33 == b && 60 == a && 45 == f.charCodeAt(c + 2) && 45 == f.charCodeAt(c + 3) ? (c += 4,
                        Ka(),
                        Q(),
                        a = w()) : (61 === b && (d = 61 === f.charCodeAt(c + 2) ? 3 : 2),
                        a = A(Qb, d)),
                    a;
            case 61:
            case 33:
                return a = 61 === f.charCodeAt(c + 1) ? A(Rb, 61 === f.charCodeAt(c + 2) ? 3 : 2) : A(61 === a ? lb : wb, 1),
                    a;
            case 126:
                return A(wb, 1)
        }
        return !1
    }

    function w(a) {
        a ? c = F + 1 : F = c;
        h.locations && (Ba = new U);
        if (a)
            return z();
        if (c >= ja)
            return E(L);
        var b = f.charCodeAt(c);
        if (Ya(b) || 92 === b)
            return Ca();
        a = aa(b);
        if (!1 === a) {
            b = String.fromCharCode(b);
            if ("\\" === b || xb.test(b))
                return Ca();
            n(c, "Unexpected character '" + b + "'")
        }
        return a
    }

    function A(a, b) {
        var d = f.slice(c, c + b);
        c += b;
        E(a, d)
    }

    function z() {
        for (var a = "", b, d, g = c; ;) {
            c >= ja && n(g, "Unterminated regular expression");
            a = f.charAt(c);
            Za.test(a) && n(g, "Unterminated regular expression");
            if (b)
                b = !1;
            else {
                if ("[" === a)
                    d = !0;
                else if ("]" === a && d)
                    d = !1;
                else if ("/" === a && !d)
                    break;
                b = "\\" === a
            }
            ++c
        }
        a = f.slice(g, c);
        ++c;
        (b = la()) && !/^[gmsiy]*$/.test(b) && n(g, "Invalid regular expression flag");
        try {
            var e = new RegExp(a, b)
        } catch (D) {
            D instanceof SyntaxError && n(g, "Error parsing regular expression: " + D.message),
                n(D)
        }
        return E(oa, e)
    }

    function q(a, b) {
        for (var d = c, g = 0, e = 0, D = null == b ? Infinity : b; e < D; ++e) {
            var C = f.charCodeAt(c)
                , C = 97 <= C ? C - 97 + 10 : 65 <= C ? C - 65 + 10 : 48 <= C && 57 >= C ? C - 48 : Infinity;
            if (C >= a)
                break;
            ++c;
            g = g * a + C
        }
        return c === d || null != b && c - d !== b ? null : g
    }

    function R(a) {
        var b = c
            , d = !1
            , g = 48 === f.charCodeAt(c);
        a || null !== q(10) || n(b, "Invalid number");
        46 === f.charCodeAt(c) && (++c,
            q(10),
            d = !0);
        a = f.charCodeAt(c);
        if (69 === a || 101 === a)
            a = f.charCodeAt(++c),
            43 !== a && 45 !== a || ++c,
            null === q(10) && n(b, "Invalid number"),
                d = !0;
        Ya(f.charCodeAt(c)) && n(c, "Identifier directly after number");
        a = f.slice(b, c);
        var e;
        d ? e = parseFloat(a) : g && 1 !== a.length ? /[89]/.test(a) || y ? n(b, "Invalid number") : e = parseInt(a, 8) : e = parseInt(a, 10);
        return E(J, e)
    }

    function l(a) {
        a = q(16, a);
        null === a && n(F, "Bad character escape sequence");
        return a
    }

    function la() {
        Da = !1;
        for (var a, b = !0, d = c; ;) {
            var g = f.charCodeAt(c);
            if (yb(g))
                Da && (a += f.charAt(c)),
                    ++c;
            else if (92 === g) {
                Da || (a = f.slice(d, c));
                Da = !0;
                117 != f.charCodeAt(++c) && n(c, "Expecting Unicode escape sequence \\uXXXX");
                ++c;
                var g = l(4)
                    , e = String.fromCharCode(g);
                e || n(c - 1, "Invalid Unicode escape");
                (b ? Ya(g) : yb(g)) || n(c - 4, "Invalid Unicode escape");
                a += e
            } else
                break;
            b = !1
        }
        return Da ? a : f.slice(d, c)
    }

    function Ca() {
        var a = la()
            , b = N;
        !Da && sb(a) && (b = mb[a]);
        return E(b, a)
    }

    function p() {
        La = F;
        Z = Y;
        Ma = xa;
        w()
    }

    function ta(a) {
        y = a;
        c = F;
        if (h.locations)
            for (; c < P;)
                P = f.lastIndexOf("\n", P - 2) + 1,
                    --O;
        Q();
        w()
    }

    function Na() {
        this.type = null;
        this.start = F;
        this.end = null
    }

    function ga() {
        this.start = Ba;
        this.end = null;
        null !== Ia && (this.source = Ia)
    }

    function G() {
        var a = new Na;
        h.locations && (a.loc = new ga);
        h.directSourceFile && (a.sourceFile = h.directSourceFile);
        h.ranges && (a.range = [F, 0]);
        return a
    }

    function ca(a) {
        var b = new Na;
        b.start = a.start;
        h.locations && (b.loc = new ga,
            b.loc.start = a.loc.start);
        h.ranges && (b.range = [a.range[0], 0]);
        return b
    }

    function m(a, b) {
        a.type = b;
        a.end = Z;
        h.locations && (a.loc.end = Ma);
        h.ranges && (a.range[1] = Z);
        return a
    }

    function pa(a) {
        return 5 <= h.ecmaVersion && "ExpressionStatement" === a.type && "Literal" === a.expression.type && "use strict" === a.expression.value
    }

    function x(a) {
        if (k === a)
            return p(),
                !0
    }

    function ua() {
        return !h.strictSemicolons && (k === L || k === ra || Za.test(f.slice(Z, F)))
    }

    function ha() {
        x(fa) || ua() || W()
    }

    function B(a) {
        k === a ? p() : W()
    }

    function W() {
        n(F, "Unexpected token")
    }

    function ma(a) {
        "Identifier" !== a.type && "MemberExpression" !== a.type && n(a.start, "Assigning to rvalue");
        y && "Identifier" === a.type && $a(a.name) && n(a.start, "Assigning to " + a.name + " in strict mode")
    }

    function S() {
        (k === kb || k === sa && "/=" == M) && w(!0);
        var t = k
            , c = G();
        switch (t) {
            case ab:
            case Oa:
                var t = t.keyword
                    , e = "break" == t;
                p();
                x(fa) || ua() ? c.label = null : k !== N ? W() : (c.label = $(),
                    ha());
                for (var K = 0; K < u.length; ++K) {
                    var l = u[K];
                    if (null == c.label || l.name === c.label.name) {
                        if (null != l.kind && (e || "loop" === l.kind))
                            break;
                        if (c.label && e)
                            break
                    }
                }
                K === u.length && n(c.start, "Unsyntactic " + t);
                return m(c, e ? "BreakStatement" : "ContinueStatement");
            case H:
                return p(),
                    ha(),
                    m(c, "DebuggerStatement");
            case bb:
                return p(),
                    u.push(nb),
                    c.body = S(),
                    u.pop(),
                    B(ob),
                    c.test = da(),
                    ha(),
                    m(c, "DoWhileStatement");
            case a:
                return Pa(c);
            case b:
                return p(),
                    Qa(c, !0);
            case d:
                return p(),
                    c.test = da(),
                    c.consequent = S(),
                    c.alternate = x(cb) ? S() : null ,
                    m(c, "IfStatement");
            case g:
                return qa || h.allowReturnOutsideFunction || n(F, "'return' outside of function"),
                    p(),
                    x(fa) || ua() ? c.argument = null : (c.argument = I(),
                        ha()),
                    m(c, "ReturnStatement");
            case D:
                p();
                c.discriminant = da();
                c.cases = [];
                B(za);
                for (u.push(Sb); k != ra;)
                    k === Ra || k === Ea ? (t = k === Ra,
                    e && m(e, "SwitchCase"),
                        c.cases.push(e = G()),
                        e.consequent = [],
                        p(),
                        t ? e.test = I() : (K && n(La, "Multiple default clauses"),
                            K = !0,
                            e.test = null ),
                        B(Aa)) : (e || W(),
                        e.consequent.push(S()));
                e && m(e, "SwitchCase");
                p();
                u.pop();
                return m(c, "SwitchStatement");
            case na:
                return p(),
                Za.test(f.slice(Z, F)) && n(Z, "Illegal newline after throw"),
                    c.argument = I(),
                    ha(),
                    c = m(c, "ThrowStatement"),
                    c;
            case C:
                return p(),
                    c.block = va(),
                    c.handler = null ,
                k === db && (t = G(),
                    p(),
                    B(ea),
                    t.param = $(),
                y && $a(t.param.name) && n(t.param.start, "Binding " + t.param.name + " in strict mode"),
                    B(V),
                    t.guard = null ,
                    t.body = va(),
                    c.handler = m(t, "CatchClause")),
                    c.guardedHandlers = T,
                    c.finalizer = x(eb) ? va() : null ,
                c.handler || c.finalizer || n(c.start, "Missing catch or finally clause"),
                    m(c, "TryStatement");
            case pb:
            case qb:
            case rb:
                return t = t.keyword,
                    p(),
                    Sa(c, !1, t),
                    ha(),
                    m(c, "VariableDeclaration");
            case ob:
                return p(),
                    c.test = da(),
                    u.push(nb),
                    c.body = S(),
                    u.pop(),
                    m(c, "WhileStatement");
            case zb:
                return y && n(F, "'with' in strict mode"),
                    p(),
                    c.object = da(),
                    c.body = S(),
                    m(c, "WithStatement");
            case za:
                return va();
            case fa:
                return p(),
                    m(c, "EmptyStatement");
            default:
                e = M;
                K = I();
                if (t === N && "Identifier" === K.type && x(Aa)) {
                    for (t = 0; t < u.length; ++t)
                        u[t].name === e && n(K.start, "Label '" + e + "' is already declared");
                    u.push({
                        name: e,
                        kind: k.isLoop ? "loop" : k === D ? "switch" : null
                    });
                    c.body = S();
                    u.pop();
                    c.label = K;
                    return m(c, "LabeledStatement")
                }
                c.expression = K;
                ha();
                return m(c, "ExpressionStatement")
        }
    }

    function Pa(a) {
        p();
        u.push(nb);
        B(ea);
        if (k === fa)
            return Fa(a, null);
        if (k === pb || k === qb) {
            var b = G()
                , d = k.keyword;
            p();
            Sa(b, !0, d);
            m(b, "VariableDeclaration");
            return 1 === b.declarations.length && x(fb) ? Ta(a, b) : Fa(a, b)
        }
        b = I(!1, !0);
        return x(fb) ? (ma(b),
            Ta(a, b)) : Fa(a, b)
    }

    function da() {
        B(ea);
        var a = I();
        B(V);
        return a
    }

    function va(a) {
        var b = G(), d = !0, c = !1, g;
        b.body = [];
        for (B(za); !x(ra);) {
            var e = S();
            b.body.push(e);
            d && a && pa(e) && (g = c,
                ta(c = !0));
            d = !1
        }
        c && !g && ta(!1);
        return m(b, "BlockStatement")
    }

    function Fa(a, b) {
        a.init = b;
        B(fa);
        a.test = k === fa ? null : I();
        B(fa);
        a.update = k === V ? null : I();
        B(V);
        a.body = S();
        u.pop();
        return m(a, "ForStatement")
    }

    function Ta(a, b) {
        a.left = b;
        a.right = I();
        B(V);
        a.body = S();
        u.pop();
        return m(a, "ForInStatement")
    }

    function Sa(a, b, d) {
        a.declarations = [];
        for (a.kind = d; ;) {
            var c = G();
            c.id = $();
            y && $a(c.id.name) && n(c.id.start, "Binding " + c.id.name + " in strict mode");
            c.init = x(lb) ? I(!0, b) : d === rb.keyword ? W() : null;
            a.declarations.push(m(c, "VariableDeclarator"));
            if (!x(ka))
                break
        }
        return a
    }

    function I(a, b) {
        var d = s(b);
        if (!a && k === ka) {
            var c = ca(d);
            for (c.expressions = [d]; x(ka);)
                c.expressions.push(s(b));
            return m(c, "SequenceExpression")
        }
        return d
    }

    function s(a) {
        var b;
        b = e(Ua(), -1, a);
        if (x(jb)) {
            var d = ca(b);
            d.test = b;
            d.consequent = I(!0);
            B(Aa);
            d.alternate = I(!0, a);
            b = m(d, "ConditionalExpression")
        }
        return k.isAssign ? (d = ca(b),
            d.operator = M,
            d.left = b,
            p(),
            d.right = s(a),
            ma(b),
            m(d, "AssignmentExpression")) : b
    }

    function e(a, b, d) {
        var c = k.binop;
        if (null != c && (!d || k !== fb) && c > b) {
            var g = ca(a);
            g.left = a;
            g.operator = M;
            a = k;
            p();
            g.right = e(Ua(), c, d);
            c = m(g, a === ub || a === vb ? "LogicalExpression" : "BinaryExpression");
            return e(c, b, d)
        }
        return a
    }

    function Ua() {
        if (k.prefix) {
            var a = G()
                , b = k.isUpdate;
            a.operator = M;
            ia = a.prefix = !0;
            p();
            a.argument = Ua();
            b ? ma(a.argument) : y && "delete" === a.operator && "Identifier" === a.argument.type && n(a.start, "Deleting local variable in strict mode");
            return m(a, b ? "UpdateExpression" : "UnaryExpression")
        }
        for (b = wa(Ga()); k.postfix && !ua();)
            a = ca(b),
                a.operator = M,
                a.prefix = !1,
                a.argument = b,
                ma(b),
                p(),
                b = m(a, "UpdateExpression");
        return b
    }

    function wa(a, b) {
        if (x(ib)) {
            var d = ca(a);
            d.object = a;
            d.property = $(!0);
            d.computed = !1;
            return wa(m(d, "MemberExpression"), b)
        }
        return x(Wa) ? (d = ca(a),
            d.object = a,
            d.property = I(),
            d.computed = !0,
            B(Xa),
            wa(m(d, "MemberExpression"), b)) : !b && x(ea) ? (d = ca(a),
            d.callee = a,
            d.arguments = Va(V, !1),
            wa(m(d, "CallExpression"), b)) : a
    }

    function Ga() {
        switch (k) {
            case Ab:
                var a = G();
                p();
                return m(a, "ThisExpression");
            case N:
                return $();
            case J:
            case ba:
            case oa:
                return a = G(),
                    a.value = M,
                    a.raw = f.slice(F, Y),
                    p(),
                    m(a, "Literal");
            case Bb:
            case Cb:
            case Db:
                return a = G(),
                    a.value = k.atomValue,
                    a.raw = k.keyword,
                    p(),
                    m(a, "Literal");
            case ea:
                var a = Ba
                    , d = F;
                p();
                var c = I();
                c.start = d;
                c.end = Y;
                h.locations && (c.loc.start = a,
                    c.loc.end = xa);
                h.ranges && (c.range = [d, Y]);
                B(V);
                return c;
            case Wa:
                return a = G(),
                    p(),
                    a.elements = Va(Xa, !0, !0),
                    m(a, "ArrayExpression");
            case za:
                a = G();
                d = !0;
                c = !1;
                a.properties = [];
                for (p(); !x(ra);) {
                    if (d)
                        d = !1;
                    else if (B(ka),
                        h.allowTrailingCommas && x(ra))
                        break;
                    var g = {
                        key: k === J || k === ba ? Ga() : $(!0)
                    }, e = !1, D;
                    x(Aa) ? (g.value = I(!0),
                        D = g.kind = "init") : 5 <= h.ecmaVersion && "Identifier" === g.key.type && ("get" === g.key.name || "set" === g.key.name) ? (e = c = !0,
                        D = g.kind = g.key.name,
                        g.key = k === J || k === ba ? Ga() : $(!0),
                    k !== ea && W(),
                        g.value = Qa(G(), !1)) : W();
                    if ("Identifier" === g.key.type && (y || c))
                        for (var C = 0; C < a.properties.length; ++C) {
                            var na = a.properties[C];
                            if (na.key.name === g.key.name) {
                                var l = D == na.kind || e && "init" === na.kind || "init" === D && ("get" === na.kind || "set" === na.kind);
                                l && !y && "init" === D && "init" === na.kind && (l = !1);
                                l && n(g.key.start, "Redefinition of property")
                            }
                        }
                    a.properties.push(g)
                }
                return m(a, "ObjectExpression");
            case b:
                return a = G(),
                    p(),
                    Qa(a, !1);
            case Eb:
                return a = G(),
                    p(),
                    a.callee = wa(Ga(), !0),
                    x(ea) ? a.arguments = Va(V, !1) : a.arguments = T,
                    m(a, "NewExpression");
            default:
                W()
        }
    }

    function Qa(a, b) {
        k === N ? a.id = $() : b ? W() : a.id = null;
        a.params = [];
        a.rest = null;
        for (B(ea); !x(V);)
            if (6 <= h.ecmaVersion && x(hb)) {
                a.rest = $();
                B(V);
                break
            } else if (a.params.push($()),
                    !x(ka)) {
                B(V);
                break
            }
        var d = qa
            , c = u;
        qa = !0;
        u = [];
        a.body = va(!0);
        qa = d;
        u = c;
        if (y || a.body.body.length && pa(a.body.body[0]))
            for (d = -2; d < a.params.length; ++d) {
                if (0 <= d)
                    c = a.params[d];
                else if (-2 == d)
                    if (a.rest)
                        c = a.rest;
                    else
                        continue;
                else if (a.id)
                    c = a.id;
                else
                    continue;
                (Fb(c.name) || $a(c.name)) && n(c.start, "Defining '" + c.name + "' in strict mode");
                if (0 <= d)
                    for (var g = 0; g < d; ++g)
                        c.name === a.params[g].name && n(c.start, "Argument name clash in strict mode")
            }
        return m(a, b ? "FunctionDeclaration" : "FunctionExpression")
    }

    function Va(a, b, d) {
        for (var c = [], g = !0; !x(a);) {
            if (g)
                g = !1;
            else if (B(ka),
                b && h.allowTrailingCommas && x(a))
                break;
            d && k === ka ? c.push(null) : c.push(I(!0))
        }
        return c
    }

    function $(a) {
        var b = G();
        a && "everywhere" == h.forbidReserved && (a = !1);
        k === N ? (!a && (h.forbidReserved && (3 === h.ecmaVersion ? Tb : Ub)(M) || y && Fb(M)) && -1 == f.slice(F, Y).indexOf("\\") && n(F, "The keyword '" + M + "' is reserved"),
            b.name = M) : a && k.keyword ? b.name = k.keyword : W();
        ia = !1;
        p();
        return m(b, "Identifier")
    }

    r.version = "0.6.1";
    var h, f, ja, Ia;
    r.parse = function (a, b) {
        f = String(a);
        ja = f.length;
        X(b);
        O = 1;
        c = P = 0;
        ia = !0;
        Q();
        var d = h.program;
        La = Z = c;
        h.locations && (Ma = new U);
        qa = y = null;
        u = [];
        w();
        var g = d || G()
            , e = !0;
        d || (g.body = []);
        for (; k !== L;)
            d = S(),
                g.body.push(d),
            e && pa(d) && ta(!0),
                e = !1;
        return m(g, "Program")
    }
    ;
    var Ha = r.defaultOptions = {
            ecmaVersion: 5,
            strictSemicolons: !1,
            allowTrailingCommas: !0,
            forbidReserved: !1,
            allowReturnOutsideFunction: !1,
            locations: !1,
            onComment: null,
            ranges: !1,
            program: null,
            sourceFile: null,
            directSourceFile: null
        }
        , Ja = r.getLineInfo = function (a, b) {
            for (var d = 1, c = 0; ;) {
                ya.lastIndex = c;
                var g = ya.exec(a);
                if (g && g.index < b)
                    ++d,
                        c = g.index + g[0].length;
                else
                    break
            }
            return {
                line: d,
                column: b - c
            }
        }
    ;
    r.tokenize = function (a, b) {
        function d(a) {
            Z = Y;
            w(a);
            g.start = F;
            g.end = Y;
            g.startLoc = Ba;
            g.endLoc = xa;
            g.type = k;
            g.value = M;
            return g
        }

        f = String(a);
        ja = f.length;
        X(b);
        O = 1;
        c = P = 0;
        ia = !0;
        Q();
        var g = {};
        d.jumpTo = function (a, b) {
            c = a;
            if (h.locations) {
                O = 1;
                P = ya.lastIndex = 0;
                for (var d; (d = ya.exec(f)) && d.index < a;)
                    ++O,
                        P = d.index + d[0].length
            }
            ia = b;
            Q()
        }
        ;
        return d
    }
    ;
    var c, F, Y, Ba, xa, k, M, ia, O, P, La, Z, Ma, qa, u, y, T = [], J = {
        type: "num"
    }, oa = {
        type: "regexp"
    }, ba = {
        type: "string"
    }, N = {
        type: "name"
    }, L = {
        type: "eof"
    }, ab = {
        keyword: "break"
    }, Ra = {
        keyword: "case",
        beforeExpr: !0
    }, db = {
        keyword: "catch"
    }, Oa = {
        keyword: "continue"
    }, H = {
        keyword: "debugger"
    }, Ea = {
        keyword: "default"
    }, bb = {
        keyword: "do",
        isLoop: !0
    }, cb = {
        keyword: "else",
        beforeExpr: !0
    }, eb = {
        keyword: "finally"
    }, a = {
        keyword: "for",
        isLoop: !0
    }, b = {
        keyword: "function"
    }, d = {
        keyword: "if"
    }, g = {
        keyword: "return",
        beforeExpr: !0
    }, D = {
        keyword: "switch"
    }, na = {
        keyword: "throw",
        beforeExpr: !0
    }, C = {
        keyword: "try"
    }, pb = {
        keyword: "var"
    }, qb = {
        keyword: "let"
    }, rb = {
        keyword: "const"
    }, ob = {
        keyword: "while",
        isLoop: !0
    }, zb = {
        keyword: "with"
    }, Eb = {
        keyword: "new",
        beforeExpr: !0
    }, Ab = {
        keyword: "this"
    }, Bb = {
        keyword: "null",
        atomValue: null
    }, Cb = {
        keyword: "true",
        atomValue: !0
    }, Db = {
        keyword: "false",
        atomValue: !1
    }, fb = {
        keyword: "in",
        binop: 7,
        beforeExpr: !0
    }, mb = {
        "break": ab,
        "case": Ra,
        "catch": db,
        "continue": Oa,
        "debugger": H,
        "default": Ea,
        "do": bb,
        "else": cb,
        "finally": eb,
        "for": a,
        "function": b,
        "if": d,
        "return": g,
        "switch": D,
        "throw": na,
        "try": C,
        "var": pb,
        let: qb,
        "const": rb,
        "while": ob,
        "with": zb,
        "null": Bb,
        "true": Cb,
        "false": Db,
        "new": Eb,
        "in": fb,
        "instanceof": {
            keyword: "instanceof",
            binop: 7,
            beforeExpr: !0
        },
        "this": Ab,
        "typeof": {
            keyword: "typeof",
            prefix: !0,
            beforeExpr: !0
        },
        "void": {
            keyword: "void",
            prefix: !0,
            beforeExpr: !0
        },
        "delete": {
            keyword: "delete",
            prefix: !0,
            beforeExpr: !0
        }
    }, Wa = {
        type: "[",
        beforeExpr: !0
    }, Xa = {
        type: "]"
    }, za = {
        type: "{",
        beforeExpr: !0
    }, ra = {
        type: "}"
    }, ea = {
        type: "(",
        beforeExpr: !0
    }, V = {
        type: ")"
    }, ka = {
        type: ",",
        beforeExpr: !0
    }, fa = {
        type: ";",
        beforeExpr: !0
    }, Aa = {
        type: ":",
        beforeExpr: !0
    }, ib = {
        type: "."
    }, hb = {
        type: "..."
    }, jb = {
        type: "?",
        beforeExpr: !0
    }, kb = {
        binop: 10,
        beforeExpr: !0
    }, lb = {
        isAssign: !0,
        beforeExpr: !0
    }, sa = {
        isAssign: !0,
        beforeExpr: !0
    }, Nb = {
        postfix: !0,
        prefix: !0,
        isUpdate: !0
    }, wb = {
        prefix: !0,
        beforeExpr: !0
    }, ub = {
        binop: 1,
        beforeExpr: !0
    }, vb = {
        binop: 2,
        beforeExpr: !0
    }, Kb = {
        binop: 3,
        beforeExpr: !0
    }, Mb = {
        binop: 4,
        beforeExpr: !0
    }, Lb = {
        binop: 5,
        beforeExpr: !0
    }, Rb = {
        binop: 6,
        beforeExpr: !0
    }, Qb = {
        binop: 7,
        beforeExpr: !0
    }, Pb = {
        binop: 8,
        beforeExpr: !0
    }, Ob = {
        binop: 9,
        prefix: !0,
        beforeExpr: !0
    }, Jb = {
        binop: 10,
        beforeExpr: !0
    };
    r.tokTypes = {
        bracketL: Wa,
        bracketR: Xa,
        braceL: za,
        braceR: ra,
        parenL: ea,
        parenR: V,
        comma: ka,
        semi: fa,
        colon: Aa,
        dot: ib,
        ellipsis: hb,
        question: jb,
        slash: kb,
        eq: lb,
        name: N,
        eof: L,
        num: J,
        regexp: oa,
        string: ba
    };
    for (var Gb in mb)
        r.tokTypes["_" + Gb] = mb[Gb];
    var Tb = v("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),
        Ub = v("class enum extends super const export import"),
        Fb = v("implements interface let package private protected public static yield"), $a = v("eval arguments"),
        tb = v("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),
        Hb = v("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this let const"),
        sb = tb, Ib = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
        xb = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"),
        Vb = RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"),
        Za = /[\n\r\u2028\u2029]/, ya = /\r\n|[\n\r\u2028\u2029]/g, Ya = r.isIdentifierStart = function (a) {
            return 65 > a ? 36 === a : 91 > a ? !0 : 97 > a ? 95 === a : 123 > a ? !0 : 170 <= a && xb.test(String.fromCharCode(a))
        }
        , yb = r.isIdentifierChar = function (a) {
            return 48 > a ? 36 === a : 58 > a ? !0 : 65 > a ? !1 : 91 > a ? !0 : 97 > a ? 95 === a : 123 > a ? !0 : 170 <= a && Vb.test(String.fromCharCode(a))
        }
        , Da;
    r.Node = Na;
    var nb = {
        kind: "loop"
    }
        , Sb = {
        kind: "switch"
    }
});
"undefined" === typeof J$ && (J$ = {});
(function (r) {
    r = r.Config = {};
    r.DEBUG = !1;
    r.WARN = !1;
    r.SERIOUS_WARN = !1;
    r.MAX_BUF_SIZE = 64E3;
    r.LOG_ALL_READS_AND_BRANCHES = !1
})(window.esnstrument);
var acorn, escodegen, astUtil;
(function (r) {
    function X(a, b) {
        var d = a.length;
        if ("[object Array]" !== Object.prototype.toString.call(a))
            throw new TypeError;
        if ("function" !== typeof b)
            throw new TypeError;
        for (var c = Array(d), e = 0; e < d; e++)
            e in a && (c[e] = b(a[e]));
        return c
    }

    function n(a) {
        oa || (a = a ? 4 : 0,
            y = 8 + a + 0,
            T = 8 + a + 1,
            J = 8 + a + 2,
            oa = !0)
    }

    function v() {
        var a = T;
        T += 8;
        return q(a)
    }

    function U() {
        var a = y;
        y += 8;
        return q(a)
    }

    function E() {
        var a = J;
        J += 8;
        return q(a)
    }

    function Ka(a) {
        T = 1E5 * a;
        J = 1E5 * a
    }

    function Q(a, b, d, c) {
        d && a.writeSync(d, c);
        a.writeSync(b, c)
    }

    function gb(a, b, d) {
        var c, e = require("fs"), f = require("path"), C = f.join(a, "jalangi_sourcemap.js");
        c = b ? e.openSync(C, "w") : e.openSync(C, "a");
        var h = null;
        d && (h = e.openSync(u, "w"));
        Q(e, c, h, "(function (sandbox) {\n if (!sandbox.iids) {sandbox.iids = []; sandbox.orig2Inst = {}; }\n");
        Q(e, c, h, "var iids = sandbox.iids; var orig2Inst = sandbox.orig2Inst;\n");
        Q(e, c, h, 'var fn = "' + ba + '";\n');
        Object.keys(L).forEach(function (a) {
            var b = L[a];
            Q(e, c, h, "iids[" + a + "] = [fn," + b[1] + "," + b[2] + "," + b[3] + "," + b[4] + "];\n")
        });
        Object.keys(N).forEach(function (a) {
            Q(e, c, h, 'orig2Inst["' + a + '"] = "' + N[a] + '";\n')
        });
        Q(e, c, h, "}(typeof " + astUtil.JALANGI_VAR + " === 'undefined'? " + astUtil.JALANGI_VAR + " = {}:" + astUtil.JALANGI_VAR + "));\n");
        e.closeSync(c);
        d && e.closeSync(h);
        d = C.replace(/.js$/, ".json");
        C = [L, N];
        if (!b && e.existsSync(d)) {
            b = JSON.parse(e.readFileSync(d));
            var k = b[0]
                , l = b[1];
            Object.keys(L).forEach(function (a) {
                k[a] = L[a]
            });
            Object.keys(N).forEach(function (a) {
                l[a] = N[a]
            });
            C = [k, l]
        }
        e.writeFileSync(d, JSON.stringify(C));
        e.writeFileSync(f.join(a, "jalangi_coverage.json"), JSON.stringify({
            covered: 0,
            branches: y / 8 * 2,
            coverage: []
        }), "utf8")
    }

    function aa(a, b) {
        b && b.loc && (L[a] = [ba, b.loc.start.line, b.loc.start.column + 1, b.loc.end.line, b.loc.end.column + 1])
    }

    function w(a) {
        aa(T, a)
    }

    function A(a) {
        var b = arguments
            , d = acorn.parse(a);
        return astUtil.transformAst(d, {
            Identifier: function (a) {
                return 0 === a.name.indexOf(e) ? (a = parseInt(a.name.substring(e.length)),
                    b[a]) : a
            },
            BlockStatement: function (a) {
                "ExpressionStatement" === a.body[0].type && "[object Array]" === Object.prototype.toString.call(a.body[0].expression) && (a.body = a.body[0].expression);
                return a
            }
        }, void 0, void 0, !0).body
    }

    function z(a) {
        return A.apply(this, arguments)[0].expression
    }

    function q(a) {
        return {
            type: qa.Literal,
            value: a
        }
    }

    function R(a) {
        return {
            type: qa.Identifier,
            name: a
        }
    }

    function l(a, b) {
        b.loc && (a.loc = b.loc);
        b.raw && (a.raw = b.loc)
    }

    function la(a, b, d, c, D, f) {
        return !s.INSTR_READ || s.INSTR_READ(b, a) ? (w(a),
            b = z(Ia + "(" + e + "1, " + e + "2, " + e + "3," + (D ? "true" : "false") + "," + (f ? "true" : "false") + ")", c ? q(T - 8) : v(), b, d),
            l(b, a),
            b) : d
    }

    function Ca(a, b, d, c, D, f) {
        return !s.INSTR_WRITE || s.INSTR_WRITE(b, a) ? (w(a),
            b = z(Ha + "(" + e + "1, " + e + "2, " + e + "3, " + e + "4," + (D ? "true" : "false") + "," + (f ? "true" : "false") + ")", v(), b, d, c),
            l(b, a),
            b) : a
    }

    function p(a, b, d, c) {
        return !s.INSTR_WRITE || s.INSTR_WRITE(b, a) ? (w(a),
            b = z(Ha + "(" + e + "1, " + e + "2, " + e + "3, " + Ja + "(typeof(" + c.name + ")==='undefined'?undefined:" + c.name + "), true, true)", v(), b, d),
            l(b, a),
            b) : a
    }

    function ta(a, b, d, c) {
        b = z(e + "1 " + c + " " + e + "2", b, d);
        l(b, a);
        return b
    }

    function Na(a, b) {
        if ("undefined" !== b.name) {
            if ("NaN" === b.name)
                return NaN;
            if ("Infinity" === b.name)
                return Infinity;
            switch (a) {
                case 22:
                case 21:
                case 25:
                case 14:
                case 23:
                    return b.value;
                case 10:
                    return db;
                case 12:
                    return ab;
                case 11:
                    return Ra
            }
            throw Error(a + " not known");
        }
    }

    function ga(a, b, d) {
        if (!s.INSTR_LITERAL || s.INSTR_LITERAL(Na(d, a), a)) {
            w(a);
            var c;
            a: {
                if ("ObjectExpression" === a.type)
                    for (var D = a.properties.length, f = 0; f < D; f++)
                        if ("get" === (c = a.properties[f].kind) || "set" === c) {
                            c = !0;
                            break a
                        }
                c = !1
            }
            b = z(F + "(" + e + "1, " + e + "2, " + e + "3," + c + ")", v(), b, q(d));
            l(b, a);
            return b
        }
        return a
    }

    function G(a) {
        w(a);
        var b = z(Ma + "(" + astUtil.JALANGI_VAR + ".getConcrete(" + e + "1), {wrapProgram: false, isEval: true}," + e + "2).code", a, v());
        l(b, a);
        return b
    }

    function ca(a, b, d, c) {
        return !s.INSTR_BINARY || s.INSTR_BINARY(c, c) ? (aa(J, a),
            b = z(M + "(" + e + "1, " + e + "2, " + e + "3, " + e + "4)", E(), q(c), b, d),
            l(b, a),
            b) : a
    }

    function m(a, b) {
        if (!s.INSTR_CONDITIONAL || s.INSTR_CONDITIONAL("switch", a)) {
            aa(y, a);
            var d = z(P + "(" + e + "1, " + e + "2)", U(), b);
            l(d, a);
            return d
        }
        return a
    }

    function pa(a, b, d, c, D) {
        w(a);
        b = c ? A(e + "1 = " + Y + "(" + e + "2, " + e + "3, " + e + "4, " + c + ", false)", D, v(), b, d) : A(Y + "(" + e + "1, " + e + "2, " + e + "3, " + c + ", false)", v(), b, d);
        l(b[0].expression, a);
        return b
    }

    function x(a, b) {
        w(a);
        var d = v();
        w(a);
        var c = Oa++
            ,
            d = A("function n() { jalangiLabel" + c + ": while(true) { try {" + e + "1} catch(" + astUtil.JALANGI_VAR + "e) { //console.log(" + astUtil.JALANGI_VAR + "e); console.log(" + astUtil.JALANGI_VAR + "e.stack);\n " + k + "(" + e + "2," + astUtil.JALANGI_VAR + "e); } finally { if (" + wa + "(" + e + "3)) continue jalangiLabel" + c + ";\n else \n return " + xa + "();\n }\n }}", b, d, v())
            , d = d[0].body.body;
        l(d[0], a);
        return d
    }

    function ua(a, b, d) {
        var c = [];
        d || (d = R("arguments"),
            c = c.concat(pa(a, q("arguments"), d, !0, d)));
        if (b)
            for (var e in b.vars)
                Object.prototype.hasOwnProperty.call(b.vars, e) && ("defun" === b.vars[e] && (d = R(e),
                    d.loc = b.funLocs[e],
                    c = c.concat(pa(a, q(e), ga(d, d, 12), !0, d))),
                "arg" === b.vars[e] && (d = R(e),
                    c = c.concat(pa(a, q(e), d, !0, d))),
                "var" === b.vars[e] && (c = c.concat(pa(a, q(e), R(e), !1))));
        return c
    }

    function ha(a, b) {
        w(a);
        var d = A(Ua + "(" + e + "1,arguments.callee, this, arguments)", v());
        l(d[0].expression, a);
        return d.concat(ua(a, H, !1)).concat(b)
    }

    function B(a) {
        return a.computed ? a.property : q(a.property.name)
    }

    function W(a, b) {
        var d = a.callee;
        if ("MemberExpression" === d.type) {
            var c = d.object
                , d = B(d);
            w(a);
            aa(T + 2, a.callee);
            c = z(Qa + "(" + e + "1, " + e + "2, " + e + "3, " + (b ? "true" : "false") + ")", v(), c, d);
            l(c, a.callee);
            return c
        }
        if ("Identifier" === d.type && "eval" === d.name)
            return d;
        w(a);
        c = z(Ga + "(" + e + "1, " + e + "2, " + (b ? "true" : "false") + ")", v(), d);
        l(c, a.callee);
        return c
    }

    function ma(a) {
        if ("Identifier" === a.type) {
            if ("undefined" === a.name)
                return a = ga(a, a, 24);
            if ("NaN" === a.name || "Infinity" === a.name)
                return a = ga(a, a, 22);
            if (a.name === astUtil.JALANGI_VAR || "eval" === a.name)
                return a;
            if (H.hasVar(a.name))
                a = la(a, q(a.name), a, !1, !1, H.isGlobal(a.name));
            else {
                var b = a.name
                    ,
                    b = "location" !== b ? z("(" + Ja + "(typeof (" + b + ") === 'undefined'? (" + b + "=" + e + "2) : (" + b + "=" + e + "3)))", R(b), la(a, q(b), R("undefined"), !1, !0, !0), la(a, q(b), R(b), !0, !0, !0)) : z("(" + Ja + "(typeof (" + b + ") === 'undefined'? (" + e + "2) : (" + e + "3)))", R(b), la(a, q(b), R("undefined"), !1, !0, !0), la(a, q(b), R(b), !0, !0, !0));
                l(b, a);
                a = b
            }
            return a
        }
        if ("MemberExpression" === a.type) {
            var b = a.object
                , d = B(a);
            if (!s.INSTR_GETFIELD || s.INSTR_GETFIELD(a.computed ? null : d.value, a))
                w(a),
                    b = z(h + "(" + e + "1, " + e + "2, " + e + "3)", v(), b, d),
                    l(b, a),
                    a = b
        }
        return a
    }

    function S(a, b) {
        if ("Identifier" === a.left.type) {
            var d = ma(a.left);
            b && (d = ma(d),
                d = z(" + " + e + "1 ", d),
                l(d, a));
            d = ta(a.right, d, a.right, a.operator.substring(0, a.operator.length - 1));
            d = H.hasVar(a.left.name) ? Ca(a.right, q(a.left.name), d, a.left, !1, H.isGlobal(a.left.name)) : p(a.right, q(a.left.name), d, a.left);
            d = z(e + "1 = " + e + "2", a.left, d);
            l(d, a);
            return d
        }
        var d = a.left.object
            , c = B(a.left)
            , f = a.operator.substring(0, a.operator.length - 1)
            , h = a.right;
        !s.INSTR_PROPERTY_BINARY_ASSIGNMENT || s.INSTR_PROPERTY_BINARY_ASSIGNMENT(f, a.computed ? null : c.value, a) ? (w(a),
            d = z(Va + "(" + e + "1," + e + "2," + e + "3," + e + "4)(" + e + "5)", v(), d, c, q(f), h),
            l(d, a)) : d = a;
        return d
    }

    function Pa(a) {
        H = a.scope
    }

    function da(a) {
        var b;
        var d = b = a.test;
        null === b || s.INSTR_CONDITIONAL && !s.INSTR_CONDITIONAL("other", b) || (aa(y, b),
            d = z(O + "(" + e + "1, " + e + "2)", U(), d),
            l(d, b),
            b = d);
        a.test = b;
        return a
    }

    function va(a) {
        function b(a) {
            this.vars = {};
            this.funLocs = {};
            this.hasArguments = this.hasEval = !1;
            this.parent = a
        }

        function d(a) {
            var d = e;
            e = new b(e);
            a.scope = e;
            "FunctionDeclaration" === a.type ? (d.addVar(a.id.name, "defun", a.loc),
                X(a.params, function (a) {
                    "arguments" === a.name && (a.name = f);
                    e.addVar(a.name, "arg")
                })) : "FunctionExpression" === a.type && (null !== a.id && e.addVar(a.id.name, "lambda"),
                X(a.params, function (a) {
                    "arguments" === a.name && (a.name = f);
                    e.addVar(a.name, "arg")
                }))
        }

        function c(a) {
            e = e.parent;
            return a
        }

        b.prototype.addVar = function (a, b, d) {
            this.vars[a] = b;
            "defun" === b && (this.funLocs[a] = d)
        }
        ;
        b.prototype.hasOwnVar = function (a) {
            return this && Object.prototype.hasOwnProperty.call(this.vars, a) ? this.vars[a] : null
        }
        ;
        b.prototype.hasVar = function (a) {
            for (var b = this; null !== b;) {
                if (Object.prototype.hasOwnProperty.call(b.vars, a))
                    return b.vars[a];
                b = b.parent
            }
            return null
        }
        ;
        b.prototype.isGlobal = function (a) {
            for (var b = this; null !== b;) {
                if (Object.prototype.hasOwnProperty.call(b.vars, a) && (null !== b.parent || "catch" === b.vars[a]))
                    return !1;
                b = b.parent
            }
            return !0
        }
        ;
        b.prototype.addEval = function () {
            for (var a = this; null !== a;)
                a.hasEval = !0,
                    a = a.parent
        }
        ;
        b.prototype.addArguments = function () {
            for (var a = this; null !== a;)
                a.hasArguments = !0,
                    a = a.parent
        }
        ;
        b.prototype.usesEval = function () {
            return this.hasEval
        }
        ;
        b.prototype.usesArguments = function () {
            return this.hasArguments
        }
        ;
        var e = null
            , f = astUtil.JALANGI_VAR + "_arguments";
        astUtil.transformAst(a, {
            Program: c,
            FunctionDeclaration: c,
            FunctionExpression: c,
            Identifier: function (a, b) {
                b === astUtil.CONTEXT.RHS && "arguments" === a.name && e.hasOwnVar(f) && (a.name = f);
                return a
            },
            UpdateExpression: function (a) {
                "Identifier" === a.argument.type && "arguments" === a.argument.name && e.hasOwnVar(f) && (a.argument.name = f);
                return a
            },
            AssignmentExpression: function (a) {
                "Identifier" === a.left.type && "arguments" === a.left.name && e.hasOwnVar(f) && (a.left.name = f);
                return a
            }
        }, {
            Program: d,
            FunctionDeclaration: d,
            FunctionExpression: d,
            VariableDeclarator: function (a) {
                e.addVar(a.id.name, "var")
            },
            CatchClause: function (a) {
                e.addVar(a.param.name, "catch")
            }
        })
    }

    function Fa(a, b) {
        var d, c;
        c = 0;
        if (a.body) {
            var e = [];
            0 < a.body.length && "ExpressionStatement" === a.body[0].type && "CallExpression" === a.body[0].expression.type && a.body[0].expression.callee.object && "J$" === a.body[0].expression.callee.object.name && a.body[0].expression.callee.property && ("Se" === a.body[0].expression.callee.property.name || "Fe" === a.body[0].expression.callee.property.name) && (e.push(a.body[0]),
                c = 1);
            for (var f = c; f < a.body.length; f++)
                "FunctionDeclaration" === a.body[f].type && (e.push(a.body[f]),
                e.length !== f + 1 && b.push(a.body[f].id.name));
            for (f = c; f < a.body.length; f++)
                "FunctionDeclaration" !== a.body[f].type && e.push(a.body[f]);
            for (; 0 < a.body.length;)
                a.body.pop();
            for (f = 0; f < e.length; f++)
                a.body.push(e[f])
        }
        for (d in a)
            a.hasOwnProperty(d) && (c = a[d],
            "object" === typeof c && null !== c && "scope" !== d && Fa(c, b));
        return a
    }

    function Ta(a, b, d) {
        var c = b.wrapProgram
            , e = b.isEval;
        b = e && r.analysis && r.analysis.instrumentCode;
        if ("string" === typeof a) {
            d && J$.analysis && J$.analysis.instrumentCode && (a = J$.analysis.instrumentCode(d, a));
            if (!(0 > a.indexOf("// JALANGI DO NOT INSTRUMENT")) || e && r.noInstrEval)
                return window.iidToLocationMap = L,
                    {
                        code: a
                    };
            n(e);
            Ea = c;
            c = [cb, eb];
            e = [bb, void 0];
            a = acorn.parse(a, {
                locations: !0
            });
            va(a);
            for (var f = c.length, h = 0; h < f; h++)
                a = astUtil.transformAst(a, c[h], e[h], astUtil.CONTEXT.RHS);
            a = Fa(a, []);
            c = escodegen.generate(a);
            window.iidToLocationMap = L;
            c += "\n// JALANGI DO NOT INSTRUMENT\n";
            b && r.analysis.instrumentCode(d || -1, a);
            return {
                code: c,
                instAST: a,
                iidSourceInfo: L
            }
        }
        window.iidToLocationMap = L;
        return {
            code: a
        }
    }

    function Sa(a, b) {
        N = {};
        L = {};
        if (!b.dirIIDFile)
            throw Error("must provide dirIIDFile");
        ba = b.filename;
        u = b.instFileName;
        ba && u && (N[ba] = u);
        var c = b.dirIIDFile
            , e = b.initIID
            , f = require("path")
            , h = require("fs")
            , c = f.join(c ? c : process.cwd(), "jalangi_initialIID.json");
        if (e)
            oa = !1,
                n(!1);
        else
            try {
                var k = JSON.parse(h.readFileSync(c, "utf8"));
                y = k.condCount;
                T = k.iid;
                J = k.opIid;
                oa = !0
            } catch (l) {
                n(!1)
            }
        e = Object.prototype.hasOwnProperty.call(b, "wrapProgram") ? b.wrapProgram : !0;
        e = Ta(a, {
            wrapProgram: e,
            isEval: !1
        });
        k = b.dirIIDFile;
        c = require("path");
        h = require("fs");
        k = c.join(k ? k : process.cwd(), "jalangi_initialIID.json");
        h.writeFileSync(k, JSON.stringify({
            condCount: y,
            iid: T,
            opIid: J
        }));
        gb(b.dirIIDFile, b.initIID, b.inlineIID);
        return e
    }

    function I() {
        var a = new (require("argparse").ArgumentParser)({
            addHelp: !0,
            description: "Command-line utility to perform instrumentation"
        });
        a.addArgument(["--initIID"], {
            help: "Initialize IIDs to 0",
            action: "storeTrue"
        });
        a.addArgument(["--noInstrEval"], {
            help: "Do not instrument strings passed to evals",
            action: "storeTrue"
        });
        a.addArgument(["--inlineIID"], {
            help: "Inline IIDs in the instrumented file",
            action: "storeTrue"
        });
        a.addArgument(["--dirIIDFile"], {
            help: "Directory containing jalangi_sourcemap.js and jalangi_initialIID.json",
            defaultValue: process.cwd()
        });
        a.addArgument(["--out"], {
            help: "Instrumented file name (with path). The default is to append _jalangi_ to the original JS file name",
            defaultValue: void 0
        });
        a.addArgument(["file"], {
            help: "file to instrument",
            nargs: 1
        });
        a = a.parseArgs();
        0 === a.file.length && (console.error("must provide file to instrument"),
            process.exit(1));
        var b = a.file[0], c;
        c = require("path").resolve(process.cwd(), b);
        c = "undefined" !== typeof process && "win32" === process.platform ? c.split("\\").join("\\\\") : c;
        a.filename = c;
        a.instFileName = a.out ? a.out : b.replace(/.js$/, "_jalangi_.js");
        b = require("fs").readFileSync(b, "utf8");
        c = Sa(b, a).code;
        var b = a.inlineIID
            , e = a.noInstrEval
            , a = require("fs");
        require("path");
        c = astUtil.JALANGI_VAR + ".noInstrEval = " + e + ";\n" + c + "\n";
        b ? a.appendFileSync(u, c, "utf8") : a.writeFileSync(u, c, "utf8")
    }

    "undefined" === typeof acorn && (acorn = require("acorn"),
        escodegen = require("escodegen"),
        astUtil = require("./../utils/astUtil"),
        require("../Config"));
    var s = r.Config, e = astUtil.JALANGI_VAR + "_", Ua = astUtil.JALANGI_VAR + ".Fe", wa = astUtil.JALANGI_VAR + ".Fr",
        Ga = astUtil.JALANGI_VAR + ".F", Qa = astUtil.JALANGI_VAR + ".M", Va = astUtil.JALANGI_VAR + ".A",
        $ = astUtil.JALANGI_VAR + ".P", h = astUtil.JALANGI_VAR + ".G", f = astUtil.JALANGI_VAR + ".Se",
        ja = astUtil.JALANGI_VAR + ".Sr", Ia = astUtil.JALANGI_VAR + ".R", Ha = astUtil.JALANGI_VAR + ".W",
        Ja = astUtil.JALANGI_VAR + ".I", c = astUtil.JALANGI_VAR + ".H", F = astUtil.JALANGI_VAR + ".T",
        Y = astUtil.JALANGI_VAR + ".N", Ba = astUtil.JALANGI_VAR + ".Rt", xa = astUtil.JALANGI_VAR + ".Ra",
        k = astUtil.JALANGI_VAR + ".Ex", M = astUtil.JALANGI_VAR + ".B", ia = astUtil.JALANGI_VAR + ".U",
        O = astUtil.JALANGI_VAR + ".C", P = astUtil.JALANGI_VAR + ".C1", La = astUtil.JALANGI_VAR + ".C2",
        Z = astUtil.JALANGI_VAR + "._", Ma = astUtil.JALANGI_VAR + ".instrumentCode", qa = {
            AssignmentExpression: "AssignmentExpression",
            ArrayExpression: "ArrayExpression",
            BlockStatement: "BlockStatement",
            BinaryExpression: "BinaryExpression",
            BreakStatement: "BreakStatement",
            CallExpression: "CallExpression",
            CatchClause: "CatchClause",
            ConditionalExpression: "ConditionalExpression",
            ContinueStatement: "ContinueStatement",
            DoWhileStatement: "DoWhileStatement",
            DebuggerStatement: "DebuggerStatement",
            EmptyStatement: "EmptyStatement",
            ExpressionStatement: "ExpressionStatement",
            ForStatement: "ForStatement",
            ForInStatement: "ForInStatement",
            FunctionDeclaration: "FunctionDeclaration",
            FunctionExpression: "FunctionExpression",
            Identifier: "Identifier",
            IfStatement: "IfStatement",
            Literal: "Literal",
            LabeledStatement: "LabeledStatement",
            LogicalExpression: "LogicalExpression",
            MemberExpression: "MemberExpression",
            NewExpression: "NewExpression",
            ObjectExpression: "ObjectExpression",
            Program: "Program",
            Property: "Property",
            ReturnStatement: "ReturnStatement",
            SequenceExpression: "SequenceExpression",
            SwitchStatement: "SwitchStatement",
            SwitchCase: "SwitchCase",
            ThisExpression: "ThisExpression",
            ThrowStatement: "ThrowStatement",
            TryStatement: "TryStatement",
            UnaryExpression: "UnaryExpression",
            UpdateExpression: "UpdateExpression",
            VariableDeclaration: "VariableDeclaration",
            VariableDeclarator: "VariableDeclarator",
            WhileStatement: "WhileStatement",
            WithStatement: "WithStatement"
        }, u, y, T, J, oa = !1;
    y = 4;
    T = 5;
    J = 6;
    var ba = null, N = {}, L = {}, ab = function () {
    }, Ra = {}, db = [], Oa = 0, H, Ea = !0, bb = {
        Program: Pa,
        FunctionDeclaration: Pa,
        FunctionExpression: Pa
    }, cb = {
        Literal: function (a, b) {
            if (b === astUtil.CONTEXT.RHS) {
                var c;
                switch (typeof a.value) {
                    case "number":
                        c = 22;
                        break;
                    case "string":
                        c = 21;
                        break;
                    case "object":
                        c = null === a.value ? 25 : 14;
                        break;
                    case "boolean":
                        c = 23
                }
                return ga(a, a, c)
            }
            return a
        },
        Program: function (a) {
            if (Ea) {
                var b = a.body
                    , c = "string" === typeof u ? u : "internal";
                w(a);
                c = A(f + "(" + e + "1," + e + "2)", v(), q(c));
                l(c[0].expression, a);
                b = c.concat(ua(a, H, !0)).concat(b);
                a.body = b
            }
            H = H.parent;
            return a
        },
        VariableDeclaration: function (a) {
            var b = X(a.declarations, function (a) {
                if (null !== a.init) {
                    var b = Ca(a.init, q(a.id.name), a.init, a.id, !1, H.isGlobal(a.id.name));
                    a.init = b
                }
                return a
            });
            a.declarations = b;
            return a
        },
        NewExpression: function (a) {
            var b = {
                type: "CallExpression",
                callee: W(a, !0),
                arguments: a.arguments
            };
            l(b, a);
            return b
        },
        CallExpression: function (a) {
            var b = "Identifier" === a.callee.type && "eval" === a.callee.name
                , c = W(a, !1);
            a.callee = c;
            b && (a.arguments = X(a.arguments, G));
            return a
        },
        AssignmentExpression: function (a) {
            if ("=" === a.operator) {
                var b;
                if ("Identifier" === a.left.type)
                    b = H.hasVar(a.left.name) ? Ca(a.right, q(a.left.name), a.right, a.left, !1, H.isGlobal(a.left.name)) : p(a.right, q(a.left.name), a.right, a.left),
                        a.right = b;
                else {
                    b = a.left.object;
                    var c = B(a.left)
                        , g = a.right;
                    !s.INSTR_PUTFIELD || s.INSTR_PUTFIELD(a.computed ? null : c.value, a) ? (w(a),
                        b = z($ + "(" + e + "1, " + e + "2, " + e + "3, " + e + "4)", v(), b, c, g),
                        l(b, a)) : b = a;
                    a = b
                }
            } else
                a = S(a);
            return a
        },
        UpdateExpression: function (a) {
            var b;
            b = q(1);
            b = ta(a, a.argument, b, a.operator.substring(0, 1) + "=");
            b = S(b, !0);
            if (!a.prefix) {
                a = a.operator;
                a = "++" === a ? "-" : "+";
                var c = q(1);
                b = ta(b, b, c, a)
            }
            return b
        },
        FunctionExpression: function (a, b) {
            a.body.body = ha(a, a.body.body);
            var c;
            c = b === astUtil.CONTEXT.GETTER || b === astUtil.CONTEXT.SETTER ? a : ga(a, a, 12);
            H = H.parent;
            return c
        },
        FunctionDeclaration: function (a) {
            a.body.body = ha(a, a.body.body);
            H = H.parent;
            return a
        },
        ObjectExpression: function (a) {
            return ga(a, a, 11)
        },
        ArrayExpression: function (a) {
            return ga(a, a, 10)
        },
        ThisExpression: function (a) {
            return la(a, q("this"), a)
        },
        Identifier: function (a, b) {
            return b === astUtil.CONTEXT.RHS ? ma(a) : a
        },
        MemberExpression: function (a, b) {
            return b === astUtil.CONTEXT.RHS ? ma(a) : a
        },
        ForInStatement: function (a) {
            var b = a.right
                , d = a.right;
            w(b);
            d = z(c + "(" + e + "1, " + e + "2)", v(), d);
            l(d, b);
            a.right = d;
            b = a.body;
            d = "VariableDeclaration" === a.left.type ? a.left.declarations[0].id.name : a.left.name;
            w(a);
            b = A("function n() { " + Y + "(" + e + "1, '" + d + "'," + d + ",false, true);\n {" + e + "2}}", v(), [b]);
            b = b[0].body;
            l(b, a);
            a.body = b;
            return a
        },
        ReturnStatement: function (a) {
            var b = a.argument
                , c = null === b ? a : b;
            w(c);
            null === b && (b = R("undefined"));
            b = z(Ba + "(" + e + "1, " + e + "2)", v(), b);
            l(b, c);
            a.argument = b;
            return a
        }
    }, eb = {
        Program: function (a) {
            if (Ea) {
                var b = a.body;
                w(a);
                var c = v();
                w(a);
                var g = Oa++
                    ,
                    b = A("function n() { jalangiLabel" + g + ": while(true) { try {" + e + "1} catch(" + astUtil.JALANGI_VAR + "e) { //console.log(" + astUtil.JALANGI_VAR + "e); console.log(" + astUtil.JALANGI_VAR + "e.stack);\n " + k + "(" + e + "2," + astUtil.JALANGI_VAR + "e); } finally { if (" + ja + "(" + e + "3)) continue jalangiLabel" + g + ";\n else \n break jalangiLabel" + g + ";\n }\n }}", b, c, v())
                    , b = b[0].body.body;
                l(b[0], a);
                a.body = b
            }
            return a
        },
        BinaryExpression: function (a) {
            return ca(a, a.left, a.right, a.operator)
        },
        LogicalExpression: function (a) {
            var b;
            if ("&&" === a.operator) {
                b = a.left;
                var c = a.right;
                !s.INSTR_CONDITIONAL || s.INSTR_CONDITIONAL("&&", a) ? (aa(y, a),
                    b = z(O + "(" + e + "1, " + e + "2)?" + e + "3:" + Z + "()", U(), b, c),
                    l(b, a)) : b = a
            } else
                "||" === a.operator && (b = a.left,
                    c = a.right,
                    !s.INSTR_CONDITIONAL || s.INSTR_CONDITIONAL("||", a) ? (aa(y, a),
                        b = z(O + "(" + e + "1, " + e + "2)?" + Z + "():" + e + "3", U(), b, c),
                        l(b, a)) : b = a);
            return b
        },
        UnaryExpression: function (a) {
            if ("void" === a.operator)
                return a;
            if ("delete" === a.operator)
                a.argument.object && (a = ca(a, a.argument.object, B(a.argument), a.operator));
            else {
                var b = a.argument
                    , c = a.operator;
                if (!s.INSTR_UNARY || s.INSTR_UNARY(c, a))
                    aa(J, a),
                        b = z(ia + "(" + e + "1," + e + "2," + e + "3)", E(), q(c), b),
                        l(b, a),
                        a = b
            }
            return a
        },
        SwitchStatement: function (a) {
            var b = m(a.discriminant, a.discriminant)
                , c = X(a.cases, function (a) {
                var b;
                if (a.test) {
                    var c = b = a.test;
                    if (!s.INSTR_CONDITIONAL || s.INSTR_CONDITIONAL("switch", b))
                        aa(y, b),
                            c = z(La + "(" + e + "1, " + e + "2)", U(), c),
                            l(c, b),
                            b = c;
                    a.test = b
                }
                return a
            });
            a.discriminant = b;
            a.cases = c;
            return a
        },
        FunctionExpression: function (a) {
            a.body.body = x(a, a.body.body);
            return a
        },
        FunctionDeclaration: function (a) {
            a.body.body = x(a, a.body.body);
            return a
        },
        ConditionalExpression: da,
        IfStatement: da,
        WhileStatement: da,
        DoWhileStatement: da,
        ForStatement: da
    };
    "undefined" !== typeof exports && this.exports !== exports && (exports.instrumentCodeDeprecated = Sa);
    "undefined" === typeof window && "undefined" !== typeof require && require.main === module ? I() : (r.instrumentCode = Ta,
        r.setBaseIid = Ka)
})(window.esnstrument);
"undefined" === typeof J$ && (J$ = {});
J$.instrumentCode = esnstrument.instrumentCode;
J$.iidToLocation = function (r) {
    return window.getLocationFromIID ? window.getLocationFromIID(r) : "[iid]: " + r
}
;
window.getLocationFromIID = function (a) {
    var d = window.iidToLocationMap[a]
        , c = "";
    return c = d ? "line No.: " + d[1] + ", col: " + d[2] : "[iid]: " + a
};
// esnstrument.js END
window.JALANGI_MODE = "inbrowser";
// Config.js START
if (typeof J$ === 'undefined') {
    J$ = {};
}

(function (sandbox) {
    var Config = sandbox.Config = {};

    Config.DEBUG = false;
    Config.WARN = false;
    Config.SERIOUS_WARN = false;
// make MAX_BUF_SIZE slightly less than 2^16, to allow over low-level overheads
    Config.MAX_BUF_SIZE = 64000;
    Config.LOG_ALL_READS_AND_BRANCHES = false;

    //**********************************************************
    //  Functions for selective instrumentation of operations
    //**********************************************************
    // In the following functions
    // return true in a function, if you want the ast node (passed as the second argument) to be instrumented
    // ast node gets instrumented if you do not define the corresponding function
//    Config.INSTR_READ = function(name, ast) { return false; };
//    Config.INSTR_WRITE = function(name, ast) { return true; };
//    Config.INSTR_GETFIELD = function(offset, ast) { return true; }; // offset is null if the property is computed
//    Config.INSTR_PUTFIELD = function(offset, ast) { return true; }; // offset is null if the property is computed
//    Config.INSTR_BINARY = function(operator, ast) { return true; };
//    Config.INSTR_PROPERTY_BINARY_ASSIGNMENT = function(operator, offset, ast) { return true; }; // a.x += e or a[e1] += e2
//    Config.INSTR_UNARY = function(operator, ast) { return true; };
//    Config.INSTR_LITERAL = function(literal, ast) { return true;}; // literal gets some dummy value if the type is object, function, or array
//    Config.INSTR_CONDITIONAL = function(type, ast) { return true; }; // type could be "&&", "||", "switch", "other"
}(J$));
// Config.js END

// Constants.js START
if (typeof J$ === 'undefined') {
    J$ = {};
}

(function (sandbox) {
    var Constants = sandbox.Constants = {};

    Constants.isBrowser = !(typeof exports !== 'undefined' && this.exports !== exports);

    Constants.IN_MEMORY_TRACE = Constants.isBrowser && (window.__JALANGI_IN_MEMORY_TRACE__);

    var APPLY = Constants.APPLY = Function.prototype.apply;
    var CALL = Constants.CALL = Function.prototype.call;
    APPLY.apply = APPLY;
    APPLY.call = CALL;
    CALL.apply = APPLY;
    CALL.call = CALL;

    var HAS_OWN_PROPERTY = Constants.HAS_OWN_PROPERTY = Object.prototype.hasOwnProperty;
    Constants.HAS_OWN_PROPERTY_CALL = Object.prototype.hasOwnProperty.call;


    var PREFIX1 = "J$";
    Constants.SPECIAL_PROP = "*" + PREFIX1 + "*";
    Constants.SPECIAL_PROP2 = "*" + PREFIX1 + "I*";
    Constants.SPECIAL_PROP3 = "*" + PREFIX1 + "C*";
    Constants.SPECIAL_PROP4 = "*" + PREFIX1 + "W*";

    Constants.MODE_RECORD = 1;
    Constants.MODE_REPLAY = 2;
    Constants.MODE_NO_RR_IGNORE_UNINSTRUMENTED = 3;
    Constants.MODE_NO_RR = 4;
    Constants.MODE_DIRECT = 5;

    Constants.T_NULL = 0;
    Constants.T_NUMBER = 1;
    Constants.T_BOOLEAN = 2;
    var T_STRING = Constants.T_STRING = 3;
    Constants.T_OBJECT = 4;
    Constants.T_FUNCTION = 5;
    Constants.T_UNDEFINED = 6;
    Constants.T_ARRAY = 7;

    var F_TYPE = Constants.F_TYPE = 0;
    var F_VALUE = Constants.F_VALUE = 1;
    Constants.F_IID = 2;
    Constants.F_SEQ = 3;
    Constants.F_FUNNAME = 4;

    Constants.UNKNOWN = -1;

    Constants.N_LOG_FUNCTION_ENTER = 4;
    Constants.N_LOG_SCRIPT_ENTER = 6;
    Constants.N_LOG_GETFIELD = 8;
    Constants.N_LOG_ARRAY_LIT = 10;
    Constants.N_LOG_OBJECT_LIT = 11;
    Constants.N_LOG_FUNCTION_LIT = 12;
    Constants.N_LOG_RETURN = 13;
    Constants.N_LOG_REGEXP_LIT = 14;
    Constants.N_LOG_READ = 17;
    Constants.N_LOG_LOAD = 18;
    Constants.N_LOG_HASH = 19;
    Constants.N_LOG_SPECIAL = 20;
    Constants.N_LOG_STRING_LIT = 21;
    Constants.N_LOG_NUMBER_LIT = 22;
    Constants.N_LOG_BOOLEAN_LIT = 23;
    Constants.N_LOG_UNDEFINED_LIT = 24;
    Constants.N_LOG_NULL_LIT = 25;
    // property read *directly* from an object (not from the prototype chain)
    Constants.N_LOG_GETFIELD_OWN = 26;
    Constants.N_LOG_OPERATION = 27;

    //-------------------------------- End constants ---------------------------------

    //-------------------------------------- Constant functions -----------------------------------------------------------

    Constants.getConcrete = function (val) {
        if (sandbox.analysis && sandbox.analysis.getConcrete) {
            return sandbox.analysis.getConcrete(val);
        } else {
            return val;
        }
    }

    Constants.getSymbolic = function (val) {
        if (sandbox.analysis && sandbox.analysis.getSymbolic) {
            return sandbox.analysis.getSymbolic(val);
        } else {
            return val;
        }
    }

    var HOP = Constants.HOP = function (obj, prop) {
        return (prop + "" === '__proto__') || CALL.call(HAS_OWN_PROPERTY, obj, prop); //Constants.HAS_OWN_PROPERTY_CALL.apply(Constants.HAS_OWN_PROPERTY, [obj, prop]);
    }

    Constants.hasGetterSetter = function (obj, prop, isGetter) {
        if (typeof Object.getOwnPropertyDescriptor !== 'function') {
            return true;
        }
        while (obj !== null) {
            if (typeof obj !== 'object' && typeof obj !== 'function') {
                return false;
            }
            var desc = Object.getOwnPropertyDescriptor(obj, prop);
            if (desc !== undefined) {
                if (isGetter && typeof desc.get === 'function') {
                    return true;
                }
                if (!isGetter && typeof desc.set === 'function') {
                    return true;
                }
            } else if (HOP(obj, prop)) {
                return false;
            }
            obj = obj.__proto__;
        }
        return false;
    }

    Constants.debugPrint = function (s) {
        if (sandbox.Config.DEBUG) {
            console.log("***" + s);
        }
    }

    Constants.warnPrint = function (iid, s) {
        if (sandbox.Config.WARN && iid !== 0) {
            console.log("        at " + iid + " " + s);
        }
    }

    Constants.seriousWarnPrint = function (iid, s) {
        if (sandbox.Config.SERIOUS_WARN && iid !== 0) {
            console.log("        at " + iid + " Serious " + s);
        }
    }

    Constants.encodeNaNandInfForJSON = function (key, value) {
        if (value === Infinity) {
            return "Infinity";
        } else if (value !== value) {
            return "NaN";
        }
        return value;
    }

    Constants.decodeNaNandInfForJSON = function (key, value) {
        if (value === "Infinity") {
            return Infinity;
        } else if (value === 'NaN') {
            return NaN;
        } else {
            return value;
        }
    }

    Constants.fixForStringNaN = function (record) {
        if (record[F_TYPE] == T_STRING) {
            if (record[F_VALUE] !== record[F_VALUE]) {
                record[F_VALUE] = 'NaN';
            } else if (record[F_VALUE] === Infinity) {
                record[F_VALUE] = 'Infinity';
            }

        }
    }

})(J$);

// Constants.js END

//Globals.js START
if (typeof J$ === 'undefined') {
    J$ = {};
}


(function (sandbox) {
    var Globals = sandbox.Globals = {};
    Globals.mode;
    Globals.isInstrumentedCaller;
    Globals.isMethodCall;
    Globals.isConstructorCall;
    Globals.isBrowserReplay;
    Globals.traceFileName;
    Globals.traceWriter;
    Globals.loadAndBranchLogs = [];

}(J$));
//Globals.js END

// SMemory.js START
//----------------------------------- Record Replay Engine ---------------------------------

// create / reset J$ global variable to hold analysis runtime
if (typeof J$ === 'undefined') {
    J$ = {};
}

(function (sandbox) {
    sandbox.SMemory = function () {
        var Constants = sandbox.Constants;

        var SPECIAL_PROP = Constants.SPECIAL_PROP + "M";
        var SPECIAL_PROP2 = Constants.SPECIAL_PROP2 + "M";
        var SPECIAL_PROP3 = Constants.SPECIAL_PROP3 + "M";
        var N_LOG_FUNCTION_LIT = Constants.N_LOG_FUNCTION_LIT;
        var objectId = 1;
        var frameId = 2;
        var scriptCount = 0;
        var HOP = Constants.HOP;


        var frame = Object.create(null);
        //frame[SPECIAL_PROP] = frameId;
        //frameId = frameId + 2;

        var frameStack = [frame];
        var evalFrames = [];


        function createShadowObject(val) {
            var type = typeof val;
            if ((type === 'object' || type === 'function') && val !== null && !HOP(val, SPECIAL_PROP)) {
                if (Object && Object.defineProperty && typeof Object.defineProperty === 'function') {
                    Object.defineProperty(val, SPECIAL_PROP, {
                        enumerable: false,
                        writable: true
                    });
                }
                try {
                    val[SPECIAL_PROP] = Object.create(null);
                    val[SPECIAL_PROP][SPECIAL_PROP] = objectId;
                    objectId = objectId + 2;
                } catch (e) {
                    // cannot attach special field in some DOM Objects.  So ignore them.
                }
            }

        }

        this.getShadowObject = function (val) {
            var value;
            createShadowObject(val);
            var type = typeof val;
            if ((type === 'object' || type === 'function') && val !== null && HOP(val, SPECIAL_PROP)) {
                value = val[SPECIAL_PROP];
            } else {
                value = undefined;
            }
            return value;
        };

        this.getFrame = function (name) {
            var tmp = frame;
            while (tmp && !HOP(tmp, name)) {
                tmp = tmp[SPECIAL_PROP3];
            }
            if (tmp) {
                return tmp;
            } else {
                return frameStack[0]; // return global scope
            }
        };

        this.getParentFrame = function (otherFrame) {
            if (otherFrame) {
                return otherFrame[SPECIAL_PROP3];
            } else {
                return null;
            }
        };

        this.getCurrentFrame = function () {
            return frame;
        };

        this.getClosureFrame = function (fun) {
            return fun[SPECIAL_PROP3];
        };

        this.getShadowObjectID = function (obj) {
            return obj[SPECIAL_PROP];
        };

        this.defineFunction = function (val, type) {
            if (type === N_LOG_FUNCTION_LIT) {
                if (Object && Object.defineProperty && typeof Object.defineProperty === 'function') {
                    Object.defineProperty(val, SPECIAL_PROP3, {
                        enumerable: false,
                        writable: true
                    });
                }
                val[SPECIAL_PROP3] = frame;
            }
        };

        this.evalBegin = function () {
            evalFrames.push(frame);
            frame = frameStack[0];
        };

        this.evalEnd = function () {
            frame = evalFrames.pop();
        };


        this.initialize = function (name) {
            frame[name] = undefined;
        };

        this.functionEnter = function (val) {
            frameStack.push(frame = Object.create(null));
            if (Object && Object.defineProperty && typeof Object.defineProperty === 'function') {
                Object.defineProperty(frame, SPECIAL_PROP3, {
                    enumerable: false,
                    writable: true
                });
            }
            frame[SPECIAL_PROP3] = val[SPECIAL_PROP3];
        };

        this.functionReturn = function () {
            frameStack.pop();
            frame = frameStack[frameStack.length - 1];
        };

        this.scriptEnter = function () {
            scriptCount++;
            if (scriptCount > 1) {
                frameStack.push(frame = Object.create(null));
                //frame[SPECIAL_PROP] = frameId;
                //frameId = frameId + 2;
                frame[SPECIAL_PROP3] = frameStack[0];
            }
        };

        this.scriptReturn = function () {
            if (scriptCount > 1) {
                frameStack.pop();
                frame = frameStack[frameStack.length - 1];
            }
            scriptCount--;
        };

    };

}(J$));


// SMemory.js END

// astUtil.js START
/*
 * Copyright 2013 Samsung Information Systems America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: Koushik Sen
// Author: Manu Sridharan

/*jslint node: true */
/*global window */

(function () {
    function HOP(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    /**
     * name of the global variable holding the Jalangi runtime objects
     */
    var JALANGI_VAR = "J$";

    /**
     * information on surrounding AST context, to be used by visitors passed
     * to transformAst()
     */
    var CONTEXT = {
        // TODO what is this?
        RHS: 1,
        // TODO what is this?
        IGNORE: 2,
        // inside the properties of an ObjectExpression
        OEXP: 3,
        // inside the formal parameters of a FunctionDeclaration or FunctionExpression
        PARAMS: 4,
        // TODO what is this?
        OEXP2: 5,
        // inside a getter
        GETTER: 6,
        // inside a setter
        SETTER: 7
    };

    /**
     * invoked by transformAst() to see if a sub-ast should be ignored.  For now,
     * only ignoring calls to J$.I()
     */
    function ignoreSubAst(node) {
        return node.type === 'CallExpression' && node.callee.type === 'MemberExpression' &&
            node.callee.object.type === 'Identifier' && node.callee.object.name === JALANGI_VAR &&
            node.callee.property.type === 'Identifier' && node.callee.property.name === 'I';
    }

    /**
     * generic AST visitor that allows for AST transformation.
     *
     * @param object the root AST node to be visited
     * @param visitorPost an object defining visitor methods to be executed after a node's children
     * have been visited.  The properties of visitorPost should be named with AST node types, and the
     * property values should be functions that take the node to be visited and a context value (see
     * the CONTEXT object above).  E.g., a post-visitor could be:
     * { 'AssignmentExpression': function (node, context) {
     *      // node.type === 'AssignmentExpression'
     *   }
     * }
     * The value returned by the visitorPost method for a node will replace the node in the AST.
     * @param visitorPre an object defining visitor methods to be executed before a node's children
     * have been visited.  Structure should be similar to visitorPost (see above).  The return value
     * of visitorPre functions is ignored.
     * @param context the context of the surrounding AST; see the CONTEXT object above
     * @param {boolean?} noIgnore if true, no sub-ast will be ignored.  Otherwise, sub-ASTs will be ignored
     * if ignoreAST() returns true.
     */
    function transformAst(object, visitorPost, visitorPre, context, noIgnore) {
        var key, child, type, ret, newContext;

        type = object.type;
        if (visitorPre && HOP(visitorPre, type)) {
            visitorPre[type](object, context);
        }

        for (key in object) {
//            if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key !== "scope" && (noIgnore || !ignoreSubAst(object))) {
                if ((type === 'AssignmentExpression' && key === 'left') ||
                    (type === 'UpdateExpression' && key === 'argument') ||
                    (type === 'UnaryExpression' && key === 'argument' && object.operator === 'delete') ||
                    (type === 'ForInStatement' && key === 'left') ||
                    ((type === 'FunctionExpression' || type === 'FunctionDeclaration') && key === 'id') ||
                    (type === 'LabeledStatement' && key === 'label') ||
                    (type === 'BreakStatement' && key === 'label') ||
                    (type === 'CatchClause' && key === 'param') ||
                    (type === 'ContinueStatement' && key === 'label') ||
                    ((type === 'CallExpression' || type === 'NewExpression') &&
                        key === 'callee' &&
                        (object.callee.type === 'MemberExpression' ||
                            (object.callee.type === 'Identifier' && object.callee.name === 'eval'))) ||
                    (type === 'VariableDeclarator' && key === 'id') ||
                    (type === 'MemberExpression' && !object.computed && key === 'property')) {
                    newContext = CONTEXT.IGNORE;
                } else if (type === 'ObjectExpression' && key === 'properties') {
                    newContext = CONTEXT.OEXP;
                } else if ((type === 'FunctionExpression' || type === 'FunctionDeclaration') && key === 'params') {
                    newContext = CONTEXT.PARAMS;
                } else if (context === CONTEXT.OEXP) {
                    newContext = CONTEXT.OEXP2;
                } else if (context === CONTEXT.OEXP2 && key === 'key') {
                    newContext = CONTEXT.IGNORE;
                } else if (context === CONTEXT.PARAMS) {
                    newContext = CONTEXT.IGNORE;
                } else if (object.key && key === 'value' && object.kind === 'get') {
                    newContext = CONTEXT.GETTER;
                } else if (object.key && key === 'value' && object.kind === 'set') {
                    newContext = CONTEXT.SETTER;
                } else if (type === 'CallExpression' && key === 'callee' && child.type === 'Identifier' && child.name === 'eval') {
                    newContext = CONTEXT.IGNORE;
                } else {
                    newContext = CONTEXT.RHS;
                }
                object[key] = transformAst(child, visitorPost, visitorPre, newContext, noIgnore);

            }
//            }
        }

        if (visitorPost && HOP(visitorPost, type)) {
            ret = visitorPost[type](object, context);
        } else {
            ret = object;
        }
        return ret;

    }

    /**
     * computes a map from iids to the corresponding AST nodes for root.  The root AST is destructively updated to
     * include SymbolicReference nodes that reference other nodes by iid, in order to save space in the map.
     */
    function serialize(root) {
        // Stores a pointer to the most-recently encountered node representing a function or a
        // top-level script.  We need this stored pointer since a function expression or declaration
        // has no associated IID, but we'd like to have the ASTs as entries in the table.  Instead,
        // we associate the AST with the IID for the corresponding function-enter or script-enter IID.
        // We don't need a stack here since we only use this pointer at the next function-enter or script-enter,
        // and there cannot be a nested function declaration in-between.
        var parentFunOrScript = root;
        var iidToAstTable = {};

        function handleFun(node) {
            parentFunOrScript = node;
        }

        var visitorPre = {
            'Program': handleFun,
            'FunctionDeclaration': handleFun,
            'FunctionExpression': handleFun
        };

        function canMakeSymbolic(node) {
            if (node.callee.object) {
                var callee = node.callee;
                // we can replace calls to J$ functions with a SymbolicReference iff they have an IID as their first
                // argument.  'instrumentCode', 'getConcrete', and 'I' do not take an IID.
                // TODO are we missing other cases?
                if (callee.object.name === 'J$' && callee.property.name !== "instrumentCode" &&
                    callee.property.name !== "getConcrete" &&
                    callee.property.name !== "I" && node.arguments[0]) {
                    return true;
                }
            }
            return false;
        }

        function setSerializedAST(iid, ast) {
            var entry = iidToAstTable[iid];
            if (!entry) {
                entry = {};
                iidToAstTable[iid] = entry;
            }
            entry.serializedAST = ast;
        }

        var visitorPost = {
            'CallExpression': function (node) {
                try {
                    if (node.callee.object && node.callee.object.name === 'J$' && (node.callee.property.name === 'Se' || node.callee.property.name === 'Fe')) {
                        // associate IID with the AST of the containing function / script
                        setSerializedAST(node.arguments[0].value, parentFunOrScript);
                        return node;
                    } else if (canMakeSymbolic(node)) {
                        setSerializedAST(node.arguments[0].value, node);
                        return {type: "SymbolicReference", value: node.arguments[0].value};
                    }
                    return node;
                } catch (e) {
                    console.log(JSON.stringify(node));
                    throw e;
                }
            }
        };

        transformAst(root, visitorPost, visitorPre);
        return iidToAstTable;
    }

    /**
     * given an iidToAstTable constructed by the serialize() function, destructively
     * update the AST values to remove SymbolicReference nodes, replacing them with a
     * pointer to the appropriate actual AST node.
     */
    function deserialize(iidToAstTable) {
        Object.keys(iidToAstTable).forEach(function (iid) {
            var curAst = iidToAstTable[iid].serializedAST;
            if (curAst) {
                var visitorPost = {
                    'SymbolicReference': function (node) {
                        var targetAST = iidToAstTable[node.value].serializedAST;
                        if (!targetAST) {
                            throw "bad symbolic reference";
                        }
                        return targetAST;
                    }
                };
                transformAst(curAst, visitorPost);
            }
        });
    }

    /**
     * given an instrumented AST, returns an array of IIDs corresponding to "top-level expressions,"
     * i.e., expressions that are not nested within another
     * @param ast
     */
    function computeTopLevelExpressions(ast) {
        var exprDepth = 0;
        var exprDepthStack = [];
        var topLevelExprs = [];
        var visitorIdentifyTopLevelExprPre = {
            "CallExpression": function (node) {
                if (node.callee.type === 'MemberExpression' &&
                    node.callee.object.type === 'Identifier' &&
                    node.callee.object.name === JALANGI_VAR) {
                    var funName = node.callee.property.name;
                    if ((exprDepth === 0 &&
                            (funName === 'A' ||
                                funName === 'P' ||
                                funName === 'G' ||
                                funName === 'R' ||
                                funName === 'W' ||
                                funName === 'H' ||
                                funName === 'T' ||
                                funName === 'Rt' ||
                                funName === 'B' ||
                                funName === 'U' ||
                                funName === 'C' ||
                                funName === 'C1' ||
                                funName === 'C2'
                            )) ||
                        (exprDepth === 1 &&
                            (funName === 'F' ||
                                funName === 'M'))) {
                        topLevelExprs.push(node.arguments[0].value);
                    }
                    exprDepth++;
                } else if (node.callee.type === 'CallExpression' &&
                    node.callee.callee.type === 'MemberExpression' &&
                    node.callee.callee.object.type === 'Identifier' &&
                    node.callee.callee.object.name === JALANGI_VAR &&
                    (node.callee.callee.property.name === 'F' ||
                        node.callee.callee.property.name === 'M')) {
                    exprDepth++;
                }
            },
            "FunctionExpression": function (node, context) {
                exprDepthStack.push(exprDepth);
                exprDepth = 0;
            },
            "FunctionDeclaration": function (node) {
                exprDepthStack.push(exprDepth);
                exprDepth = 0;
            }

        };

        var visitorIdentifyTopLevelExprPost = {
            "CallExpression": function (node) {
                if (node.callee.type === 'MemberExpression' &&
                    node.callee.object.type === 'Identifier' &&
                    node.callee.object.name === JALANGI_VAR) {
                    exprDepth--;
                } else if (node.callee.type === 'CallExpression' &&
                    node.callee.callee.type === 'MemberExpression' &&
                    node.callee.callee.object.type === 'Identifier' &&
                    node.callee.callee.object.name === JALANGI_VAR &&
                    (node.callee.callee.property.name === 'F' ||
                        node.callee.callee.property.name === 'M')) {
                    exprDepth--;
                }
                return node;
            },
            "FunctionExpression": function (node, context) {
                exprDepth = exprDepthStack.pop();
                return node;
            },
            "FunctionDeclaration": function (node) {
                exprDepth = exprDepthStack.pop();
                return node;
            }
        };
        transformAst(ast, visitorIdentifyTopLevelExprPost, visitorIdentifyTopLevelExprPre, CONTEXT.RHS);
        return topLevelExprs;
    }

    // handle node.js and browser
    // TODO use browserify
    var exportObj;
    if (typeof exports === 'undefined') {
        exportObj = {};
        if (typeof window !== 'undefined') {
            window.astUtil = exportObj;
        }
    } else {
        exportObj = exports;
    }
    exportObj.serialize = serialize;
    exportObj.deserialize = deserialize;
    exportObj.JALANGI_VAR = JALANGI_VAR;
    exportObj.CONTEXT = CONTEXT;
    exportObj.transformAst = transformAst;
    exportObj.computeTopLevelExpressions = computeTopLevelExpressions;
})();

// astUtil.js END

// analysis.js START
/*
 * Copyright 2013 Samsung Information Systems America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: Koushik Sen


/*
 To perform analysis in browser without recording, set window.JALANGI_MODE to 'inbrowser' and J$.analysis to a suitable analysis file.
 In the inbrowser mode, one has access to the object J$.smemory, which denotes the shadow memory.
 smemory.getShadowObject(obj) returns the shadow object associated with obj if type of obj is "object" or "function".
 smemory.getFrame(varName) returns the activation frame that contains the variable named "varName".
 To redefine all instrumentation functions, set JALANGI_MODE to 'symbolic' and J$.analysis to a suitable library containing redefinitions of W, R, etc.

 */

/*jslint node: true browser: true */
/*global J$ alert */

// wrap in anonymous function to create local namespace when in browser
// create / reset J$ global variable to hold analysis runtime
if (typeof J$ === 'undefined') {
    J$ = {};
}

window = {String: String, Array: Array, Error: Error, Number: Number, Date: Date, Boolean: Boolean, RegExp: RegExp};

(function (sandbox) {
    var Constants = sandbox.Constants;
    var Globals = sandbox.Globals;
    var Config = sandbox.Config;
    var SMemory = sandbox.SMemory;
    var RecordReplayEngine = sandbox.RecordReplayEngine;

//    var Globals = (typeof sandbox.Globals === 'undefined'? require('./Globals.js'): sandbox.Globals);
//    var Config = (typeof sandbox.Config === 'undefined'? require('./Config.js'): sandbox.Config);
//    var RecordReplayEngine = (typeof sandbox.RecordReplayEngine === 'undefined'? require('./RecordReplayEngine.js'): sandbox.RecordReplayEngine);


    function init(mode_name, analysis_script, initSMemory) {

        var MODE_RECORD = Constants.MODE_RECORD,
            MODE_REPLAY = Constants.MODE_REPLAY,
            MODE_NO_RR_IGNORE_UNINSTRUMENTED = Constants.MODE_NO_RR_IGNORE_UNINSTRUMENTED,
            MODE_NO_RR = Constants.MODE_NO_RR,
            MODE_DIRECT = Constants.MODE_DIRECT;
        var getConcrete = Constants.getConcrete;
        var HOP = Constants.HOP;
        var EVAL_ORG = eval;
        var isBrowser = Constants.isBrowser;


        var SPECIAL_PROP = Constants.SPECIAL_PROP;
        var SPECIAL_PROP2 = Constants.SPECIAL_PROP2;
        var SPECIAL_PROP3 = Constants.SPECIAL_PROP3;

        var N_LOG_FUNCTION_LIT = Constants.N_LOG_FUNCTION_LIT,
            N_LOG_RETURN = Constants.N_LOG_RETURN,
            N_LOG_OPERATION = Constants.N_LOG_OPERATION;


        var mode = Globals.mode = (function (str) {
            switch (str) {
                case "record" :
                    return MODE_RECORD;
                case "replay":
                    return MODE_REPLAY;
                case "analysis":
                    return MODE_NO_RR_IGNORE_UNINSTRUMENTED;
                case "inbrowser":
                    return MODE_NO_RR;
                case "symbolic":
                    return MODE_DIRECT;
                default:
                    return MODE_RECORD;
            }
        })(mode_name);
        var isBrowserReplay = Globals.isBrowserReplay = Constants.isBrowser && Globals.mode === MODE_REPLAY;
        Globals.isInstrumentedCaller = false;
        Globals.isConstructorCall = false;
        Globals.isMethodCall = false;

        if (Globals.mode === MODE_DIRECT) {
            /* JALANGI_ANALYSIS file must define all instrumentation functions such as U, B, C, C1, C2, W, R, G, P */
            if (analysis_script) {
                require(require('path').resolve(analysis_script))(sandbox);
                if (sandbox.postLoad) {
                    sandbox.postLoad();
                }
            }
        } else {

            var rrEngine;
            var branchCoverageInfo;
            var smemory;


            if (mode === MODE_RECORD || mode === MODE_REPLAY) {
                rrEngine = new RecordReplayEngine();
            }
            if (initSMemory) {
                sandbox.smemory = smemory = new SMemory();
            }


            //-------------------------------------- Symbolic functions -----------------------------------------------------------

            function create_fun(f) {
                return function () {
                    var len = arguments.length;
                    for (var i = 0; i < len; i++) {
                        arguments[i] = getConcrete(arguments[i]);
                    }
                    return f.apply(getConcrete(this), arguments);
                }
            }

            function concretize(obj) {
                for (var key in obj) {
                    if (HOP(obj, key)) {
                        obj[key] = getConcrete(obj[key]);
                    }
                }
            }

            function modelDefineProperty(f) {
                return function () {
                    var len = arguments.length;
                    for (var i = 0; i < len; i++) {
                        arguments[i] = getConcrete(arguments[i]);
                    }
                    if (len === 3) {
                        concretize(arguments[2]);
                    }
                    return f.apply(getConcrete(this), arguments);
                }
            }

            function getSymbolicFunctionToInvokeAndLog(f, isConstructor) {
                if (f === Array ||
                    f === Error ||
                    f === String ||
                    f === Number ||
                    f === Date ||
                    f === Boolean ||
                    f === RegExp ||
                    f === sandbox.addAxiom ||
                    f === sandbox.readInput) {
                    return [f, true];
                } else if (//f === Function.prototype.apply ||
                //f === Function.prototype.call ||
                f === console.log ||
                (typeof getConcrete(arguments[0]) === 'string' && f === RegExp.prototype.test) || // fixes bug in minPathDev.js
                f === String.prototype.indexOf ||
                f === String.prototype.lastIndexOf ||
                f === String.prototype.substring ||
                f === String.prototype.substr ||
                f === String.prototype.charCodeAt ||
                f === String.prototype.charAt ||
                f === String.prototype.replace ||
                f === String.fromCharCode ||
                f === Math.abs ||
                f === Math.acos ||
                f === Math.asin ||
                f === Math.atan ||
                f === Math.atan2 ||
                f === Math.ceil ||
                f === Math.cos ||
                f === Math.exp ||
                f === Math.floor ||
                f === Math.log ||
                f === Math.max ||
                f === Math.min ||
                f === Math.pow ||
                f === Math.round ||
                f === Math.sin ||
                f === Math.sqrt ||
                f === Math.tan ||
                f === parseInt) {
                    return [create_fun(f), false];
                } else if (f === Object.defineProperty) {
                    return [modelDefineProperty(f), false];
                }
                return [null, true];
            }


            //---------------------------- Utility functions -------------------------------
            function addAxiom(c) {
                if (sandbox.analysis && sandbox.analysis.installAxiom) {
                    sandbox.analysis.installAxiom(c);
                }
            }

            var loadAndBranchLogs = Globals.loadAndBranchLogs;

            function printValueForTesting(loc, iid, val) {
                if (!Config.LOG_ALL_READS_AND_BRANCHES) return;
                var type = typeof val, str;
                if (type !== 'object' && type !== 'function') {
                    str = loc + ":" + iid + ":" + type + ":" + val;
                    loadAndBranchLogs.push(str);
                } else if (val === null) {
                    str = loc + ":" + iid + ":" + type + ":" + val;
                    loadAndBranchLogs.push(str);
                } else if (HOP(val, SPECIAL_PROP) && HOP(val[SPECIAL_PROP], SPECIAL_PROP)) {
                    str = loc + ":" + iid + ":" + type + ":" + val[SPECIAL_PROP][SPECIAL_PROP];
                    loadAndBranchLogs.push(str);
                } else {
                    str = loc + ":" + iid + ":" + type + ":object";
                    loadAndBranchLogs.push(str);
                }
            }

            //---------------------------- End utility functions -------------------------------


            //----------------------------------- Begin Jalangi Library backend ---------------------------------

            // stack of return values from instrumented functions.
            // we need to keep a stack since a function may return and then
            // have another function call in a finally block (see test
            // call_in_finally.js)
            var returnVal = [];
            var exceptionVal;
            var scriptCount = 0;
            var lastVal;
            var switchLeft;
            var switchKeyStack = [];
            var argIndex;


            /**
             * invoked when the client analysis throws an exception
             * @param e
             */
            function clientAnalysisException(e) {
                console.error("analysis exception!!!");
                console.error(e.stack);
                if (isBrowser) {
                    // we don't really know what will happen to the exception,
                    // but we don't have a way to just terminate, so throw it
                    throw e;
                } else {
                    // under node.js, just die
                    process.exit(1);
                }
            }

            function isNative(f) {
                return f.toString().indexOf('[native code]') > -1 || f.toString().indexOf('[object ') === 0;
            }

            function callAsNativeConstructorWithEval(Constructor, args) {
                var a = [];
                for (var i = 0; i < args.length; i++)
                    a[i] = 'args[' + i + ']';
                var eval = EVAL_ORG;
                return eval('new Constructor(' + a.join() + ')');
            }

            function callAsNativeConstructor(Constructor, args) {
                if (args.length === 0) {
                    return new Constructor();
                }
                if (args.length === 1) {
                    return new Constructor(args[0]);
                }
                if (args.length === 2) {
                    return new Constructor(args[0], args[1]);
                }
                if (args.length === 3) {
                    return new Constructor(args[0], args[1], args[2]);
                }
                if (args.length === 4) {
                    return new Constructor(args[0], args[1], args[2], args[3]);
                }
                if (args.length === 5) {
                    return new Constructor(args[0], args[1], args[2], args[3], args[4]);
                }
                return callAsNativeConstructorWithEval(Constructor, args);
            }

            function callAsConstructor(Constructor, args) {
//                if (isNative(Constructor)) {
                if (true) {
                    var ret = callAsNativeConstructor(Constructor, args);
                    return ret;
                } else {
                    var Temp = function () {
                    }, inst, ret;
                    Temp.prototype = getConcrete(Constructor.prototype);
                    inst = new Temp;
                    ret = Constructor.apply(inst, args);
                    return Object(ret) === ret ? ret : inst;
                }
            }


            function invokeEval(base, f, args) {
                if (rrEngine) {
                    rrEngine.RR_evalBegin();
                }
                if (smemory) {
                    smemory.evalBegin();
                }
                try {
                    return f(sandbox.instrumentCode(getConcrete(args[0]), {wrapProgram: false, isEval: true}).code);
                } finally {
                    if (rrEngine) {
                        rrEngine.RR_evalEnd();
                    }
                    if (smemory) {
                        smemory.evalEnd();
                    }
                }
            }

            //------------------------------- EDIT -------------------------------
            // EDIT jalangi orignial code to allow filename info to be passed
            // Original code:
            // "function invokeFun(iid, base, f, args, isConstructor, isMethod){"
            //------------------------------- EDIT -------------------------------
            function invokeFun(iid, base, f, args, isConstructor, isMethod, filename) {
                // debugger;
                var g, invoke, val, ic, tmp_rrEngine, tmpIsConstructorCall, tmpIsInstrumentedCaller, idx,
                    tmpIsMethodCall;

                var f_c = getConcrete(f);

                tmpIsConstructorCall = Globals.isConstructorCall;
                Globals.isConstructorCall = isConstructor;
                tmpIsMethodCall = Globals.isMethodCall;
                Globals.isMethodCall = isMethod;


                if (sandbox.analysis && sandbox.analysis.invokeFunPre) {
                    tmp_rrEngine = rrEngine;
                    rrEngine = null;
                    try {
                        sandbox.analysis.invokeFunPre(iid, f, base, args, isConstructor);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    rrEngine = tmp_rrEngine;
                }


                var arr = getSymbolicFunctionToInvokeAndLog(f_c, isConstructor);
                tmpIsInstrumentedCaller = Globals.isInstrumentedCaller;
                ic = Globals.isInstrumentedCaller = f_c === undefined || HOP(f_c, SPECIAL_PROP2) || typeof f_c !== "function";

                if (mode === MODE_RECORD || mode === MODE_NO_RR) {
                    invoke = true;
                    g = f_c;
                } else if (mode === MODE_REPLAY || mode === MODE_NO_RR_IGNORE_UNINSTRUMENTED) {
                    invoke = arr[0] || Globals.isInstrumentedCaller;
                    g = arr[0] || f_c;
                }

                pushSwitchKey();
                try {
                    if (g === EVAL_ORG) {
                        val = invokeEval(base, g, args);
                    } else if (invoke) {
                        if (isConstructor) {
                            val = callAsConstructor(g, args);
                        } else {
                            //console.log(g);
                            //console.log(base);
                            //console.log(args);
                            if (g != undefined) {
                                val = Function.prototype.apply.call(g, base, args);
                                //val = g.apply(base, args);
                            }

                        }
                    } else {
                        if (rrEngine) {
                            rrEngine.RR_replay();
                        }
                        val = undefined;
                    }
                } finally {
                    popSwitchKey();
                    Globals.isInstrumentedCaller = tmpIsInstrumentedCaller;
                    Globals.isConstructorCall = tmpIsConstructorCall;
                    Globals.isMethodCall = tmpIsMethodCall;
                }

                if (!ic && arr[1]) {
                    if (rrEngine) {
                        val = rrEngine.RR_L(iid, val, N_LOG_RETURN);
                    }
                }
                if (sandbox.analysis && sandbox.analysis.invokeFun) {
                    tmp_rrEngine = rrEngine;
                    rrEngine = null;
                    try {
                        //------------------------------- EDIT -------------------------------
                        // EDIT jalangi orignial code to allow filename info to be passed
                        // Original code:
                        // "val = sandbox.analysis.invokeFun(iid, f, base, args, val, isConstructor)"
                        //------------------------------- EDIT -------------------------------
                        val = sandbox.analysis.invokeFun(iid, f, base, args, val, isConstructor, filename);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    rrEngine = tmp_rrEngine;
                    if (rrEngine) {
                        rrEngine.RR_updateRecordedObject(val);
                    }
                }
                printValueForTesting("Ret", iid, val);
                return val;
            }

            //var globalInstrumentationInfo;

            // getField (property read)
            function G(iid, base, offset, norr) {
                if (offset === SPECIAL_PROP || offset === SPECIAL_PROP2 || offset === SPECIAL_PROP3) {
                    return undefined;
                }

                var base_c = getConcrete(base);
//                if (rrEngine) {
//                    base_c = rrEngine.RR_preG(iid, base, offset);
//                }

                if (sandbox.analysis && sandbox.analysis.getFieldPre && getConcrete(offset) !== '__proto__') {
                    try {
                        sandbox.analysis.getFieldPre(iid, base, offset);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                var val = base_c[getConcrete(offset)];


                if (rrEngine && !norr) {
                    val = rrEngine.RR_G(iid, base_c, offset, val);
                }
                if (sandbox.analysis && sandbox.analysis.getField && getConcrete(offset) !== '__proto__') {
                    var tmp_rrEngine = rrEngine;
                    rrEngine = null;
                    try {
                        val = sandbox.analysis.getField(iid, base, offset, val);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    rrEngine = tmp_rrEngine;
                    if (rrEngine) {
                        rrEngine.RR_updateRecordedObject(val);
                    }
                }

                if (rrEngine) {
                    rrEngine.RR_replay();
                    rrEngine.RR_Load(iid);
                }

                printValueForTesting("J$.G", iid, val);
                return val;
            }

            // putField (property write)
            function P(iid, base, offset, val) {
                if (offset === SPECIAL_PROP || offset === SPECIAL_PROP2 || offset === SPECIAL_PROP3) {
                    return undefined;
                }

                // window.location.hash = hash calls a function out of nowhere.
                // fix needs a call to RR_replay and setting isInstrumentedCaller to false
                // the following patch is not elegant
                var tmpIsInstrumentedCaller = Globals.isInstrumentedCaller;
                Globals.isInstrumentedCaller = false;

                var base_c = getConcrete(base);
                if (sandbox.analysis && sandbox.analysis.putFieldPre) {
                    try {
                        val = sandbox.analysis.putFieldPre(iid, base, offset, val);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                if (typeof base_c === 'function' && getConcrete(offset) === 'prototype') {
                    base_c[getConcrete(offset)] = getConcrete(val);
                } else {
                    base_c[getConcrete(offset)] = val;
                }

                if (rrEngine) {
                    rrEngine.RR_P(iid, base, offset, val);
                }
                if (sandbox.analysis && sandbox.analysis.putField) {
                    try {
                        val = sandbox.analysis.putField(iid, base, offset, val);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                // the following patch was not elegant
                // but now it is better (got rid of offset+"" === "hash" check)
                if (rrEngine) {//} && ((offset + "") === "hash")) {
                    rrEngine.RR_replay();
                    rrEngine.RR_Load(iid); // add a dummy (no record) in the trace so that RR_Replay does not replay non-setter method
                }

                // the following patch is not elegant
                Globals.isInstrumentedCaller = tmpIsInstrumentedCaller;
                return val;
            }

            // Function call (e.g., f())
            //------------------------------- EDIT -------------------------------
            // EDIT jalangi orignial code to allow filename info to be passed
            // Original code:
            // "function W(iid, name, val, lhs, isGlobal, isPseudoGlobal) {"
            //------------------------------- EDIT -------------------------------
            function F(iid, f, isConstructor, filename) {
                //debugger;
                return function () {
                    var base = this;
                    //------------------------------- EDIT -------------------------------
                    // EDIT jalangi orignial code to allow filename info to be passed
                    // Original code:
                    // "return invokeFun(iid, base, f, arguments, isConstructor, false);"
                    //------------------------------- EDIT -------------------------------
                    return invokeFun(iid, base, f, arguments, isConstructor, false, filename);
                }
            }

            // Method call (e.g., e.f())
            //------------------------------- EDIT -------------------------------
            // EDIT jalangi orignial code to allow filename info to be passed
            // Original code:
            // "function M(iid, base, offset, isConstructor)  {"
            //------------------------------- EDIT -------------------------------
            function M(iid, base, offset, isConstructor, filename) {
                return function () {
                    var f = G(iid + 2, base, offset);
                    //------------------------------- EDIT -------------------------------
                    // EDIT jalangi orignial code to allow filename info to be passed
                    // Original code:
                    // "return invokeFun(iid, base, f, arguments, isConstructor, true);"
                    //------------------------------- EDIT -------------------------------
                    return invokeFun(iid, base, f, arguments, isConstructor, true, filename);
                };
            }

            // Function enter
            function Fe(iid, val, dis /* this */, args) {
                //debugger;
                //console.log(args);
                argIndex = 0;
                if (rrEngine) {
                    rrEngine.RR_Fe(iid, val, dis);
                }
                if (smemory) {
                    smemory.functionEnter(val);
                }
                returnVal.push(undefined);
                exceptionVal = undefined;
                if (sandbox.analysis && sandbox.analysis.functionEnter) {
                    if (rrEngine) {
                        val = rrEngine.RR_getConcolicValue(val);
                    }
                    try {
                        sandbox.analysis.functionEnter(iid, val, dis, args);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                printValueForTesting("Call", iid, val);
            }

            // Function exit
            function Fr(iid) {
                var ret = false, tmp;
                if (rrEngine) {
                    rrEngine.RR_Fr(iid);
                }
                if (smemory) {
                    smemory.functionReturn();
                }
                if (sandbox.analysis && sandbox.analysis.functionExit) {
                    try {
                        ret = sandbox.analysis.functionExit(iid);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                // if there was an uncaught exception, throw it
                // here, to preserve exceptional control flow
                if (exceptionVal !== undefined) {
                    tmp = exceptionVal;
                    exceptionVal = undefined;
                    throw tmp;
                }
                return ret;
            }

            // Uncaught exception
            function Ex(iid, e) {
                exceptionVal = e;
            }

            // Return statement
            function Rt(iid, val) {
                returnVal.pop();
                returnVal.push(val);
                if (sandbox.analysis && sandbox.analysis.return_) {
                    try {
                        val = sandbox.analysis.return_(val);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                return val;
            }

            // Actual return from function, invoked from 'finally' block
            // added around every function by instrumentation.  Reads
            // the return value stored by call to Rt()
            function Ra() {
                var ret = returnVal.pop();
                //returnVal = undefined;
                exceptionVal = undefined;
                return ret;
            }

            // Script enter
            function Se(iid, val) {
                scriptCount++;
                if (rrEngine) {
                    rrEngine.RR_Se(iid, val);
                }
                if (smemory) {
                    smemory.scriptEnter();
                }
                if (sandbox.analysis && sandbox.analysis.scriptEnter) {
                    try {
                        sandbox.analysis.scriptEnter(iid, val);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
            }

            // Script exit
            function Sr(iid) {
                var tmp;
                scriptCount--;
                if (rrEngine) {
                    rrEngine.RR_Sr(iid);
                }
                if (smemory) {
                    smemory.scriptReturn();
                }
                if (sandbox.analysis && sandbox.analysis.scriptExit) {
                    try {
                        sandbox.analysis.scriptExit(iid);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                if (mode === MODE_NO_RR_IGNORE_UNINSTRUMENTED && scriptCount === 0) {
                    endExecution();
                }
                if (exceptionVal !== undefined) {
                    tmp = exceptionVal;
                    exceptionVal = undefined;
                    if ((mode === MODE_REPLAY && scriptCount > 0) || isBrowserReplay) {
                        throw tmp;
                    } else {
                        console.error(tmp);
                        console.error(tmp.stack);
                    }
                }
            }

            // Ignore argument (identity).
            // TODO Why do we need this?
            function I(val) {
                return val;
            }

            // object/function/regexp/array Literal
            function T(iid, val, type, hasGetterSetter) {
                //debugger;
                if (sandbox.analysis && sandbox.analysis.literalPre) {
                    try {
                        sandbox.analysis.literalPre(iid, val, hasGetterSetter);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                if (rrEngine) {
                    rrEngine.RR_T(iid, val, type, hasGetterSetter);
                }
                if (smemory) {
                    smemory.defineFunction(val, type);
                }
                if (type === N_LOG_FUNCTION_LIT) {
                    if (Object && Object.defineProperty && typeof Object.defineProperty === 'function') {
                        Object.defineProperty(val, SPECIAL_PROP2, {
                            enumerable: false,
                            writable: true
                        });
                    }
                    val[SPECIAL_PROP2] = true;
                }

                // inform analysis, which may modify the literal
                if (sandbox.analysis && sandbox.analysis.literal) {
                    try {
                        val = sandbox.analysis.literal(iid, val, hasGetterSetter);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    if (rrEngine) {
                        rrEngine.RR_updateRecordedObject(val);
                    }
                }

                return val;
            }

            // hash in for-in
            // E.g., given code 'for (p in x) { ... }',
            // H is invoked with the value of x
            function H(iid, val) {
                var aret;
                if (rrEngine) {
                    val = rrEngine.RR_H(iid, val);
                }
                if (sandbox.analysis && sandbox.analysis.forinObject) {
                    aret = sandbox.analysis.forinObject(iid, val);
                    if (aret) {
                        val = aret.result;
                    }
                }
                return val;
            }

            // variable read
            function R(iid, name, val, isGlobal, isPseudoGlobal) {
                //debugger;
                if (sandbox.analysis && sandbox.analysis.readPre) {
                    try {
                        sandbox.analysis.readPre(iid, name, val, isGlobal);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                if (rrEngine && (name === 'this' || isGlobal)) {
                    val = rrEngine.RR_R(iid, name, val);
                }
                if (sandbox.analysis && sandbox.analysis.read) {
                    try {
                        val = sandbox.analysis.read(iid, name, val, isGlobal);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    if (rrEngine) {// && (name==='this' || isGlobal)) {
                        rrEngine.RR_updateRecordedObject(val);
                    }
                }
                printValueForTesting("J$.R", iid, val);
                return val;
            }

            // variable write
            //------------------------------- EDIT -------------------------------
            // EDIT jalangi orignial code to allow filename info to be passed
            // Original code:
            // "function W(iid, name, val, lhs, isGlobal, isPseudoGlobal) {"
            //------------------------------- EDIT -------------------------------
            function W(iid, name, val, lhs, isGlobal, isPseudoGlobal, filename) {
                if (sandbox.analysis && sandbox.analysis.writePre) {
                    try {
                        sandbox.analysis.writePre(iid, name, val, lhs);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                if (rrEngine && isGlobal) {
                    rrEngine.RR_W(iid, name, val);
                }
                if (sandbox.analysis && sandbox.analysis.write) {
                    try {

                        //------------------------------- EDIT -------------------------------
                        // EDIT jalangi orignial code to allow filename info to be passed
                        // Original code:
                        // "val = sandbox.analysis.write(iid, name, val, lhs);"
                        //------------------------------- EDIT -------------------------------
                        val = sandbox.analysis.write(iid, name, val, lhs, filename);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                return val;
            }

            // variable declaration (Init)
            function N(iid, name, val, isArgumentSync, isLocalSync, isCatchParam) {
                //debugger;
                // isLocalSync is only true when we sync variables inside a for-in loop
                isCatchParam = !!isCatchParam
                if (isArgumentSync) {
                    argIndex++;
                }
                if (rrEngine) {
                    val = rrEngine.RR_N(iid, name, val, isArgumentSync);
                }
                if (!isLocalSync && !isCatchParam && smemory) {
                    smemory.initialize(name);
                }
                if (!isLocalSync && sandbox.analysis && sandbox.analysis.declare) {
                    try {
                        if (isArgumentSync && argIndex > 1) {
                            sandbox.analysis.declare(iid, name, val, isArgumentSync, argIndex - 2, isCatchParam);
                        } else {
                            sandbox.analysis.declare(iid, name, val, isArgumentSync, -1, isCatchParam);
                        }
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
                return val;
            }

            // Modify and assign +=, -= ...
            // TODO is this dead or still used?
            // definitely used --KS
            function A(iid, base, offset, op) {
                var oprnd1 = G(iid, base, offset);
                return function (oprnd2) {
                    var val = B(iid, op, oprnd1, oprnd2);
                    return P(iid, base, offset, val);
                };
            }

            // Binary operation
            function B(iid, op, left, right) {
                var left_c, right_c, result_c, isArith = false;

                if (sandbox.analysis && sandbox.analysis.binaryPre) {
                    try {
                        sandbox.analysis.binaryPre(iid, op, left, right);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                left_c = getConcrete(left);
                right_c = getConcrete(right);

                switch (op) {
                    case "+":
                        isArith = true;
                        result_c = left_c + right_c;
                        break;
                    case "-":
                        isArith = true;
                        result_c = left_c - right_c;
                        break;
                    case "*":
                        isArith = true;
                        result_c = left_c * right_c;
                        break;
                    case "/":
                        isArith = true;
                        result_c = left_c / right_c;
                        break;
                    case "%":
                        isArith = true;
                        result_c = left_c % right_c;
                        break;
                    case "<<":
                        isArith = true;
                        result_c = left_c << right_c;
                        break;
                    case ">>":
                        isArith = true;
                        result_c = left_c >> right_c;
                        break;
                    case ">>>":
                        isArith = true;
                        result_c = left_c >>> right_c;
                        break;
                    case "<":
                        isArith = true;
                        result_c = left_c < right_c;
                        break;
                    case ">":
                        isArith = true;
                        result_c = left_c > right_c;
                        break;
                    case "<=":
                        isArith = true;
                        result_c = left_c <= right_c;
                        break;
                    case ">=":
                        isArith = true;
                        result_c = left_c >= right_c;
                        break;
                    case "==":
                        result_c = left_c == right_c;
                        break;
                    case "!=":
                        result_c = left_c != right_c;
                        break;
                    case "===":
                        result_c = left_c === right_c;
                        break;
                    case "!==":
                        result_c = left_c !== right_c;
                        break;
                    case "&":
                        isArith = true;
                        result_c = left_c & right_c;
                        break;
                    case "|":
                        isArith = true;
                        result_c = left_c | right_c;
                        break;
                    case "^":
                        isArith = true;
                        result_c = left_c ^ right_c;
                        break;
                    case "instanceof":
                        result_c = left_c instanceof right_c;
                        if (rrEngine) {
                            result_c = rrEngine.RR_L(iid, result_c, N_LOG_RETURN);
                        }
                        break;
                    case "delete":
                        result_c = delete left_c[right_c];
                        if (rrEngine) {
                            result_c = rrEngine.RR_L(iid, result_c, N_LOG_RETURN);
                        }
                        break;
                    case "in":
                        result_c = left_c in right_c;
                        if (rrEngine) {
                            result_c = rrEngine.RR_L(iid, result_c, N_LOG_RETURN);
                        }
                        break;
                    case "&&":
                        result_c = left_c && right_c;
                        break;
                    case "||":
                        result_c = left_c || right_c;
                        break;
                    case "regexin":
                        result_c = right_c.test(left_c);
                        break;
                    default:
                        throw new Error(op + " at " + iid + " not found");
                        break;
                }

                if (rrEngine) {
                    var type1 = typeof left_c;
                    var type2 = typeof right_c;
                    var flag1 = (type1 === "object" || type1 === "function")
                        && !(left_c instanceof String)
                        && !(left_c instanceof Number)
                        && !(left_c instanceof Boolean)
                    var flag2 = (type2 === "object" || type2 === "function")
                        && !(right_c instanceof String)
                        && !(right_c instanceof Number)
                        && !(right_c instanceof Boolean)
                    if (isArith && ( flag1 || flag2)) {
                        //console.log(" type1 "+type1+" type2 "+type2+" op "+op+ " iid "+iid);
                        result_c = rrEngine.RR_L(iid, result_c, N_LOG_OPERATION);
                    }
                }
                if (sandbox.analysis && sandbox.analysis.binary) {
                    try {
                        result_c = sandbox.analysis.binary(iid, op, left, right, result_c);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    if (rrEngine) {
                        rrEngine.RR_updateRecordedObject(result_c);
                    }
                }
                return result_c;
            }


            // Unary operation
            function U(iid, op, left) {
                var left_c, result_c, isArith = false;

                if (sandbox.analysis && sandbox.analysis.unaryPre) {
                    try {
                        sandbox.analysis.unaryPre(iid, op, left);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                left_c = getConcrete(left);

                switch (op) {
                    case "+":
                        isArith = true;
                        result_c = +left_c;
                        break;
                    case "-":
                        isArith = true;
                        result_c = -left_c;
                        break;
                    case "~":
                        isArith = true;
                        result_c = ~left_c;
                        break;
                    case "!":
                        result_c = !left_c;
                        break;
                    case "typeof":
                        result_c = typeof left_c;
                        break;
                    default:
                        throw new Error(op + " at " + iid + " not found");
                        break;
                }

                if (rrEngine) {
                    var type1 = typeof left_c;
                    var flag1 = (type1 === "object" || type1 === "function")
                        && !(left_c instanceof String)
                        && !(left_c instanceof Number)
                        && !(left_c instanceof Boolean)
                    if (isArith && flag1) {
                        result_c = rrEngine.RR_L(iid, result_c, N_LOG_OPERATION);
                    }
                }
                if (sandbox.analysis && sandbox.analysis.unary) {
                    try {
                        result_c = sandbox.analysis.unary(iid, op, left, result_c);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    if (rrEngine) {
                        rrEngine.RR_updateRecordedObject(result_c);
                    }
                }
                return result_c;
            }

            function pushSwitchKey() {
                switchKeyStack.push(switchLeft);
            }

            function popSwitchKey() {
                switchLeft = switchKeyStack.pop();
            }

            function last() {
                return lastVal;
            }

            // Switch key
            // E.g., for 'switch (x) { ... }',
            // C1 is invoked with value of x
            function C1(iid, left) {
                var left_c;

                left_c = getConcrete(left);
                switchLeft = left;
                return left_c;
            }

            // case label inside switch
            function C2(iid, left) {
                var left_c, ret;

                left_c = getConcrete(left);
                left = B(iid, "===", switchLeft, left);

                if (sandbox.analysis && sandbox.analysis.conditionalPre) {
                    try {
                        sandbox.analysis.conditionalPre(iid, left);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                ret = !!getConcrete(left);

                if (sandbox.analysis && sandbox.analysis.conditional) {
                    try {
                        sandbox.analysis.conditional(iid, left, ret);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                if (branchCoverageInfo) {
                    branchCoverageInfo.updateBranchInfo(iid, ret);
                }
                printValueForTesting("J$.C2", iid, left_c ? 1 : 0);
                return left_c;
            };

            // Expression in conditional
            function C(iid, left) {
                var left_c, ret;
                if (sandbox.analysis && sandbox.analysis.conditionalPre) {
                    try {
                        sandbox.analysis.conditionalPre(iid, left);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }

                left_c = getConcrete(left);
                ret = !!left_c;

                if (sandbox.analysis && sandbox.analysis.conditional) {
                    try {
                        lastVal = sandbox.analysis.conditional(iid, left, left_c);
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                    if (rrEngine) {
                        rrEngine.RR_updateRecordedObject(lastVal);
                    }
                } else {
                    lastVal = left_c;
                }

                if (branchCoverageInfo) {
                    branchCoverageInfo.updateBranchInfo(iid, ret);
                }

                printValueForTesting("J$.C ", iid, left_c ? 1 : 0);
                return left_c;
            }

            function endExecution() {
                if (branchCoverageInfo)
                    branchCoverageInfo.storeBranchInfo();
                if (Config.LOG_ALL_READS_AND_BRANCHES) {
                    if (mode === MODE_REPLAY) {
                        require('fs').writeFileSync("readAndBranchLogs.replay", JSON.stringify(Globals.loadAndBranchLogs, undefined, 4), "utf8");
                    }
                }

                if (sandbox.analysis && sandbox.analysis.endExecution) {
                    try {
                        return sandbox.analysis.endExecution();
                    } catch (e) {
                        clientAnalysisException(e);
                    }
                }
            }


            //----------------------------------- End Jalangi Library backend ---------------------------------

            // -------------------- Monkey patch some methods ------------------------
            var GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;
            Object.getOwnPropertyNames = function () {
                var val = GET_OWN_PROPERTY_NAMES.apply(Object, arguments);
                var idx = val.indexOf(SPECIAL_PROP);
                if (idx > -1) {
                    val.splice(idx, 1);
                }
                idx = val.indexOf(SPECIAL_PROP2);
                if (idx > -1) {
                    val.splice(idx, 1);
                }
                idx = val.indexOf(SPECIAL_PROP3);
                if (idx > -1) {
                    val.splice(idx, 1);
                }
                return val;
            };


            (function (console) {

                console.save = function (data, filename) {

                    if (!data) {
                        console.error('Console.save: No data')
                        return;
                    }

                    if (!filename) filename = 'console.json'

                    if (typeof data === "object") {
                        data = JSON.stringify(data, undefined, 4)
                    }

                    var blob = new Blob([data], {type: 'text/json'}),
                        e = document.createEvent('MouseEvents'),
                        a = document.createElement('a')

                    a.download = filename
                    a.href = window.URL.createObjectURL(blob)
                    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
                    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                    a.dispatchEvent(e)
                }
            })(console);


            sandbox.U = U; // Unary operation
            sandbox.B = B; // Binary operation
            sandbox.C = C; // Condition
            sandbox.C1 = C1; // Switch key
            sandbox.C2 = C2; // case label C1 === C2
            sandbox.addAxiom = addAxiom; // Add axiom
            sandbox.getConcrete = getConcrete;  // Get concrete value
            sandbox._ = last;  // Last value passed to C

            sandbox.H = H; // hash in for-in
            sandbox.I = I; // Ignore argument
            sandbox.G = G; // getField
            sandbox.P = P; // putField
            sandbox.R = R; // Read
            sandbox.W = W; // Write
            sandbox.N = N; // Init
            sandbox.T = T; // object/function/regexp/array Literal
            sandbox.F = F; // Function call
            sandbox.M = M; // Method call
            sandbox.A = A; // Modify and assign +=, -= ...
            sandbox.Fe = Fe; // Function enter
            sandbox.Fr = Fr; // Function return
            sandbox.Se = Se; // Script enter
            sandbox.Sr = Sr; // Script return
            sandbox.Rt = Rt; // returned value
            sandbox.Ra = Ra;
            sandbox.Ex = Ex;

            sandbox.replay = rrEngine ? rrEngine.RR_replay : undefined;
            sandbox.onflush = rrEngine ? rrEngine.onflush : function () {
            };
            sandbox.record = rrEngine ? rrEngine.record : function () {
            };
            sandbox.command = rrEngine ? rrEngine.command : function () {
            };
            sandbox.endExecution = endExecution;
            sandbox.addRecord = rrEngine ? rrEngine.addRecord : undefined;
            sandbox.setTraceFileName = rrEngine ? rrEngine.setTraceFileName : undefined;
        }
    }


    if (Constants.isBrowser) {
        init(window.JALANGI_MODE, undefined, window.USE_SMEMORY);
    } else { // node.js
        init(global.JALANGI_MODE, global.ANALYSIS_SCRIPT, global.USE_SMEMORY);
    }

})(J$);


//@todo:@assumption arguments.callee is available
//@todo:@assumptions SPECIAL_PROP = "*J$*" is added to every object, but its enumeration is avoided in instrumented code
//@todo:@assumptions ReferenceError when accessing an undeclared uninitialized variable won't be thrown
//@todo:@assumption window.x is not initialized in node.js replay mode when var x = e is done in the global scope, but handled using syncValues
//@todo:@assumption eval is not renamed
//@todo: with needs to be handled
//@todo: new Function and setTimeout
//@todo: @assumption implicit call of toString and valueOf on objects during type conversion
// could lead to inaccurate replay if the object fields are not synchronized
//@todo: @assumption JSON.stringify of any float could be inaccurate, so logging could be inaccurate
//@todo: implicit type conversion from objects/arrays/functions during binary and unary operations could break record/replay


// change line: 1 to line: 8 in node_modules/source-map/lib/source-map/source-node.js
// analysis.js END

