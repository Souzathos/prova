import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

function Admin() {
    const [guests, setGuests] = useState([])
    const [error, setError] = useState(null)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        table_number: ""
    })

    const ref = useRef()
    const handlePrint = useReactToPrint({
        contentRef: ref
    })

    async function load() {
        try {
            setLoading(true)
            const res = await fetch(`http://localhost:3000/guest/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setGuests(data)
        } finally {
            setLoading(false)
        }
    }    

    async function save(id) {
        try {
            if(!form.name || !form.email || !form.phone || !form.table_number) throw new Error('Formulário incompleto.')
            
            if(editingId) {
                if(!confirm('Deseja Atualizar o convidado?')) return
                const res = await fetch(`http://localhost:3000/guest/update/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                if(!res.ok) throw new Error('Erro ao editar convidado')
                load()
                setEditingId(null)
                resetForm()
            }  else {
                const res = await fetch('http://localhost:3000/guest/register', {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'applcation/json'
                    }
                })
                if(!res.ok) throw new Error('Erro ao criar convidado')
                load()
                resetForm()
            }
        }catch(e) {
            setError('Erro ao salvar convidado', e)
        }
    }

    function resetForm() {
        setEditingId(null)
        setForm({
            name: "",
            email: "",
            phone: "",
            table_number: ""
        })
    }

    function edit(g) {
        setEditingId(g.id)
        setForm({
            name: g.name || "",
            email: g.email || "",
            phone: g.phone || "",
            table_number: Number(g.table_number?.table_number) || ""
        })
    }

    async function remove(id) {
        try {
            if(!confirm('Deseja excluir o convidado?')) return
            const res = await fetch(`http://localhost:3000/guest/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch(e) {
            setError('Erro ao editar convidado', e)
        }
    }

    async function undoCheckin(id) {
        try {
            if(!confirm('Deseja desfazer o check-in?')) return
            const res = await fetch(`http://localhost:3000/guest/remove-checkin/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            load()
        } catch(e) {
            setError('Erro ao desfazer checkin', e)
        }
    }


  return (
    <div>Admin</div>
  )
}

export default Admin