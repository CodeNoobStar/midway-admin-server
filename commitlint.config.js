module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'fix', // 修复 Bug
				'style', // 改进代码的结构/格式
				'feature', // 引入新特性
				'prune', // 移除代码/文件
				'ui', // 更新UI和样式文件
				'docs', // 写文档
				'init', // 初始化提交
				'release', // 发布版本
				'wip', // 正在进行中的工作
				'config', // 修改配置文件
				// 'poo', // 完成功能但需要优化的代码
				'merge', // 合并分支
			],
		],
		'subject-empty': [0],
		'type-empty': [2, 'never'],
		// 'body-leading-blank': [0], // 禁用正文必须以空行开头的检查
		// 'type-case': [0], //type 的输入格式,默认为小写‘lower-case’
		// 'type-empty': [0], //type 是否可为空
		// 'scope-empty': [0], //scope 是否为空
		// 'scope-case': [0], //scope 的格式,默认为小写‘lower-case’
		// 'subject-full-stop': [0, 'never'], //subject 结尾符,默认为.
		// 'subject-case': [0, 'never'], //subject 的格式，默认其中之一：['sentence-case', 'start-case', 'pascal-case', 'upper-case']
		// 'header-max-length': [0, 'always', 72], //header 最大长度，默认为72字符
	},
};
