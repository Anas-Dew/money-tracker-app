import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/noteContext'
import { useNavigate } from 'react-router-dom'

export default function Account() {
  const user = useContext(noteContext)
  const host = 'http://localhost:5000'
  const navigate = useNavigate();
  const { GetUser, UserData } = user
  useEffect(() => {
    if (localStorage.getItem('token')) {
      GetUser();

    } else {
      navigate('/login')
    }
  }, [])


  const updateExpense = async (e) => {
    e.preventDefault()
    const response = await fetch(`${host}/api/update-expense`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify({ budget: document.getElementById('expenseval').value}),
        mode: 'cors'
    });
    const respond = await response.json()
    // console.log(respond);
    GetUser();

}
const [ModalDollar, setModalDollar] = useState(UserData.expense_budget)
const change = () => {

}
  return (
    <div className='d-flex align-self-center flex-column'>

      <h2>Hi {UserData.name}</h2>
      <div style={{ display: 'flex' }}>
        <h3>Your Budget : $ {UserData.expense_budget || 0}</h3>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Budget</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input  onChange={change} type="number" contentEditable='true' id='expenseval' className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <span className="input-group-text">.00</span>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={updateExpense} className="btn btn-success">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <i className="mx-2 fa-sharp fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
      </div>

    </div>
  )
}
