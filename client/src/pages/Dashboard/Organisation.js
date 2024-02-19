import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import API from '../../services/API'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
const Organisation = () => {
    const [data, setData] = useState([])
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.role === "donar") {

                    const { data } = await API.get("http://localhost:4000/get-organisations")
                    console.log("organisation", data)
                    setData(data.organisations)
                }
                else if (user?.role === "hospital") {
                    const { data } = await API.get("http://localhost:4000/get-organisationforHospitals")
                    console.log("organisation for hospitals", data)
                    setData(data.organisations)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "organisationName"
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

export default Organisation