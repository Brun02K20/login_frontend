import axios from "axios";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const createNote = async (data) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    try {
        const response = await axios.post(
            `http://localhost:4001/api/loginForm/tareas`,
            data,
            config
        );

        return response
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }


}

const notesServices = {
    createNote,
    setToken
}

export { notesServices }