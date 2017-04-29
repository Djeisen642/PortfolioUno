class Privilege {
  constructor(pEnum, name, contains = []) {
    this._enum = pEnum;
    this._name = name;
    this._contains = contains;
  }

  hasPrivilege(privilege) {
    let enumToCompare;
    if (!privilege) {
      return false;
    } else if (privilege instanceof Privilege) {
      enumToCompare = privilege.ENUM;
    } else if (!isNaN(privilege)) {
      enumToCompare = privilege;
    } else {
      return false;
    }
    if (this.ENUM === enumToCompare) {
      return true;
    } else {
      return this.CONTAINS.includes(enumToCompare);
    }
  }

  get ENUM() {
    return this._enum;
  }

  get NAME() {
    return this._name;
  }

  get CONTAINS() {
    return this._contains;
  }
}

class Privileges {
  constructor() {
    this.Privilege = Privilege;

    this._validEnums = [];
    this.ENUMS = {};

    this._createPrivilegeEnum('OWNER', 1);
    this._createPrivilegeEnum('EDITOR', 2);
    this._createPrivilegeEnum('WRITER', 3);
    this._createPrivilegeEnum('CONSULTANT', 4);

    this._privileges = [];
    this._createNewPrivilege(
      'OWNER',
      'Owner',
      this.ENUMS.OWNER, [
        this.ENUMS.EDITOR,
        this.ENUMS.WRITER
      ]
    );
    this._createNewPrivilege(
      'EDITOR',
      'Editor',
      this.ENUMS.EDITOR, [
        this.ENUMS.WRITER
      ]
    );
    this._createNewPrivilege(
      'WRITER',
      'Writer',
      this.ENUMS.WRITER
    );
    this._createNewPrivilege(
      'CONSULTANT',
      'Consultant',
      this.ENUMS.CONSULTANT, [
        this.ENUMS.WRITER
      ]
    );
  }

  _createPrivilegeEnum(key, num) {
    this.ENUMS[key] = num;
    this._validEnums.push(num);
    return num;
  }

  _createNewPrivilege(key, pEnum, contains) {
    var newPrivilege = new Privilege(pEnum, contains);
    this._privileges.push(newPrivilege);
    this[key] = newPrivilege;
    return newPrivilege;
  }

  isValidEnum(pEnum) {
    if (!pEnum || isNaN(pEnum)) {
      return false;
    }
    return !!this._validEnums.includes(pEnum);
  }

  getPrivilegeObjectFromEnum(pEnum) {
    if (this.isValidEnum(pEnum)) {
      return false;
    }
    return this._privileges.find(function(privilegeObject) {
      return privilegeObject.ENUM === pEnum;
    });
  }

  hasPrivilege(minPrivilege, privilegeToCompare) {
    let privilegeObjectToCompare = privilegeToCompare;
    if (this.isValidEnum(privilegeToCompare)) {
      privilegeObjectToCompare = this.getPrivilegeObjectFromEnum(privilegeToCompare);
    }
    return !!privilegeObjectToCompare && privilegeObjectToCompare.hasPrivilege(minPrivilege);
  }
}

const privileges = new Privileges();

export default privileges;
