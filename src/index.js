import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
  box-sizing: border-box;
  font-size: 62.5%; /* Mostly equivalates to 10px but allows users accessibility zoom settings to work*/
  /* font-size: 10px; */
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  min-height: 100vh;
}

body {
  font-size: 1.6rem;
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Try to keep your margins going in one direction to avoid margin collapase or grounding. I switch all the top margins off to avoid this issue. */
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
blockquote,
address,
article,
aside,
details,
dialogue,
fieldset,
figcaption,
figure,
footer,
form,
header,
hr,
main,
nav,
pre,
section,
table,
p {
  margin-top: 0;
  margin-block-start: 0;
}

a {
  color: inherit;
  text-decoration: none;
  /* You MUST make sure that links stand out from nomal text though...*/
}

/*
    a:hover,
    a:focus {
      text-decoration: underline;
    }
  */

img {
  /* This means that it can be less than 100% of the width of its parent IF the image is INTRINSICALLY smaller */
  max-width: 100%;

  height: auto;
  /* 'auto' is the initial value for height BUT for images (and other elements which have an intrinic height) that is not the case. To make an image responsive you set one dimension (usually width) to [max-]width: 100%; and the other to 'auto' to ensure it keeps aspect ratio. 'auto' basically tells the browser to decide. */
  vertical-align: middle;
  /* minor vertical centering. Works for images IF there is a baseline (i.e. they are displayed inline or inline-block) */
}

/* Because we us <ul>s for lists that we don't always want bulletted. */
ul {
  list-style: none;
  padding-left: 0;
}

/* To make actual bulletted lists */
ul.typographic {
  list-style: initial;
  padding-inline-start: 20px;
}

/* stops icons being the target of JS click events */
a.btn *,
button * {
  pointer-events: null;
}

/* For 'accessibility text'. If your button only has an image inside it that isn't good for accessibility. Put a span inside there and give it this class and put some descriptive text for what the button does into the span. */

.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  clip-path: auto;
  -webkit-clip-path: auto;
  white-space: normal;
}
`

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
