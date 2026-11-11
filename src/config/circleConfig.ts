import type { CirclePageConfig } from "@/types/circleConfig";

// 圈子页面配置
// 聚合展示朋友们博客的最新文章
//
// 主链路：页面在浏览器里读取 friendsConfig 中 circle: true 的友链，
// 对每条的 rss 地址单独请求边缘函数 ?url=<rss>，拿到 JSON 后合并排序。
// 哪些站点参与，完全由 friendsConfig 里每条友链的 circle: true/false 决定。
// 边缘函数全失败时，才回退到下面的 dataUrls（circle-feed 定时发布的静态数据）。
export const circleConfig: CirclePageConfig = {
	// 页面标题，留空则使用默认标题「圈子」
	title: "",
	// 页面描述
	description: "",

	// 纯 RSS→JSON 边缘函数的 base 地址
	// 函数只做单源转换：?url=<订阅源地址> → 该源的 JSON
	edgeBase: "https://rss.5al.top/",

	// 单个订阅源的请求超时（毫秒），超时后该站点计入 failures，不影响其他站点
	edgeTimeout: 10000,

	// 所有源合并、按时间倒序后最多展示几篇
	edgeLimit: 40,

	// 兜底数据源：仅当所有边缘请求都失败时按顺序尝试
	// 主源为自定义域名，备用走 jsDelivr CDN（自带 CORS 头，可跨域兜底）
	dataUrls: [
		"https://circle-feed.5al.top/circle.json",
		"https://cdn.jsdelivr.net/gh/xingmihai/circle-feed@main/public/circle.json",
	],

	// 是否显示评论区
	showComment: false,
};
