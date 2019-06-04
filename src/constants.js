import { AppConfig } from 'blockstack'

export const appConfig = new AppConfig(['store_write', 'publish_data'])

export const NOTES_FILE = "notes.json"
export const TODOS_FILE = "todos.json"
export const ITEMS = [
  {
    id: 'notes',
    name: 'Notes',
    superpower: ''
  },
  {
    id: 'todos',
    name: 'To-Do Lists',
    superpower: ''
  }
 ]

 export const TERRITORIES = [
  {
    id: 'forest',
    name: 'Forest',
    superpower: 'Trees!'
  },
  {
    id: 'tundra',
    name: 'Tundra',
    superpower: 'Let it snow!'
  }
]

export const ME_FILENAME = 'me.json'
export const SUBJECTS_FILENAME = 'subjects.json'
export const EXPLORER_URL = 'https://explorer.blockstack.org'


