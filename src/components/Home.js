import AddNote from "./AddNote";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import { Budget } from "./Budget";
export default function Home(props) {
  const navigate = useNavigate();

  const { showAlert } = props

  const run = () => {
    if (localStorage.getItem('token')) {
      console.log('d');
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <Budget/>
      <button type="button" className="btn btn-success d-flex align-self-center" data-bs-toggle="modal" data-bs-target="#AddNoteModal">Add an Expense</button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="AddNoteModal" tabIndex="-1" aria-labelledby="AddNoteModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <AddNote />
            </div>
          </div>
        </div>
      </div>
      <Notes showAlert={showAlert} />

    </>
  )
}
