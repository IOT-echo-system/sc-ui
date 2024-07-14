export const IndianStates = [
  {label: 'Andhra Pradesh', value: 'andhra-pradesh'},
  {label: 'Arunachal Pradesh', value: 'arunachal-pradesh'},
  {label: 'Assam', value: 'assam'},
  {label: 'Bihar', value: 'bihar'},
  {label: 'Chhattisgarh', value: 'chhattisgarh'},
  {label: 'Goa', value: 'goa'},
  {label: 'Gujarat', value: 'gujarat'},
  {label: 'Haryana', value: 'haryana'},
  {label: 'Himachal Pradesh', value: 'himachal-pradesh'},
  {label: 'Jharkhand', value: 'jharkhand'},
  {label: 'Karnataka', value: 'karnataka'},
  {label: 'Kerala', value: 'kerala'},
  {label: 'Madhya Pradesh', value: 'madhya-pradesh'},
  {label: 'Maharashtra', value: 'maharashtra'},
  {label: 'Manipur', value: 'manipur'},
  {label: 'Meghalaya', value: 'meghalaya'},
  {label: 'Mizoram', value: 'mizoram'},
  {label: 'Nagaland', value: 'nagaland'},
  {label: 'Odisha', value: 'odisha'},
  {label: 'Punjab', value: 'punjab'},
  {label: 'Rajasthan', value: 'rajasthan'},
  {label: 'Sikkim', value: 'sikkim'},
  {label: 'Tamil Nadu', value: 'tamil-nadu'},
  {label: 'Telangana', value: 'telangana'},
  {label: 'Tripura', value: 'tripura'},
  {label: 'Uttar Pradesh', value: 'uttar-pradesh'},
  {label: 'Uttarakhand', value: 'uttarakhand'},
  {label: 'West Bengal', value: 'west-bengal'}
] as const

export const getStateName = (state: string): string => IndianStates.find(({value}) => value === state)?.label ?? ''

export type IndianStateValue = (typeof IndianStates)[number]['value'] | ''
