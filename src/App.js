import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorsList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorsList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(previousState => ({
      latestList: [...previousState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const isEqual = newList.length !== 0
    this.setState({latestList: newList, isTrue: isEqual})
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className='password-manager-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
          alt='app logo'
          className='app-logo'
        />
        <div className='container1'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
            alt='password manager'
            className='password-manager-image1'
          />
          <form className='form-container' onSubmit={this.addContent}>
            <h1 className='form-heading'>Add New Password</h1>
            <div className='input-container'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
                alt='website'
                className='input-image'
              />
              <input
                type='text'
                name='website'
                placeholder='Enter Website'
                value={website}
                onChange={this.listenWebsite}
                className='input-element'
              />
            </div>
            <div className='input-container'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
                alt='username'
                className='input-image'
              />
              <input
                type='text'
                name='username'
                placeholder='Enter Username'
                value={username}
                onChange={this.listenUsername}
                className='input-element'
              />
            </div>
            <div className='input-container'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'
                alt='password'
                className='input-image'
              />
              <input
                type='password'
                name='password'
                placeholder='Enter Password'
                value={password}
                onChange={this.listenPassword}
                className='input-element'
              />
            </div>
            <button type='submit' className='add-button'>
              Add
            </button>
          </form>
          <img
            src='https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
            alt='password-manager'
            className='password-manager-image2'
          />
        </div>

        <div className='container2'>
          <div className='header-container'>
            <div className='password-content'>
              <h1 className='password-heading'>Your Passwords</h1>
              <p className='colored-text'>{newList.length}</p>
            </div>
            <div className='search-holder'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'
                alt='search'
                className='input-image'
              />
              <input
                type='search'
                placeholder='Search'
                value={searchInput}
                onChange={this.searchList}
                className='input-element'
              />
            </div>
          </div>
          <hr />
          <div className='passwords-list'>
            <input
              type='checkbox'
              className='check-box'
              id='check'
              onChange={this.showPassword}
            />
            <label htmlFor='check' className='label-password'>
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className='empty-state'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'
                alt='no passwords'
                className='empty-image'
              />
              <p className='no-passwords'>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className='result-container'>
              {newList.map(eachValue => (
                <li className='item-list' id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className='list-content'>
                    <p className='user-input'>{eachValue.websiteName}</p>
                    <p className='user-input'>{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src='https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
                        alt='stars'
                        className='stars-image'
                      />
                    )}
                    {isShow && (
                      <p className='user-input'>{eachValue.Password}</p>
                    )}
                  </div>
                  <button
                    type='button'
                    data-testid='delete'
                    onClick={() => this.deleteItem(eachValue.id)}
                    className='delete-button'
                  >
                    <img
                      src='https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'
                      alt='delete'
                      className='delete-image'
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
