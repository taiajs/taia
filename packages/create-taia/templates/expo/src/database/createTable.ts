import BaseTable from './index';

export interface Example {
  str: string;
}
export const example = new BaseTable<Example>({
  tableName: 'table_example',
  field: ['str text'],
});
