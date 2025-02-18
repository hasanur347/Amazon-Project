import { formatCurrency } from "../scripts/utils/money.js";

describe('formatCurrency', ()=> {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2095)).toBe('20.95');
    });
    it("Test with 0", ()=> {
        expect(formatCurrency(0)).toBe('0.00');
    });

    it("Test with round up", ()=> {
        expect(formatCurrency(2000.4)).toBe('20.00');
    });
});