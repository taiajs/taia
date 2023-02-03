import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

interface Create<T, K> {
  params: T & K;
  callback: () => void;
}
interface Read<T> {
  params?: string;
  callback: (params: T[]) => void;
}
interface Custom {
  params?: string;
  type?: 'getAllTableName';
}
interface Update<T, K> {
  params: T & K;
  callback: () => void;
}
interface Deletes {
  id: string;
  callback: () => void;
}

type BaseTableType = {
  id?: number;
  obsolete?: number;
};

// 每个表一定有obsolete字段来做逻辑删除，0表示没有删除，1表示删除到回收站，1表示永久删除
export default class BaseTable<T> {
  db;
  tableName;
  field;
  constructor(parameters: { tableName: string; field: string[] }) {
    this.tableName = parameters.tableName;
    this.field = parameters.field;
    this.db = this.openDatabase();
    this.createTable();
  }
  openDatabase() {
    if (Platform.OS === 'web') {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
    const db = SQLite.openDatabase('db.db');
    return db;
  }
  createTable() {
    this.db.transaction(
      (tx) => {
        const defaultField = [
          'id integer primary key not null',
          // 废弃状态 0 正常存在 1 回收站可看 2 用户不可看
          'obsolete int',
        ];
        const field = [...defaultField, ...this.field];
        tx.executeSql(
          `create table if not exists ${this.tableName} (${field.join(', ')});`,
          [],
          () => {},
          (error) => {
            console.log('createTable失败', error);
            return false;
          },
        );
      },
      (error) => {
        console.log('创建表失败', error);
      },
      () => {},
    );
  }
  // 增加数据
  create({ params, callback }: Create<T, BaseTableType>) {
    const keys = Object.keys(params).join(', ');
    const keysMap = Object.keys(params)
      .map(() => '?')
      .join(', ');
    const values = Object.values(params);
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into ${this.tableName} (obsolete, ${keys}) values (0, ${keysMap})`,
          values,
          () => {
            callback();
          },
        );
      },
      () => {
        console.log('create失败');
      },
    );
  }
  // 删除数据
  deletes({ id, callback }: Deletes) {
    this.db.transaction(
      (tx) => {
        tx.executeSql(`update ${this.tableName} set obsolete = 1 where id = ?;`, [id], () => {
          callback();
        });
      },
      () => {
        console.log('deletes失败');
      },
    );
  }
  // 更新数据
  update({ params, callback }: Update<T, BaseTableType>) {
    const { id, ...rest } = params;
    const str = JSON.stringify(rest)
      .replace('{', '')
      .replace('}', '')
      .replace(new RegExp(':', 'gm'), ' = ');
    this.db.transaction(
      (tx) => {
        const strSql = `update ${this.tableName} set ${str} where id = ?;`;
        console.log(strSql);
        tx.executeSql(strSql, [Number(id)], () => {
          callback();
        });
      },
      (res) => {
        console.log('update失败', res);
      },
    );
  }
  // 查数据
  read({ params, callback }: Read<T>) {
    const where = params ? `and ${params}` : '';
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from ${this.tableName} where obsolete = 0 ${where};`,
          [],
          (_, { rows: { _array } }) => {
            if (callback) {
              callback(_array);
            }
          },
        );
      },
      () => {
        console.log('read失败');
      },
    );
  }
  custom({ params = '', type }: Custom = {}) {
    const cmd = {
      getAllTableName: "SELECT name _id FROM sqlite_master WHERE type ='table'",
    };
    const newParams = type ? cmd[type] : params;
    this.db.transaction(
      (tx) => {
        tx.executeSql(newParams, []);
      },
      () => {
        console.log('custom失败');
      },
    );
  }
}
