!function r(o, n, l) {
    function d(t, e) {
        if (!n[t]) {
            if (!o[t]) {
                var a = "function" == typeof require && require;
                if (!e && a) return a(t, !0);
                if (c) return c(t, !0);
                var i = new Error("Cannot find module '" + t + "'");
                throw i.code = "MODULE_NOT_FOUND", i
            }
            var s = n[t] = {exports: {}};
            o[t][0].call(s.exports, function (e) {
                return d(o[t][1][e] || e)
            }, s, s.exports, r, o, n, l)
        }
        return n[t].exports
    }

    for (var c = "function" == typeof require && require, e = 0; e < l.length; e++) d(l[e]);
    return d
}({
    1: [function (e, t, a) {
    }, {}], 2: [function (e, t, a) {
    }, {"./jquery-smartphoto": 3, "./jquery.lazyload": 4, "./social-share": 7}], 3: [function (p, e, t) {
    }, {}], 4: [function (e, t, a) {
    }, {}], 5: [function (e, t, a) {
        var m;
        (m = jQuery).fn.qrcode = function (d) {
            var a;

            function t(e) {
                this.mode = a, this.data = e
            }

            function c(e, t) {
                this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
            }

            function p(e, t) {
                if (null == e.length) throw Error(e.length + "/" + t);
                for (var a = 0; a < e.length && 0 == e[a];) a++;
                this.num = Array(e.length - a + t);
                for (var i = 0; i < e.length - a; i++) this.num[i] = e[i + a]
            }

            function u(e, t) {
                this.totalCount = e, this.dataCount = t
            }

            function o() {
                this.buffer = [], this.length = 0
            }

            t.prototype = {
                getLength: function () {
                    return this.data.length
                }, write: function (e) {
                    for (var t = 0; t < this.data.length; t++) e.put(this.data.charCodeAt(t), 8)
                }
            }, c.prototype = {
                addData: function (e) {
                    this.dataList.push(new t(e)), this.dataCache = null
                }, isDark: function (e, t) {
                    if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw Error(e + "," + t);
                    return this.modules[e][t]
                }, getModuleCount: function () {
                    return this.moduleCount
                }, make: function () {
                    if (this.typeNumber < 1) {
                        var e = 1;
                        for (e = 1; e < 40; e++) {
                            for (var t = u.getRSBlocks(e, this.errorCorrectLevel), a = new o, i = 0, s = 0; s < t.length; s++) i += t[s].dataCount;
                            for (s = 0; s < this.dataList.length; s++) t = this.dataList[s], a.put(t.mode, 4), a.put(t.getLength(), h.getLengthInBits(t.mode, e)), t.write(a);
                            if (a.getLengthInBits() <= 8 * i) break
                        }
                        this.typeNumber = e
                    }
                    this.makeImpl(!1, this.getBestMaskPattern())
                }, makeImpl: function (e, t) {
                    this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
                    for (var a = 0; a < this.moduleCount; a++) {
                        this.modules[a] = Array(this.moduleCount);
                        for (var i = 0; i < this.moduleCount; i++) this.modules[a][i] = null
                    }
                    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, t), 7 <= this.typeNumber && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = c.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, t)
                }, setupPositionProbePattern: function (e, t) {
                    for (var a = -1; a <= 7; a++) if (!(e + a <= -1 || this.moduleCount <= e + a)) for (var i = -1; i <= 7; i++) t + i <= -1 || this.moduleCount <= t + i || (this.modules[e + a][t + i] = 0 <= a && a <= 6 && (0 == i || 6 == i) || 0 <= i && i <= 6 && (0 == a || 6 == a) || 2 <= a && a <= 4 && 2 <= i && i <= 4)
                }, getBestMaskPattern: function () {
                    for (var e = 0, t = 0, a = 0; a < 8; a++) {
                        this.makeImpl(!0, a);
                        var i = h.getLostPoint(this);
                        (0 == a || i < e) && (e = i, t = a)
                    }
                    return t
                }, createMovieClip: function (e, t, a) {
                    for (e = e.createEmptyMovieClip(t, a), this.make(), t = 0; t < this.modules.length; t++) {
                        a = 1 * t;
                        for (var i = 0; i < this.modules[t].length; i++) {
                            var s = 1 * i;
                            this.modules[t][i] && (e.beginFill(0, 100), e.moveTo(s, a), e.lineTo(1 + s, a), e.lineTo(1 + s, a + 1), e.lineTo(s, a + 1), e.endFill())
                        }
                    }
                    return e
                }, setupTimingPattern: function () {
                    for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = 0 == e % 2);
                    for (e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = 0 == e % 2)
                }, setupPositionAdjustPattern: function () {
                    for (var e = h.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++) for (var a = 0; a < e.length; a++) {
                        var i = e[t], s = e[a];
                        if (null == this.modules[i][s]) for (var r = -2; r <= 2; r++) for (var o = -2; o <= 2; o++) this.modules[i + r][s + o] = -2 == r || 2 == r || -2 == o || 2 == o || 0 == r && 0 == o
                    }
                }, setupTypeNumber: function (e) {
                    for (var t = h.getBCHTypeNumber(this.typeNumber), a = 0; a < 18; a++) {
                        var i = !e && 1 == (t >> a & 1);
                        this.modules[Math.floor(a / 3)][a % 3 + this.moduleCount - 8 - 3] = i
                    }
                    for (a = 0; a < 18; a++) i = !e && 1 == (t >> a & 1), this.modules[a % 3 + this.moduleCount - 8 - 3][Math.floor(a / 3)] = i
                }, setupTypeInfo: function (e, t) {
                    for (var a = h.getBCHTypeInfo(this.errorCorrectLevel << 3 | t), i = 0; i < 15; i++) {
                        var s = !e && 1 == (a >> i & 1);
                        i < 6 ? this.modules[i][8] = s : i < 8 ? this.modules[i + 1][8] = s : this.modules[this.moduleCount - 15 + i][8] = s
                    }
                    for (i = 0; i < 15; i++) s = !e && 1 == (a >> i & 1), i < 8 ? this.modules[8][this.moduleCount - i - 1] = s : i < 9 ? this.modules[8][15 - i - 1 + 1] = s : this.modules[8][15 - i - 1] = s;
                    this.modules[this.moduleCount - 8][8] = !e
                }, mapData: function (e, t) {
                    for (var a = -1, i = this.moduleCount - 1, s = 7, r = 0, o = this.moduleCount - 1; 0 < o; o -= 2) for (6 == o && o--; ;) {
                        for (var n = 0; n < 2; n++) if (null == this.modules[i][o - n]) {
                            var l = !1;
                            r < e.length && (l = 1 == (e[r] >>> s & 1)), h.getMask(t, i, o - n) && (l = !l), this.modules[i][o - n] = l, -1 == --s && (r++, s = 7)
                        }
                        if ((i += a) < 0 || this.moduleCount <= i) {
                            i -= a, a = -a;
                            break
                        }
                    }
                }
            }, c.PAD0 = 236, c.PAD1 = 17, c.createData = function (e, t, a) {
                t = u.getRSBlocks(e, t);
                for (var i = new o, s = 0; s < a.length; s++) {
                    var r = a[s];
                    i.put(r.mode, 4), i.put(r.getLength(), h.getLengthInBits(r.mode, e)), r.write(i)
                }
                for (s = e = 0; s < t.length; s++) e += t[s].dataCount;
                if (i.getLengthInBits() > 8 * e) throw Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * e + ")");
                for (i.getLengthInBits() + 4 <= 8 * e && i.put(0, 4); 0 != i.getLengthInBits() % 8;) i.putBit(!1);
                for (; !(i.getLengthInBits() >= 8 * e) && (i.put(c.PAD0, 8), !(i.getLengthInBits() >= 8 * e));) i.put(c.PAD1, 8);
                return c.createBytes(i, t)
            }, c.createBytes = function (e, t) {
                for (var a = 0, i = 0, s = 0, r = Array(t.length), o = Array(t.length), n = 0; n < t.length; n++) {
                    var l = t[n].dataCount, d = t[n].totalCount - l;
                    i = Math.max(i, l), s = Math.max(s, d);
                    r[n] = Array(l);
                    for (var c = 0; c < r[n].length; c++) r[n][c] = 255 & e.buffer[c + a];
                    for (a += l, c = h.getErrorCorrectPolynomial(d), l = new p(r[n], c.getLength() - 1).mod(c), o[n] = Array(c.getLength() - 1), c = 0; c < o[n].length; c++) d = c + l.getLength() - o[n].length, o[n][c] = 0 <= d ? l.get(d) : 0
                }
                for (c = n = 0; c < t.length; c++) n += t[c].totalCount;
                for (a = Array(n), c = l = 0; c < i; c++) for (n = 0; n < t.length; n++) c < r[n].length && (a[l++] = r[n][c]);
                for (c = 0; c < s; c++) for (n = 0; n < t.length; n++) c < o[n].length && (a[l++] = o[n][c]);
                return a
            }, a = 4;
            for (var h = {
                PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function (e) {
                    for (var t = e << 10; 0 <= h.getBCHDigit(t) - h.getBCHDigit(h.G15);) t ^= h.G15 << h.getBCHDigit(t) - h.getBCHDigit(h.G15);
                    return (e << 10 | t) ^ h.G15_MASK
                },
                getBCHTypeNumber: function (e) {
                    for (var t = e << 12; 0 <= h.getBCHDigit(t) - h.getBCHDigit(h.G18);) t ^= h.G18 << h.getBCHDigit(t) - h.getBCHDigit(h.G18);
                    return e << 12 | t
                },
                getBCHDigit: function (e) {
                    for (var t = 0; 0 != e;) t++, e >>>= 1;
                    return t
                },
                getPatternPosition: function (e) {
                    return h.PATTERN_POSITION_TABLE[e - 1]
                },
                getMask: function (e, t, a) {
                    switch (e) {
                        case 0:
                            return 0 == (t + a) % 2;
                        case 1:
                            return 0 == t % 2;
                        case 2:
                            return 0 == a % 3;
                        case 3:
                            return 0 == (t + a) % 3;
                        case 4:
                            return 0 == (Math.floor(t / 2) + Math.floor(a / 3)) % 2;
                        case 5:
                            return 0 == t * a % 2 + t * a % 3;
                        case 6:
                            return 0 == (t * a % 2 + t * a % 3) % 2;
                        case 7:
                            return 0 == (t * a % 3 + (t + a) % 2) % 2;
                        default:
                            throw Error("bad maskPattern:" + e)
                    }
                },
                getErrorCorrectPolynomial: function (e) {
                    for (var t = new p([1], 0), a = 0; a < e; a++) t = t.multiply(new p([1, s.gexp(a)], 0));
                    return t
                },
                getLengthInBits: function (e, t) {
                    if (1 <= t && t < 10) switch (e) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case a:
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" + e)
                    } else if (t < 27) switch (e) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case a:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + e)
                    } else {
                        if (!(t < 41)) throw Error("type:" + t);
                        switch (e) {
                            case 1:
                                return 14;
                            case 2:
                                return 13;
                            case a:
                                return 16;
                            case 8:
                                return 12;
                            default:
                                throw Error("mode:" + e)
                        }
                    }
                },
                getLostPoint: function (e) {
                    for (var t = e.getModuleCount(), a = 0, i = 0; i < t; i++) for (var s = 0; s < t; s++) {
                        for (var r = 0, o = e.isDark(i, s), n = -1; n <= 1; n++) if (!(i + n < 0 || t <= i + n)) for (var l = -1; l <= 1; l++) s + l < 0 || t <= s + l || 0 == n && 0 == l || o == e.isDark(i + n, s + l) && r++;
                        5 < r && (a += 3 + r - 5)
                    }
                    for (i = 0; i < t - 1; i++) for (s = 0; s < t - 1; s++) r = 0, e.isDark(i, s) && r++, e.isDark(i + 1, s) && r++, e.isDark(i, s + 1) && r++, e.isDark(i + 1, s + 1) && r++, 0 != r && 4 != r || (a += 3);
                    for (i = 0; i < t; i++) for (s = 0; s < t - 6; s++) e.isDark(i, s) && !e.isDark(i, s + 1) && e.isDark(i, s + 2) && e.isDark(i, s + 3) && e.isDark(i, s + 4) && !e.isDark(i, s + 5) && e.isDark(i, s + 6) && (a += 40);
                    for (s = 0; s < t; s++) for (i = 0; i < t - 6; i++) e.isDark(i, s) && !e.isDark(i + 1, s) && e.isDark(i + 2, s) && e.isDark(i + 3, s) && e.isDark(i + 4, s) && !e.isDark(i + 5, s) && e.isDark(i + 6, s) && (a += 40);
                    for (s = r = 0; s < t; s++) for (i = 0; i < t; i++) e.isDark(i, s) && r++;
                    return a + 10 * (e = Math.abs(100 * r / t / t - 50) / 5)
                }
            }, s = {
                glog: function (e) {
                    if (e < 1) throw Error("glog(" + e + ")");
                    return s.LOG_TABLE[e]
                }, gexp: function (e) {
                    for (; e < 0;) e += 255;
                    for (; 256 <= e;) e -= 255;
                    return s.EXP_TABLE[e]
                }, EXP_TABLE: Array(256), LOG_TABLE: Array(256)
            }, e = 0; e < 8; e++) s.EXP_TABLE[e] = 1 << e;
            for (e = 8; e < 256; e++) s.EXP_TABLE[e] = s.EXP_TABLE[e - 4] ^ s.EXP_TABLE[e - 5] ^ s.EXP_TABLE[e - 6] ^ s.EXP_TABLE[e - 8];
            for (e = 0; e < 255; e++) s.LOG_TABLE[s.EXP_TABLE[e]] = e;
            return p.prototype = {
                get: function (e) {
                    return this.num[e]
                }, getLength: function () {
                    return this.num.length
                }, multiply: function (e) {
                    for (var t = Array(this.getLength() + e.getLength() - 1), a = 0; a < this.getLength(); a++) for (var i = 0; i < e.getLength(); i++) t[a + i] ^= s.gexp(s.glog(this.get(a)) + s.glog(e.get(i)));
                    return new p(t, 0)
                }, mod: function (e) {
                    if (this.getLength() - e.getLength() < 0) return this;
                    for (var t = s.glog(this.get(0)) - s.glog(e.get(0)), a = Array(this.getLength()), i = 0; i < this.getLength(); i++) a[i] = this.get(i);
                    for (i = 0; i < e.getLength(); i++) a[i] ^= s.gexp(s.glog(e.get(i)) + t);
                    return new p(a, 0).mod(e)
                }
            }, u.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], u.getRSBlocks = function (e, t) {
                var a = u.getRsBlockTable(e, t);
                if (null == a) throw Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
                for (var i = a.length / 3, s = [], r = 0; r < i; r++) for (var o = a[3 * r + 0], n = a[3 * r + 1], l = a[3 * r + 2], d = 0; d < o; d++) s.push(new u(n, l));
                return s
            }, u.getRsBlockTable = function (e, t) {
                switch (t) {
                    case 1:
                        return u.RS_BLOCK_TABLE[4 * (e - 1) + 0];
                    case 0:
                        return u.RS_BLOCK_TABLE[4 * (e - 1) + 1];
                    case 3:
                        return u.RS_BLOCK_TABLE[4 * (e - 1) + 2];
                    case 2:
                        return u.RS_BLOCK_TABLE[4 * (e - 1) + 3]
                }
            }, o.prototype = {
                get: function (e) {
                    return 1 == (this.buffer[Math.floor(e / 8)] >>> 7 - e % 8 & 1)
                }, put: function (e, t) {
                    for (var a = 0; a < t; a++) this.putBit(1 == (e >>> t - a - 1 & 1))
                }, getLengthInBits: function () {
                    return this.length
                }, putBit: function (e) {
                    var t = Math.floor(this.length / 8);
                    this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++
                }
            }, "string" == typeof d && (d = {text: d}), d = m.extend({}, {
                render: "canvas",
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#ffffff",
                foreground: "#000000"
            }, d), this.each(function () {
                var e;
                if ("canvas" == d.render) {
                    (e = new c(d.typeNumber, d.correctLevel)).addData(d.text), e.make();
                    var t = document.createElement("canvas");
                    t.width = d.width, t.height = d.height;
                    for (var a = t.getContext("2d"), i = d.width / e.getModuleCount(), s = d.height / e.getModuleCount(), r = 0; r < e.getModuleCount(); r++) for (var o = 0; o < e.getModuleCount(); o++) {
                        a.fillStyle = e.isDark(r, o) ? d.foreground : d.background;
                        var n = Math.ceil((o + 1) * i) - Math.floor(o * i),
                            l = Math.ceil((r + 1) * i) - Math.floor(r * i);
                        a.fillRect(Math.round(o * i), Math.round(r * s), n, l)
                    }
                } else for ((e = new c(d.typeNumber, d.correctLevel)).addData(d.text), e.make(), t = m("<table></table>").css("width", d.width + "px").css("height", d.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", d.background), a = d.width / e.getModuleCount(), i = d.height / e.getModuleCount(), s = 0; s < e.getModuleCount(); s++) for (r = m("<tr></tr>").css("height", i + "px").appendTo(t), o = 0; o < e.getModuleCount(); o++) m("<td></td>").css("width", a + "px").css("background-color", e.isDark(s, o) ? d.foreground : d.background).appendTo(r);
                e = t, jQuery(e).appendTo(this)
            })
        }
    }, {}], 6: [function (e, t, a) {
    }, {}], 7: [function (require, module, exports) {
    }, {"../../../Themer/src/js/jquery.qrcode.min": 5}], 8: [function (e, t, a) {
    }, {}], 9: [function (e, t, a) {
        var f, i = 0;

        function g(e, t, a, i, s) {
            for (var r = 0, o = 0, n = 0; n < e.length; n++) 560 < (r += s.measureText(e[n]).width) && (s.fillText(e.substring(o, n), t, a), a += i, r = 0, o = n), n == e.length - 1 && (s.fillText(e.substring(o, n + 1), t, a), a += i);
            return a
        }

        t.exports = {
            buildCanvas: function d(c) {
                if (f && clearTimeout(f), c.num && 20 < c.num) return !1;
                var p = document.createElement("canvas"), u = p.getContext("2d");
                p.width = 640, p.height = 1e4;
                var h = 0;
                u.fillStyle = "#fff", u.fillRect(0, 0, p.width, p.height);
                var m = new Image;
                m.crossOrigin = "anonymous", c.head.match(/^\/\//) && (c.head = window.location.protocol + c.head), m.src = c.head, m.onerror = function (e) {
                    alert("生成海报图片失败"), $(".mobile-share-bg,.mobile-share-wrap").remove()
                }, m.onload = function () {
                    h += 640 / m.width * m.height, u.drawImage(this, 0, 0, m.width, m.height, 0, 0, 640, 640 / m.width * m.height);
                    var e = new Date(1e3 * c.timestamp), t = e.getDate(), a = e.getFullYear(), i = e.getMonth() + 1;
                    t = t < 10 ? "0" + t : "" + t, i = a + "/" + (i = i < 10 ? "0" + i : "" + i);
                    var s = 0, r = 0;
                    u.fillStyle = "#fff", u.textAlign = "center", u.font = "68px Noto Sans SC";
                    for (var o = 0; o < t.length; o++) s += u.measureText(t[o]).width;
                    for (u.fillText(t, 80, h - 72), u.fillStyle = "#fff", u.textAlign = "center", u.font = "30px Noto Sans SC", o = 0; o < i.length; o++) r += u.measureText(i[o]).width;
                    u.fillText(i, 80, h - 28);
                    var n = parseInt(s < r ? r : s);
                    u.moveTo(80 - n / 2, h - 60), u.lineTo(80 - n / 2 + n, h - 60), u.lineWidth = 1, u.strokeStyle = "rgba(255,255,255, 1)", u.stroke(), u.fillStyle = "#000", u.textAlign = "center", u.font = "900 40px Noto Serif SC", h += 80, h = g(jQuery("<div>").html(c.title).text(), 320, h, 54, u), u.textAlign = "left", u.fillStyle = "#333", u.font = "400 28px Noto Sans SC", h += 30, h = g(jQuery("<div>").html(c.excerpt).text(), 30, h, 44, u), h += 100, u.lineWidth = 1, u.beginPath(), u.setLineDash([7, 7]), u.strokeStyle = "#ccc", u.moveTo(0, h), u.lineTo(640, h), u.stroke();
                    var l = new Image;
                    l.crossOrigin = "anonymous", c.logo.match(/^\/\//) && (c.logo = window.location.protocol + c.logo), l.src = c.logo, l.onerror = function (e) {
                        alert("生成海报图片失败"), $(".mobile-share-bg,.mobile-share-wrap").remove()
                    }, l.onload = function () {
                        h += 40;
                        var i = 400 / l.width * l.height;
                        i = 100 < i ? 100 : i;
                        var e = l.width / (l.height / i);
                        i = (e = 400 < e ? 400 : e) / l.width * l.height, u.drawImage(this, 0, 0, l.width, l.height, 30, h + (100 - i) / 2, e, i);
                        var s = new Image;
                        s.src = c.qrcode, s.onerror = function (e) {
                            alert("生成海报图片失败"), $(".mobile-share-bg,.mobile-share-wrap").remove()
                        }, s.onload = function () {
                            u.drawImage(this, 0, 0, s.width, s.height, 510, h, 100, 100 / s.width * s.height);
                            var e = 100 / s.width * s.height;
                            h += i < e ? e : i, h += 40;
                            var t = u.getImageData(0, 0, 640, h);
                            p.height = h, u.putImageData(t, 0, 0);
                            var a = p.toDataURL("image/jpeg", 1);
                            c.callback(a), f = setTimeout(function () {
                                u.clearRect(0, 0, p.width, p.height), c.num = c.num ? c.num + 1 : 1, d(c)
                            }, 500)
                        }
                    }
                }
            }
        }
    }, {}], 10: [function (e, t, a) {
        e("../../../Themer/src/js/bootstrap"), e("../../../Themer/src/js/swiper.jquery");
        var b = e("../../../Themer/src/js/text-image");
        e("../../../Themer/src/js/member");
        var d = e("../../../Themer/src/js/social-share");
        e("../../../Themer/src/js/common"), e("../../../Themer/src/js/jquery.qrcode.min"), function (m) {
            var f = m(window), g = f.height(), l = 0;
            m(document).ready(function () {
                var i = m("body"), s = i.height();
                if (m(document).on("click", ".j-mobile-share", function () {
                    var s = m(this);
                    m("body").append('<div class="mobile-share-bg"><div class="top_tips">请长按图片，将内容推荐给好友</div></div><div class="mobile-share-wrap"><div class="loading">分享海报生成中...</div></div>'),
                        m.ajax({
                        url: '/data/hb.php',
                        data: {
                            title: s.data("title"),
                            img: s.data("img"),
                            uri: s.data("uri"),
                            desc: s.data("desc"),
                        },
                        method: "POST",
                        dataType: "json",
                        timeout: 1e4,
                        success: function (e) {
                            e.callback = function (e) {
                                m(".mobile-share-wrap").html('<img src="' + e + '"><div class="mobile-share-close">×</div>'), m(".mobile-share-bg .top_tips").show()
                            };
                            var a = m('<div style="display: none;"></div>');
                            m("body").append(a);
                            var i = location.href;
                            a.qrcode({text: i}), e.qrcode = a.find("canvas")[0].toDataURL(), a.remove();
                            e.head && e.logo && e.qrcode ? b.buildCanvas(e) : (alert("生成分享海报失败"), m(".mobile-share-bg,.mobile-share-wrap").remove())
                        },
                        error: function () {
                            alert("获取分享海报失败"), m(".mobile-share-bg,.mobile-share-wrap").remove()
                        }
                    })
                }).on("click", ".mobile-share-close", function () {
                    m(".mobile-share-bg,.mobile-share-wrap").remove()
                })) ;
            });
        }(jQuery)
    }, {
        "../../../Themer/src/js/bootstrap": 1,
        "../../../Themer/src/js/common": 2,
        "../../../Themer/src/js/jquery.qrcode.min": 5,
        "../../../Themer/src/js/member": 6,
        "../../../Themer/src/js/social-share": 7,
        "../../../Themer/src/js/swiper.jquery": 8,
        "../../../Themer/src/js/text-image": 9
    }]
}, {}, [10]);