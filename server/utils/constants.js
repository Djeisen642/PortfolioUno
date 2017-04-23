export default {
  ENV_SHORT_ENUM: {
    DEV: 'dev',
    TEST: 'test',
    PROD: 'prod'
  },
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PRIVILEGES: {
    OWNER: {
      NAME: 'Owner',
      CONTAINS: ['EDITOR', 'WRITER']
    },
    EDITOR: {
      NAME: 'Editor',
      CONTAINS: ['WRITER']
    },
    WRITER: {
      NAME: 'Writer'
    },
    CONSULTANT: {
      NAME: 'Consultant',
      CONTAINS: ['WRITER']
    }
  }
};
