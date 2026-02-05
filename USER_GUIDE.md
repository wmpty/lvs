# 毛驴育种管理系统 - 部署与使用指南
# Donkey Breeding Management System - Deployment & User Guide

## 快速开始 / Quick Start

### 1. 安装依赖 / Install Dependencies
```bash
npm install
```

### 2. 启动服务器 / Start Server
```bash
npm start
```

### 3. 访问系统 / Access System
打开浏览器访问: `http://localhost:3000`

## 系统功能 / System Features

### 📊 数据统计 / Statistics Dashboard
实时显示以下统计数据:
- 种驴总数 (Total Donkeys)
- 公驴/母驴数量 (Male/Female Count)
- 配种次数 (Breeding Count)
- 产驹总数 (Foal Count)

### 🐴 种驴基础信息管理 / Basic Donkey Information
**录入内容:**
- 名称 (Name)
- 品种 (Breed): 如德州驴、关中驴、泌阳驴等
- 性别 (Gender): 公/母
- 出生日期 (Birth Date)
- 血缘 (Bloodline)
- 健康状态 (Health Status): 健康/良好/需观察/治疗中
- 备注 (Remarks)

**操作:**
1. 点击"+ 添加种驴"按钮
2. 填写表单信息
3. 点击"保存"

### 💕 配种记录管理 / Breeding Records
**录入内容:**
- 选择公驴 (Select Male Donkey)
- 选择母驴 (Select Female Donkey)
- 配种日期 (Breeding Date)
- 配种方式 (Method): 自然配种/人工授精
- 成功状态 (Success Status): 待确认/成功
- 备注 (Remarks)

**操作:**
1. 点击"+ 添加配种记录"
2. 从下拉列表选择公驴和母驴
3. 填写配种详情
4. 保存记录

### 🍼 产驹记录管理 / Foal Birth Records
**录入内容:**
- 母驴 (Mother Donkey)
- 公驴 (Father Donkey)
- 驹驴 (Foal - 如已登记)
- 出生日期 (Birth Date)
- 出生体重 (Birth Weight in kg)
- 健康状况 (Health Condition)
- 备注 (Remarks)

**操作:**
1. 点击"+ 添加产驹记录"
2. 选择父母信息
3. 记录新生驹驴详情
4. 保存记录

### 🥛 奶量记录管理 / Milk Production
**录入内容:**
- 选择母驴 (Select Female Donkey)
- 记录日期 (Record Date)
- 早上产奶量 (Morning Amount in L)
- 下午产奶量 (Afternoon Amount in L)
- 晚上产奶量 (Evening Amount in L)
- 质量等级 (Quality Grade): 优/良/中
- 备注 (Remarks)

**自动计算:**
系统自动计算当日总产奶量

**操作:**
1. 每日点击"+ 添加奶量记录"
2. 选择母驴并录入各时段产奶量
3. 保存记录

### 💊 疫病检测管理 / Disease Detection
**录入内容:**
- 选择种驴 (Select Donkey)
- 检测日期 (Detection Date)
- 疾病名称 (Disease Name)
- 检测结果 (Result): 阴性/阳性/待复查
- 治疗方案 (Treatment Plan)
- 治疗日期 (Treatment Date)
- 康复状态 (Recovery Status): 治疗中/好转/已康复
- 备注 (Remarks)

**操作:**
1. 点击"+ 添加检测记录"
2. 记录疫病检测详情
3. 后续更新治疗进展

### 💉 疫苗接种管理 / Vaccination Records
**录入内容:**
- 选择种驴 (Select Donkey)
- 疫苗名称 (Vaccine Name)
- 接种日期 (Vaccination Date)
- 下次接种日期 (Next Vaccination Date)
- 批次号 (Batch Number)
- 接种人员 (Administrator)
- 备注 (Remarks)

**操作:**
1. 点击"+ 添加接种记录"
2. 记录疫苗接种信息
3. 设置下次接种提醒日期

### 📜 血统登记管理 / Pedigree Registration
**录入内容:**
- 种驴 (Donkey)
- 父亲 (Father)
- 母亲 (Mother)
- 祖父(父系) (Grandfather - Paternal)
- 祖母(父系) (Grandmother - Paternal)
- 祖父(母系) (Grandfather - Maternal)
- 祖母(母系) (Grandmother - Maternal)
- 登记号 (Registration Number)
- 登记日期 (Registration Date)
- 备注 (Remarks)

**操作:**
1. 点击"+ 添加血统登记"完成新登记
2. 使用查询功能查看已登记的血统信息
3. 系统自动生成三代血统树状图

## 移动端使用 / Mobile Usage

系统完全支持移动设备访问:
1. 使用手机浏览器访问服务器地址
2. 界面自动适配手机屏幕
3. 支持触摸操作
4. 所有功能与桌面版一致

## 数据管理规范 / Data Management Standards

### 日常操作规范
1. **专人负责**: 指定企业专人负责系统数据录入和维护
2. **及时录入**: 配种、产驹等关键事件发生后应立即录入
3. **每日记录**: 奶量和健康状况需每日记录
4. **定期检测**: 按计划进行疫病检测和疫苗接种
5. **血统登记**: 新生驹驴应及时完成血统登记

### 档案管理规范
1. **定期备份**: 建议每周备份数据库文件 `donkey_breeding.db`
2. **数据审核**: 每月抽查数据准确性
3. **权限管理**: 妥善保管系统访问权限
4. **存档要求**: 重要记录打印存档

## 数据备份 / Data Backup

数据库文件位置: `donkey_breeding.db`

**备份方法:**
```bash
# 停止服务器
# 复制数据库文件
cp donkey_breeding.db donkey_breeding_backup_$(date +%Y%m%d).db
```

## 故障排除 / Troubleshooting

### 服务器无法启动
1. 检查端口3000是否被占用
2. 确认已安装所有依赖 `npm install`
3. 查看错误日志

### 无法访问系统
1. 确认服务器正在运行
2. 检查防火墙设置
3. 确认浏览器地址正确

### 数据无法保存
1. 检查数据库文件权限
2. 确认磁盘空间充足
3. 查看服务器日志

## 技术支持 / Technical Support

如遇问题，请通过GitHub Issues提交反馈。

## 系统要求 / System Requirements

- Node.js 14.0 或更高版本
- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 建议使用SSD存储以提升性能
- 移动设备支持iOS Safari和Android Chrome
