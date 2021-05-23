import {MODULE_DISPLAY_NAME} from './config/ModuleConstants.js'
import CanvasTouchToMouseAdapter from './logic/CanvasTouchToMouseAdapter.js'
import WindowHeaderTouchToMouseAdapter from './logic/WindowHeaderTouchToMouseAdapter.js'

import '../style/touch-vtt.css'
import {installMeasurementTemplateEraser, initMeasurementTemplateEraser} from './tools/MeasurementTemplateEraser.js'
import {initWallTools, installWallToolsControls} from './tools/WallTools.js'
import {registerTouchSettings} from './config/TouchSettings.js'
import {installSnapToGrid} from './tools/SnapToGridTool.js'

function findCanvas() {
  return document.querySelector('canvas#board') ||
    document.querySelector('body > canvas') ||
    document.querySelector('canvas')
}

console.log(`${MODULE_DISPLAY_NAME} booting ...`)

Hooks.on('getSceneControlButtons', (controls) => {
  installMeasurementTemplateEraser(controls)
  installWallToolsControls(controls)
  installSnapToGrid(controls)
})

Hooks.once('init', () => {
  registerTouchSettings()
  initMeasurementTemplateEraser()
  initWallTools()
})

Hooks.on('ready', function () {
  try {
    const canvas = findCanvas()
    if (canvas) {
      CanvasTouchToMouseAdapter.init(canvas)
      WindowHeaderTouchToMouseAdapter.init(document.body)
      console.info(`${MODULE_DISPLAY_NAME} started successfully.`)
    } else {
      console.warn(`Failed to find canvas element. ${MODULE_DISPLAY_NAME} will not be available.`)
    }
  } catch (e) {
    console.error(`Failed to initialize ${MODULE_DISPLAY_NAME}: `, e)
  }
})
