import React from 'react'
import { editCourse, createCourse } from '../../helpers/functions'


export default function EditCourse({ edit = true, id = "modal01", course = {}, me = {}, showAlert, reloadContent }) {
    const handleSubmit = async (e) => {
        e.preventDefault()
        let modal = document.getElementById(id)
        let name = document.getElementById(`coursename${course.id}`).value
        let image = document.getElementById(`courseimage${course.id}`).value
        let response
        let message
        if (edit) {
            response = await editCourse({ name, image }, course.id, me.token)
            message = "Course info updated successifully!"
        } else {
            response = await createCourse({ name, image }, me.token)
            message = name + " added successifully!"
        }
        const { success, error } = response.data
        if (success) {

            //show success alert
            window.Toast.fire({
                title: message
            })
            reloadContent()
            if (modal) {
                modal.style.display = "none"
            }
        } else {
            showAlert({
                type: "danger",
                message: error || "something went wrong"
            })
        }
    }


    return (
        <form className="mx-0 text-left form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor={`coursename${course.id}`}>Course name</label>
                <input type="text" defaultValue={course.name} className="form-control" id={`coursename${course.id}`}></input>
            </div>

            <div className="form-group">
                {edit && course.image &&
                    <img src={course.image} className="img-fluid" alt="Course"></img>
                }
                <input accept="image/*" defaultValue={course.image} placeholder="Insert link of image" type="text" className="form-control" id={`courseimage${course.id}`}></input>
            </div>

            <div className="form-group">
                <input type="submit" value={edit ? "Save changes" : "Create Course"} className="form-control ado-btn-outline"></input>
            </div>
        </form>
    )
}
