import 'reflect-metadata';
import { inject, tagged, injectable, Container } from 'inversify';

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
class Shuriken implements IWeapon {
    public hit() { return 'throw Shuriken!'; }
}

@injectable()
class Ninja implements IWarrior {
    public constructor(@inject(diKeys.weapon) @tagged("canThrow", true) private weapon: IWeapon) {}

    public fight() { return this.weapon.hit(); }
}

// @injectable()
// class Samurai implements IWarrior {
//     public constructor(@inject(diKeys.weapon) @tagged("canThrow", false) private weapon: IWeapon) {}

//     public fight() { return this.weapon.hit(); }
// }

const container = new Container();

container.bind(diKeys.weapon).to(Katana).whenTargetTagged("canThrow", false);
container.bind(diKeys.weapon).to(Shuriken).whenTargetTagged("canThrow", true);
container.bind(diKeys.warrior).to(Ninja);
// container.bind(diKeys.warrior).to(Samurai);

const ninja = container.get<Ninja>(diKeys.warrior);
// const samurai = container.get<Samurai>(diKeys.warrior);

console.log(ninja.fight())
// console.log(samurai.fight())
