import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const stateConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLang: 'ALL',
    reposList: [],
    fetchingStatus: stateConstants.inProgress,
  }

  componentDidMount() {
    this.fetchAndUpdateReposList()
  }

  fetchAndUpdateReposList = async () => {
    const {activeLang} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLang}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.map(eachObj => ({
        name: eachObj.name,
        id: eachObj.id,
        issuesCount: eachObj.issues_count,
        forksCount: eachObj.forks_count,
        starsCount: eachObj.stars_count,
        avatarUrl: eachObj.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        fetchingStatus: stateConstants.success,
      })
    } else {
      this.setState({fetchingStatus: stateConstants.failure})
    }
  }

  updateActiveLang = id => {
    this.setState({activeLang: id}, this.fetchAndUpdateReposList)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="list-2">
        {reposList.map(eachObj => (
          <RepositoryItem key={eachObj.id} repoObj={eachObj} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  renderView = () => {
    const {fetchingStatus} = this.state
    switch (fetchingStatus) {
      case stateConstants.inProgress:
        return this.renderLoader()
        break
      case stateConstants.success:
        return this.renderSuccessView()
        break
      case stateConstants.failure:
        return this.renderFailureView()
        break
      default:
        return ''
    }
  }

  render() {
    const {activeLang} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-1">
          {languageFiltersData.map(eachObj => (
            <LanguageFilterItem
              key={eachObj.id}
              activeLangId={activeLang}
              filterLang={eachObj}
              updateActiveLang={this.updateActiveLang}
            />
          ))}
        </ul>
        {this.renderView()}
      </div>
    )
  }
}

export default GithubPopularRepos
