/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      144: function (t) {
        t.exports = (function () {
          "use strict";
          const t = "undefined" != typeof window,
            e =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            r = t && window.devicePixelRatio > 1,
            n = {
              elements_selector: ".lazy",
              container: e || t ? document : null,
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
            i = (t) => Object.assign({}, n, t),
            s = function (t, e) {
              let r;
              const n = "LazyLoad::Initialized",
                i = new t(e);
              try {
                r = new CustomEvent(n, { detail: { instance: i } });
              } catch (t) {
                (r = document.createEvent("CustomEvent")),
                  r.initCustomEvent(n, !1, !1, { instance: i });
              }
              window.dispatchEvent(r);
            },
            a = "src",
            o = "srcset",
            l = "sizes",
            u = "poster",
            c = "llOriginalAttrs",
            f = "data",
            h = "loading",
            d = "loaded",
            p = "applied",
            m = "error",
            g = "native",
            _ = "data-",
            v = "ll-status",
            y = (t, e) => t.getAttribute(_ + e),
            b = (t) => y(t, v),
            x = (t, e) =>
              ((t, e, r) => {
                const n = _ + e;
                null !== r ? t.setAttribute(n, r) : t.removeAttribute(n);
              })(t, v, e),
            w = (t) => x(t, null),
            T = (t) => null === b(t),
            E = (t) => b(t) === g,
            k = [h, d, p, m],
            A = (t, e, r, n) => {
              t &&
                "function" == typeof t &&
                (void 0 === n ? (void 0 === r ? t(e) : t(e, r)) : t(e, r, n));
            },
            M = (e, r) => {
              t && "" !== r && e.classList.add(r);
            },
            S = (e, r) => {
              t && "" !== r && e.classList.remove(r);
            },
            C = (t) => t.llTempImage,
            O = (t, e) => {
              if (!e) return;
              const r = e._observer;
              r && r.unobserve(t);
            },
            P = (t, e) => {
              t && (t.loadingCount += e);
            },
            D = (t, e) => {
              t && (t.toLoadCount = e);
            },
            L = (t) => {
              let e = [];
              for (let r, n = 0; (r = t.children[n]); n += 1)
                "SOURCE" === r.tagName && e.push(r);
              return e;
            },
            R = (t, e) => {
              const r = t.parentNode;
              r && "PICTURE" === r.tagName && L(r).forEach(e);
            },
            I = (t, e) => {
              L(t).forEach(e);
            },
            z = [a],
            B = [a, u],
            F = [a, o, l],
            N = [f],
            Y = (t) => !!t[c],
            q = (t) => t[c],
            X = (t) => delete t[c],
            H = (t, e) => {
              if (Y(t)) return;
              const r = {};
              e.forEach((e) => {
                r[e] = t.getAttribute(e);
              }),
                (t[c] = r);
            },
            U = (t, e) => {
              if (!Y(t)) return;
              const r = q(t);
              e.forEach((e) => {
                ((t, e, r) => {
                  r ? t.setAttribute(e, r) : t.removeAttribute(e);
                })(t, e, r[e]);
              });
            },
            V = (t, e, r) => {
              M(t, e.class_applied),
                x(t, p),
                r &&
                  (e.unobserve_completed && O(t, e),
                  A(e.callback_applied, t, r));
            },
            j = (t, e, r) => {
              M(t, e.class_loading),
                x(t, h),
                r && (P(r, 1), A(e.callback_loading, t, r));
            },
            W = (t, e, r) => {
              r && t.setAttribute(e, r);
            },
            G = (t, e) => {
              W(t, l, y(t, e.data_sizes)),
                W(t, o, y(t, e.data_srcset)),
                W(t, a, y(t, e.data_src));
            },
            $ = {
              IMG: (t, e) => {
                R(t, (t) => {
                  H(t, F), G(t, e);
                }),
                  H(t, F),
                  G(t, e);
              },
              IFRAME: (t, e) => {
                H(t, z), W(t, a, y(t, e.data_src));
              },
              VIDEO: (t, e) => {
                I(t, (t) => {
                  H(t, z), W(t, a, y(t, e.data_src));
                }),
                  H(t, B),
                  W(t, u, y(t, e.data_poster)),
                  W(t, a, y(t, e.data_src)),
                  t.load();
              },
              OBJECT: (t, e) => {
                H(t, N), W(t, f, y(t, e.data_src));
              },
            },
            Q = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            Z = (t, e) => {
              !e ||
                ((t) => t.loadingCount > 0)(e) ||
                ((t) => t.toLoadCount > 0)(e) ||
                A(t.callback_finish, e);
            },
            J = (t, e, r) => {
              t.addEventListener(e, r), (t.llEvLisnrs[e] = r);
            },
            K = (t, e, r) => {
              t.removeEventListener(e, r);
            },
            tt = (t) => !!t.llEvLisnrs,
            et = (t) => {
              if (!tt(t)) return;
              const e = t.llEvLisnrs;
              for (let r in e) {
                const n = e[r];
                K(t, r, n);
              }
              delete t.llEvLisnrs;
            },
            rt = (t, e, r) => {
              ((t) => {
                delete t.llTempImage;
              })(t),
                P(r, -1),
                ((t) => {
                  t && (t.toLoadCount -= 1);
                })(r),
                S(t, e.class_loading),
                e.unobserve_completed && O(t, r);
            },
            nt = (t, e, r) => {
              const n = C(t) || t;
              tt(n) ||
                ((t, e, r) => {
                  tt(t) || (t.llEvLisnrs = {});
                  const n = "VIDEO" === t.tagName ? "loadeddata" : "load";
                  J(t, n, e), J(t, "error", r);
                })(
                  n,
                  (i) => {
                    ((t, e, r, n) => {
                      const i = E(e);
                      rt(e, r, n),
                        M(e, r.class_loaded),
                        x(e, d),
                        A(r.callback_loaded, e, n),
                        i || Z(r, n);
                    })(0, t, e, r),
                      et(n);
                  },
                  (i) => {
                    ((t, e, r, n) => {
                      const i = E(e);
                      rt(e, r, n),
                        M(e, r.class_error),
                        x(e, m),
                        A(r.callback_error, e, n),
                        r.restore_on_error && U(e, F),
                        i || Z(r, n);
                    })(0, t, e, r),
                      et(n);
                  },
                );
            },
            it = (t, e, n) => {
              ((t) => Q.indexOf(t.tagName) > -1)(t)
                ? ((t, e, r) => {
                    nt(t, e, r),
                      ((t, e, r) => {
                        const n = $[t.tagName];
                        n && (n(t, e), j(t, e, r));
                      })(t, e, r);
                  })(t, e, n)
                : ((t, e, n) => {
                    ((t) => {
                      t.llTempImage = document.createElement("IMG");
                    })(t),
                      nt(t, e, n),
                      ((t) => {
                        Y(t) ||
                          (t[c] = { backgroundImage: t.style.backgroundImage });
                      })(t),
                      ((t, e, n) => {
                        const i = y(t, e.data_bg),
                          s = y(t, e.data_bg_hidpi),
                          o = r && s ? s : i;
                        o &&
                          ((t.style.backgroundImage = `url("${o}")`),
                          C(t).setAttribute(a, o),
                          j(t, e, n));
                      })(t, e, n),
                      ((t, e, n) => {
                        const i = y(t, e.data_bg_multi),
                          s = y(t, e.data_bg_multi_hidpi),
                          a = r && s ? s : i;
                        a && ((t.style.backgroundImage = a), V(t, e, n));
                      })(t, e, n),
                      ((t, e, r) => {
                        const n = y(t, e.data_bg_set);
                        if (!n) return;
                        let i = n.split("|").map((t) => `image-set(${t})`);
                        (t.style.backgroundImage = i.join()), V(t, e, r);
                      })(t, e, n);
                  })(t, e, n);
            },
            st = (t) => {
              t.removeAttribute(a), t.removeAttribute(o), t.removeAttribute(l);
            },
            at = (t) => {
              R(t, (t) => {
                U(t, F);
              }),
                U(t, F);
            },
            ot = {
              IMG: at,
              IFRAME: (t) => {
                U(t, z);
              },
              VIDEO: (t) => {
                I(t, (t) => {
                  U(t, z);
                }),
                  U(t, B),
                  t.load();
              },
              OBJECT: (t) => {
                U(t, N);
              },
            },
            lt = (t, e) => {
              ((t) => {
                const e = ot[t.tagName];
                e
                  ? e(t)
                  : ((t) => {
                      if (!Y(t)) return;
                      const e = q(t);
                      t.style.backgroundImage = e.backgroundImage;
                    })(t);
              })(t),
                ((t, e) => {
                  T(t) ||
                    E(t) ||
                    (S(t, e.class_entered),
                    S(t, e.class_exited),
                    S(t, e.class_applied),
                    S(t, e.class_loading),
                    S(t, e.class_loaded),
                    S(t, e.class_error));
                })(t, e),
                w(t),
                X(t);
            },
            ut = ["IMG", "IFRAME", "VIDEO"],
            ct = (t) => t.use_native && "loading" in HTMLImageElement.prototype,
            ft = (t, e, r) => {
              t.forEach((t) =>
                ((t) => t.isIntersecting || t.intersectionRatio > 0)(t)
                  ? ((t, e, r, n) => {
                      const i = ((t) => k.indexOf(b(t)) >= 0)(t);
                      x(t, "entered"),
                        M(t, r.class_entered),
                        S(t, r.class_exited),
                        ((t, e, r) => {
                          e.unobserve_entered && O(t, r);
                        })(t, r, n),
                        A(r.callback_enter, t, e, n),
                        i || it(t, r, n);
                    })(t.target, t, e, r)
                  : ((t, e, r, n) => {
                      T(t) ||
                        (M(t, r.class_exited),
                        ((t, e, r, n) => {
                          r.cancel_on_exit &&
                            ((t) => b(t) === h)(t) &&
                            "IMG" === t.tagName &&
                            (et(t),
                            ((t) => {
                              R(t, (t) => {
                                st(t);
                              }),
                                st(t);
                            })(t),
                            at(t),
                            S(t, r.class_loading),
                            P(n, -1),
                            w(t),
                            A(r.callback_cancel, t, e, n));
                        })(t, e, r, n),
                        A(r.callback_exit, t, e, n));
                    })(t.target, t, e, r),
              );
            },
            ht = (t) => Array.prototype.slice.call(t),
            dt = (t) => t.container.querySelectorAll(t.elements_selector),
            pt = (t) => ((t) => b(t) === m)(t),
            mt = (t, e) => ((t) => ht(t).filter(T))(t || dt(e)),
            gt = function (e, r) {
              const n = i(e);
              (this._settings = n),
                (this.loadingCount = 0),
                ((t, e) => {
                  ct(t) ||
                    (e._observer = new IntersectionObserver(
                      (r) => {
                        ft(r, t, e);
                      },
                      ((t) => ({
                        root: t.container === document ? null : t.container,
                        rootMargin: t.thresholds || t.threshold + "px",
                      }))(t),
                    ));
                })(n, this),
                ((e, r) => {
                  t &&
                    ((r._onlineHandler = () => {
                      ((t, e) => {
                        var r;
                        ((r = dt(t)), ht(r).filter(pt)).forEach((e) => {
                          S(e, t.class_error), w(e);
                        }),
                          e.update();
                      })(e, r);
                    }),
                    window.addEventListener("online", r._onlineHandler));
                })(n, this),
                this.update(r);
            };
          return (
            (gt.prototype = {
              update: function (t) {
                const r = this._settings,
                  n = mt(t, r);
                var i, s;
                D(this, n.length),
                  e
                    ? this.loadAll(n)
                    : ct(r)
                      ? ((t, e, r) => {
                          t.forEach((t) => {
                            -1 !== ut.indexOf(t.tagName) &&
                              ((t, e, r) => {
                                t.setAttribute("loading", "lazy"),
                                  nt(t, e, r),
                                  ((t, e) => {
                                    const r = $[t.tagName];
                                    r && r(t, e);
                                  })(t, e),
                                  x(t, g);
                              })(t, e, r);
                          }),
                            D(r, 0);
                        })(n, r, this)
                      : ((s = n),
                        ((t) => {
                          t.disconnect();
                        })((i = this._observer)),
                        ((t, e) => {
                          e.forEach((e) => {
                            t.observe(e);
                          });
                        })(i, s));
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  t &&
                    window.removeEventListener("online", this._onlineHandler),
                  dt(this._settings).forEach((t) => {
                    X(t);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (t) {
                const e = this._settings;
                mt(t, e).forEach((t) => {
                  O(t, this), it(t, e, this);
                });
              },
              restoreAll: function () {
                const t = this._settings;
                dt(t).forEach((e) => {
                  lt(e, t);
                });
              },
            }),
            (gt.load = (t, e) => {
              const r = i(e);
              it(t, r);
            }),
            (gt.resetStatus = (t) => {
              w(t);
            }),
            t &&
              ((t, e) => {
                if (e)
                  if (e.length) for (let r, n = 0; (r = e[n]); n += 1) s(t, r);
                  else s(t, e);
              })(gt, window.lazyLoadOptions),
            gt
          );
        })();
      },
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var s = (e[n] = { exports: {} });
    return t[n].call(s.exports, s, s.exports, r), s.exports;
  }
  (() => {
    "use strict";
    function t(t) {
      this.type = t;
    }
    (t.prototype.init = function () {
      const t = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let t = 0; t < this.nodes.length; t++) {
        const e = this.nodes[t],
          r = e.dataset.da.trim().split(","),
          n = {};
        (n.element = e),
          (n.parent = e.parentNode),
          (n.destination = document.querySelector(r[0].trim())),
          (n.breakpoint = r[1] ? r[1].trim() : "767"),
          (n.place = r[2] ? r[2].trim() : "last"),
          (n.index = this.indexInParent(n.parent, n.element)),
          this.оbjects.push(n);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (t) {
            return (
              "(" +
              this.type +
              "-width: " +
              t.breakpoint +
              "px)," +
              t.breakpoint
            );
          },
          this,
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (t, e, r) {
            return Array.prototype.indexOf.call(r, t) === e;
          },
        ));
      for (let e = 0; e < this.mediaQueries.length; e++) {
        const r = this.mediaQueries[e],
          n = String.prototype.split.call(r, ","),
          i = window.matchMedia(n[0]),
          s = n[1],
          a = Array.prototype.filter.call(this.оbjects, function (t) {
            return t.breakpoint === s;
          });
        i.addListener(function () {
          t.mediaHandler(i, a);
        }),
          this.mediaHandler(i, a);
      }
    }),
      (t.prototype.mediaHandler = function (t, e) {
        if (t.matches)
          for (let t = 0; t < e.length; t++) {
            const r = e[t];
            (r.index = this.indexInParent(r.parent, r.element)),
              this.moveTo(r.place, r.element, r.destination);
          }
        else
          for (let t = e.length - 1; t >= 0; t--) {
            const r = e[t];
            r.element.classList.contains(this.daClassname) &&
              this.moveBack(r.parent, r.element, r.index);
          }
      }),
      (t.prototype.moveTo = function (t, e, r) {
        e.classList.add(this.daClassname),
          "last" === t || t >= r.children.length
            ? r.insertAdjacentElement("beforeend", e)
            : "first" !== t
              ? r.children[t].insertAdjacentElement("beforebegin", e)
              : r.insertAdjacentElement("afterbegin", e);
      }),
      (t.prototype.moveBack = function (t, e, r) {
        e.classList.remove(this.daClassname),
          void 0 !== t.children[r]
            ? t.children[r].insertAdjacentElement("beforebegin", e)
            : t.insertAdjacentElement("beforeend", e);
      }),
      (t.prototype.indexInParent = function (t, e) {
        const r = Array.prototype.slice.call(t.children);
        return Array.prototype.indexOf.call(r, e);
      }),
      (t.prototype.arraySort = function (t) {
        "min" === this.type
          ? Array.prototype.sort.call(t, function (t, e) {
              return t.breakpoint === e.breakpoint
                ? t.place === e.place
                  ? 0
                  : "first" === t.place || "last" === e.place
                    ? -1
                    : "last" === t.place || "first" === e.place
                      ? 1
                      : t.place - e.place
                : t.breakpoint - e.breakpoint;
            })
          : Array.prototype.sort.call(t, function (t, e) {
              return t.breakpoint === e.breakpoint
                ? t.place === e.place
                  ? 0
                  : "first" === t.place || "last" === e.place
                    ? 1
                    : "last" === t.place || "first" === e.place
                      ? -1
                      : e.place - t.place
                : e.breakpoint - t.breakpoint;
            });
      });
    new t("max").init();
    let e = {
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
          e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
        );
      },
    };
    let n = (t, e = 500, r = 0) => {
        t.classList.contains("_slide") ||
          (t.classList.add("_slide"),
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = `${t.offsetHeight}px`),
          t.offsetHeight,
          (t.style.overflow = "hidden"),
          (t.style.height = r ? `${r}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          window.setTimeout(() => {
            (t.hidden = !r),
              !r && t.style.removeProperty("height"),
              t.style.removeProperty("padding-top"),
              t.style.removeProperty("padding-bottom"),
              t.style.removeProperty("margin-top"),
              t.style.removeProperty("margin-bottom"),
              !r && t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide");
          }, e));
      },
      i = (t, e = 500, r = 0) => {
        if (!t.classList.contains("_slide")) {
          t.classList.add("_slide"),
            (t.hidden = !t.hidden && null),
            r && t.style.removeProperty("height");
          let n = t.offsetHeight;
          (t.style.overflow = "hidden"),
            (t.style.height = r ? `${r}px` : "0px"),
            (t.style.paddingTop = 0),
            (t.style.paddingBottom = 0),
            (t.style.marginTop = 0),
            (t.style.marginBottom = 0),
            t.offsetHeight,
            (t.style.transitionProperty = "height, margin, padding"),
            (t.style.transitionDuration = e + "ms"),
            (t.style.height = n + "px"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              t.style.removeProperty("height"),
                t.style.removeProperty("overflow"),
                t.style.removeProperty("transition-duration"),
                t.style.removeProperty("transition-property"),
                t.classList.remove("_slide");
            }, e);
        }
      },
      s = !0,
      a = (t = 500) => {
        let e = document.querySelector("body");
        if (s) {
          let r = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let t = 0; t < r.length; t++) {
              r[t].style.paddingRight = "0px";
            }
            (e.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, t),
            (s = !1),
            setTimeout(function () {
              s = !0;
            }, t);
        }
      };
    function o(t) {
      setTimeout(() => {
        window.FLS && console.log(t);
      }, 0);
    }
    function l(t, e) {
      const r = Array.from(t).filter(function (t, r, n) {
        if (t.dataset[e]) return t.dataset[e].split(",")[0];
      });
      if (r.length) {
        const t = [];
        r.forEach((r) => {
          const n = {},
            i = r.dataset[e].split(",");
          (n.value = i[0]),
            (n.type = i[1] ? i[1].trim() : "max"),
            (n.item = r),
            t.push(n);
        });
        let n = t.map(function (t) {
          return (
            "(" +
            t.type +
            "-width: " +
            t.value +
            "px)," +
            t.value +
            "," +
            t.type
          );
        });
        n = (function (t) {
          return t.filter(function (t, e, r) {
            return r.indexOf(t) === e;
          });
        })(n);
        const i = [];
        if (n.length)
          return (
            n.forEach((e) => {
              const r = e.split(","),
                n = r[1],
                s = r[2],
                a = window.matchMedia(r[0]),
                o = t.filter(function (t) {
                  if (t.value === n && t.type === s) return !0;
                });
              i.push({ itemsArray: o, matchMedia: a });
            }),
            i
          );
      }
    }
    let u = (t, e = !1, r = 500, n = 0) => {
      const i = document.querySelector(t);
      if (i) {
        let s = "",
          l = 0;
        e &&
          ((s = "header.header"), (l = document.querySelector(s).offsetHeight));
        let u = {
          speedAsDuration: !0,
          speed: r,
          header: s,
          offset: n,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (a(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(i, "", u);
        else {
          let t = i.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
        }
        o(`[gotoBlock]: Юхуу...едем к ${t}`);
      } else o(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
    };
    const c = { inputMaskModule: null, selectModule: null };
    let f = {
      getErrors(t) {
        let e = 0,
          r = t.querySelectorAll("*[data-required]");
        return (
          r.length &&
            r.forEach((t) => {
              (null === t.offsetParent && "SELECT" !== t.tagName) ||
                t.disabled ||
                (e += this.validateInput(t));
            }),
          e
        );
      },
      validateInput(t) {
        let e = 0;
        return (
          "email" === t.dataset.required
            ? ((t.value = t.value.replace(" ", "")),
              this.emailTest(t) ? (this.addError(t), e++) : this.removeError(t))
            : ("checkbox" !== t.type || t.checked) && t.value
              ? this.removeError(t)
              : (this.addError(t), e++),
          e
        );
      },
      addError(t) {
        t.classList.add("_form-error"),
          t.parentElement.classList.add("_form-error");
        let e = t.parentElement.querySelector(".form__error");
        e && t.parentElement.removeChild(e),
          t.dataset.error &&
            t.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${t.dataset.error}</div>`,
            );
      },
      removeError(t) {
        t.classList.remove("_form-error"),
          t.parentElement.classList.remove("_form-error"),
          t.parentElement.querySelector(".form__error") &&
            t.parentElement.removeChild(
              t.parentElement.querySelector(".form__error"),
            );
      },
      formClean(t) {
        t.reset(),
          setTimeout(() => {
            let e = t.querySelectorAll("input,textarea");
            for (let t = 0; t < e.length; t++) {
              const r = e[t];
              r.parentElement.classList.remove("_form-focus"),
                r.classList.remove("_form-focus"),
                f.removeError(r),
                (r.value = r.dataset.placeholder);
            }
            let r = t.querySelectorAll(".checkbox__input");
            if (r.length > 0)
              for (let t = 0; t < r.length; t++) {
                r[t].checked = !1;
              }
            if (c.selectModule) {
              let e = t.querySelectorAll(".select");
              if (e.length)
                for (let t = 0; t < e.length; t++) {
                  const r = e[t].querySelector("select");
                  c.selectModule.selectBuild(r);
                }
            }
          }, 0);
      },
      emailTest: (t) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t.value),
    };
    new (r(144))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    let h = !1;
    function d(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return t;
    }
    function p(t, e) {
      (t.prototype = Object.create(e.prototype)),
        (t.prototype.constructor = t),
        (t.__proto__ = e);
    }
    setTimeout(() => {
      if (h) {
        let t = new Event("windowScroll");
        window.addEventListener("scroll", function (e) {
          document.dispatchEvent(t);
        });
      }
    }, 0);
    var m,
      g,
      _,
      v,
      y,
      b,
      x,
      w,
      T,
      E,
      k,
      A,
      M,
      S,
      C,
      O,
      P,
      D = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: { lineHeight: "" },
      },
      L = { duration: 0.5, overwrite: !1, delay: 0 },
      R = 1e8,
      I = 1e-8,
      z = 2 * Math.PI,
      B = z / 4,
      F = 0,
      N = Math.sqrt,
      Y = Math.cos,
      q = Math.sin,
      X = function (t) {
        return "string" == typeof t;
      },
      H = function (t) {
        return "function" == typeof t;
      },
      U = function (t) {
        return "number" == typeof t;
      },
      V = function (t) {
        return void 0 === t;
      },
      j = function (t) {
        return "object" == typeof t;
      },
      W = function (t) {
        return !1 !== t;
      },
      G = function () {
        return "undefined" != typeof window;
      },
      $ = function (t) {
        return H(t) || X(t);
      },
      Q =
        ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
      Z = Array.isArray,
      J = /(?:-?\.?\d|\.)+/gi,
      K = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      tt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      et = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      rt = /[+-]=-?[.\d]+/,
      nt = /[^,'"\[\]\s]+/gi,
      it = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      st = {},
      at = {},
      ot = function (t) {
        return (at = zt(t, st)) && Br;
      },
      lt = function (t, e) {
        return console.warn(
          "Invalid property",
          t,
          "set to",
          e,
          "Missing plugin? gsap.registerPlugin()",
        );
      },
      ut = function (t, e) {
        return !e && console.warn(t);
      },
      ct = function (t, e) {
        return (t && (st[t] = e) && at && (at[t] = e)) || st;
      },
      ft = function () {
        return 0;
      },
      ht = { suppressEvents: !0, isStart: !0, kill: !1 },
      dt = { suppressEvents: !0, kill: !1 },
      pt = { suppressEvents: !0 },
      mt = {},
      gt = [],
      _t = {},
      vt = {},
      yt = {},
      bt = 30,
      xt = [],
      wt = "",
      Tt = function (t) {
        var e,
          r,
          n = t[0];
        if ((j(n) || H(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
          for (r = xt.length; r-- && !xt[r].targetTest(n); );
          e = xt[r];
        }
        for (r = t.length; r--; )
          (t[r] && (t[r]._gsap || (t[r]._gsap = new Ze(t[r], e)))) ||
            t.splice(r, 1);
        return t;
      },
      Et = function (t) {
        return t._gsap || Tt(pe(t))[0]._gsap;
      },
      kt = function (t, e, r) {
        return (r = t[e]) && H(r)
          ? t[e]()
          : (V(r) && t.getAttribute && t.getAttribute(e)) || r;
      },
      At = function (t, e) {
        return (t = t.split(",")).forEach(e) || t;
      },
      Mt = function (t) {
        return Math.round(1e5 * t) / 1e5 || 0;
      },
      St = function (t) {
        return Math.round(1e7 * t) / 1e7 || 0;
      },
      Ct = function (t, e) {
        var r = e.charAt(0),
          n = parseFloat(e.substr(2));
        return (
          (t = parseFloat(t)),
          "+" === r ? t + n : "-" === r ? t - n : "*" === r ? t * n : t / n
        );
      },
      Ot = function (t, e) {
        for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
        return n < r;
      },
      Pt = function () {
        var t,
          e,
          r = gt.length,
          n = gt.slice(0);
        for (_t = {}, gt.length = 0, t = 0; t < r; t++)
          (e = n[t]) &&
            e._lazy &&
            (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
      },
      Dt = function (t, e, r, n) {
        gt.length && !g && Pt(),
          t.render(e, r, n || (g && e < 0 && (t._initted || t._startAt))),
          gt.length && !g && Pt();
      },
      Lt = function (t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(nt).length < 2
          ? e
          : X(t)
            ? t.trim()
            : t;
      },
      Rt = function (t) {
        return t;
      },
      It = function (t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t;
      },
      zt = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      },
      Bt = function t(e, r) {
        for (var n in r)
          "__proto__" !== n &&
            "constructor" !== n &&
            "prototype" !== n &&
            (e[n] = j(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
        return e;
      },
      Ft = function (t, e) {
        var r,
          n = {};
        for (r in t) r in e || (n[r] = t[r]);
        return n;
      },
      Nt = function (t) {
        var e,
          r = t.parent || v,
          n = t.keyframes
            ? ((e = Z(t.keyframes)),
              function (t, r) {
                for (var n in r)
                  n in t ||
                    ("duration" === n && e) ||
                    "ease" === n ||
                    (t[n] = r[n]);
              })
            : It;
        if (W(t.inherit))
          for (; r; ) n(t, r.vars.defaults), (r = r.parent || r._dp);
        return t;
      },
      Yt = function (t, e, r, n, i) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var s,
          a = t[n];
        if (i) for (s = e[i]; a && a[i] > s; ) a = a._prev;
        return (
          a
            ? ((e._next = a._next), (a._next = e))
            : ((e._next = t[r]), (t[r] = e)),
          e._next ? (e._next._prev = e) : (t[n] = e),
          (e._prev = a),
          (e.parent = e._dp = t),
          e
        );
      },
      qt = function (t, e, r, n) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var i = e._prev,
          s = e._next;
        i ? (i._next = s) : t[r] === e && (t[r] = s),
          s ? (s._prev = i) : t[n] === e && (t[n] = i),
          (e._next = e._prev = e.parent = null);
      },
      Xt = function (t, e) {
        t.parent &&
          (!e || t.parent.autoRemoveChildren) &&
          t.parent.remove &&
          t.parent.remove(t),
          (t._act = 0);
      },
      Ht = function (t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
          for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
        return t;
      },
      Ut = function (t, e, r, n) {
        return (
          t._startAt &&
          (g
            ? t._startAt.revert(dt)
            : (t.vars.immediateRender && !t.vars.autoRevert) ||
              t._startAt.render(e, !0, n))
        );
      },
      Vt = function t(e) {
        return !e || (e._ts && t(e.parent));
      },
      jt = function (t) {
        return t._repeat ? Wt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
      },
      Wt = function (t, e) {
        var r = Math.floor((t /= e));
        return t && r === t ? r - 1 : r;
      },
      Gt = function (t, e) {
        return (
          (t - e._start) * e._ts +
          (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
        );
      },
      $t = function (t) {
        return (t._end = St(
          t._start + (t._tDur / Math.abs(t._ts || t._rts || I) || 0),
        ));
      },
      Qt = function (t, e) {
        var r = t._dp;
        return (
          r &&
            r.smoothChildTiming &&
            t._ts &&
            ((t._start = St(
              r._time -
                (t._ts > 0
                  ? e / t._ts
                  : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts),
            )),
            $t(t),
            r._dirty || Ht(r, t)),
          t
        );
      },
      Zt = function (t, e) {
        var r;
        if (
          ((e._time ||
            (!e._dur && e._initted) ||
            (e._start < t._time && (e._dur || !e.add))) &&
            ((r = Gt(t.rawTime(), e)),
            (!e._dur || ue(0, e.totalDuration(), r) - e._tTime > I) &&
              e.render(r, !0)),
          Ht(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
        ) {
          if (t._dur < t.duration())
            for (r = t; r._dp; )
              r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
          t._zTime = -1e-8;
        }
      },
      Jt = function (t, e, r, n) {
        return (
          e.parent && Xt(e),
          (e._start = St(
            (U(r) ? r : r || t !== v ? ae(t, r, e) : t._time) + e._delay,
          )),
          (e._end = St(
            e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0),
          )),
          Yt(t, e, "_first", "_last", t._sort ? "_start" : 0),
          re(e) || (t._recent = e),
          n || Zt(t, e),
          t._ts < 0 && Qt(t, t._tTime),
          t
        );
      },
      Kt = function (t, e) {
        return (
          (st.ScrollTrigger || lt("scrollTrigger", e)) &&
          st.ScrollTrigger.create(e, t)
        );
      },
      te = function (t, e, r, n, i) {
        return (
          sr(t, e, i),
          t._initted
            ? !r &&
              t._pt &&
              !g &&
              ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
              T !== Fe.frame
              ? (gt.push(t), (t._lazy = [i, n]), 1)
              : void 0
            : 1
        );
      },
      ee = function t(e) {
        var r = e.parent;
        return (
          r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r))
        );
      },
      re = function (t) {
        var e = t.data;
        return "isFromStart" === e || "isStart" === e;
      },
      ne = function (t, e, r, n) {
        var i = t._repeat,
          s = St(e) || 0,
          a = t._tTime / t._tDur;
        return (
          a && !n && (t._time *= s / t._dur),
          (t._dur = s),
          (t._tDur = i ? (i < 0 ? 1e10 : St(s * (i + 1) + t._rDelay * i)) : s),
          a > 0 && !n && Qt(t, (t._tTime = t._tDur * a)),
          t.parent && $t(t),
          r || Ht(t.parent, t),
          t
        );
      },
      ie = function (t) {
        return t instanceof Ke ? Ht(t) : ne(t, t._dur);
      },
      se = { _start: 0, endTime: ft, totalDuration: ft },
      ae = function t(e, r, n) {
        var i,
          s,
          a,
          o = e.labels,
          l = e._recent || se,
          u = e.duration() >= R ? l.endTime(!1) : e._dur;
        return X(r) && (isNaN(r) || r in o)
          ? ((s = r.charAt(0)),
            (a = "%" === r.substr(-1)),
            (i = r.indexOf("=")),
            "<" === s || ">" === s
              ? (i >= 0 && (r = r.replace(/=/, "")),
                ("<" === s ? l._start : l.endTime(l._repeat >= 0)) +
                  (parseFloat(r.substr(1)) || 0) *
                    (a ? (i < 0 ? l : n).totalDuration() / 100 : 1))
              : i < 0
                ? (r in o || (o[r] = u), o[r])
                : ((s = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
                  a && n && (s = (s / 100) * (Z(n) ? n[0] : n).totalDuration()),
                  i > 1 ? t(e, r.substr(0, i - 1), n) + s : u + s))
          : null == r
            ? u
            : +r;
      },
      oe = function (t, e, r) {
        var n,
          i,
          s = U(e[1]),
          a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
          o = e[a];
        if ((s && (o.duration = e[1]), (o.parent = r), t)) {
          for (n = o, i = r; i && !("immediateRender" in n); )
            (n = i.vars.defaults || {}), (i = W(i.vars.inherit) && i.parent);
          (o.immediateRender = W(n.immediateRender)),
            t < 2 ? (o.runBackwards = 1) : (o.startAt = e[a - 1]);
        }
        return new cr(e[0], o, e[a + 1]);
      },
      le = function (t, e) {
        return t || 0 === t ? e(t) : e;
      },
      ue = function (t, e, r) {
        return r < t ? t : r > e ? e : r;
      },
      ce = function (t, e) {
        return X(t) && (e = it.exec(t)) ? e[1] : "";
      },
      fe = [].slice,
      he = function (t, e) {
        return (
          t &&
          j(t) &&
          "length" in t &&
          ((!e && !t.length) || (t.length - 1 in t && j(t[0]))) &&
          !t.nodeType &&
          t !== y
        );
      },
      de = function (t, e, r) {
        return (
          void 0 === r && (r = []),
          t.forEach(function (t) {
            var n;
            return (X(t) && !e) || he(t, 1)
              ? (n = r).push.apply(n, pe(t))
              : r.push(t);
          }) || r
        );
      },
      pe = function (t, e, r) {
        return _ && !e && _.selector
          ? _.selector(t)
          : !X(t) || r || (!b && Ne())
            ? Z(t)
              ? de(t, r)
              : he(t)
                ? fe.call(t, 0)
                : t
                  ? [t]
                  : []
            : fe.call((e || x).querySelectorAll(t), 0);
      },
      me = function (t) {
        return (
          (t = pe(t)[0] || ut("Invalid scope") || {}),
          function (e) {
            var r = t.current || t.nativeElement || t;
            return pe(
              e,
              r.querySelectorAll
                ? r
                : r === t
                  ? ut("Invalid scope") || x.createElement("div")
                  : t,
            );
          }
        );
      },
      ge = function (t) {
        return t.sort(function () {
          return 0.5 - Math.random();
        });
      },
      _e = function (t) {
        if (H(t)) return t;
        var e = j(t) ? t : { each: t },
          r = je(e.ease),
          n = e.from || 0,
          i = parseFloat(e.base) || 0,
          s = {},
          a = n > 0 && n < 1,
          o = isNaN(n) || a,
          l = e.axis,
          u = n,
          c = n;
        return (
          X(n)
            ? (u = c = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
            : !a && o && ((u = n[0]), (c = n[1])),
          function (t, a, f) {
            var h,
              d,
              p,
              m,
              g,
              _,
              v,
              y,
              b,
              x = (f || e).length,
              w = s[x];
            if (!w) {
              if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, R])[1])) {
                for (
                  v = -R;
                  v < (v = f[b++].getBoundingClientRect().left) && b < x;

                );
                b < x && b--;
              }
              for (
                w = s[x] = [],
                  h = o ? Math.min(b, x) * u - 0.5 : n % b,
                  d = b === R ? 0 : o ? (x * c) / b - 0.5 : (n / b) | 0,
                  v = 0,
                  y = R,
                  _ = 0;
                _ < x;
                _++
              )
                (p = (_ % b) - h),
                  (m = d - ((_ / b) | 0)),
                  (w[_] = g =
                    l ? Math.abs("y" === l ? m : p) : N(p * p + m * m)),
                  g > v && (v = g),
                  g < y && (y = g);
              "random" === n && ge(w),
                (w.max = v - y),
                (w.min = y),
                (w.v = x =
                  (parseFloat(e.amount) ||
                    parseFloat(e.each) *
                      (b > x
                        ? x - 1
                        : l
                          ? "y" === l
                            ? x / b
                            : b
                          : Math.max(b, x / b)) ||
                    0) * ("edges" === n ? -1 : 1)),
                (w.b = x < 0 ? i - x : i),
                (w.u = ce(e.amount || e.each) || 0),
                (r = r && x < 0 ? Ue(r) : r);
            }
            return (
              (x = (w[t] - w.min) / w.max || 0),
              St(w.b + (r ? r(x) : x) * w.v) + w.u
            );
          }
        );
      },
      ve = function (t) {
        var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
        return function (r) {
          var n = St(Math.round(parseFloat(r) / t) * t * e);
          return (n - (n % 1)) / e + (U(r) ? 0 : ce(r));
        };
      },
      ye = function (t, e) {
        var r,
          n,
          i = Z(t);
        return (
          !i &&
            j(t) &&
            ((r = i = t.radius || R),
            t.values
              ? ((t = pe(t.values)), (n = !U(t[0])) && (r *= r))
              : (t = ve(t.increment))),
          le(
            e,
            i
              ? H(t)
                ? function (e) {
                    return (n = t(e)), Math.abs(n - e) <= r ? n : e;
                  }
                : function (e) {
                    for (
                      var i,
                        s,
                        a = parseFloat(n ? e.x : e),
                        o = parseFloat(n ? e.y : 0),
                        l = R,
                        u = 0,
                        c = t.length;
                      c--;

                    )
                      (i = n
                        ? (i = t[c].x - a) * i + (s = t[c].y - o) * s
                        : Math.abs(t[c] - a)) < l && ((l = i), (u = c));
                    return (
                      (u = !r || l <= r ? t[u] : e),
                      n || u === e || U(e) ? u : u + ce(e)
                    );
                  }
              : ve(t),
          )
        );
      },
      be = function (t, e, r, n) {
        return le(Z(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
          return Z(t)
            ? t[~~(Math.random() * t.length)]
            : (r = r || 1e-5) &&
                (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
                Math.floor(
                  Math.round(
                    (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r,
                  ) *
                    r *
                    n,
                ) / n;
        });
      },
      xe = function (t, e, r) {
        return le(r, function (r) {
          return t[~~e(r)];
        });
      },
      we = function (t) {
        for (var e, r, n, i, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
          (n = t.indexOf(")", e)),
            (i = "[" === t.charAt(e + 7)),
            (r = t.substr(e + 7, n - e - 7).match(i ? nt : J)),
            (a +=
              t.substr(s, e - s) +
              be(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
            (s = n + 1);
        return a + t.substr(s, t.length - s);
      },
      Te = function (t, e, r, n, i) {
        var s = e - t,
          a = n - r;
        return le(i, function (e) {
          return r + (((e - t) / s) * a || 0);
        });
      },
      Ee = function (t, e, r) {
        var n,
          i,
          s,
          a = t.labels,
          o = R;
        for (n in a)
          (i = a[n] - e) < 0 == !!r &&
            i &&
            o > (i = Math.abs(i)) &&
            ((s = n), (o = i));
        return s;
      },
      ke = function (t, e, r) {
        var n,
          i,
          s,
          a = t.vars,
          o = a[e],
          l = _,
          u = t._ctx;
        if (o)
          return (
            (n = a[e + "Params"]),
            (i = a.callbackScope || t),
            r && gt.length && Pt(),
            u && (_ = u),
            (s = n ? o.apply(i, n) : o.call(i)),
            (_ = l),
            s
          );
      },
      Ae = function (t) {
        return (
          Xt(t),
          t.scrollTrigger && t.scrollTrigger.kill(!!g),
          t.progress() < 1 && ke(t, "onInterrupt"),
          t
        );
      },
      Me = [],
      Se = function (t) {
        if (t)
          if (((t = (!t.name && t.default) || t), G() || t.headless)) {
            var e = t.name,
              r = H(t),
              n =
                e && !r && t.init
                  ? function () {
                      this._props = [];
                    }
                  : t,
              i = {
                init: ft,
                render: yr,
                add: nr,
                kill: xr,
                modifier: br,
                rawVars: 0,
              },
              s = {
                targetTest: 0,
                get: 0,
                getSetter: mr,
                aliases: {},
                register: 0,
              };
            if ((Ne(), t !== n)) {
              if (vt[e]) return;
              It(n, It(Ft(t, i), s)),
                zt(n.prototype, zt(i, Ft(t, s))),
                (vt[(n.prop = e)] = n),
                t.targetTest && (xt.push(n), (mt[e] = 1)),
                (e =
                  ("css" === e
                    ? "CSS"
                    : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
            }
            ct(e, n), t.register && t.register(Br, n, Er);
          } else Me.push(t);
      },
      Ce = 255,
      Oe = {
        aqua: [0, Ce, Ce],
        lime: [0, Ce, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, Ce],
        navy: [0, 0, 128],
        white: [Ce, Ce, Ce],
        olive: [128, 128, 0],
        yellow: [Ce, Ce, 0],
        orange: [Ce, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [Ce, 0, 0],
        pink: [Ce, 192, 203],
        cyan: [0, Ce, Ce],
        transparent: [Ce, Ce, Ce, 0],
      },
      Pe = function (t, e, r) {
        return (
          ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
            ? e + (r - e) * t * 6
            : t < 0.5
              ? r
              : 3 * t < 2
                ? e + (r - e) * (2 / 3 - t) * 6
                : e) *
            Ce +
            0.5) |
          0
        );
      },
      De = function (t, e, r) {
        var n,
          i,
          s,
          a,
          o,
          l,
          u,
          c,
          f,
          h,
          d = t ? (U(t) ? [t >> 16, (t >> 8) & Ce, t & Ce] : 0) : Oe.black;
        if (!d) {
          if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Oe[t]))
            d = Oe[t];
          else if ("#" === t.charAt(0)) {
            if (
              (t.length < 6 &&
                ((n = t.charAt(1)),
                (i = t.charAt(2)),
                (s = t.charAt(3)),
                (t =
                  "#" +
                  n +
                  n +
                  i +
                  i +
                  s +
                  s +
                  (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
              9 === t.length)
            )
              return [
                (d = parseInt(t.substr(1, 6), 16)) >> 16,
                (d >> 8) & Ce,
                d & Ce,
                parseInt(t.substr(7), 16) / 255,
              ];
            d = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & Ce, t & Ce];
          } else if ("hsl" === t.substr(0, 3))
            if (((d = h = t.match(J)), e)) {
              if (~t.indexOf("="))
                return (d = t.match(K)), r && d.length < 4 && (d[3] = 1), d;
            } else
              (a = (+d[0] % 360) / 360),
                (o = +d[1] / 100),
                (n =
                  2 * (l = +d[2] / 100) -
                  (i = l <= 0.5 ? l * (o + 1) : l + o - l * o)),
                d.length > 3 && (d[3] *= 1),
                (d[0] = Pe(a + 1 / 3, n, i)),
                (d[1] = Pe(a, n, i)),
                (d[2] = Pe(a - 1 / 3, n, i));
          else d = t.match(J) || Oe.transparent;
          d = d.map(Number);
        }
        return (
          e &&
            !h &&
            ((n = d[0] / Ce),
            (i = d[1] / Ce),
            (s = d[2] / Ce),
            (l = ((u = Math.max(n, i, s)) + (c = Math.min(n, i, s))) / 2),
            u === c
              ? (a = o = 0)
              : ((f = u - c),
                (o = l > 0.5 ? f / (2 - u - c) : f / (u + c)),
                (a =
                  u === n
                    ? (i - s) / f + (i < s ? 6 : 0)
                    : u === i
                      ? (s - n) / f + 2
                      : (n - i) / f + 4),
                (a *= 60)),
            (d[0] = ~~(a + 0.5)),
            (d[1] = ~~(100 * o + 0.5)),
            (d[2] = ~~(100 * l + 0.5))),
          r && d.length < 4 && (d[3] = 1),
          d
        );
      },
      Le = function (t) {
        var e = [],
          r = [],
          n = -1;
        return (
          t.split(Ie).forEach(function (t) {
            var i = t.match(tt) || [];
            e.push.apply(e, i), r.push((n += i.length + 1));
          }),
          (e.c = r),
          e
        );
      },
      Re = function (t, e, r) {
        var n,
          i,
          s,
          a,
          o = "",
          l = (t + o).match(Ie),
          u = e ? "hsla(" : "rgba(",
          c = 0;
        if (!l) return t;
        if (
          ((l = l.map(function (t) {
            return (
              (t = De(t, e, 1)) &&
              u +
                (e
                  ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                  : t.join(",")) +
                ")"
            );
          })),
          r && ((s = Le(t)), (n = r.c).join(o) !== s.c.join(o)))
        )
          for (a = (i = t.replace(Ie, "1").split(tt)).length - 1; c < a; c++)
            o +=
              i[c] +
              (~n.indexOf(c)
                ? l.shift() || u + "0,0,0,0)"
                : (s.length ? s : l.length ? l : r).shift());
        if (!i)
          for (a = (i = t.split(Ie)).length - 1; c < a; c++) o += i[c] + l[c];
        return o + i[a];
      },
      Ie = (function () {
        var t,
          e =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (t in Oe) e += "|" + t + "\\b";
        return new RegExp(e + ")", "gi");
      })(),
      ze = /hsl[a]?\(/,
      Be = function (t) {
        var e,
          r = t.join(" ");
        if (((Ie.lastIndex = 0), Ie.test(r)))
          return (
            (e = ze.test(r)),
            (t[1] = Re(t[1], e)),
            (t[0] = Re(t[0], e, Le(t[1]))),
            !0
          );
      },
      Fe = (function () {
        var t,
          e,
          r,
          n,
          i,
          s,
          a = Date.now,
          o = 500,
          l = 33,
          u = a(),
          c = u,
          f = 1e3 / 240,
          h = f,
          d = [],
          p = function r(p) {
            var m,
              g,
              _,
              v,
              y = a() - c,
              b = !0 === p;
            if (
              ((y > o || y < 0) && (u += y - l),
              ((m = (_ = (c += y) - u) - h) > 0 || b) &&
                ((v = ++n.frame),
                (i = _ - 1e3 * n.time),
                (n.time = _ /= 1e3),
                (h += m + (m >= f ? 4 : f - m)),
                (g = 1)),
              b || (t = e(r)),
              g)
            )
              for (s = 0; s < d.length; s++) d[s](_, i, v, p);
          };
        return (n = {
          time: 0,
          frame: 0,
          tick: function () {
            p(!0);
          },
          deltaRatio: function (t) {
            return i / (1e3 / (t || 60));
          },
          wake: function () {
            w &&
              (!b &&
                G() &&
                ((y = b = window),
                (x = y.document || {}),
                (st.gsap = Br),
                (y.gsapVersions || (y.gsapVersions = [])).push(Br.version),
                ot(at || y.GreenSockGlobals || (!y.gsap && y) || {}),
                Me.forEach(Se)),
              (r =
                "undefined" != typeof requestAnimationFrame &&
                requestAnimationFrame),
              t && n.sleep(),
              (e =
                r ||
                function (t) {
                  return setTimeout(t, (h - 1e3 * n.time + 1) | 0);
                }),
              (k = 1),
              p(2));
          },
          sleep: function () {
            (r ? cancelAnimationFrame : clearTimeout)(t), (k = 0), (e = ft);
          },
          lagSmoothing: function (t, e) {
            (o = t || 1 / 0), (l = Math.min(e || 33, o));
          },
          fps: function (t) {
            (f = 1e3 / (t || 240)), (h = 1e3 * n.time + f);
          },
          add: function (t, e, r) {
            var i = e
              ? function (e, r, s, a) {
                  t(e, r, s, a), n.remove(i);
                }
              : t;
            return n.remove(t), d[r ? "unshift" : "push"](i), Ne(), i;
          },
          remove: function (t, e) {
            ~(e = d.indexOf(t)) && d.splice(e, 1) && s >= e && s--;
          },
          _listeners: d,
        });
      })(),
      Ne = function () {
        return !k && Fe.wake();
      },
      Ye = {},
      qe = /^[\d.\-M][\d.\-,\s]/,
      Xe = /["']/g,
      He = function (t) {
        for (
          var e,
            r,
            n,
            i = {},
            s = t.substr(1, t.length - 3).split(":"),
            a = s[0],
            o = 1,
            l = s.length;
          o < l;
          o++
        )
          (r = s[o]),
            (e = o !== l - 1 ? r.lastIndexOf(",") : r.length),
            (n = r.substr(0, e)),
            (i[a] = isNaN(n) ? n.replace(Xe, "").trim() : +n),
            (a = r.substr(e + 1).trim());
        return i;
      },
      Ue = function (t) {
        return function (e) {
          return 1 - t(1 - e);
        };
      },
      Ve = function t(e, r) {
        for (var n, i = e._first; i; )
          i instanceof Ke
            ? t(i, r)
            : !i.vars.yoyoEase ||
              (i._yoyo && i._repeat) ||
              i._yoyo === r ||
              (i.timeline
                ? t(i.timeline, r)
                : ((n = i._ease),
                  (i._ease = i._yEase),
                  (i._yEase = n),
                  (i._yoyo = r))),
            (i = i._next);
      },
      je = function (t, e) {
        return (
          (t &&
            (H(t)
              ? t
              : Ye[t] ||
                (function (t) {
                  var e,
                    r,
                    n,
                    i,
                    s = (t + "").split("("),
                    a = Ye[s[0]];
                  return a && s.length > 1 && a.config
                    ? a.config.apply(
                        null,
                        ~t.indexOf("{")
                          ? [He(s[1])]
                          : ((e = t),
                            (r = e.indexOf("(") + 1),
                            (n = e.indexOf(")")),
                            (i = e.indexOf("(", r)),
                            e.substring(
                              r,
                              ~i && i < n ? e.indexOf(")", n + 1) : n,
                            ))
                              .split(",")
                              .map(Lt),
                      )
                    : Ye._CE && qe.test(t)
                      ? Ye._CE("", t)
                      : a;
                })(t))) ||
          e
        );
      },
      We = function (t, e, r, n) {
        void 0 === r &&
          (r = function (t) {
            return 1 - e(1 - t);
          }),
          void 0 === n &&
            (n = function (t) {
              return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
            });
        var i,
          s = { easeIn: e, easeOut: r, easeInOut: n };
        return (
          At(t, function (t) {
            for (var e in ((Ye[t] = st[t] = s),
            (Ye[(i = t.toLowerCase())] = r),
            s))
              Ye[
                i +
                  ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
              ] = Ye[t + "." + e] = s[e];
          }),
          s
        );
      },
      Ge = function (t) {
        return function (e) {
          return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
        };
      },
      $e = function t(e, r, n) {
        var i = r >= 1 ? r : 1,
          s = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
          a = (s / z) * (Math.asin(1 / i) || 0),
          o = function (t) {
            return 1 === t ? 1 : i * Math.pow(2, -10 * t) * q((t - a) * s) + 1;
          },
          l =
            "out" === e
              ? o
              : "in" === e
                ? function (t) {
                    return 1 - o(1 - t);
                  }
                : Ge(o);
        return (
          (s = z / s),
          (l.config = function (r, n) {
            return t(e, r, n);
          }),
          l
        );
      },
      Qe = function t(e, r) {
        void 0 === r && (r = 1.70158);
        var n = function (t) {
            return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
          },
          i =
            "out" === e
              ? n
              : "in" === e
                ? function (t) {
                    return 1 - n(1 - t);
                  }
                : Ge(n);
        return (
          (i.config = function (r) {
            return t(e, r);
          }),
          i
        );
      };
    At("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
      var r = e < 5 ? e + 1 : e;
      We(
        t + ",Power" + (r - 1),
        e
          ? function (t) {
              return Math.pow(t, r);
            }
          : function (t) {
              return t;
            },
        function (t) {
          return 1 - Math.pow(1 - t, r);
        },
        function (t) {
          return t < 0.5
            ? Math.pow(2 * t, r) / 2
            : 1 - Math.pow(2 * (1 - t), r) / 2;
        },
      );
    }),
      (Ye.Linear.easeNone = Ye.none = Ye.Linear.easeIn),
      We("Elastic", $e("in"), $e("out"), $e()),
      (A = 7.5625),
      (C = 2 * (S = 1 / (M = 2.75))),
      (O = 2.5 * S),
      We(
        "Bounce",
        function (t) {
          return 1 - P(1 - t);
        },
        (P = function (t) {
          return t < S
            ? A * t * t
            : t < C
              ? A * Math.pow(t - 1.5 / M, 2) + 0.75
              : t < O
                ? A * (t -= 2.25 / M) * t + 0.9375
                : A * Math.pow(t - 2.625 / M, 2) + 0.984375;
        }),
      ),
      We("Expo", function (t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0;
      }),
      We("Circ", function (t) {
        return -(N(1 - t * t) - 1);
      }),
      We("Sine", function (t) {
        return 1 === t ? 1 : 1 - Y(t * B);
      }),
      We("Back", Qe("in"), Qe("out"), Qe()),
      (Ye.SteppedEase =
        Ye.steps =
        st.SteppedEase =
          {
            config: function (t, e) {
              void 0 === t && (t = 1);
              var r = 1 / t,
                n = t + (e ? 0 : 1),
                i = e ? 1 : 0;
              return function (t) {
                return (((n * ue(0, 0.99999999, t)) | 0) + i) * r;
              };
            },
          }),
      (L.ease = Ye["quad.out"]),
      At(
        "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        function (t) {
          return (wt += t + "," + t + "Params,");
        },
      );
    var Ze = function (t, e) {
        (this.id = F++),
          (t._gsap = this),
          (this.target = t),
          (this.harness = e),
          (this.get = e ? e.get : kt),
          (this.set = e ? e.getSetter : mr);
      },
      Je = (function () {
        function t(t) {
          (this.vars = t),
            (this._delay = +t.delay || 0),
            (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
              ((this._rDelay = t.repeatDelay || 0),
              (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
            (this._ts = 1),
            ne(this, +t.duration, 1, 1),
            (this.data = t.data),
            _ && ((this._ctx = _), _.data.push(this)),
            k || Fe.wake();
        }
        var e = t.prototype;
        return (
          (e.delay = function (t) {
            return t || 0 === t
              ? (this.parent &&
                  this.parent.smoothChildTiming &&
                  this.startTime(this._start + t - this._delay),
                (this._delay = t),
                this)
              : this._delay;
          }),
          (e.duration = function (t) {
            return arguments.length
              ? this.totalDuration(
                  this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t,
                )
              : this.totalDuration() && this._dur;
          }),
          (e.totalDuration = function (t) {
            return arguments.length
              ? ((this._dirty = 0),
                ne(
                  this,
                  this._repeat < 0
                    ? t
                    : (t - this._repeat * this._rDelay) / (this._repeat + 1),
                ))
              : this._tDur;
          }),
          (e.totalTime = function (t, e) {
            if ((Ne(), !arguments.length)) return this._tTime;
            var r = this._dp;
            if (r && r.smoothChildTiming && this._ts) {
              for (
                Qt(this, t), !r._dp || r.parent || Zt(r, this);
                r && r.parent;

              )
                r.parent._time !==
                  r._start +
                    (r._ts >= 0
                      ? r._tTime / r._ts
                      : (r.totalDuration() - r._tTime) / -r._ts) &&
                  r.totalTime(r._tTime, !0),
                  (r = r.parent);
              !this.parent &&
                this._dp.autoRemoveChildren &&
                ((this._ts > 0 && t < this._tDur) ||
                  (this._ts < 0 && t > 0) ||
                  (!this._tDur && !t)) &&
                Jt(this._dp, this, this._start - this._delay);
            }
            return (
              (this._tTime !== t ||
                (!this._dur && !e) ||
                (this._initted && Math.abs(this._zTime) === I) ||
                (!t && !this._initted && (this.add || this._ptLookup))) &&
                (this._ts || (this._pTime = t), Dt(this, t, e)),
              this
            );
          }),
          (e.time = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  Math.min(this.totalDuration(), t + jt(this)) %
                    (this._dur + this._rDelay) || (t ? this._dur : 0),
                  e,
                )
              : this._time;
          }),
          (e.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.rawTime() > 0
                  ? 1
                  : 0;
          }),
          (e.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                    jt(this),
                  e,
                )
              : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.rawTime() > 0
                  ? 1
                  : 0;
          }),
          (e.iteration = function (t, e) {
            var r = this.duration() + this._rDelay;
            return arguments.length
              ? this.totalTime(this._time + (t - 1) * r, e)
              : this._repeat
                ? Wt(this._tTime, r) + 1
                : 1;
          }),
          (e.timeScale = function (t, e) {
            if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
            if (this._rts === t) return this;
            var r =
              this.parent && this._ts
                ? Gt(this.parent._time, this)
                : this._tTime;
            return (
              (this._rts = +t || 0),
              (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
              this.totalTime(
                ue(-Math.abs(this._delay), this._tDur, r),
                !1 !== e,
              ),
              $t(this),
              (function (t) {
                for (var e = t.parent; e && e.parent; )
                  (e._dirty = 1), e.totalDuration(), (e = e.parent);
                return t;
              })(this)
            );
          }),
          (e.paused = function (t) {
            return arguments.length
              ? (this._ps !== t &&
                  ((this._ps = t),
                  t
                    ? ((this._pTime =
                        this._tTime || Math.max(-this._delay, this.rawTime())),
                      (this._ts = this._act = 0))
                    : (Ne(),
                      (this._ts = this._rts),
                      this.totalTime(
                        this.parent && !this.parent.smoothChildTiming
                          ? this.rawTime()
                          : this._tTime || this._pTime,
                        1 === this.progress() &&
                          Math.abs(this._zTime) !== I &&
                          (this._tTime -= I),
                      ))),
                this)
              : this._ps;
          }),
          (e.startTime = function (t) {
            if (arguments.length) {
              this._start = t;
              var e = this.parent || this._dp;
              return (
                e && (e._sort || !this.parent) && Jt(e, this, t - this._delay),
                this
              );
            }
            return this._start;
          }),
          (e.endTime = function (t) {
            return (
              this._start +
              (W(t) ? this.totalDuration() : this.duration()) /
                Math.abs(this._ts || 1)
            );
          }),
          (e.rawTime = function (t) {
            var e = this.parent || this._dp;
            return e
              ? t &&
                (!this._ts ||
                  (this._repeat && this._time && this.totalProgress() < 1))
                ? this._tTime % (this._dur + this._rDelay)
                : this._ts
                  ? Gt(e.rawTime(t), this)
                  : this._tTime
              : this._tTime;
          }),
          (e.revert = function (t) {
            void 0 === t && (t = pt);
            var e = g;
            return (
              (g = t),
              (this._initted || this._startAt) &&
                (this.timeline && this.timeline.revert(t),
                this.totalTime(-0.01, t.suppressEvents)),
              "nested" !== this.data && !1 !== t.kill && this.kill(),
              (g = e),
              this
            );
          }),
          (e.globalTime = function (t) {
            for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
              (r = e._start + r / (Math.abs(e._ts) || 1)), (e = e._dp);
            return !this.parent && this._sat ? this._sat.globalTime(t) : r;
          }),
          (e.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t === 1 / 0 ? -2 : t), ie(this))
              : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
          }),
          (e.repeatDelay = function (t) {
            if (arguments.length) {
              var e = this._time;
              return (this._rDelay = t), ie(this), e ? this.time(e) : this;
            }
            return this._rDelay;
          }),
          (e.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (e.seek = function (t, e) {
            return this.totalTime(ae(this, t), W(e));
          }),
          (e.restart = function (t, e) {
            return this.play().totalTime(t ? -this._delay : 0, W(e));
          }),
          (e.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
          }),
          (e.reverse = function (t, e) {
            return (
              null != t && this.seek(t || this.totalDuration(), e),
              this.reversed(!0).paused(!1)
            );
          }),
          (e.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0);
          }),
          (e.resume = function () {
            return this.paused(!1);
          }),
          (e.reversed = function (t) {
            return arguments.length
              ? (!!t !== this.reversed() &&
                  this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                this)
              : this._rts < 0;
          }),
          (e.invalidate = function () {
            return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
          }),
          (e.isActive = function () {
            var t,
              e = this.parent || this._dp,
              r = this._start;
            return !(
              e &&
              !(
                this._ts &&
                this._initted &&
                e.isActive() &&
                (t = e.rawTime(!0)) >= r &&
                t < this.endTime(!0) - I
              )
            );
          }),
          (e.eventCallback = function (t, e, r) {
            var n = this.vars;
            return arguments.length > 1
              ? (e
                  ? ((n[t] = e),
                    r && (n[t + "Params"] = r),
                    "onUpdate" === t && (this._onUpdate = e))
                  : delete n[t],
                this)
              : n[t];
          }),
          (e.then = function (t) {
            var e = this;
            return new Promise(function (r) {
              var n = H(t) ? t : Rt,
                i = function () {
                  var t = e.then;
                  (e.then = null),
                    H(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                    r(n),
                    (e.then = t);
                };
              (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
              (!e._tTime && e._ts < 0)
                ? i()
                : (e._prom = i);
            });
          }),
          (e.kill = function () {
            Ae(this);
          }),
          t
        );
      })();
    It(Je.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1,
    });
    var Ke = (function (t) {
      function e(e, r) {
        var n;
        return (
          void 0 === e && (e = {}),
          ((n = t.call(this, e) || this).labels = {}),
          (n.smoothChildTiming = !!e.smoothChildTiming),
          (n.autoRemoveChildren = !!e.autoRemoveChildren),
          (n._sort = W(e.sortChildren)),
          v && Jt(e.parent || v, d(n), r),
          e.reversed && n.reverse(),
          e.paused && n.paused(!0),
          e.scrollTrigger && Kt(d(n), e.scrollTrigger),
          n
        );
      }
      p(e, t);
      var r = e.prototype;
      return (
        (r.to = function (t, e, r) {
          return oe(0, arguments, this), this;
        }),
        (r.from = function (t, e, r) {
          return oe(1, arguments, this), this;
        }),
        (r.fromTo = function (t, e, r, n) {
          return oe(2, arguments, this), this;
        }),
        (r.set = function (t, e, r) {
          return (
            (e.duration = 0),
            (e.parent = this),
            Nt(e).repeatDelay || (e.repeat = 0),
            (e.immediateRender = !!e.immediateRender),
            new cr(t, e, ae(this, r), 1),
            this
          );
        }),
        (r.call = function (t, e, r) {
          return Jt(this, cr.delayedCall(0, t, e), r);
        }),
        (r.staggerTo = function (t, e, r, n, i, s, a) {
          return (
            (r.duration = e),
            (r.stagger = r.stagger || n),
            (r.onComplete = s),
            (r.onCompleteParams = a),
            (r.parent = this),
            new cr(t, r, ae(this, i)),
            this
          );
        }),
        (r.staggerFrom = function (t, e, r, n, i, s, a) {
          return (
            (r.runBackwards = 1),
            (Nt(r).immediateRender = W(r.immediateRender)),
            this.staggerTo(t, e, r, n, i, s, a)
          );
        }),
        (r.staggerFromTo = function (t, e, r, n, i, s, a, o) {
          return (
            (n.startAt = r),
            (Nt(n).immediateRender = W(n.immediateRender)),
            this.staggerTo(t, e, n, i, s, a, o)
          );
        }),
        (r.render = function (t, e, r) {
          var n,
            i,
            s,
            a,
            o,
            l,
            u,
            c,
            f,
            h,
            d,
            p,
            m = this._time,
            _ = this._dirty ? this.totalDuration() : this._tDur,
            y = this._dur,
            b = t <= 0 ? 0 : St(t),
            x = this._zTime < 0 != t < 0 && (this._initted || !y);
          if (
            (this !== v && b > _ && t >= 0 && (b = _),
            b !== this._tTime || r || x)
          ) {
            if (
              (m !== this._time &&
                y &&
                ((b += this._time - m), (t += this._time - m)),
              (n = b),
              (f = this._start),
              (l = !(c = this._ts)),
              x && (y || (m = this._zTime), (t || !e) && (this._zTime = t)),
              this._repeat)
            ) {
              if (
                ((d = this._yoyo),
                (o = y + this._rDelay),
                this._repeat < -1 && t < 0)
              )
                return this.totalTime(100 * o + t, e, r);
              if (
                ((n = St(b % o)),
                b === _
                  ? ((a = this._repeat), (n = y))
                  : ((a = ~~(b / o)) && a === b / o && ((n = y), a--),
                    n > y && (n = y)),
                (h = Wt(this._tTime, o)),
                !m &&
                  this._tTime &&
                  h !== a &&
                  this._tTime - h * o - this._dur <= 0 &&
                  (h = a),
                d && 1 & a && ((n = y - n), (p = 1)),
                a !== h && !this._lock)
              ) {
                var w = d && 1 & h,
                  T = w === (d && 1 & a);
                if (
                  (a < h && (w = !w),
                  (m = w ? 0 : b % y ? y : b),
                  (this._lock = 1),
                  (this.render(m || (p ? 0 : St(a * o)), e, !y)._lock = 0),
                  (this._tTime = b),
                  !e && this.parent && ke(this, "onRepeat"),
                  this.vars.repeatRefresh &&
                    !p &&
                    (this.invalidate()._lock = 1),
                  (m && m !== this._time) ||
                    l !== !this._ts ||
                    (this.vars.onRepeat && !this.parent && !this._act))
                )
                  return this;
                if (
                  ((y = this._dur),
                  (_ = this._tDur),
                  T &&
                    ((this._lock = 2),
                    (m = w ? y : -1e-4),
                    this.render(m, !0),
                    this.vars.repeatRefresh && !p && this.invalidate()),
                  (this._lock = 0),
                  !this._ts && !l)
                )
                  return this;
                Ve(this, p);
              }
            }
            if (
              (this._hasPause &&
                !this._forcing &&
                this._lock < 2 &&
                ((u = (function (t, e, r) {
                  var n;
                  if (r > e)
                    for (n = t._first; n && n._start <= r; ) {
                      if ("isPause" === n.data && n._start > e) return n;
                      n = n._next;
                    }
                  else
                    for (n = t._last; n && n._start >= r; ) {
                      if ("isPause" === n.data && n._start < e) return n;
                      n = n._prev;
                    }
                })(this, St(m), St(n))),
                u && (b -= n - (n = u._start))),
              (this._tTime = b),
              (this._time = n),
              (this._act = !c),
              this._initted ||
                ((this._onUpdate = this.vars.onUpdate),
                (this._initted = 1),
                (this._zTime = t),
                (m = 0)),
              !m && n && !e && !a && (ke(this, "onStart"), this._tTime !== b))
            )
              return this;
            if (n >= m && t >= 0)
              for (i = this._first; i; ) {
                if (
                  ((s = i._next), (i._act || n >= i._start) && i._ts && u !== i)
                ) {
                  if (i.parent !== this) return this.render(t, e, r);
                  if (
                    (i.render(
                      i._ts > 0
                        ? (n - i._start) * i._ts
                        : (i._dirty ? i.totalDuration() : i._tDur) +
                            (n - i._start) * i._ts,
                      e,
                      r,
                    ),
                    n !== this._time || (!this._ts && !l))
                  ) {
                    (u = 0), s && (b += this._zTime = -1e-8);
                    break;
                  }
                }
                i = s;
              }
            else {
              i = this._last;
              for (var E = t < 0 ? t : n; i; ) {
                if (
                  ((s = i._prev), (i._act || E <= i._end) && i._ts && u !== i)
                ) {
                  if (i.parent !== this) return this.render(t, e, r);
                  if (
                    (i.render(
                      i._ts > 0
                        ? (E - i._start) * i._ts
                        : (i._dirty ? i.totalDuration() : i._tDur) +
                            (E - i._start) * i._ts,
                      e,
                      r || (g && (i._initted || i._startAt)),
                    ),
                    n !== this._time || (!this._ts && !l))
                  ) {
                    (u = 0), s && (b += this._zTime = E ? -1e-8 : I);
                    break;
                  }
                }
                i = s;
              }
            }
            if (
              u &&
              !e &&
              (this.pause(),
              (u.render(n >= m ? 0 : -1e-8)._zTime = n >= m ? 1 : -1),
              this._ts)
            )
              return (this._start = f), $t(this), this.render(t, e, r);
            this._onUpdate && !e && ke(this, "onUpdate", !0),
              ((b === _ && this._tTime >= this.totalDuration()) || (!b && m)) &&
                ((f !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
                  this._lock ||
                  ((t || !y) &&
                    ((b === _ && this._ts > 0) || (!b && this._ts < 0)) &&
                    Xt(this, 1),
                  e ||
                    (t < 0 && !m) ||
                    (!b && !m && _) ||
                    (ke(
                      this,
                      b === _ && t >= 0 ? "onComplete" : "onReverseComplete",
                      !0,
                    ),
                    this._prom &&
                      !(b < _ && this.timeScale() > 0) &&
                      this._prom())));
          }
          return this;
        }),
        (r.add = function (t, e) {
          var r = this;
          if ((U(e) || (e = ae(this, e, t)), !(t instanceof Je))) {
            if (Z(t))
              return (
                t.forEach(function (t) {
                  return r.add(t, e);
                }),
                this
              );
            if (X(t)) return this.addLabel(t, e);
            if (!H(t)) return this;
            t = cr.delayedCall(0, t);
          }
          return this !== t ? Jt(this, t, e) : this;
        }),
        (r.getChildren = function (t, e, r, n) {
          void 0 === t && (t = !0),
            void 0 === e && (e = !0),
            void 0 === r && (r = !0),
            void 0 === n && (n = -R);
          for (var i = [], s = this._first; s; )
            s._start >= n &&
              (s instanceof cr
                ? e && i.push(s)
                : (r && i.push(s),
                  t && i.push.apply(i, s.getChildren(!0, e, r)))),
              (s = s._next);
          return i;
        }),
        (r.getById = function (t) {
          for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
            if (e[r].vars.id === t) return e[r];
        }),
        (r.remove = function (t) {
          return X(t)
            ? this.removeLabel(t)
            : H(t)
              ? this.killTweensOf(t)
              : (qt(this, t),
                t === this._recent && (this._recent = this._last),
                Ht(this));
        }),
        (r.totalTime = function (e, r) {
          return arguments.length
            ? ((this._forcing = 1),
              !this._dp &&
                this._ts &&
                (this._start = St(
                  Fe.time -
                    (this._ts > 0
                      ? e / this._ts
                      : (this.totalDuration() - e) / -this._ts),
                )),
              t.prototype.totalTime.call(this, e, r),
              (this._forcing = 0),
              this)
            : this._tTime;
        }),
        (r.addLabel = function (t, e) {
          return (this.labels[t] = ae(this, e)), this;
        }),
        (r.removeLabel = function (t) {
          return delete this.labels[t], this;
        }),
        (r.addPause = function (t, e, r) {
          var n = cr.delayedCall(0, e || ft, r);
          return (
            (n.data = "isPause"), (this._hasPause = 1), Jt(this, n, ae(this, t))
          );
        }),
        (r.removePause = function (t) {
          var e = this._first;
          for (t = ae(this, t); e; )
            e._start === t && "isPause" === e.data && Xt(e), (e = e._next);
        }),
        (r.killTweensOf = function (t, e, r) {
          for (var n = this.getTweensOf(t, r), i = n.length; i--; )
            tr !== n[i] && n[i].kill(t, e);
          return this;
        }),
        (r.getTweensOf = function (t, e) {
          for (var r, n = [], i = pe(t), s = this._first, a = U(e); s; )
            s instanceof cr
              ? Ot(s._targets, i) &&
                (a
                  ? (!tr || (s._initted && s._ts)) &&
                    s.globalTime(0) <= e &&
                    s.globalTime(s.totalDuration()) > e
                  : !e || s.isActive()) &&
                n.push(s)
              : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r),
              (s = s._next);
          return n;
        }),
        (r.tweenTo = function (t, e) {
          e = e || {};
          var r,
            n = this,
            i = ae(n, t),
            s = e,
            a = s.startAt,
            o = s.onStart,
            l = s.onStartParams,
            u = s.immediateRender,
            c = cr.to(
              n,
              It(
                {
                  ease: e.ease || "none",
                  lazy: !1,
                  immediateRender: !1,
                  time: i,
                  overwrite: "auto",
                  duration:
                    e.duration ||
                    Math.abs(
                      (i - (a && "time" in a ? a.time : n._time)) /
                        n.timeScale(),
                    ) ||
                    I,
                  onStart: function () {
                    if ((n.pause(), !r)) {
                      var t =
                        e.duration ||
                        Math.abs(
                          (i - (a && "time" in a ? a.time : n._time)) /
                            n.timeScale(),
                        );
                      c._dur !== t && ne(c, t, 0, 1).render(c._time, !0, !0),
                        (r = 1);
                    }
                    o && o.apply(c, l || []);
                  },
                },
                e,
              ),
            );
          return u ? c.render(0) : c;
        }),
        (r.tweenFromTo = function (t, e, r) {
          return this.tweenTo(e, It({ startAt: { time: ae(this, t) } }, r));
        }),
        (r.recent = function () {
          return this._recent;
        }),
        (r.nextLabel = function (t) {
          return void 0 === t && (t = this._time), Ee(this, ae(this, t));
        }),
        (r.previousLabel = function (t) {
          return void 0 === t && (t = this._time), Ee(this, ae(this, t), 1);
        }),
        (r.currentLabel = function (t) {
          return arguments.length
            ? this.seek(t, !0)
            : this.previousLabel(this._time + I);
        }),
        (r.shiftChildren = function (t, e, r) {
          void 0 === r && (r = 0);
          for (var n, i = this._first, s = this.labels; i; )
            i._start >= r && ((i._start += t), (i._end += t)), (i = i._next);
          if (e) for (n in s) s[n] >= r && (s[n] += t);
          return Ht(this);
        }),
        (r.invalidate = function (e) {
          var r = this._first;
          for (this._lock = 0; r; ) r.invalidate(e), (r = r._next);
          return t.prototype.invalidate.call(this, e);
        }),
        (r.clear = function (t) {
          void 0 === t && (t = !0);
          for (var e, r = this._first; r; )
            (e = r._next), this.remove(r), (r = e);
          return (
            this._dp && (this._time = this._tTime = this._pTime = 0),
            t && (this.labels = {}),
            Ht(this)
          );
        }),
        (r.totalDuration = function (t) {
          var e,
            r,
            n,
            i = 0,
            s = this,
            a = s._last,
            o = R;
          if (arguments.length)
            return s.timeScale(
              (s._repeat < 0 ? s.duration() : s.totalDuration()) /
                (s.reversed() ? -t : t),
            );
          if (s._dirty) {
            for (n = s.parent; a; )
              (e = a._prev),
                a._dirty && a.totalDuration(),
                (r = a._start) > o && s._sort && a._ts && !s._lock
                  ? ((s._lock = 1), (Jt(s, a, r - a._delay, 1)._lock = 0))
                  : (o = r),
                r < 0 &&
                  a._ts &&
                  ((i -= r),
                  ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                    ((s._start += r / s._ts), (s._time -= r), (s._tTime -= r)),
                  s.shiftChildren(-r, !1, -Infinity),
                  (o = 0)),
                a._end > i && a._ts && (i = a._end),
                (a = e);
            ne(s, s === v && s._time > i ? s._time : i, 1, 1), (s._dirty = 0);
          }
          return s._tDur;
        }),
        (e.updateRoot = function (t) {
          if ((v._ts && (Dt(v, Gt(t, v)), (T = Fe.frame)), Fe.frame >= bt)) {
            bt += D.autoSleep || 120;
            var e = v._first;
            if ((!e || !e._ts) && D.autoSleep && Fe._listeners.length < 2) {
              for (; e && !e._ts; ) e = e._next;
              e || Fe.sleep();
            }
          }
        }),
        e
      );
    })(Je);
    It(Ke.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
    var tr,
      er,
      rr = function (t, e, r, n, i, s, a) {
        var o,
          l,
          u,
          c,
          f,
          h,
          d,
          p,
          m = new Er(this._pt, t, e, 0, 1, vr, null, i),
          g = 0,
          _ = 0;
        for (
          m.b = r,
            m.e = n,
            r += "",
            (d = ~(n += "").indexOf("random(")) && (n = we(n)),
            s && (s((p = [r, n]), t, e), (r = p[0]), (n = p[1])),
            l = r.match(et) || [];
          (o = et.exec(n));

        )
          (c = o[0]),
            (f = n.substring(g, o.index)),
            u ? (u = (u + 1) % 5) : "rgba(" === f.substr(-5) && (u = 1),
            c !== l[_++] &&
              ((h = parseFloat(l[_ - 1]) || 0),
              (m._pt = {
                _next: m._pt,
                p: f || 1 === _ ? f : ",",
                s: h,
                c: "=" === c.charAt(1) ? Ct(h, c) - h : parseFloat(c) - h,
                m: u && u < 4 ? Math.round : 0,
              }),
              (g = et.lastIndex));
        return (
          (m.c = g < n.length ? n.substring(g, n.length) : ""),
          (m.fp = a),
          (rt.test(n) || d) && (m.e = 0),
          (this._pt = m),
          m
        );
      },
      nr = function (t, e, r, n, i, s, a, o, l, u) {
        H(n) && (n = n(i || 0, t, s));
        var c,
          f = t[e],
          h =
            "get" !== r
              ? r
              : H(f)
                ? l
                  ? t[
                      e.indexOf("set") || !H(t["get" + e.substr(3)])
                        ? e
                        : "get" + e.substr(3)
                    ](l)
                  : t[e]()
                : f,
          d = H(f) ? (l ? dr : hr) : fr;
        if (
          (X(n) &&
            (~n.indexOf("random(") && (n = we(n)),
            "=" === n.charAt(1) &&
              ((c = Ct(h, n) + (ce(h) || 0)) || 0 === c) &&
              (n = c)),
          !u || h !== n || er)
        )
          return isNaN(h * n) || "" === n
            ? (!f && !(e in t) && lt(e, n),
              rr.call(this, t, e, h, n, d, o || D.stringFilter, l))
            : ((c = new Er(
                this._pt,
                t,
                e,
                +h || 0,
                n - (h || 0),
                "boolean" == typeof f ? _r : gr,
                0,
                d,
              )),
              l && (c.fp = l),
              a && c.modifier(a, this, t),
              (this._pt = c));
      },
      ir = function (t, e, r, n, i, s) {
        var a, o, l, u;
        if (
          vt[t] &&
          !1 !==
            (a = new vt[t]()).init(
              i,
              a.rawVars
                ? e[t]
                : (function (t, e, r, n, i) {
                    if (
                      (H(t) && (t = or(t, i, e, r, n)),
                      !j(t) || (t.style && t.nodeType) || Z(t) || Q(t))
                    )
                      return X(t) ? or(t, i, e, r, n) : t;
                    var s,
                      a = {};
                    for (s in t) a[s] = or(t[s], i, e, r, n);
                    return a;
                  })(e[t], n, i, s, r),
              r,
              n,
              s,
            ) &&
          ((r._pt = o = new Er(r._pt, i, t, 0, 1, a.render, a, 0, a.priority)),
          r !== E)
        )
          for (
            l = r._ptLookup[r._targets.indexOf(i)], u = a._props.length;
            u--;

          )
            l[a._props[u]] = o;
        return a;
      },
      sr = function t(e, r, n) {
        var i,
          s,
          a,
          o,
          l,
          u,
          c,
          f,
          h,
          d,
          p,
          _,
          y,
          b = e.vars,
          x = b.ease,
          w = b.startAt,
          T = b.immediateRender,
          E = b.lazy,
          k = b.onUpdate,
          A = b.runBackwards,
          M = b.yoyoEase,
          S = b.keyframes,
          C = b.autoRevert,
          O = e._dur,
          P = e._startAt,
          D = e._targets,
          z = e.parent,
          B = z && "nested" === z.data ? z.vars.targets : D,
          F = "auto" === e._overwrite && !m,
          N = e.timeline;
        if (
          (N && (!S || !x) && (x = "none"),
          (e._ease = je(x, L.ease)),
          (e._yEase = M ? Ue(je(!0 === M ? x : M, L.ease)) : 0),
          M &&
            e._yoyo &&
            !e._repeat &&
            ((M = e._yEase), (e._yEase = e._ease), (e._ease = M)),
          (e._from = !N && !!b.runBackwards),
          !N || (S && !b.stagger))
        ) {
          if (
            ((_ = (f = D[0] ? Et(D[0]).harness : 0) && b[f.prop]),
            (i = Ft(b, mt)),
            P &&
              (P._zTime < 0 && P.progress(1),
              r < 0 && A && T && !C
                ? P.render(-1, !0)
                : P.revert(A && O ? dt : ht),
              (P._lazy = 0)),
            w)
          ) {
            if (
              (Xt(
                (e._startAt = cr.set(
                  D,
                  It(
                    {
                      data: "isStart",
                      overwrite: !1,
                      parent: z,
                      immediateRender: !0,
                      lazy: !P && W(E),
                      startAt: null,
                      delay: 0,
                      onUpdate:
                        k &&
                        function () {
                          return ke(e, "onUpdate");
                        },
                      stagger: 0,
                    },
                    w,
                  ),
                )),
              ),
              (e._startAt._dp = 0),
              (e._startAt._sat = e),
              r < 0 && (g || (!T && !C)) && e._startAt.revert(dt),
              T && O && r <= 0 && n <= 0)
            )
              return void (r && (e._zTime = r));
          } else if (A && O && !P)
            if (
              (r && (T = !1),
              (a = It(
                {
                  overwrite: !1,
                  data: "isFromStart",
                  lazy: T && !P && W(E),
                  immediateRender: T,
                  stagger: 0,
                  parent: z,
                },
                i,
              )),
              _ && (a[f.prop] = _),
              Xt((e._startAt = cr.set(D, a))),
              (e._startAt._dp = 0),
              (e._startAt._sat = e),
              r < 0 && (g ? e._startAt.revert(dt) : e._startAt.render(-1, !0)),
              (e._zTime = r),
              T)
            ) {
              if (!r) return;
            } else t(e._startAt, I, I);
          for (
            e._pt = e._ptCache = 0, E = (O && W(E)) || (E && !O), s = 0;
            s < D.length;
            s++
          ) {
            if (
              ((c = (l = D[s])._gsap || Tt(D)[s]._gsap),
              (e._ptLookup[s] = d = {}),
              _t[c.id] && gt.length && Pt(),
              (p = B === D ? s : B.indexOf(l)),
              f &&
                !1 !== (h = new f()).init(l, _ || i, e, p, B) &&
                ((e._pt = o =
                  new Er(e._pt, l, h.name, 0, 1, h.render, h, 0, h.priority)),
                h._props.forEach(function (t) {
                  d[t] = o;
                }),
                h.priority && (u = 1)),
              !f || _)
            )
              for (a in i)
                vt[a] && (h = ir(a, i, e, p, l, B))
                  ? h.priority && (u = 1)
                  : (d[a] = o =
                      nr.call(e, l, a, "get", i[a], p, B, 0, b.stringFilter));
            e._op && e._op[s] && e.kill(l, e._op[s]),
              F &&
                e._pt &&
                ((tr = e),
                v.killTweensOf(l, d, e.globalTime(r)),
                (y = !e.parent),
                (tr = 0)),
              e._pt && E && (_t[c.id] = 1);
          }
          u && Tr(e), e._onInit && e._onInit(e);
        }
        (e._onUpdate = k),
          (e._initted = (!e._op || e._pt) && !y),
          S && r <= 0 && N.render(R, !0, !0);
      },
      ar = function (t, e, r, n) {
        var i,
          s,
          a = e.ease || n || "power1.inOut";
        if (Z(e))
          (s = r[t] || (r[t] = [])),
            e.forEach(function (t, r) {
              return s.push({ t: (r / (e.length - 1)) * 100, v: t, e: a });
            });
        else
          for (i in e)
            (s = r[i] || (r[i] = [])),
              "ease" === i || s.push({ t: parseFloat(t), v: e[i], e: a });
      },
      or = function (t, e, r, n, i) {
        return H(t)
          ? t.call(e, r, n, i)
          : X(t) && ~t.indexOf("random(")
            ? we(t)
            : t;
      },
      lr = wt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
      ur = {};
    At(lr + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
      return (ur[t] = 1);
    });
    var cr = (function (t) {
      function e(e, r, n, i) {
        var s;
        "number" == typeof r && ((n.duration = r), (r = n), (n = null));
        var a,
          o,
          l,
          u,
          c,
          f,
          h,
          p,
          g = (s = t.call(this, i ? r : Nt(r)) || this).vars,
          _ = g.duration,
          y = g.delay,
          b = g.immediateRender,
          x = g.stagger,
          w = g.overwrite,
          T = g.keyframes,
          E = g.defaults,
          k = g.scrollTrigger,
          A = g.yoyoEase,
          M = r.parent || v,
          S = (Z(e) || Q(e) ? U(e[0]) : "length" in r) ? [e] : pe(e);
        if (
          ((s._targets = S.length
            ? Tt(S)
            : ut(
                "GSAP target " + e + " not found. https://gsap.com",
                !D.nullTargetWarn,
              ) || []),
          (s._ptLookup = []),
          (s._overwrite = w),
          T || x || $(_) || $(y))
        ) {
          if (
            ((r = s.vars),
            (a = s.timeline =
              new Ke({
                data: "nested",
                defaults: E || {},
                targets: M && "nested" === M.data ? M.vars.targets : S,
              })).kill(),
            (a.parent = a._dp = d(s)),
            (a._start = 0),
            x || $(_) || $(y))
          ) {
            if (((u = S.length), (h = x && _e(x)), j(x)))
              for (c in x) ~lr.indexOf(c) && (p || (p = {}), (p[c] = x[c]));
            for (o = 0; o < u; o++)
              ((l = Ft(r, ur)).stagger = 0),
                A && (l.yoyoEase = A),
                p && zt(l, p),
                (f = S[o]),
                (l.duration = +or(_, d(s), o, f, S)),
                (l.delay = (+or(y, d(s), o, f, S) || 0) - s._delay),
                !x &&
                  1 === u &&
                  l.delay &&
                  ((s._delay = y = l.delay), (s._start += y), (l.delay = 0)),
                a.to(f, l, h ? h(o, f, S) : 0),
                (a._ease = Ye.none);
            a.duration() ? (_ = y = 0) : (s.timeline = 0);
          } else if (T) {
            Nt(It(a.vars.defaults, { ease: "none" })),
              (a._ease = je(T.ease || r.ease || "none"));
            var C,
              O,
              P,
              L = 0;
            if (Z(T))
              T.forEach(function (t) {
                return a.to(S, t, ">");
              }),
                a.duration();
            else {
              for (c in ((l = {}), T))
                "ease" === c || "easeEach" === c || ar(c, T[c], l, T.easeEach);
              for (c in l)
                for (
                  C = l[c].sort(function (t, e) {
                    return t.t - e.t;
                  }),
                    L = 0,
                    o = 0;
                  o < C.length;
                  o++
                )
                  ((P = {
                    ease: (O = C[o]).e,
                    duration: ((O.t - (o ? C[o - 1].t : 0)) / 100) * _,
                  })[c] = O.v),
                    a.to(S, P, L),
                    (L += P.duration);
              a.duration() < _ && a.to({}, { duration: _ - a.duration() });
            }
          }
          _ || s.duration((_ = a.duration()));
        } else s.timeline = 0;
        return (
          !0 !== w || m || ((tr = d(s)), v.killTweensOf(S), (tr = 0)),
          Jt(M, d(s), n),
          r.reversed && s.reverse(),
          r.paused && s.paused(!0),
          (b ||
            (!_ &&
              !T &&
              s._start === St(M._time) &&
              W(b) &&
              Vt(d(s)) &&
              "nested" !== M.data)) &&
            ((s._tTime = -1e-8), s.render(Math.max(0, -y) || 0)),
          k && Kt(d(s), k),
          s
        );
      }
      p(e, t);
      var r = e.prototype;
      return (
        (r.render = function (t, e, r) {
          var n,
            i,
            s,
            a,
            o,
            l,
            u,
            c,
            f,
            h = this._time,
            d = this._tDur,
            p = this._dur,
            m = t < 0,
            _ = t > d - I && !m ? d : t < I ? 0 : t;
          if (p) {
            if (
              _ !== this._tTime ||
              !t ||
              r ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 !== m)
            ) {
              if (((n = _), (c = this.timeline), this._repeat)) {
                if (((a = p + this._rDelay), this._repeat < -1 && m))
                  return this.totalTime(100 * a + t, e, r);
                if (
                  ((n = St(_ % a)),
                  _ === d
                    ? ((s = this._repeat), (n = p))
                    : ((s = ~~(_ / a)) && s === St(_ / a) && ((n = p), s--),
                      n > p && (n = p)),
                  (l = this._yoyo && 1 & s) && ((f = this._yEase), (n = p - n)),
                  (o = Wt(this._tTime, a)),
                  n === h && !r && this._initted && s === o)
                )
                  return (this._tTime = _), this;
                s !== o &&
                  (c && this._yEase && Ve(c, l),
                  this.vars.repeatRefresh &&
                    !l &&
                    !this._lock &&
                    this._time !== a &&
                    this._initted &&
                    ((this._lock = r = 1),
                    (this.render(St(a * s), !0).invalidate()._lock = 0)));
              }
              if (!this._initted) {
                if (te(this, m ? t : n, r, e, _))
                  return (this._tTime = 0), this;
                if (
                  !(
                    h === this._time ||
                    (r && this.vars.repeatRefresh && s !== o)
                  )
                )
                  return this;
                if (p !== this._dur) return this.render(t, e, r);
              }
              if (
                ((this._tTime = _),
                (this._time = n),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = u = (f || this._ease)(n / p)),
                this._from && (this.ratio = u = 1 - u),
                n && !h && !e && !s && (ke(this, "onStart"), this._tTime !== _))
              )
                return this;
              for (i = this._pt; i; ) i.r(u, i.d), (i = i._next);
              (c &&
                c.render(t < 0 ? t : c._dur * c._ease(n / this._dur), e, r)) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (m && Ut(this, t, 0, r), ke(this, "onUpdate")),
                this._repeat &&
                  s !== o &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  ke(this, "onRepeat"),
                (_ !== this._tDur && _) ||
                  this._tTime !== _ ||
                  (m && !this._onUpdate && Ut(this, t, 0, !0),
                  (t || !p) &&
                    ((_ === this._tDur && this._ts > 0) ||
                      (!_ && this._ts < 0)) &&
                    Xt(this, 1),
                  e ||
                    (m && !h) ||
                    !(_ || h || l) ||
                    (ke(this, _ === d ? "onComplete" : "onReverseComplete", !0),
                    this._prom &&
                      !(_ < d && this.timeScale() > 0) &&
                      this._prom()));
            }
          } else
            !(function (t, e, r, n) {
              var i,
                s,
                a,
                o = t.ratio,
                l =
                  e < 0 ||
                  (!e &&
                    ((!t._start && ee(t) && (t._initted || !re(t))) ||
                      ((t._ts < 0 || t._dp._ts < 0) && !re(t))))
                    ? 0
                    : 1,
                u = t._rDelay,
                c = 0;
              if (
                (u &&
                  t._repeat &&
                  ((c = ue(0, t._tDur, e)),
                  (s = Wt(c, u)),
                  t._yoyo && 1 & s && (l = 1 - l),
                  s !== Wt(t._tTime, u) &&
                    ((o = 1 - l),
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                l !== o || g || n || t._zTime === I || (!e && t._zTime))
              ) {
                if (!t._initted && te(t, e, n, r, c)) return;
                for (
                  a = t._zTime,
                    t._zTime = e || (r ? I : 0),
                    r || (r = e && !a),
                    t.ratio = l,
                    t._from && (l = 1 - l),
                    t._time = 0,
                    t._tTime = c,
                    i = t._pt;
                  i;

                )
                  i.r(l, i.d), (i = i._next);
                e < 0 && Ut(t, e, 0, !0),
                  t._onUpdate && !r && ke(t, "onUpdate"),
                  c && t._repeat && !r && t.parent && ke(t, "onRepeat"),
                  (e >= t._tDur || e < 0) &&
                    t.ratio === l &&
                    (l && Xt(t, 1),
                    r ||
                      g ||
                      (ke(t, l ? "onComplete" : "onReverseComplete", !0),
                      t._prom && t._prom()));
              } else t._zTime || (t._zTime = e);
            })(this, t, e, r);
          return this;
        }),
        (r.targets = function () {
          return this._targets;
        }),
        (r.invalidate = function (e) {
          return (
            (!e || !this.vars.runBackwards) && (this._startAt = 0),
            (this._pt =
              this._op =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(e),
            t.prototype.invalidate.call(this, e)
          );
        }),
        (r.resetTo = function (t, e, r, n, i) {
          k || Fe.wake(), this._ts || this.play();
          var s = Math.min(
            this._dur,
            (this._dp._time - this._start) * this._ts,
          );
          return (
            this._initted || sr(this, s),
            (function (t, e, r, n, i, s, a, o) {
              var l,
                u,
                c,
                f,
                h = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
              if (!h)
                for (
                  h = t._ptCache[e] = [],
                    c = t._ptLookup,
                    f = t._targets.length;
                  f--;

                ) {
                  if ((l = c[f][e]) && l.d && l.d._pt)
                    for (l = l.d._pt; l && l.p !== e && l.fp !== e; )
                      l = l._next;
                  if (!l)
                    return (
                      (er = 1),
                      (t.vars[e] = "+=0"),
                      sr(t, a),
                      (er = 0),
                      o ? ut(e + " not eligible for reset") : 1
                    );
                  h.push(l);
                }
              for (f = h.length; f--; )
                ((l = (u = h[f])._pt || u).s =
                  (!n && 0 !== n) || i ? l.s + (n || 0) + s * l.c : n),
                  (l.c = r - l.s),
                  u.e && (u.e = Mt(r) + ce(u.e)),
                  u.b && (u.b = l.s + ce(u.b));
            })(this, t, e, r, n, this._ease(s / this._dur), s, i)
              ? this.resetTo(t, e, r, n, 1)
              : (Qt(this, 0),
                this.parent ||
                  Yt(
                    this._dp,
                    this,
                    "_first",
                    "_last",
                    this._dp._sort ? "_start" : 0,
                  ),
                this.render(0))
          );
        }),
        (r.kill = function (t, e) {
          if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
            return (this._lazy = this._pt = 0), this.parent ? Ae(this) : this;
          if (this.timeline) {
            var r = this.timeline.totalDuration();
            return (
              this.timeline.killTweensOf(t, e, tr && !0 !== tr.vars.overwrite)
                ._first || Ae(this),
              this.parent &&
                r !== this.timeline.totalDuration() &&
                ne(this, (this._dur * this.timeline._tDur) / r, 0, 1),
              this
            );
          }
          var n,
            i,
            s,
            a,
            o,
            l,
            u,
            c = this._targets,
            f = t ? pe(t) : c,
            h = this._ptLookup,
            d = this._pt;
          if (
            (!e || "all" === e) &&
            (function (t, e) {
              for (
                var r = t.length, n = r === e.length;
                n && r-- && t[r] === e[r];

              );
              return r < 0;
            })(c, f)
          )
            return "all" === e && (this._pt = 0), Ae(this);
          for (
            n = this._op = this._op || [],
              "all" !== e &&
                (X(e) &&
                  ((o = {}),
                  At(e, function (t) {
                    return (o[t] = 1);
                  }),
                  (e = o)),
                (e = (function (t, e) {
                  var r,
                    n,
                    i,
                    s,
                    a = t[0] ? Et(t[0]).harness : 0,
                    o = a && a.aliases;
                  if (!o) return e;
                  for (n in ((r = zt({}, e)), o))
                    if ((n in r))
                      for (i = (s = o[n].split(",")).length; i--; )
                        r[s[i]] = r[n];
                  return r;
                })(c, e))),
              u = c.length;
            u--;

          )
            if (~f.indexOf(c[u]))
              for (o in ((i = h[u]),
              "all" === e
                ? ((n[u] = e), (a = i), (s = {}))
                : ((s = n[u] = n[u] || {}), (a = e)),
              a))
                (l = i && i[o]) &&
                  (("kill" in l.d && !0 !== l.d.kill(o)) || qt(this, l, "_pt"),
                  delete i[o]),
                  "all" !== s && (s[o] = 1);
          return this._initted && !this._pt && d && Ae(this), this;
        }),
        (e.to = function (t, r) {
          return new e(t, r, arguments[2]);
        }),
        (e.from = function (t, e) {
          return oe(1, arguments);
        }),
        (e.delayedCall = function (t, r, n, i) {
          return new e(r, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: r,
            onReverseComplete: r,
            onCompleteParams: n,
            onReverseCompleteParams: n,
            callbackScope: i,
          });
        }),
        (e.fromTo = function (t, e, r) {
          return oe(2, arguments);
        }),
        (e.set = function (t, r) {
          return (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r);
        }),
        (e.killTweensOf = function (t, e, r) {
          return v.killTweensOf(t, e, r);
        }),
        e
      );
    })(Je);
    It(cr.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0,
    }),
      At("staggerTo,staggerFrom,staggerFromTo", function (t) {
        cr[t] = function () {
          var e = new Ke(),
            r = fe.call(arguments, 0);
          return (
            r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r)
          );
        };
      });
    var fr = function (t, e, r) {
        return (t[e] = r);
      },
      hr = function (t, e, r) {
        return t[e](r);
      },
      dr = function (t, e, r, n) {
        return t[e](n.fp, r);
      },
      pr = function (t, e, r) {
        return t.setAttribute(e, r);
      },
      mr = function (t, e) {
        return H(t[e]) ? hr : V(t[e]) && t.setAttribute ? pr : fr;
      },
      gr = function (t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
      },
      _r = function (t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e);
      },
      vr = function (t, e) {
        var r = e._pt,
          n = "";
        if (!t && e.b) n = e.b;
        else if (1 === t && e.e) n = e.e;
        else {
          for (; r; )
            (n =
              r.p +
              (r.m
                ? r.m(r.s + r.c * t)
                : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
              n),
              (r = r._next);
          n += e.c;
        }
        e.set(e.t, e.p, n, e);
      },
      yr = function (t, e) {
        for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
      },
      br = function (t, e, r, n) {
        for (var i, s = this._pt; s; )
          (i = s._next), s.p === n && s.modifier(t, e, r), (s = i);
      },
      xr = function (t) {
        for (var e, r, n = this._pt; n; )
          (r = n._next),
            (n.p === t && !n.op) || n.op === t
              ? qt(this, n, "_pt")
              : n.dep || (e = 1),
            (n = r);
        return !e;
      },
      wr = function (t, e, r, n) {
        n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
      },
      Tr = function (t) {
        for (var e, r, n, i, s = t._pt; s; ) {
          for (e = s._next, r = n; r && r.pr > s.pr; ) r = r._next;
          (s._prev = r ? r._prev : i) ? (s._prev._next = s) : (n = s),
            (s._next = r) ? (r._prev = s) : (i = s),
            (s = e);
        }
        t._pt = n;
      },
      Er = (function () {
        function t(t, e, r, n, i, s, a, o, l) {
          (this.t = e),
            (this.s = n),
            (this.c = i),
            (this.p = r),
            (this.r = s || gr),
            (this.d = a || this),
            (this.set = o || fr),
            (this.pr = l || 0),
            (this._next = t),
            t && (t._prev = this);
        }
        return (
          (t.prototype.modifier = function (t, e, r) {
            (this.mSet = this.mSet || this.set),
              (this.set = wr),
              (this.m = t),
              (this.mt = r),
              (this.tween = e);
          }),
          t
        );
      })();
    At(
      wt +
        "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
      function (t) {
        return (mt[t] = 1);
      },
    ),
      (st.TweenMax = st.TweenLite = cr),
      (st.TimelineLite = st.TimelineMax = Ke),
      (v = new Ke({
        sortChildren: !1,
        defaults: L,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0,
      })),
      (D.stringFilter = Be);
    var kr = [],
      Ar = {},
      Mr = [],
      Sr = 0,
      Cr = 0,
      Or = function (t) {
        return (Ar[t] || Mr).map(function (t) {
          return t();
        });
      },
      Pr = function () {
        var t = Date.now(),
          e = [];
        t - Sr > 2 &&
          (Or("matchMediaInit"),
          kr.forEach(function (t) {
            var r,
              n,
              i,
              s,
              a = t.queries,
              o = t.conditions;
            for (n in a)
              (r = y.matchMedia(a[n]).matches) && (i = 1),
                r !== o[n] && ((o[n] = r), (s = 1));
            s && (t.revert(), i && e.push(t));
          }),
          Or("matchMediaRevert"),
          e.forEach(function (t) {
            return t.onMatch(t, function (e) {
              return t.add(null, e);
            });
          }),
          (Sr = t),
          Or("matchMedia"));
      },
      Dr = (function () {
        function t(t, e) {
          (this.selector = e && me(e)),
            (this.data = []),
            (this._r = []),
            (this.isReverted = !1),
            (this.id = Cr++),
            t && this.add(t);
        }
        var e = t.prototype;
        return (
          (e.add = function (t, e, r) {
            H(t) && ((r = e), (e = t), (t = H));
            var n = this,
              i = function () {
                var t,
                  i = _,
                  s = n.selector;
                return (
                  i && i !== n && i.data.push(n),
                  r && (n.selector = me(r)),
                  (_ = n),
                  (t = e.apply(n, arguments)),
                  H(t) && n._r.push(t),
                  (_ = i),
                  (n.selector = s),
                  (n.isReverted = !1),
                  t
                );
              };
            return (
              (n.last = i),
              t === H
                ? i(n, function (t) {
                    return n.add(null, t);
                  })
                : t
                  ? (n[t] = i)
                  : i
            );
          }),
          (e.ignore = function (t) {
            var e = _;
            (_ = null), t(this), (_ = e);
          }),
          (e.getTweens = function () {
            var e = [];
            return (
              this.data.forEach(function (r) {
                return r instanceof t
                  ? e.push.apply(e, r.getTweens())
                  : r instanceof cr &&
                      !(r.parent && "nested" === r.parent.data) &&
                      e.push(r);
              }),
              e
            );
          }),
          (e.clear = function () {
            this._r.length = this.data.length = 0;
          }),
          (e.kill = function (t, e) {
            var r = this;
            if (
              (t
                ? (function () {
                    for (var e, n = r.getTweens(), i = r.data.length; i--; )
                      "isFlip" === (e = r.data[i]).data &&
                        (e.revert(),
                        e.getChildren(!0, !0, !1).forEach(function (t) {
                          return n.splice(n.indexOf(t), 1);
                        }));
                    for (
                      n
                        .map(function (t) {
                          return {
                            g:
                              t._dur ||
                              t._delay ||
                              (t._sat && !t._sat.vars.immediateRender)
                                ? t.globalTime(0)
                                : -1 / 0,
                            t,
                          };
                        })
                        .sort(function (t, e) {
                          return e.g - t.g || -1 / 0;
                        })
                        .forEach(function (e) {
                          return e.t.revert(t);
                        }),
                        i = r.data.length;
                      i--;

                    )
                      (e = r.data[i]) instanceof Ke
                        ? "nested" !== e.data &&
                          (e.scrollTrigger && e.scrollTrigger.revert(),
                          e.kill())
                        : !(e instanceof cr) && e.revert && e.revert(t);
                    r._r.forEach(function (e) {
                      return e(t, r);
                    }),
                      (r.isReverted = !0);
                  })()
                : this.data.forEach(function (t) {
                    return t.kill && t.kill();
                  }),
              this.clear(),
              e)
            )
              for (var n = kr.length; n--; )
                kr[n].id === this.id && kr.splice(n, 1);
          }),
          (e.revert = function (t) {
            this.kill(t || {});
          }),
          t
        );
      })(),
      Lr = (function () {
        function t(t) {
          (this.contexts = []), (this.scope = t), _ && _.data.push(this);
        }
        var e = t.prototype;
        return (
          (e.add = function (t, e, r) {
            j(t) || (t = { matches: t });
            var n,
              i,
              s,
              a = new Dr(0, r || this.scope),
              o = (a.conditions = {});
            for (i in (_ && !a.selector && (a.selector = _.selector),
            this.contexts.push(a),
            (e = a.add("onMatch", e)),
            (a.queries = t),
            t))
              "all" === i
                ? (s = 1)
                : (n = y.matchMedia(t[i])) &&
                  (kr.indexOf(a) < 0 && kr.push(a),
                  (o[i] = n.matches) && (s = 1),
                  n.addListener
                    ? n.addListener(Pr)
                    : n.addEventListener("change", Pr));
            return (
              s &&
                e(a, function (t) {
                  return a.add(null, t);
                }),
              this
            );
          }),
          (e.revert = function (t) {
            this.kill(t || {});
          }),
          (e.kill = function (t) {
            this.contexts.forEach(function (e) {
              return e.kill(t, !0);
            });
          }),
          t
        );
      })(),
      Rr = {
        registerPlugin: function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          e.forEach(function (t) {
            return Se(t);
          });
        },
        timeline: function (t) {
          return new Ke(t);
        },
        getTweensOf: function (t, e) {
          return v.getTweensOf(t, e);
        },
        getProperty: function (t, e, r, n) {
          X(t) && (t = pe(t)[0]);
          var i = Et(t || {}).get,
            s = r ? Rt : Lt;
          return (
            "native" === r && (r = ""),
            t
              ? e
                ? s(((vt[e] && vt[e].get) || i)(t, e, r, n))
                : function (e, r, n) {
                    return s(((vt[e] && vt[e].get) || i)(t, e, r, n));
                  }
              : t
          );
        },
        quickSetter: function (t, e, r) {
          if ((t = pe(t)).length > 1) {
            var n = t.map(function (t) {
                return Br.quickSetter(t, e, r);
              }),
              i = n.length;
            return function (t) {
              for (var e = i; e--; ) n[e](t);
            };
          }
          t = t[0] || {};
          var s = vt[e],
            a = Et(t),
            o = (a.harness && (a.harness.aliases || {})[e]) || e,
            l = s
              ? function (e) {
                  var n = new s();
                  (E._pt = 0),
                    n.init(t, r ? e + r : e, E, 0, [t]),
                    n.render(1, n),
                    E._pt && yr(1, E);
                }
              : a.set(t, o);
          return s
            ? l
            : function (e) {
                return l(t, o, r ? e + r : e, a, 1);
              };
        },
        quickTo: function (t, e, r) {
          var n,
            i = Br.to(
              t,
              zt((((n = {})[e] = "+=0.1"), (n.paused = !0), n), r || {}),
            ),
            s = function (t, r, n) {
              return i.resetTo(e, t, r, n);
            };
          return (s.tween = i), s;
        },
        isTweening: function (t) {
          return v.getTweensOf(t, !0).length > 0;
        },
        defaults: function (t) {
          return t && t.ease && (t.ease = je(t.ease, L.ease)), Bt(L, t || {});
        },
        config: function (t) {
          return Bt(D, t || {});
        },
        registerEffect: function (t) {
          var e = t.name,
            r = t.effect,
            n = t.plugins,
            i = t.defaults,
            s = t.extendTimeline;
          (n || "").split(",").forEach(function (t) {
            return (
              t &&
              !vt[t] &&
              !st[t] &&
              ut(e + " effect requires " + t + " plugin.")
            );
          }),
            (yt[e] = function (t, e, n) {
              return r(pe(t), It(e || {}, i), n);
            }),
            s &&
              (Ke.prototype[e] = function (t, r, n) {
                return this.add(yt[e](t, j(r) ? r : (n = r) && {}, this), n);
              });
        },
        registerEase: function (t, e) {
          Ye[t] = je(e);
        },
        parseEase: function (t, e) {
          return arguments.length ? je(t, e) : Ye;
        },
        getById: function (t) {
          return v.getById(t);
        },
        exportRoot: function (t, e) {
          void 0 === t && (t = {});
          var r,
            n,
            i = new Ke(t);
          for (
            i.smoothChildTiming = W(t.smoothChildTiming),
              v.remove(i),
              i._dp = 0,
              i._time = i._tTime = v._time,
              r = v._first;
            r;

          )
            (n = r._next),
              (!e &&
                !r._dur &&
                r instanceof cr &&
                r.vars.onComplete === r._targets[0]) ||
                Jt(i, r, r._start - r._delay),
              (r = n);
          return Jt(v, i, 0), i;
        },
        context: function (t, e) {
          return t ? new Dr(t, e) : _;
        },
        matchMedia: function (t) {
          return new Lr(t);
        },
        matchMediaRefresh: function () {
          return (
            kr.forEach(function (t) {
              var e,
                r,
                n = t.conditions;
              for (r in n) n[r] && ((n[r] = !1), (e = 1));
              e && t.revert();
            }) || Pr()
          );
        },
        addEventListener: function (t, e) {
          var r = Ar[t] || (Ar[t] = []);
          ~r.indexOf(e) || r.push(e);
        },
        removeEventListener: function (t, e) {
          var r = Ar[t],
            n = r && r.indexOf(e);
          n >= 0 && r.splice(n, 1);
        },
        utils: {
          wrap: function t(e, r, n) {
            var i = r - e;
            return Z(e)
              ? xe(e, t(0, e.length), r)
              : le(n, function (t) {
                  return ((i + ((t - e) % i)) % i) + e;
                });
          },
          wrapYoyo: function t(e, r, n) {
            var i = r - e,
              s = 2 * i;
            return Z(e)
              ? xe(e, t(0, e.length - 1), r)
              : le(n, function (t) {
                  return (
                    e + ((t = (s + ((t - e) % s)) % s || 0) > i ? s - t : t)
                  );
                });
          },
          distribute: _e,
          random: be,
          snap: ye,
          normalize: function (t, e, r) {
            return Te(t, e, 0, 1, r);
          },
          getUnit: ce,
          clamp: function (t, e, r) {
            return le(r, function (r) {
              return ue(t, e, r);
            });
          },
          splitColor: De,
          toArray: pe,
          selector: me,
          mapRange: Te,
          pipe: function () {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            return function (t) {
              return e.reduce(function (t, e) {
                return e(t);
              }, t);
            };
          },
          unitize: function (t, e) {
            return function (r) {
              return t(parseFloat(r)) + (e || ce(r));
            };
          },
          interpolate: function t(e, r, n, i) {
            var s = isNaN(e + r)
              ? 0
              : function (t) {
                  return (1 - t) * e + t * r;
                };
            if (!s) {
              var a,
                o,
                l,
                u,
                c,
                f = X(e),
                h = {};
              if ((!0 === n && (i = 1) && (n = null), f))
                (e = { p: e }), (r = { p: r });
              else if (Z(e) && !Z(r)) {
                for (l = [], u = e.length, c = u - 2, o = 1; o < u; o++)
                  l.push(t(e[o - 1], e[o]));
                u--,
                  (s = function (t) {
                    t *= u;
                    var e = Math.min(c, ~~t);
                    return l[e](t - e);
                  }),
                  (n = r);
              } else i || (e = zt(Z(e) ? [] : {}, e));
              if (!l) {
                for (a in r) nr.call(h, e, a, "get", r[a]);
                s = function (t) {
                  return yr(t, h) || (f ? e.p : e);
                };
              }
            }
            return le(n, s);
          },
          shuffle: ge,
        },
        install: ot,
        effects: yt,
        ticker: Fe,
        updateRoot: Ke.updateRoot,
        plugins: vt,
        globalTimeline: v,
        core: {
          PropTween: Er,
          globals: ct,
          Tween: cr,
          Timeline: Ke,
          Animation: Je,
          getCache: Et,
          _removeLinkedListItem: qt,
          reverting: function () {
            return g;
          },
          context: function (t) {
            return t && _ && (_.data.push(t), (t._ctx = _)), _;
          },
          suppressOverwrites: function (t) {
            return (m = t);
          },
        },
      };
    At("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
      return (Rr[t] = cr[t]);
    }),
      Fe.add(Ke.updateRoot),
      (E = Rr.to({}, { duration: 0 }));
    var Ir = function (t, e) {
        for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
          r = r._next;
        return r;
      },
      zr = function (t, e) {
        return {
          name: t,
          rawVars: 1,
          init: function (t, r, n) {
            n._onInit = function (t) {
              var n, i;
              if (
                (X(r) &&
                  ((n = {}),
                  At(r, function (t) {
                    return (n[t] = 1);
                  }),
                  (r = n)),
                e)
              ) {
                for (i in ((n = {}), r)) n[i] = e(r[i]);
                r = n;
              }
              !(function (t, e) {
                var r,
                  n,
                  i,
                  s = t._targets;
                for (r in e)
                  for (n = s.length; n--; )
                    (i = t._ptLookup[n][r]) &&
                      (i = i.d) &&
                      (i._pt && (i = Ir(i, r)),
                      i && i.modifier && i.modifier(e[r], t, s[n], r));
              })(t, r);
            };
          },
        };
      },
      Br =
        Rr.registerPlugin(
          {
            name: "attr",
            init: function (t, e, r, n, i) {
              var s, a, o;
              for (s in ((this.tween = r), e))
                (o = t.getAttribute(s) || ""),
                  ((a = this.add(
                    t,
                    "setAttribute",
                    (o || 0) + "",
                    e[s],
                    n,
                    i,
                    0,
                    0,
                    s,
                  )).op = s),
                  (a.b = o),
                  this._props.push(s);
            },
            render: function (t, e) {
              for (var r = e._pt; r; )
                g ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
            },
          },
          {
            name: "endArray",
            init: function (t, e) {
              for (var r = e.length; r--; )
                this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
            },
          },
          zr("roundProps", ve),
          zr("modifiers"),
          zr("snap", ye),
        ) || Rr;
    (cr.version = Ke.version = Br.version = "3.12.5"), (w = 1), G() && Ne();
    Ye.Power0,
      Ye.Power1,
      Ye.Power2,
      Ye.Power3,
      Ye.Power4,
      Ye.Linear,
      Ye.Quad,
      Ye.Cubic,
      Ye.Quart,
      Ye.Quint,
      Ye.Strong,
      Ye.Elastic,
      Ye.Back,
      Ye.SteppedEase,
      Ye.Bounce,
      Ye.Sine,
      Ye.Expo,
      Ye.Circ;
    var Fr,
      Nr,
      Yr,
      qr,
      Xr,
      Hr,
      Ur,
      Vr,
      jr = {},
      Wr = 180 / Math.PI,
      Gr = Math.PI / 180,
      $r = Math.atan2,
      Qr = /([A-Z])/g,
      Zr = /(left|right|width|margin|padding|x)/i,
      Jr = /[\s,\(]\S/,
      Kr = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity",
      },
      tn = function (t, e) {
        return e.set(
          e.t,
          e.p,
          Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
          e,
        );
      },
      en = function (t, e) {
        return e.set(
          e.t,
          e.p,
          1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
          e,
        );
      },
      rn = function (t, e) {
        return e.set(
          e.t,
          e.p,
          t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
          e,
        );
      },
      nn = function (t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
      },
      sn = function (t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e);
      },
      an = function (t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
      },
      on = function (t, e, r) {
        return (t.style[e] = r);
      },
      ln = function (t, e, r) {
        return t.style.setProperty(e, r);
      },
      un = function (t, e, r) {
        return (t._gsap[e] = r);
      },
      cn = function (t, e, r) {
        return (t._gsap.scaleX = t._gsap.scaleY = r);
      },
      fn = function (t, e, r, n, i) {
        var s = t._gsap;
        (s.scaleX = s.scaleY = r), s.renderTransform(i, s);
      },
      hn = function (t, e, r, n, i) {
        var s = t._gsap;
        (s[e] = r), s.renderTransform(i, s);
      },
      dn = "transform",
      pn = dn + "Origin",
      mn = function t(e, r) {
        var n = this,
          i = this.target,
          s = i.style,
          a = i._gsap;
        if (e in jr && s) {
          if (((this.tfm = this.tfm || {}), "transform" === e))
            return Kr.transform.split(",").forEach(function (e) {
              return t.call(n, e, r);
            });
          if (
            (~(e = Kr[e] || e).indexOf(",")
              ? e.split(",").forEach(function (t) {
                  return (n.tfm[t] = Ln(i, t));
                })
              : (this.tfm[e] = a.x ? a[e] : Ln(i, e)),
            e === pn && (this.tfm.zOrigin = a.zOrigin),
            this.props.indexOf(dn) >= 0)
          )
            return;
          a.svg &&
            ((this.svgo = i.getAttribute("data-svg-origin")),
            this.props.push(pn, r, "")),
            (e = dn);
        }
        (s || r) && this.props.push(e, r, s[e]);
      },
      gn = function (t) {
        t.translate &&
          (t.removeProperty("translate"),
          t.removeProperty("scale"),
          t.removeProperty("rotate"));
      },
      _n = function () {
        var t,
          e,
          r = this.props,
          n = this.target,
          i = n.style,
          s = n._gsap;
        for (t = 0; t < r.length; t += 3)
          r[t + 1]
            ? (n[r[t]] = r[t + 2])
            : r[t + 2]
              ? (i[r[t]] = r[t + 2])
              : i.removeProperty(
                  "--" === r[t].substr(0, 2)
                    ? r[t]
                    : r[t].replace(Qr, "-$1").toLowerCase(),
                );
        if (this.tfm) {
          for (e in this.tfm) s[e] = this.tfm[e];
          s.svg &&
            (s.renderTransform(),
            n.setAttribute("data-svg-origin", this.svgo || "")),
            ((t = Ur()) && t.isStart) ||
              i[dn] ||
              (gn(i),
              s.zOrigin &&
                i[pn] &&
                ((i[pn] += " " + s.zOrigin + "px"),
                (s.zOrigin = 0),
                s.renderTransform()),
              (s.uncache = 1));
        }
      },
      vn = function (t, e) {
        var r = { target: t, props: [], revert: _n, save: mn };
        return (
          t._gsap || Br.core.getCache(t),
          e &&
            e.split(",").forEach(function (t) {
              return r.save(t);
            }),
          r
        );
      },
      yn = function (t, e) {
        var r = Nr.createElementNS
          ? Nr.createElementNS(
              (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
              t,
            )
          : Nr.createElement(t);
        return r && r.style ? r : Nr.createElement(t);
      },
      bn = function t(e, r, n) {
        var i = getComputedStyle(e);
        return (
          i[r] ||
          i.getPropertyValue(r.replace(Qr, "-$1").toLowerCase()) ||
          i.getPropertyValue(r) ||
          (!n && t(e, wn(r) || r, 1)) ||
          ""
        );
      },
      xn = "O,Moz,ms,Ms,Webkit".split(","),
      wn = function (t, e, r) {
        var n = (e || Xr).style,
          i = 5;
        if (t in n && !r) return t;
        for (
          t = t.charAt(0).toUpperCase() + t.substr(1);
          i-- && !(xn[i] + t in n);

        );
        return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? xn[i] : "") + t;
      },
      Tn = function () {
        "undefined" != typeof window &&
          window.document &&
          ((Fr = window),
          (Nr = Fr.document),
          (Yr = Nr.documentElement),
          (Xr = yn("div") || { style: {} }),
          yn("div"),
          (dn = wn(dn)),
          (pn = dn + "Origin"),
          (Xr.style.cssText =
            "border-width:0;line-height:0;position:absolute;padding:0"),
          (Vr = !!wn("perspective")),
          (Ur = Br.core.reverting),
          (qr = 1));
      },
      En = function t(e) {
        var r,
          n = yn(
            "svg",
            (this.ownerSVGElement &&
              this.ownerSVGElement.getAttribute("xmlns")) ||
              "http://www.w3.org/2000/svg",
          ),
          i = this.parentNode,
          s = this.nextSibling,
          a = this.style.cssText;
        if (
          (Yr.appendChild(n),
          n.appendChild(this),
          (this.style.display = "block"),
          e)
        )
          try {
            (r = this.getBBox()),
              (this._gsapBBox = this.getBBox),
              (this.getBBox = t);
          } catch (t) {}
        else this._gsapBBox && (r = this._gsapBBox());
        return (
          i && (s ? i.insertBefore(this, s) : i.appendChild(this)),
          Yr.removeChild(n),
          (this.style.cssText = a),
          r
        );
      },
      kn = function (t, e) {
        for (var r = e.length; r--; )
          if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
      },
      An = function (t) {
        var e;
        try {
          e = t.getBBox();
        } catch (r) {
          e = En.call(t, !0);
        }
        return (
          (e && (e.width || e.height)) ||
            t.getBBox === En ||
            (e = En.call(t, !0)),
          !e || e.width || e.x || e.y
            ? e
            : {
                x: +kn(t, ["x", "cx", "x1"]) || 0,
                y: +kn(t, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0,
              }
        );
      },
      Mn = function (t) {
        return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !An(t));
      },
      Sn = function (t, e) {
        if (e) {
          var r,
            n = t.style;
          e in jr && e !== pn && (e = dn),
            n.removeProperty
              ? (("ms" !== (r = e.substr(0, 2)) &&
                  "webkit" !== e.substr(0, 6)) ||
                  (e = "-" + e),
                n.removeProperty(
                  "--" === r ? e : e.replace(Qr, "-$1").toLowerCase(),
                ))
              : n.removeAttribute(e);
        }
      },
      Cn = function (t, e, r, n, i, s) {
        var a = new Er(t._pt, e, r, 0, 1, s ? an : sn);
        return (t._pt = a), (a.b = n), (a.e = i), t._props.push(r), a;
      },
      On = { deg: 1, rad: 1, turn: 1 },
      Pn = { grid: 1, flex: 1 },
      Dn = function t(e, r, n, i) {
        var s,
          a,
          o,
          l,
          u = parseFloat(n) || 0,
          c = (n + "").trim().substr((u + "").length) || "px",
          f = Xr.style,
          h = Zr.test(r),
          d = "svg" === e.tagName.toLowerCase(),
          p = (d ? "client" : "offset") + (h ? "Width" : "Height"),
          m = 100,
          g = "px" === i,
          _ = "%" === i;
        if (i === c || !u || On[i] || On[c]) return u;
        if (
          ("px" !== c && !g && (u = t(e, r, n, "px")),
          (l = e.getCTM && Mn(e)),
          (_ || "%" === c) && (jr[r] || ~r.indexOf("adius")))
        )
          return (
            (s = l ? e.getBBox()[h ? "width" : "height"] : e[p]),
            Mt(_ ? (u / s) * m : (u / 100) * s)
          );
        if (
          ((f[h ? "width" : "height"] = m + (g ? c : i)),
          (a =
            ~r.indexOf("adius") || ("em" === i && e.appendChild && !d)
              ? e
              : e.parentNode),
          l && (a = (e.ownerSVGElement || {}).parentNode),
          (a && a !== Nr && a.appendChild) || (a = Nr.body),
          (o = a._gsap) &&
            _ &&
            o.width &&
            h &&
            o.time === Fe.time &&
            !o.uncache)
        )
          return Mt((u / o.width) * m);
        if (!_ || ("height" !== r && "width" !== r))
          (_ || "%" === c) &&
            !Pn[bn(a, "display")] &&
            (f.position = bn(e, "position")),
            a === e && (f.position = "static"),
            a.appendChild(Xr),
            (s = Xr[p]),
            a.removeChild(Xr),
            (f.position = "absolute");
        else {
          var v = e.style[r];
          (e.style[r] = m + i), (s = e[p]), v ? (e.style[r] = v) : Sn(e, r);
        }
        return (
          h && _ && (((o = Et(a)).time = Fe.time), (o.width = a[p])),
          Mt(g ? (s * u) / m : s && u ? (m / s) * u : 0)
        );
      },
      Ln = function (t, e, r, n) {
        var i;
        return (
          qr || Tn(),
          e in Kr &&
            "transform" !== e &&
            ~(e = Kr[e]).indexOf(",") &&
            (e = e.split(",")[0]),
          jr[e] && "transform" !== e
            ? ((i = Un(t, n)),
              (i =
                "transformOrigin" !== e
                  ? i[e]
                  : i.svg
                    ? i.origin
                    : Vn(bn(t, pn)) + " " + i.zOrigin + "px"))
            : (!(i = t.style[e]) ||
                "auto" === i ||
                n ||
                ~(i + "").indexOf("calc(")) &&
              (i =
                (Bn[e] && Bn[e](t, e, r)) ||
                bn(t, e) ||
                kt(t, e) ||
                ("opacity" === e ? 1 : 0)),
          r && !~(i + "").trim().indexOf(" ") ? Dn(t, e, i, r) + r : i
        );
      },
      Rn = function (t, e, r, n) {
        if (!r || "none" === r) {
          var i = wn(e, t, 1),
            s = i && bn(t, i, 1);
          s && s !== r
            ? ((e = i), (r = s))
            : "borderColor" === e && (r = bn(t, "borderTopColor"));
        }
        var a,
          o,
          l,
          u,
          c,
          f,
          h,
          d,
          p,
          m,
          g,
          _ = new Er(this._pt, t.style, e, 0, 1, vr),
          v = 0,
          y = 0;
        if (
          ((_.b = r),
          (_.e = n),
          (r += ""),
          "auto" === (n += "") &&
            ((f = t.style[e]),
            (t.style[e] = n),
            (n = bn(t, e) || n),
            f ? (t.style[e] = f) : Sn(t, e)),
          Be((a = [r, n])),
          (n = a[1]),
          (l = (r = a[0]).match(tt) || []),
          (n.match(tt) || []).length)
        ) {
          for (; (o = tt.exec(n)); )
            (h = o[0]),
              (p = n.substring(v, o.index)),
              c
                ? (c = (c + 1) % 5)
                : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) ||
                  (c = 1),
              h !== (f = l[y++] || "") &&
                ((u = parseFloat(f) || 0),
                (g = f.substr((u + "").length)),
                "=" === h.charAt(1) && (h = Ct(u, h) + g),
                (d = parseFloat(h)),
                (m = h.substr((d + "").length)),
                (v = tt.lastIndex - m.length),
                m ||
                  ((m = m || D.units[e] || g),
                  v === n.length && ((n += m), (_.e += m))),
                g !== m && (u = Dn(t, e, f, m) || 0),
                (_._pt = {
                  _next: _._pt,
                  p: p || 1 === y ? p : ",",
                  s: u,
                  c: d - u,
                  m: (c && c < 4) || "zIndex" === e ? Math.round : 0,
                }));
          _.c = v < n.length ? n.substring(v, n.length) : "";
        } else _.r = "display" === e && "none" === n ? an : sn;
        return rt.test(n) && (_.e = 0), (this._pt = _), _;
      },
      In = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%",
      },
      zn = function (t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
          var r,
            n,
            i,
            s = e.t,
            a = s.style,
            o = e.u,
            l = s._gsap;
          if ("all" === o || !0 === o) (a.cssText = ""), (n = 1);
          else
            for (i = (o = o.split(",")).length; --i > -1; )
              (r = o[i]),
                jr[r] && ((n = 1), (r = "transformOrigin" === r ? pn : dn)),
                Sn(s, r);
          n &&
            (Sn(s, dn),
            l &&
              (l.svg && s.removeAttribute("transform"),
              Un(s, 1),
              (l.uncache = 1),
              gn(a)));
        }
      },
      Bn = {
        clearProps: function (t, e, r, n, i) {
          if ("isFromStart" !== i.data) {
            var s = (t._pt = new Er(t._pt, e, r, 0, 0, zn));
            return (s.u = n), (s.pr = -10), (s.tween = i), t._props.push(r), 1;
          }
        },
      },
      Fn = [1, 0, 0, 1, 0, 0],
      Nn = {},
      Yn = function (t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
      },
      qn = function (t) {
        var e = bn(t, dn);
        return Yn(e) ? Fn : e.substr(7).match(K).map(Mt);
      },
      Xn = function (t, e) {
        var r,
          n,
          i,
          s,
          a = t._gsap || Et(t),
          o = t.style,
          l = qn(t);
        return a.svg && t.getAttribute("transform")
          ? "1,0,0,1,0,0" ===
            (l = [
              (i = t.transform.baseVal.consolidate().matrix).a,
              i.b,
              i.c,
              i.d,
              i.e,
              i.f,
            ]).join(",")
            ? Fn
            : l
          : (l !== Fn ||
              t.offsetParent ||
              t === Yr ||
              a.svg ||
              ((i = o.display),
              (o.display = "block"),
              ((r = t.parentNode) && t.offsetParent) ||
                ((s = 1), (n = t.nextElementSibling), Yr.appendChild(t)),
              (l = qn(t)),
              i ? (o.display = i) : Sn(t, "display"),
              s &&
                (n
                  ? r.insertBefore(t, n)
                  : r
                    ? r.appendChild(t)
                    : Yr.removeChild(t))),
            e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
      },
      Hn = function (t, e, r, n, i, s) {
        var a,
          o,
          l,
          u = t._gsap,
          c = i || Xn(t, !0),
          f = u.xOrigin || 0,
          h = u.yOrigin || 0,
          d = u.xOffset || 0,
          p = u.yOffset || 0,
          m = c[0],
          g = c[1],
          _ = c[2],
          v = c[3],
          y = c[4],
          b = c[5],
          x = e.split(" "),
          w = parseFloat(x[0]) || 0,
          T = parseFloat(x[1]) || 0;
        r
          ? c !== Fn &&
            (o = m * v - g * _) &&
            ((l = w * (-g / o) + T * (m / o) - (m * b - g * y) / o),
            (w = w * (v / o) + T * (-_ / o) + (_ * b - v * y) / o),
            (T = l))
          : ((w =
              (a = An(t)).x + (~x[0].indexOf("%") ? (w / 100) * a.width : w)),
            (T =
              a.y + (~(x[1] || x[0]).indexOf("%") ? (T / 100) * a.height : T))),
          n || (!1 !== n && u.smooth)
            ? ((y = w - f),
              (b = T - h),
              (u.xOffset = d + (y * m + b * _) - y),
              (u.yOffset = p + (y * g + b * v) - b))
            : (u.xOffset = u.yOffset = 0),
          (u.xOrigin = w),
          (u.yOrigin = T),
          (u.smooth = !!n),
          (u.origin = e),
          (u.originIsAbsolute = !!r),
          (t.style[pn] = "0px 0px"),
          s &&
            (Cn(s, u, "xOrigin", f, w),
            Cn(s, u, "yOrigin", h, T),
            Cn(s, u, "xOffset", d, u.xOffset),
            Cn(s, u, "yOffset", p, u.yOffset)),
          t.setAttribute("data-svg-origin", w + " " + T);
      },
      Un = function (t, e) {
        var r = t._gsap || new Ze(t);
        if ("x" in r && !e && !r.uncache) return r;
        var n,
          i,
          s,
          a,
          o,
          l,
          u,
          c,
          f,
          h,
          d,
          p,
          m,
          g,
          _,
          v,
          y,
          b,
          x,
          w,
          T,
          E,
          k,
          A,
          M,
          S,
          C,
          O,
          P,
          L,
          R,
          I,
          z = t.style,
          B = r.scaleX < 0,
          F = "px",
          N = "deg",
          Y = getComputedStyle(t),
          q = bn(t, pn) || "0";
        return (
          (n = i = s = l = u = c = f = h = d = 0),
          (a = o = 1),
          (r.svg = !(!t.getCTM || !Mn(t))),
          Y.translate &&
            (("none" === Y.translate &&
              "none" === Y.scale &&
              "none" === Y.rotate) ||
              (z[dn] =
                ("none" !== Y.translate
                  ? "translate3d(" +
                    (Y.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                    ") "
                  : "") +
                ("none" !== Y.rotate ? "rotate(" + Y.rotate + ") " : "") +
                ("none" !== Y.scale
                  ? "scale(" + Y.scale.split(" ").join(",") + ") "
                  : "") +
                ("none" !== Y[dn] ? Y[dn] : "")),
            (z.scale = z.rotate = z.translate = "none")),
          (g = Xn(t, r.svg)),
          r.svg &&
            (r.uncache
              ? ((M = t.getBBox()),
                (q = r.xOrigin - M.x + "px " + (r.yOrigin - M.y) + "px"),
                (A = ""))
              : (A = !e && t.getAttribute("data-svg-origin")),
            Hn(t, A || q, !!A || r.originIsAbsolute, !1 !== r.smooth, g)),
          (p = r.xOrigin || 0),
          (m = r.yOrigin || 0),
          g !== Fn &&
            ((b = g[0]),
            (x = g[1]),
            (w = g[2]),
            (T = g[3]),
            (n = E = g[4]),
            (i = k = g[5]),
            6 === g.length
              ? ((a = Math.sqrt(b * b + x * x)),
                (o = Math.sqrt(T * T + w * w)),
                (l = b || x ? $r(x, b) * Wr : 0),
                (f = w || T ? $r(w, T) * Wr + l : 0) &&
                  (o *= Math.abs(Math.cos(f * Gr))),
                r.svg &&
                  ((n -= p - (p * b + m * w)), (i -= m - (p * x + m * T))))
              : ((I = g[6]),
                (L = g[7]),
                (C = g[8]),
                (O = g[9]),
                (P = g[10]),
                (R = g[11]),
                (n = g[12]),
                (i = g[13]),
                (s = g[14]),
                (u = (_ = $r(I, P)) * Wr),
                _ &&
                  ((A = E * (v = Math.cos(-_)) + C * (y = Math.sin(-_))),
                  (M = k * v + O * y),
                  (S = I * v + P * y),
                  (C = E * -y + C * v),
                  (O = k * -y + O * v),
                  (P = I * -y + P * v),
                  (R = L * -y + R * v),
                  (E = A),
                  (k = M),
                  (I = S)),
                (c = (_ = $r(-w, P)) * Wr),
                _ &&
                  ((v = Math.cos(-_)),
                  (R = T * (y = Math.sin(-_)) + R * v),
                  (b = A = b * v - C * y),
                  (x = M = x * v - O * y),
                  (w = S = w * v - P * y)),
                (l = (_ = $r(x, b)) * Wr),
                _ &&
                  ((A = b * (v = Math.cos(_)) + x * (y = Math.sin(_))),
                  (M = E * v + k * y),
                  (x = x * v - b * y),
                  (k = k * v - E * y),
                  (b = A),
                  (E = M)),
                u &&
                  Math.abs(u) + Math.abs(l) > 359.9 &&
                  ((u = l = 0), (c = 180 - c)),
                (a = Mt(Math.sqrt(b * b + x * x + w * w))),
                (o = Mt(Math.sqrt(k * k + I * I))),
                (_ = $r(E, k)),
                (f = Math.abs(_) > 2e-4 ? _ * Wr : 0),
                (d = R ? 1 / (R < 0 ? -R : R) : 0)),
            r.svg &&
              ((A = t.getAttribute("transform")),
              (r.forceCSS = t.setAttribute("transform", "") || !Yn(bn(t, dn))),
              A && t.setAttribute("transform", A))),
          Math.abs(f) > 90 &&
            Math.abs(f) < 270 &&
            (B
              ? ((a *= -1),
                (f += l <= 0 ? 180 : -180),
                (l += l <= 0 ? 180 : -180))
              : ((o *= -1), (f += f <= 0 ? 180 : -180))),
          (e = e || r.uncache),
          (r.x =
            n -
            ((r.xPercent =
              n &&
              ((!e && r.xPercent) ||
                (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
              ? (t.offsetWidth * r.xPercent) / 100
              : 0) +
            F),
          (r.y =
            i -
            ((r.yPercent =
              i &&
              ((!e && r.yPercent) ||
                (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0)))
              ? (t.offsetHeight * r.yPercent) / 100
              : 0) +
            F),
          (r.z = s + F),
          (r.scaleX = Mt(a)),
          (r.scaleY = Mt(o)),
          (r.rotation = Mt(l) + N),
          (r.rotationX = Mt(u) + N),
          (r.rotationY = Mt(c) + N),
          (r.skewX = f + N),
          (r.skewY = h + N),
          (r.transformPerspective = d + F),
          (r.zOrigin = parseFloat(q.split(" ")[2]) || (!e && r.zOrigin) || 0) &&
            (z[pn] = Vn(q)),
          (r.xOffset = r.yOffset = 0),
          (r.force3D = D.force3D),
          (r.renderTransform = r.svg ? Jn : Vr ? Zn : Wn),
          (r.uncache = 0),
          r
        );
      },
      Vn = function (t) {
        return (t = t.split(" "))[0] + " " + t[1];
      },
      jn = function (t, e, r) {
        var n = ce(e);
        return Mt(parseFloat(e) + parseFloat(Dn(t, "x", r + "px", n))) + n;
      },
      Wn = function (t, e) {
        (e.z = "0px"),
          (e.rotationY = e.rotationX = "0deg"),
          (e.force3D = 0),
          Zn(t, e);
      },
      Gn = "0deg",
      $n = "0px",
      Qn = ") ",
      Zn = function (t, e) {
        var r = e || this,
          n = r.xPercent,
          i = r.yPercent,
          s = r.x,
          a = r.y,
          o = r.z,
          l = r.rotation,
          u = r.rotationY,
          c = r.rotationX,
          f = r.skewX,
          h = r.skewY,
          d = r.scaleX,
          p = r.scaleY,
          m = r.transformPerspective,
          g = r.force3D,
          _ = r.target,
          v = r.zOrigin,
          y = "",
          b = ("auto" === g && t && 1 !== t) || !0 === g;
        if (v && (c !== Gn || u !== Gn)) {
          var x,
            w = parseFloat(u) * Gr,
            T = Math.sin(w),
            E = Math.cos(w);
          (w = parseFloat(c) * Gr),
            (x = Math.cos(w)),
            (s = jn(_, s, T * x * -v)),
            (a = jn(_, a, -Math.sin(w) * -v)),
            (o = jn(_, o, E * x * -v + v));
        }
        m !== $n && (y += "perspective(" + m + Qn),
          (n || i) && (y += "translate(" + n + "%, " + i + "%) "),
          (b || s !== $n || a !== $n || o !== $n) &&
            (y +=
              o !== $n || b
                ? "translate3d(" + s + ", " + a + ", " + o + ") "
                : "translate(" + s + ", " + a + Qn),
          l !== Gn && (y += "rotate(" + l + Qn),
          u !== Gn && (y += "rotateY(" + u + Qn),
          c !== Gn && (y += "rotateX(" + c + Qn),
          (f === Gn && h === Gn) || (y += "skew(" + f + ", " + h + Qn),
          (1 === d && 1 === p) || (y += "scale(" + d + ", " + p + Qn),
          (_.style[dn] = y || "translate(0, 0)");
      },
      Jn = function (t, e) {
        var r,
          n,
          i,
          s,
          a,
          o = e || this,
          l = o.xPercent,
          u = o.yPercent,
          c = o.x,
          f = o.y,
          h = o.rotation,
          d = o.skewX,
          p = o.skewY,
          m = o.scaleX,
          g = o.scaleY,
          _ = o.target,
          v = o.xOrigin,
          y = o.yOrigin,
          b = o.xOffset,
          x = o.yOffset,
          w = o.forceCSS,
          T = parseFloat(c),
          E = parseFloat(f);
        (h = parseFloat(h)),
          (d = parseFloat(d)),
          (p = parseFloat(p)) && ((d += p = parseFloat(p)), (h += p)),
          h || d
            ? ((h *= Gr),
              (d *= Gr),
              (r = Math.cos(h) * m),
              (n = Math.sin(h) * m),
              (i = Math.sin(h - d) * -g),
              (s = Math.cos(h - d) * g),
              d &&
                ((p *= Gr),
                (a = Math.tan(d - p)),
                (i *= a = Math.sqrt(1 + a * a)),
                (s *= a),
                p &&
                  ((a = Math.tan(p)),
                  (r *= a = Math.sqrt(1 + a * a)),
                  (n *= a))),
              (r = Mt(r)),
              (n = Mt(n)),
              (i = Mt(i)),
              (s = Mt(s)))
            : ((r = m), (s = g), (n = i = 0)),
          ((T && !~(c + "").indexOf("px")) ||
            (E && !~(f + "").indexOf("px"))) &&
            ((T = Dn(_, "x", c, "px")), (E = Dn(_, "y", f, "px"))),
          (v || y || b || x) &&
            ((T = Mt(T + v - (v * r + y * i) + b)),
            (E = Mt(E + y - (v * n + y * s) + x))),
          (l || u) &&
            ((a = _.getBBox()),
            (T = Mt(T + (l / 100) * a.width)),
            (E = Mt(E + (u / 100) * a.height))),
          (a =
            "matrix(" +
            r +
            "," +
            n +
            "," +
            i +
            "," +
            s +
            "," +
            T +
            "," +
            E +
            ")"),
          _.setAttribute("transform", a),
          w && (_.style[dn] = a);
      },
      Kn = function (t, e, r, n, i) {
        var s,
          a,
          o = 360,
          l = X(i),
          u = parseFloat(i) * (l && ~i.indexOf("rad") ? Wr : 1) - n,
          c = n + u + "deg";
        return (
          l &&
            ("short" === (s = i.split("_")[1]) &&
              (u %= o) !== u % 180 &&
              (u += u < 0 ? o : -360),
            "cw" === s && u < 0
              ? (u = ((u + 36e9) % o) - ~~(u / o) * o)
              : "ccw" === s && u > 0 && (u = ((u - 36e9) % o) - ~~(u / o) * o)),
          (t._pt = a = new Er(t._pt, e, r, n, u, en)),
          (a.e = c),
          (a.u = "deg"),
          t._props.push(r),
          a
        );
      },
      ti = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      },
      ei = function (t, e, r) {
        var n,
          i,
          s,
          a,
          o,
          l,
          u,
          c = ti({}, r._gsap),
          f = r.style;
        for (i in (c.svg
          ? ((s = r.getAttribute("transform")),
            r.setAttribute("transform", ""),
            (f[dn] = e),
            (n = Un(r, 1)),
            Sn(r, dn),
            r.setAttribute("transform", s))
          : ((s = getComputedStyle(r)[dn]),
            (f[dn] = e),
            (n = Un(r, 1)),
            (f[dn] = s)),
        jr))
          (s = c[i]) !== (a = n[i]) &&
            "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
            ((o = ce(s) !== (u = ce(a)) ? Dn(r, i, s, u) : parseFloat(s)),
            (l = parseFloat(a)),
            (t._pt = new Er(t._pt, n, i, o, l - o, tn)),
            (t._pt.u = u || 0),
            t._props.push(i));
        ti(n, c);
      };
    At("padding,margin,Width,Radius", function (t, e) {
      var r = "Top",
        n = "Right",
        i = "Bottom",
        s = "Left",
        a = (e < 3 ? [r, n, i, s] : [r + s, r + n, i + n, i + s]).map(
          function (r) {
            return e < 2 ? t + r : "border" + r + t;
          },
        );
      Bn[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
        var s, o;
        if (arguments.length < 4)
          return (
            (s = a.map(function (e) {
              return Ln(t, e, r);
            })),
            5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o
          );
        (s = (n + "").split(" ")),
          (o = {}),
          a.forEach(function (t, e) {
            return (o[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
          }),
          t.init(e, o, i);
      };
    });
    var ri,
      ni,
      ii,
      si = {
        name: "css",
        register: Tn,
        targetTest: function (t) {
          return t.style && t.nodeType;
        },
        init: function (t, e, r, n, i) {
          var s,
            a,
            o,
            l,
            u,
            c,
            f,
            h,
            d,
            p,
            m,
            g,
            _,
            v,
            y,
            b,
            x,
            w,
            T,
            E,
            k = this._props,
            A = t.style,
            M = r.vars.startAt;
          for (f in (qr || Tn(),
          (this.styles = this.styles || vn(t)),
          (b = this.styles.props),
          (this.tween = r),
          e))
            if (
              "autoRound" !== f &&
              ((a = e[f]), !vt[f] || !ir(f, e, r, n, t, i))
            )
              if (
                ((u = typeof a),
                (c = Bn[f]),
                "function" === u && (u = typeof (a = a.call(r, n, t, i))),
                "string" === u && ~a.indexOf("random(") && (a = we(a)),
                c)
              )
                c(this, t, f, a, r) && (y = 1);
              else if ("--" === f.substr(0, 2))
                (s = (getComputedStyle(t).getPropertyValue(f) + "").trim()),
                  (a += ""),
                  (Ie.lastIndex = 0),
                  Ie.test(s) || ((h = ce(s)), (d = ce(a))),
                  d ? h !== d && (s = Dn(t, f, s, d) + d) : h && (a += h),
                  this.add(A, "setProperty", s, a, n, i, 0, 0, f),
                  k.push(f),
                  b.push(f, 0, A[f]);
              else if ("undefined" !== u) {
                if (
                  (M && f in M
                    ? ((s =
                        "function" == typeof M[f]
                          ? M[f].call(r, n, t, i)
                          : M[f]),
                      X(s) && ~s.indexOf("random(") && (s = we(s)),
                      ce(s + "") ||
                        "auto" === s ||
                        (s += D.units[f] || ce(Ln(t, f)) || ""),
                      "=" === (s + "").charAt(1) && (s = Ln(t, f)))
                    : (s = Ln(t, f)),
                  (l = parseFloat(s)),
                  (p =
                    "string" === u && "=" === a.charAt(1) && a.substr(0, 2)) &&
                    (a = a.substr(2)),
                  (o = parseFloat(a)),
                  f in Kr &&
                    ("autoAlpha" === f &&
                      (1 === l &&
                        "hidden" === Ln(t, "visibility") &&
                        o &&
                        (l = 0),
                      b.push("visibility", 0, A.visibility),
                      Cn(
                        this,
                        A,
                        "visibility",
                        l ? "inherit" : "hidden",
                        o ? "inherit" : "hidden",
                        !o,
                      )),
                    "scale" !== f &&
                      "transform" !== f &&
                      ~(f = Kr[f]).indexOf(",") &&
                      (f = f.split(",")[0])),
                  (m = f in jr))
                )
                  if (
                    (this.styles.save(f),
                    g ||
                      (((_ = t._gsap).renderTransform && !e.parseTransform) ||
                        Un(t, e.parseTransform),
                      (v = !1 !== e.smoothOrigin && _.smooth),
                      ((g = this._pt =
                        new Er(
                          this._pt,
                          A,
                          dn,
                          0,
                          1,
                          _.renderTransform,
                          _,
                          0,
                          -1,
                        )).dep = 1)),
                    "scale" === f)
                  )
                    (this._pt = new Er(
                      this._pt,
                      _,
                      "scaleY",
                      _.scaleY,
                      (p ? Ct(_.scaleY, p + o) : o) - _.scaleY || 0,
                      tn,
                    )),
                      (this._pt.u = 0),
                      k.push("scaleY", f),
                      (f += "X");
                  else {
                    if ("transformOrigin" === f) {
                      b.push(pn, 0, A[pn]),
                        (w = void 0),
                        (T = void 0),
                        (E = void 0),
                        (w = (x = a).split(" ")),
                        (T = w[0]),
                        (E = w[1] || "50%"),
                        ("top" !== T &&
                          "bottom" !== T &&
                          "left" !== E &&
                          "right" !== E) ||
                          ((x = T), (T = E), (E = x)),
                        (w[0] = In[T] || T),
                        (w[1] = In[E] || E),
                        (a = w.join(" ")),
                        _.svg
                          ? Hn(t, a, 0, v, 0, this)
                          : ((d = parseFloat(a.split(" ")[2]) || 0) !==
                              _.zOrigin && Cn(this, _, "zOrigin", _.zOrigin, d),
                            Cn(this, A, f, Vn(s), Vn(a)));
                      continue;
                    }
                    if ("svgOrigin" === f) {
                      Hn(t, a, 1, v, 0, this);
                      continue;
                    }
                    if (f in Nn) {
                      Kn(this, _, f, l, p ? Ct(l, p + a) : a);
                      continue;
                    }
                    if ("smoothOrigin" === f) {
                      Cn(this, _, "smooth", _.smooth, a);
                      continue;
                    }
                    if ("force3D" === f) {
                      _[f] = a;
                      continue;
                    }
                    if ("transform" === f) {
                      ei(this, a, t);
                      continue;
                    }
                  }
                else f in A || (f = wn(f) || f);
                if (
                  m ||
                  ((o || 0 === o) && (l || 0 === l) && !Jr.test(a) && f in A)
                )
                  o || (o = 0),
                    (h = (s + "").substr((l + "").length)) !==
                      (d = ce(a) || (f in D.units ? D.units[f] : h)) &&
                      (l = Dn(t, f, s, d)),
                    (this._pt = new Er(
                      this._pt,
                      m ? _ : A,
                      f,
                      l,
                      (p ? Ct(l, p + o) : o) - l,
                      m || ("px" !== d && "zIndex" !== f) || !1 === e.autoRound
                        ? tn
                        : nn,
                    )),
                    (this._pt.u = d || 0),
                    h !== d &&
                      "%" !== d &&
                      ((this._pt.b = s), (this._pt.r = rn));
                else if (f in A) Rn.call(this, t, f, s, p ? p + a : a);
                else if (f in t) this.add(t, f, s || t[f], p ? p + a : a, n, i);
                else if ("parseTransform" !== f) {
                  lt(f, a);
                  continue;
                }
                m || (f in A ? b.push(f, 0, A[f]) : b.push(f, 1, s || t[f])),
                  k.push(f);
              }
          y && Tr(this);
        },
        render: function (t, e) {
          if (e.tween._time || !Ur())
            for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
          else e.styles.revert();
        },
        get: Ln,
        aliases: Kr,
        getSetter: function (t, e, r) {
          var n = Kr[e];
          return (
            n && n.indexOf(",") < 0 && (e = n),
            e in jr && e !== pn && (t._gsap.x || Ln(t, "x"))
              ? r && Hr === r
                ? "scale" === e
                  ? cn
                  : un
                : (Hr = r || {}) && ("scale" === e ? fn : hn)
              : t.style && !V(t.style[e])
                ? on
                : ~e.indexOf("-")
                  ? ln
                  : mr(t, e)
          );
        },
        core: { _removeProperty: Sn, _getMatrix: Xn },
      };
    (Br.utils.checkPrefix = wn),
      (Br.core.getStyleSaver = vn),
      (ii = At(
        (ri = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
          "," +
          (ni = "rotation,rotationX,rotationY,skewX,skewY") +
          ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
        function (t) {
          jr[t] = 1;
        },
      )),
      At(ni, function (t) {
        (D.units[t] = "deg"), (Nn[t] = 1);
      }),
      (Kr[ii[13]] = ri + "," + ni),
      At(
        "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
        function (t) {
          var e = t.split(":");
          Kr[e[1]] = ii[e[0]];
        },
      ),
      At(
        "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
        function (t) {
          D.units[t] = "px";
        },
      ),
      Br.registerPlugin(si);
    var ai = Br.registerPlugin(si) || Br;
    ai.core.Tween;
    let oi,
      li = !0;
    document.addEventListener("click", function (t) {
      (oi = t.target),
        li && oi.closest(".icon-menu")
          ? (document.documentElement.classList.toggle("menu-open"),
            document.documentElement.classList.toggle("no-scrolling"),
            ai.from(".menu__list li", { x: 200, stagger: 0.15 }))
          : oi.closest(".menu") ||
            (document.documentElement.classList.remove("menu-open"),
            document.documentElement.classList.remove("no-scrolling"));
    });
    const ui = document.querySelector("[data-color-theme]");
    function ci() {
      "dark-theme" == localStorage.getItem("theme")
        ? (document.documentElement.classList.add("dark-theme"),
          ui && (ui.checked = !0))
        : document.documentElement.classList.remove("dark-theme");
    }
    function fi(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    ui.addEventListener("click", function (t) {
      "dark-theme" == localStorage.getItem("theme")
        ? localStorage.removeItem("theme")
        : localStorage.setItem("theme", "dark-theme"),
        ci();
    }),
      ci();
    var hi,
      di,
      pi,
      mi,
      gi,
      _i,
      vi,
      yi,
      bi,
      xi,
      wi,
      Ti,
      Ei,
      ki = function () {
        return (
          hi ||
          ("undefined" != typeof window &&
            (hi = window.gsap) &&
            hi.registerPlugin &&
            hi)
        );
      },
      Ai = 1,
      Mi = [],
      Si = [],
      Ci = [],
      Oi = Date.now,
      Pi = function (t, e) {
        return e;
      },
      Di = function (t, e) {
        return ~Ci.indexOf(t) && Ci[Ci.indexOf(t) + 1][e];
      },
      Li = function (t) {
        return !!~xi.indexOf(t);
      },
      Ri = function (t, e, r, n, i) {
        return t.addEventListener(e, r, { passive: !1 !== n, capture: !!i });
      },
      Ii = function (t, e, r, n) {
        return t.removeEventListener(e, r, !!n);
      },
      zi = "scrollLeft",
      Bi = "scrollTop",
      Fi = function () {
        return (wi && wi.isPressed) || Si.cache++;
      },
      Ni = function (t, e) {
        var r = function r(n) {
          if (n || 0 === n) {
            Ai && (pi.history.scrollRestoration = "manual");
            var i = wi && wi.isPressed;
            (n = r.v = Math.round(n) || (wi && wi.iOS ? 1 : 0)),
              t(n),
              (r.cacheID = Si.cache),
              i && Pi("ss", n);
          } else
            (e || Si.cache !== r.cacheID || Pi("ref")) &&
              ((r.cacheID = Si.cache), (r.v = t()));
          return r.v + r.offset;
        };
        return (r.offset = 0), t && r;
      },
      Yi = {
        s: zi,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: Ni(function (t) {
          return arguments.length
            ? pi.scrollTo(t, qi.sc())
            : pi.pageXOffset || mi[zi] || gi[zi] || _i[zi] || 0;
        }),
      },
      qi = {
        s: Bi,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: Yi,
        sc: Ni(function (t) {
          return arguments.length
            ? pi.scrollTo(Yi.sc(), t)
            : pi.pageYOffset || mi[Bi] || gi[Bi] || _i[Bi] || 0;
        }),
      },
      Xi = function (t, e) {
        return (
          ((e && e._ctx && e._ctx.selector) || hi.utils.toArray)(t)[0] ||
          ("string" == typeof t && !1 !== hi.config().nullTargetWarn
            ? console.warn("Element not found:", t)
            : null)
        );
      },
      Hi = function (t, e) {
        var r = e.s,
          n = e.sc;
        Li(t) && (t = mi.scrollingElement || gi);
        var i = Si.indexOf(t),
          s = n === qi.sc ? 1 : 2;
        !~i && (i = Si.push(t) - 1), Si[i + s] || Ri(t, "scroll", Fi);
        var a = Si[i + s],
          o =
            a ||
            (Si[i + s] =
              Ni(Di(t, r), !0) ||
              (Li(t)
                ? n
                : Ni(function (e) {
                    return arguments.length ? (t[r] = e) : t[r];
                  })));
        return (
          (o.target = t),
          a || (o.smooth = "smooth" === hi.getProperty(t, "scrollBehavior")),
          o
        );
      },
      Ui = function (t, e, r) {
        var n = t,
          i = t,
          s = Oi(),
          a = s,
          o = e || 50,
          l = Math.max(500, 3 * o),
          u = function (t, e) {
            var l = Oi();
            e || l - s > o
              ? ((i = n), (n = t), (a = s), (s = l))
              : r
                ? (n += t)
                : (n = i + ((t - i) / (l - a)) * (s - a));
          };
        return {
          update: u,
          reset: function () {
            (i = n = r ? 0 : n), (a = s = 0);
          },
          getVelocity: function (t) {
            var e = a,
              o = i,
              c = Oi();
            return (
              (t || 0 === t) && t !== n && u(t),
              s === a || c - a > l
                ? 0
                : ((n + (r ? o : -o)) / ((r ? c : s) - e)) * 1e3
            );
          },
        };
      },
      Vi = function (t, e) {
        return (
          e && !t._gsapAllow && t.preventDefault(),
          t.changedTouches ? t.changedTouches[0] : t
        );
      },
      ji = function (t) {
        var e = Math.max.apply(Math, t),
          r = Math.min.apply(Math, t);
        return Math.abs(e) >= Math.abs(r) ? e : r;
      },
      Wi = function () {
        var t, e, r, n;
        (bi = hi.core.globals().ScrollTrigger) &&
          bi.core &&
          ((t = bi.core),
          (e = t.bridge || {}),
          (r = t._scrollers),
          (n = t._proxies),
          r.push.apply(r, Si),
          n.push.apply(n, Ci),
          (Si = r),
          (Ci = n),
          (Pi = function (t, r) {
            return e[t](r);
          }));
      },
      Gi = function (t) {
        return (
          (hi = t || ki()),
          !di &&
            hi &&
            "undefined" != typeof document &&
            document.body &&
            ((pi = window),
            (mi = document),
            (gi = mi.documentElement),
            (_i = mi.body),
            (xi = [pi, mi, gi, _i]),
            hi.utils.clamp,
            (Ei = hi.core.context || function () {}),
            (yi = "onpointerenter" in _i ? "pointer" : "mouse"),
            (vi = $i.isTouch =
              pi.matchMedia &&
              pi.matchMedia("(hover: none), (pointer: coarse)").matches
                ? 1
                : "ontouchstart" in pi ||
                    navigator.maxTouchPoints > 0 ||
                    navigator.msMaxTouchPoints > 0
                  ? 2
                  : 0),
            (Ti = $i.eventTypes =
              (
                "ontouchstart" in gi
                  ? "touchstart,touchmove,touchcancel,touchend"
                  : "onpointerdown" in gi
                    ? "pointerdown,pointermove,pointercancel,pointerup"
                    : "mousedown,mousemove,mouseup,mouseup"
              ).split(",")),
            setTimeout(function () {
              return (Ai = 0);
            }, 500),
            Wi(),
            (di = 1)),
          di
        );
      };
    (Yi.op = qi), (Si.cache = 0);
    var $i = (function () {
      function t(t) {
        this.init(t);
      }
      var e, r, n;
      return (
        (t.prototype.init = function (t) {
          di || Gi(hi) || console.warn("Please gsap.registerPlugin(Observer)"),
            bi || Wi();
          var e = t.tolerance,
            r = t.dragMinimum,
            n = t.type,
            i = t.target,
            s = t.lineHeight,
            a = t.debounce,
            o = t.preventDefault,
            l = t.onStop,
            u = t.onStopDelay,
            c = t.ignore,
            f = t.wheelSpeed,
            h = t.event,
            d = t.onDragStart,
            p = t.onDragEnd,
            m = t.onDrag,
            g = t.onPress,
            _ = t.onRelease,
            v = t.onRight,
            y = t.onLeft,
            b = t.onUp,
            x = t.onDown,
            w = t.onChangeX,
            T = t.onChangeY,
            E = t.onChange,
            k = t.onToggleX,
            A = t.onToggleY,
            M = t.onHover,
            S = t.onHoverEnd,
            C = t.onMove,
            O = t.ignoreCheck,
            P = t.isNormalizer,
            D = t.onGestureStart,
            L = t.onGestureEnd,
            R = t.onWheel,
            I = t.onEnable,
            z = t.onDisable,
            B = t.onClick,
            F = t.scrollSpeed,
            N = t.capture,
            Y = t.allowClicks,
            q = t.lockAxis,
            X = t.onLockAxis;
          (this.target = i = Xi(i) || gi),
            (this.vars = t),
            c && (c = hi.utils.toArray(c)),
            (e = e || 1e-9),
            (r = r || 0),
            (f = f || 1),
            (F = F || 1),
            (n = n || "wheel,touch,pointer"),
            (a = !1 !== a),
            s || (s = parseFloat(pi.getComputedStyle(_i).lineHeight) || 22);
          var H,
            U,
            V,
            j,
            W,
            G,
            $,
            Q = this,
            Z = 0,
            J = 0,
            K = t.passive || !o,
            tt = Hi(i, Yi),
            et = Hi(i, qi),
            rt = tt(),
            nt = et(),
            it =
              ~n.indexOf("touch") &&
              !~n.indexOf("pointer") &&
              "pointerdown" === Ti[0],
            st = Li(i),
            at = i.ownerDocument || mi,
            ot = [0, 0, 0],
            lt = [0, 0, 0],
            ut = 0,
            ct = function () {
              return (ut = Oi());
            },
            ft = function (t, e) {
              return (
                ((Q.event = t) && c && ~c.indexOf(t.target)) ||
                (e && it && "touch" !== t.pointerType) ||
                (O && O(t, e))
              );
            },
            ht = function () {
              var t = (Q.deltaX = ji(ot)),
                r = (Q.deltaY = ji(lt)),
                n = Math.abs(t) >= e,
                i = Math.abs(r) >= e;
              E && (n || i) && E(Q, t, r, ot, lt),
                n &&
                  (v && Q.deltaX > 0 && v(Q),
                  y && Q.deltaX < 0 && y(Q),
                  w && w(Q),
                  k && Q.deltaX < 0 != Z < 0 && k(Q),
                  (Z = Q.deltaX),
                  (ot[0] = ot[1] = ot[2] = 0)),
                i &&
                  (x && Q.deltaY > 0 && x(Q),
                  b && Q.deltaY < 0 && b(Q),
                  T && T(Q),
                  A && Q.deltaY < 0 != J < 0 && A(Q),
                  (J = Q.deltaY),
                  (lt[0] = lt[1] = lt[2] = 0)),
                (j || V) && (C && C(Q), V && (m(Q), (V = !1)), (j = !1)),
                G && !(G = !1) && X && X(Q),
                W && (R(Q), (W = !1)),
                (H = 0);
            },
            dt = function (t, e, r) {
              (ot[r] += t),
                (lt[r] += e),
                Q._vx.update(t),
                Q._vy.update(e),
                a ? H || (H = requestAnimationFrame(ht)) : ht();
            },
            pt = function (t, e) {
              q &&
                !$ &&
                ((Q.axis = $ = Math.abs(t) > Math.abs(e) ? "x" : "y"),
                (G = !0)),
                "y" !== $ && ((ot[2] += t), Q._vx.update(t, !0)),
                "x" !== $ && ((lt[2] += e), Q._vy.update(e, !0)),
                a ? H || (H = requestAnimationFrame(ht)) : ht();
            },
            mt = function (t) {
              if (!ft(t, 1)) {
                var e = (t = Vi(t, o)).clientX,
                  n = t.clientY,
                  i = e - Q.x,
                  s = n - Q.y,
                  a = Q.isDragging;
                (Q.x = e),
                  (Q.y = n),
                  (a ||
                    Math.abs(Q.startX - e) >= r ||
                    Math.abs(Q.startY - n) >= r) &&
                    (m && (V = !0),
                    a || (Q.isDragging = !0),
                    pt(i, s),
                    a || (d && d(Q)));
              }
            },
            gt = (Q.onPress = function (t) {
              ft(t, 1) ||
                (t && t.button) ||
                ((Q.axis = $ = null),
                U.pause(),
                (Q.isPressed = !0),
                (t = Vi(t)),
                (Z = J = 0),
                (Q.startX = Q.x = t.clientX),
                (Q.startY = Q.y = t.clientY),
                Q._vx.reset(),
                Q._vy.reset(),
                Ri(P ? i : at, Ti[1], mt, K, !0),
                (Q.deltaX = Q.deltaY = 0),
                g && g(Q));
            }),
            _t = (Q.onRelease = function (t) {
              if (!ft(t, 1)) {
                Ii(P ? i : at, Ti[1], mt, !0);
                var e = !isNaN(Q.y - Q.startY),
                  r = Q.isDragging,
                  n =
                    r &&
                    (Math.abs(Q.x - Q.startX) > 3 ||
                      Math.abs(Q.y - Q.startY) > 3),
                  s = Vi(t);
                !n &&
                  e &&
                  (Q._vx.reset(),
                  Q._vy.reset(),
                  o &&
                    Y &&
                    hi.delayedCall(0.08, function () {
                      if (Oi() - ut > 300 && !t.defaultPrevented)
                        if (t.target.click) t.target.click();
                        else if (at.createEvent) {
                          var e = at.createEvent("MouseEvents");
                          e.initMouseEvent(
                            "click",
                            !0,
                            !0,
                            pi,
                            1,
                            s.screenX,
                            s.screenY,
                            s.clientX,
                            s.clientY,
                            !1,
                            !1,
                            !1,
                            !1,
                            0,
                            null,
                          ),
                            t.target.dispatchEvent(e);
                        }
                    })),
                  (Q.isDragging = Q.isGesturing = Q.isPressed = !1),
                  l && r && !P && U.restart(!0),
                  p && r && p(Q),
                  _ && _(Q, n);
              }
            }),
            vt = function (t) {
              return (
                t.touches &&
                t.touches.length > 1 &&
                (Q.isGesturing = !0) &&
                D(t, Q.isDragging)
              );
            },
            yt = function () {
              return (Q.isGesturing = !1) || L(Q);
            },
            bt = function (t) {
              if (!ft(t)) {
                var e = tt(),
                  r = et();
                dt((e - rt) * F, (r - nt) * F, 1),
                  (rt = e),
                  (nt = r),
                  l && U.restart(!0);
              }
            },
            xt = function (t) {
              if (!ft(t)) {
                (t = Vi(t, o)), R && (W = !0);
                var e =
                  (1 === t.deltaMode
                    ? s
                    : 2 === t.deltaMode
                      ? pi.innerHeight
                      : 1) * f;
                dt(t.deltaX * e, t.deltaY * e, 0), l && !P && U.restart(!0);
              }
            },
            wt = function (t) {
              if (!ft(t)) {
                var e = t.clientX,
                  r = t.clientY,
                  n = e - Q.x,
                  i = r - Q.y;
                (Q.x = e),
                  (Q.y = r),
                  (j = !0),
                  l && U.restart(!0),
                  (n || i) && pt(n, i);
              }
            },
            Tt = function (t) {
              (Q.event = t), M(Q);
            },
            Et = function (t) {
              (Q.event = t), S(Q);
            },
            kt = function (t) {
              return ft(t) || (Vi(t, o) && B(Q));
            };
          (U = Q._dc =
            hi
              .delayedCall(u || 0.25, function () {
                Q._vx.reset(), Q._vy.reset(), U.pause(), l && l(Q);
              })
              .pause()),
            (Q.deltaX = Q.deltaY = 0),
            (Q._vx = Ui(0, 50, !0)),
            (Q._vy = Ui(0, 50, !0)),
            (Q.scrollX = tt),
            (Q.scrollY = et),
            (Q.isDragging = Q.isGesturing = Q.isPressed = !1),
            Ei(this),
            (Q.enable = function (t) {
              return (
                Q.isEnabled ||
                  (Ri(st ? at : i, "scroll", Fi),
                  n.indexOf("scroll") >= 0 &&
                    Ri(st ? at : i, "scroll", bt, K, N),
                  n.indexOf("wheel") >= 0 && Ri(i, "wheel", xt, K, N),
                  ((n.indexOf("touch") >= 0 && vi) ||
                    n.indexOf("pointer") >= 0) &&
                    (Ri(i, Ti[0], gt, K, N),
                    Ri(at, Ti[2], _t),
                    Ri(at, Ti[3], _t),
                    Y && Ri(i, "click", ct, !0, !0),
                    B && Ri(i, "click", kt),
                    D && Ri(at, "gesturestart", vt),
                    L && Ri(at, "gestureend", yt),
                    M && Ri(i, yi + "enter", Tt),
                    S && Ri(i, yi + "leave", Et),
                    C && Ri(i, yi + "move", wt)),
                  (Q.isEnabled = !0),
                  t && t.type && gt(t),
                  I && I(Q)),
                Q
              );
            }),
            (Q.disable = function () {
              Q.isEnabled &&
                (Mi.filter(function (t) {
                  return t !== Q && Li(t.target);
                }).length || Ii(st ? at : i, "scroll", Fi),
                Q.isPressed &&
                  (Q._vx.reset(), Q._vy.reset(), Ii(P ? i : at, Ti[1], mt, !0)),
                Ii(st ? at : i, "scroll", bt, N),
                Ii(i, "wheel", xt, N),
                Ii(i, Ti[0], gt, N),
                Ii(at, Ti[2], _t),
                Ii(at, Ti[3], _t),
                Ii(i, "click", ct, !0),
                Ii(i, "click", kt),
                Ii(at, "gesturestart", vt),
                Ii(at, "gestureend", yt),
                Ii(i, yi + "enter", Tt),
                Ii(i, yi + "leave", Et),
                Ii(i, yi + "move", wt),
                (Q.isEnabled = Q.isPressed = Q.isDragging = !1),
                z && z(Q));
            }),
            (Q.kill = Q.revert =
              function () {
                Q.disable();
                var t = Mi.indexOf(Q);
                t >= 0 && Mi.splice(t, 1), wi === Q && (wi = 0);
              }),
            Mi.push(Q),
            P && Li(i) && (wi = Q),
            Q.enable(h);
        }),
        (e = t),
        (r = [
          {
            key: "velocityX",
            get: function () {
              return this._vx.getVelocity();
            },
          },
          {
            key: "velocityY",
            get: function () {
              return this._vy.getVelocity();
            },
          },
        ]) && fi(e.prototype, r),
        n && fi(e, n),
        t
      );
    })();
    ($i.version = "3.12.5"),
      ($i.create = function (t) {
        return new $i(t);
      }),
      ($i.register = Gi),
      ($i.getAll = function () {
        return Mi.slice();
      }),
      ($i.getById = function (t) {
        return Mi.filter(function (e) {
          return e.vars.id === t;
        })[0];
      }),
      ki() && hi.registerPlugin($i);
    var Qi,
      Zi,
      Ji,
      Ki,
      ts,
      es,
      rs,
      ns,
      is,
      ss,
      as,
      os,
      ls,
      us,
      cs,
      fs,
      hs,
      ds,
      ps,
      ms,
      gs,
      _s,
      vs,
      ys,
      bs,
      xs,
      ws,
      Ts,
      Es,
      ks,
      As,
      Ms,
      Ss,
      Cs,
      Os,
      Ps,
      Ds,
      Ls,
      Rs = 1,
      Is = Date.now,
      zs = Is(),
      Bs = 0,
      Fs = 0,
      Ns = function (t, e, r) {
        var n = Ks(t) && ("clamp(" === t.substr(0, 6) || t.indexOf("max") > -1);
        return (r["_" + e + "Clamp"] = n), n ? t.substr(6, t.length - 7) : t;
      },
      Ys = function (t, e) {
        return !e || (Ks(t) && "clamp(" === t.substr(0, 6))
          ? t
          : "clamp(" + t + ")";
      },
      qs = function t() {
        return Fs && requestAnimationFrame(t);
      },
      Xs = function () {
        return (us = 1);
      },
      Hs = function () {
        return (us = 0);
      },
      Us = function (t) {
        return t;
      },
      Vs = function (t) {
        return Math.round(1e5 * t) / 1e5 || 0;
      },
      js = function () {
        return "undefined" != typeof window;
      },
      Ws = function () {
        return Qi || (js() && (Qi = window.gsap) && Qi.registerPlugin && Qi);
      },
      Gs = function (t) {
        return !!~rs.indexOf(t);
      },
      $s = function (t) {
        return (
          ("Height" === t ? As : Ji["inner" + t]) ||
          ts["client" + t] ||
          es["client" + t]
        );
      },
      Qs = function (t) {
        return (
          Di(t, "getBoundingClientRect") ||
          (Gs(t)
            ? function () {
                return (uo.width = Ji.innerWidth), (uo.height = As), uo;
              }
            : function () {
                return wa(t);
              })
        );
      },
      Zs = function (t, e) {
        var r = e.s,
          n = e.d2,
          i = e.d,
          s = e.a;
        return Math.max(
          0,
          (r = "scroll" + n) && (s = Di(t, r))
            ? s() - Qs(t)()[i]
            : Gs(t)
              ? (ts[r] || es[r]) - $s(n)
              : t[r] - t["offset" + n],
        );
      },
      Js = function (t, e) {
        for (var r = 0; r < ps.length; r += 3)
          (!e || ~e.indexOf(ps[r + 1])) && t(ps[r], ps[r + 1], ps[r + 2]);
      },
      Ks = function (t) {
        return "string" == typeof t;
      },
      ta = function (t) {
        return "function" == typeof t;
      },
      ea = function (t) {
        return "number" == typeof t;
      },
      ra = function (t) {
        return "object" == typeof t;
      },
      na = function (t, e, r) {
        return t && t.progress(e ? 0 : 1) && r && t.pause();
      },
      ia = function (t, e) {
        if (t.enabled) {
          var r = t._ctx
            ? t._ctx.add(function () {
                return e(t);
              })
            : e(t);
          r && r.totalTime && (t.callbackAnimation = r);
        }
      },
      sa = Math.abs,
      aa = "left",
      oa = "right",
      la = "bottom",
      ua = "width",
      ca = "height",
      fa = "Right",
      ha = "Left",
      da = "Top",
      pa = "Bottom",
      ma = "padding",
      ga = "margin",
      _a = "Width",
      va = "Height",
      ya = "px",
      ba = function (t) {
        return Ji.getComputedStyle(t);
      },
      xa = function (t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t;
      },
      wa = function (t, e) {
        var r =
            e &&
            "matrix(1, 0, 0, 1, 0, 0)" !== ba(t)[cs] &&
            Qi.to(t, {
              x: 0,
              y: 0,
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            }).progress(1),
          n = t.getBoundingClientRect();
        return r && r.progress(0).kill(), n;
      },
      Ta = function (t, e) {
        var r = e.d2;
        return t["offset" + r] || t["client" + r] || 0;
      },
      Ea = function (t) {
        var e,
          r = [],
          n = t.labels,
          i = t.duration();
        for (e in n) r.push(n[e] / i);
        return r;
      },
      ka = function (t) {
        var e = Qi.utils.snap(t),
          r =
            Array.isArray(t) &&
            t.slice(0).sort(function (t, e) {
              return t - e;
            });
        return r
          ? function (t, n, i) {
              var s;
              if ((void 0 === i && (i = 0.001), !n)) return e(t);
              if (n > 0) {
                for (t -= i, s = 0; s < r.length; s++)
                  if (r[s] >= t) return r[s];
                return r[s - 1];
              }
              for (s = r.length, t += i; s--; ) if (r[s] <= t) return r[s];
              return r[0];
            }
          : function (r, n, i) {
              void 0 === i && (i = 0.001);
              var s = e(r);
              return !n || Math.abs(s - r) < i || s - r < 0 == n < 0
                ? s
                : e(n < 0 ? r - t : r + t);
            };
      },
      Aa = function (t, e, r, n) {
        return r.split(",").forEach(function (r) {
          return t(e, r, n);
        });
      },
      Ma = function (t, e, r, n, i) {
        return t.addEventListener(e, r, { passive: !n, capture: !!i });
      },
      Sa = function (t, e, r, n) {
        return t.removeEventListener(e, r, !!n);
      },
      Ca = function (t, e, r) {
        (r = r && r.wheelHandler) && (t(e, "wheel", r), t(e, "touchmove", r));
      },
      Oa = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal",
      },
      Pa = { toggleActions: "play", anticipatePin: 0 },
      Da = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
      La = function (t, e) {
        if (Ks(t)) {
          var r = t.indexOf("="),
            n = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0;
          ~r &&
            (t.indexOf("%") > r && (n *= e / 100), (t = t.substr(0, r - 1))),
            (t =
              n +
              (t in Da
                ? Da[t] * e
                : ~t.indexOf("%")
                  ? (parseFloat(t) * e) / 100
                  : parseFloat(t) || 0));
        }
        return t;
      },
      Ra = function (t, e, r, n, i, s, a, o) {
        var l = i.startColor,
          u = i.endColor,
          c = i.fontSize,
          f = i.indent,
          h = i.fontWeight,
          d = Ki.createElement("div"),
          p = Gs(r) || "fixed" === Di(r, "pinType"),
          m = -1 !== t.indexOf("scroller"),
          g = p ? es : r,
          _ = -1 !== t.indexOf("start"),
          v = _ ? l : u,
          y =
            "border-color:" +
            v +
            ";font-size:" +
            c +
            ";color:" +
            v +
            ";font-weight:" +
            h +
            ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return (
          (y += "position:" + ((m || o) && p ? "fixed;" : "absolute;")),
          (m || o || !p) &&
            (y += (n === qi ? oa : la) + ":" + (s + parseFloat(f)) + "px;"),
          a &&
            (y +=
              "box-sizing:border-box;text-align:left;width:" +
              a.offsetWidth +
              "px;"),
          (d._isStart = _),
          d.setAttribute(
            "class",
            "gsap-marker-" + t + (e ? " marker-" + e : ""),
          ),
          (d.style.cssText = y),
          (d.innerText = e || 0 === e ? t + "-" + e : t),
          g.children[0] ? g.insertBefore(d, g.children[0]) : g.appendChild(d),
          (d._offset = d["offset" + n.op.d2]),
          Ia(d, 0, n, _),
          d
        );
      },
      Ia = function (t, e, r, n) {
        var i = { display: "block" },
          s = r[n ? "os2" : "p2"],
          a = r[n ? "p2" : "os2"];
        (t._isFlipped = n),
          (i[r.a + "Percent"] = n ? -100 : 0),
          (i[r.a] = n ? "1px" : 0),
          (i["border" + s + _a] = 1),
          (i["border" + a + _a] = 0),
          (i[r.p] = e + "px"),
          Qi.set(t, i);
      },
      za = [],
      Ba = {},
      Fa = function () {
        return Is() - Bs > 34 && (Os || (Os = requestAnimationFrame(ro)));
      },
      Na = function () {
        (!vs || !vs.isPressed || vs.startX > es.clientWidth) &&
          (Si.cache++,
          vs ? Os || (Os = requestAnimationFrame(ro)) : ro(),
          Bs || Va("scrollStart"),
          (Bs = Is()));
      },
      Ya = function () {
        (xs = Ji.innerWidth), (bs = Ji.innerHeight);
      },
      qa = function () {
        Si.cache++,
          !ls &&
            !_s &&
            !Ki.fullscreenElement &&
            !Ki.webkitFullscreenElement &&
            (!ys ||
              xs !== Ji.innerWidth ||
              Math.abs(Ji.innerHeight - bs) > 0.25 * Ji.innerHeight) &&
            ns.restart(!0);
      },
      Xa = {},
      Ha = [],
      Ua = function t() {
        return Sa(_o, "scrollEnd", t) || Ka(!0);
      },
      Va = function (t) {
        return (
          (Xa[t] &&
            Xa[t].map(function (t) {
              return t();
            })) ||
          Ha
        );
      },
      ja = [],
      Wa = function (t) {
        for (var e = 0; e < ja.length; e += 5)
          (!t || (ja[e + 4] && ja[e + 4].query === t)) &&
            ((ja[e].style.cssText = ja[e + 1]),
            ja[e].getBBox && ja[e].setAttribute("transform", ja[e + 2] || ""),
            (ja[e + 3].uncache = 1));
      },
      Ga = function (t, e) {
        var r;
        for (fs = 0; fs < za.length; fs++)
          !(r = za[fs]) ||
            (e && r._ctx !== e) ||
            (t ? r.kill(1) : r.revert(!0, !0));
        (Ms = !0), e && Wa(e), e || Va("revert");
      },
      $a = function (t, e) {
        Si.cache++,
          (e || !Ps) &&
            Si.forEach(function (t) {
              return ta(t) && t.cacheID++ && (t.rec = 0);
            }),
          Ks(t) && (Ji.history.scrollRestoration = Es = t);
      },
      Qa = 0,
      Za = function () {
        es.appendChild(ks),
          (As = (!vs && ks.offsetHeight) || Ji.innerHeight),
          es.removeChild(ks);
      },
      Ja = function (t) {
        return is(
          ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end",
        ).forEach(function (e) {
          return (e.style.display = t ? "none" : "block");
        });
      },
      Ka = function (t, e) {
        if (!Bs || t || Ms) {
          Za(),
            (Ps = _o.isRefreshing = !0),
            Si.forEach(function (t) {
              return ta(t) && ++t.cacheID && (t.rec = t());
            });
          var r = Va("refreshInit");
          ms && _o.sort(),
            e || Ga(),
            Si.forEach(function (t) {
              ta(t) &&
                (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0));
            }),
            za.slice(0).forEach(function (t) {
              return t.refresh();
            }),
            (Ms = !1),
            za.forEach(function (t) {
              if (t._subPinOffset && t.pin) {
                var e = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
                  r = t.pin[e];
                t.revert(!0, 1), t.adjustPinSpacing(t.pin[e] - r), t.refresh();
              }
            }),
            (Ss = 1),
            Ja(!0),
            za.forEach(function (t) {
              var e = Zs(t.scroller, t._dir),
                r = "max" === t.vars.end || (t._endClamp && t.end > e),
                n = t._startClamp && t.start >= e;
              (r || n) &&
                t.setPositions(
                  n ? e - 1 : t.start,
                  r ? Math.max(n ? e : t.start + 1, e) : t.end,
                  !0,
                );
            }),
            Ja(!1),
            (Ss = 0),
            r.forEach(function (t) {
              return t && t.render && t.render(-1);
            }),
            Si.forEach(function (t) {
              ta(t) &&
                (t.smooth &&
                  requestAnimationFrame(function () {
                    return (t.target.style.scrollBehavior = "smooth");
                  }),
                t.rec && t(t.rec));
            }),
            $a(Es, 1),
            ns.pause(),
            Qa++,
            (Ps = 2),
            ro(2),
            za.forEach(function (t) {
              return ta(t.vars.onRefresh) && t.vars.onRefresh(t);
            }),
            (Ps = _o.isRefreshing = !1),
            Va("refresh");
        } else Ma(_o, "scrollEnd", Ua);
      },
      to = 0,
      eo = 1,
      ro = function (t) {
        if (2 === t || (!Ps && !Ms)) {
          (_o.isUpdating = !0), Ls && Ls.update(0);
          var e = za.length,
            r = Is(),
            n = r - zs >= 50,
            i = e && za[0].scroll();
          if (
            ((eo = to > i ? -1 : 1),
            Ps || (to = i),
            n &&
              (Bs && !us && r - Bs > 200 && ((Bs = 0), Va("scrollEnd")),
              (as = zs),
              (zs = r)),
            eo < 0)
          ) {
            for (fs = e; fs-- > 0; ) za[fs] && za[fs].update(0, n);
            eo = 1;
          } else for (fs = 0; fs < e; fs++) za[fs] && za[fs].update(0, n);
          _o.isUpdating = !1;
        }
        Os = 0;
      },
      no = [
        aa,
        "top",
        la,
        oa,
        ga + pa,
        ga + fa,
        ga + da,
        ga + ha,
        "display",
        "flexShrink",
        "float",
        "zIndex",
        "gridColumnStart",
        "gridColumnEnd",
        "gridRowStart",
        "gridRowEnd",
        "gridArea",
        "justifySelf",
        "alignSelf",
        "placeSelf",
        "order",
      ],
      io = no.concat([
        ua,
        ca,
        "boxSizing",
        "max" + _a,
        "max" + va,
        "position",
        ga,
        ma,
        ma + da,
        ma + fa,
        ma + pa,
        ma + ha,
      ]),
      so = function (t, e, r, n) {
        if (!t._gsap.swappedIn) {
          for (var i, s = no.length, a = e.style, o = t.style; s--; )
            a[(i = no[s])] = r[i];
          (a.position = "absolute" === r.position ? "absolute" : "relative"),
            "inline" === r.display && (a.display = "inline-block"),
            (o[la] = o[oa] = "auto"),
            (a.flexBasis = r.flexBasis || "auto"),
            (a.overflow = "visible"),
            (a.boxSizing = "border-box"),
            (a[ua] = Ta(t, Yi) + ya),
            (a[ca] = Ta(t, qi) + ya),
            (a[ma] = o[ga] = o.top = o[aa] = "0"),
            oo(n),
            (o[ua] = o["max" + _a] = r[ua]),
            (o[ca] = o["max" + va] = r[ca]),
            (o[ma] = r[ma]),
            t.parentNode !== e &&
              (t.parentNode.insertBefore(e, t), e.appendChild(t)),
            (t._gsap.swappedIn = !0);
        }
      },
      ao = /([A-Z])/g,
      oo = function (t) {
        if (t) {
          var e,
            r,
            n = t.t.style,
            i = t.length,
            s = 0;
          for ((t.t._gsap || Qi.core.getCache(t.t)).uncache = 1; s < i; s += 2)
            (r = t[s + 1]),
              (e = t[s]),
              r
                ? (n[e] = r)
                : n[e] && n.removeProperty(e.replace(ao, "-$1").toLowerCase());
        }
      },
      lo = function (t) {
        for (var e = io.length, r = t.style, n = [], i = 0; i < e; i++)
          n.push(io[i], r[io[i]]);
        return (n.t = t), n;
      },
      uo = { left: 0, top: 0 },
      co = function (t, e, r, n, i, s, a, o, l, u, c, f, h, d) {
        ta(t) && (t = t(o)),
          Ks(t) &&
            "max" === t.substr(0, 3) &&
            (t = f + ("=" === t.charAt(4) ? La("0" + t.substr(3), r) : 0));
        var p,
          m,
          g,
          _ = h ? h.time() : 0;
        if ((h && h.seek(0), isNaN(t) || (t = +t), ea(t)))
          h &&
            (t = Qi.utils.mapRange(
              h.scrollTrigger.start,
              h.scrollTrigger.end,
              0,
              f,
              t,
            )),
            a && Ia(a, r, n, !0);
        else {
          ta(e) && (e = e(o));
          var v,
            y,
            b,
            x,
            w = (t || "0").split(" ");
          (g = Xi(e, o) || es),
            ((v = wa(g) || {}) && (v.left || v.top)) ||
              "none" !== ba(g).display ||
              ((x = g.style.display),
              (g.style.display = "block"),
              (v = wa(g)),
              x ? (g.style.display = x) : g.style.removeProperty("display")),
            (y = La(w[0], v[n.d])),
            (b = La(w[1] || "0", r)),
            (t = v[n.p] - l[n.p] - u + y + i - b),
            a && Ia(a, b, n, r - b < 20 || (a._isStart && b > 20)),
            (r -= r - b);
        }
        if ((d && ((o[d] = t || -0.001), t < 0 && (t = 0)), s)) {
          var T = t + r,
            E = s._isStart;
          (p = "scroll" + n.d2),
            Ia(
              s,
              T,
              n,
              (E && T > 20) ||
                (!E && (c ? Math.max(es[p], ts[p]) : s.parentNode[p]) <= T + 1),
            ),
            c &&
              ((l = wa(a)),
              c && (s.style[n.op.p] = l[n.op.p] - n.op.m - s._offset + ya));
        }
        return (
          h &&
            g &&
            ((p = wa(g)),
            h.seek(f),
            (m = wa(g)),
            (h._caScrollDist = p[n.p] - m[n.p]),
            (t = (t / h._caScrollDist) * f)),
          h && h.seek(_),
          h ? t : Math.round(t)
        );
      },
      fo = /(webkit|moz|length|cssText|inset)/i,
      ho = function (t, e, r, n) {
        if (t.parentNode !== e) {
          var i,
            s,
            a = t.style;
          if (e === es) {
            for (i in ((t._stOrig = a.cssText), (s = ba(t))))
              +i ||
                fo.test(i) ||
                !s[i] ||
                "string" != typeof a[i] ||
                "0" === i ||
                (a[i] = s[i]);
            (a.top = r), (a.left = n);
          } else a.cssText = t._stOrig;
          (Qi.core.getCache(t).uncache = 1), e.appendChild(t);
        }
      },
      po = function (t, e, r) {
        var n = e,
          i = n;
        return function (e) {
          var s = Math.round(t());
          return (
            s !== n &&
              s !== i &&
              Math.abs(s - n) > 3 &&
              Math.abs(s - i) > 3 &&
              ((e = s), r && r()),
            (i = n),
            (n = e),
            e
          );
        };
      },
      mo = function (t, e, r) {
        var n = {};
        (n[e.p] = "+=" + r), Qi.set(t, n);
      },
      go = function (t, e) {
        var r = Hi(t, e),
          n = "_scroll" + e.p2,
          i = function e(i, s, a, o, l) {
            var u = e.tween,
              c = s.onComplete,
              f = {};
            a = a || r();
            var h = po(r, a, function () {
              u.kill(), (e.tween = 0);
            });
            return (
              (l = (o && l) || 0),
              (o = o || i - a),
              u && u.kill(),
              (s[n] = i),
              (s.inherit = !1),
              (s.modifiers = f),
              (f[n] = function () {
                return h(a + o * u.ratio + l * u.ratio * u.ratio);
              }),
              (s.onUpdate = function () {
                Si.cache++, e.tween && ro();
              }),
              (s.onComplete = function () {
                (e.tween = 0), c && c.call(u);
              }),
              (u = e.tween = Qi.to(t, s))
            );
          };
        return (
          (t[n] = r),
          (r.wheelHandler = function () {
            return i.tween && i.tween.kill() && (i.tween = 0);
          }),
          Ma(t, "wheel", r.wheelHandler),
          _o.isTouch && Ma(t, "touchmove", r.wheelHandler),
          i
        );
      },
      _o = (function () {
        function t(e, r) {
          Zi ||
            t.register(Qi) ||
            console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
            Ts(this),
            this.init(e, r);
        }
        return (
          (t.prototype.init = function (e, r) {
            if (
              ((this.progress = this.start = 0),
              this.vars && this.kill(!0, !0),
              Fs)
            ) {
              var n,
                i,
                s,
                a,
                o,
                l,
                u,
                c,
                f,
                h,
                d,
                p,
                m,
                g,
                _,
                v,
                y,
                b,
                x,
                w,
                T,
                E,
                k,
                A,
                M,
                S,
                C,
                O,
                P,
                D,
                L,
                R,
                I,
                z,
                B,
                F,
                N,
                Y,
                q,
                X,
                H,
                U,
                V = (e = xa(
                  Ks(e) || ea(e) || e.nodeType ? { trigger: e } : e,
                  Pa,
                )),
                j = V.onUpdate,
                W = V.toggleClass,
                G = V.id,
                $ = V.onToggle,
                Q = V.onRefresh,
                Z = V.scrub,
                J = V.trigger,
                K = V.pin,
                tt = V.pinSpacing,
                et = V.invalidateOnRefresh,
                rt = V.anticipatePin,
                nt = V.onScrubComplete,
                it = V.onSnapComplete,
                st = V.once,
                at = V.snap,
                ot = V.pinReparent,
                lt = V.pinSpacer,
                ut = V.containerAnimation,
                ct = V.fastScrollEnd,
                ft = V.preventOverlaps,
                ht =
                  e.horizontal || (e.containerAnimation && !1 !== e.horizontal)
                    ? Yi
                    : qi,
                dt = !Z && 0 !== Z,
                pt = Xi(e.scroller || Ji),
                mt = Qi.core.getCache(pt),
                gt = Gs(pt),
                _t =
                  "fixed" ===
                  ("pinType" in e
                    ? e.pinType
                    : Di(pt, "pinType") || (gt && "fixed")),
                vt = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
                yt = dt && e.toggleActions.split(" "),
                bt = "markers" in e ? e.markers : Pa.markers,
                xt = gt ? 0 : parseFloat(ba(pt)["border" + ht.p2 + _a]) || 0,
                wt = this,
                Tt =
                  e.onRefreshInit &&
                  function () {
                    return e.onRefreshInit(wt);
                  },
                Et = (function (t, e, r) {
                  var n = r.d,
                    i = r.d2,
                    s = r.a;
                  return (s = Di(t, "getBoundingClientRect"))
                    ? function () {
                        return s()[n];
                      }
                    : function () {
                        return (e ? $s(i) : t["client" + i]) || 0;
                      };
                })(pt, gt, ht),
                kt = (function (t, e) {
                  return !e || ~Ci.indexOf(t)
                    ? Qs(t)
                    : function () {
                        return uo;
                      };
                })(pt, gt),
                At = 0,
                Mt = 0,
                St = 0,
                Ct = Hi(pt, ht);
              if (
                ((wt._startClamp = wt._endClamp = !1),
                (wt._dir = ht),
                (rt *= 45),
                (wt.scroller = pt),
                (wt.scroll = ut ? ut.time.bind(ut) : Ct),
                (a = Ct()),
                (wt.vars = e),
                (r = r || e.animation),
                "refreshPriority" in e &&
                  ((ms = 1), -9999 === e.refreshPriority && (Ls = wt)),
                (mt.tweenScroll = mt.tweenScroll || {
                  top: go(pt, qi),
                  left: go(pt, Yi),
                }),
                (wt.tweenTo = n = mt.tweenScroll[ht.p]),
                (wt.scrubDuration = function (t) {
                  (I = ea(t) && t)
                    ? R
                      ? R.duration(t)
                      : (R = Qi.to(r, {
                          ease: "expo",
                          totalProgress: "+=0",
                          inherit: !1,
                          duration: I,
                          paused: !0,
                          onComplete: function () {
                            return nt && nt(wt);
                          },
                        }))
                    : (R && R.progress(1).kill(), (R = 0));
                }),
                r &&
                  ((r.vars.lazy = !1),
                  (r._initted && !wt.isReverted) ||
                    (!1 !== r.vars.immediateRender &&
                      !1 !== e.immediateRender &&
                      r.duration() &&
                      r.render(0, !0, !0)),
                  (wt.animation = r.pause()),
                  (r.scrollTrigger = wt),
                  wt.scrubDuration(Z),
                  (D = 0),
                  G || (G = r.vars.id)),
                at &&
                  ((ra(at) && !at.push) || (at = { snapTo: at }),
                  "scrollBehavior" in es.style &&
                    Qi.set(gt ? [es, ts] : pt, { scrollBehavior: "auto" }),
                  Si.forEach(function (t) {
                    return (
                      ta(t) &&
                      t.target === (gt ? Ki.scrollingElement || ts : pt) &&
                      (t.smooth = !1)
                    );
                  }),
                  (s = ta(at.snapTo)
                    ? at.snapTo
                    : "labels" === at.snapTo
                      ? (function (t) {
                          return function (e) {
                            return Qi.utils.snap(Ea(t), e);
                          };
                        })(r)
                      : "labelsDirectional" === at.snapTo
                        ? ((X = r),
                          function (t, e) {
                            return ka(Ea(X))(t, e.direction);
                          })
                        : !1 !== at.directional
                          ? function (t, e) {
                              return ka(at.snapTo)(
                                t,
                                Is() - Mt < 500 ? 0 : e.direction,
                              );
                            }
                          : Qi.utils.snap(at.snapTo)),
                  (z = at.duration || { min: 0.1, max: 2 }),
                  (z = ra(z) ? ss(z.min, z.max) : ss(z, z)),
                  (B = Qi.delayedCall(at.delay || I / 2 || 0.1, function () {
                    var t = Ct(),
                      e = Is() - Mt < 500,
                      i = n.tween;
                    if (
                      !(e || Math.abs(wt.getVelocity()) < 10) ||
                      i ||
                      us ||
                      At === t
                    )
                      wt.isActive && At !== t && B.restart(!0);
                    else {
                      var a,
                        o,
                        c = (t - l) / g,
                        f = r && !dt ? r.totalProgress() : c,
                        h = e ? 0 : ((f - L) / (Is() - as)) * 1e3 || 0,
                        d = Qi.utils.clamp(-c, 1 - c, (sa(h / 2) * h) / 0.185),
                        p = c + (!1 === at.inertia ? 0 : d),
                        m = at,
                        _ = m.onStart,
                        v = m.onInterrupt,
                        y = m.onComplete;
                      if (
                        ((a = s(p, wt)),
                        ea(a) || (a = p),
                        (o = Math.round(l + a * g)),
                        t <= u && t >= l && o !== t)
                      ) {
                        if (i && !i._initted && i.data <= sa(o - t)) return;
                        !1 === at.inertia && (d = a - c),
                          n(
                            o,
                            {
                              duration: z(
                                sa(
                                  (0.185 * Math.max(sa(p - f), sa(a - f))) /
                                    h /
                                    0.05 || 0,
                                ),
                              ),
                              ease: at.ease || "power3",
                              data: sa(o - t),
                              onInterrupt: function () {
                                return B.restart(!0) && v && v(wt);
                              },
                              onComplete: function () {
                                wt.update(),
                                  (At = Ct()),
                                  r &&
                                    (R
                                      ? R.resetTo(
                                          "totalProgress",
                                          a,
                                          r._tTime / r._tDur,
                                        )
                                      : r.progress(a)),
                                  (D = L =
                                    r && !dt ? r.totalProgress() : wt.progress),
                                  it && it(wt),
                                  y && y(wt);
                              },
                            },
                            t,
                            d * g,
                            o - t - d * g,
                          ),
                          _ && _(wt, n.tween);
                      }
                    }
                  }).pause())),
                G && (Ba[G] = wt),
                (q =
                  (J = wt.trigger = Xi(J || (!0 !== K && K))) &&
                  J._gsap &&
                  J._gsap.stRevert) && (q = q(wt)),
                (K = !0 === K ? J : Xi(K)),
                Ks(W) && (W = { targets: J, className: W }),
                K &&
                  (!1 === tt ||
                    tt === ga ||
                    (tt =
                      !(
                        !tt &&
                        K.parentNode &&
                        K.parentNode.style &&
                        "flex" === ba(K.parentNode).display
                      ) && ma),
                  (wt.pin = K),
                  (i = Qi.core.getCache(K)).spacer
                    ? (_ = i.pinState)
                    : (lt &&
                        ((lt = Xi(lt)) &&
                          !lt.nodeType &&
                          (lt = lt.current || lt.nativeElement),
                        (i.spacerIsNative = !!lt),
                        lt && (i.spacerState = lo(lt))),
                      (i.spacer = b = lt || Ki.createElement("div")),
                      b.classList.add("pin-spacer"),
                      G && b.classList.add("pin-spacer-" + G),
                      (i.pinState = _ = lo(K))),
                  !1 !== e.force3D && Qi.set(K, { force3D: !0 }),
                  (wt.spacer = b = i.spacer),
                  (P = ba(K)),
                  (A = P[tt + ht.os2]),
                  (w = Qi.getProperty(K)),
                  (T = Qi.quickSetter(K, ht.a, ya)),
                  so(K, b, P),
                  (y = lo(K))),
                bt)
              ) {
                (p = ra(bt) ? xa(bt, Oa) : Oa),
                  (h = Ra("scroller-start", G, pt, ht, p, 0)),
                  (d = Ra("scroller-end", G, pt, ht, p, 0, h)),
                  (x = h["offset" + ht.op.d2]);
                var Ot = Xi(Di(pt, "content") || pt);
                (c = this.markerStart = Ra("start", G, Ot, ht, p, x, 0, ut)),
                  (f = this.markerEnd = Ra("end", G, Ot, ht, p, x, 0, ut)),
                  ut && (Y = Qi.quickSetter([c, f], ht.a, ya)),
                  _t ||
                    (Ci.length && !0 === Di(pt, "fixedMarkers")) ||
                    ((U = ba((H = gt ? es : pt)).position),
                    (H.style.position =
                      "absolute" === U || "fixed" === U ? U : "relative"),
                    Qi.set([h, d], { force3D: !0 }),
                    (S = Qi.quickSetter(h, ht.a, ya)),
                    (O = Qi.quickSetter(d, ht.a, ya)));
              }
              if (ut) {
                var Pt = ut.vars.onUpdate,
                  Dt = ut.vars.onUpdateParams;
                ut.eventCallback("onUpdate", function () {
                  wt.update(0, 0, 1), Pt && Pt.apply(ut, Dt || []);
                });
              }
              if (
                ((wt.previous = function () {
                  return za[za.indexOf(wt) - 1];
                }),
                (wt.next = function () {
                  return za[za.indexOf(wt) + 1];
                }),
                (wt.revert = function (t, e) {
                  if (!e) return wt.kill(!0);
                  var n = !1 !== t || !wt.enabled,
                    i = ls;
                  n !== wt.isReverted &&
                    (n &&
                      ((F = Math.max(Ct(), wt.scroll.rec || 0)),
                      (St = wt.progress),
                      (N = r && r.progress())),
                    c &&
                      [c, f, h, d].forEach(function (t) {
                        return (t.style.display = n ? "none" : "block");
                      }),
                    n && ((ls = wt), wt.update(n)),
                    !K ||
                      (ot && wt.isActive) ||
                      (n
                        ? (function (t, e, r) {
                            oo(r);
                            var n = t._gsap;
                            if (n.spacerIsNative) oo(n.spacerState);
                            else if (t._gsap.swappedIn) {
                              var i = e.parentNode;
                              i && (i.insertBefore(t, e), i.removeChild(e));
                            }
                            t._gsap.swappedIn = !1;
                          })(K, b, _)
                        : so(K, b, ba(K), M)),
                    n || wt.update(n),
                    (ls = i),
                    (wt.isReverted = n));
                }),
                (wt.refresh = function (i, s, p, x) {
                  if ((!ls && wt.enabled) || s)
                    if (K && i && Bs) Ma(t, "scrollEnd", Ua);
                    else {
                      !Ps && Tt && Tt(wt),
                        (ls = wt),
                        n.tween && !p && (n.tween.kill(), (n.tween = 0)),
                        R && R.pause(),
                        et && r && r.revert({ kill: !1 }).invalidate(),
                        wt.isReverted || wt.revert(!0, !0),
                        (wt._subPinOffset = !1);
                      var T,
                        A,
                        S,
                        O,
                        P,
                        D,
                        L,
                        I,
                        z,
                        Y,
                        q,
                        X,
                        H,
                        U = Et(),
                        V = kt(),
                        j = ut ? ut.duration() : Zs(pt, ht),
                        W = g <= 0.01,
                        G = 0,
                        $ = x || 0,
                        Z = ra(p) ? p.end : e.end,
                        rt = e.endTrigger || J,
                        nt = ra(p)
                          ? p.start
                          : e.start ||
                            (0 !== e.start && J ? (K ? "0 0" : "0 100%") : 0),
                        it = (wt.pinnedContainer =
                          e.pinnedContainer && Xi(e.pinnedContainer, wt)),
                        st = (J && Math.max(0, za.indexOf(wt))) || 0,
                        at = st;
                      for (
                        bt &&
                        ra(p) &&
                        ((X = Qi.getProperty(h, ht.p)),
                        (H = Qi.getProperty(d, ht.p)));
                        at--;

                      )
                        (D = za[at]).end || D.refresh(0, 1) || (ls = wt),
                          !(L = D.pin) ||
                            (L !== J && L !== K && L !== it) ||
                            D.isReverted ||
                            (Y || (Y = []), Y.unshift(D), D.revert(!0, !0)),
                          D !== za[at] && (st--, at--);
                      for (
                        ta(nt) && (nt = nt(wt)),
                          nt = Ns(nt, "start", wt),
                          l =
                            co(
                              nt,
                              J,
                              U,
                              ht,
                              Ct(),
                              c,
                              h,
                              wt,
                              V,
                              xt,
                              _t,
                              j,
                              ut,
                              wt._startClamp && "_startClamp",
                            ) || (K ? -0.001 : 0),
                          ta(Z) && (Z = Z(wt)),
                          Ks(Z) &&
                            !Z.indexOf("+=") &&
                            (~Z.indexOf(" ")
                              ? (Z = (Ks(nt) ? nt.split(" ")[0] : "") + Z)
                              : ((G = La(Z.substr(2), U)),
                                (Z = Ks(nt)
                                  ? nt
                                  : (ut
                                      ? Qi.utils.mapRange(
                                          0,
                                          ut.duration(),
                                          ut.scrollTrigger.start,
                                          ut.scrollTrigger.end,
                                          l,
                                        )
                                      : l) + G),
                                (rt = J))),
                          Z = Ns(Z, "end", wt),
                          u =
                            Math.max(
                              l,
                              co(
                                Z || (rt ? "100% 0" : j),
                                rt,
                                U,
                                ht,
                                Ct() + G,
                                f,
                                d,
                                wt,
                                V,
                                xt,
                                _t,
                                j,
                                ut,
                                wt._endClamp && "_endClamp",
                              ),
                            ) || -0.001,
                          G = 0,
                          at = st;
                        at--;

                      )
                        (L = (D = za[at]).pin) &&
                          D.start - D._pinPush <= l &&
                          !ut &&
                          D.end > 0 &&
                          ((T =
                            D.end -
                            (wt._startClamp ? Math.max(0, D.start) : D.start)),
                          ((L === J && D.start - D._pinPush < l) || L === it) &&
                            isNaN(nt) &&
                            (G += T * (1 - D.progress)),
                          L === K && ($ += T));
                      if (
                        ((l += G),
                        (u += G),
                        wt._startClamp && (wt._startClamp += G),
                        wt._endClamp &&
                          !Ps &&
                          ((wt._endClamp = u || -0.001),
                          (u = Math.min(u, Zs(pt, ht)))),
                        (g = u - l || ((l -= 0.01) && 0.001)),
                        W &&
                          (St = Qi.utils.clamp(
                            0,
                            1,
                            Qi.utils.normalize(l, u, F),
                          )),
                        (wt._pinPush = $),
                        c &&
                          G &&
                          (((T = {})[ht.a] = "+=" + G),
                          it && (T[ht.p] = "-=" + Ct()),
                          Qi.set([c, f], T)),
                        !K || (Ss && wt.end >= Zs(pt, ht)))
                      ) {
                        if (J && Ct() && !ut)
                          for (A = J.parentNode; A && A !== es; )
                            A._pinOffset &&
                              ((l -= A._pinOffset), (u -= A._pinOffset)),
                              (A = A.parentNode);
                      } else
                        (T = ba(K)),
                          (O = ht === qi),
                          (S = Ct()),
                          (E = parseFloat(w(ht.a)) + $),
                          !j &&
                            u > 1 &&
                            ((q = {
                              style: (q = (gt ? Ki.scrollingElement || ts : pt)
                                .style),
                              value: q["overflow" + ht.a.toUpperCase()],
                            }),
                            gt &&
                              "scroll" !==
                                ba(es)["overflow" + ht.a.toUpperCase()] &&
                              (q.style["overflow" + ht.a.toUpperCase()] =
                                "scroll")),
                          so(K, b, T),
                          (y = lo(K)),
                          (A = wa(K, !0)),
                          (I = _t && Hi(pt, O ? Yi : qi)()),
                          tt
                            ? (((M = [tt + ht.os2, g + $ + ya]).t = b),
                              (at = tt === ma ? Ta(K, ht) + g + $ : 0) &&
                                (M.push(ht.d, at + ya),
                                "auto" !== b.style.flexBasis &&
                                  (b.style.flexBasis = at + ya)),
                              oo(M),
                              it &&
                                za.forEach(function (t) {
                                  t.pin === it &&
                                    !1 !== t.vars.pinSpacing &&
                                    (t._subPinOffset = !0);
                                }),
                              _t && Ct(F))
                            : (at = Ta(K, ht)) &&
                              "auto" !== b.style.flexBasis &&
                              (b.style.flexBasis = at + ya),
                          _t &&
                            (((P = {
                              top: A.top + (O ? S - l : I) + ya,
                              left: A.left + (O ? I : S - l) + ya,
                              boxSizing: "border-box",
                              position: "fixed",
                            })[ua] = P["max" + _a] =
                              Math.ceil(A.width) + ya),
                            (P[ca] = P["max" + va] = Math.ceil(A.height) + ya),
                            (P[ga] =
                              P[ga + da] =
                              P[ga + fa] =
                              P[ga + pa] =
                              P[ga + ha] =
                                "0"),
                            (P[ma] = T[ma]),
                            (P[ma + da] = T[ma + da]),
                            (P[ma + fa] = T[ma + fa]),
                            (P[ma + pa] = T[ma + pa]),
                            (P[ma + ha] = T[ma + ha]),
                            (v = (function (t, e, r) {
                              for (
                                var n, i = [], s = t.length, a = r ? 8 : 0;
                                a < s;
                                a += 2
                              )
                                (n = t[a]), i.push(n, n in e ? e[n] : t[a + 1]);
                              return (i.t = t.t), i;
                            })(_, P, ot)),
                            Ps && Ct(0)),
                          r
                            ? ((z = r._initted),
                              gs(1),
                              r.render(r.duration(), !0, !0),
                              (k = w(ht.a) - E + g + $),
                              (C = Math.abs(g - k) > 1),
                              _t && C && v.splice(v.length - 2, 2),
                              r.render(0, !0, !0),
                              z || r.invalidate(!0),
                              r.parent || r.totalTime(r.totalTime()),
                              gs(0))
                            : (k = g),
                          q &&
                            (q.value
                              ? (q.style["overflow" + ht.a.toUpperCase()] =
                                  q.value)
                              : q.style.removeProperty("overflow-" + ht.a));
                      Y &&
                        Y.forEach(function (t) {
                          return t.revert(!1, !0);
                        }),
                        (wt.start = l),
                        (wt.end = u),
                        (a = o = Ps ? F : Ct()),
                        ut || Ps || (a < F && Ct(F), (wt.scroll.rec = 0)),
                        wt.revert(!1, !0),
                        (Mt = Is()),
                        B && ((At = -1), B.restart(!0)),
                        (ls = 0),
                        r &&
                          dt &&
                          (r._initted || N) &&
                          r.progress() !== N &&
                          r.progress(N || 0, !0).render(r.time(), !0, !0),
                        (W || St !== wt.progress || ut || et) &&
                          (r &&
                            !dt &&
                            r.totalProgress(
                              ut && l < -0.001 && !St
                                ? Qi.utils.normalize(l, u, 0)
                                : St,
                              !0,
                            ),
                          (wt.progress = W || (a - l) / g === St ? 0 : St)),
                        K && tt && (b._pinOffset = Math.round(wt.progress * k)),
                        R && R.invalidate(),
                        isNaN(X) ||
                          ((X -= Qi.getProperty(h, ht.p)),
                          (H -= Qi.getProperty(d, ht.p)),
                          mo(h, ht, X),
                          mo(c, ht, X - (x || 0)),
                          mo(d, ht, H),
                          mo(f, ht, H - (x || 0))),
                        W && !Ps && wt.update(),
                        !Q || Ps || m || ((m = !0), Q(wt), (m = !1));
                    }
                }),
                (wt.getVelocity = function () {
                  return ((Ct() - o) / (Is() - as)) * 1e3 || 0;
                }),
                (wt.endAnimation = function () {
                  na(wt.callbackAnimation),
                    r &&
                      (R
                        ? R.progress(1)
                        : r.paused()
                          ? dt || na(r, wt.direction < 0, 1)
                          : na(r, r.reversed()));
                }),
                (wt.labelToScroll = function (t) {
                  return (
                    (r &&
                      r.labels &&
                      (l || wt.refresh() || l) +
                        (r.labels[t] / r.duration()) * g) ||
                    0
                  );
                }),
                (wt.getTrailing = function (t) {
                  var e = za.indexOf(wt),
                    r =
                      wt.direction > 0
                        ? za.slice(0, e).reverse()
                        : za.slice(e + 1);
                  return (
                    Ks(t)
                      ? r.filter(function (e) {
                          return e.vars.preventOverlaps === t;
                        })
                      : r
                  ).filter(function (t) {
                    return wt.direction > 0 ? t.end <= l : t.start >= u;
                  });
                }),
                (wt.update = function (t, e, i) {
                  if (!ut || i || t) {
                    var s,
                      c,
                      f,
                      d,
                      p,
                      m,
                      _,
                      x = !0 === Ps ? F : wt.scroll(),
                      w = t ? 0 : (x - l) / g,
                      M = w < 0 ? 0 : w > 1 ? 1 : w || 0,
                      P = wt.progress;
                    if (
                      (e &&
                        ((o = a),
                        (a = ut ? Ct() : x),
                        at &&
                          ((L = D), (D = r && !dt ? r.totalProgress() : M))),
                      rt &&
                        K &&
                        !ls &&
                        !Rs &&
                        Bs &&
                        (!M && l < x + ((x - o) / (Is() - as)) * rt
                          ? (M = 1e-4)
                          : 1 === M &&
                            u > x + ((x - o) / (Is() - as)) * rt &&
                            (M = 0.9999)),
                      M !== P && wt.enabled)
                    ) {
                      if (
                        ((d =
                          (p =
                            (s = wt.isActive = !!M && M < 1) !==
                            (!!P && P < 1)) || !!M != !!P),
                        (wt.direction = M > P ? 1 : -1),
                        (wt.progress = M),
                        d &&
                          !ls &&
                          ((c = M && !P ? 0 : 1 === M ? 1 : 1 === P ? 2 : 3),
                          dt &&
                            ((f =
                              (!p && "none" !== yt[c + 1] && yt[c + 1]) ||
                              yt[c]),
                            (_ =
                              r &&
                              ("complete" === f || "reset" === f || f in r)))),
                        ft &&
                          (p || _) &&
                          (_ || Z || !r) &&
                          (ta(ft)
                            ? ft(wt)
                            : wt.getTrailing(ft).forEach(function (t) {
                                return t.endAnimation();
                              })),
                        dt ||
                          (!R || ls || Rs
                            ? r && r.totalProgress(M, !(!ls || (!Mt && !t)))
                            : (R._dp._time - R._start !== R._time &&
                                R.render(R._dp._time - R._start),
                              R.resetTo
                                ? R.resetTo(
                                    "totalProgress",
                                    M,
                                    r._tTime / r._tDur,
                                  )
                                : ((R.vars.totalProgress = M),
                                  R.invalidate().restart()))),
                        K)
                      )
                        if ((t && tt && (b.style[tt + ht.os2] = A), _t)) {
                          if (d) {
                            if (
                              ((m =
                                !t &&
                                M > P &&
                                u + 1 > x &&
                                x + 1 >= Zs(pt, ht)),
                              ot)
                            )
                              if (t || (!s && !m)) ho(K, b);
                              else {
                                var I = wa(K, !0),
                                  z = x - l;
                                ho(
                                  K,
                                  es,
                                  I.top + (ht === qi ? z : 0) + ya,
                                  I.left + (ht === qi ? 0 : z) + ya,
                                );
                              }
                            oo(s || m ? v : y),
                              (C && M < 1 && s) ||
                                T(E + (1 !== M || m ? 0 : k));
                          }
                        } else T(Vs(E + k * M));
                      at && !n.tween && !ls && !Rs && B.restart(!0),
                        W &&
                          (p || (st && M && (M < 1 || !Cs))) &&
                          is(W.targets).forEach(function (t) {
                            return t.classList[s || st ? "add" : "remove"](
                              W.className,
                            );
                          }),
                        j && !dt && !t && j(wt),
                        d && !ls
                          ? (dt &&
                              (_ &&
                                ("complete" === f
                                  ? r.pause().totalProgress(1)
                                  : "reset" === f
                                    ? r.restart(!0).pause()
                                    : "restart" === f
                                      ? r.restart(!0)
                                      : r[f]()),
                              j && j(wt)),
                            (!p && Cs) ||
                              ($ && p && ia(wt, $),
                              vt[c] && ia(wt, vt[c]),
                              st && (1 === M ? wt.kill(!1, 1) : (vt[c] = 0)),
                              p ||
                                (vt[(c = 1 === M ? 1 : 3)] && ia(wt, vt[c]))),
                            ct &&
                              !s &&
                              Math.abs(wt.getVelocity()) >
                                (ea(ct) ? ct : 2500) &&
                              (na(wt.callbackAnimation),
                              R
                                ? R.progress(1)
                                : na(r, "reverse" === f ? 1 : !M, 1)))
                          : dt && j && !ls && j(wt);
                    }
                    if (O) {
                      var N = ut
                        ? (x / ut.duration()) * (ut._caScrollDist || 0)
                        : x;
                      S(N + (h._isFlipped ? 1 : 0)), O(N);
                    }
                    Y && Y((-x / ut.duration()) * (ut._caScrollDist || 0));
                  }
                }),
                (wt.enable = function (e, r) {
                  wt.enabled ||
                    ((wt.enabled = !0),
                    Ma(pt, "resize", qa),
                    gt || Ma(pt, "scroll", Na),
                    Tt && Ma(t, "refreshInit", Tt),
                    !1 !== e && ((wt.progress = St = 0), (a = o = At = Ct())),
                    !1 !== r && wt.refresh());
                }),
                (wt.getTween = function (t) {
                  return t && n ? n.tween : R;
                }),
                (wt.setPositions = function (t, e, r, n) {
                  if (ut) {
                    var i = ut.scrollTrigger,
                      s = ut.duration(),
                      a = i.end - i.start;
                    (t = i.start + (a * t) / s), (e = i.start + (a * e) / s);
                  }
                  wt.refresh(
                    !1,
                    !1,
                    {
                      start: Ys(t, r && !!wt._startClamp),
                      end: Ys(e, r && !!wt._endClamp),
                    },
                    n,
                  ),
                    wt.update();
                }),
                (wt.adjustPinSpacing = function (t) {
                  if (M && t) {
                    var e = M.indexOf(ht.d) + 1;
                    (M[e] = parseFloat(M[e]) + t + ya),
                      (M[1] = parseFloat(M[1]) + t + ya),
                      oo(M);
                  }
                }),
                (wt.disable = function (e, r) {
                  if (
                    wt.enabled &&
                    (!1 !== e && wt.revert(!0, !0),
                    (wt.enabled = wt.isActive = !1),
                    r || (R && R.pause()),
                    (F = 0),
                    i && (i.uncache = 1),
                    Tt && Sa(t, "refreshInit", Tt),
                    B &&
                      (B.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                    !gt)
                  ) {
                    for (var s = za.length; s--; )
                      if (za[s].scroller === pt && za[s] !== wt) return;
                    Sa(pt, "resize", qa), gt || Sa(pt, "scroll", Na);
                  }
                }),
                (wt.kill = function (t, n) {
                  wt.disable(t, n), R && !n && R.kill(), G && delete Ba[G];
                  var s = za.indexOf(wt);
                  s >= 0 && za.splice(s, 1),
                    s === fs && eo > 0 && fs--,
                    (s = 0),
                    za.forEach(function (t) {
                      return t.scroller === wt.scroller && (s = 1);
                    }),
                    s || Ps || (wt.scroll.rec = 0),
                    r &&
                      ((r.scrollTrigger = null),
                      t && r.revert({ kill: !1 }),
                      n || r.kill()),
                    c &&
                      [c, f, h, d].forEach(function (t) {
                        return t.parentNode && t.parentNode.removeChild(t);
                      }),
                    Ls === wt && (Ls = 0),
                    K &&
                      (i && (i.uncache = 1),
                      (s = 0),
                      za.forEach(function (t) {
                        return t.pin === K && s++;
                      }),
                      s || (i.spacer = 0)),
                    e.onKill && e.onKill(wt);
                }),
                za.push(wt),
                wt.enable(!1, !1),
                q && q(wt),
                r && r.add && !g)
              ) {
                var Lt = wt.update;
                (wt.update = function () {
                  (wt.update = Lt), l || u || wt.refresh();
                }),
                  Qi.delayedCall(0.01, wt.update),
                  (g = 0.01),
                  (l = u = 0);
              } else wt.refresh();
              K &&
                (function () {
                  if (Ds !== Qa) {
                    var t = (Ds = Qa);
                    requestAnimationFrame(function () {
                      return t === Qa && Ka(!0);
                    });
                  }
                })();
            } else this.update = this.refresh = this.kill = Us;
          }),
          (t.register = function (e) {
            return (
              Zi ||
                ((Qi = e || Ws()),
                js() && window.document && t.enable(),
                (Zi = Fs)),
              Zi
            );
          }),
          (t.defaults = function (t) {
            if (t) for (var e in t) Pa[e] = t[e];
            return Pa;
          }),
          (t.disable = function (t, e) {
            (Fs = 0),
              za.forEach(function (r) {
                return r[e ? "kill" : "disable"](t);
              }),
              Sa(Ji, "wheel", Na),
              Sa(Ki, "scroll", Na),
              clearInterval(os),
              Sa(Ki, "touchcancel", Us),
              Sa(es, "touchstart", Us),
              Aa(Sa, Ki, "pointerdown,touchstart,mousedown", Xs),
              Aa(Sa, Ki, "pointerup,touchend,mouseup", Hs),
              ns.kill(),
              Js(Sa);
            for (var r = 0; r < Si.length; r += 3)
              Ca(Sa, Si[r], Si[r + 1]), Ca(Sa, Si[r], Si[r + 2]);
          }),
          (t.enable = function () {
            if (
              ((Ji = window),
              (Ki = document),
              (ts = Ki.documentElement),
              (es = Ki.body),
              Qi &&
                ((is = Qi.utils.toArray),
                (ss = Qi.utils.clamp),
                (Ts = Qi.core.context || Us),
                (gs = Qi.core.suppressOverwrites || Us),
                (Es = Ji.history.scrollRestoration || "auto"),
                (to = Ji.pageYOffset),
                Qi.core.globals("ScrollTrigger", t),
                es))
            ) {
              (Fs = 1),
                ((ks = document.createElement("div")).style.height = "100vh"),
                (ks.style.position = "absolute"),
                Za(),
                qs(),
                $i.register(Qi),
                (t.isTouch = $i.isTouch),
                (ws =
                  $i.isTouch &&
                  /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                (ys = 1 === $i.isTouch),
                Ma(Ji, "wheel", Na),
                (rs = [Ji, Ki, ts, es]),
                Qi.matchMedia
                  ? ((t.matchMedia = function (t) {
                      var e,
                        r = Qi.matchMedia();
                      for (e in t) r.add(e, t[e]);
                      return r;
                    }),
                    Qi.addEventListener("matchMediaInit", function () {
                      return Ga();
                    }),
                    Qi.addEventListener("matchMediaRevert", function () {
                      return Wa();
                    }),
                    Qi.addEventListener("matchMedia", function () {
                      Ka(0, 1), Va("matchMedia");
                    }),
                    Qi.matchMedia("(orientation: portrait)", function () {
                      return Ya(), Ya;
                    }))
                  : console.warn("Requires GSAP 3.11.0 or later"),
                Ya(),
                Ma(Ki, "scroll", Na);
              var e,
                r,
                n = es.style,
                i = n.borderTopStyle,
                s = Qi.core.Animation.prototype;
              for (
                s.revert ||
                  Object.defineProperty(s, "revert", {
                    value: function () {
                      return this.time(-0.01, !0);
                    },
                  }),
                  n.borderTopStyle = "solid",
                  e = wa(es),
                  qi.m = Math.round(e.top + qi.sc()) || 0,
                  Yi.m = Math.round(e.left + Yi.sc()) || 0,
                  i
                    ? (n.borderTopStyle = i)
                    : n.removeProperty("border-top-style"),
                  os = setInterval(Fa, 250),
                  Qi.delayedCall(0.5, function () {
                    return (Rs = 0);
                  }),
                  Ma(Ki, "touchcancel", Us),
                  Ma(es, "touchstart", Us),
                  Aa(Ma, Ki, "pointerdown,touchstart,mousedown", Xs),
                  Aa(Ma, Ki, "pointerup,touchend,mouseup", Hs),
                  cs = Qi.utils.checkPrefix("transform"),
                  io.push(cs),
                  Zi = Is(),
                  ns = Qi.delayedCall(0.2, Ka).pause(),
                  ps = [
                    Ki,
                    "visibilitychange",
                    function () {
                      var t = Ji.innerWidth,
                        e = Ji.innerHeight;
                      Ki.hidden
                        ? ((hs = t), (ds = e))
                        : (hs === t && ds === e) || qa();
                    },
                    Ki,
                    "DOMContentLoaded",
                    Ka,
                    Ji,
                    "load",
                    Ka,
                    Ji,
                    "resize",
                    qa,
                  ],
                  Js(Ma),
                  za.forEach(function (t) {
                    return t.enable(0, 1);
                  }),
                  r = 0;
                r < Si.length;
                r += 3
              )
                Ca(Sa, Si[r], Si[r + 1]), Ca(Sa, Si[r], Si[r + 2]);
            }
          }),
          (t.config = function (e) {
            "limitCallbacks" in e && (Cs = !!e.limitCallbacks);
            var r = e.syncInterval;
            (r && clearInterval(os)) || ((os = r) && setInterval(Fa, r)),
              "ignoreMobileResize" in e &&
                (ys = 1 === t.isTouch && e.ignoreMobileResize),
              "autoRefreshEvents" in e &&
                (Js(Sa) || Js(Ma, e.autoRefreshEvents || "none"),
                (_s = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
          }),
          (t.scrollerProxy = function (t, e) {
            var r = Xi(t),
              n = Si.indexOf(r),
              i = Gs(r);
            ~n && Si.splice(n, i ? 6 : 2),
              e && (i ? Ci.unshift(Ji, e, es, e, ts, e) : Ci.unshift(r, e));
          }),
          (t.clearMatchMedia = function (t) {
            za.forEach(function (e) {
              return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0);
            });
          }),
          (t.isInViewport = function (t, e, r) {
            var n = (Ks(t) ? Xi(t) : t).getBoundingClientRect(),
              i = n[r ? ua : ca] * e || 0;
            return r
              ? n.right - i > 0 && n.left + i < Ji.innerWidth
              : n.bottom - i > 0 && n.top + i < Ji.innerHeight;
          }),
          (t.positionInViewport = function (t, e, r) {
            Ks(t) && (t = Xi(t));
            var n = t.getBoundingClientRect(),
              i = n[r ? ua : ca],
              s =
                null == e
                  ? i / 2
                  : e in Da
                    ? Da[e] * i
                    : ~e.indexOf("%")
                      ? (parseFloat(e) * i) / 100
                      : parseFloat(e) || 0;
            return r
              ? (n.left + s) / Ji.innerWidth
              : (n.top + s) / Ji.innerHeight;
          }),
          (t.killAll = function (t) {
            if (
              (za.slice(0).forEach(function (t) {
                return "ScrollSmoother" !== t.vars.id && t.kill();
              }),
              !0 !== t)
            ) {
              var e = Xa.killAll || [];
              (Xa = {}),
                e.forEach(function (t) {
                  return t();
                });
            }
          }),
          t
        );
      })();
    (_o.version = "3.12.5"),
      (_o.saveStyles = function (t) {
        return t
          ? is(t).forEach(function (t) {
              if (t && t.style) {
                var e = ja.indexOf(t);
                e >= 0 && ja.splice(e, 5),
                  ja.push(
                    t,
                    t.style.cssText,
                    t.getBBox && t.getAttribute("transform"),
                    Qi.core.getCache(t),
                    Ts(),
                  );
              }
            })
          : ja;
      }),
      (_o.revert = function (t, e) {
        return Ga(!t, e);
      }),
      (_o.create = function (t, e) {
        return new _o(t, e);
      }),
      (_o.refresh = function (t) {
        return t ? qa() : (Zi || _o.register()) && Ka(!0);
      }),
      (_o.update = function (t) {
        return ++Si.cache && ro(!0 === t ? 2 : 0);
      }),
      (_o.clearScrollMemory = $a),
      (_o.maxScroll = function (t, e) {
        return Zs(t, e ? Yi : qi);
      }),
      (_o.getScrollFunc = function (t, e) {
        return Hi(Xi(t), e ? Yi : qi);
      }),
      (_o.getById = function (t) {
        return Ba[t];
      }),
      (_o.getAll = function () {
        return za.filter(function (t) {
          return "ScrollSmoother" !== t.vars.id;
        });
      }),
      (_o.isScrolling = function () {
        return !!Bs;
      }),
      (_o.snapDirectional = ka),
      (_o.addEventListener = function (t, e) {
        var r = Xa[t] || (Xa[t] = []);
        ~r.indexOf(e) || r.push(e);
      }),
      (_o.removeEventListener = function (t, e) {
        var r = Xa[t],
          n = r && r.indexOf(e);
        n >= 0 && r.splice(n, 1);
      }),
      (_o.batch = function (t, e) {
        var r,
          n = [],
          i = {},
          s = e.interval || 0.016,
          a = e.batchMax || 1e9,
          o = function (t, e) {
            var r = [],
              n = [],
              i = Qi.delayedCall(s, function () {
                e(r, n), (r = []), (n = []);
              }).pause();
            return function (t) {
              r.length || i.restart(!0),
                r.push(t.trigger),
                n.push(t),
                a <= r.length && i.progress(1);
            };
          };
        for (r in e)
          i[r] =
            "on" === r.substr(0, 2) && ta(e[r]) && "onRefreshInit" !== r
              ? o(0, e[r])
              : e[r];
        return (
          ta(a) &&
            ((a = a()),
            Ma(_o, "refresh", function () {
              return (a = e.batchMax());
            })),
          is(t).forEach(function (t) {
            var e = {};
            for (r in i) e[r] = i[r];
            (e.trigger = t), n.push(_o.create(e));
          }),
          n
        );
      });
    var vo,
      yo = function (t, e, r, n) {
        return (
          e > n ? t(n) : e < 0 && t(0),
          r > n ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
        );
      },
      bo = function t(e, r) {
        !0 === r
          ? e.style.removeProperty("touch-action")
          : (e.style.touchAction =
              !0 === r
                ? "auto"
                : r
                  ? "pan-" + r + ($i.isTouch ? " pinch-zoom" : "")
                  : "none"),
          e === ts && t(es, r);
      },
      xo = { auto: 1, scroll: 1 },
      wo = function (t) {
        var e,
          r = t.event,
          n = t.target,
          i = t.axis,
          s = (r.changedTouches ? r.changedTouches[0] : r).target,
          a = s._gsap || Qi.core.getCache(s),
          o = Is();
        if (!a._isScrollT || o - a._isScrollT > 2e3) {
          for (
            ;
            s &&
            s !== es &&
            ((s.scrollHeight <= s.clientHeight &&
              s.scrollWidth <= s.clientWidth) ||
              (!xo[(e = ba(s)).overflowY] && !xo[e.overflowX]));

          )
            s = s.parentNode;
          (a._isScroll =
            s &&
            s !== n &&
            !Gs(s) &&
            (xo[(e = ba(s)).overflowY] || xo[e.overflowX])),
            (a._isScrollT = o);
        }
        (a._isScroll || "x" === i) &&
          (r.stopPropagation(), (r._gsapAllow = !0));
      },
      To = function (t, e, r, n) {
        return $i.create({
          target: t,
          capture: !0,
          debounce: !1,
          lockAxis: !0,
          type: e,
          onWheel: (n = n && wo),
          onPress: n,
          onDrag: n,
          onScroll: n,
          onEnable: function () {
            return r && Ma(Ki, $i.eventTypes[0], ko, !1, !0);
          },
          onDisable: function () {
            return Sa(Ki, $i.eventTypes[0], ko, !0);
          },
        });
      },
      Eo = /(input|label|select|textarea)/i,
      ko = function (t) {
        var e = Eo.test(t.target.tagName);
        (e || vo) && ((t._gsapAllow = !0), (vo = e));
      },
      Ao = function (t) {
        ra(t) || (t = {}),
          (t.preventDefault = t.isNormalizer = t.allowClicks = !0),
          t.type || (t.type = "wheel,touch"),
          (t.debounce = !!t.debounce),
          (t.id = t.id || "normalizer");
        var e,
          r,
          n,
          i,
          s,
          a,
          o,
          l,
          u = t,
          c = u.normalizeScrollX,
          f = u.momentum,
          h = u.allowNestedScroll,
          d = u.onRelease,
          p = Xi(t.target) || ts,
          m = Qi.core.globals().ScrollSmoother,
          g = m && m.get(),
          _ =
            ws &&
            ((t.content && Xi(t.content)) ||
              (g && !1 !== t.content && !g.smooth() && g.content())),
          v = Hi(p, qi),
          y = Hi(p, Yi),
          b = 1,
          x =
            ($i.isTouch && Ji.visualViewport
              ? Ji.visualViewport.scale * Ji.visualViewport.width
              : Ji.outerWidth) / Ji.innerWidth,
          w = 0,
          T = ta(f)
            ? function () {
                return f(e);
              }
            : function () {
                return f || 2.8;
              },
          E = To(p, t.type, !0, h),
          k = function () {
            return (i = !1);
          },
          A = Us,
          M = Us,
          S = function () {
            (r = Zs(p, qi)),
              (M = ss(ws ? 1 : 0, r)),
              c && (A = ss(0, Zs(p, Yi))),
              (n = Qa);
          },
          C = function () {
            (_._gsap.y = Vs(parseFloat(_._gsap.y) + v.offset) + "px"),
              (_.style.transform =
                "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                parseFloat(_._gsap.y) +
                ", 0, 1)"),
              (v.offset = v.cacheID = 0);
          },
          O = function () {
            S(),
              s.isActive() &&
                s.vars.scrollY > r &&
                (v() > r ? s.progress(1) && v(r) : s.resetTo("scrollY", r));
          };
        return (
          _ && Qi.set(_, { y: "+=0" }),
          (t.ignoreCheck = function (t) {
            return (
              (ws &&
                "touchmove" === t.type &&
                (function () {
                  if (i) {
                    requestAnimationFrame(k);
                    var t = Vs(e.deltaY / 2),
                      r = M(v.v - t);
                    if (_ && r !== v.v + v.offset) {
                      v.offset = r - v.v;
                      var n = Vs((parseFloat(_ && _._gsap.y) || 0) - v.offset);
                      (_.style.transform =
                        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                        n +
                        ", 0, 1)"),
                        (_._gsap.y = n + "px"),
                        (v.cacheID = Si.cache),
                        ro();
                    }
                    return !0;
                  }
                  v.offset && C(), (i = !0);
                })()) ||
              (b > 1.05 && "touchstart" !== t.type) ||
              e.isGesturing ||
              (t.touches && t.touches.length > 1)
            );
          }),
          (t.onPress = function () {
            i = !1;
            var t = b;
            (b = Vs(((Ji.visualViewport && Ji.visualViewport.scale) || 1) / x)),
              s.pause(),
              t !== b && bo(p, b > 1.01 || (!c && "x")),
              (a = y()),
              (o = v()),
              S(),
              (n = Qa);
          }),
          (t.onRelease = t.onGestureStart =
            function (t, e) {
              if ((v.offset && C(), e)) {
                Si.cache++;
                var n,
                  i,
                  a = T();
                c &&
                  ((i = (n = y()) + (0.05 * a * -t.velocityX) / 0.227),
                  (a *= yo(y, n, i, Zs(p, Yi))),
                  (s.vars.scrollX = A(i))),
                  (i = (n = v()) + (0.05 * a * -t.velocityY) / 0.227),
                  (a *= yo(v, n, i, Zs(p, qi))),
                  (s.vars.scrollY = M(i)),
                  s.invalidate().duration(a).play(0.01),
                  ((ws && s.vars.scrollY >= r) || n >= r - 1) &&
                    Qi.to({}, { onUpdate: O, duration: a });
              } else l.restart(!0);
              d && d(t);
            }),
          (t.onWheel = function () {
            s._ts && s.pause(), Is() - w > 1e3 && ((n = 0), (w = Is()));
          }),
          (t.onChange = function (t, e, r, i, s) {
            if (
              (Qa !== n && S(),
              e &&
                c &&
                y(A(i[2] === e ? a + (t.startX - t.x) : y() + e - i[1])),
              r)
            ) {
              v.offset && C();
              var l = s[2] === r,
                u = l ? o + t.startY - t.y : v() + r - s[1],
                f = M(u);
              l && u !== f && (o += f - u), v(f);
            }
            (r || e) && ro();
          }),
          (t.onEnable = function () {
            bo(p, !c && "x"),
              _o.addEventListener("refresh", O),
              Ma(Ji, "resize", O),
              v.smooth &&
                ((v.target.style.scrollBehavior = "auto"),
                (v.smooth = y.smooth = !1)),
              E.enable();
          }),
          (t.onDisable = function () {
            bo(p, !0),
              Sa(Ji, "resize", O),
              _o.removeEventListener("refresh", O),
              E.kill();
          }),
          (t.lockAxis = !1 !== t.lockAxis),
          ((e = new $i(t)).iOS = ws),
          ws && !v() && v(1),
          ws && Qi.ticker.add(Us),
          (l = e._dc),
          (s = Qi.to(e, {
            ease: "power4",
            paused: !0,
            inherit: !1,
            scrollX: c ? "+=0.1" : "+=0",
            scrollY: "+=0.1",
            modifiers: {
              scrollY: po(v, v(), function () {
                return s.pause();
              }),
            },
            onUpdate: ro,
            onComplete: l.vars.onComplete,
          })),
          e
        );
      };
    (_o.sort = function (t) {
      return za.sort(
        t ||
          function (t, e) {
            return (
              -1e6 * (t.vars.refreshPriority || 0) +
              t.start -
              (e.start + -1e6 * (e.vars.refreshPriority || 0))
            );
          },
      );
    }),
      (_o.observe = function (t) {
        return new $i(t);
      }),
      (_o.normalizeScroll = function (t) {
        if (void 0 === t) return vs;
        if (!0 === t && vs) return vs.enable();
        if (!1 === t) return vs && vs.kill(), void (vs = t);
        var e = t instanceof $i ? t : Ao(t);
        return (
          vs && vs.target === e.target && vs.kill(), Gs(e.target) && (vs = e), e
        );
      }),
      (_o.core = {
        _getVelocityProp: Ui,
        _inputObserver: To,
        _scrollers: Si,
        _proxies: Ci,
        bridge: {
          ss: function () {
            Bs || Va("scrollStart"), (Bs = Is());
          },
          ref: function () {
            return ls;
          },
        },
      }),
      Ws() && Qi.registerPlugin(_o),
      ai.registerPlugin(_o);
    ai
      .timeline()
      .fromTo(".header__info", { scale: 0 }, { scale: 1, duration: 1.6 })
      .fromTo(".header__logo", { y: -300 }, { y: 0 }, 1)
      .fromTo(".header__btn-scroll", { y: 600 }, { y: 0 }, 1.2),
      ai.to(".header__info", {
        scrollTrigger: { trigger: ".header", start: "top top", scrub: !0 },
        xPercent: 100,
      });
    let Mo = window.matchMedia("(min-width: 767.98px)");
    function So(t) {
      t.matches &&
        (ai.from(".menu-page__logo", {
          scrollTrigger: { trigger: ".header", start: "40% center", scrub: !0 },
          x: -500,
        }),
        ai.from(".menu__list li", {
          scrollTrigger: { trigger: ".header", start: "40% center", scrub: !0 },
          opacity: 0,
          stagger: 0.3,
          duration: 1,
        }));
    }
    Mo.addEventListener("change", So),
      So(Mo),
      (window.FLS = !0),
      (function (t) {
        let e = new Image();
        (e.onload = e.onerror =
          function () {
            t(2 == e.height);
          }),
          (e.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (t) {
        let e = !0 === t ? "webp" : "no-webp";
        document.documentElement.classList.add(e);
      }),
      (function () {
        if (document.querySelectorAll("[data-fullscreen]").length && e.any()) {
          function t() {
            let t = 0.01 * window.innerHeight;
            document.documentElement.style.setProperty("--vh", `${t}px`);
          }
          window.addEventListener("resize", t), t();
        }
      })(),
      (function () {
        const t = document.querySelectorAll("[data-spollers]");
        if (t.length > 0) {
          const e = Array.from(t).filter(function (t, e, r) {
            return !t.dataset.spollers.split(",")[0];
          });
          e.length && s(e);
          let r = l(t, "spollers");
          function s(t, e = !1) {
            t.forEach((t) => {
              (t = e ? t.item : t),
                e.matches || !e
                  ? (t.classList.add("_spoller-init"),
                    a(t),
                    t.addEventListener("click", o))
                  : (t.classList.remove("_spoller-init"),
                    a(t, !1),
                    t.removeEventListener("click", o));
            });
          }
          function a(t, e = !0) {
            const r = t.querySelectorAll("[data-spoller]");
            r.length > 0 &&
              r.forEach((t) => {
                e
                  ? (t.removeAttribute("tabindex"),
                    t.classList.contains("_spoller-active") ||
                      (t.nextElementSibling.hidden = !0))
                  : (t.setAttribute("tabindex", "-1"),
                    (t.nextElementSibling.hidden = !1));
              });
          }
          function o(t) {
            const e = t.target;
            if (e.closest("[data-spoller]")) {
              const r = e.closest("[data-spoller]"),
                s = r.closest("[data-spollers]"),
                a = !!s.hasAttribute("data-one-spoller");
              s.querySelectorAll("._slide").length ||
                (a && !r.classList.contains("_spoller-active") && u(s),
                r.classList.toggle("_spoller-active"),
                ((t, e = 500) => {
                  t.hidden ? i(t, e) : n(t, e);
                })(r.nextElementSibling, 500)),
                t.preventDefault();
            }
          }
          function u(t) {
            const e = t.querySelector("[data-spoller]._spoller-active");
            e &&
              (e.classList.remove("_spoller-active"),
              n(e.nextElementSibling, 500));
          }
          r &&
            r.length &&
            r.forEach((t) => {
              t.matchMedia.addEventListener("change", function () {
                s(t.itemsArray, t.matchMedia);
              }),
                s(t.itemsArray, t.matchMedia);
            });
        }
      })(),
      (function () {
        const t = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]",
        );
        t.length &&
          t.forEach((t) => {
            t.dataset.placeholder = t.placeholder;
          }),
          document.body.addEventListener("focusin", function (t) {
            const e = t.target;
            ("INPUT" !== e.tagName && "TEXTAREA" !== e.tagName) ||
              (e.dataset.placeholder && (e.placeholder = ""),
              e.classList.add("_form-focus"),
              e.parentElement.classList.add("_form-focus"),
              f.removeError(e));
          }),
          document.body.addEventListener("focusout", function (t) {
            const e = t.target;
            ("INPUT" !== e.tagName && "TEXTAREA" !== e.tagName) ||
              (e.dataset.placeholder && (e.placeholder = e.dataset.placeholder),
              e.classList.remove("_form-focus"),
              e.parentElement.classList.remove("_form-focus"),
              e.hasAttribute("data-validate") && f.validateInput(e));
          });
      })(),
      (function (t) {
        const e = document.forms;
        if (e.length)
          for (const t of e)
            t.addEventListener("submit", function (t) {
              r(t.target, t);
            }),
              t.addEventListener("reset", function (t) {
                const e = t.target;
                f.formClean(e);
              });
        async function r(e, r) {
          if (0 === (t ? f.getErrors(e) : 0)) {
            if (e.hasAttribute("data-ajax")) {
              r.preventDefault();
              const t = e.getAttribute("action")
                  ? e.getAttribute("action").trim()
                  : "#",
                i = e.getAttribute("method")
                  ? e.getAttribute("method").trim()
                  : "GET",
                s = new FormData(e);
              e.classList.add("_sending");
              const a = await fetch(t, { method: i, body: s });
              if (a.ok) {
                await a.json();
                e.classList.remove("_sending"), n(e);
              } else alert("Ошибка"), e.classList.remove("_sending");
            } else e.hasAttribute("data-dev") && (r.preventDefault(), n(e));
          } else {
            r.preventDefault();
            const t = e.querySelector("._form-error");
            t && e.hasAttribute("data-goto-error") && u(t, !0, 1e3);
          }
        }
        function n(t) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: t } }),
          ),
            f.formClean(t),
            o(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0),
      (function () {
        function t(t) {
          if ("click" === t.type) {
            const e = t.target;
            if (e.closest("[data-goto]")) {
              const r = e.closest("[data-goto]"),
                n = r.dataset.goto ? r.dataset.goto : "",
                i = !!r.hasAttribute("data-goto-header"),
                s = r.dataset.gotoSpeed ? r.dataset.gotoSpeed : "500";
              u(n, i, s), t.preventDefault();
            }
          } else if ("watcherCallback" === t.type && t.detail) {
            const e = t.detail.entry,
              r = e.target;
            if ("navigator" === r.dataset.watch) {
              const t = r.id,
                n =
                  (document.querySelector("[data-goto]._navigator-active"),
                  document.querySelector(`[data-goto="#${t}"]`));
              e.isIntersecting
                ? n && n.classList.add("_navigator-active")
                : n && n.classList.remove("_navigator-active");
            }
          }
        }
        document.addEventListener("click", t),
          document.addEventListener("watcherCallback", t);
      })();
  })();
})();
