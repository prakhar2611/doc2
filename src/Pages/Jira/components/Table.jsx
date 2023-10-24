import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Dev Assignee',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Dev Effort',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Dev StartDate',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Build DropDate',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
         Delete
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const Tables = () => <Table columns={columns} dataSource={data} />;
export default Tables;