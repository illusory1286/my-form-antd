import React , { useState } from 'react'
import { Modal, Button, Steps, Form, Input ,Select,Radio} from 'antd';
import PropTypes from "prop-types"

const { TextArea } = Input;
const { Step } = Steps;
const {Group:RadioGroup} = Radio;

export const PolicyForm = ({ onCancel ,form}) => {
  const [currentStep, setCurrentStep] = useState(0);
  // 抓取stpe資料
  const [radioValue, setRadioValue] = useState('Attack_4'); // 預設值

  // Attack Policy-4
  const AttackPolicy=()=>{
    return(
      <>
        <Form.Item
          label="Attack Method"
          name="attackMethod"
          rules={[{ required: true, message: 'Please input the mission name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Throughput(Mbps)"
          name="throughput"
          rules={[{ required: true, message: 'Please input the mission name!' }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Head Payload"
          name="headPayload"
          rules={[{ required: true, message: 'Please input the mission name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Get Payload"
          name="getPayload"
          rules={[{ required: true, message: 'Please input the duration!' }]}
        >
          <TextArea />
        </Form.Item>
      </>
    )
  }

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value); // 更新選擇的值
    console.log("Selected Radio:", e.target.value); // 打印選中的Radio值
  };


  const steps = [
    {
      title: 'Policy Info',
      content: (
        <>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the script name!' }]}
          >
            <Input />
            <RadioGroup 
              defaultValue="radioValue"
              onChange={handleRadioChange} // 綁定onChange事件
            >
              <Radio value="Attack_4">頻寬消耗(第四層)</Radio>
              <Radio value="Attack_7">資源消耗(第七層)</Radio>
            </RadioGroup>
          </Form.Item>
        </>
      ),
    },
    // Attack Policy
    {
      title: 'Attack Policy',
      content: (
        <AttackPolicy />
      ),
    },

    // Monitor Policy
    {
      title: 'Monitor Policy',
      content: (
        <>
          <Form.Item
            label="Name"
            name="methodName"
            rules={[{ required: true, message: 'Please input the interval!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Method"
            name="method"
            rules={[{ required: true, message: 'Please input the monitor name!' }]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Parameter"
            name="parameter"
            rules={[{ required: true, message: 'Please input the interval!' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },

    // Node Team
    {
      title: 'Node Team',
      content: (
        <>
          <Form.Item
            label="Node Team"
            name="nodeTeam"
            rules={[{ required: true, message: 'Please input the monitor name!' }]}
          >
            <Select />
          </Form.Item>
        </>
      ),
    },
  ];
  // console.log(steps);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      steps.forEach(step => {
        console.log(step.content);
      });
      console.log("123")

    }
    // setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    // setCurrentStep(currentStep - 1);
  };

  const handleFinish = (values) => {
    console.log('Form values:', values);
    // 处理提交邏輯
    onCancel(); // 提交完成後關閉表單
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setCurrentStep(0)}>Start</Button> */}
      <Modal
        title="Create Policy"
        // open={currentStep < steps.length}
        open={true}
        // onCancel={() => setCurrentStep(steps.length)}
        onCancel={onCancel}
        footer={[
          currentStep > 0 && (
            <Button key="back" onClick={prev}>
              Previous
            </Button>
          ),
          currentStep < steps.length - 1 && (
            <Button key="next" type="primary" onClick={next}>
              Next
            </Button>
          ),
          currentStep === steps.length - 1 && (
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
          ),
        ]}
      >
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ name: '', ip: '' }}>
          {/* {steps[currentStep].content} */}
          {steps[currentStep]?.content}
        </Form>
      </Modal>
    </>
  );
}
PolicyForm.propTypes = {
  onCancel:PropTypes.func.isRequired,
  form:PropTypes.object.isRequired,
};


