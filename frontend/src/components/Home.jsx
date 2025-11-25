import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Form, Button, Modal  } from 'react-bootstrap'

function Home() {
    const [empData, setEmpData] = useState([]);

    const [empFormData, setEmpFormData] = useState({
        name : "",
        manager_id : "",
        department : "",
        salary : "",
    })

    const [showForm, setShowForm] = useState(false);
    const [showEditForm ,setShowEditForm] = useState(false);

    const [editEmpl, setEditEmpl] = useState({
        id: "",
        name : "",
        manager_id : "",
        department : "",
        salary : "",
    })


    const fetchEmpData = () => {
        axios.get("http://localhost:3001/")
        .then((res) => {
            setEmpData(res.data)
        })
    }
    useEffect(() => {
        fetchEmpData();
    }, []);

    const handleChange = (e) => {
        setEmpFormData({
        ...empFormData,
        [e.target.name]: e.target.value,
        });
    };

    const editHandleChnage = (e) =>{
        setEditEmpl({
            ...editEmpl,
            [e.target.name]: e.target.value,
        });
    };

    const addEmployee = (e) => {
        e.preventDefault();

        axios
        .post("http://localhost:3001/", empFormData)
        .then((res) => {
            alert(res.data);
            setEmpFormData({
            name: "",
            manager_id: "",
            department: "",
            salary: "",
            });
        })
        .catch((err) => {
            if (err.response) alert(err.response.data);
            else alert("Server not reachable");
        });
    };

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3001/${id}`)
        .then((res) => {
            alert(res.data);
            fetchEmpData;
        }) 
        .catch((err)=>{
            alert("Error Deleting Employee");
        });
    };

    const openEditForm = (empl) =>{
        setEditEmpl({
        id: "empl.id",
        name : "empl.name",
        manager_id : "empl.manager_id",
        department : "empl.department",
        salary : "empl.salary",
        })
        setShowEditForm(true); 
    }
    

  return (
    <>
        <div className='container'>
            <div className='card m-3 heading p-5 rounded-5'>
                <h1>Employee Management System</h1>
                <div className='totalEmpCount p-2 m-3 rounded-2'>
                    Total Employees: 15
                </div>
            </div>

            <nav className='card m-3 rounded-5'>
                <Form>
                    <input type="search" name="" className='rounded-2 px-4 py-2' id="" placeholder='search employess'/>
                    <button className='btn addEmpBtn' type="button" onClick={() => setShowForm(true)}>+ ADD EMPLOYESS</button>
                </Form>
            </nav>

            <div className='m-3 row display-flex rounded-5 card'>
                <table>
                    <tbody>
                        <tr>
                            <th>EMPLOYEE ID</th>
                            <th>NAME</th>
                            <th>MANAGER</th>
                            <th>DEPARTMENT</th>
                            <th>SALARY</th>
                            <th>ACTION</th>
                        </tr>
                        {empData.map((list)=>
                            <tr key={list.id}>
                                <td>{list.id}</td>
                                <td>{list.name}</td>
                                <td>{list.manager}</td>
                                <td>{list.department}</td>
                                <td>{list.salary}</td>
                                <td className='d-flex align-items-center justify-content-between'>
                                    <button className='btn btn-secondary'>Details</button>
                                    <button className='btn btn-primary' onClick={() => openEditForm(list)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteEmployee(list.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Employee Add Modal */}
        

        {showForm && (
            <div className='addEmploForm' id='addEmploForm'>
                <Form onSubmit={addEmployee}>
                    <div className="row">

                        <div className="col-lg-6 mb-3">
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control rounded-2 px-4 py-2" 
                                placeholder="Name"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-lg-6 mb-3">
                            <select 
                                name="manager_id" 
                                className="form-select rounded-2 px-4 py-2"
                                onChange={handleChange}
                            >
                                <option value="">Select Manager</option>
                                {empData.map((list) => (
                                    <option value={list.id} key={list.id}>
                                        {list.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <select 
                                name="department" 
                                className="form-select rounded-2 px-4 py-2"
                                onChange={handleChange}
                            >
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <input 
                                type="number" 
                                name="salary" 
                                className="form-control rounded-2 px-4 py-2" 
                                placeholder="Salary"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12 text-center mt-3">
                            <button className="btn addEmpBtn me-2" type="submit">
                                + ADD EMPLOYEE
                            </button>

                            {/* ❌ Cancel Button — hides the form */}
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </Form>
            </div>
        )}


        {/* Edit employee form*/}

        {showEditForm && (
            <div className='addEmploForm' id='addEmploForm'>
                <Form onSubmit={openEditForm}>
                    <div className="row">

                        <div className="col-lg-6 mb-3">
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control rounded-2 px-4 py-2" 
                                placeholder="Name" value={editEmpl.name}
                                onChange={editHandleChnagehandleChange}
                            />
                        </div>

                        <div className="col-lg-6 mb-3">
                            <select 
                                name="manager_id" 
                                className="form-select rounded-2 px-4 py-2" value={editEmpl.manager_id}
                                onChange={editHandleChnage}
                            >
                                <option value="">Select Manager</option>
                                {empData.map((list) => (
                                    <option value={list.id} key={list.id}>
                                        {list.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <select 
                                name="department" 
                                className="form-select rounded-2 px-4 py-2"
                               value={editEmpl.department}    onChange={handleEditChange}
                            >
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <input 
                                type="number" 
                                name="salary" 
                                className="form-control rounded-2 px-4 py-2" 
                                placeholder="Salary"
                                value={editEmpl.salary}    onChange={handleEditChange}
                            />
                        </div>

                        <div className="col-12 text-center mt-3">
                            <button className="btn addEmpBtn me-2" type="submit">
                                + ADD EMPLOYEE
                            </button>

                            {/* ❌ Cancel Button — hides the form */}
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={() => setShowEditForm(false)}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </Form>
            </div>
        )}

    </>
  )
}

export default Home
