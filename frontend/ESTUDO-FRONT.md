# 🎯 Guia pra decorar o front — Wedding Pass

> Objetivo: reconstruir as telas **de memória** numa competição.
> Foco em **estrutura (árvore de divs) + padrões recorrentes**, não em decorar cada `className`.
> A sacada: você não decora 8 telas. Você decora ~5 "tijolos" e 1 "molde", e monta tudo com eles.

---

## 0. A ideia central (leia isso primeiro)

Quase tudo no seu front é repetição de 5 padrões. Se você decorar **estes 5 tijolos** e o
**molde de página**, você reconstrói qualquer tela:

```
TIJOLO 1 — CARD:    bg-ivory  rounded-2xl  shadow  p-6
TIJOLO 2 — PÍLULA:  rounded-full  px-4 py-2  (botões e badges)
TIJOLO 3 — INPUT:   w-full  border-b  py-..  outline-none  (linha, sem caixa)
TIJOLO 4 — ROW:     flex  items-center  justify-between   (cabeçalho: algo à esq, algo à dir)
TIJOLO 5 — STACK:   flex flex-col gap-..   /   grid grid-cols-1 md:grid-cols-3 gap-4
```

E o **molde de página interna** (Reception, Dashboard, Admin são todas iguais no topo):

```
<div p-4 min-h-screen bg-cream>      ← wrapper da página (também é o ref de impressão)
   <Header />
   <Hero />
   ...conteúdo específico da página...
</div>
```

Decora isso e você já tem 70% das 3 páginas principais.

---

## 1. O mapa (arquitetura) — `App.jsx`

4 rotas:

| Rota          | Tela        | Protegida?         |
|---------------|-------------|--------------------|
| `/`           | Login       | não                |
| `/reception`  | Reception   | não                |
| `/dashboard`  | Dashboard   | sim (admin)        |
| `/admin`      | Admin       | sim (admin)        |

Proteção = `<PrivateRoute allowedRoles={["admin"]}>...</PrivateRoute>` em volta da tela.

**Componentes reaproveitados** (decora 1 vez, usa em todo lugar):
- `Header` → barra do topo
- `Hero` → painel marrom escuro com título + 3 `MiniCard`
- `MiniCard` → cada cartãozinho de número
- `GuestCard` → cartão de convidado (recebe botões via `children`)

> **Hierarquia mental:** `Hero` **contém** 3x `MiniCard`. `Reception`/`Admin` fazem `.map` de `GuestCard`.

---

## 2. Paleta de cores — `App.css` (`:root`)

Você não precisa decorar os hex. Decora os **apelidos** e o **papel** de cada um:

| Variável         | Apelido mental      | Onde usa                                  |
|------------------|---------------------|-------------------------------------------|
| `--ivory`        | branco-creme        | fundo dos cards                           |
| `--cream`        | fundo da página     | `bg-[var(--cream)]` no wrapper            |
| `--dark-brown`   | marrom escuro       | Hero, texto forte, botão "Sair"           |
| `--warm-gold`    | dourado             | detalhes, labels, bordas de input         |
| `--warning`      | âmbar (CTA)         | botões de ação, destaques                 |
| `--success`      | verde               | check-in feito                            |
| `--danger`       | vermelho            | excluir / erro                            |

> As 3 que mais aparecem: **ivory** (card), **dark-brown** (Hero/texto), **warm-gold** (detalhe).
> Sintaxe no Tailwind v4 aqui aparece de 2 jeitos (ambos valem): `bg-[var(--ivory)]` e `bg-(--dark-brown)`.

---

## 3. Vocabulário Tailwind recorrente (os tijolos, detalhados)

### 🧱 Card base
```
bg-[var(--ivory)]  rounded-2xl  shadow(-lg/-xl)  p-4|p-6
```
Tudo que é "caixa branca arredondada" usa isso. Hero é a versão escura (`bg-dark-brown`).

### 🧱 Pílula (botão / badge)
```
rounded-full  px-4 py-2  cursor-pointer  transition  + cor de fundo
```
Badge de status = mesma pílula com `text-xs` e cor de estado.

### 🧱 Input de linha (não tem caixa, só sublinhado)
```
w-full  bg-transparent|white/80  border-b border-[--warm-gold]  py-3|py-4  outline-none
```
Esse é o "look" do projeto inteiro: inputs são **linhas**, não retângulos.

