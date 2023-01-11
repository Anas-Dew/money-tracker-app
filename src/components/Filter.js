import React, {useContext} from 'react'
import noteContext from '../context/noteContext'

export const Filter = () => {

    const notes = useContext(noteContext)
    const { filterBy, filterByDate } = notes

    const filterByCategory = () => {
        let choice = document.getElementById('choice').value
        filterBy(choice.toLowerCase())
    }
    
    const filterByDateRe = () => {
        let dateinput = document.getElementById('dateinput').value
        filterByDate(dateinput)

    }

    return (
        <>
            <button style={{ width: "80%", display: "flex", alignSelf: "center", justifyContent: "center" }} class="m-3 btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Filters
            </button>

            <div class="collapse m-3" id="collapseExample">
                <div class="card card-body">
                    <button data-bs-toggle="modal" data-bs-target="#datemodal" style={{ width: "80%", display: "flex", alignSelf: "center", justifyContent: "center" }} type="button" class="btn btn-dark mb-3">By Date</button>
                    <button data-bs-toggle="modal" data-bs-target="#categorymodal" style={{ width: "80%", display: "flex", alignSelf: "center", justifyContent: "center" }} type="button" class="btn btn-dark">By Category</button>
                </div>
            </div>

            {/* date modal */}
            <div class="modal fade" id="datemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Filter by Date</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input id='dateinput' type={'date'} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={filterByDateRe} type="button" class="btn btn-primary" data-bs-dismiss="modal">Filter</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* category modal */}
            <div class="modal fade" id="categorymodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Filter by Category</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input id='choice' class="form-control" type="text" placeholder="Eg. Shopping, Bills etc." aria-label="default input example" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={filterByCategory} type="button" class="btn btn-primary" data-bs-dismiss="modal">Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
