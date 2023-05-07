import React from "react"

function HelperFuncitons() {
  const capitalizeFirstLetter = (word = "") => {
    if (word.length > 0) {
      return word.split(" ")[0].slice(0, 1).toUpperCase() + word.slice(1)
    } else {
      return ""
    }
  }
  const setEnglishLevel = (word = "") => {
    if (word.length > 0) {
      if (word === "b1") return "Intermediate"
    } else {
      return word
    }
  }
  return {
    capitalizeFirstLetter,
    setEnglishLevel,
  }
}

export default HelperFuncitons
