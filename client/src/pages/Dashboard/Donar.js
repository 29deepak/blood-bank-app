import React, { useEffect, useState } from 'react'
import Layout from '../.././components/Layout'
import API from '../../services/API'
import { Table } from 'antd'
import moment from 'moment/moment'
const Donar = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await API.get("http://localhost:4000/get-donars")
                console.log("get-donars", data)
                setData(data.donars)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        }, {
            title: "Email",
            dataIndex: "email"
        }, {
            title: "Phone",
            dataIndex: "phone"
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
            <h1 className='text-center'></h1>
            <Table columns={columns} dataSource={data} />

        </Layout>
    )
}

export default Donar