import inquirer  from "inquirer"; 
import { addClient } from "./addclient.js";
import { updateClient } from "./updateclient.js";
// import { removeClient } from "./deleteclient.js";
import { searchClient } from "./searchclient.js";
import { DB_Client } from "../../db/db_clients.js";

/**
 * Function to display the clients menu
 * 
 * clientMenu
 * @example
 * ```typescript
 * await clientMenu();
 * ```
 */
export const clientMenu = async (dbClient: DB_Client) => {
  let managing = true;

  while(managing){

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Clients management:',
        choices: [
          '➕\tAdd client', 
          '📝\tUpdate client', 
          '🗑️\tRemove client', 
          '🔍\tSearch client', 
          '⬅️\tBack'
        ],
      },
    ]);
    
    switch (action) {
      case '➕\tAdd client':
        console.log('Adding client...');
        await addClient(dbClient);
        break;
      case '📝\tUpdate client':
        console.log('Modifying client...');
        await updateClient(dbClient);
        break;
      case '🗑️\tRemove client':
        console.log('Removing client...');
        //await deleteClient();
        break;
      case '🔍\tSearch client':
        console.log('Searching client...');
        await searchClient(dbClient);
        break;
      case '⬅️\tBack':
        managing = false;  
        break;
    }
  }
};
