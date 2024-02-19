
import React, { useState, useEffect } from 'react'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import Layout from '../components/Layout'
import API from '../services/API'
const Donation = () => {
    const [data, setData] = useState([])
    const { user } = useSelector(state => state.auth)
    // console.log("rhgjbk jkkn---------------", user)
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {

                    const { data } = await API.post("http://localhost:4000/get-inventory-hospital", { filters: { inventoryType: "in", donar: user.id } })
                    console.log("get-consumers", data)
                    setData(data.inventory)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const columns = [
        {
            title: "Blood Group",
            dataIndex: "bloodGroup"
        }, {
            title: "Inventory Type",
            dataIndex: "inventoryType"
        }, {
            title: "Quantity",
            dataIndex: "quantity"
        },
        {
            title: "Email",
            dataIndex: "email"
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

export default Donation