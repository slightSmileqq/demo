import http from '@/utils/http'

/**
 * @description 创建红包
 * @param totalMoney    红包金额
 * @param totalNumber    红包个数
 * @returns {Promise<ResultData<string>>} 红包key
 */
export function creatRedPacket(totalMoney: number, totalNumber: number) {
    return http.get<string>(
        `/api/send/${totalMoney}/${totalNumber}`,
    )
}

/**
 * @description 抢红包接口
 * @param redPackageKey   红包key
 * @returns {Promise<ResultData<number>>} 红包金额
 */
export function getRedPacket(redPackageKey: string) {
    return http.get<number>(
        `/api/rob/${redPackageKey}`,
    )
}

/**
 * @description 红包领取记录
 * @param redPackageKey  红包key
 * @returns {Promise<ResultData<{ [key: string]: number }>>} 红包领取记录
 */
export function getRedPacketRecord(redPackageKey: string) {
    return http.get<number>(
        `/api/record/${redPackageKey}`,
    )
}



/**
 * @description 最终获得奖励接口
 * @param redPackageKey  红包key
 * @param redPackageNumber 点击了多少个红包
 * @returns {number} 获得奖励金额
 */
export function getRedPacketFinallyRecord(redPackageKey: string,redPackageNumber:number) {
    return http.get<number>(
        `/api/finally/${redPackageKey}/${redPackageNumber}`,
    )
}

/**
 * @description 配置红包雨活动
 * @param duration 红包雨活持续时长 单位ms
 * @param generationRate 红包生成速率 单位ms
 * @param date  红包雨活动开启时间
 */
export function setRedPacketRainActivity(duration: string,generationRate:number,date:string) {
    return http.get<Object>(
        `/api/finally/${duration}/${generationRate}/${date}`,
    )
}
/**
 * @description 推送红包雨活动接口：将红包雨配置信息推送过来：
 *                  推送信息包括： duration 单位ms
 *                  红包生成速率： generationRate 单位ms
 *                  红包雨活动唯一标识key： redPackageKey
 *
 */
export function pushPacketRainActivity() {

}
