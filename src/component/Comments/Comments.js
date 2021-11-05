import classes from "./comments.module.css"

function Comments({ name, email, body, deleteHandler, id, updateHandler }) {

    return (
        <div className={classes.comments}>
            <p>Name : {name[0].toUpperCase() + name.substr(1)}</p>
            <p>Email : {email}</p>
            <p>Body : {body}</p>
            <button className={classes.btn} onClick={() => deleteHandler(id)}>Delete</button>
            <button className={classes.update} onClick={() => updateHandler(id)}>Update</button>
        </div>
    )
}

export default Comments
