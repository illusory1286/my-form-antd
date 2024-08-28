import React from 'react';
import { Form, Input, Button  } from 'antd';
import PropTypes from 'prop-types'; // 添加這行

export const TargetForm = ({ onCancel,form ,onSubmit}) => {

  const onFinish = (values) => {
    console.log('Form values:', values);
    onSubmit(values); // 将表单数据传递给父组件
    // 處理表單提交
    onCancel(); // 提交完成後關閉表單
  };

  const targetFormCancel=()=>{
    onCancel();
  };


  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="IP"
        name="ip"
        rules={[{ required: true, message: 'Please input the IP!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <Button 
            htmlType='button' 
            onClick={targetFormCancel}
            style={{margin:'0 5px'}}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

TargetForm.propTypes = {
  onCancel:PropTypes.func.isRequired,
  form:PropTypes.object.isRequired,
  onSubmit:PropTypes.func.isRequired,
};