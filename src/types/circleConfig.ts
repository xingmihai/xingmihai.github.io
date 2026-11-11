// 圈子页面配置
// 用于聚合展示朋友们博客的最新文章
//
// 主链路：页面运行时按 friendsConfig 里 circle: true 的友链，
// 逐条请求边缘函数 ?url=<rss>，在浏览器里合并排序。
// 边缘函数全失败时，回退到 dataUrls 里的静态 circle.json。

// 抓取到的单篇文章
export type CircleItem = {
	title: string; // 文章标题
	link: string; // 文章链接
	published: string; // 发布日期原文
	timestamp: number; // 发布日期时间戳（用于排序，解析失败为 0）
	sourceName: string; // 来源站点名称
	sourceAvatar?: string; // 来源站点头像
	sourceSite: string; // 来源站点主页
};

// 数据源中描述的订阅源
export type CircleSourceMeta = {
	name: string; // 站点名称
	site: string; // 站点主页
	avatar?: string; // 站点头像
	feedUrl?: string; // 实际使用的订阅源地址
	ok: boolean; // 本次是否抓取成功
};

// 数据源返回的完整结构
export type CirclePayload = {
	updatedAt: string; // 数据更新时间（ISO 字符串）
	sourceCount: number; // 订阅源总数
	sources: CircleSourceMeta[]; // 各订阅源状态
	items: CircleItem[]; // 文章列表，按时间倒序
	failures: { name: string; error: string }[]; // 抓取失败的站点
};

export type CirclePageConfig = {
	title?: string; // 页面标题，留空则使用默认标题
	description?: string; // 页面描述，留空则使用默认描述

	/** 边缘函数 base 地址（含路径，末尾斜杠可有可无），例如 https://rss.5al.top/ */
	edgeBase?: string;
	/** 单个订阅源请求的超时时间（毫秒），默认 10000 */
	edgeTimeout?: number;
	/** 合并后最多展示几篇文章，默认 40 */
	edgeLimit?: number;

	/**
	 * 兜底数据源，按顺序尝试，取第一个可用的
	 * 仅当所有边缘请求都失败时才会用到
	 */
	dataUrls?: string[];

	// 是否显示评论区，默认 false
	showComment?: boolean;
};
