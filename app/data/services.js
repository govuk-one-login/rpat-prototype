// Mock data based on DfE example
// 3 services with varying integration/production configs

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
          serviceName: "Apprenticeship service - Digital certification",
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
          serviceName: "Apprenticeship service - Digital certification",
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
          serviceName: "Apprenticeship service - Digital certification",
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
          serviceName: "Apprenticeship service - Digital certification",
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
          serviceName: "Apprenticeship service - Digital certification",
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
        serviceName: "Apprenticeship service - Digital certification",
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
      id: "find-teacher-training",
      name: "Find teacher training courses",
      description: "Search and apply for postgraduate teacher training courses in England",
      integration: [
        {
          id: "dev",
          name: "DEV",
          ...baseConfig,
          serviceName: "Find teacher training courses",
          jwksUrl: "https://dev.find-teacher-training.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev.find-teacher-training.education.gov.uk/callback"],
          sectorIdentifierUri: "https://find-teacher-training.education.gov.uk",
          identityVerificationSupported: false,
          claims: [],
          landingPageUrl: "",
          levelsOfConfidence: []
        }
      ],
      production: {
        id: "prod",
        name: "Find teacher training courses",
        ...baseConfig,
        serviceName: "Find teacher training courses",
        jwksUrl: "https://find-teacher-training.education.gov.uk/.well-known/jwks.json",
        redirectUrls: ["https://find-teacher-training.education.gov.uk/callback"],
        sectorIdentifierUri: "https://find-teacher-training.education.gov.uk",
        identityVerificationSupported: false,
        claims: [],
        landingPageUrl: "",
        levelsOfConfidence: []
      }
    },
    {
      id: "claim-additional-payments",
      name: "Claim Additional Payments for Teaching Early Years",
      description: "Claim additional payments for teaching certain early years subjects",
      integration: [
        {
          id: "dev",
          name: "DEV",
          ...baseConfig,
          serviceName: "Claim Additional Payments for Teaching Early Years",
          jwksUrl: "https://dev.claim-additional-payments.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://dev.claim-additional-payments.education.gov.uk/callback"],
          sectorIdentifierUri: "https://claim-additional-payments.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT"],
          landingPageUrl: "https://dev.claim-additional-payments.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        },
        {
          id: "sit",
          name: "SIT",
          ...baseConfig,
          serviceName: "Claim Additional Payments for Teaching Early Years",
          jwksUrl: "https://sit.claim-additional-payments.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://sit.claim-additional-payments.education.gov.uk/callback"],
          sectorIdentifierUri: "https://claim-additional-payments.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT"],
          landingPageUrl: "https://sit.claim-additional-payments.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        },
        {
          id: "uat",
          name: "UAT",
          ...baseConfig,
          serviceName: "Claim Additional Payments for Teaching Early Years",
          jwksUrl: "https://uat.claim-additional-payments.education.gov.uk/.well-known/jwks.json",
          redirectUrls: ["https://uat.claim-additional-payments.education.gov.uk/callback"],
          sectorIdentifierUri: "https://claim-additional-payments.education.gov.uk",
          identityVerificationSupported: true,
          claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT"],
          landingPageUrl: "https://uat.claim-additional-payments.education.gov.uk/landing",
          levelsOfConfidence: ["P2"]
        }
      ],
      production: {
        id: "prod",
        name: "Claim Additional Payments for Teaching Early Years",
        ...baseConfig,
        serviceName: "Claim Additional Payments for Teaching Early Years",
        jwksUrl: "https://claim-additional-payments.education.gov.uk/.well-known/jwks.json",
        redirectUrls: ["https://claim-additional-payments.education.gov.uk/callback"],
        sectorIdentifierUri: "https://claim-additional-payments.education.gov.uk",
        identityVerificationSupported: true,
        claims: ["https://vocab.account.gov.uk/v1/coreIdentityJWT"],
        landingPageUrl: "https://claim-additional-payments.education.gov.uk/landing",
        levelsOfConfidence: ["P2"]
      }
    }
  ]
};
