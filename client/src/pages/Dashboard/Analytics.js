import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import API from '../../services/API'
import { Table } from 'antd';
import moment from 'moment/moment';

const Analytics = () => {
    const [data, setData] = useState([])
    const [recentData, setRecentData] = useState([])
    const colors = ["#884A39", "#C38154", '#FFC26F', "#4F709C", "#492E4", "#C38154", '#FFC26F', "#4F709C"]
    useEffect(() => {
        const fetchData = async () => {
            try {


                const { data } = await API.get("http://localhost:4000/blood-group-details")
                console.log("analytics", data)
                setData(data.bloodGroupData)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchRecentData = async () => {
            try {
                let { data } = await API.get('http://localhost:4000/get-recent-activity');
                setRecentData(data.inventory)

            } catch (err) {
                console.log(err)
            }
        }
        fetchRecentData()
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
        <>
            <Header />
            <h2 className='text-center'>BLOOD Group RECORD</h2>
            <div className='d-flex flex-row flex-wrap'>
                {
                    data?.map((record, index) => {
                        return (
                            <div className='card m-2' key={index} style={{ width: "18rem", backgroundColor: `${colors[index]}` }} >
                                <div className='card-header text-center'>{record.bloodGroup}</div>
                                <div className='card-body'>
                                    <p>Total In :<b>{record.totalIn}</b>(ML)</p>
                                    <p>Total Out :<b>{record.totalOut}</b>(ML)</p>
                                </div>
                                <div className='card-footer'>
                                    Total Available : <b>{record.availabeBlood}</b>(ML)
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <h1 className='text-center'>Recent Blood Transactions</h1>
            <Table columns={columns} dataSource={recentData} />
        </>

    )
}

export default Analytics