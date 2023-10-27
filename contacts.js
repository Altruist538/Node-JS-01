const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, ".", "db", "contacts.json");
const crypto = require("node:crypto");
console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
}
function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}
async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  const contactsNew = contacts.filter((cont) => cont.id !== contactId);
  await writeContacts(contactsNew);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
