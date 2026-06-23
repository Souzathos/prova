import React, { useEffect, useRef, useState } from 'react'
import GuestCard from '../components/GuestCard'
import Header from '../components/Header'
import Hero from '../components/Hero'

function Admin() {
    const [guests, setGuests] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState(null)
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
            const res = await fetch("http://localhost:3000/guest/list", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            setGuests(data)
        } catch (err) {
            console.log("Erro ao listar convidados", err)
        }
    }

    async function save(id) {
        try {

            if (!form.name || !form.email) {
                throw new Error('Nome e Email são obrigatorios')
            }

            if (editingId) {
                const res = await fetch(`http://localhost:3000/guest/update/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                })
                if (!res.ok) throw new Error('Erro ao editar convidado')
            } else {
                const res = await fetch(`http://localhost:3000/guest/register`, {
                    method: "POST",
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (!res.ok) throw new Error('Erro ao criar convidado')
            }

            resetForm()
            load()
        } catch (err) {
            setError(err)
            throw new Error('Erro ao salvar convidado', err)
        }
    }


    function edit(g) {
        setEditingId(g.id)
        setForm({
            name: g.name || "",
            email: g.email || "",
            phone: g.phone || "",
            table_number: g.table_number || ""
        })
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

    async function remove(id) {
        if (!confirm('Deseja mesmo excluir? ')) return
        const data = await fetch(`http://localhost:3000/guest/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        load()
    }

    useEffect(() => { load() }, [])
    return (
        <div className='min-h-screen bg-[#F5EDE2] p-4'>

            <Header page="Painel administrativo" />
            <Hero guests={guests} funcao={handlePrint} title="Administração" />
            <div className='flex flex-col justify-between gap-10 mt-35 md:flex-row'>
                <div className='gap-2 mt-5  bg-white rounded-2xl shadow p-6 md:w-1/2 '>

                    <h3 className='text-xs text-[#C9A86A] tracking-widest '>NOVO CONVIDADO</h3>
                    <h2 className='text-4xl font-serif mb-10'>Cadastro</h2>
                    {error && (<p className='text-sm text-rose-500 text-center'>{error.message}</p>)}

                    <input type="text" placeholder='Nome Completo' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className='w-full text-[#4a3428]  bg-white/80 cursor-pointer mb-10 border-b border-b-[#C9A86A]  py-4' />

                    <input type="email" placeholder='E-mail' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className='w-full text-[#4a3428]  bg-white/80 cursor-pointer mb-10 border-b border-b-[#C9A86A]  py-4' />


                    <input type="text" placeholder='Telefone' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className='w-full text-[#4a3428]  bg-white/80 cursor-pointer mb-10 border-b border-b-[#C9A86A]  py-4' />

                    <input type="text" placeholder='Número da mesa' value={form.table_number} onChange={(e) => setForm({ ...form, table_number: Number(e.target.value) })}
                        className='w-full  text-[#4a3428] bg-white/80 cursor-pointer  mb-10 border-b border-b-[#C9A86A]  py-4' />
                    <div className='flex gap-5'>

                        <button onClick={() => save(editingId)} className={` w-full cursor-pointer rounded-full mt-2 shadow p-4 font-semibold  ${editingId ? "bg-[#C99458] hover:bg-[#da9648] text-[#3D2E26] transition" : "bg-[#3D2E26] text-white  hover:bg-[#574236] transition"} cursor-pointer`}>
                            {editingId ? "Atualizar" : "Cadastrar"}
                        </button>

                        {editingId && (
                            <button onClick={resetForm} className='w-full rounded-full shadow bg-white hover:bg-white/70 p-4 mt-2 cursor-pointer border border-[#da9648]  text-[#3D2E26] font-semibold'>Cancelar</button>
                        )}
                    </div>

                </div>

                <div ref={ref} className='flex flex-col gap-2 mt-4 w-full'>

                    <div className=''>
                        {guests.map(g => (
                            <GuestCard key={g.id} guest={g}>
                                <button onClick={() => edit(g)}
                                    className='bg-[#C99458] hover:bg-[#da9648] rounded-full cursor-pointer shadow px-5 py-2 mb-2 mt-2 font-semibold text-[#3D2E26] transition'>
                                    Editar
                                </button>

                                <button className='bg-[#810c0c] hover:bg-rose-500 cursor-pointer rounded-full shadow  px-5 py-2 text-white font-semibold' onClick={() => remove(g.id)}>Excluir</button>
                            </GuestCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Admin