/**
 * web-vitals v2.1.0
 * This comes from the google web-vital repository, base only script @ https://github.com/GoogleChrome/web-vitals
 */

!function (e) {
  "use strict";

  // This ensures that we do not initialize Core Web Vitals for non-browser environments
  if(typeof document === 'undefined') {
    return;
  }

  var t = function (e, t) {
    return {
      name: e,
      value: void 0 === t ? -1 : t,
      delta: 0,
      entries: [],
      id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
    }
  }, n = function (e, t) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        if ("first-input" === e && !("PerformanceEventTiming" in self)) return;
        var n = new PerformanceObserver((function (e) {
          return e.getEntries().map(t)
        }));
        return n.observe({type: e, buffered: !0}), n
      }
    } catch (e) {
    }
  }, i = function (e, t) {
    var n = function n(i) {
      "pagehide" !== i.type && "hidden" !== document.visibilityState || (e(i), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)))
    };
    addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0)
  }, a = function (e) {
    addEventListener("pageshow", (function (t) {
      t.persisted && e(t)
    }), !0)
  }, r = function (e, t, n) {
    var i;
    return function (a) {
      t.value >= 0 && (a || n) && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t)))
    }
  }, o = -1, u = function () {
    i((function (e) {
      var t = e.timeStamp;
      o = t
    }), !0)
  }, s = function () {
    return o < 0 && ((o = self.webVitals.firstHiddenTime) === 1 / 0 && u(), a((function () {
      setTimeout((function () {
        o = "hidden" === document.visibilityState ? 0 : 1 / 0, u()
      }), 0)
    }))), {
      get firstHiddenTime() {
        return o
      }
    }
  }, c = function (e, i) {
    var o, u = s(), c = t("FCP"), f = function (e) {
        "first-contentful-paint" === e.name && (m && m.disconnect(), e.startTime < u.firstHiddenTime && (c.value = e.startTime, c.entries.push(e), o(!0)))
      }, d = performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0],
      m = d ? null : n("paint", f);
    (d || m) && (o = r(e, c, i), d && f(d), a((function (n) {
      c = t("FCP"), o = r(e, c, i), requestAnimationFrame((function () {
        requestAnimationFrame((function () {
          c.value = performance.now() - n.timeStamp, o(!0)
        }))
      }))
    })))
  }, f = !1, d = -1, m = new Set;
  e.getCLS = function (e, o) {
    f || (c((function (e) {
      d = e.value
    })), f = !0);
    var u, s = function (t) {
      d > -1 && e(t)
    }, m = t("CLS", 0), v = 0, l = [], p = function (e) {
      if (!e.hadRecentInput) {
        var t = l[0], n = l[l.length - 1];
        v && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (v += e.value, l.push(e)) : (v = e.value, l = [e]), v > m.value && (m.value = v, m.entries = l, u())
      }
    }, g = n("layout-shift", p);
    g && (u = r(s, m, o), i((function () {
      g.takeRecords().map(p), u(!0)
    })), a((function () {
      v = 0, d = -1, m = t("CLS", 0), u = r(s, m, o)
    })))
  }, e.getFCP = c, e.getFID = function (e, o) {
    var u, c = s(), f = t("FID"), d = function (e) {
      e.startTime < c.firstHiddenTime && (f.value = e.processingStart - e.startTime, f.entries.push(e), u(!0))
    }, m = n("first-input", d);
    u = r(e, f, o), m && i((function () {
      m.takeRecords().map(d), m.disconnect()
    }), !0), m || window.webVitals.firstInputPolyfill(d), a((function () {
      f = t("FID"), u = r(e, f, o), window.webVitals.resetFirstInputPolyfill(), window.webVitals.firstInputPolyfill(d)
    }))
  }, e.getLCP = function (e, o) {
    var u, c = s(), f = t("LCP"), d = function (e) {
      var t = e.startTime;
      t < c.firstHiddenTime && (f.value = t, f.entries.push(e)), u()
    }, v = n("largest-contentful-paint", d);
    if (v) {
      u = r(e, f, o);
      var l = function () {
        m.has(f.id) || (v.takeRecords().map(d), v.disconnect(), m.add(f.id), u(!0))
      };
      ["keydown", "click"].forEach((function (e) {
        addEventListener(e, l, {once: !0, capture: !0})
      })), i(l, !0), a((function (n) {
        f = t("LCP"), u = r(e, f, o), requestAnimationFrame((function () {
          requestAnimationFrame((function () {
            f.value = performance.now() - n.timeStamp, m.add(f.id), u(!0)
          }))
        }))
      }))
    }
  }, e.getTTFB = function (e) {
    var n, i = t("TTFB");
    n = function () {
      try {
        var t = performance.getEntriesByType("navigation")[0] || function () {
          var e = performance.timing, t = {entryType: "navigation", startTime: 0};
          for (var n in e) "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
          return t
        }();
        if (i.value = i.delta = t.responseStart, i.value < 0) return;
        i.entries = [t], e(i)
      } catch (e) {
      }
    }, "complete" === document.readyState ? setTimeout(n, 0) : addEventListener("pageshow", n)
  }, Object.defineProperty(e, "__esModule", {value: !0})
}(this.webVitals = this.webVitals || {});
