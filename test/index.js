const assert = require('assert');
const XServerClient = require('../');

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9kdWN0SGFzaCI6IjhDUm5aNnZFOCIsInRva2VuIjoiYjgxZThkMWEtZmMwMC00ZjFmLTkyNjktMzFhYmIzZjNmMjhlIiwiYXVkIjoiaHR0cHM6Ly94c2VydmVyLmJveG1hcnNoYWxsLmNvbSIsImlzcyI6IkJveG1hcnNoYWxsIFNlcnZpY2VzIiwic3ViIjoiZGF2aWQuaWJpYUBib3htYXJzaGFsbC5jb20ifQ.Z3RAsqyQBwYRabKvUW3_riiSHRlk3xICO58ZwBtrpbky6DXFd7ld2gaRgPJb_A2J_MW8ucLtL08mQ5QCQnU4gDud14uwtIU0cJZv6Sr2ikULc31KOgr5Tm-yh9n7zpDZlV7-Yj0oHaUsBWaZhC1KGdJLP2WDfYrDlVvgkF4gSodAGkcIGWMbPhu2HVwCF2OPeuwPsdI3vyiVDsnyb0oqQ1trsZnz5yj62zxcJU0fG06MTJ1NEv6wzJ7tZL46JNY2jbWi0INdbTn9SVCL5ZBsXEXeFteD_GNc2KNXr8hvPpB615DIwu20PH2ZDKLul6kTcb29q64z5HcI3JAVYvecFw';
const xserverClient = new XServerClient(token)

describe('License Service Test', () => {

    describe('Connection test', () => {

        it('should return success as a payload', async () => {
            try {
                const response = await xserverClient.testConnection()
                assert(response.status == 'success', 'Unable to verify API Key');
            } catch (e) {
                assert.fail(e.message)
            }
        }).timeout(20000);
    })

    describe('Creation / Validation test', () => {
        let tiers = [];
        let keys = [];
        const user = {
            email: 'John.Doe@example.com',
            familyName: 'Doe',
            givenName: 'John',
        }

        it('should be able to fetch tier list', async () => {
            try {
                const response = await xserverClient.listTiers();
                assert(response.status == 'success', 'Unable to fetch tiers');
                tiers = response.tiers;
                console.log(tiers)

            } catch (e) {
                assert.fail(e.message);
            }
        }).timeout(20000);

        it('should be able to create a key', async () => {
            try {

                const tierHash = tiers[Math.floor(Math.random() * tiers.length)];

                const context = {
                    ...user,
                    tierHash,
                    days: 1
                }

                const response = await xserverClient.createKey(context)
                assert(response.status == 'success', 'Unable to create license Key')

            } catch (e) {
                assert.fail(e.message)
            }
        }).timeout(20000)

        it('should be able to list all the keys the user has', async () => {
            try {

                const {
                    email
                } = user;

                const response = await xserverClient.listKeys(email);
                assert(response.status == 'success', 'Unable to list licenses')
                keys = response.keys;

            } catch (e) {
                assert.fail(e.message)
            }
        }).timeout(20000)

        it('should be able to fetch information about the created key', async () => {
            try {

                assert(keys.length > 0, 'No keys to test');

                const key = keys[Math.floor(Math.random() * keys.length)];
                const response = await xserverClient.queryKey(key)
                assert(response.status == 'success', 'Unable to check license Key')

            } catch (e) {
                assert.fail(e.message)
            }
        }).timeout(20000)


        it('should be able to extend a key by 1 day', async () => {
            try {


                assert(keys.length > 0, 'No keys to test');
                const serialkey = keys[Math.floor(Math.random() * keys.length)];
                const response = await xserverClient.extendKey({
                    serialkey,
                    days: 1
                });

                
                assert(response.status == 'success', 'Unable to extend license Key')

            } catch (e) {
                assert.fail(e.message);
            }
        })
    })


});