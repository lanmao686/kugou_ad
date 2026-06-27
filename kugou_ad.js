
var body = $response.body;

try {
    var obj = JSON.parse(body);

    // 清空所有广告位数据
    if (obj.rpt_msg_pos_ad_info && Array.isArray(obj.rpt_msg_pos_ad_info)) {
        obj.rpt_msg_pos_ad_info = [];
    }

    // 禁用开屏广告
    if (obj.hasOwnProperty('need_show_ams_splash')) {
        obj.need_show_ams_splash = 0;
    }
    if (obj.hasOwnProperty('tme_splash_times')) {
        obj.tme_splash_times = 0;
    }
    if (obj.hasOwnProperty('splash_rotation_num')) {
        obj.splash_rotation_num = 0;
    }

    // 如果有其他相关字段也可一并处理
    if (obj.hasOwnProperty('need_splash_rotation')) {
        obj.need_splash_rotation = 0;
    }

    body = JSON.stringify(obj);
} catch (e) {
    // 解析失败则原样返回
    console.log('kugou_ad.js error: ' + e.message);
}

$done({ body });
