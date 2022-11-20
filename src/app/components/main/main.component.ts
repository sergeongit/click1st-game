import {
    Component,
    OnInit,
} from '@angular/core'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {

    tilesArray: TileInterface[] = []
    tileId = 0

    tile: TileInterface = {
        objId: this.tileId,
        isTileClicked: false,
    }

    constructor() { }

    ngOnInit(): void {
        this.createPlayField()
    }

    createPlayField() {
        this.tilesArray = Array(100).fill(this.tile).map( () => {
            return {
                objId: this.tileId++,
                isTileClicked: false
            }
        })
    }

    showIndex(id: number) {
        this.tilesArray[id].isTileClicked = true

        console.log(this.tilesArray[id])
    }

}

interface TileInterface {
    objId: number
    isTileClicked: boolean
}
