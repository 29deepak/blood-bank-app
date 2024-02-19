import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import API from '../../services/API'
import { Table } from 'antd';
import moment from 'moment/moment';
const Hospitals = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data } = await API.get("http://localhost:4000/get-hospitals")
                console.log("hospital", data)
                setData(data.hospitals)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "hospitalName"
        }, {
            title: "Email",
            dataIndex: "email"
        }, {
            title: "Phone",
            dataIndex: "phone"
        }, {
            title: "Address",
            dataIndex: "address"
        }, {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>{moment(record.createdAt).calendar()}</span>
            )
        }
    ]
    return (
        <Layout>
            <Table columns={columns} dataSource={data} />
        </Layout>
    )
}

export default Hospitals