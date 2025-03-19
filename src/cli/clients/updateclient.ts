import inquirer from "inquirer";

/**
 * Function to update a client
 * 
 * updateClient
 * @example
 * ```typescript
 * await updateClient();
 * ```
 */
export async function updateClient(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "ID of the client you want to update:",
    },
    {
      type: "input",
      name: "newName",
      message: "Update the name of the client:",
    },
    {
      type: "input",
      name: "newRace",
      message: "Update the race of the client:",
    },
    {
      type: "input",
      name: "newLocation",
      message: "Update the race of the client:",
    },
  ]);

  // TODO UPDATE CLIENT IN DB
}