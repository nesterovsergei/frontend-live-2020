interface IWarrior { fight(): string; }

interface IWeapon { hit(): string; }

class Katana implements IWeapon {
    public hit() { return 'cut!'; }
}

class Daisho implements IWeapon {
    public hit() { return 'mega cut!'; }
}

class Ninja implements IWarrior {
    // private weapon: IWeapon;

    public constructor(private weapon: IWeapon) {}

    public fight() { return this.weapon.hit(); }
}

const ninja1 = new Ninja(new Katana());

console.log(ninja1.fight())


