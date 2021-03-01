const local = {
  mapbox: {
    accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
    style: "mapbox://styles/genghishack/cjft3tbmb7qyr2sqclts2rz62", // bright
    username: 'genghishack',
    keys: {
      bright: 'cjft3tbmb7qyr2sqclts2rz62'
    }
  },
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://uyg8w8w7le.execute-api.us-west-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_ZJQVMR8HA',
    APP_CLIENT_ID: '1d5skmdk6l5qj9rvd516hsosd4',
    IDENTITY_POOL_ID: 'us-west-2:e1eb175e-9c5c-4ad1-bf72-8c0ee00b5647'
  }
};

const dev = {
  mapbox: {
    accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
    style: "mapbox://styles/genghishack/cjft3tbmb7qyr2sqclts2rz62", // bright
    username: 'genghishack',
    keys: {
      bright: 'cjft3tbmb7qyr2sqclts2rz62'
    }
  },
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://uyg8w8w7le.execute-api.us-west-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_ZJQVMR8HA',
    APP_CLIENT_ID: '1d5skmdk6l5qj9rvd516hsosd4',
    IDENTITY_POOL_ID: 'us-west-2:e1eb175e-9c5c-4ad1-bf72-8c0ee00b5647'
  }
};

const test = {
  mapbox: {
    accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
    style: "mapbox://styles/genghishack/cjft3tbmb7qyr2sqclts2rz62", // bright
    username: 'genghishack',
    keys: {
      bright: 'cjft3tbmb7qyr2sqclts2rz62'
    }
  },
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://uyg8w8w7le.execute-api.us-west-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_ZJQVMR8HA',
    APP_CLIENT_ID: '1d5skmdk6l5qj9rvd516hsosd4',
    IDENTITY_POOL_ID: 'us-west-2:e1eb175e-9c5c-4ad1-bf72-8c0ee00b5647'
  }
};

const prod = {
  mapbox: {
    accessToken: "pk.eyJ1IjoiZ2VuZ2hpc2hhY2siLCJhIjoiZ2x6WjZhbyJ9.P8at90QQiy0C8W_mc21w6Q",
    style: "mapbox://styles/genghishack/cjft3tbmb7qyr2sqclts2rz62", // bright
    username: 'genghishack',
    keys: {
      bright: 'cjft3tbmb7qyr2sqclts2rz62'
    }
  },
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://uyg8w8w7le.execute-api.us-west-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_ZJQVMR8HA',
    APP_CLIENT_ID: '1d5skmdk6l5qj9rvd516hsosd4',
    IDENTITY_POOL_ID: 'us-west-2:e1eb175e-9c5c-4ad1-bf72-8c0ee00b5647'
  }
};

let config;

switch (process.env.REACT_APP_STAGE) {
  case 'prod':
    config = prod;
    break;
  case 'test':
    config = test;
    break;
  case 'dev':
    config = dev;
    break;
  default:
    config = local;
    break;
}

const configExport =  {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};

export default configExport;
