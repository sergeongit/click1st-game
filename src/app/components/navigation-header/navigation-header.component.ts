import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core'

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent {

    inputValue: number = 0

    @Output() onStartClicked = new EventEmitter<boolean>()
    @Output() cpuReaction = new EventEmitter<number>()

    @Input() playerPoints: number = 0
    @Input() cpuPoints: number = 0

    constructor() { }

    setCpuReaction(value: string) {
        this.cpuReaction.emit(Number(value))
    }

    startGame() {
        this.onStartClicked.emit(true)
    }
}