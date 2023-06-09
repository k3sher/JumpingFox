class Coin {
    // Инициализация объекта монеты по ее координате
    constructor({ centerPosition }) {
        this.position = {
            x: centerPosition.x - COIN_IMAGE_SIZE / 2,
            y: centerPosition.y - COIN_IMAGE_SIZE / 2
        }
        this.width = COIN_HITBOX_SIZE
        this.height = COIN_HITBOX_SIZE
        this.sides = {
            left: centerPosition.x - this.width / 2,
            right: centerPosition.x + this.width / 2,
            top: centerPosition.y - this.width / 2,
            bottom: centerPosition.y + this.height / 2,
        }
        this.sprite = new Sprite({
            position: this.position,
            imageSrc: COIN_IMAGE_SRC
        })
        // Собрана ли монета
        this.collected = false
    }

    // Проверка пересечения монеты
    checkIntersction({ sides }) {
        return ((sides.top < this.sides.bottom) &&
            (sides.bottom > this.sides.top) &&
            (sides.left < this.sides.right) &&
            (sides.right > this.sides.left))
    }

    // Отображение монеты, если еше не собрана
    draw() {
        if (!this.collected) {
            this.sprite.draw()
        }
    }

    // Попытка сбора монеты персонажем
    tryCollect({ player }) {
        if (!this.collected) {
            if (this.checkIntersction({ sides: player.sides })) {
                if (IS_DEBUG) {
                    console.log('Coin collected')
                }
                this.collected = true
                player.collectedCoins += 1
            }
        }
    }
}
