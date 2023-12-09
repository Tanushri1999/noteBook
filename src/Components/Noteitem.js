import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { notes, updateNote } = props;

    // props.showAlert('Note has been removed!', 'success')
    return (
        <div className="col-md-4 my-2">
        <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{notes.title}</h5>
                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id)}} style={{color: "#f20202"}}></i>
                <i className="fa-solid fa-file-pen mx-2" style={{color: "#0cb617"}}  onClick={()=>{updateNote(notes)}}></i>
                </div>
                <p className="card-text">{notes.description}</p>
            </div>
        </div>
        </div>
    )
}

export default Noteitem
