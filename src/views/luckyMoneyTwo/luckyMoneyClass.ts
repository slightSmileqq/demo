// 导入默认图片地址
import defaultUrl from '@/assets/images/luckyMoney.png'

interface LuckyMoneyData {
    // 图片地址
    url?: string;
    // 图片宽度
    width?: string;
    // 图片高度
    height?: string;
    //  插入的父元素
    parent?: HTMLElement;
    // 下落轨道
    orbit?: number[];
    // 动画
    animation?: string;
    // 动画持续时长
    animationDuration?: string;
    // 图片点击事件回调
    imgClickCallback?: () => void;
}

// 定义一个红包类
export default class LuckyMoney {
    // 红包图片背景     默认值：defaultUrl
    private readonly url: string;
    // 图片宽度        默认值：'20vw'
    private readonly width: string;
    // 图片高度        默认值：this.width ? 'auto' : '20vw'
    private readonly height: string;
    // 插入到哪个父元素中 默认值：document.body;
    private readonly parent: HTMLElement;
    // 为了避免红包重合，设计不同的轨道，共5个轨道 默认值： [0, 15, 35, 55, 75]
    private readonly orbit: number[]
    // 动画            默认值： 'drop 2s linear'
    private readonly animation: string;
    // 动画持续时长      默认值： `${Math.random() * 5 + 1}s`
    private readonly animationDuration: string;
    // img元素，用于销毁红包
    private img: HTMLImageElement = document.createElement('img');
    // 图片点击事件回调
    private readonly imgClickCallback: (() => void) | undefined;

    // 构造函数
    constructor(data: LuckyMoneyData) {
        data = data || {}
        this.url = data.url || defaultUrl;
        this.width = data.width || '20vw'
        this.height = data.height || this.width ? 'auto' : '20vw'
        this.parent = data.parent || document.body;
        this.orbit = data.orbit || [0, 15, 35, 55, 75]
        this.animation = data.animation || 'drop 2s linear'
        this.animationDuration = data.animationDuration || `${Math.random() * 5 + 1}s`
        this.imgClickCallback = data.imgClickCallback
        //     create
        this.create()
    }


    //  创建红包
    public create(): void {
        //     生成img标签
        this.img = document.createElement('img');
        //     设置img标签的src属性
        this.img.src = this.url
        // 设置图片定位
        this.img.style.position = 'absolute'
        // 设置图片的top值
        this.img.style.top = this.height
        // 偏移量
        this.img.style.left = `${this.orbit[Math.round(Math.random() * 4)]}vw`
        // 添加style，动画属性属性
        this.img.style.animation = this.animation
        // 动画持续时长
        this.img.style.animationDuration = this.animationDuration
        // 设置img标签的宽高
        this.img.style.width = this.width
        this.img.style.height = this.height
        // 图片点击事件
        this.img.onclick = this.click.bind(this)
        // 将img标签添加到parent中
        this.parent.appendChild(this.img)
        // 根据动画持续时长销毁红包
        this.destroyByTime(Number(this.animationDuration.slice(0, -1)))
    }

    // 销毁红包
    public destroy(): void {
        // 销毁img标签
        this.img.remove()
    }

    // 图片点击事件
    public click(): void {
        // 销毁图片
        this.destroy()
        // 执行回调函数
        this.imgClickCallback && this.imgClickCallback()
    }

    //     定时销毁
    public destroyByTime(second: number): void {
        //     销毁图片
        setTimeout(() => {
            this.destroy()
        }, second * 1000)
    }
}
