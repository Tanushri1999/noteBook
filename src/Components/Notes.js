import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let history = useHistory()

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        // when you click on upadte note modal will automatically close after updating
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />

            {/* Button trigger modal  */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type='text' className="form-control" name='etitle' id="etitle" value={note.etitle} onChange={onChange} minLength={3} required></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type='text' className="form-control" id='etag' name='etag' value={note.etag} onChange={onChange} ></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" value={note.edescription} onChange={onChange} name='edescription' rows="4" minLength={8} required></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3} type="button" onClick={handleClick} className="btn btn-success">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

        <hr/>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && ' No notes to Display'}
                </div>
                {notes.map((notes) => {
                    return <Noteitem key={notes._id} notes={notes} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
