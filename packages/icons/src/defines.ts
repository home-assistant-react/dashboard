export const mdiMatchPattern = /^mdi:/;

import * as MdiIcons from "@mdi/js";

export const FIXED_DOMAIN_ICONS = {
  air_quality: MdiIcons.mdiAirFilter,
  alert: MdiIcons.mdiAlert,
  calendar: MdiIcons.mdiCalendar,
  climate: MdiIcons.mdiThermostat,
  configurator: MdiIcons.mdiCog,
  conversation: MdiIcons.mdiMicrophoneMessage,
  counter: MdiIcons.mdiCounter,
  datetime: MdiIcons.mdiCalendarClock,
  date: MdiIcons.mdiCalendar,
  demo: MdiIcons.mdiHomeAssistant,
  google_assistant: MdiIcons.mdiGoogleAssistant,
  group: MdiIcons.mdiGoogleCirclesCommunities,
  homeassistant: MdiIcons.mdiHomeAssistant,
  homekit: MdiIcons.mdiHomeAutomation,
  image: MdiIcons.mdiImage,
  image_processing: MdiIcons.mdiImageFilterFrames,
  input_button: MdiIcons.mdiButtonPointer,
  input_datetime: MdiIcons.mdiCalendarClock,
  input_number: MdiIcons.mdiRayVertex,
  input_select: MdiIcons.mdiFormatListBulleted,
  input_text: MdiIcons.mdiFormTextbox,
  light: MdiIcons.mdiLightbulb,
  mailbox: MdiIcons.mdiMailbox,
  notify: MdiIcons.mdiCommentAlert,
  number: MdiIcons.mdiRayVertex,
  persistent_notification: MdiIcons.mdiBell,
  plant: MdiIcons.mdiFlower,
  proximity: MdiIcons.mdiAppleSafari,
  remote: MdiIcons.mdiRemote,
  scene: MdiIcons.mdiPalette,
  schedule: MdiIcons.mdiCalendarClock,
  script: MdiIcons.mdiScriptText,
  select: MdiIcons.mdiFormatListBulleted,
  sensor: MdiIcons.mdiEye,
  simple_alarm: MdiIcons.mdiBell,
  siren: MdiIcons.mdiBullhorn,
  stt: MdiIcons.mdiMicrophoneMessage,
  text: MdiIcons.mdiFormTextbox,
  time: MdiIcons.mdiClock,
  timer: MdiIcons.mdiTimerOutline,
  tts: MdiIcons.mdiSpeakerMessage,
  updater: MdiIcons.mdiCloudUpload,
  vacuum: MdiIcons.mdiRobotVacuum,
  zone: MdiIcons.mdiMapMarkerRadius,
};

export const FIXED_DEVICE_CLASS_ICONS = {
  apparent_power: MdiIcons.mdiFlash,
  aqi: MdiIcons.mdiAirFilter,
  atmospheric_pressure: MdiIcons.mdiThermometerLines,
  // battery: mdiBattery, => not included by design since `sensorIcon()` will dynamically determine the icon
  carbon_dioxide: MdiIcons.mdiMoleculeCo2,
  carbon_monoxide: MdiIcons.mdiMoleculeCo,
  current: MdiIcons.mdiCurrentAc,
  data_rate: MdiIcons.mdiTransmissionTower,
  data_size: MdiIcons.mdiDatabase,
  date: MdiIcons.mdiCalendar,
  distance: MdiIcons.mdiArrowLeftRight,
  duration: MdiIcons.mdiProgressClock,
  energy: MdiIcons.mdiLightningBolt,
  frequency: MdiIcons.mdiSineWave,
  gas: MdiIcons.mdiMeterGas,
  humidity: MdiIcons.mdiWaterPercent,
  illuminance: MdiIcons.mdiBrightness5,
  irradiance: MdiIcons.mdiSunWireless,
  moisture: MdiIcons.mdiWaterPercent,
  monetary: MdiIcons.mdiCash,
  nitrogen_dioxide: MdiIcons.mdiMolecule,
  nitrogen_monoxide: MdiIcons.mdiMolecule,
  nitrous_oxide: MdiIcons.mdiMolecule,
  ozone: MdiIcons.mdiMolecule,
  ph: MdiIcons.mdiPh,
  pm1: MdiIcons.mdiMolecule,
  pm10: MdiIcons.mdiMolecule,
  pm25: MdiIcons.mdiMolecule,
  power: MdiIcons.mdiFlash,
  power_factor: MdiIcons.mdiAngleAcute,
  precipitation: MdiIcons.mdiWeatherRainy,
  precipitation_intensity: MdiIcons.mdiWeatherPouring,
  pressure: MdiIcons.mdiGauge,
  reactive_power: MdiIcons.mdiFlash,
  signal_strength: MdiIcons.mdiWifi,
  sound_pressure: MdiIcons.mdiEarHearing,
  speed: MdiIcons.mdiSpeedometer,
  sulphur_dioxide: MdiIcons.mdiMolecule,
  temperature: MdiIcons.mdiThermometer,
  timestamp: MdiIcons.mdiClock,
  volatile_organic_compounds: MdiIcons.mdiMolecule,
  volatile_organic_compounds_parts: MdiIcons.mdiMolecule,
  voltage: MdiIcons.mdiSineWave,
  volume: MdiIcons.mdiCarCoolantLevel,
  water: MdiIcons.mdiWater,
  weight: MdiIcons.mdiWeight,
  wind_speed: MdiIcons.mdiWeatherWindy,
};

export const DEFAULT_DOMAIN_ICON = MdiIcons.mdiBookmark;
