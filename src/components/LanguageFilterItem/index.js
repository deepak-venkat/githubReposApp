import './index.css'

const LanguageFilterItem = props => {
  const {activeLangId, filterLang, updateActiveLang} = props
  const {id, language} = filterLang
  const onClickLang = () => {
    updateActiveLang(id)
  }
  const langClassName = id === activeLangId ? 'active-lang' : 'normal-lang'
  return (
    <li className={langClassName}>
      <button type="button" onClick={onClickLang}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
