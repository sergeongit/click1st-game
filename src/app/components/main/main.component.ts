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
        this.createPlayField()
    }

    createPlayField() {
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
        this.cpuSpeed = value
    }

    startGame() {
        this.getRandomNum(this.tilesQuantity)
    }

    chooseTile(id: number) {
        if (this.tilesArray[id].isTileActive) {
            this.tilesArray[id].isTileClicked = true

            //console.log(this.tilesArray[id])
        }
    }

    getRandomNum(n: number) {
        this.randomNumbersArr = this.randomNumber.getRandomNumber(n)
        console.log('RAM', this.randomNumbersArr)
        console.log('FE1', this.cpuSpeed)

        this.randomNumbersArr.every((el, index) => {

            if (this.playerPoints < 10 && this.cpuPoints < 10) {
                setTimeout(() => {
                    if (this.playerPoints < 10 && this.cpuPoints < 10) {
                        // console.log('0')
                        this.tilesArray[el].isTileActive = true
                    }
                }, index * this.cpuSpeed)
                setTimeout(() => {
                    // console.log('1')
                    if (this.tilesArray[el].isTileClicked && this.playerPoints < 10) {
                        this.tilesArray[el].isTileActive = false
                        this.tilesArray[el].isTileLose = false
                        this.playerPoints++
                    } else if (this.cpuPoints < 10 && this.playerPoints < 10) {
                        this.tilesArray[el].isTileActive = false
                        this.tilesArray[el].isTileLose = true
                        this.cpuPoints++
                    }
                }, index * this.cpuSpeed + this.cpuSpeed)
            }
            return true
        })
    }
}
