# 福泽堂 MVU 前端状态栏 · 配置说明

## 一、前提条件

在使用此状态栏之前，你的世界书中必须已经配置好以下 MVU 相关条目：

| 条目名 | 你的世界书中 | 状态 |
|--------|-------------|------|
| `[initvar]变量初始化勿开` | UID=219938 | ✅ 已有（确保 **关闭/Disable**） |
| `变量列表` | UID=505280 | ✅ 已有 |
| `[mvu_update]变量更新规则` | UID=748985 | ✅ 已有 |
| `[mvu_update]变量输出格式` | UID=656468 | ✅ 已有 |
| `[mvu_update]变量输出格式强调` | UID=349747 | ✅ 已有 |

这些条目已经在你的世界书中正确配置，无需额外修改。

---

## 二、添加状态栏到世界书

### 步骤 1：创建新的世界书条目

在 SillyTavern 的世界书中，新建一个条目：

- **条目名 / Comment**：`前端状态栏` （或任意你喜欢的名称）
- **内容 / Content**：将 `status-bar.html` 的完整 HTML 代码粘贴进去

### 步骤 2：配置条目属性

| 属性 | 设置值 | 说明 |
|------|--------|------|
| **位置 / Position** | `作为关键条目始终注入` (Always On) | 状态栏需要始终显示 |
| **启用 / Enabled** | ✅ 开启 | - |
| **前端界面 / Render as HTML** | ✅ 勾选 | **关键！** 必须勾选此选项才能渲染为前端界面 |

> **最关键的一步**：在条目设置中，找到 **"前端界面"** 或 **"Render as HTML in message"** 选项并**勾选**。这会让 SillyTavern 把这段 HTML 以 iframe 的形式嵌入到消息楼层中渲染，而不是作为纯文本。

### 步骤 3：确认 `<StatusPlaceHolderImpl/>` 输出

你的世界书中 `[mvu_update]变量输出格式强调` 条目已经包含了 `<StatusPlaceHolderImpl/>`：

```yaml
变量输出格式强调:
  rule:
    - The following must be inserted to the end of reply, and cannot be omitted.
    - DO NOT wrap it with markdown code blocks (like ```xml). Output raw text directly.
  format: |-
    <StatusPlaceHolderImpl/>
    <UpdateVariable>
    ...
    </UpdateVariable>
```

AI 每次回复末尾输出的 `<StatusPlaceHolderImpl/>` 会被 MVU 框架替换为状态栏的前端界面，所以这个条目确保了状态栏会出现在每条 AI 回复的末尾。

---

## 三、状态栏展示的变量

状态栏读取的变量全部来自 MVU 的 `stat_data`，对应你的初始变量结构：

```
stat_data
├── 世界状态
│   ├── 当前时间        → 显示为"时辰"
│   ├── 当前地点        → 显示为"所在"
│   ├── 今日黄历        → 顶部黄历栏
│   ├── 暗骰点数        → 显示为"暗骰"
│   └── 在场人物        → 以标签形式列出在场人物
├── 福泽堂
│   ├── 经营时间        → 显示为"苟活第 X 天"
│   ├── 完成单数        → 显示为"完成单数"
│   └── 库房            → 以标签形式列出，hover 显示描述
├── 袁枚
│   └── 七宝收集进度    → 进度条（0/6）
└── 主线
    └── 是否开启        → 主线状态提示
```

---

## 四、常见问题

### Q: 状态栏没有显示？
1. 确认条目设置为 **"Always On"（始终注入）**
2. 确认勾选了 **"前端界面 / Render as HTML"**
3. 确认 MVU 变量框架的脚本已经正常运行（`waitGlobalInitialized('Mvu')` 依赖 MVU 脚本先初始化）

### Q: 变量没有更新？
代码中已经监听了 `Mvu.events.VARIABLE_UPDATE_ENDED` 事件，变量更新后会自动刷新显示。如果没有更新：
1. 检查变量更新规则条目是否正常启用
2. 检查 AI 回复末尾是否正确输出了 `<UpdateVariable>` 块

### Q: 状态栏默认是折叠的，可以改为默认展开吗？
修改 HTML 中两处：
1. 将 `.fzt-body` 的 CSS 从 `display: none` 改为 `display: block`
2. 将 HTML 中的 `[ 点击展开 ]` 改为 `[ 点击收起 ]`