### 🧱 Row (cabeçalho: esquerda x direita)
```
flex  items-center  justify-between
```
Toda vez que tem "texto de um lado, botão do outro", é isso.

### 🧱 Stack / Grid
```
empilhar:        flex flex-col gap-..
3 colunas:       grid grid-cols-1 md:grid-cols-3 gap-4
```

### 📱 Regra responsiva do projeto
Mobile empilha, desktop espalha:
```
flex-col   →   md:flex-row   (ou lg:flex-row)
```
Sempre que vir `md:` / `lg:` / `sm:`, é "no telão fica lado a lado".

---

## 4. Esqueletos de referência (do mais fácil ao mais difícil)

> Notação: cada linha = um elemento. Indentação = aninhamento.
> Mostro só a **classe-chave** do nível, não a className inteira.

### 4.1 🟢 MiniCard  *(o que você não tinha pegado)*
Só **1 caixa com 3 textos empilhados** e uma **borda colorida à esquerda**.
```
div  (CARD: bg-ivory p-6 rounded-sm shadow border-l-4)   ← a cor da borda vem por prop `border` (style inline)
 ├─ p   título      (uppercase, dourado, pequeno)         → "TOTAL"
 ├─ h2  valor       (text-4xl/5xl font-serif)             → 42
 └─ p   descrição   (text-sm, dourado)                    → "Convidados Cadastrados"
```
Props: `title`, `value`, `border` (cor da borda esquerda), `description`.
**Por que a borda é inline?** porque a cor muda por card → `style={{ borderColor: border }}`.

### 4.2 🟢 Hero
Painel **marrom escuro** = cabeçalho (texto + botão) em cima, **grid de 3 MiniCards** embaixo.
```
div  (bg-dark-brown rounded-2xl text-white p-6)
 ├─ div  ROW (flex justify-between items-center mb-6)
 │   ├─ div  (space-y-2)            ← bloco de texto à ESQUERDA
 │   │   ├─ p   "Controle de recepção"
 │   │   ├─ h1  "Painel <span>{title}</span>"   (text-5xl font-serif; span em âmbar)
 │   │   └─ p   subtítulo (text-white/80)
 │   └─ div  → button "Exportar relatório"   ← à DIREITA (onClick={funcao})
 └─ div  GRID (grid-cols-1 md:grid-cols-3 gap-4)
     ├─ MiniCard "Total"        value=total
     ├─ MiniCard "Confirmados"  value=confirmed  border=verde
     └─ MiniCard "Pendentes"    value=pending    border=âmbar
```
Props: `guests`, `funcao` (imprimir), `title`. Calcula dentro: `total / confirmed / pending`.

### 4.3 🟡 GuestCard
Card que recebe os **botões por fora** (`children`) — por isso serve pra Reception E Admin.
```
div  (CARD: bg-ivory border rounded-2xl p-4 shadow)
 └─ div  ROW (flex flex-col xl:flex-row justify-between)   ← infos | {children}
     ├─ div  (flex flex-col sm:flex-row gap-4)             ← avatar + infos
     │   ├─ div  AVATAR (w-14 h-14 rounded-full)           ← círculo (vazio)
     │   └─ div  (flex flex-col gap-3)                     ← bloco de infos
     │       ├─ div  linha1: h2 nome  +  (MapPin + "Mesa N")
     │       ├─ div  linha2: (Mail + email)  (Phone + phone)
     │       └─ div  badge status: check-in? verde "Realizado" : âmbar "Pendente"
     └─ {children}                                          ← botões que a PÁGINA injeta
```
Ícones: `lucide-react` (`Mail`, `MapPin`, `Phone`).
**Sacada:** o GuestCard não sabe quais botões mostra. Reception passa "Check-in", Admin passa "Editar/Excluir".

### 4.4 🟡 Reception  *(página)*
Molde de página + busca + lista.
```
div  WRAPPER (p-4 min-h-screen bg-cream, ref={ref})
 ├─ <Header />
 ├─ <Hero title="Recepção" funcao={imprimir} guests={guests} />
 ├─ input  busca (PÍLULA: w-full rounded-full p-4)   value=search
 ├─ {loading && <p>Carregando...</p>}
 └─ filtered.map(g =>
       <GuestCard guest={g}>
          <button> check-in </button>     ← children: verde se já feito, âmbar se pendente
       </GuestCard>
    )
```
Lógica: `filtered = guests.filter(nome inclui search)`. Botão chama `checkin(id)` → recarrega.

