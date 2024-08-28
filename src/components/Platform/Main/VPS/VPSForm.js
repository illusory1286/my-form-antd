import React from 'react'
import { Button, Form, Input, Select } from 'antd';
import PropTypes from "prop-types"

const { TextArea } = Input;
// 提交表單，表單內容
console.log(Input)
export const VPSForm = ({ onCancel ,form,onSubmit}) => {
  const onFinish = (values) => {
    console.log('Form values:', values);
    onSubmit(values); // 将表单数据传递给父组件
    // 处理提交邏輯
    onCancel(); // 提交完成後關閉表單
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const vpsFormCancel=()=>{
    onCancel();
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout='vertical'>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your VPS Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="VPS"
          name="vps"
          rules={[
            {
              required: true,
              message: 'Please input your VPS IP',
            },
          ]}
        >
          <Select>
            <Select.Option value="IBM">IBM</Select.Option>
            <Select.Option value="GCP">GCP</Select.Option>         
            <Select.Option value="AWS">AWS</Select.Option>         
          </Select>

        </Form.Item>

        <Form.Item
          label="Token ID"
          name="token id"
          rules={[
            {
              required: true,
              message: 'Please input your VPS IP',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Token"
          name="token"
          rules={[
            {
              required: true,
              message: 'Please input your VPS IP',
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            htmlType="button"
            style={{ marginRight: '8px' }} // 添加間距
            onClick={vpsFormCancel}
          >Cancel  
          </Button>
          <Button
            type='primary'
            htmlType="submit"
          >Create  
          </Button>
        </div>
      </Form>

    </>
  );
}

VPSForm.propTypes = {
  onCancel:PropTypes.func.isRequired,
  form:PropTypes.object.isRequired,
  onSubmit:PropTypes.func.isRequired,
};


