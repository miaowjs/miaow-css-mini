# miaow-css-mini

> Miaow的CSS压缩工具,对[clean-css](https://www.npmjs.com/package/clean-css)进行了简单的封装

## 使用说明

### 安装

```
npm install miaow-css-mini --save-dev
```

### 在项目的 miaow.config.js 中添加模块的 tasks 设置

```javascript
//miaow.config.js
module: {
  tasks: [
    {
      test: /\.js$/,
      plugins: ['miaow-css-mini']
    }
  ]
}
```

### 参数说明

* 传递的所有参数都是压缩配置, 具体可以参考[clean-css的说明](https://www.npmjs.com/package/clean-css#how-to-use-clean-css-programmatically)
