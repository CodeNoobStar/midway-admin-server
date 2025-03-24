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

### 模块化开发模板 script

命令执行

```js
 node ./script/create-module 模块名称
```

## 自增ID

雪花算法（Snowflake Algorithm）是一种用于生成全局唯一标识符（Unique Identifier）的算法，最初由Twitter开发并开源。它主要用于分布式系统中，以解决在分布式环境下生成唯一ID的需求。
雪花算法原理就是生成一个的64位比特位的 long 类型的唯一 id。

最高1位固定值0，没有意义。
接下来41位存储毫秒级时间戳，2^41/(1000606024365)=69，大概可以使用69年。
再接下10位存储机器码，包括5位 datacenterId 和5位 workerId。最多可以部署2^10=1024台机器。
最后12位存储序列号。同一毫秒时间戳时，通过这个递增的序列号来区分。即对于同一台机器而言，同一毫秒时间戳下，可以生成2^12=4096个不重复 id。

```js
import { env } from 'process';

export class SnowFlake {
  // 系统上线的时间戳，我这里设置为 2023-06-22 00:00:00 的时间戳
  epoch = BigInt(1687392000000);

  // 数据中心的位数
  dataCenterIdBits = 5;
  // 机器id的位数
  workerIdBits = 5;
  // 自增序列号的位数
  sequenceBits = 12;

  // 最大的数据中心id 这段位运算可以理解为2^5-1 = 31
  maxDataCenterId = (BigInt(1) << BigInt(this.workerIdBits)) - BigInt(1);
  // 最大的机器id 这段位运算可以理解为2^5-1 = 31
  maxWorkerId = (BigInt(1) << BigInt(this.workerIdBits)) - BigInt(1);

  // 时间戳偏移位数
  timestampShift = BigInt(
    this.dataCenterIdBits + this.workerIdBits + this.sequenceBits
  );

  // 数据中心偏移位数
  dataCenterIdShift = BigInt(this.workerIdBits + this.sequenceBits);
  // 机器id偏移位数
  workerIdShift = BigInt(this.sequenceBits);
  // 自增序列号的掩码
  sequenceMask = (BigInt(1) << BigInt(this.sequenceBits)) - BigInt(1);
  // 记录上次生成id的时间戳
  lastTimestamp = BigInt(-1);
  // 数据中心id
  dataCenterId = BigInt(0);
  // 机器id
  workerId = BigInt(0);
  // 自增序列号
  sequence = BigInt(0);
  constructor(dataCenterId: number, workerId: number) {
    // 校验数据中心 ID 和工作节点 ID 的范围
    if (dataCenterId > this.maxDataCenterId || dataCenterId < 0) {
      throw new Error(
        `Data center ID must be between 0 and ${this.maxDataCenterId}`
      );
    }

    if (workerId > this.maxWorkerId || workerId < 0) {
      throw new Error(`Worker ID must be between 0 and ${this.maxWorkerId}`);
    }

    this.dataCenterId = BigInt(dataCenterId);
    this.workerId = BigInt(workerId);
  }

  nextId() {
    let timestamp = BigInt(Date.now());
    // 如果上一次生成id的时间戳比下一次生成的还大，说明服务器时间有问题，出现了回退，这时候再生成id，可能会生成重复的id，所以直接抛出异常。
    if (timestamp < this.lastTimestamp) {
      // 时钟回拨，抛出异常并拒绝生成 ID
      throw new Error('Clock moved backwards. Refusing to generate ID.');
    }

    // 如果当前时间戳和上一次的时间戳相等，序列号加一
    if (timestamp === this.lastTimestamp) {
      // 同一毫秒内生成多个 ID，递增序列号，防止冲突
      this.sequence = (this.sequence + BigInt(1)) & this.sequenceMask;
      if (this.sequence === BigInt(0)) {
        // 序列号溢出，等待下一毫秒
        timestamp = this.waitNextMillis(this.lastTimestamp);
      }
    } else {
      // 不同毫秒，重置序列号
      this.sequence = BigInt(0);
    }

    this.lastTimestamp = timestamp;

    // 组合各部分生成最终的 ID，可以理解为把64位二进制转换位十进制数字
    const id =
      ((timestamp - this.epoch) << this.timestampShift) |
      (this.dataCenterId << this.dataCenterIdShift) |
      (this.workerId << this.workerIdShift) |
      this.sequence;

    return id.toString();
  }

  waitNextMillis(lastTimestamp) {
    let timestamp = BigInt(Date.now());
    while (timestamp <= lastTimestamp) {
      // 主动等待，直到当前时间超过上次记录的时间戳
      timestamp = BigInt(Date.now());
    }
    return timestamp;
  }
}

// 如果有pm_id，把pm_id当机器id传进去
export const snowFlake = new SnowFlake(0, +env.pm_id || 0);

```

-> 雪花算法
