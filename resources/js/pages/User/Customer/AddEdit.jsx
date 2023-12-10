import React from 'react';
import UserLayout from '@/layouts/UserLayout';
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button, Form, Input, Row, Col, message, Space, Card } from "antd";

const AddEdit = () => {
    const props = usePage().props;
    const { lang } = usePage().props;
    const rowData = props.row;

    const { data, setData, post, processing, errors } = useForm({
        id: (rowData?.id) ? rowData?.id : 0,
        name: rowData?.name,
        email: rowData?.email,
        mobile: rowData?.mobile,
        nationality: rowData?.nationality,
    });

    const submit = () => {
        post('/customer/addAction', {
            onSuccess: () => {
                if (data.id == 0) {
                    message.success(lang.common.data_added)
                }
                else {
                    message.success(lang.common.data_updated)
                }
            },
            onError: () => {
                message.error(lang.common.error_request)
            },
            onFinish: () => {
                router.get('/customer')
            }
        });
    };

    const handleCancel = () => {
        router.get('/customer')
    }

    return (
        <Card bordered={false} style={{ width: "100%", borderRadius: 0, paddingBottom: 20 }}>
            <Head title={rowData?.id ? lang.common.edit_customer : lang.common.add_customer} />
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: 20, marginTop: 5 }}>
                <Col>
                    <span className='page-title'>{rowData?.id ? lang.common.edit_customer : lang.common.add_customer}</span>
                </Col>
            </Row>

            <div className="form-holder">
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={submit}
                    autoComplete="off"
                >
                    <Form.Item
                        label={lang.common.name}
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
                        rules={[
                            {
                                required: true,
                                message: lang.common.field_required,
                            }
                        ]}
                    >
                        <Input disabled={processing} />
                    </Form.Item>

                    <Form.Item
                        label={lang.common.email}
                        name="email"
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                        rules={[
                            {
                                required: true,
                                message: lang.common.field_required,
                            }
                        ]}
                    >
                        <Input type="email" disabled={processing} />
                    </Form.Item>

                    <Form.Item
                        label={lang.common.mobile + " (+971 ...)"}
                        name="mobile"
                        validateStatus={errors.mobile && 'error'}
                        help={errors.mobile}
                        rules={[
                            {
                                required: true,
                                message: lang.common.field_required,
                            }
                        ]}
                    >
                        <Input disabled={processing} />
                    </Form.Item>

                    <Form.Item
                        label={lang.common.nationality}
                        name="nationality"
                        validateStatus={errors.nationality && 'error'}
                        help={errors.nationality}
                        rules={[
                            {
                                required: true,
                                message: lang.common.field_required,
                            }
                        ]}
                    >
                        <Input disabled={processing} />
                    </Form.Item>

                    <Form.Item className="form-actions">
                        <Space size="middle">
                            <Button type="primary" htmlType="submit" loading={processing} size="large">
                                {processing ? lang.common.please_wait : lang.common.submit}
                            </Button>

                            <Button danger size="large" onClick={handleCancel}>
                                {lang.common.cancel}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
};

AddEdit.layout = page => <UserLayout children={page} />

export default AddEdit;