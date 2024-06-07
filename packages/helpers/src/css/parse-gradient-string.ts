import { logError } from "../errors";

export interface GradientStop {
  color: string;
  position?: number;
}

export interface GradientInfo {
  type: string;
  direction?: string;
  stops: GradientStop[];
  angle?: string;
}

/**
 * Parses a CSS gradient string and extracts information into a structured `GradientInfo` object.
 * This function can handle both linear and radial gradients, extracting key details such as gradient type,
 * direction or angle, and color stops including their positions. If the input string does not conform
 * to expected gradient formats, the function logs an error and returns null.
 *
 * @param gradientString - A string representing a CSS gradient, such as "linear-gradient(90deg, red, blue 50%)".
 * @returns A `GradientInfo` object containing the type of gradient, any defined direction or angle,
 *          and an array of gradient stops, each with a color and an optional position.
 *          Returns null if the input string is not a valid gradient format.
 *
 * @example
 * // Example usage:
 * const gradient = parseGradientString("linear-gradient(90deg, red, blue 50%)");
 * console.log(gradient);
 * // Outputs:
 * // {
 * //   type: 'linear-gradient',
 * //   angle: '90deg',
 * //   stops: [
 * //     { color: 'red' },
 * //     { color: 'blue', position: 50 }
 * //   ]
 * // }
 */
export function parseGradientString(
  gradientString: string,
): GradientInfo | null {
  const gradientInfo: GradientInfo = { type: "", stops: [] };

  const gradientRegExp = /(linear|radial)-gradient/i;
  const gradientTypeMatch = gradientString.match(gradientRegExp);

  if (!gradientTypeMatch) {
    logError("Invalid gradient string");
    return null;
  }

  gradientInfo.type = gradientTypeMatch[0];

  if (gradientInfo.type === "linear-gradient") {
    const angleRegExp = /-?\d+deg/;
    const angleMatch = gradientString.match(angleRegExp);

    if (angleMatch) {
      gradientInfo.angle = angleMatch[0];
    }
  }

  const stopsRegExp = /rgba?\([^)]+\)|#[0-9a-fA-F]+(?=\s*\d{1,3}%)/gi;
  const positionsRegExp = /\d{1,3}%/g;

  const stopsMatches = gradientString.match(stopsRegExp);
  const positionsMatches = gradientString.match(positionsRegExp);

  if (stopsMatches && positionsMatches) {
    for (let i = 0; i < stopsMatches.length; i++) {
      const color = stopsMatches[i];
      const position =
        Number(String(positionsMatches[i]).replace(/[^0-9]/, "")) || 0;

      gradientInfo.stops.push({
        color: color,
        position: position,
      });
    }
  }

  return gradientInfo;
}

/**
 * Constructs a CSS gradient string from a given `GradientInfo` object.
 * This function supports both linear and radial gradients. It handles gradient direction or angle,
 * and orders the color stops by their positions before generating the final CSS gradient string.
 * If the gradient stops array is empty, the function returns an empty string, indicating an invalid gradient.
 *
 * @param gradientInfo - An object containing the necessary information to construct a gradient string,
 *                       including the type (e.g., 'linear-gradient' or 'radial-gradient'), optional direction or angle,
 *                       and an array of color stops with positions.
 * @returns A CSS gradient string based on the provided `GradientInfo`. Returns an empty string if the
 *          gradient stops array is empty.
 *
 * @example
 * // Example usage:
 * const gradient = generateGradientString({
 *   type: 'linear-gradient',
 *   angle: '45deg',
 *   stops: [
 *     { color: 'red' },
 *     { color: 'blue', position: 50 }
 *   ]
 * });
 * console.log(gradient); // Outputs: 'linear-gradient(45deg, red, blue 50%)'
 */
export function generateGradientString(gradientInfo: GradientInfo): string {
  const { type, direction, angle, stops } = gradientInfo;

  let gradientString = `${type}(`;

  if (!stops.length) return "";

  if (type === "linear-gradient" && angle) {
    gradientString += `${angle}, `;
  } else if (type === "radial-gradient" && direction) {
    gradientString += `${direction}, `;
  }

  const sortedStops = stops.sort(
    (a, b) => (a.position || 0) - (b.position || 0),
  );

  for (let i = 0; i < sortedStops.length; i++) {
    const { color, position } = sortedStops[i];
    gradientString += `${color} ${position}%`;
    if (i < sortedStops.length - 1) {
      gradientString += ", ";
    }
  }

  gradientString += ")";

  return gradientString;
}
