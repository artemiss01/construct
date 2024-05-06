(() => {
  var e = {
      144: function (e) {
        e.exports = (function () {
          "use strict";
          const e = "undefined" != typeof window,
            t =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            o = e && window.devicePixelRatio > 1,
            n = {
              elements_selector: ".lazy",
              container: t || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            r = (e) => Object.assign({}, n, e),
            a = function (e, t) {
              let o;
              const n = "LazyLoad::Initialized",
                r = new e(t);
              try {
                o = new CustomEvent(n, { detail: { instance: r } });
              } catch (e) {
                (o = document.createEvent("CustomEvent")),
                  o.initCustomEvent(n, !1, !1, { instance: r });
              }
              window.dispatchEvent(o);
            },
            s = "src",
            l = "srcset",
            i = "sizes",
            c = "poster",
            d = "llOriginalAttrs",
            u = "data",
            m = "loading",
            p = "loaded",
            h = "applied",
            g = "error",
            f = "native",
            v = "data-",
            y = "ll-status",
            _ = (e, t) => e.getAttribute(v + t),
            b = (e) => _(e, y),
            E = (e, t) =>
              ((e, t, o) => {
                const n = v + t;
                null !== o ? e.setAttribute(n, o) : e.removeAttribute(n);
              })(e, y, t),
            A = (e) => E(e, null),
            L = (e) => null === b(e),
            w = (e) => b(e) === f,
            k = [m, p, h, g],
            S = (e, t, o, n) => {
              e &&
                "function" == typeof e &&
                (void 0 === n ? (void 0 === o ? e(t) : e(t, o)) : e(t, o, n));
            },
            x = (t, o) => {
              e && "" !== o && t.classList.add(o);
            },
            I = (t, o) => {
              e && "" !== o && t.classList.remove(o);
            },
            C = (e) => e.llTempImage,
            P = (e, t) => {
              if (!t) return;
              const o = t._observer;
              o && o.unobserve(e);
            },
            T = (e, t) => {
              e && (e.loadingCount += t);
            },
            q = (e, t) => {
              e && (e.toLoadCount = t);
            },
            M = (e) => {
              let t = [];
              for (let o, n = 0; (o = e.children[n]); n += 1)
                "SOURCE" === o.tagName && t.push(o);
              return t;
            },
            O = (e, t) => {
              const o = e.parentNode;
              o && "PICTURE" === o.tagName && M(o).forEach(t);
            },
            B = (e, t) => {
              M(e).forEach(t);
            },
            N = [s],
            j = [s, c],
            H = [s, l, i],
            R = [u],
            D = (e) => !!e[d],
            $ = (e) => e[d],
            z = (e) => delete e[d],
            G = (e, t) => {
              if (D(e)) return;
              const o = {};
              t.forEach((t) => {
                o[t] = e.getAttribute(t);
              }),
                (e[d] = o);
            },
            F = (e, t) => {
              if (!D(e)) return;
              const o = $(e);
              t.forEach((t) => {
                ((e, t, o) => {
                  o ? e.setAttribute(t, o) : e.removeAttribute(t);
                })(e, t, o[t]);
              });
            },
            Q = (e, t, o) => {
              x(e, t.class_applied),
                E(e, h),
                o &&
                  (t.unobserve_completed && P(e, t),
                  S(t.callback_applied, e, o));
            },
            U = (e, t, o) => {
              x(e, t.class_loading),
                E(e, m),
                o && (T(o, 1), S(t.callback_loading, e, o));
            },
            V = (e, t, o) => {
              o && e.setAttribute(t, o);
            },
            J = (e, t) => {
              V(e, i, _(e, t.data_sizes)),
                V(e, l, _(e, t.data_srcset)),
                V(e, s, _(e, t.data_src));
            },
            W = {
              IMG: (e, t) => {
                O(e, (e) => {
                  G(e, H), J(e, t);
                }),
                  G(e, H),
                  J(e, t);
              },
              IFRAME: (e, t) => {
                G(e, N), V(e, s, _(e, t.data_src));
              },
              VIDEO: (e, t) => {
                B(e, (e) => {
                  G(e, N), V(e, s, _(e, t.data_src));
                }),
                  G(e, j),
                  V(e, c, _(e, t.data_poster)),
                  V(e, s, _(e, t.data_src)),
                  e.load();
              },
              OBJECT: (e, t) => {
                G(e, R), V(e, u, _(e, t.data_src));
              },
            },
            X = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            Y = (e, t) => {
              !t ||
                ((e) => e.loadingCount > 0)(t) ||
                ((e) => e.toLoadCount > 0)(t) ||
                S(e.callback_finish, t);
            },
            K = (e, t, o) => {
              e.addEventListener(t, o), (e.llEvLisnrs[t] = o);
            },
            Z = (e, t, o) => {
              e.removeEventListener(t, o);
            },
            ee = (e) => !!e.llEvLisnrs,
            te = (e) => {
              if (!ee(e)) return;
              const t = e.llEvLisnrs;
              for (let o in t) {
                const n = t[o];
                Z(e, o, n);
              }
              delete e.llEvLisnrs;
            },
            oe = (e, t, o) => {
              ((e) => {
                delete e.llTempImage;
              })(e),
                T(o, -1),
                ((e) => {
                  e && (e.toLoadCount -= 1);
                })(o),
                I(e, t.class_loading),
                t.unobserve_completed && P(e, o);
            },
            ne = (e, t, o) => {
              const n = C(e) || e;
              ee(n) ||
                ((e, t, o) => {
                  ee(e) || (e.llEvLisnrs = {});
                  const n = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  K(e, n, t), K(e, "error", o);
                })(
                  n,
                  (r) => {
                    ((e, t, o, n) => {
                      const r = w(t);
                      oe(t, o, n),
                        x(t, o.class_loaded),
                        E(t, p),
                        S(o.callback_loaded, t, n),
                        r || Y(o, n);
                    })(0, e, t, o),
                      te(n);
                  },
                  (r) => {
                    ((e, t, o, n) => {
                      const r = w(t);
                      oe(t, o, n),
                        x(t, o.class_error),
                        E(t, g),
                        S(o.callback_error, t, n),
                        o.restore_on_error && F(t, H),
                        r || Y(o, n);
                    })(0, e, t, o),
                      te(n);
                  },
                );
            },
            re = (e, t, n) => {
              ((e) => X.indexOf(e.tagName) > -1)(e)
                ? ((e, t, o) => {
                    ne(e, t, o),
                      ((e, t, o) => {
                        const n = W[e.tagName];
                        n && (n(e, t), U(e, t, o));
                      })(e, t, o);
                  })(e, t, n)
                : ((e, t, n) => {
                    ((e) => {
                      e.llTempImage = document.createElement("IMG");
                    })(e),
                      ne(e, t, n),
                      ((e) => {
                        D(e) ||
                          (e[d] = { backgroundImage: e.style.backgroundImage });
                      })(e),
                      ((e, t, n) => {
                        const r = _(e, t.data_bg),
                          a = _(e, t.data_bg_hidpi),
                          l = o && a ? a : r;
                        l &&
                          ((e.style.backgroundImage = `url("${l}")`),
                          C(e).setAttribute(s, l),
                          U(e, t, n));
                      })(e, t, n),
                      ((e, t, n) => {
                        const r = _(e, t.data_bg_multi),
                          a = _(e, t.data_bg_multi_hidpi),
                          s = o && a ? a : r;
                        s && ((e.style.backgroundImage = s), Q(e, t, n));
                      })(e, t, n),
                      ((e, t, o) => {
                        const n = _(e, t.data_bg_set);
                        if (!n) return;
                        let r = n.split("|").map((e) => `image-set(${e})`);
                        (e.style.backgroundImage = r.join()), Q(e, t, o);
                      })(e, t, n);
                  })(e, t, n);
            },
            ae = (e) => {
              e.removeAttribute(s), e.removeAttribute(l), e.removeAttribute(i);
            },
            se = (e) => {
              O(e, (e) => {
                F(e, H);
              }),
                F(e, H);
            },
            le = {
              IMG: se,
              IFRAME: (e) => {
                F(e, N);
              },
              VIDEO: (e) => {
                B(e, (e) => {
                  F(e, N);
                }),
                  F(e, j),
                  e.load();
              },
              OBJECT: (e) => {
                F(e, R);
              },
            },
            ie = (e, t) => {
              ((e) => {
                const t = le[e.tagName];
                t
                  ? t(e)
                  : ((e) => {
                      if (!D(e)) return;
                      const t = $(e);
                      e.style.backgroundImage = t.backgroundImage;
                    })(e);
              })(e),
                ((e, t) => {
                  L(e) ||
                    w(e) ||
                    (I(e, t.class_entered),
                    I(e, t.class_exited),
                    I(e, t.class_applied),
                    I(e, t.class_loading),
                    I(e, t.class_loaded),
                    I(e, t.class_error));
                })(e, t),
                A(e),
                z(e);
            },
            ce = ["IMG", "IFRAME", "VIDEO"],
            de = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
            ue = (e, t, o) => {
              e.forEach((e) =>
                ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                  ? ((e, t, o, n) => {
                      const r = ((e) => k.indexOf(b(e)) >= 0)(e);
                      E(e, "entered"),
                        x(e, o.class_entered),
                        I(e, o.class_exited),
                        ((e, t, o) => {
                          t.unobserve_entered && P(e, o);
                        })(e, o, n),
                        S(o.callback_enter, e, t, n),
                        r || re(e, o, n);
                    })(e.target, e, t, o)
                  : ((e, t, o, n) => {
                      L(e) ||
                        (x(e, o.class_exited),
                        ((e, t, o, n) => {
                          o.cancel_on_exit &&
                            ((e) => b(e) === m)(e) &&
                            "IMG" === e.tagName &&
                            (te(e),
                            ((e) => {
                              O(e, (e) => {
                                ae(e);
                              }),
                                ae(e);
                            })(e),
                            se(e),
                            I(e, o.class_loading),
                            T(n, -1),
                            A(e),
                            S(o.callback_cancel, e, t, n));
                        })(e, t, o, n),
                        S(o.callback_exit, e, t, n));
                    })(e.target, e, t, o),
              );
            },
            me = (e) => Array.prototype.slice.call(e),
            pe = (e) => e.container.querySelectorAll(e.elements_selector),
            he = (e) => ((e) => b(e) === g)(e),
            ge = (e, t) => ((e) => me(e).filter(L))(e || pe(t)),
            fe = function (t, o) {
              const n = r(t);
              (this._settings = n),
                (this.loadingCount = 0),
                ((e, t) => {
                  de(e) ||
                    (t._observer = new IntersectionObserver(
                      (o) => {
                        ue(o, e, t);
                      },
                      ((e) => ({
                        root: e.container === document ? null : e.container,
                        rootMargin: e.thresholds || e.threshold + "px",
                      }))(e),
                    ));
                })(n, this),
                ((t, o) => {
                  e &&
                    ((o._onlineHandler = () => {
                      ((e, t) => {
                        var o;
                        ((o = pe(e)), me(o).filter(he)).forEach((t) => {
                          I(t, e.class_error), A(t);
                        }),
                          t.update();
                      })(t, o);
                    }),
                    window.addEventListener("online", o._onlineHandler));
                })(n, this),
                this.update(o);
            };
          return (
            (fe.prototype = {
              update: function (e) {
                const o = this._settings,
                  n = ge(e, o);
                var r, a;
                q(this, n.length),
                  t
                    ? this.loadAll(n)
                    : de(o)
                      ? ((e, t, o) => {
                          e.forEach((e) => {
                            -1 !== ce.indexOf(e.tagName) &&
                              ((e, t, o) => {
                                e.setAttribute("loading", "lazy"),
                                  ne(e, t, o),
                                  ((e, t) => {
                                    const o = W[e.tagName];
                                    o && o(e, t);
                                  })(e, t),
                                  E(e, f);
                              })(e, t, o);
                          }),
                            q(o, 0);
                        })(n, o, this)
                      : ((a = n),
                        ((e) => {
                          e.disconnect();
                        })((r = this._observer)),
                        ((e, t) => {
                          t.forEach((t) => {
                            e.observe(t);
                          });
                        })(r, a));
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  e &&
                    window.removeEventListener("online", this._onlineHandler),
                  pe(this._settings).forEach((e) => {
                    z(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                const t = this._settings;
                ge(e, t).forEach((e) => {
                  P(e, this), re(e, t, this);
                });
              },
              restoreAll: function () {
                const e = this._settings;
                pe(e).forEach((t) => {
                  ie(t, e);
                });
              },
            }),
            (fe.load = (e, t) => {
              const o = r(t);
              re(e, o);
            }),
            (fe.resetStatus = (e) => {
              A(e);
            }),
            e &&
              ((e, t) => {
                if (t)
                  if (t.length) for (let o, n = 0; (o = t[n]); n += 1) a(e, o);
                  else a(e, t);
              })(fe, window.lazyLoadOptions),
            fe
          );
        })();
      },
    },
    t = {};
  function o(n) {
    var r = t[n];
    if (void 0 !== r) return r.exports;
    var a = (t[n] = { exports: {} });
    return e[n].call(a.exports, a, a.exports, o), a.exports;
  }
  (() => {
    "use strict";
    function e(e) {
      this.type = e;
    }
    (e.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          o = t.dataset.da.trim().split(","),
          n = {};
        (n.element = t),
          (n.parent = t.parentNode),
          (n.destination = document.querySelector(o[0].trim())),
          (n.breakpoint = o[1] ? o[1].trim() : "767"),
          (n.place = o[2] ? o[2].trim() : "last"),
          (n.index = this.indexInParent(n.parent, n.element)),
          this.оbjects.push(n);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this,
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, o) {
            return Array.prototype.indexOf.call(o, e) === t;
          },
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const o = this.mediaQueries[t],
          n = String.prototype.split.call(o, ","),
          r = window.matchMedia(n[0]),
          a = n[1],
          s = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === a;
          });
        r.addListener(function () {
          e.mediaHandler(r, s);
        }),
          this.mediaHandler(r, s);
      }
    }),
      (e.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const o = t[e];
            (o.index = this.indexInParent(o.parent, o.element)),
              this.moveTo(o.place, o.element, o.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const o = t[e];
            o.element.classList.contains(this.daClassname) &&
              this.moveBack(o.parent, o.element, o.index);
          }
      }),
      (e.prototype.moveTo = function (e, t, o) {
        t.classList.add(this.daClassname),
          "last" === e || e >= o.children.length
            ? o.insertAdjacentElement("beforeend", t)
            : "first" !== e
              ? o.children[e].insertAdjacentElement("beforebegin", t)
              : o.insertAdjacentElement("afterbegin", t);
      }),
      (e.prototype.moveBack = function (e, t, o) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[o]
            ? e.children[o].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (e.prototype.indexInParent = function (e, t) {
        const o = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(o, t);
      }),
      (e.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                    ? -1
                    : "last" === e.place || "first" === t.place
                      ? 1
                      : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                    ? 1
                    : "last" === e.place || "first" === t.place
                      ? -1
                      : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    new e("max").init();
    let t = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
        );
      },
    };
    let n = (e, t = 500, o = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = o ? `${o}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !o),
              !o && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !o && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t));
      },
      r = (e, t = 500, o = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            o && e.style.removeProperty("height");
          let n = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = o ? `${o}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = n + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t);
        }
      },
      a = !0,
      s = (e = 500) => {
        let t = document.querySelector("body");
        if (a) {
          let o = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < o.length; e++) {
              o[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (a = !1),
            setTimeout(function () {
              a = !0;
            }, e);
        }
      };
    function l(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function i(e, t) {
      const o = Array.from(e).filter(function (e, o, n) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (o.length) {
        const e = [];
        o.forEach((o) => {
          const n = {},
            r = o.dataset[t].split(",");
          (n.value = r[0]),
            (n.type = r[1] ? r[1].trim() : "max"),
            (n.item = o),
            e.push(n);
        });
        let n = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        n = (function (e) {
          return e.filter(function (e, t, o) {
            return o.indexOf(e) === t;
          });
        })(n);
        const r = [];
        if (n.length)
          return (
            n.forEach((t) => {
              const o = t.split(","),
                n = o[1],
                a = o[2],
                s = window.matchMedia(o[0]),
                l = e.filter(function (e) {
                  if (e.value === n && e.type === a) return !0;
                });
              r.push({ itemsArray: l, matchMedia: s });
            }),
            r
          );
      }
    }
    let c = (e, t = !1, o = 500, n = 0) => {
      const r = document.querySelector(e);
      if (r) {
        let a = "",
          i = 0;
        t &&
          ((a = "header.header"), (i = document.querySelector(a).offsetHeight));
        let c = {
          speedAsDuration: !0,
          speed: o,
          header: a,
          offset: n,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (s(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(r, "", c);
        else {
          let e = r.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: i ? e - i : e, behavior: "smooth" });
        }
        l(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    const d = { inputMaskModule: null, selectModule: null };
    let u = {
      getErrors(e) {
        let t = 0,
          o = e.querySelectorAll("*[data-required]");
        return (
          o.length &&
            o.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : ("checkbox" !== e.type || e.checked) && e.value
              ? this.removeError(e)
              : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.parentElement.classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`,
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error"),
            );
      },
      formClean(e) {
        e.reset(),
          setTimeout(() => {
            let t = e.querySelectorAll("input,textarea");
            for (let e = 0; e < t.length; e++) {
              const o = t[e];
              o.parentElement.classList.remove("_form-focus"),
                o.classList.remove("_form-focus"),
                u.removeError(o),
                (o.value = o.dataset.placeholder);
            }
            let o = e.querySelectorAll(".checkbox__input");
            if (o.length > 0)
              for (let e = 0; e < o.length; e++) {
                o[e].checked = !1;
              }
            if (d.selectModule) {
              let t = e.querySelectorAll(".select");
              if (t.length)
                for (let e = 0; e < t.length; e++) {
                  const o = t[e].querySelector("select");
                  d.selectModule.selectBuild(o);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    new (o(144))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    let m = !1;
    setTimeout(() => {
      if (m) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    let p,
      h = !0;
    document.addEventListener("click", function (e) {
      (p = e.target),
        h && p.closest(".icon-menu")
          ? (document.documentElement.classList.toggle("menu-open"),
            document.documentElement.classList.toggle("no-scrolling"))
          : p.closest(".menu") ||
            (document.documentElement.classList.remove("menu-open"),
            document.documentElement.classList.remove("no-scrolling"));
    });
    const g = document.querySelector("[data-color-theme]");
    function f() {
      "dark-theme" == localStorage.getItem("theme")
        ? (document.documentElement.classList.add("dark-theme"),
          g && (g.checked = !0))
        : document.documentElement.classList.remove("dark-theme");
    }
    g.addEventListener("click", function (e) {
      "dark-theme" == localStorage.getItem("theme")
        ? localStorage.removeItem("theme")
        : localStorage.setItem("theme", "dark-theme"),
        f();
    }),
      f(),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      (function () {
        if (document.querySelectorAll("[data-fullscreen]").length && t.any()) {
          function e() {
            let e = 0.01 * window.innerHeight;
            document.documentElement.style.setProperty("--vh", `${e}px`);
          }
          window.addEventListener("resize", e), e();
        }
      })(),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const t = Array.from(e).filter(function (e, t, o) {
            return !e.dataset.spollers.split(",")[0];
          });
          t.length && a(t);
          let o = i(e, "spollers");
          function a(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    s(e),
                    e.addEventListener("click", l))
                  : (e.classList.remove("_spoller-init"),
                    s(e, !1),
                    e.removeEventListener("click", l));
            });
          }
          function s(e, t = !0) {
            const o = e.querySelectorAll("[data-spoller]");
            o.length > 0 &&
              o.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              });
          }
          function l(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const o = t.closest("[data-spoller]"),
                a = o.closest("[data-spollers]"),
                s = !!a.hasAttribute("data-one-spoller");
              a.querySelectorAll("._slide").length ||
                (s && !o.classList.contains("_spoller-active") && c(a),
                o.classList.toggle("_spoller-active"),
                ((e, t = 500) => {
                  e.hidden ? r(e, t) : n(e, t);
                })(o.nextElementSibling, 500)),
                e.preventDefault();
            }
          }
          function c(e) {
            const t = e.querySelector("[data-spoller]._spoller-active");
            t &&
              (t.classList.remove("_spoller-active"),
              n(t.nextElementSibling, 500));
          }
          o &&
            o.length &&
            o.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                a(e.itemsArray, e.matchMedia);
              }),
                a(e.itemsArray, e.matchMedia);
            });
        }
      })(),
      (function () {
        const e = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]",
        );
        e.length &&
          e.forEach((e) => {
            e.dataset.placeholder = e.placeholder;
          }),
          document.body.addEventListener("focusin", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = ""),
              t.classList.add("_form-focus"),
              t.parentElement.classList.add("_form-focus"),
              u.removeError(t));
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && u.validateInput(t));
          });
      })(),
      (function (e) {
        const t = document.forms;
        if (t.length)
          for (const e of t)
            e.addEventListener("submit", function (e) {
              o(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                u.formClean(t);
              });
        async function o(t, o) {
          if (0 === (e ? u.getErrors(t) : 0)) {
            if (t.hasAttribute("data-ajax")) {
              o.preventDefault();
              const e = t.getAttribute("action")
                  ? t.getAttribute("action").trim()
                  : "#",
                r = t.getAttribute("method")
                  ? t.getAttribute("method").trim()
                  : "GET",
                a = new FormData(t);
              t.classList.add("_sending");
              const s = await fetch(e, { method: r, body: a });
              if (s.ok) {
                await s.json();
                t.classList.remove("_sending"), n(t);
              } else alert("Ошибка"), t.classList.remove("_sending");
            } else t.hasAttribute("data-dev") && (o.preventDefault(), n(t));
          } else {
            o.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && c(e, !0, 1e3);
          }
        }
        function n(e) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } }),
          ),
            u.formClean(e),
            l(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0),
      (function () {
        function e(e) {
          if ("click" === e.type) {
            const t = e.target;
            if (t.closest("[data-goto]")) {
              const o = t.closest("[data-goto]"),
                n = o.dataset.goto ? o.dataset.goto : "",
                r = !!o.hasAttribute("data-goto-header"),
                a = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
              c(n, r, a), e.preventDefault();
            }
          } else if ("watcherCallback" === e.type && e.detail) {
            const t = e.detail.entry,
              o = t.target;
            if ("navigator" === o.dataset.watch) {
              const e = o.id,
                n =
                  (document.querySelector("[data-goto]._navigator-active"),
                  document.querySelector(`[data-goto="#${e}"]`));
              t.isIntersecting
                ? n && n.classList.add("_navigator-active")
                : n && n.classList.remove("_navigator-active");
            }
          }
        }
        document.addEventListener("click", e),
          document.addEventListener("watcherCallback", e);
      })();
  })();
})();