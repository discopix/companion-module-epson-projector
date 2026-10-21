## Epson Projector - Simplified

At the moment, this module is intended to do like, two things:

### Power Control

Check Power Status: `/api/v01/control/escvp21?cmd=PWR?`

Power ON: `api/v01/control/escvp21?cmd=PWR+ON`

Power OFF: `api/v01/control/escvp21?cmd=PWR+OFF`

### Shutter Control

Shutter ON: `/api/v01/control/escvp21?cmd=MUTE+ON`

Shutter OFF: `/api/v01/control/escvp21?cmd=MUTE+OFF`
