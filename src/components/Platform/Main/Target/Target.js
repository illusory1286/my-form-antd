import React, { useState,useEffect } from 'react';
import { Table, Button, Input, Form, Modal  } from 'antd';
import '../Todo.css';
import { TargetForm } from './TargetForm';


export const Target = () => {
  const [todos, setTodos] = useState([]);// 管理Todo項目列表
  const [editingTodo, setEditingTodo] = useState(null);// 管理編輯狀態
  const [showFormModal, setShowFormModal] = useState(false); // 控制Form顯示狀態
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 排序方式
  const [searchTerm, setSearchTerm] = useState(''); // 管理搜尋輸入框內容
  const [form] = Form.useForm(); // 创建form实例
  // const [showForm, setShowForm] = useState(false);
  

  // 使用useEffect來保存和恢復狀態
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addCreate = () => {
    setShowFormModal(true); // 設置狀態為 true 来顯示表單
  };

  
  // 編輯
  const editTodo = (record) => {
    setEditingTodo(record);
    // form.setFieldsValue({ text: " " }); // 清空輸入框的值
    form.setFieldsValue({ name: record.name, ip: record.ip }); // 设置表单初始值
    setIsModalVisible(true);
  };

  // 刪除
  const deleteTodo = (key) => {
    const newTodos = todos.filter(todo => todo.key !== key);
    setTodos(newTodos);
  };

  
  const handleOk = (values) => {
    setTodos(todos.map(todo => (todo.key === editingTodo.key ? { ...todo, text: values.text } : todo)));
    setIsModalVisible(false);
    setEditingTodo(null);
    form.resetFields(); // 重置表單
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowFormModal(false); // 隱藏表單
    form.resetFields(); // 重置表單
  };

  // 處理表單提交
  const handleFormSubmit = (values) => {
    setTodos([...todos, { key: Date.now(), ...values }]); // 将表單數據添加到表格數據中
    setShowFormModal(false); // 關閉表单模態框
    form.resetFields(); // 重置表單
  };

    
  const handleNameClick = (text) => {
    console.log('You clicked on:', text);
    // 在這裡執行點擊名稱後的邏輯，例如顯示更多信息等
  };

  // 過濾與排序功能的整合
  const filteredAndSortedTodos = todos
    // .filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase())) // 過濾
    .filter(todo => {
      const searchText = searchTerm.toLowerCase();
      return (todo.name && todo.name.toLowerCase().includes(searchText)) || 
             (todo.ip && todo.ip.toLowerCase().includes(searchText));
    })
    .sort((a, b) => {
      const textA = a.text ? a.text.toLowerCase():'';
      const textB = b.text ? b.text.toLowerCase():'';
      if (sortOrder === 'asc') {
        return textA > textB ? 1 : -1;
      } else {
        return textA < textB ? 1 : -1;
      }
    }); // 排序

  // 欄位觸發功能
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };


  
  const columns = [
    {
      title: (
        <>
          <Button 
            type="link" 
            onClick={toggleSortOrder} 
            className="custom-title-button">
            Name {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Button type="link" onClick={() => handleNameClick(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: (
        <>
          <Button 
            type="link" 
            onClick={toggleSortOrder} 
            className="custom-title-button">
            IP {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </>
      ),
      dataIndex: 'ip',
      key: 'ip',
      render: (text) => (
        <Button type="link" onClick={() => handleNameClick(text)}>
          {text}
        </Button>
      ),
    },

    {
      title: 'Action',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => editTodo(record)}>Edit</Button>
          <Button type="link" danger onClick={() => deleteTodo(record.key)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginTop: 20 }}
      />

      <Button 
        type="primary" 
        style={{ float: 'right' }}
        onClick={addCreate}
      >Create
      </Button>

      {/* {showForm && <TargetForm />} 当 showForm 为 true 时渲染 NodeForm 组件 */}

      <Table
        columns={columns}
        dataSource={filteredAndSortedTodos} //使用過濾後並排序的數據
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
      {/* 顯示 TargetForm 的 Modal */}
      <Modal
        title="Create Target"
        open={showFormModal}
        onCancel={handleCancel}
        footer={null}
      >
        <TargetForm onCancel={handleCancel} form={form} onSubmit={handleFormSubmit}/>
      </Modal>

      {/* Edit互動視窗 */}
      <Modal
        title="Edit Todo"
        // visible={isModalVisible}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        afterClose={() => form.resetFields()} // 確保每次關閉後重置表單
      >
        <Form
          initialValues={{ text:'' }}// 確保打開對話框時表單是空的
          onFinish={handleOk}
        >
          {/* Edit */}
          <Form.Item
            name="text"
            rules={[{ required: true, message: 'Please input the todo text!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              // onClick={addTodo}
            >Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

