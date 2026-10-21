import type { DropdownChoice } from '@companion-module/base'
import { State } from './constants.js'

export const OptionToggle: DropdownChoice[] = [
	{ id: State.ON, label: State.ON },
	{ id: State.OFF, label: State.OFF },
	{ id: State.TOGGLE, label: State.TOGGLE },
]
