/**
 * The single source of truth for how a stroke's width and alignment split into
 * the thickness on either side of a closed shape's outline.
 *
 * `alignment` positions the stroke relative to the outline:
 * - `0` places the whole stroke on the outside
 * - `0.5` (the default) centres it on the outline
 * - `1` places the whole stroke on the inside
 *
 * Every closed shape ({@link Circle}, {@link Ellipse}, {@link Rectangle},
 * {@link RoundedRectangle}) and the stroke bounds calculation derive their
 * outer thickness from this function, so changing the rule here updates all of
 * them together. Open lines keep their own directional thickness and do not use
 * this.
 * @param strokeWidth - The full width of the stroke
 * @param alignment - The alignment of the stroke, 0.5 by default
 * @returns The thickness of the stroke on the outside of the outline
 * @category maths
 * @internal
 */
export function getStrokeOuterWidth(strokeWidth: number, alignment: number = 0.5): number
{
    return strokeWidth * (1 - alignment);
}

/**
 * Splits a stroke into the thickness on either side of a closed shape's outline.
 *
 * This is a thin wrapper around {@link getStrokeOuterWidth}: the inner thickness
 * is whatever is left of the full stroke width once the outer thickness is taken.
 * @param strokeWidth - The full width of the stroke
 * @param alignment - The alignment of the stroke, 0.5 by default
 * @returns A tuple of `[outerWidth, innerWidth]`
 * @category maths
 * @internal
 */
export function getStrokeWidths(strokeWidth: number, alignment: number = 0.5): [number, number]
{
    const outerWidth = getStrokeOuterWidth(strokeWidth, alignment);

    return [outerWidth, strokeWidth - outerWidth];
}
