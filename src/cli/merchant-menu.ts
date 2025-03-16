export const gestionarMercaderes = async () => {
  let managing = true;

  while(managing){

    const { accion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'accion',
        message: 'Gestión de mercaderes:',
        choices: [
          '➕ Añadir mercader', '📝 Modificar mercader', '🗑️ Eliminar mercader', '🔍 Buscar mercader', '⬅️ Volver'],
        },
      ]);
      
      switch (accion) {
        case '➕ Añadir mercader':
          console.log('Añadiendo mercader...');
          break;
          case '📝 Modificar mercader':
            console.log('Modificando mercader...');
            break;
            case '🗑️ Eliminar mercader':
              console.log('Eliminando mercader...');
              break;
              case '🔍 Buscar mercader':
                console.log('Buscando mercader...');
                break;
                case '⬅️ Volver':
                  return;
                }
              }
};