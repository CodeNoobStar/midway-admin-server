const fs = require('fs');
const path = require('path');

function firstCharToUpperCase(str) {
  return str[0].toUpperCase() + str.substring(1);
}

// 只使用一个参数作为目录名
const [dir, shortName, desc] = process.argv.slice(2, 5);

if (!dir) {
  console.log('请输入文件夹名称');
  process.exit();
}

if (!shortName) {
  console.log('请输入表名前缀');
  process.exit();
}

if (!desc) {
  console.log('请输入模块描述');
  process.exit();
}

// 直接在 src 下创建目录
const basePath = path.resolve(__dirname, `../src/module/${dir}`);
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

// 创建子目录
const subDirs = ['controller', 'service', 'entity', 'dto', 'vo'];
subDirs.forEach(subDir => {
  const subDirPath = path.resolve(basePath, subDir);
  if (!fs.existsSync(subDirPath)) {
    fs.mkdirSync(subDirPath, { recursive: true });
  }
});

// 读取模板文件
let controllerContent = fs
  .readFileSync(path.resolve(__dirname, './template/controller.template'))
  .toString();

let serviceContent = fs
  .readFileSync(path.resolve(__dirname, './template/service.template'))
  .toString();

let entityContent = fs
  .readFileSync(path.resolve(__dirname, './template/entity.template'))
  .toString();

let dtoContent = fs
  .readFileSync(path.resolve(__dirname, './template/dto.template'))
  .toString();

let pageDtoContent = fs
  .readFileSync(path.resolve(__dirname, './template/page-dto.template'))
  .toString();

let voContent = fs
  .readFileSync(path.resolve(__dirname, './template/vo.template'))
  .toString();

let pageVoContent = fs
  .readFileSync(path.resolve(__dirname, './template/page-vo.template'))
  .toString();

let name;
const filename = dir;
let varName = dir;
let tableName = dir;
const route = dir;

if (dir.includes('-')) {
  name = dir
    .split('-')
    .map(o => firstCharToUpperCase(o))
    .join('');

  varName = dir
    .split('-')
    .filter((_, index) => index > 0)
    .map(o => firstCharToUpperCase(o))
    .join('');
  varName = [dir.split('-')[0], varName].join('');

  tableName = dir.replace(/\./g, '_');
} else {
  name = dir[0].toUpperCase() + dir.substring(1);
}

// 替换模板内容
controllerContent = controllerContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName)
  .replace(/\$4/g, route)
  .replace(/\$5/g, desc);

serviceContent = serviceContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName);

entityContent = entityContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName)
  .replace(/\$4/g, tableName)
  .replace(/\$5/g, shortName);

dtoContent = dtoContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName);

pageDtoContent = pageDtoContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName);

voContent = voContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName);

pageVoContent = pageVoContent
  .replace(/\$1/g, name)
  .replace(/\$2/g, filename)
  .replace(/\$3/g, varName);

// 写入文件
fs.writeFileSync(
  path.resolve(basePath, `controller/${dir}.ts`),
  controllerContent
);

fs.writeFileSync(
  path.resolve(basePath, `service/${dir}.ts`),
  serviceContent
);

fs.writeFileSync(
  path.resolve(basePath, `entity/${dir}.ts`),
  entityContent
);

fs.writeFileSync(
  path.resolve(basePath, `dto/${dir}.ts`),
  dtoContent
);

fs.writeFileSync(
  path.resolve(basePath, `dto/${dir}-page.ts`),
  pageDtoContent
);

fs.writeFileSync(
  path.resolve(basePath, `vo/${dir}.ts`),
  voContent
);

fs.writeFileSync(
  path.resolve(basePath, `vo/${dir}-page.ts`),
  pageVoContent
);