### 4.5 🟡 Dashboard  *(página)*
Molde de página + **um card com gráfico** (recharts).
```
div  WRAPPER (p-4 min-h-screen bg-cream, ref={ref})
 ├─ <Header />
 ├─ <Hero title="dashboard" guests funcao />
 └─ div  CARD do gráfico (bg-ivory rounded-2xl shadow p-6 mt-10)
     ├─ div  cabeçalho: "Visão Geral" + h2 "Distribuição RSVP"
     ├─ span "Atualização automática"
     └─ div  (h-64/h-80 w-full)            ← container de altura fixa pro gráfico
         └─ ResponsiveContainer
             └─ BarChart data={chartData}
                 ├─ XAxis dataKey="name"
                 ├─ YAxis
                 ├─ Tooltip
                 └─ Bar dataKey="value" → .map(Cell fill=cor)
```
`chartData` = 3 objetos `{name, value, fill}` (Total/Confirmados/Pendentes).
Atualiza sozinho: `setInterval(load, 5000)` no `useEffect` (e `clearInterval` no cleanup).

### 4.6 🔴 Admin  *(página — a mais cheia)*
Molde de página + **linha dividida em 2**: formulário | lista.
```
div  WRAPPER (p-4 min-h-screen bg-cream)
 ├─ <Header />
 ├─ <Hero title="do Admin" guests funcao />
 └─ div  SPLIT (flex flex-col md:flex-row justify-between gap-10)
     ├─ div  FORM (CARD bg-white rounded-2xl shadow p-6, md:w-1/2)
     │   ├─ h3 "NOVO CONVIDADO"  +  h2 "Cadastro"
     │   ├─ {error && <p>}
     │   ├─ input Nome          (INPUT de linha)
     │   ├─ input E-mail
     │   ├─ input CPF
     │   ├─ input Telefone
     │   ├─ input Número da mesa
     │   └─ div (flex gap-5)
     │       ├─ button  Cadastrar/Atualizar   (cor muda se editingId)
     │       └─ {editingId && <button> Cancelar </button>}
     └─ div  LISTA (ref={ref}, w-full)
         └─ guests.map(g =>
               <GuestCard guest={g}>
                  <button> Editar </button>     ← dourado
                  <button> Excluir </button>    ← vermelho
               </GuestCard>
            )
```
Estados-chave: `form` (objeto com 5 campos), `editingId` (null = cadastrar, id = editar).
`save()` decide POST (criar) vs PUT (editar) pelo `editingId`.

### 4.7 🔵 Login  *(revisão)*
Tela centralizada com **card de 2 colunas: imagem | formulário**.
```
div  TELA (min-h-screen flex items-center justify-center)
 └─ div  CARD (max-w-6xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl)
     ├─ div  imagem (hidden lg:block)         ← só aparece no desktop
     │   └─ img  (object-cover w-full h-full)
     └─ div  FORM (flex items-center justify-center)
         └─ div (max-w-md)
             ├─ p  "Acesso Restrito"
             ├─ h1 "Wedding Pass" (text-6xl font-serif)
             ├─ p  "Celebre cada momento"
             ├─ div → label + input E-mail   (INPUT de linha)
             ├─ div → label + input Senha
             ├─ {error && <p>}
             └─ button "Entrar" (PÍLULA w-full bg-warm-gold)
```

### 4.8 🔵 Header  *(revisão)*
Barra: logo à esquerda, nav no meio, botão sair à direita.
```
div  BARRA (CARD: bg-ivory p-4 rounded-2xl shadow-xl)
 └─ div  ROW (flex items-center justify-between)
     ├─ div  logo (flex flex-col)            → p "Wedding Pass" + h1 "Recepção"
     ├─ div  nav (flex space-x-6)
     │   ├─ {role==="admin" && <Link>Dashboard</Link>}
     │   ├─ <Link>Recepção</Link>
     │   └─ {role==="admin" && <Link>Administração</Link>}
     └─ button "Sair" (PÍLULA bg-dark-brown, LogOut icon)  → logout()
```
`logout()` = `localStorage.clear()` + redireciona pra `/`.

