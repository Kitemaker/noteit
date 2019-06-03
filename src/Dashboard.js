import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { jsonCopy, subjectFromKingdomUrl,
  loadUser, loadSubjects, resolveSubjects } from './utils'
import Subject from './Subject'
import { appConfig, SUBJECTS_FILENAME, EXPLORER_URL } from './constants'

import './Dashboard.css'
import OptionsList from './OptionsList';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        notes: {

        },
        todos: {

        }
      },
      subjects: [],
      value: '',
      app:`${props.protocol}//${props.realm}`,
      rulerUsername: props.user,
      clickAdd: false
    }
    this.userSession = new UserSession({ appConfig })
    this.addSubject = this.addSubject.bind(this)
    this.removeSubject = this.removeSubject.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.loadDashboard = this.loadDashboard.bind(this)
  }

  componentWillMount() {
    const app = this.state.app
    const user = this.props.user
    this.loadDashboard(user, app)
    const search = window.location.search
    if(search) {
      const appUrl = search.split('=')[1]
      this.setState({
        value: appUrl,
        clickAdd: true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextSubjects = nextProps.subjects
    if(nextSubjects) {
      if (nextSubjects.length !== this.state.subjects.length) {
        this.setState({ subjects: jsonCopy(nextSubjects) })
      }
      resolveSubjects(this, this.userSession, nextSubjects)
    }
  }


  handleChange(event) {
   this.setState({value: event.target.value});
  }

  loadDashboard(user, app) {
    loadUser(this.userSession, user, app)
    .then(user => {
      if (user) {
        this.setState({ user })
      }
    })

    loadSubjects(this.userSession, user, app)
    .then(subjects => {
      this.setState({ subjects })
      resolveSubjects(this, this.userSession, subjects)
    })
  }

  addSubject(e) {
    e.preventDefault()
    const subject = subjectFromKingdomUrl(this.state.value)
    const subjects = jsonCopy(this.state.subjects)
    this.setState({value: '', clickAdd: false})
    subjects.push(subject)
    this.setState({ subjects })
    this.saveSubjects(subjects)
  }

  removeSubject(e, index) {
    e.preventDefault()
    const subjects = jsonCopy(this.state.subjects)
    subjects.splice(index, 1) // remove subject at index
    this.setState({ subjects })
    this.saveSubjects(subjects)
  }

  saveSubjects(subjects) {
    const options = { encrypt: false }
    this.userSession.putFile(SUBJECTS_FILENAME, JSON.stringify(subjects), options)
    .finally(() => {
      if(window.location.search) {
        window.history.pushState(null, "", window.location.href.split("?")[0])
      }
      resolveSubjects(this, this.userSession, subjects)
    })
  }

  render() {
    const mine = this.props.myKingdom
    const user = this.state.user
    const rulerAnimal = user.notes
    const rulerTerritory = user.todos
    const username = this.state.rulerUsername
    //const subjects = this.state.subjects
   // const myKingdom = this.props.myKingdom
    const app = this.state.app
    const clickAdd = this.state.clickAdd
    const currentUsername = this.props.currentUsername
    return (
      <div className="Dashboard">
        <div className="row">
          {currentUsername}
          <div>
            <OptionsList type="ITEMS" currentUsername = {currentUsername}/>
          </div>
          
          
        </div>
        
      </div>
    );
  }
}

export default Dashboard
