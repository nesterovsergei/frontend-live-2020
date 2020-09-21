import 'reflect-metadata';
import { inject, injectable, Container } from 'inversify';

interface IWarrior { fight(): string; }

interface IWeapon { hit(): string; }

const diKeys = {
    warrior: Symbol.for('WarriorKey'),
    weapon: Symbol.for('WeaponKey'),
}

@injectable()
class Katana implements IWeapon {
    public hit() { return 'cut!'; }
}

@injectable()
class Ninja implements IWarrior {
    public constructor(@inject(diKeys.weapon) private weapon: IWeapon) {}

    public fight() { return this.weapon.hit(); }
}

const container = new Container();

container.bind(diKeys.weapon).to(Katana);
container.bind(diKeys.warrior).to(Ninja);

const ninja = container.get<Ninja>(diKeys.warrior);

console.log(ninja.fight())

// console.log(Reflect.getMetadataKeys(Ninja));
// console.log(Reflect.getMetadata('inversify:tagged', Ninja));

