const TarefaContext = {
    tarefaEndpoint: () => `${Api.baseUrl}`,
    getLista: () => `${TarefaContext.tarefaEndpoint()}`,
    tarefaById: (id) => `${TarefaContext.tarefaEndpoint()}/${id}`,
    createTarefa: () => `${TarefaContext.tarefaEndpoint()}`,
    deleteTarefaById: (id) => `${TarefaContext.tarefaEndpoint()}/${id}`,
  }
  
  
  
  
 export const Api = {
    baseUrl: "http://localhost:3001/tarefas",
    ...TarefaContext
  }