---

## 5. Método de memorização (como treinar)

Para **cada tela**, estude em **3 camadas** (não tente tudo de uma vez):

1. **Camada ESTRUTURA** — desenhe só a árvore de divs em branco (sem classes). Só o esqueleto.
2. **Camada LAYOUT** — preencha a classe de arranjo de cada nível: é `flex`? `flex-col`? `grid`? `justify-between`?
3. **Camada DETALHE** — preencha cores, tamanhos de texto, arredondamento.

**Ordem de estudo (do tijolo → ao prédio):**
```
MiniCard  →  Hero  →  GuestCard  →  Reception  →  Dashboard  →  Admin  →  (revisar Login + Header)
```
Por quê: Hero precisa do MiniCard; as páginas precisam do Hero e do GuestCard. Construa de baixo pra cima.

**Repetição espaçada (a semana):**
- Dia 1: tijolos (seção 3) + MiniCard + Hero.
- Dia 2: revisa dia 1 de memória + GuestCard + Reception.
- Dia 3: revisa + Dashboard + Admin.
- Dia 4+: só drills (seção 6) cronometrados, focando no Admin.

---

## 6. Drills em branco (pratique de memória, depois confira na seção 4)

### Drill A — MiniCard
> Escreva o MiniCard do zero. **Checklist:** 1 div? `border-l-4`? borda por `style` inline? 3 textos (título/valor/descrição)?

### Drill B — Hero
> Reconstrua o Hero. **Checklist:** fundo marrom? row `justify-between` (texto | botão)? grid `md:grid-cols-3` com 3 MiniCards? span do título em âmbar?

### Drill C — GuestCard (esqueleto furado — complete os `___`)
```
div  (___ rounded-2xl p-4 shadow)
 └─ div  (flex ___ xl:flex-row justify-between)
     ├─ div  (flex flex-col sm:flex-row gap-4)
     │   ├─ div  AVATAR (w-14 h-14 ___)
     │   └─ div  (flex flex-col gap-3)
     │       ├─ div  nome + (___ icon "Mesa N")
     │       ├─ div  (Mail email) (Phone phone)
     │       └─ div  badge: checked_in ? ___ : ___
     └─ ___          ← o que entra aqui? (dica: vem da página)
```

### Drill D — Molde de página (de cabeça)
> Escreva o topo comum de Reception/Dashboard/Admin sem olhar. (3 elementos no wrapper.)

### Drill E — Admin (esqueleto furado)
```
div  WRAPPER (p-4 min-h-screen bg-cream)
 ├─ <___ />
 ├─ <___ />
 └─ div  (flex flex-col ___ justify-between gap-10)
     ├─ div  FORM (___ md:w-1/2)
     │   ├─ ... quantos inputs? ___
     │   └─ button: texto muda conforme qual estado? ___
     └─ div  LISTA
         └─ guests.map → <GuestCard> com 2 botões: ___ e ___
```

### Drill F — Dashboard
> Reconstrua o card do gráfico. **Checklist:** container com altura fixa (`h-80`)? `ResponsiveContainer > BarChart`? `XAxis`/`YAxis`/`Tooltip`/`Bar`? `Bar` faz `.map` de `Cell`?

---

## 7. Resumo de 1 minuto (pra reler antes da prova)

- **5 tijolos:** Card · Pílula · Input-linha · Row(`justify-between`) · Stack/Grid.
- **Molde de página:** `wrapper bg-cream` → `Header` → `Hero` → conteúdo.
- **Hero** = caixa marrom (row texto|botão) + grid de **3 MiniCards**.
- **MiniCard** = 1 caixa, 3 textos, `border-l-4` colorida (cor por prop).
- **GuestCard** = avatar + infos + badge, e os **botões vêm via `children`** (Reception=check-in, Admin=editar/excluir).
- **Reception** = busca + `.map` de GuestCard. **Admin** = form (5 inputs) | lista. **Dashboard** = card com BarChart (recharts).
- **Responsivo:** `flex-col` no celular → `md:flex-row` no telão.
```
```

> Você já tem as telas na cabeça. Esse guia é só pra transformar "imagem mental" em "árvore de divs" rápido. Boa competição! 🏆
