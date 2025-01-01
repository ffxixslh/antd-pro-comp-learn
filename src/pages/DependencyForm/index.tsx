import {
  PageContainer,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const fakeData = () =>
  Promise.resolve([
    {
      id: 114,
      name: 'asdf',
    },
    {
      id: 514,
      name: 'zxcv',
    },
  ]);

type User = { name: string; id: number };

const Form = () => {
  const [users, setUsers] = useState<User[]>([]);
  return (
    <PageContainer
      header={{
        title: '联动表单',
      }}
    >
      <ProForm<User>
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
      >
        <ProFormSelect
          width="md"
          name="name"
          label="名称"
          placeholder="请选择名称"
          request={async () => {
            const data = await fakeData();
            setUsers(data);
            return data.map((item) => ({ label: item.name, value: item.name }));
          }}
        />
        {/*  ProFormDependency 会自动注入并且 进行 shouldUpdate 的比对  */}
        <ProFormDependency name={['name']}>
          {({ name }) => {
            return (
              <ProFormText
                width="md"
                label="id"
                name={'id'}
                fieldProps={{ value: users.find((u) => u.name === name)?.id }}
              />
            );
          }}
        </ProFormDependency>
      </ProForm>
    </PageContainer>
  );
};

export default Form;
