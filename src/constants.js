import { AppConfig } from 'blockstack'

export const appConfig = new AppConfig(['store_write', 'publish_data'])
export const NOTES_FILE = "notes.json"
export const TODOS_FILE = "todos.json"
export const ITEMS = [
  {
    id: 'notes',
    name: 'Notes'    
  },
  {
    id: 'todos',
    name: 'To-Do Lists'    
  }
 ]
export const ME_FILENAME = 'me.json'
export const EXPLORER_URL = 'https://explorer.blockstack.org'


