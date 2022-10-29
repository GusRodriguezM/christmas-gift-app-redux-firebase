import { defaultGifts } from "../../helpers";

describe('Tests in the defaultGifts file', () => {

    test('Should have the same content', () => {

        expect(defaultGifts).toContainEqual(
            {
                name: 'Macbook',
                quantity: 1,
                price: 50000
            },
            {
                name: 'Smartphone',
                quantity: 1,
                price: 10000
            },
            {
                name: 'Wireless Headphones',
                quantity: 1,
                price: 6000
            },
            {
                name: 'Stuffed Animal',
                quantity: 1,
                price: 100
            },
            {
                name: 'Nintendo Switch',
                quantity: 1,
                price: 8000
            },
            {
                name: 'PlayStation 5',
                quantity: 1,
                price: 12000
            },
            {
                name: 'Xbox Series X',
                quantity: 1,
                price: 14000
            },
            {
                name: 'Car',
                quantity: 1,
                price: 650000
            },
            {
                name: 'Toy Train',
                quantity: 1,
                price: 250
            },
            {
                name: 'Clothes',
                quantity: 1,
                price: 1000
            }
        );

    });

});