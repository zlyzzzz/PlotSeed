# PlotSeed：GitHub 与 Render 部署

完成 Render 上线。

## 上传 GitHub

创建私有仓库，例如 plotseed。将本目录里的文件上传到仓库根目录，确保 package.json、server 和 src 在同一级。不要仅上传 ZIP；不要上传 .env、node_modules 或 dist。保留 .gitignore、.node-version 等点文件。

## 创建 Render 服务

选择 New → Web Service，连接 GitHub 仓库，选择 Node 运行环境。

- Root Directory：源码在仓库根目录时留空。
- Build Command：`npm ci && npm run build`
- Start Command：`npm start`
- Health Check Path：`/api/health`
- 实例：测试时可选 Free；免费服务空闲后会休眠，再次访问需要唤醒。

.node-version 选择 Node.js 22。前端和后端由同一个服务提供，无需单独创建静态站点。

## 环境变量

在 Render 的 Environment 页面添加：

- HOST：`0.0.0.0`（公网访问必须）
- NODE_ENV：`production`
- LLM_PROVIDER：`deepseek`
- DEEPSEEK_MODEL：`deepseek-flash`（按账户实际可用模型调整）
- DEEPSEEK_API_KEY：私下填写真实密钥

PORT 使用 Render 自动提供的值，不要照搬本机配置的 3001。不要整体导入本机 .env，按上面项目逐个配置。密钥不能写入源码、GitHub 或聊天。修改环境变量后重新部署。

## 验证

部署后使用平台提供的 HTTPS 地址，依次确认：

1. /api/health 返回 generationReady=true。这只确认配置存在，不代表模型实际可用。
2. 手机移动网络与电脑均能完成真实故事生成；分别测试 guided 和 free。
3. My stories 返回、继续、删除恢复、编辑返回总览和 Word 下载正常。
4. 服务重启后、免费版休眠唤醒后再次测试生成。

DeepSeek 繁忙、余额不足或密钥无效要根据提示处理，换平台不能保证消除上游故障。

## 记录与评估

更换网址不会迁移旧站 localStorage 记录；请先在旧站导出 Word 或 JSON。本包没有 JSON 导入或云端同步。

实验问卷单独制作。正式实验应固定界面、候选池、模型和参数；用时和 Skip 次数不等于认知负荷测量。

## 官方说明

- https://render.com/docs/deploy-node-express-app
- https://render.com/docs/web-services
- https://render.com/docs/configure-environment-variables
- https://render.com/docs/free
