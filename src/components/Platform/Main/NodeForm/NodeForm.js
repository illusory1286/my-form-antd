import React , { useState } from 'react'
import { Modal, Button, Steps, Form, Input , Checkbox,Select} from 'antd';
import PropTypes from "prop-types"

const { Step } = Steps;

export const NodeForm = ({ onCancel ,form}) => {
  const [currentStep, setCurrentStep] = useState(0);
  // const [form] = Form.useForm();

  const steps = [
    {
      title: 'Group Name',
      content: (
        <>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the script name!' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    // Attack Mission
    {
      title: 'Attack Mission',
      content: (
        <>
          <Form.Item
            name="agree"
            style={{ display: 'flex', justifyContent: 'center' }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
          >
            <Checkbox>
              IBM
            </Checkbox>
            <Checkbox>
              GCP
            </Checkbox>
            <Checkbox>
              AWS
            </Checkbox>
          </Form.Item>

          <Form.Item
            label="IBM Name"
            name="ibmName"
            rules={[{ required: true, message: 'Please input the mission name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please input the mission name!' }]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Node Number"
            name="nodeNumber"
            rules={[{ required: true, message: 'Please input the mission name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Vm Level"
            name="vmLevel"
            rules={[{ required: true, message: 'Please input the duration!' }]}
          >
            <Select />
          </Form.Item>
        </>
      ),
    },

    // Monitor Mission
    {
      title: 'Attack Mission',
      content: (
        <>
          <Form.Item
            name="agree"
            style={{ display: 'flex', justifyContent: 'center' }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
          >
            <Checkbox>
              IBM
            </Checkbox>
            <Checkbox>
              GCP
            </Checkbox>
            <Checkbox>
              AWS
            </Checkbox>
          </Form.Item>

          <Form.Item
            label="IBM Name"
            name="ibmName"
            rules={[{ required: true, message: 'Please input the mission name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please input the mission name!' }]}
          >
            <Select>
              <Select.Option value="wdc07">wdc07</Select.Option>
              <Select.Option value="sao01">sao01</Select.Option>         
              <Select.Option value="random">random</Select.Option>   
            </Select>
          </Form.Item>

          <Form.Item
            label="Node Number"
            name="nodeNumber"
            rules={[{ required: true, message: 'Please input the mission name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Vm Level"
            name="vmLevel"
            rules={[{ required: true, message: 'Please input the duration!' }]}
          >
            <Select>
              <Select.Option value="C1.1x1x25">C1.1x1x25</Select.Option>
              <Select.Option value="B1.2x8x25">B1.2x8x25</Select.Option>         
              <Select.Option value="B1.4x16x25">B1.4x16x25</Select.Option>   
            </Select>
          </Form.Item>
        </>
      ),
    },
    // {
    //   title: 'Monitor Mission',
    //   content: (
    //     <>
    //       <Form.Item
    //         label="Monitor Name"
    //         name="monitorName"
    //         rules={[{ required: true, message: 'Please input the monitor name!' }]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item
    //         label="Interval"
    //         name="interval"
    //         rules={[{ required: true, message: 'Please input the interval!' }]}
    //       >
    //         <Input />
    //       </Form.Item>
    //     </>
    //   ),
    // },

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
            <Select>
              <Select.Option value="default">Please select an Node Team</Select.Option>
              <Select.Option value="C1.1x1x25">C1.1x1x25</Select.Option>
              <Select.Option value="B1.2x8x25">B1.2x8x25</Select.Option>         
              <Select.Option value="B1.4x16x25">B1.4x16x25</Select.Option>   
            </Select>
          </Form.Item>
        </>
      ),
    },
  ];
  console.log(steps);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
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
        title="Create NodeTeam"
        // visible={currentStep < steps.length}
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
NodeForm.propTypes = {
  onCancel:PropTypes.func.isRequired,
  form:PropTypes.object.isRequired,
};


