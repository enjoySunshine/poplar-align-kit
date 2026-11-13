import { Circle } from '../shapes/Circle';
import { Ellipse } from '../shapes/Ellipse';
import { Polygon } from '../shapes/Polygon';
import { Rectangle } from '../shapes/Rectangle';
import { RoundedRectangle } from '../shapes/RoundedRectangle';
import { Graphics } from '~/scene/graphics/shared/Graphics';

// Every closed shape and the stroke bounds derive their outer thickness from the
// single getStrokeOuterWidth helper: outer = width * (1 - alignment). These tests
// pin the exact behaviour described in the stroke alignment spec.
const WIDTH = 4;

describe('closed shape stroke alignment', () =>
{
    describe('circle', () =>
    {
        const circle = new Circle(0, 0, 10);

        it('centred', () =>
        {
            expect(circle.strokeContains(12, 0, WIDTH, 0.5)).toBe(true);
            expect(circle.strokeContains(14, 0, WIDTH, 0.5)).toBe(false);
            expect(circle.strokeContains(8, 0, WIDTH, 0.5)).toBe(false);
        });

        it('outside', () =>
        {
            expect(circle.strokeContains(12, 0, WIDTH, 0)).toBe(true);
            expect(circle.strokeContains(14, 0, WIDTH, 0)).toBe(true);
            expect(circle.strokeContains(8, 0, WIDTH, 0)).toBe(false);
        });

        it('inside', () =>
        {
            expect(circle.strokeContains(12, 0, WIDTH, 1)).toBe(false);
            expect(circle.strokeContains(8, 0, WIDTH, 1)).toBe(true);
            expect(circle.strokeContains(6, 0, WIDTH, 1)).toBe(false);
        });

        it.each([
            [0.5, -12, -12, 12, 12],
            [0, -14, -14, 14, 14],
            [1, -10, -10, 10, 10],
        ])('bounds with alignment %s', (alignment, minX, minY, maxX, maxY) =>
        {
            const g = new Graphics().circle(0, 0, 10).stroke({ width: WIDTH, alignment });

            expect(g.context.bounds).toMatchObject({ minX, minY, maxX, maxY });
        });
    });

    describe('ellipse', () =>
    {
        const ellipse = new Ellipse(0, 0, 20, 10);

        it('centred', () =>
        {
            expect(ellipse.strokeContains(20, 0, WIDTH, 0.5)).toBe(true);
            expect(ellipse.strokeContains(22, 0, WIDTH, 0.5)).toBe(true);
            expect(ellipse.strokeContains(24, 0, WIDTH, 0.5)).toBe(false);
            expect(ellipse.strokeContains(18, 0, WIDTH, 0.5)).toBe(false);
            expect(ellipse.strokeContains(0, 10, WIDTH, 0.5)).toBe(true);
            expect(ellipse.strokeContains(0, 12, WIDTH, 0.5)).toBe(true);
            expect(ellipse.strokeContains(0, 14, WIDTH, 0.5)).toBe(false);
            expect(ellipse.strokeContains(0, 8, WIDTH, 0.5)).toBe(false);
        });

        it('outside', () =>
        {
            expect(ellipse.strokeContains(20, 0, WIDTH, 0)).toBe(false);
            expect(ellipse.strokeContains(22, 0, WIDTH, 0)).toBe(true);
            expect(ellipse.strokeContains(24, 0, WIDTH, 0)).toBe(true);
            expect(ellipse.strokeContains(24.1, 0, WIDTH, 0)).toBe(false);
            expect(ellipse.strokeContains(0, 10, WIDTH, 0)).toBe(false);
            expect(ellipse.strokeContains(0, 12, WIDTH, 0)).toBe(true);
            expect(ellipse.strokeContains(0, 14, WIDTH, 0)).toBe(true);
        });

        it('inside', () =>
        {
            expect(ellipse.strokeContains(20, 0, WIDTH, 1)).toBe(true);
            expect(ellipse.strokeContains(22, 0, WIDTH, 1)).toBe(false);
            expect(ellipse.strokeContains(18, 0, WIDTH, 1)).toBe(true);
            expect(ellipse.strokeContains(0, 10, WIDTH, 1)).toBe(true);
            expect(ellipse.strokeContains(0, 12, WIDTH, 1)).toBe(false);
            expect(ellipse.strokeContains(0, 8, WIDTH, 1)).toBe(true);
        });

        it.each([
            [0.5, -22, -12, 22, 12],
            [0, -24, -14, 24, 14],
            [1, -20, -10, 20, 10],
        ])('bounds with alignment %s', (alignment, minX, minY, maxX, maxY) =>
        {
            const g = new Graphics().ellipse(0, 0, 20, 10).stroke({ width: WIDTH, alignment });

            expect(g.context.bounds).toMatchObject({ minX, minY, maxX, maxY });
        });
    });

    describe('rectangle', () =>
    {
        const rect = new Rectangle(0, 0, 20, 10);

        it('centred', () =>
        {
            expect(rect.strokeContains(10, -2, WIDTH, 0.5)).toBe(true);
            expect(rect.strokeContains(10, -3, WIDTH, 0.5)).toBe(false);
            expect(rect.strokeContains(10, 1, WIDTH, 0.5)).toBe(true);
            expect(rect.strokeContains(-2, 5, WIDTH, 0.5)).toBe(true);
            expect(rect.strokeContains(-4, 5, WIDTH, 0.5)).toBe(false);
        });

        it('outside', () =>
        {
            expect(rect.strokeContains(10, -4, WIDTH, 0)).toBe(true);
            expect(rect.strokeContains(10, -4.1, WIDTH, 0)).toBe(false);
            expect(rect.strokeContains(10, 1, WIDTH, 0)).toBe(false);
            expect(rect.strokeContains(-4, 5, WIDTH, 0)).toBe(true);
        });

        it('inside', () =>
        {
            expect(rect.strokeContains(10, -1, WIDTH, 1)).toBe(false);
            expect(rect.strokeContains(10, 1, WIDTH, 1)).toBe(true);
            expect(rect.strokeContains(-2, 5, WIDTH, 1)).toBe(false);
        });

        it.each([
            [0.5, -2, -2, 22, 12],
            [0, -4, -4, 24, 14],
            [1, 0, 0, 20, 10],
        ])('bounds with alignment %s', (alignment, minX, minY, maxX, maxY) =>
        {
            const g = new Graphics().rect(0, 0, 20, 10).stroke({ width: WIDTH, alignment });

            expect(g.context.bounds).toMatchObject({ minX, minY, maxX, maxY });
        });
    });

    describe('rounded rectangle', () =>
    {
        const roundedRect = new RoundedRectangle(0, 0, 20, 10, 4);

        it('centred', () =>
        {
            expect(roundedRect.strokeContains(10, -2, WIDTH, 0.5)).toBe(true);
            expect(roundedRect.strokeContains(10, -4, WIDTH, 0.5)).toBe(false);
            expect(roundedRect.strokeContains(4, 1, WIDTH, 0.5)).toBe(true);
        });

        it('outside', () =>
        {
            expect(roundedRect.strokeContains(10, -4, WIDTH, 0)).toBe(true);
            expect(roundedRect.strokeContains(10, 1, WIDTH, 0)).toBe(false);
            expect(roundedRect.strokeContains(4, 1, WIDTH, 0)).toBe(false);
            expect(roundedRect.strokeContains(1, 1, WIDTH, 0)).toBe(true);
        });

        it('inside', () =>
        {
            expect(roundedRect.strokeContains(10, -2, WIDTH, 1)).toBe(false);
            expect(roundedRect.strokeContains(10, 1, WIDTH, 1)).toBe(true);
            expect(roundedRect.strokeContains(4, 1, WIDTH, 1)).toBe(true);
            expect(roundedRect.strokeContains(1, 1, WIDTH, 1)).toBe(false);
        });

        it.each([
            [0.5, -2, -2, 22, 12],
            [0, -4, -4, 24, 14],
            [1, 0, 0, 20, 10],
        ])('bounds with alignment %s', (alignment, minX, minY, maxX, maxY) =>
        {
            const g = new Graphics().roundRect(0, 0, 20, 10, 4).stroke({ width: WIDTH, alignment });

            expect(g.context.bounds).toMatchObject({ minX, minY, maxX, maxY });
        });
    });
});

