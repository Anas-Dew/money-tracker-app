import React from 'react'

export default function EditModal() {
    return (
        <>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" id="title" name='title' placeholder="Write a title..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name='description' rows="3" placeholder='It was a starting of spring...'></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Expense</label>
                    <textarea className="form-control" id="tags" name='tags' rows="1" placeholder='Work' ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="friends" className="form-label">Friend's</label>
                    <textarea className="form-control" id="friends" name='friends' rows="1" placeholder="Friend's" onChange={onChange}></textarea>
                </div>

            </form>
        </>
    )
}
