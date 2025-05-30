"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// 入力ファイルのパス
var INPUT_PATH = path.join(__dirname, '../public/vizier_votable.tsv');
// 1.5等星から20.5等星まで0.5刻みで累積的に出力
var MAG_LIMITS = Array.from({ length: 20 }, function (_, i) { return 1.5 + i; });
var VMAG_INDEX = 10; // Vmagカラムのインデックス
// VOTable/TSVのパース（ヘッダー行とデータ行を分離）
function parseTSV(text) {
    var lines = text.split(/\r?\n/).filter(Boolean);
    // データ部分の開始を探す
    var dataStart = 0;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(/^_RAJ2000/)) {
            dataStart = i;
            break;
        }
    }
    var header = lines[dataStart];
    var dataLines = lines.slice(dataStart + 1);
    return { header: header, dataLines: dataLines };
}
// メイン処理
function main() {
    var raw = fs.readFileSync(INPUT_PATH, 'utf-8');
    var _a = parseTSV(raw), header = _a.header, dataLines = _a.dataLines;
    // 累積ファイル（N等星まで）
    MAG_LIMITS.forEach(function (mag, idx) {
        var filtered = dataLines.filter(function (line) {
            var cols = line.split(';');
            var vmag = parseFloat(cols[VMAG_INDEX]);
            return !isNaN(vmag) && vmag <= mag;
        });
        var out = __spreadArray([header], filtered, true).join('\n');
        var file = path.join(__dirname, "../public/stars_mag".concat(idx + 1, ".csv"));
        fs.writeFileSync(file, out, 'utf-8');
        console.log("Wrote ".concat(filtered.length, " stars to ").concat(file));
    });
    var _loop_1 = function (i) {
        var lower = i === 0 ? -Infinity : MAG_LIMITS[i - 1];
        var upper = MAG_LIMITS[i];
        var filtered = dataLines.filter(function (line) {
            var cols = line.split(';');
            var vmag = parseFloat(cols[VMAG_INDEX]);
            return !isNaN(vmag) && vmag > lower && vmag <= upper;
        });
        var out = __spreadArray([header], filtered, true).join('\n');
        var file = path.join(__dirname, "../public/stars_mag".concat(i + 1, "_only.csv"));
        fs.writeFileSync(file, out, 'utf-8');
        console.log("Wrote ".concat(filtered.length, " stars to ").concat(file));
    };
    // 範囲ファイル（N等星のみ）
    for (var i = 0; i < MAG_LIMITS.length; i++) {
        _loop_1(i);
    }
}
main();
