/* eslint-disable import/prefer-default-export */

export function getCssPropertyValue(propertyName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName);
}
