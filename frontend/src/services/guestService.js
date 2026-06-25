import { api } from './api'

export async function listGuests() {
    return api('/guest/list')
}

export async function registerGuest(form) {
    return api('/guest/register', {
        method: 'POST',
        body: JSON.stringify(form)
    })
}

export async function updateGuest(id, form) {
    return api(`/guest/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form)
    })
}

export async function deleteGuest(id) {
    return api(`/guest/delete/${id}`, {
        method: 'DELETE'
    })
}

export async function checkinGuest(id) {
    return api(`/guest/checkin/${id}`, {
        method: 'POST'
    })
}

export async function undoCheckinGuest(id) {
    return api(`/guest/remove-checkin/${id}`, {
        method: 'POST'
    })
}
