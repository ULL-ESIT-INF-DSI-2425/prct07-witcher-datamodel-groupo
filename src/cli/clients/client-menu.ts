import inquirer  from "inquirer"; 
import { addClient } from "./addclient.js";
import { updateClient } from "./updateclient.js";
// import { removeClient } from "./deleteclient.js";
// import { searchClient } from "./searchclient.js";

/**
 * Function to display the clients menu
 * 
 * clientMenu
 */
export const clientMenu = async () => {
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
        await addClient();
        break;
      case '📝\tUpdate client':
        console.log('Modifying client...');
        await updateClient();
        break;
      case '🗑️\tRemove client':
        console.log('Removing client...');
        //await deleteClient();
        break;
      case '🔍\tSearch client':
        console.log('Searching client...');
        //await searchClient();
        break;
      case '⬅️\tBack':
        managing = false;  
        break;
    }
  }
};
