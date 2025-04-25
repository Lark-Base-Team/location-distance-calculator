# 地理位置距离计算 (Location Distance Calculator)

这是一个为[飞书多维表格](https://feishu.cn/product/base)设计的插件，用于计算两个指定地理位置字段之间的距离和预估时间。

## ✨ 功能特性

- **选择数据表:** 用户可以选择当前 Base 中的任意数据表。
- **选择起点和终点:** 用户需要指定两个「地理位置」类型的字段作为计算的起点和终点。
- **多种计算模式:** 支持计算两点间的：
  - 直线距离
  - 驾车路线距离和时间
  - 步行路线距离和时间
  - 骑行路线距离和时间
  - 公交路线距离和时间 (需要指定城市)
- **选择输出字段:** 用户可以选择两个「数字」类型的字段，分别用于写入计算出的距离（单位：公里）和时间（单位：分钟）。输出距离和时间字段至少需要选择一个。
- **自动计算与填充:** 插件会遍历所选表格中的所有记录，根据选定的模式计算距离和时间，并将结果自动填充到指定的输出字段中。
- **使用高德地图 API:** 插件通过调用高德地图 Web 服务 API 来获取距离和路线信息。
- **自定义 API Key:** 支持用户在插件界面输入自己的高德地图 Web 服务 API Key，优先使用用户提供的 Key，若不提供则使用插件内置 Key（内置 Key 有调用次数限制）。

## 📋 示例与指南

- **示例多维表格:** [点击查看](https://lq0ffyd8fx.feishu.cn/base/HXBtbSS8zaERQ2svkfHcf2RsnTb?table=tblCe0djHFc8Kwen&view=vewHR920NB)
- **使用指南:** [「地理位置距离计算」插件使用指南](https://fexakcngwi.feishu.cn/docx/TDb1dc7uIoD4IXx0QYHcn7yQnxb)

## 🛠️ 开发

- **主要入口文件:** `src/runUIBuilder.tsx` (基于 [UIBuilder](https://lark-base-team.github.io/js-sdk-docs/zh/guide/ui-builder/) 构建界面)。
- **核心逻辑:** 在 `runUIBuilder.tsx` 中实现与多维表格 API (`@lark-base-open/js-sdk`) 的交互、调用高德地图 API 以及距离/时间计算逻辑。
- **城市数据:** `src/CityCodes.ts` 包含城市代码信息 (当前未完全启用)。
- **国际化:** `src/i18n/` 目录用于支持多语言。

**注意:**

- 高德地图 API Key 当前硬编码在 `src/runUIBuilder.tsx` 中。为了安全和灵活性，建议后续修改为用户可配置的方式。
- 内置的高德地图 API Key 有调用次数限制。如果遇到 API 错误或需要更高频率的调用，建议使用自己的 API Key。
- 了解更多关于飞书多维表格插件开发，请查阅 [官方 JS SDK 文档](https://lark-base-team.github.io/js-sdk-docs/zh/)。

## TODO

1.  增加更多的计算模式或选项。
2.  优化错误处理和用户提示。
3.  完善 `CityCodes.ts` 的使用或移除。
