const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsAll = await listContacts();
      console.table(contactsAll);
      break;

    case "get":
      const contactId = await getContactById(id);
      console.log(contactId);

      break;

    case "add":
      const contactAdd = await addContact(name, email, phone);
      console.log(contactAdd);

      break;

    case "remove":
      const contactRemove = await removeContact(id);
      console.log(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
