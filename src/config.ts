import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export type ModuleConfig = {
	displayName: string
	host: string
	port: number
	feedbackInterval: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'displayName',
			label: 'Display Name',
			width: 8,
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target Host (IP/hostname)',
			width: 8,
			regex: Regex.HOSTNAME,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target Port',
			width: 4,
			min: 1,
			max: 65535,
			default: 80,
		},
		{
			type: 'number',
			id: 'feedbackInterval',
			label: 'Feedback Polling Interval (s)',
			width: 4,
			min: 1,
			max: 30,
			default: 2,
		},
	]
}
