import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select, message, Row, Col, Divider } from "antd";
import { ADD_PATIENT } from "./queries";
const { Option } = Select;

function Nurse() {
  const [addPatient, { loading, error }] = useMutation(ADD_PATIENT);

  const formRef = useRef();

  const handleSubmit = (values) => {
    console.log(values);
    try {
      addPatient({
        variables: {
          data: {
            company: values.company,
            registration_number: values.registration_number,
            status: "bekle",
          },
        },
      });
      formRef.current.resetFields();
      message.success("Post saved", [4]);
    } catch (e) {
      message.error(`Post not saved!. Error: ${error.message}`, [10]);
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{
        company: "Renault",
        remember: true,
      }}
      onFinish={handleSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      ref={formRef}
    >
      <Row gutter={24}>
        <Divider orientation="left">Hasta Ekleme</Divider>
        <Col xs={24} md={10}>
          <Form.Item
            // label="Username"
            name="registration_number"
            rules={[
              {
                required: true,
                message: "Sicil numarasını giriniz!",
              },
            ]}
          >
            <Input size="large" placeholder="Sicil No" disabled={loading} />
          </Form.Item>
        </Col>
        <Col xs={24} md={10}>
          <Form.Item
            name="company"
            rules={[
              {
                required: true,
                message: "Şirketi Seçiniz!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Şirketi Seçiniz"
              disabled={loading}
            >
              <Option value="Horse">Horse</Option>
              <Option value="Renault">Renault</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Nurse;
