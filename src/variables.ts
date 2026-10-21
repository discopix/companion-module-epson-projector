import type ModuleInstance from './main.js'

export type VariablesSchema = {
	projName: string
	powerState: boolean
	powerStatus: string
	shutterState: boolean
	shutterStatus: string
}

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions({
		projName: { name: 'Projector Name' },
		powerState: { name: 'Power State On/Off' },
		powerStatus: { name: 'Power Status' },
		shutterState: { name: 'Shutter State On (Closed) / Off (Open)' },
		shutterStatus: { name: 'Shutter Status' },
	})
	self.setVariableValues({
		powerState: false,
		shutterState: false,
		shutterStatus: 'Shutter Unknown',
	})
}
