// Mock data based on DfE example
// 3 services with varying integration/production clients

const baseConfig = {
  scopes: ["openid", "email"],
  tokenAuthMethod: "private_key_jwt",
  publicKeyType: "JWKS",
  idTokenSigningAlgorithm: "ES256",
  isActive: true,
  contacts: ["team@education.gov.uk"],
  postLogoutRedirectUrls: [],
  backChannelLogoutUrls: [],
  serviceType: "MANDATORY",
  jarValidationRequired: true,
  channel: "web",
  pkceEnforced: true,
  maxAgeEnabled: true,
  permitMissingNonce: false,
  rateLimit: "2000 per minute"
};

module.exports = {
  services: [
    {
      id: "apprenticeship-digital-cert",
      name: "Apprenticeship service - Digital certification",
      description: "Digital certification for apprenticeship end-point assessments",
      integration: [
        {
          id: "dev-options-1",
          name: "DEV (options 1)",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://dev1.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev1.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://dev1.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        },
        {
          id: "dev-options-2",
          name: "DEV (options 2)",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://dev2.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev2.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT"],
          landingPageUrl: "https://dev2.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        },
        {
          id: "sit",
          name: "SIT",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://sit.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://sit.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://sit.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        },
        {
          id: "uat",
          name: "UAT",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://uat.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://uat.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://uat.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        },
        {
          id: "preprod",
          name: "PreProd",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://preprod.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://preprod.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://preprod.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        }
      ],
      production: {
        id: "prod-options-2",
        name: "options 2",
        ...baseConfig,
        clientName: "Apprenticeship service - Digital certification",
        jwksUrl: "https://apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
        redirectUrls: ["https://apprenticeship-cert.education.gov.uk/callback"],
        sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
        identityVerificationSupported: true,
        claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
        landingPageUrl: "https://apprenticeship-cert.education.gov.uk/landing",
        levelsOfConfidence: ["P2"]
      }
    },
    {
      id: "register-trainee-teachers",
      name: "Register trainee teachers",
      description: "Register trainees and record their progress towards qualified teacher status",
      integration: [
        {
          id: "dev",
          name: "DEV",
          ...baseConfig,
          clientName: "Register trainee teachers",
          jwksUrl: "https://dev.register-trainee-teachers.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev.register-trainee-teachers.education.gov.uk/callback"],
          sectorIdentifierUri: "https://register-trainee-teachers.education.gov.uk",
          identityVerificationSupported: false,
          claims: [],
          landingPageUrl: "",
          levelsOfConfidence: []
        }
      ],
      production: null
    }
  ]
};
