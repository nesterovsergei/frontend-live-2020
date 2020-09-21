import 'reflect-metadata';
import { inject, injectable, Container } from 'inversify';

interface IWarrior { fight(): string; }

interface IWeapon { hit(): string; }

@injectable()
class Katana implements IWeapon {
    public hit() { return 'cut!'; }
}

@injectable()
class Ninja implements IWarrior {
    private weapon: IWeapon;

    public constructor(@inject(Katana) weapon: IWeapon) {
        this.weapon = weapon;
    }

    public fight() { return this.weapon.hit(); }
}

const container = new Container();

container.bind(Katana).to(Katana);
container.bind(Ninja).to(Ninja);

const ninja1 = container.get<Ninja>(Ninja);

console.log(ninja1)
