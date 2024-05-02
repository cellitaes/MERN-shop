import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173/',
        setupNodeEvents(on, config) {
            on('task', {
                async 'db:seed'() {
                    // seed database with test data
                    const url = `http://localhost:5000/api/testData/seed`;
                    const options = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    };

                    const response = await fetch(url, options);
                    return response;
                },
            });
        },
    },
});
