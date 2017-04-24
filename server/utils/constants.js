const constants = {
  ENV_SHORT_ENUM: {
    DEV: 'dev',
    TEST: 'test',
    PROD: 'prod'
  },
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PRIVILEGES: {
    OWNER: {
      ENUM: 1,
      NAME: 'Owner'
    },
    EDITOR: {
      ENUM: 2,
      NAME: 'Editor'
    },
    WRITER: {
      ENUM: 3,
      NAME: 'Writer'
    },
    CONSULTANT: {
      ENUM: 4,
      NAME: 'Consultant'
    }
  }
};

constants.PRIVILEGES.OWNER.CONTAINS = [
  constants.PRIVILEGES.EDITOR.ENUM,
  constants.PRIVILEGES.WRITER.ENUM
];
constants.PRIVILEGES.EDITOR.CONTAINS = [
  constants.PRIVILEGES.WRITER.ENUM
];
constants.PRIVILEGES.CONSULTANT.CONTAINS = [
  constants.PRIVILEGES.WRITER.ENUM
];

let maxPrivilegeEnum = 0;

for (const privilege in constants.PRIVILEGES) {
  if (constants.PRIVILEGES.hasOwnProperty(privilege)) {
    maxPrivilegeEnum = Math.max(constants.PRIVILEGES.ENUM, maxPrivilegeEnum);
  }
}

constants.MIN_PRIVILEGE_ENUM = 1;
constants.MAX_PRIVILEGE_ENUM = maxPrivilegeEnum;

export default constants;
