import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class RandomNumberService {

    constructor() {}

    // creates an array of random numbers in range of quantity tiles
    getRandomNumber(n: number) {
        let idArray: Array<number> = []

        while (idArray.length < 19) {
            let randomNumber = Math.floor(Math.random() * n)
            let check = idArray.find(item => item === randomNumber)
            // Math.random() is not take guarantee that the number in range will not be repeated
            // checks if created random number is not repeat in array; if not repeated - push it to array
            !check ? idArray.push(randomNumber) : null
        }

        return idArray
    }
}
