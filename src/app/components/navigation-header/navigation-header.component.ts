import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core'
import {
    FormControl,
    Validators,
} from '@angular/forms'

@Component({
    selector: 'app-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent {
    cpuReactionValidation = new FormControl('',
        [Validators.min(100), Validators.max(10000), Validators.required])

    // send data to main.component
    @Output() onStartClicked = new EventEmitter<boolean>()
    @Output() cpuReaction = new EventEmitter<number>()
    @Output() resetResults = new EventEmitter<boolean>()

    // receive data from main.component
    @Input() playerPoints: number = 0
    @Input() cpuPoints: number = 0

    constructor() { }

    // emit entered cpu reaction value to main.component
    setCpuReaction(value: string) {
        this.cpuReaction.emit(Number(value))
    }

    // emit entered 'click start' to main.component
    startGame() {
        this.onStartClicked.emit(true)
    }

    // emit entered 'click reset previous results' to main.component
    startNewGame() {
        this.resetResults.emit(true)
    }
}
