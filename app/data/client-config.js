// Configuration for new client creation
// Fields that must be changed before activation

const mustChangeFields = [
  {
    field: 'redirectUrls',
    label: 'Redirect URIs',
    helpText: 'The URL(s) that users will be redirected to after authentication.',
    editUrl: 'redirect-urls',
    defaultValue: [],
    isEmpty: (val) => !val || val.length === 0 || (val.length === 1 && val[0] === '')
  },
  {
    field: 'publicKey',
    label: 'Authentication method',
    helpText: 'How your client will authenticate with One Login.',
    editUrl: 'public-key-type',
    defaultValue: null,
    isEmpty: (val) => !val
  },
  {
    field: 'scopes',
    label: 'Scopes',
    helpText: 'The user data your client needs access to.',
    editUrl: 'scopes',
    defaultValue: ['openid'],
    isEmpty: (val) => !val || val.length === 0 || (val.length === 1 && val[0] === 'openid')
  }
];

// Default values for a new identity client
const newIdentityClientDefaults = {
  clientName: '',
  clientType: 'identity', // 'identity' or 'auth'
  isActive: false,
  // Core fields
  scopes: ['openid'],
  redirectUrls: [],
  publicKeyType: null,
  publicKey: null,
  jwksUrl: null,
  tokenAuthMethod: 'private_key_jwt',
  idTokenSigningAlgorithm: 'ES256',
  sectorIdentifierUri: '',
  // Identity fields
  identityVerificationSupported: true,
  claims: ['https://vocab.account.gov.uk/v1/coreIdentityJWT'],
  landingPageUrl: '',
  levelsOfConfidence: ['P2'],
  // Additional fields
  contacts: [],
  postLogoutRedirectUrls: [],
  backChannelLogoutUrls: [],
  serviceType: 'MANDATORY',
  jarValidationRequired: true,
  channel: 'web',
  pkceEnforced: true,
  maxAgeEnabled: true,
  permitMissingNonce: false,
  rateLimit: '2000 per minute'
};

function generateClientId() {
  return 'int-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
}

function countIncompleteFields(client) {
  return mustChangeFields.filter(f => f.isEmpty(client[f.field])).length;
}

function getIncompleteFields(client) {
  return mustChangeFields.filter(f => f.isEmpty(client[f.field]));
}

module.exports = {
  mustChangeFields,
  newIdentityClientDefaults,
  generateClientId,
  countIncompleteFields,
  getIncompleteFields
};
