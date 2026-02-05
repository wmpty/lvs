# 毛驴育种管理系统 (Donkey Breeding Management System)

## 🚀 快速开始 / Quick Start

**如何打开这个项目？只需三步：**

```bash
# 1. 安装依赖
npm install

# 2. 启动服务器
npm start

# 3. 打开浏览器访问
# http://localhost:3000
```

📘 **详细的中文快速入门指南**: [快速开始.md](快速开始.md)

---

## 项目简介 / Introduction

毛驴育种管理系统是一个全面的种驴养殖管理应用程序，集成了种驴基础信息、生产性能数据、疫病检测结果等多个模块，支持手机端实时录入与查询。

The Donkey Breeding Management System is a comprehensive application for managing donkey breeding operations, integrating basic donkey information, production performance data, disease detection results, and more modules, supporting real-time mobile data entry and queries.

## 功能特性 / Features

### 1. 种驴基础信息管理
- 品种登记 (Breed Registration)
- 血缘记录 (Bloodline Records)
- 健康状态跟踪 (Health Status Tracking)
- 基本信息维护 (Basic Information Maintenance)

### 2. 生产性能数据管理
- 配种记录 (Breeding Records)
- 产驹数统计 (Foal Count Statistics)
- 奶量记录 (Milk Production Records)
- 生产性能分析 (Production Performance Analysis)

### 3. 疫病防治管理
- 疫病检测记录 (Disease Detection Records)
- 疫苗接种管理 (Vaccination Management)
- 治疗记录追踪 (Treatment Record Tracking)
- 健康状况监控 (Health Monitoring)

### 4. 血统登记系统
- 三代血统登记 (Three-Generation Pedigree Registration)
- 血统查询 (Pedigree Query)
- 登记号管理 (Registration Number Management)

### 5. 档案管理
- 生产性能档案 (Production Performance Archives)
- 疫病防治档案 (Disease Prevention Archives)
- 血统登记档案 (Pedigree Registration Archives)

## 技术栈 / Technology Stack

- **后端 Backend**: Node.js + Express
- **数据库 Database**: SQLite
- **前端 Frontend**: HTML5 + CSS3 + JavaScript (原生)
- **支持设备 Supported Devices**: 移动端和桌面端 (Mobile & Desktop)

## 安装与运行 / Installation & Running

### 前置要求 / Prerequisites

- Node.js (版本 14.0 或更高 / version 14.0 or higher)
- npm (Node包管理器 / Node Package Manager)

### 安装步骤 / Installation Steps

1. 克隆仓库 / Clone the repository:
```bash
git clone https://github.com/wmpty/lvs.git
cd lvs
```

2. 安装依赖 / Install dependencies:
```bash
npm install
```

3. 启动服务器 / Start the server:
```bash
npm start
```

4. 访问应用 / Access the application:
打开浏览器访问 / Open browser and visit: `http://localhost:3000`

### 开发模式 / Development Mode

使用 nodemon 自动重启服务器 / Use nodemon for auto-restart:
```bash
npm run dev
```

## 使用说明 / User Guide

### 移动端访问 / Mobile Access

系统完全支持移动端访问，自动适配手机屏幕。在手机浏览器中输入服务器地址即可使用。

The system fully supports mobile access and automatically adapts to phone screens. Simply enter the server address in your mobile browser.

### 数据录入 / Data Entry

1. **添加种驴**: 点击"种驴信息"模块的"+ 添加种驴"按钮
2. **配种记录**: 在"配种记录"模块选择公驴和母驴，记录配种信息
3. **产驹登记**: 在"产驹记录"模块记录新生驹驴信息
4. **奶量记录**: 每日记录母驴的产奶量
5. **疫病检测**: 记录疫病检测和治疗信息
6. **疫苗接种**: 记录疫苗接种信息和下次接种时间
7. **血统登记**: 登记种驴的完整血统信息

### 数据查询 / Data Query

- **实时查询**: 所有数据支持实时查询和浏览
- **血统查询**: 在"血统登记"模块可查询种驴的三代血统
- **统计概览**: 首页显示系统关键数据统计

## 数据库结构 / Database Structure

系统使用SQLite数据库，包含以下数据表：

- `donkeys` - 种驴基础信息表
- `breeding_records` - 配种记录表
- `foal_records` - 产驹记录表
- `milk_production` - 奶量记录表
- `disease_records` - 疫病检测记录表
- `vaccination_records` - 疫苗接种记录表
- `pedigree` - 血统登记表

## API接口 / API Endpoints

### 种驴信息 / Donkey Information
- `GET /api/donkeys` - 获取所有种驴
- `GET /api/donkeys/:id` - 获取指定种驴
- `POST /api/donkeys` - 添加种驴
- `PUT /api/donkeys/:id` - 更新种驴信息

### 配种记录 / Breeding Records
- `GET /api/breeding-records` - 获取配种记录
- `POST /api/breeding-records` - 添加配种记录

### 产驹记录 / Foal Records
- `GET /api/foal-records` - 获取产驹记录
- `POST /api/foal-records` - 添加产驹记录

### 奶量记录 / Milk Production
- `GET /api/milk-production` - 获取奶量记录
- `POST /api/milk-production` - 添加奶量记录

### 疫病检测 / Disease Records
- `GET /api/disease-records` - 获取疫病记录
- `POST /api/disease-records` - 添加疫病记录

### 疫苗接种 / Vaccination Records
- `GET /api/vaccination-records` - 获取疫苗记录
- `POST /api/vaccination-records` - 添加疫苗记录

### 血统登记 / Pedigree
- `GET /api/pedigree/:donkeyId` - 查询血统信息
- `POST /api/pedigree` - 添加血统登记

### 统计数据 / Statistics
- `GET /api/statistics` - 获取系统统计数据

## 管理规范 / Management Standards

### 数据记录规范
1. 指定企业专人负责数据录入和维护
2. 配种、产驹等关键事件需及时录入系统
3. 每日记录奶量和健康状况
4. 定期进行疫病检测和疫苗接种
5. 新生驹驴需及时登记血统信息

### 档案管理规范
1. 定期导出数据进行备份
2. 定期抽查数据准确性
3. 妥善保管系统访问权限
4. 建立数据审核机制

## 项目结构 / Project Structure

```
lvs/
├── server.js           # 服务器主文件
├── database.js         # 数据库配置和初始化
├── package.json        # 项目依赖配置
├── README.md          # 项目文档
├── .gitignore         # Git忽略文件配置
└── public/            # 前端静态文件
    ├── index.html     # 主页面
    ├── styles.css     # 样式文件
    └── app.js         # 前端JavaScript
```

## 贡献指南 / Contributing

欢迎提交问题和拉取请求。对于重大更改，请先开issue讨论您想要更改的内容。

Welcome to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 许可证 / License

MIT License

## 联系方式 / Contact

如有问题或建议，请通过GitHub Issues联系。

For questions or suggestions, please contact via GitHub Issues.