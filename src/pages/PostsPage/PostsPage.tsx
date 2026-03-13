import {
  Button,
  Card,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PostFormModal } from "./components/PostFormModal";
import type { PostItem, PostPayload } from "../../common/types/post";
import { queryKeys } from "../../constants/queryKeys";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../services/api/postsApi";

export function PostsPage() {
  const queryClient = useQueryClient();
  const [api, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PostItem | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      api.success("Created post successfully");
      setOpenModal(false);
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: PostPayload }) =>
      updatePost(id, payload),
    onSuccess: () => {
      api.success("Updated post successfully");
      setOpenModal(false);
      setEditingItem(null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      api.success("Deleted post successfully");
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });

  const tableData = useMemo(() => data || [], [data]);

  const onCreate = () => {
    setEditingItem(null);
    setOpenModal(true);
  };

  const onEdit = (item: PostItem) => {
    setEditingItem(item);
    setOpenModal(true);
  };

  const onSubmit = (payload: PostPayload) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, payload });
      return;
    }

    createMutation.mutate(payload);
  };

  return (
    <>
      {contextHolder}
      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <Typography.Title level={3} className="!mb-1">
              Posts CRUD
            </Typography.Title>
            <Typography.Text type="secondary">
              Basic CRUD with Axios + TanStack React Query.
            </Typography.Text>
          </div>

          <Button icon={<PlusOutlined />} type="primary" onClick={onCreate}>
            Create post
          </Button>
        </div>

        <Table<PostItem>
          loading={isLoading}
          dataSource={tableData}
          rowKey="id"
          pagination={false}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              width: 80,
            },
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Body",
              dataIndex: "body",
            },
            {
              title: "Actions",
              key: "actions",
              width: 160,
              render: (_: unknown, record: PostItem) => (
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    type="link"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Delete this item?"
                    onConfirm={() => deleteMutation.mutate(record.id)}
                  >
                    <Button danger icon={<DeleteOutlined />} type="link">
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
      </Card>

      <PostFormModal
        open={openModal}
        loading={createMutation.isPending || updateMutation.isPending}
        initialValue={editingItem}
        onCancel={() => {
          setOpenModal(false);
          setEditingItem(null);
        }}
        onSubmit={onSubmit}
      />
    </>
  );
}
