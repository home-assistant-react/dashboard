/* eslint-disable  @typescript-eslint/no-explicit-any */

export const supportsFeatureFromAttributes = (
  attributes: {
    [key: string]: any;
  },
  feature: number,
) => (attributes.supported_features! & feature) !== 0;
