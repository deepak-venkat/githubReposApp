import './index.css'

const RepositoryItem = props => {
  const {repoObj} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoObj
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt="avatar" className="avatar-img" />
      <h3 className="title">{name}</h3>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-img"
        />
        <p className="count">{starsCount} </p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-img"
        />
        <p className="count">{forksCount} </p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-img"
        />
        <p className="count">{issuesCount} </p>
      </div>
    </li>
  )
}

export default RepositoryItem
