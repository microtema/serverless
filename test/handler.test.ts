import {Callback, Context} from 'aws-lambda';

import * as api from '../src/handler';

describe('Convert Properties to Json API', () => {

    const sut = api.convertProperties2Json;
    const context = {} as Context;
    const callback = {} as Callback<any>;
    let event = null;

    describe('Converter scenario with status code: 400', () => {

        it('Should return 400 statusCode on null event', async () => {

            event = null;

            const result = await sut(event, context, callback);

            expect(result).toMatchSnapshot();
        });

        it('Should return 400 statusCode on empty event', async () => {

            event = {};

            const result = await sut(event, context, callback);

            expect(result).toMatchSnapshot();
        });

    });

    describe('Converter scenario with status code: 200', () => {

        it('Should return 200 statusCode on empty body', async () => {

            event = {body: {data: ''}};

            const result = await sut(event, context, callback);

            expect(result).toMatchSnapshot();
        });

        it('Should return 200 statusCode and translated properties as JSON', async () => {

            event = {body: {data: 'foo=bar'}};

            const result = await sut(event, context, callback);

            expect(result).toMatchSnapshot();
        });

        it('Should return 200 statusCode with body as string', async () => {

            event = {body: JSON.stringify({data: 'foo=bar'})};

            const result = await sut(event, context, callback);

            expect(result).toMatchSnapshot();
        });
    });
});
