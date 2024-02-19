import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import moment from 'moment/moment'
import Layout from '../../components/Layout'
import API from '../../services/API'

const OrgList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await API.get("http://localhost:4000/get-org-list")
                console.log("organisation for hospitals", data)
                setData(data.orgData)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const handleDeleteOrg = async (id) => {
        try {
            let answer = window.prompt("Are you sure to deletebthis donar", "sure")
            if (!answer) {
                return
            }
            let { data } = await API.delete(`http://localhost:4000/get-delete-org/${id}`)
            alert(data?.message)
            window.location.reload()

        } catch (err) {
            console.log(err)
        }
    }
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
        }, {
            title: "Actions",
            dataIndex: "action",
            render: (text, record) => (
                <span><button className='btn btn-danger' onClick={() => handleDeleteOrg(record.id)}>Delete</button></span>
            )
        }
    ]
    return (
        <Layout>
            <Table columns={columns} dataSource={data} />
        </Layout>
    )
}



export default OrgList