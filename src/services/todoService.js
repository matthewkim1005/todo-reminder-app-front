const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/todos`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (todoId) => {
    try {
        const res = await fetch(`${BASE_URL}/${todoId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (todoFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const createComment = async (todoId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${todoId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteTodo = async (todoId) => {
    try {
        const res = await fetch(`${BASE_URL}/${todoId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

async function update(todoId, todoFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${todoId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export {
    index,
    show,
    create,
    createComment,
    deleteTodo,
    update
};