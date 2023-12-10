import React, { useRef, useEffect, useState } from 'react';
import { Head, usePage, router } from "@inertiajs/react";
import { Button, Col, Input, Row, Space, Table, Popconfirm, message, Tooltip, Card } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import UserLayout from '@/layouts/UserLayout';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState();

    const { results, lang } = usePage().props;

    useEffect(() => {
        setData(results);
        setLoading(false);
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    //placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        {lang.common.search}
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        {lang.common.reset}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (text)
    });

    const handleAdd = () => {
        router.get('/customer/addEdit')
    }

    const handleEdit = (id) => {
        router.get(`/customer/addEdit/?id=${id}`)
    }

    const handleDelete = (id) => {
        const formData = {
            id: id
        };
        router.post('/customer/delete', formData, {
            onSuccess: () => {
                message.success(lang.common.data_deleted);
            },
            onFinish: () => {
                router.get('/customer')
            }
        })
    };

    const handleCancel = () => {
        message.error(lang.common.operation_cancelled);
    };

    const columns = [
        {
            title: lang.common.name,
            dataIndex: 'name',
            key: 'name',
            width: 'auto',
            ...getColumnSearchProps('name'),
        },
        {
            title: lang.common.email,
            dataIndex: 'email',
            key: 'email',
            width: '25%',
            ...getColumnSearchProps('age'),
        },
        {
            title: lang.common.mobile,
            dataIndex: 'mobile',
            key: 'mobile',
            width: '15%',
            ...getColumnSearchProps('mobile')
        },
        {
            title: lang.common.nationality,
            dataIndex: 'nationality',
            key: 'nationality',
            width: '15%',
            ...getColumnSearchProps('nationality')
        },
        {
            title: '',
            key: 'action',
            width: '8%',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={lang.common.edit_row} color="orange">
                        <Button style={{ color: "orange", borderColor: "orange" }} size="middle" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
                    </Tooltip>
                    <Popconfirm
                        title={lang.common.delete}
                        description={lang.common.are_you_sure_to_delete}
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={handleCancel}
                        okText={lang.common.yes}
                        cancelText={lang.common.no}
                    >
                        <Tooltip title={lang.common.delete_row} color="red">
                            <Button danger size="middle" shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Head title={lang.common.customers} />

            <Card bordered={false} style={{ width: "100%", borderRadius: 0 }}>
                <Row justify={'space-between'} align="middle">
                    <Col>
                        <span style={{ fontSize: 25, fontWeight: 600 }}>{lang.common.customers}</span>
                    </Col>
                    <Col>
                        <Space size={"middle"}>
                            <Button style={{ color: "blue", borderColor: "blue" }} shape="circle" icon={<PlusOutlined />} size={"middle"} onClick={handleAdd} />
                        </Space>
                    </Col>

                </Row>

                <div className='table-holder'>
                    <Table columns={columns} dataSource={data} rowKey={(key) => key.id} loading={loading} pagination={{ defaultPageSize: 50 }} />
                </div>
            </Card>
        </>
    )

}

Index.layout = page => <UserLayout children={page} />

export default Index;