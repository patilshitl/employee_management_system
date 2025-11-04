import React from 'react'
import { Row, Col, Form, Button, Navbar } from 'react-bootstrap'

function Home() {
  return (
    <>
        <div className='container'>
            <div className='card m-3 heading p-5'>
                <h1>Employee Management System</h1>
                <div className='totalEmpCount p-2 m-3'>
                    Total Employees: 15
                </div>
            </div>

            <nav className='card m-3'>
                <Form>
                    <input type="search" name="" id="" placeholder='search employess'/>
                    <button>ADD EMPLOYESS</button>
                </Form>
            </nav>

            <div className='m-3'>
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
                        <tr>
                            <td>1</td>
                            <td>shital</td>
                            <td>Shweta</td>
                            <td>Developer</td>
                            <td>26000</td>
                            <td>
                                <button className='btn btn-secondary'>Details</button>
                                <button className='btn btn-primary'>Edit</button>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Home
