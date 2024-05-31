import { Switch } from '@/components/switch';
import BauCss from "@grucloud/bau-css";
import { useEffect, useState } from 'preact/hooks';
import logo from '/google-prefer-web.png';
import { storage } from 'wxt/storage';

const { css, createGlobalStyles } = BauCss();

const classLogo = css`
  height: 3em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

createGlobalStyles`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin-top: 1rem;
    display: flex;
    place-items: center;
    min-height: 120px;
    min-width: 320px;
  }
`

const headlineContainerStyle = css`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
`

const appStyle = css`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 0;
  text-align: center;
  width: 100%
`

const switchContainerStyle = css`
  display: flex;
  gap: 0.5rem;
`

const sourceCodeStyle = css`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
  border-top: 1px solid gray;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  align-items: center;
  justify-content: end;

  & > div {
    background-color: red
    flex-grow: 5;
  }

  & > svg {
    height: 24px;
  }
`

const setIconSet = (enabled) => {
  const iconSet = enabled ?
    {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "128": "icon/128.png"
    } :
    {
      "16": "icon-disabled/16.png",
      "32": "icon-disabled/32.png",
      "48": "icon-disabled/48.png",
      "128": "icon-disabled/128.png"
    }
  browser.action.setIcon({ path: iconSet })
}

export function PopupUI() {
  const [enabled, setEnabled] = useState(true)
  const label = enabled ? 'Running' : 'Paused'

  setIconSet(enabled)

  useEffect(() => {
    async function loadEnabledStatus() {
      let isEnabled = await storage.getItem('local:enabled')
      if (typeof isEnabled === 'undefined') {
        isEnabled = true
      }

      let rulesetOptions = {
        disableRulesetIds: [],
        enableRulesetIds: ['ruleset_1']
      }

      if (!isEnabled) {
        rulesetOptions = {
          disableRulesetIds: ['ruleset_1'],
          enableRulesetIds: []
        }
      }
      await browser.declarativeNetRequest.updateEnabledRulesets(rulesetOptions)
      setEnabled(isEnabled)
    }

    loadEnabledStatus()
  }, [])

  const toggle = async (value) => {
    setIconSet(value)
    setEnabled(value)
    browser.runtime.sendMessage({ action: 'store_locally', value });
  }

  return (
    <div class={appStyle}>
      <div class={switchContainerStyle}>
        <Switch checked={enabled} label={label} onChange={toggle} />
      </div>
      <div class={headlineContainerStyle}>
        <img src={logo} class={classLogo} />
        <div>
          <div>
            Prefer "Web Only" results on Google
          </div>
          <div>
            <a href="https://tedium.co/2024/05/17/google-web-search-make-default/" target="_blank" rel="noreferrer nofollow">Learn why</a>
          </div>
        </div>
      </div>
      <div class={sourceCodeStyle}>
        <div>
          <a href="https://www.github.com/csarnataro/udm14" target="_blank" rel="noreferrer nofollow">Source code</a>
        </div>
        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" fill="white"></path>
        </svg>
      </div>
    </div>
  )
}
