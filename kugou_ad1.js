var body = $response.body;

try {
    var obj = JSON.parse(body);

    // 清空 data 中每个广告位的广告列表
    if (obj.data && typeof obj.data === 'object') {
        for (var posid in obj.data) {
            if (obj.data.hasOwnProperty(posid)) {
                var pos = obj.data[posid];
                if (pos && pos.list && Array.isArray(pos.list)) {
                    // 仅保留 is_empty:1 的占位广告（如果存在），其余全部移除
                    pos.list = pos.list.filter(function(ad) {
                        return ad.is_empty === 1;
                    });
                    // 如果没有占位广告，直接设为空数组
                    if (!pos.list.length) pos.list = [];
                }
            }
        }
    }

    // 清除可能的上一次广告数据
    if (obj.last_ads) {
        obj.last_ads = {};
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log('kugou_gdt_ad.js error: ' + e.message);
}

$done({ body });
