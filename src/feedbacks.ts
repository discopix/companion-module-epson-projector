import type ModuleInstance from './main.js'
import { basePath } from './constants.js'
import axios from 'axios'
import { createModuleLogger } from '@companion-module/base'

export type FeedbacksSchema = {
	power_state: {
		type: 'boolean'
		options: never
	}
	shutter_state: {
		type: 'boolean'
		options: never
	}
}

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		power_state: {
			name: 'Power State',
			type: 'boolean',
			defaultStyle: {
				bgcolor: 0xff0000,
				color: 0x000000,
			},
			options: [],
			callback: () => {
				return self.powerState
			},
		},
		shutter_state: {
			name: 'Shutter State',
			type: 'boolean',
			defaultStyle: {
				bgcolor: 0xff0000,
				color: 0x000000,
			},
			options: [],
			callback: () => {
				return self.shutterState
			},
		},
	})
}

export async function pollProjector(self: ModuleInstance): Promise<void> {
	const logger = createModuleLogger()

	const defaultOptions = {
		host: self.config.host,
		port: self.config.port,
	}

	// Polling - Power Status
	try {
		// noinspection HttpUrlsUsage
		const url = `http://${defaultOptions.host}:${defaultOptions.port}/${basePath}PWR?`
		logger.debug(`polling: ${url}`)
		const response = await axios.get(url, {
			headers: {
				// Accept: 'application/json',
			},
		})

		logger.debug(response.data)
		if (response.data === '01') {
			// On
			self.updateVarValue('powerState', true)
			self.setVariableValues({ powerStatus: 'Lamp On' })
		}
		if (response.data === '02') {
			// Warming Up
			self.updateVarValue('powerState', true)
			self.setVariableValues({ powerStatus: 'Warming Up' })
		}
		if (response.data === '04') {
			// Standby
			self.updateVarValue('powerState', false)
			self.setVariableValues({ powerStatus: 'Standby' })
		}
		self.checkFeedbacks('power_state')
	} catch (error: any) {
		logger.warn(`Error during polling: ${error}`)
	}
}
