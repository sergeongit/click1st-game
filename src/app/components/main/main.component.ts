import {
    Component,
    OnInit,
} from '@angular/core'
import { TileInterface } from '../../interfaces/tile.interface'
import { RandomNumberService } from '../../services/random-number.service'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
    tilesArray: TileInterface[] = []
    tilesQuantity: number = 100
    tileId: number = 0
    randomNumbersArr: Array<number> = []
    cpuSpeed: number = 800
    cpuPoints: number = 0
    playerPoints: number = 0
    timeoutsArr: any[] = []

    tile: TileInterface = {
        objId: this.tileId,
        isTileClicked: false,
        isTileActive: false,
        isTileLose: null,
    }

    constructor(
        public randomNumber: RandomNumberService,
    ) {}

    ngOnInit(): void {
        // needs for first loading, creating of playfield
        this.createPlayField()
    }

    createPlayField() {
        // creating of array with tile item
        this.tilesArray = Array(this.tilesQuantity).fill(this.tile).map(() => {
            return {
                objId: this.tileId++,
                isTileActive: false,
                isTileClicked: false,
                isTileLose: null,
            }
        })
    }

    setCPUReaction(value: number) {
        // receive cpu reaction from header
        this.cpuSpeed = value
    }

    startGame() {
        // receive a 'click start' event from header and call a func with main game logic
        this.getRandomNum(this.tilesQuantity)
    }

    resetResults() {
        this.clearAllTimeouts()
        this.cpuPoints = 0
        this.playerPoints = 0
        this.tileId = 0
        this.tilesArray = []
        this.randomNumbersArr = this.randomNumber.getRandomNumber(this.tilesQuantity)
        this.createPlayField()
    }

    chooseTile(id: number) {
        // checks if you click on tile while it active and change isTileClicked state
        if (this.tilesArray[id].isTileActive) {
            this.tilesArray[id].isTileClicked = true
        }
    }

    clearAllTimeouts() {
        for (let i = 0; i < this.timeoutsArr.length; i++) {
            clearTimeout(this.timeoutsArr[i])
        }
    }

    getRandomNum(n: number) {
        // set result from RandomNumberService to randomNumbersArr (creates random numbers for tile activation)
        this.randomNumbersArr = this.randomNumber.getRandomNumber(n)

        // activation of all tiles in order by the tileId
        for (let el = 0; el < this.randomNumbersArr.length; el++) {
            const t1 = setTimeout(() => {
                // checks if player or cpu not win (not reach 10 points) and after make tile active for click
                if (this.playerPoints < 10 && this.cpuPoints < 10) {
                    this.tilesArray[this.randomNumbersArr[el]].isTileActive = true
                }
            }, el * this.cpuSpeed)

            const t2 = setTimeout(() => {
                // checks if player clicks an active tile, change tile state and add points
                if (this.tilesArray[this.randomNumbersArr[el]].isTileClicked && this.playerPoints < 10) {
                    this.tilesArray[this.randomNumbersArr[el]].isTileActive = false
                    this.tilesArray[this.randomNumbersArr[el]].isTileLose = false
                    this.playerPoints++
                } else if (this.cpuPoints < 10 && this.playerPoints < 10) {
                    this.tilesArray[this.randomNumbersArr[el]].isTileActive = false
                    this.tilesArray[this.randomNumbersArr[el]].isTileLose = true
                    this.cpuPoints++
                }
            }, el * this.cpuSpeed + this.cpuSpeed)

            this.timeoutsArr.push(t1)
            this.timeoutsArr.push(t2)
        }
    }
}
