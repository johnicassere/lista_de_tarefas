import { useState, useEffect } from 'react';
import { BsFillBookmarkFill, BsFillBookmarkCheckFill, BsFillTrashFill } from "react-icons/bs";
import { Api } from './helpers/Api';
import './App.css';

function App() {
const [ tarefa, setTarefa ] = useState("")
const [ lista, setList ] = useState([])
const [ loading, setLoading ] = useState(false)

const handlesubmit = async (e) => {
e.preventDefault()
const task = {
  id: tarefa.length + 1,
  tarefa,
  checked: false
}
await fetch(Api.createTarefa(), {
  method:"POST",
  body: JSON.stringify(task),
  headers:{
    "Content-Type":"application/json",
  }
})

setList((prevState) => [...prevState, task])

setTarefa('')

}


useEffect(() =>{
  const getAll = async () =>{
    setLoading(true)
  const res = await fetch(Api.getLista())
   .then((response) => response.json())
   .then((data)=> data)
   .catch((err)=> console.log(err))
   setLoading(false)
   setList(res)
  }
  getAll();
},[])

const handleDel = async (id) =>{
  await fetch(Api.deleteTarefaById(id), {
    method:"DELETE", 
  });

  setList((prevState) => prevState.filter((task) => task.id !== id))

}

const handleEdit = async (task) => {
  task.checked = !task.checked

  const data = await fetch(Api.tarefaById(task.id), {
    method:"PUT",
    body:JSON.stringify(task),
    headers:{
      "Content-Type":"application/json",
    }
  });

  setList((prevState) => prevState.map((nova) => (nova.id === data.id ? (nova = data) : nova)))
}

if(loading){
return <div className="tarefa-header">
<h1>Carregando ...</h1>
</div>
}

  return (
    <div className="App">
     <div className="tarefa-header">
     <h1>Lista de Tarefas</h1>
     </div>
     <div className="tarefa-form">
      <h2>Próxima Tarefa:</h2>
      
        <div className="form-ctrl">
          <label htmlFor="tarefa">Crie uma Tarefa</label>
          <input 
          type="text" 
          name="tarefa" 
          placeholder="Adicione uma tarefa" 
          onChange={(e)=> setTarefa(e.target.value)}
          value={tarefa || ""}
          />
        </div>
      <button onClick={handlesubmit}>Adicionar</button>
     </div>
     <div className="tarefa-lista">
      <h1>Tarefas Adicionadas:</h1>
      {lista.length === 0 && <p>Ainda não há nenhuma Tarefa!!!</p>}
      {lista.map((item)=>(
        <div className='task' key={item.id}>
          <h3 className={item.checked ? "task-check" : ""}>{item.tarefa}</h3>
          <div className="acao">
            <span onClick={() => handleEdit(item)}>
              {!item.checked ? <BsFillBookmarkFill/> : <BsFillBookmarkCheckFill/>}   
            </span>
            <BsFillTrashFill onClick={() => handleDel(item.id)}/>
          </div>
        </div>
      ))}
      
     </div>
    </div>
  );
}

export default App;
