// Archivo gestionarClientes.ts
export const gestionarClientesMenu = async () => {
  let managing = true;

  while(managing){

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'accion',
        message: 'Gestión de clientes:',
        choices: [
          '➕ Añadir cliente', 
          '📝 Modificar cliente', 
          '🗑️ Eliminar cliente', 
          '🔍 Buscar cliente', 
          '⬅️ Volver'
        ],
      },
    ]);
    
    switch (action) {
      case '➕ Añadir cliente':
        await addClient();
        break;
      case '📝 Modificar cliente':
        await updateClient();
        break;
      case '🗑️ Eliminar cliente':
        await deleteClient();
        break;
      case '🔍 Listar cliente':
        await listClient();
        break;
      case '⬅️ Volver al menu principal':
        managing = false;  
        break;
    }
  }
};