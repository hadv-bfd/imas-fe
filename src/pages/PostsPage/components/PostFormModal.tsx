import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import type { PostItem, PostPayload } from "../../../common/types/post";

type Props = {
  open: boolean;
  loading: boolean;
  initialValue?: PostItem | null;
  onCancel: () => void;
  onSubmit: (payload: PostPayload) => void;
};

type PostFormValue = {
  title: string;
  body: string;
};

export function PostFormModal({
  open,
  loading,
  initialValue,
  onCancel,
  onSubmit,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      return;
    }

    form.setFieldsValue({
      title: initialValue?.title || "",
      body: initialValue?.body || "",
    });
  }, [open, initialValue, form]);

  const handleFinish = (values: PostFormValue) => {
    onSubmit({
      userId: initialValue?.userId || 1,
      title: values.title,
      body: values.body,
    });
  };

  return (
    <Modal
      destroyOnHidden
      open={open}
      title={initialValue ? "Update post" : "Create post"}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Input title" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: "Body is required" }]}
        >
          <Input.TextArea rows={4} placeholder="Input body" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button htmlType="submit" loading={loading} type="primary">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
