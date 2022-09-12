const lib = require('../lib')
const db = require('../db')
const mail = require('../mail');

// Testing Wisdom
// Unit test should be done on functions that has:
// Some algorithm or logic
// Has 0 to minimal dependencies to external resources
// Because its whole point was to test fast know the flaw beforehand

// Group our related unit tests to make them look clean and maintainable
// Because tests are First Class Citizens in source code
describe('absolute',() =>{
    // No of tests depends on no of execution paths
    // Test for first execution path or test case
    it("should return a positive number if number is positive",()=>{
        const result = lib.absolute(1)
        // We make a simple assertion in order to verify the testing result
        expect(result).toBe(1);
    })
    
    // Test for second execution path or test case
    it("should return a positive number if number is negative",()=>{
        const result = lib.absolute(-1)
        // We make a simple assertion in order to verify the testing result
        expect(result).toBe(1);
    })
    
    // Test for third execution path or test case
    it("should return 0 if number is 0",()=>{
        const result = lib.absolute(0)
        // We make a simple assertion in order to verify the testing result
        expect(result).toBe(0);
    })
});

// Your test should not be too specific or general otherwise it will break with implementation changes
describe('greet',() => {
    it('should return the greeting message',() => {
        const result = lib.greet('Shubham')
        expect(result).toMatch(/Shubham/);
        expect(result).toContain('Shubham');

    });
});

describe('getCurrencies',() => {
    it('should return required currencies',() =>{
        const result = lib.getCurrencies()

        //Too general
        expect(result).toBeDefined()
        expect(result).not.toBeNull()

        //Too Specific
        // When testing arrays dont look for exact position of elements
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('INR')
        expect(result[2]).toBe('EUR')

        //Proper way for testing functions which return array
        expect(result).toContain('INR')
        expect(result).toContain('USD')
        expect(result).toContain('EUR')

        // Ideal Way
        expect(result).toEqual(expect.arrayContaining(['INR','USD','EUR']))

    })
})

describe('getProduct',()=>{
    it('should return the product with given id',() => {
        const result = lib.getProduct(1)

        // Tests for exactness
        //expect(result).toEqual({id: 1, price:10})

        // Tests for generality when checking for equality
        expect(result).toMatchObject({id:1, price: 10})

        expect(result).toHaveProperty('id', 1)
    })
})

// Single assertions principle - we should only call expect functions only once for each test
// This principle is only about logical assertions i.e have a assertion for testing a single logical concept
describe('registerUser',() => {

    it('should throw error if username is falsy',() => {
        const args = [null,undefined,'',NaN,0,false]
        args.forEach(arg => {

            expect(() => { lib.registerUser(arg)}).toThrow();
        })
    })

    it('should return a user object if valid username is given',() => {
        const result = lib.registerUser('zap')
        expect(result).toMatchObject({username :'zap'})
        expect(result.id).toBeGreaterThan(0);
    })
})

describe('getDiscount',() => {
    it('should give 10% discount if customer points is greater than 10',() => {
        db.getCustomerSync = function () {
            console.log("Fake reading of customer..");
            return { id :1 ,points: 20}
        }
        const order =  {customerId: 1,totalPrice: 100}
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(90)
    })

})
describe('notifyCustomer',() => {
    it('should send an email to the customer',() =>{

        db.getCustomerSync = jest.fn().mockReturnValue({email:'xyz'})
        mail.send = jest.fn()
            
        lib.notifyCustomer({customerId:1})
        
        // If we have to do a lot of mocking we should always do
        // Integration Tests because mocking can fail the objective of unit tests
        // for them to be fast and maintainable 

        //Benefits of using Jest mock functions and not manually creating them is:
        // 1.We can easily check if they are called or not
        // 2.We can also check all the arguments passed to this application 
        expect(mail.send).toHaveBeenCalled()
        expect(mail.send.mock.calls[0][0]).toBe('xyz')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)

        /* db.getCustomerSync = function (customerId) {
            return {email:'xyz'}
        } */
       /*  let mailsent = false
        mail.send = function (email,message) {
            mailsent = true
        } */

    })

})