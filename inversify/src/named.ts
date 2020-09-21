import 'reflect-metadata';
import { inject, named, injectable, Container } from 'inversify';

interface IWarrior { fight(): string; }

interface IWeapon { hit(): string; }

const diKeys = {
    warrior: Symbol.for('WarriorKey'),
    weapon: Symbol.for('WeaponKey'),
    military: Symbol.for('MilitaryKey'),
    defaultWeapon: Symbol.for('DefaultWeaponKey'),
    customWeapon: Symbol.for('CustomWeaponKey'),
}

@injectable()
class Katana implements IWeapon {
    public hit() { return 'cut!'; }
}

@injectable()
class Shuriken implements IWeapon {
    public hit() { return 'throw Shuriken!'; }
}

@injectable()
class Ninja implements IWarrior {
    public constructor(@inject(diKeys.weapon) private weapon: IWeapon) {}

    public fight() { return this.weapon.hit(); }
}

@injectable()
class Military {
    public constructor(@inject(diKeys.warrior) @named(diKeys.customWeapon) private warrior: IWarrior) {}

    public showMyWarriorInFight() {
        return this.warrior.fight();
    }
}

const container = new Container();

container.bind(diKeys.weapon).to(Katana).inSingletonScope().whenAnyAncestorNamed(diKeys.defaultWeapon);
container.bind(diKeys.weapon).to(Shuriken).inSingletonScope().whenAnyAncestorNamed(diKeys.customWeapon);
container.bind(diKeys.warrior).to(Ninja);
container.bind(diKeys.military).to(Military).inSingletonScope();


const military = container.get<Military>(diKeys.military);

console.log(military.showMyWarriorInFight())
