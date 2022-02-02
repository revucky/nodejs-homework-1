// contacts.js
const { uid } = require("uid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументувати кожну функцію
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      console.table(data);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      console.table(data.filter((elem) => +elem.id === contactId));
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const some = data.filter((elem) => +elem.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(some));
      listContacts();
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const some = [...data, { id: uid(), name, email, phone }];
      fs.writeFile(contactsPath, JSON.stringify(some));
      listContacts();
    });
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
