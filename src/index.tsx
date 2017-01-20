import * as React from "react"
import * as ReactDOM from "react-dom"
import "es6-promise"; // promise pollyfill
import { Hello } from "./components/Hello"

ReactDOM.render(
  <Hello compiler="TypeScript2" framework="React is Awesome" />,
  document.getElementById("example")
)
