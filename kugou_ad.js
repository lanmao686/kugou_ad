/**
 * 酷狗音乐概念版去广告（开屏+首页Banner）
 * 接口：
 * 1. us.l.qq.com/exapp                            （开屏/信息流广告）
 * 2. gateway.kugou.com/ads.gateway/v2/lite_v_youth_home_banner （首页Banner广告）
 */

var url = $request.url;
var body = $response.body;

try {
    var obj = JSON.parse(body);

    // 接口1：开屏/信息流广告 (exapp)
    if (url.indexOf('us.l.qq.com/exapp') !== -1) {
        if (obj.data && typeof obj.data === 'object') {
            for (var posid in obj.data) {
                if (obj.data.hasOwnProperty(posid)) {
                    var pos = obj.data[posid];
                    if (pos && pos.list && Array.isArray(pos.list)) {
                        // 只保留占位空广告（is_empty:1），其余都清除
                        pos.list = pos.list.filter(function(ad) {
                            return ad.is_empty === 1;
                        });
                        if (!pos.list.length) pos.list = [];
                    }
                }
            }
        }
        if (obj.last_ads) {
            obj.last_ads = {};
        }
    }

    // 接口2：首页Banner广告 (lite_v_youth_home_banner)
    else if (url.indexOf('lite_v_youth_home_banner') !== -1) {
        if (obj.data && obj.data.ads && obj.data.ads.lite_v_youth_home_banner) {
            obj.data.ads.lite_v_youth_home_banner = [];
        }
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log('kugou_youth_ad.js error: ' + e.message);
}

$done({ body });
