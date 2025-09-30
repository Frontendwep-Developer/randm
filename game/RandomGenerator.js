import crypto from 'crypto';

export class ProvablyFairRandomGenerator {
    constructor() {
        this.secretKey = null;
        this.mortyValue = null;
        this.hmacValue = null;
    }

    generateMortyValue(n) {
        this.secretKey = crypto.randomBytes(32);

        const randomBytes = crypto.randomBytes(8);
        this.mortyValue = BigInt(`0x${randomBytes.toString('hex')}`) % BigInt(n);

        const hmac = crypto.createHmac('sha3-256', this.secretKey);
        hmac.update(this.mortyValue.toString());
        this.hmacValue = hmac.digest('hex');

        return this.hmacValue;
    }

    getFinalValue(rickValue, n) {
        if (this.mortyValue === null) {
            throw new Error("Must generate Morty value first");
        }

        const result = (Number(this.mortyValue) + rickValue) % n;
        return result;
    }

    revealSecrets() {
        return {
            secretKey: this.secretKey ? this.secretKey.toString('hex') : null,
            mortyValue: this.mortyValue !== null ? Number(this.mortyValue) : null,
            hmacValue: this.hmacValue
        };
    }
}