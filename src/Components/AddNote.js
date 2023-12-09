import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    
    const [note, setNote] = useState({title: "", tag: "", description: ""})

    const handleOnClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", tag:"", description: ""});
    }


    const onChange = (e)=>{
        setNote ({...note, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <div className="container my-3">
                <h1>Add New Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type='text' className="form-control" name='title' id="title" onChange={onChange} minLength={3} value={note.title} required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type='text' className="form-control" id='tag' name='tag' value={note.tag} onChange={onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" onChange={onChange} name='description' rows="4" minLength={8} value={note.description} required></textarea>
                    </div>
                    <button disabled={note.title.length<3} type="submit" className="btn btn-success" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
