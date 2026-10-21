/**
 * Text Constants and other useful bits of
 * static content
 */

/** @enum State Representing a 3-Way Option On/Off/Toggle for use with Power, Shutters, etc. */
export enum State {
	ON = 'on',
	OFF = 'off',
	TOGGLE = 'toggle',
}

export const basePath = 'api/v01/control/escvp21?cmd='
