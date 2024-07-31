import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "antd";

const TableComponent = (props) => {
    const {columns, setSelectedRows, state, setState} = props;
    const [data, setData] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRows(selectedRowKeys);
        }
    };

    const handleChangePage = (e) => {
        setState({...state, page: e})
    }

    useEffect(() => {
        setData(state.data?.slice(state.page, state.rowsPerPage));
    }, [state.page])

    return (
        <div className="w-100">
            <Table 
                rowKey={(record) => record?.id}
                className="mb-2"
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={state.displayData}
                bordered
                pagination={false}
            />
            <Pagination
                className="d-flex justify-content-end" 
                current={state.page}
                total={state.databases.length} 
                onChange={handleChangePage}
            />
        </div>
    )
}

export default TableComponent;