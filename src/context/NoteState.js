import { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
  const host = 'https://money-tracker-api.vercel.app'
  // const host = 'http://localhost:5000'

  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token'),
      },
      mode: 'cors'
    });
    const allFetchedNotes = await response.json()
    setnote(allFetchedNotes)
    // console.log(allFetchedNotes);
    // props.showAlert('Hi!', 'Welcome back!', 'success')
    // UpdateExpense();
    GetUser();
  }

  const notes = []


  const [note, setnote] = useState(notes)
  // ADD A NOTE
  const addNote = async (title, description, tags, friends) => {

    const response = await fetch(`${host}/api/notes/add-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags, friends })
    });

    const noteNEW = await response.json();
    setnote(note.concat(noteNEW))
    UpdateExpense();
  }
  // DELETE A NOTE
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      }
    });
    const newNote = note.filter((note) => { return note._id !== id })
    setnote(newNote)
    UpdateExpense();
  }
  // UPDATE A NOTE
  const updateNote = async (id, title, description, tags, friends) => {
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags, friends })
    });
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
      }

    }
    UpdateExpense();
  }

  // UPDATE EXPENSE
  const UpdateExpense = async () => {
    let total_expense = 0;
    const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token'),
      },
      mode: 'cors'
    });
    const allFetchedTransactions = await response.json()

    for (let index = 0; index < allFetchedTransactions.length; index++) {
      const element = allFetchedTransactions[index].tags;
      total_expense += parseFloat(element)
    }
    setExpense(total_expense)
  }

  const [Expense, setExpense] = useState(0)

  const GetUser = async() => {
    const response = await fetch(`${host}/api/get-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('token'),
      },
      mode: 'cors'
    });
    const userDetails = await response.json()
    let user = {
      "name" : userDetails.name,
      "expense_budget" : userDetails.budget // Dummy
    }
    setUserData(user)
  }
  
  const [UserData, setUserData] = useState({})
  return (
    < NoteContext.Provider value={{ UserData, GetUser,Expense, UpdateExpense, note, setnote, addNote, deleteNote, updateNote, fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider >
  )
}

export default NoteState