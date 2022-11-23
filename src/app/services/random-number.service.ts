import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class RandomNumberService {

    constructor() {}

    getRandomNumber(n: number) {
        let idArray: Array<number> = []

        while (idArray.length < 19) {
            let randomNumber = Math.floor(Math.random() * n)
            let check = idArray.find(item => item === randomNumber)
            !check ? idArray.push(randomNumber) : null
        }

        // console.log('filled', idArray)
        return idArray
    }

}
