const exercise = require('../exercise1')

describe('fizzbuzz',() => {
    it('should throw an exception if input is not a number',()=>{
        expect(()=>{exercise.fizzBuzz(null)}).toThrow()
        expect(()=>{exercise.fizzBuzz('s')}).toThrow()
        expect(()=>{exercise.fizzBuzz('NaN')}).toThrow()
        expect(()=>{exercise.fizzBuzz({})}).toThrow()
    })

    it('should return FizzzBuzz if input is divisible by 3 and 5',()=>{
        
        const result = exercise.fizzBuzz(15) // testing step
        expect(result).toBe('FizzBuzz') // verification step
    })

    it('should return Fizz if input is divisible by only 3 ',()=>{
        
        const result = exercise.fizzBuzz(3) // testing step
        expect(result).toBe('Fizz') // verification step
    })

    it('should return Buzz if input is divisible by only 5 ',()=>{
        
        const result = exercise.fizzBuzz(5) // testing step
        expect(result).toBe('Buzz') // verification step
    })

    it('should return input if it is not divisible by either 3 or 5 ',()=>{
        
        const result = exercise.fizzBuzz(1) // testing step
        expect(result).toBe(1) // verification step
    })





})