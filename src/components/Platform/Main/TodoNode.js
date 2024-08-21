import React, { useState,useEffect } from 'react';
import { Table, Button, Input, Form, Modal  } from 'antd';
import './Todo.css';
import { ThreeForm } from '../../test/ThreeForm';


export const TodoNode = () => {
  const [todos, setTodos] = useState([]);// 管理Todo項目列表
  const [inputValue, setInputValue] = useState('');// 管理輸入框狀態
  const [editingTodo, setEditingTodo] = useState(null);// 管理編輯狀態
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 排序方式
  const [searchTerm, setSearchTerm] = useState(''); // 管理搜尋輸入框內容
  const [form] = Form.useForm(); // 创建form实例

  const [showForm, setShowForm] = useState(false);
  

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

  const addTodo = () => {
    setShowForm(true); // 设置状态为 true 来显示 ThreeForm 组件
    // <ThreeForm />
  };
  // if (inputValue.trim() !== '') {
  //   const newTodo = {
  //     key: Date.now(), // 使用時間戳作為唯一ID
  //     text: inputValue,
  //   };
  //   setTodos([...todos, newTodo]);
  //   setInputValue('');
  // }

  // 編輯
  const editTodo = (record) => {
    setEditingTodo(record);
    form.setFieldsValue({ text: " " }); // 清空輸入框的值
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
    setEditingTodo(null);
    // setEditingTodo("test");
    form.resetFields(); // 重置表單
  };

  // 過濾與排序功能的整合
  const filteredAndSortedTodos = todos
    .filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase())) // 過濾
    .sort((a, b) => {
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();
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

  const handleNameClick = (text) => {
    console.log('You clicked on:', text);
    // 在這裡執行點擊名稱後的邏輯，例如顯示更多信息等
  };

  
  const columns = [
    {
      title: (
        <>
          <Button 
            type="link" 
            onClick={toggleSortOrder} 
            className="custom-title-button">
            名稱 {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </>
      ),
      dataIndex: 'text',
      key: 'text',
      render: (text) => (
        <Button type="link" onClick={() => handleNameClick(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: '功能',
      key: 'actions',
      render: (text, record) => (
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
        placeholder="Enter a new Node"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={addTodo} // 支持按下Enter鍵新增
        style={{ width: 300, marginRight: 10 }}
      />
      
      <Input
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginTop: 20 }}
      />

      <Button 
        type="primary" 
        onClick={addTodo}
      >Create</Button>

      {showForm && <ThreeForm />} {/* 当 showForm 为 true 时渲染 ThreeForm 组件 */}

      <Table
        columns={columns}
        dataSource={filteredAndSortedTodos} //使用過濾後並排序的數據
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />

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
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// export default Todo;
