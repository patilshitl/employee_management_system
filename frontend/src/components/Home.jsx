import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Form, Button, Modal  } from 'react-bootstrap'

function Home() {
    const [empData, setEmpData] = useState([]);

    const fetchEmpData = () => {
        axios.get("http://localhost:3001/")
        .then((res) => {
            setEmpData(res.data)
        })
    }
    useEffect(() => {
        fetchEmpData();
    }, []);

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
                    <button className='btn addEmpBtn' type="button">+ ADD EMPLOYESS</button>
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
                                    <button className='btn btn-primary'>Edit</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Employee Add Modal */}
        

        <div className='addEmploForm'>
            <Form>
                <input type="search" name="" className='rounded-2 px-4 py-2' id="" placeholder='name'/>

                <select name="" id="" placeholder='manager'>
                    {empData.map((list)=>
                        <option value={list.id} key={list.id}>
                            {list.name}
                        </option>    
                    )}
                </select>

                <select name="" id="" placeholder='department'>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                </select>

                <input type="num" name="" id="" placeholder='salary' className='rounded-2 px-4 py-2' />

                <button className='btn addEmpBtn' type="button">+ ADD EMPLOYESS</button>
            </Form>
        </div>


    </>
  )
}

export default Home
