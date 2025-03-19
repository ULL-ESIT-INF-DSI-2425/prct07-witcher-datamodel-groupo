import inquirer from 'inquirer';
/**
 * Function to add a good
 * 
 * addGood
 * @example
 * ```typescript
 * await addGood();
 * ```
 */
export const addGood = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID of the good:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name of the good:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description of the good:',
    },
    {
      type: 'input',
      name: 'material',
      message: 'Material of the good:',
    },
    {
      type: 'input',
      name: 'weight',
      message: 'Weight of the good:',
    },
    {
      type: 'input',
      name: 'value',
      message: 'Value (crowns):',
    },
  ]);
  //TODO: add good to the database
}

