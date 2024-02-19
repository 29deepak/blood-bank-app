import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Table } from 'antd'
import moment from 'moment/moment'
import API from '../../services/API'
const HospitalList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data } = await API.get("http://localhost:4000/get-hospital-list")
                console.log("hospital", data)
                setData(data.hospitalData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const handleDeleteHospital = async (id) => {
        try {
            let answer = window.prompt("Are you sure to deletebthis donar", "sure")
            if (!answer) {
                return
            }
            let { data } = await API.delete(`http://localhost:4000/get-delete-hospital/${id}`)
            alert(data?.message)
            window.location.reload()

        } catch (err) {
            console.log(err)
        }
    }
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
        }, {
            title: "Actions",
            dataIndex: "action",
            render: (text, record) => (
                <span><button className='btn btn-danger' onClick={() => handleDeleteHospital(record.id)}>Delete</button></span>
            )
        }
    ]
    return (
        <Layout>
            <Table columns={columns} dataSource={data} />
        </Layout>
    )
}



export default HospitalList