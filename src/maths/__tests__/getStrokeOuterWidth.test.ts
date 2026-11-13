import { getStrokeOuterWidth, getStrokeWidths } from '../misc/getStrokeOuterWidth';

describe('getStrokeOuterWidth', () =>
{
    it('defaults to a centred stroke', () =>
    {
        expect(getStrokeOuterWidth(4)).toBe(2);
    });

    it('splits the width by alignment', () =>
    {
        // centred: half outside
        expect(getStrokeOuterWidth(4, 0.5)).toBe(2);
        // outside: the whole width is outside
        expect(getStrokeOuterWidth(4, 0)).toBe(4);
        // inside: nothing is outside
        expect(getStrokeOuterWidth(4, 1)).toBe(0);
    });

    it('is the single source used to derive the inner thickness', () =>
    {
        expect(getStrokeWidths(4, 0.5)).toEqual([2, 2]);
        expect(getStrokeWidths(4, 0)).toEqual([4, 0]);
        expect(getStrokeWidths(4, 1)).toEqual([0, 4]);

        const [outerWidth, innerWidth] = getStrokeWidths(6, 0.25);

        expect(outerWidth).toBe(4.5);
        expect(innerWidth).toBe(1.5);
        expect(outerWidth + innerWidth).toBe(6);
    });
});
