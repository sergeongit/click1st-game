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
    cpuSpeed: number = 700

    tile: TileInterface = {
        objId: this.tileId,
        isTileClicked: false,
        isTileActive: false,
    }

    constructor(
        public randomNumber: RandomNumberService
    ) {}

    ngOnInit(): void {
        this.createPlayField()
        this.getRandomNum(this.tilesQuantity)
    }

    createPlayField() {
        this.tilesArray = Array(this.tilesQuantity).fill(this.tile).map(() => {
            return {
                objId: this.tileId++,
                isTileActive: false,
                isTileClicked: false,
            }
        })
    }

    chooseTile(id: number) {
        if (this.tilesArray[id].isTileActive) {
            this.tilesArray[id].isTileClicked = true

            console.log(this.tilesArray[id])
        }
    }

    getRandomNum(n: number) {
        this.randomNumbersArr = this.randomNumber.getRandomNumber(n)
        console.log('RAM', this.randomNumbersArr)

        this.randomNumbersArr.forEach( (value, index) => {
            setTimeout(() => {
                this.tilesArray[value].isTileActive = true
            }, index * this.cpuSpeed)
        })
    }
}
