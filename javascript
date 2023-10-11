"use strict";
!function(w, d) {
    w.Navegg = w.Navegg || function(t) {
        w.Navegg.q.push([this, t])
    }
    ,
    w.Navegg.q = w.Navegg.q || [];
    var nvg = w.Navegg.prototype;
    nvg.say = function(t, e) {
        switch (t) {
        case "i":
            console.info(e);
            break;
        case "w":
            console.warn(e);
            break;
        case "e":
            console.error(e)
        }
    }
    ,
    nvg.getServerDomain = function(t) {
        return "https://" + t + ".navdmp.com"
    }
    ,
    nvg.merge = function(e, i) {
        let n = {};
        return Object.keys(e).forEach(t=>{
            i.hasOwnProperty(t) && (n[t] = e[t] + i[t])
        }
        ),
        n
    }
    ,
    nvg.__cleanConfigCache = function() {
        this.say("w", "nvg" + this.acc + "config cache cleaned"),
        w.localStorage.removeItem("nvgcnfg" + this.acc)
    }
    ,
    nvg.include = function(t, e, i, n, a) {
        "" !== n && void 0 !== n || (n = !0);
        var s = d.createElement(e = "" == e || null == e ? "script" : e)
          , i = ("script" == e && (s.type = "text/javascript"),
        (i = !t && i ? "try{" + i + "}catch(e){console.error(e);nvg" + this.acc + ".__cleanConfigCache();}" : i) ? s.text = i : (s.src = t,
        "img" == e && (s.style.display = "none")),
        a && (s.onerror = a.bind(this)),
        s.async = n,
        d.getElementsByTagName("script")[0]);
        i.parentNode.insertBefore(s, i)
    }
    ,
    nvg.getTLD = function() {
        var t, e, i = "", n = "nvgTLD" + this.account, a = new Date, s = a.getTime(), r = w.localStorage.getItem("nvgTLD");
        if (r)
            return r;
        for (e = (t = w.location.hostname.split(".")).length - 1; 0 < e; e--)
            if (i = "." + t[e] + i,
            a.setTime(a.getTime() + 5e3),
            document.cookie = n + "=" + s + ";expires=" + a.toGMTString() + ";domain=" + i,
            this.getCookie(n) == s)
                return w.localStorage.setItem("nvgTLD", i),
                a = new Date,
                document.cookie = n + "=" + s + ";expires=" + a.toGMTString() + ";domain=" + i,
                i;
        return "." + w.location.hostname
    }
    ,
    nvg.setCustom = function(t) {
        var e = {};
        e.acc = this.acc,
        this.usr && (e.id = this.usr),
        e.cus = t,
        this.include(this.getServerDomain("cdn") + "/cus?" + this.serializeParams(e)),
        this.__setCustomFp(t)
    }
    ,
    nvg.setCustomTargeting = function(t, e) {
        for (var i, n, a, s = 0; s < t.length; s++) {
            for (n = t[s],
            a = !1,
            i = 0; i < n.length; i++)
                0 <= window.location.href.search(n[i]) && (a = !0);
            if (!a)
                return !1
        }
        return this.setCustom(e),
        !0
    }
    ,
    nvg.getParameter = function(t) {
        if (!this.qry) {
            this.qry = {};
            for (var e = w.location.search.substr(1).split("&"), i = 0; i < e.length; i++) {
                var n = e[i].split("=");
                this.qry[n[0]] = n[1]
            }
        }
        return this.qry[t] || ""
    }
    ,
    nvg.getCookie = function(t) {
        var e = d.cookie.indexOf(t + "=")
          , i = e + t.length + 1;
        if (!e && t != d.cookie.substring(0, t.length))
            return "";
        if (-1 == e)
            return "";
        t = d.cookie.indexOf(";", i);
        return -1 == t && (t = d.cookie.length),
        unescape(d.cookie.substring(i, t))
    }
    ,
    nvg.setCookie = function(t, e, i) {
        var n = ""
          , a = (this.dom && (n = ";domain=" + this.dom),
        new Date)
          , i = (i == i && i || (i = 525600),
        a.setTime(a.getTime() + 60 * i * 1e3),
        a.toGMTString());
        d.cookie = t + "=" + e + ";expires=" + i + ";path=/" + n
    }
    ,
    nvg.__loadCustomFp = function() {
        var t, e = "nvgcus" + this.acc;
        if (i = w.localStorage.getItem(e)) {
            var i = i.split("-")
              , n = this.getSegment("custom");
            for ("" == (n = n.split("-"))[0] && (n = Array()),
            t = 0; t < i.length; t++)
                -1 == n.indexOf(i[t]) && n.push(i[t]);
            this.persona.custom = n.join("-")
        }
    }
    ,
    nvg.__setCustomFp = function(t) {
        var e = "nvgcus" + this.acc
          , i = (i = window.localStorage.getItem(e)) ? (-1 == (i = i.split("-")).indexOf(t.toString()) && i.push(t.toString()),
        i.join("-")) : t;
        window.localStorage.setItem(e, i),
        -1 == (e = this.persona.custom ? this.persona.custom.split("-") : []).indexOf(t.toString()) && e.push(t.toString()),
        this.persona.custom = e.join("-")
    }
    ,
    nvg.loadProfile = function() {
        var t = w.localStorage.getItem(this.ckn)
          , e = w.localStorage.getItem("nvgpersona" + this.account);
        return (t = t || this.getCookie(this.ckn)) && e ? (0 <= (t = (e = t.split("_"))[0]).search(/\|/) && (t = t.split("|"),
        this.syn = t[1],
        t = t[0]),
        this.usr = t,
        this.ctrl = e[1],
        e[2] && this.parsePersona(e[2]),
        this.ctrl != this.datestr() || this.debug ? this.callUsr() : void 0) : this.callUsr()
    }
    ,
    nvg.callCallbacks = function() {
        function i(t) {
            if ("function" == typeof t)
                try {
                    t()
                } catch (t) {}
        }
        function t(t) {
            if (void 0 !== t && t.length)
                for (var e = 0; e < t.length; e++)
                    i(t[e])
        }
        t.prototype.push = function(t) {
            i(t)
        }
        ,
        w.naveggReady = new t(w.naveggReady)
    }
    ,
    nvg.parsePersona = async function(t) {
        for (var e, i = t.split(":"), n = 0; n <= this.seg.length; n++)
            1 == (e = "string" == typeof (e = i[n] || "") ? e.split("-") : e).length ? "" != e[0] && void 0 !== this.seg[n] && (this.persona[this.seg[n]] = e[0]) : this.persona[this.seg[n]] = e;
        try {
            this.persona.cluster && !this.persona.everyone && (this.persona.everyone = this.persona.cluster),
            this.persona.industry && !this.persona.everybuyer && (this.persona.everybuyer = this.persona.industry)
        } catch (t) {}
        if (this.nvgIDOnPersona(),
        this.seg.forEach(t=>{
            t.startsWith("nvi") && this.persona[t] && (this.persona[t.slice(3)] = this.persona[t],
            delete this.persona[t])
        }
        ),
        this.wop)
            try {
                await this.OnePageViewInsight()
            } catch (t) {}
        w.localStorage.setItem("nvgpersona" + this.account, JSON.stringify(this.persona))
    }
    ,
    nvg.doSync = function(t) {
        var e = this.getCookie(this.ckn) || "";
        0 <= (e = e.split("_"))[0].search(/\|/) && (e[0] = e[0].split("|"),
        e[0] = e[0][0]),
        e[0] += "|" + t,
        e = e.join("_"),
        this.setCookie(this.ckn, e)
    }
    ,
    nvg.datestr = function() {
        var t = new Date
          , e = new Date(t.getFullYear(),0,0);
        return Math.ceil((t - e) / 864e5).toString()
    }
    ,
    nvg.serializeParams = function(t) {
        var e, i = [];
        for (e in t)
            i.push(e + "=" + encodeURIComponent(t[e]));
        return i.join("&")
    }
    ,
    nvg.profile = function(t, e) {
        var i = !1;
        this.usr || (i = !0),
        t && (this.usr = t),
        d.cookie = this.ckn + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",
        this.setCookie(this.ckn, [this.usr + "|" + this.syn, this.datestr()].join("_")),
        w.localStorage.setItem(this.ckn, [this.usr + "|" + this.syn, this.datestr(), e].join("_")),
        this.parsePersona(e),
        i && this.saveRequest(this.usr),
        this.__loadCustomFp()
    }
    ,
    nvg.callUsr = function() {
        var t = {};
        t.v = this.version,
        t.acc = this.acc,
        t.u = 1,
        this.usr ? (t.id = this.usr,
        this.syn || (t.jds = 1)) : t.new = this.isnew = 1,
        this.wst || (t.wst = 0),
        this.wct && (t.wct = 1),
        this.wla && (t.wla = 1),
        this.abt && (t.wat = 1),
        this.dsy || (t.dsy = 0),
        this.debug && (t.rdn = parseInt(1e8 * Math.random())),
        this.include(this.getServerDomain("usr") + "/usr?" + this.serializeParams(t), void 0, void 0, void 0, this.usrError)
    }
    ,
    nvg.OnePageViewInsight = async function() {
        try {
            var e = encodeURI("&url=" + window.location.href)
              , i = this.getServerDomain("opi") + "/watson?" + e;
            const n = await fetch(i);
            this.uqt = this.uqt || 5;
            try {
                this.onePageData = await n.json()
            } catch (t) {
                this.onePageData = {}
            }
            for (const s in this.onePageData)
                this.onePageData[s] = Array.isArray(this.onePageData[s]) ? this.onePageData[s].map(t=>t.toString()) : this.onePageData[s],
                this.onePageData.hasOwnProperty(s.slice(4)) ? this.onePageData[s.slice(4)] = this.onePageData[s.slice(4)].concat(this.onePageData[s]) : this.onePageData[s.slice(4)] = this.onePageData[s],
                delete this.onePageData[s];
            const a = JSON.parse(window.localStorage.getItem("nvgopi" + this.acc));
            let t = [];
            t = a ? (a.find(t=>t.url === window.location.href) || (a.length >= this.uqt && a.shift(),
            a.push({
                url: window.location.href,
                data: this.onePageData
            })),
            a) : [{
                url: window.location.href,
                data: this.onePageData
            }],
            window.localStorage.setItem("nvgopi" + this.acc, JSON.stringify(t)),
            this.OpiDataOnPersona(),
            this.OpiDataOnPersona(),
            this.OpiDataOnPersona()
        } catch (t) {}
    }
    ,
    nvg.OpiDataOnPersona = function() {
        this.onePageData = JSON.parse(window.localStorage.getItem("nvgopi" + this.acc));
        let t = {};
        for (const o in this.onePageData)
            for (const c in this.onePageData[o].data)
                "demographics" === c ? t[c] ? t[c] = this.merge(t[c], this.onePageData[o].data[c]) : t[c] = this.onePageData[o].data[c] : (t[c] || (t[c] = []),
                t[c].push(...this.onePageData[o].data[c]));
        const e = Object.entries(t.demographics);
        for (const h in t)
            this.seg.includes(h) && (this.persona["opi" + h.slice(0, 3)] = [...new Set(t[h])]);
        const i = (t,e,i,n)=>0 < e && parseInt(t) > i && parseInt(t) < n;
        var n = e.filter(([t,e])=>i(t, e, 3, 8))
          , a = e.filter(([t,e])=>i(t, e, 7, 10))
          , g = e.filter(([t,e])=>i(t, e, 0, 3))
          , l = e.filter(([t,e])=>i(t, e, 11, 15))
          , u = e.filter(([t,e])=>i(t, e, 9, 12))
          , d = e.filter(([t,e])=>i(t, e, 40, 49))
          , p = e.filter(([t,e])=>i(t, e, 1230, 1283))
          , s = e=>e.filter(([,t])=>t === Math.max(...e.map(t=>t[1])))[0];
        n.length && (this.persona.opiage = (s(n)[0] - 2).toString()),
        a.length && (this.persona.opiedu = (s(a)[0] - 7).toString()),
        g.length && (this.persona.opigen = s(g)[0].toString()),
        l.length && (this.persona.opiinc = (s(l)[0] - 11).toString()),
        u.length && (this.persona.opimar = (s(u)[0] - 9).toString()),
        d.length && (this.persona.opione = s(d)[0].toString()),
        p.length && (this.persona.opibuy = s(p)[0].toString());
        let r = this.onePageData.pop().data;
        for (; !r.hasOwnProperty("sentiment"); )
            r = this.onePageData.pop().data;
        this.persona.sentiment = r.sentiment[0]
    }
    ,
    nvg.nvgIDOnPersona = function() {
        let e = /(OPR|Opera|Edg|Edge|Trident|MSIE|SeaMonkey|Chromium|(?!Gecko.+|.*SeaMonkey.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+|.*Chromium.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)/g.exec(navigator.userAgent)[1];
        this.seg.filter(t=>t.startsWith("nid")).forEach(t=>{
            this.wni ? "Chrome" !== e && (this.persona[t.slice(3)] = this.persona[t],
            delete this.persona[t]) : delete this.persona[t]
        }
        ),
        this.persona.nvggid && (window.localStorage.setItem("nvggid", this.persona.nvggid.replaceAll("~", "-")),
        delete this.persona.nvggid)
    }
    ,
    nvg.usrError = function() {
        this.say("w", "error on usr acc" + this.acc),
        this.saveRequest()
    }
    ,
    nvg.getSegment = function(t) {
        return "everybuyer" == t ? t = "industry" : "everyone" == t && (t = "cluster"),
        (t = "object" == typeof (t = this.persona[t]) ? t.join("-") : t) || ""
    }
    ,
    nvg.getCollectionList = function() {
        var t = this.seg.slice();
        return (t = t.filter(function(t) {
            return "industry" != t && "prolook" != t && "" != t
        }))[t.indexOf("cluster")] = "everyone",
        t
    }
    ,
    nvg.getReqDefaultParms = function() {
        var t;
        this.reqParms.v = this.version,
        this.reqParms.id = this.usr + "|" + this.syn,
        this.reqParms.acc = this.acc,
        this.abt && (this.reqParms.abt = this.abt),
        this.reqParms.tit = escape(this.title || d.title),
        window.location && (this.reqParms.url = escape(window.location.href)),
        this.origin && (this.reqParms.ori = escape(this.origin)),
        this.ctr && this.ctr == this.datestr() || (this.reqParms.upd = 1),
        this.isnew && (this.reqParms.new = 1),
        this.url && (this.reqParms.url = escape(this.url)),
        d.referrer && (this.reqParms.ref = escape(d.referrer)),
        (t = this.getCookie("__utmz")) && (this.reqParms.utm = escape(t))
    }
    ,
    nvg.saveRequest = function(t) {
        t && (this.reqParms.id = t + "|" + this.syn),
        this.include(this.getServerDomain("cdn") + "/req?" + this.serializeParams(this.reqParms)),
        this.callCallbacks()
    }
    ,
    nvg.config = async function(data) {
        for (var k in this.dsy = !0,
        w.localStorage.setItem("nvgcnfg" + this.acc, JSON.stringify({
            date: new Date,
            cnf: data
        })),
        data)
            this[k] = data[k];
        if (-1 == w.location.hostname.search(this.dom) && (this.dom = ""),
        this.dom || (this.dom = this.getTLD()),
        this.syn = 0,
        this.persona = {},
        this.reqParms = {},
        this.loadProfile(),
        this.getReqDefaultParms(),
        this.__loadCustomFp(),
        this.ext)
            for (k = 0; k < this.ext.length; k++)
                eval(this.ext[k]);
        if (this.tmc)
            for (k = 0; k < this.tmc.length; k++)
                this.include("", "script", this.tmc[k]);
        this.usr && !this.debug && this.saveRequest()
    }
    ,
    nvg.loadCnfg = function() {
        var t = w.localStorage.getItem("nvgcnfg" + this.acc)
          , e = new Date;
        if (t && !this.debug && (t = JSON.parse(t)).date && e - new Date(t.date) <= 864e5)
            return this.config(t.cnf);
        this.include(this.getServerDomain("tag") + "/u/" + this.acc)
    }
    ,
    nvg.checkTT = async function() {
        var t, e = "https://token.navegg.com";
        try {
            t = await document.hasTrustToken(e)
        } catch (t) {
            return !1
        }
        if (null == t)
            return !1;
        var i, n, a = Math.floor(6 * Math.random() + 1).toString(), s = !0, r = "nvgtt" + this.acc;
        let o = window.localStorage.getItem(r);
        "1" == o && (window.localStorage.removeItem(r),
        o = null),
        null != o && (o = JSON.parse(o),
        s = !1),
        i = (n = await fetch("https://token.navegg.com/.well-known/trust-token/key-commitment").then(t=>t.json())).TrustTokenV3VOPRF.keys["" + a],
        n = n.TrustTokenV3VOPRF.id.toString();
        const c = new Date;
        if (0 == s) {
            if ("version"in o) {
                o.version != n && (await window.localStorage.removeItem(r),
                await this.refreshAllTT(e, i.expiry, n));
                const h = new Date(parseInt(o.ttl));
                return c.getTime() > h.getTime() && (window.localStorage.removeItem(r),
                await this.refreshAllTT(e, i.expiry, n)),
                null != o.pub_metadata && (this.reqParms.pub = o.pub_metadata),
                null != o.pri_metadata && (this.reqParms.priv = o.pri_metadata),
                !1
            }
            return window.localStorage.removeItem(r),
            await this.refreshAllTT(e, i.expiry, n),
            !1
        }
        1 != t ? await this.issueTT(a, o, i.expiry, n) : await this.redemptionTT(i.expiry, n)
    }
    ,
    nvg.issueTT = async function(t, e, i, n) {
        var a = "https://token.navegg.com"
          , s = "nvgtt" + this.acc
          , r = this.getCookie("nvg" + this.acc);
        try {
            await fetch(a + `/.well-known/trust-token/issuance?key=${t}&first_party_cookie=` + r, {
                method: "POST",
                trustToken: {
                    type: "token-request",
                    issuer: a
                }
            });
            new Date;
            var o = {
                pub_metadata: t,
                pri_metadata: 0,
                ttl: i,
                version: n
            };
            window.localStorage.setItem(s, JSON.stringify(o))
        } catch (t) {}
    }
    ,
    nvg.redemptionTT = async function(t, e) {
        var i = "https://token.navegg.com";
        try {
            const r = await fetch(i + "/.well-known/trust-token/redemption", {
                method: "POST",
                trustToken: {
                    type: "token-redemption",
                    issuer: i,
                    refreshPolicy: "refresh"
                }
            });
            var n = await r.json()
              , a = "nvgtt" + this.acc
              , s = {
                pub_metadata: n.pub_metadata,
                pri_metadata: n.pri_metadata,
                ttl: t,
                version: e
            };
            window.localStorage.setItem(a, JSON.stringify(s))
        } catch (t) {}
    }
    ,
    nvg.refreshAllTT = async function(e, i, n) {
        for (; await document.hasTrustToken(e); )
            try {
                let t = await fetch(e + "/.well-known/trust-token/redemption", {
                    method: "POST",
                    trustToken: {
                        type: "token-redemption",
                        issuer: e,
                        refreshPolicy: "refresh"
                    }
                });
                await fetch(e + "/.well-known/trust-token/send-rr", {
                    method: "POST",
                    headers: new Headers({
                        "Signed-Headers": "sec-redemption-record, sec-time"
                    }),
                    trustToken: {
                        type: "send-redemption-record",
                        issuers: [e],
                        refreshPolicy: "refresh",
                        includeTimestampHeader: !0,
                        signRequestData: "include",
                        additionalSigningData: "additional_signing_data"
                    }
                });
                var a, s, r = await t.json();
                if (0 == isNaN(r.pub_metadata) && null != r.pub_metadata)
                    return a = "nvgtt" + this.acc,
                    s = {},
                    s = {
                        pub_metadata: r.pub_metadata,
                        pri_metadata: r.pri_metadata,
                        ttl: i,
                        version: n
                    },
                    window.localStorage.setItem(a, JSON.stringify(s)),
                    !1
            } catch (t) {}
    }
    ,
    nvg.__init__ = function(t) {
        if (nvg.seg = "gender age education marital income city region country connection brand product interest career cluster prolook custom industry everybuyer pgender page peducation pmarital pincome lookalike opi nvigender nviage nvieducation nviincome nvimarital nvibrand nviinterest nviproduct nvicareer nidage nidpage nidbrand nidcareer nidconnection nideducation nidpeducation nideverybuyer nideveryone nidgender nidpgender nidincome nidpincome nidinterest nidmarital nidpmarital nidproduct nvggid opibra opipro opiint opicar".split(" "),
        t[1] = t[1] || {},
        !("acc"in t[1]))
            return t[0].say("e", "Navegg instance must have acc parameter");
        for (var e in w["nvg" + t[1].acc] || (w["nvg" + t[1].acc] = t[0]),
        t[1])
            t[0][e] = t[1][e];
        t[0].ckn = "nvg" + t[1].acc,
        t[0].debug = "1" == t[0].getParameter("navegg_debug"),
        t[0].loadCnfg()
    }
    ,
    w.Navegg.q.push = nvg.__init__;
    for (var x = 0; x < Navegg.q.length; x++) {
        var data = Navegg.q[x];
        data[0].__init__(data)
    }
}(window, document);
