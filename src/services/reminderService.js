const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/reminders`;

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

const show = async (reminderId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reminderId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (reminderFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reminderFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteReminder = async (reminderId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reminderId}`, {
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

async function update(reminderId, reminderFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${reminderId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reminderFormData),
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
    deleteReminder,
    update
};