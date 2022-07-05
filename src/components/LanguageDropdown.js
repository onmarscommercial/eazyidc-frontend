import React, { useState, useEffect } from "react"
import {
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle
} from "reactstrap"

import { get, map } from "lodash"
import { withTranslation } from "react-i18next"

import i18n from "../i18n"
import languages from "../common/languages"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const LanguageDropdown = () => {
  const [selectedLang, setSelectedLang] = useState("")
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE")
    setSelectedLang(currentLanguage)
  }, [])

  const changeLanguageAction = lang => {
    i18n.changeLanguage(lang)
    localStorage.setItem("I18N_LANGUAGE", lang)
    setSelectedLang(lang)
  }

  const toggle = () => {
    setMenu(!menu)
  }

  return (
    <>
      <Dropdown isOpen={menu} toggle={toggle} className="d-none d-md-block text-end me-4">
        <DropdownToggle className="btn btn-lg header-item waves-effect" tag="button">
          <img 
            src={get(languages, `${selectedLang}.flag`)}
            alt="flag"
            height="16"
            className="me-2"
          />
          {" "}{get(languages, `${selectedLang}.label`)}
          {" "}<FontAwesomeIcon icon={faAngleDown} />
        </DropdownToggle>
        <DropdownMenu>
          {map(Object.keys(languages), key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}
            >
              <img 
                src={get(languages, `${key}.flag`)}
                alt="flag"
                height="16"
                className="me-2"
              />
              <span>
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(LanguageDropdown)