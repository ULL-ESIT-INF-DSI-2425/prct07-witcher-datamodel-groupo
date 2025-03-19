import inquirer from "inquirer";

/**
 * Function to update a good
 * 
 * updateGood
 * @example
 * ```typescript
 * await updateGood();
 * ```
 */
export const updateGood = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'ID of the good to update:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'New name of the good:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'New description of the good:',
    },
    {
      type: 'input',
      name: 'material',
      message: 'New material of the good:',
    },
    {
      type: 'input',
      name: 'weight',
      message: 'New weight of the good:',
    },
    {
      type: 'input',
      name: 'value',
      message: 'New value (crowns):',
    },
  ]);

  // TODO UPDATE GOOD IN DB
}