describe('open line stroke alignment (own directional thickness, not shared)', () =>
{
    const openLine = new Polygon([0, 0, 20, 0]);

    openLine.closePath = false;

    it('centred', () =>
    {
        expect(openLine.strokeContains(10, -2, WIDTH, 0.5)).toBe(true);
        expect(openLine.strokeContains(10, 2, WIDTH, 0.5)).toBe(true);
        expect(openLine.strokeContains(10, -4, WIDTH, 0.5)).toBe(false);
    });

    it('outside', () =>
    {
        expect(openLine.strokeContains(10, -1, WIDTH, 0)).toBe(false);
        expect(openLine.strokeContains(10, 4, WIDTH, 0)).toBe(true);
        expect(openLine.strokeContains(10, 4.1, WIDTH, 0)).toBe(false);
    });

    it('inside', () =>
    {
        expect(openLine.strokeContains(10, 0, WIDTH, 1)).toBe(true);
        expect(openLine.strokeContains(10, 1, WIDTH, 1)).toBe(false);
    });

    it.each([
        [0.5, -2, -2, 22, 2],
        [0, -4, -4, 24, 4],
        [1, 0, 0, 20, 0],
    ])('bounds with alignment %s', (alignment, minX, minY, maxX, maxY) =>
    {
        const g = new Graphics().moveTo(0, 0).lineTo(20, 0).stroke({ width: WIDTH, alignment });

        expect(g.context.bounds).toMatchObject({ minX, minY, maxX, maxY });
    });
});
