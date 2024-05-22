// import './switch.css'
import BauCss from "@grucloud/bau-css";
import { useState } from "preact/hooks";

const { css, createGlobalStyles } = BauCss();

createGlobalStyles`
  :root {
    --translate-x: 36px;
    --slider-color: #34a853;
    --transition-length: 0.1s;
  }
`

const switchStyle = css`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 24px;
`
const sliderStyle = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #bbb;
  -webkit-transition: var(--transition-length);
  transition: var(--transition-length);
  border-radius: 24px;


  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: var(--transition-length);
    transition: var(--transition-length);
    border-radius: 50%;
  }
`
const labelStyle = css`
  padding: 0 0.5rem;
  width: 3rem;
  text-align: left;
`

const inputStyle = css`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + span {
      background-color: var(--slider-color);
    }
    
    &:focus + span {
      box-shadow: 0 0 1px var(--slider-color);
    }
    
    &:checked + span:before {
      -webkit-transform: translateX(var(--translate-x));
      -ms-transform: translateX(var(--translate-x));
      transform: translateX( var(--translate-x) );
    }
        
`

function Switch({ label, onChange, checked = true }) {
  const toggle = (e) => {
    const newValue = e.currentTarget.checked
    onChange(newValue)
  }

  return (
    <>
      <span class={labelStyle}>{label}</span>
      <label class={switchStyle}>
        <input class={inputStyle} type="checkbox" checked={checked} onChange={toggle}></input>
        <span class={sliderStyle}></span>
      </label >
    </>
  )
}

export { Switch };