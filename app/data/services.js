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
          clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://dev1.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev1.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://dev1.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"],
          promotedToProd: false,
        },
        {
          id: "dev-options-2",
          name: "DEV (options 2)",
          clientId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://dev2.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev2.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT"],
          landingPageUrl: "https://dev2.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"],
          promotedToProd: false,
        },
        {
          id: "sit",
          name: "SIT",
          clientId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://sit.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://sit.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://sit.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"],
          promotedToProd: false,
        },
        {
          id: "uat",
          name: "UAT",
          clientId: "d4e5f6a7-b8c9-0123-defa-234567890123",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://uat.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://uat.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://uat.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"],
          promotedToProd: false,
        },
        {
          id: "preprod",
          name: "PreProd",
          clientId: "e5f6a7b8-c9d0-1234-efab-345678901234",
          ...baseConfig,
          clientName: "Apprenticeship service - Digital certification",
          jwksUrl: "https://preprod.apprenticeship-cert.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://preprod.apprenticeship-cert.education.gov.uk/callback"],
          sectorIdentifierUri: "https://apprenticeship-cert.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT", "https://vocab.account.gov.uk/v1/address"],
          landingPageUrl: "https://preprod.apprenticeship-cert.education.gov.uk/landing",
          levelsOfConfidence: ["P2"],
          promotedToProd: true,
        }
      ],
      production: {
        id: "prod-options-2",
        name: "options 2",
        clientId: "f6a7b8c9-d0e1-2345-fabc-456789012345",
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
          clientId: "a7b8c9d0-e1f2-3456-abcd-567890123456",
          ...baseConfig,
          clientName: "Register trainee teachers",
          jwksUrl: "https://dev.register-trainee-teachers.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev.register-trainee-teachers.education.gov.uk/callback"],
          sectorIdentifierUri: "https://register-trainee-teachers.education.gov.uk",
          identityVerificationSupported: false,
          claims: [],
          landingPageUrl: "",
          levelsOfConfidence: [],
          promotedToProd: false,
        }
      ],
      production: null
    }
  ]
};
