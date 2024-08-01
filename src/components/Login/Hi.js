import React, { useState } from 'react';
import { Input, Button, List, Typography,Select } from 'antd';

const { Option } = Select;

const Hi = () => {
  const [todos, setTodos] = useState([]); // 管理Todo項目列表
  const [inputValue, setInputValue] = useState(''); // 管理輸入框內容
  const [searchTerm, setSearchTerm] = useState(''); // 管理搜尋輸入框內容
  const [sortOrder, setSortOrder] = useState('asc'); // 排序順序狀態

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // 使用當前時間戳作為唯一ID
        text: inputValue
      };
      setTodos([...todos, newTodo]); // 新增項目到列表
      setInputValue(''); // 清空輸入框
    }
  };
  
  const removeTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos); // 移除項目
  };

  // 過濾待辦事項列表
  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 排序待辦事項列表
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();

    if (sortOrder === 'asc') {
      return textA > textB ? 1 : -1;
    } else {
      return textA < textB ? 1 : -1;
    }
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Hello World</h1>
      <Input
        placeholder="Enter a new todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={addTodo} // 支持按下Enter鍵新增
        style={{ width: 300, marginRight: 10 }}
      />
      <Button type="primary" onClick={addTodo}>Add</Button>
      <Input
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginTop: 20 }}
      />
      <Select
        defaultValue="asc"
        style={{ width: 120, marginTop: 20 }}
        onChange={(value) => setSortOrder(value)}
      >
        <Option value="asc">正向排序</Option>
        <Option value="desc">反向排序</Option>
      </Select>
      <List
        style={{ marginTop: 20, width: 300 }}
        bordered
        // dataSource={todos}
        dataSource={sortedTodos} // 使用filteredTodos來顯示過濾後的項目
        renderItem={(item) => (
          <List.Item
            key={item.id} // 使用item.id作為每個List.Item的key
            actions={[<a onClick={() => removeTodo(item.id)}>Delete</a>]}
          >
            <Typography.Text>{item.text}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Hi;
