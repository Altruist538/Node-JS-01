const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, ".", "db", "contacts.json");
const crypto = require("node:crypto");
console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
// listContacts().then((data) => console.log(data));
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
}
function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}
async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  const contactNew = contacts.filter((cont) => cont.id !== contactId);
  await writeContacts(contactNew);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
}

function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта.
}
module.exports = { listContacts, getContactById, writeContacts, addContact };
