import React from "react";
import { Button, Table } from "antd";

const TableComponent = (props) => {
    const {columns, data, setSelectedRows} = props;

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRows(selectedRowKeys);
        }
    };

    return (
        <div>
            <Table 
                rowKey={(record) => record?.id}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                bordered
                pagination={{
                    hideOnSinglePage: true
                }}
            />
        </div>
    )
}

export default TableComponent;