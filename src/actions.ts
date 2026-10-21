import type ModuleInstance from './main.js'
import { type CompanionActionEvent, createModuleLogger } from '@companion-module/base'
import { basePath, State } from './constants.js'
import { OptionToggle } from './types.js'
import axios from 'axios'

export type ActionsSchema = {
	power: {
		options: {
			mode: string
		}
	}
	shutter: {
		options: {
			mode: string
		}
	}
}

export function UpdateActions(self: ModuleInstance): void {
	const logger = createModuleLogger()

	const defaultOptions = {
		host: self.config.host,
		port: self.config.port,
	}

	self.setActionDefinitions({
		power: {
			name: 'Turn on/off Projector',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: State.TOGGLE,
					choices: OptionToggle,
				},
			],
			callback: async (event: CompanionActionEvent<{ mode: string }>) => {
				logger.info(`Request Power state change: ${event.options.mode}`)

				let stateToSet = false

				switch (event.options.mode) {
					case State.ON.toString():
						stateToSet = true
						break
					case State.OFF.toString():
						stateToSet = false
						break
					case State.TOGGLE.toString():
						stateToSet = !self.powerState
						break
				}

				const stateStr = stateToSet ? 'PWR+ON' : 'PWR+OFF'

				// noinspection HttpUrlsUsage
				const url = `http://${defaultOptions.host}:${defaultOptions.port}/${basePath}${stateStr}`
				await axios.get(url, {
					headers: {},
				})
				setTimeout(() => {
					self.checkFeedbacks('power_state')
				}, 1000)
			},
		},
		shutter: {
			name: 'Turn the Projector shutter on/off',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: State.TOGGLE,
					choices: OptionToggle,
				},
			],
			callback: async (event: CompanionActionEvent<{ mode: string }>) => {
				self.log('info', `Request Shutter state change: ${event.options.mode}`)

				let stateToSet = false

				switch (event.options.mode) {
					case State.ON.toString():
						stateToSet = true
						self.updateVarValue('shutterState', true)
						break
					case State.OFF.toString():
						stateToSet = false
						self.updateVarValue('shutterState', false)
						break
					case State.TOGGLE.toString():
						stateToSet = !self.shutterState
						self.updateVarValue('shutterState', !self.shutterState)
						break
				}

				const stateStr = stateToSet ? 'MUTE+ON' : 'MUTE+OFF'

				// noinspection HttpUrlsUsage
				const url = `http://${defaultOptions.host}:${defaultOptions.port}/${basePath}${stateStr}`
				await axios.get(url, {
					headers: {},
				})
				setTimeout(() => {
					self.checkFeedbacks('shutter_state')
				}, 250)
			},
		},
	})
}
