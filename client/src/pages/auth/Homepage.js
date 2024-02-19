import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { FaPlus } from "react-icons/fa";
import { Modal, Table } from 'antd';
import InputType from '../../components/shared/Form/InputType';
import API from '../../services/API';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inventoryType, setInventoryType] = useState("in")
    const [email, setEmail] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [data, setData] = useState([])
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data } = await API.get("http://localhost:4000/get-inventory")
                console.log("tjghkgjbb", data)
                setData(data.inventory)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const columns = [{
        title: "Blood Group",
        dataIndex: "bloodGroup"
    }, {
        title: "Inventory Type",
        dataIndex: "inventoryType"
    }, {
        title: "Quantity (ML)",
        dataIndex: "quantity"
    }, {
        title: "Email",
        dataIndex: "email"
    }, {
        title: "Date & TIme",
        dataIndex: "date",
        render: (text, record) => (
            <span>{moment(record.createdAt).calendar()}</span>
        )
    }]
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleModalSubmit = async () => {
        try {
            if (!bloodGroup || !quantity) {
                alert("please provide all fields")
            }
            const { data } = await API.post("http://localhost:4000/create-inventory", { email, organisation: user?.id, inventoryType, quantity, bloodGroup })
            setIsModalOpen(false)
            alert("new Record created")
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout>
            {
                user?.role === "admin" && navigate("/admin")
            }
            <h4 className='ms-4' onClick={showModal} style={{ cursor: "pointer" }}>
                <FaPlus /> Add Inventory

            </h4>
            <Table columns={columns} dataSource={data} />
            <Modal title="Manage Blood Record" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                <div>

                    <div className='d-flex'>
                        Blood Type : &nbsp;
                        <div class="form-check ms-2">
                            <input class="form-check-input" type="radio" name="Radio" value="in" id="in" onChange={(e) => setInventoryType(e.target.value)} defaultChecked />
                            <label class="form-check-label" for="flexCheckDefault">
                                IN
                            </label>
                        </div>
                        <div class="form-check ms-2">
                            <input class="form-check-input" type="radio" name="Radio" value="out" id="out" onChange={(e) => setInventoryType(e.target.value)} />
                            <label class="form-check-label" for="flexCheckDefault">
                                OUT
                            </label>
                        </div>


                    </div>
                    <div>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setBloodGroup(e.target.value)}>
                            <option selected>Open this select menu</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                        </select>
                    </div>

                    <InputType labelText={"Donar Email"} labelFor={"donorEmail"} inputType={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputType labelText={"Quantity (ML)"} labelFor={"quantity"} inputType={'number'} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <div className=' d-flex flex-end btn btn-primary text-center' onClick={handleModalSubmit}>Submit</div>
                </div>

            </Modal>




        </Layout>
    )
}

export default Homepage