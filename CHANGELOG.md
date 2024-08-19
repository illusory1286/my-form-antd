# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- 新增用戶登入功能在 `LoginForm.js` 中。
- 在 `Dashboard.js` 中新增用戶活動追踪功能。

### Changed
- 重構了 `App.js` 中的路由邏輯以支援動態路由。

### Fixed
- 修復了 `LoginPage.js` 中無法正確顯示錯誤訊息的問題。

### Removed
- 移除了 `Test.js` 中的過時測試代碼。

## [1.0.1] - 2024-08-16
### Added
- 在 `Sidebar.js` 中新增了用戶設定頁面的鏈接。

### Fixed
- 修復了在 `Todo.js` 中當列表項目過多時顯示錯誤的問題。
- 修正了 `index.js` 中因為錯誤路徑導致應用程序無法啟動的問題。

## [1.0.0] - 2024-08-01
### Added
- 初始版本發布。
- 包含用戶登入、待辦事項管理、和主頁顯示功能。
- `LoginForm.js`, `Todo.js`, `AppHeader.js` 等核心組件初始實現。

