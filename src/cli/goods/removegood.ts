import inquirer from "inquirer";

/**
 * Function to remove a good
 * 
 * removeGood
 */
export const removeGood = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name of the good to remove:',
    },
  ]);

  // TODO REMOVE GOOD FROM DB
};