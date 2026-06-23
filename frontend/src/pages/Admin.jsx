import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Header from '../components/Header'
import Hero from '../components/Hero'
import GuestCard from '../components/GuestCard'

function Admin() {
    const [guests, setGuests] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')    // busca por nome
    const [mesa, setMesa] = useState('')         // busca por número da mesa
    const [ordem, setOrdem] = useState('nome')   // ordenação: nome | status | mesa
    const [form, setForm] = useState({
        name: "",
        email: "",
        cpf: "",
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
            const res = await fetch('http://localhost:3000/guest/list', {
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
            if (!form.name || !form.email || !form.cpf || !form.phone  || !form.table_number) throw new Error('Formulário incompleto.')

            if (editingId) {
                const res = await fetch(`http://localhost:3000/guest/update/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(form),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                if (!res.ok) throw new Error('Erro ao editar convidado')
            } else {
                const res = await fetch(`http://localhost:3000/guest/register`, {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                if (!res.ok) throw new Error('Erro ao cadastrar convidado')
            }
            setError(null)
            resetForm()
            load()
        } catch (e) {
            setError(e)
            throw new Error('Erro ao salvar convidado', e)
        }
    }

    function edit(g) {
        setEditingId(g.id)
        setForm({
            name: g.name || "",
            email: g.email || "",
            cpf: g.cpf || "",
            phone: g.phone || "",
            // a relação retorna o objeto TableConfig; o número fica em table_number, não number
            table_number: g.table_number?.table_number || ""
        })
    }

    function resetForm() {
        setEditingId(null)
        setForm({
            name: "",
            email: "",
            cpf: "",
            phone: "",
            table_number: ""
        })
    }

    async function remove(id) {
        if (!confirm('Deseja mesmo excluir?')) return
        const data = await fetch(`http://localhost:3000/guest/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        load()
    }


    async function removeCheckin(id) {
        try {
            if(!confirm('Deseja desfazer o checkin?')) return
            const res = await fetch(`http://localhost:3000/guest/remove-checkin/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = res.json()
            load()
        } catch(e) {
            setError(e)
            throw new Error('Não foi possivel desfazer o checkin', e)
        }
    }
    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if(!error) return
        const t = setTimeout(() => setError(null), 3000)
        return () => clearTimeout(t)
    }, [error])


    // filtra por nome e por mesa, depois ordena pelo critério escolhido (nome, status ou mesa)
    const filtered = guests
        .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
        .filter((g) => mesa ? g.table_number?.table_number === Number(mesa) : true)
        .sort((a, b) => {
            if (ordem === 'mesa') return a.table_number?.table_number - b.table_number?.table_number
            if (ordem === 'status') return a.checked_in - b.checked_in   // pendentes (false) antes dos confirmados (true)
            return a.name.localeCompare(b.name)
        })

    return (
        <div className='p-4 min-h-screen bg-[var(--cream)]'>
            <Header page="Painel Administrativo" />
            <Hero guests={guests} funcao={handlePrint} title="do Admin" />

            <div className='flex flex-col justify-between gap-10 mt-15 md:flex-row'>
                <div className='gap-2 bg-[var(--ivory)] rounded-2xl p-6 md:w-1/2'>
                    <h3 className='text-xs text-[var(--warm-gold)] tracking-widest'>NOVO CONVIDADO</h3>
                    <h2 className='text-4xl text-[var(--dark-brown)] mb-10 font-serif'>Cadastro</h2>
                    {error && (<p className='text-xs text-center text-[var(--danger)]'>{error.message}</p>)}

                    <input type="text" value={form.name} placeholder='Nome Completo' className='w-full border-b border-b-[var(--warm-gold)] py-4 cursor-pointer mb-10'
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />

                    <input type="text" value={form.email} placeholder='E-mail' className='w-full border-b border-b-[var(--warm-gold)] py-4 cursor-pointer mb-10'
                        onChange={(e) => setForm({ ...form, email: e.target.value })} />

                    <input type="text" value={form.cpf} placeholder='CPF' className='w-full border-b border-b-[var(--warm-gold)] py-4 cursor-pointer mb-10'
                        onChange={(e) => setForm({ ...form, cpf: e.target.value })} />

                    <input type="text" value={form.phone} placeholder='Telefone' className='w-full border-b border-b-[var(--warm-gold)] py-4 cursor-pointer mb-10'
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} />

                    <input type="text" value={form.table_number} placeholder='Número da mesa' className='w-full border-b border-b-[var(--warm-gold)] py-4 cursor-pointer mb-10'
                        onChange={(e) => setForm({ ...form, table_number: Number(e.target.value) })} />

                    <div className='flex gap-5'>
                        <button onClick={(g) => save(g.id)} className={`w-full  p-4 rounded-full shadow cursor-pointer ${editingId ? 'bg-[var(--warm-gold)] text-[var(--dark-brown)]' : 'bg-[var(--dark-brown)] text-white'} transition`}>{editingId ? "Atualizar" : "Cadastrar"}</button>

                        {editingId && (
                            <button className='w-full p-4 rounded-full bg-[var(--ivory)] border border-[var(--warning)] text-[var(--warning)] cursor-pointer transition' onClick={resetForm}>Cancelar</button>
                        )}
                    </div>

                </div>

                <div ref={ref} className='w-full flex flex-col gap-2 mt-4'>
                    {/* busca por nome, por mesa e ordenação (nome, status ou mesa) */}
                    <div className='flex flex-col gap-3 mb-4 sm:flex-row'>
                        <input type="text" placeholder='Buscar por nome...' className='flex-1 bg-[var(--ivory)] p-3 border rounded-full border-gray-400 shadow' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <input type="number" placeholder='Mesa' className='bg-[var(--ivory)] p-3 border rounded-full border-gray-400 shadow sm:w-28' value={mesa} onChange={(e) => setMesa(e.target.value)} />
                        <select className='bg-[var(--ivory)] p-3 border rounded-full border-gray-400 shadow' value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                            <option value="nome">Ordenar por nome</option>
                            <option value="mesa">Ordenar por mesa</option>
                            <option value="status">Ordenar por status</option>
                        </select>
                    </div>
                    <div>
                    {loading && (<p>Carregando convidados...</p>)}
                    {filtered.map(g => (
                        <GuestCard
                            key={g.id}
                            guest={g}
                        >
                            <button onClick={() => edit(g)} className='rounded-full bg-[var(--warm-gold)] text-[var(--ivory)] py-1 px-6 transition cursor-pointer sm:py-2'>Editar</button>
                            <button onClick={() => remove(g.id)} className='rounded-full bg-[var(--danger)] text-[var(--ivory)] py-1 px-6  transition  cursor-pointer sm:py-2'>Excluir</button>
                            {g.checked_in ? <button className='rounded-full bg-[var(--dusty-rose)] text-[var(--ivory)] py-1 px-6 transition cursor-pointer text-xs sm:py-2' onClick={() => removeCheckin(g.id)}>Remover checkin</button> : null}
                        </GuestCard>
                    ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Admin