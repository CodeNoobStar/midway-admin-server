module.exports = {
	header: '变更日志',
	skip: {
		tag: true, // 跳过打标签
		commit: false, // 保留自动提交（更新 CHANGELOG 和 package.json）
		push: false, // 跳过自动推送
	},
	types: [
		{ type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
		{ type: 'style', section: '🎨 Styles | 风格' },
		{ type: 'feature', section: '✨ Features | 新功能' },
		{ type: 'prune', section: '✂️ Prune | 移除代码/文件' },
		{ type: 'ui', section: '💄 UI | 更新UI和样式文件' },
		{ type: 'docs', section: '📝 Documentation | 文档' },
		{ type: 'init', section: '🎉 Init | 初始化' },
		{ type: 'release', section: '🔖 Release | 发布版本' },
		{ type: 'wip', section: '🚧 WIP | 开发中的功能' },
		{ type: 'config', section: '🔧 Config | 配置文件变动' },
		{ type: 'merge', section: '🔀 Merge | 合并分支' },
		{ type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
		{ type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
		{ type: 'test', section: '✅ Tests | 测试' },
		{ type: 'revert', section: '⏪ Revert | 回退' },
		{ type: 'build', section: '📦 Build System | 打包构建' },
		{ type: 'update', section: '🚀 Update | 构建/工程依赖/工具升级' },
		{ type: 'tool', section: '🚀 Tool | 工具升级' },
		{ type: 'ci', section: '👷 Continuous Integration | CI 配置' },
		{ type: 'chore', section: '🔧 Chore | 构建过程或辅助工具的变动' },
	],
};
