# my_midway_project

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。

[midway]: https://midwayjs.org

## swagger

访问地址

- UI: http://127.0.0.1:7001/swagger-ui/index.html
- JSON: http://127.0.0.1:7001/swagger-ui/index.json

### 集成

- husky
    - git commit 提交规范
- commitlint
    - commit
    - 会在您提交代码时检查提交信息的格式和内容，如果不符合规则，会阻止提交代码
- commitizen
    - commit 提交规范
    - 会引导您输入提交信息，并根据您输入的信息自动生成符合规则的提交信息
- lint-staged
    - 只检查已暂存的文件
    - 会在您提交代码时检查您暂存的文件的格式和内容，如果不符合规则，会阻止提交代码
- prettier
    - 格式化代码
    - 会在您提交代码时自动格式化您的代码
- eslint
    - 检查代码格式
    - 会在您提交代码时检查您的代码格式，如果不符合规则，会阻止提交代码
- swagger
    - 自动生成 api 文档
- apidoc
    - 自动生成 api 文档
