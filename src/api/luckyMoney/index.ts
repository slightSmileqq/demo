import http from '@/utils/http'

/**
 * @description 获取数据字典接口
 * @param totalMoney    红包金额
 * @param redPackageNumber    红包个数
 * @returns {Promise<ResultData<string>>} 红包key
 */
export function sendRedPacket(totalMoney: number, redPackageNumber: number) {
    return http.get<string>(
        `/api/send/${totalMoney}/${redPackageNumber}`,
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
    return http.get<{ [key: string]: number }>(
        `/api/record/${redPackageKey}`,
    )
}
